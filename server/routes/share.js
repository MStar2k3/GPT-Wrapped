/* ============================================
   SHARE ROUTES - LinkedIn & Social Posting
   ============================================ */

import express from 'express';
import axios from 'axios';

const router = express.Router();

// LinkedIn OAuth state storage (in production, use Redis/DB)
const linkedinStates = new Map();

// Start LinkedIn OAuth flow
router.get('/linkedin/auth', (req, res) => {
    if (!process.env.LINKEDIN_CLIENT_ID) {
        return res.status(500).json({
            error: 'LinkedIn not configured',
            message: 'Please set LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET in .env'
        });
    }

    const state = Math.random().toString(36).substring(7);
    linkedinStates.set(state, { timestamp: Date.now() });

    const redirectUri = `${process.env.BACKEND_URL || 'http://localhost:3001'}/api/share/linkedin/callback`;
    const scope = 'openid profile email w_member_social';

    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
        `response_type=code&` +
        `client_id=${process.env.LINKEDIN_CLIENT_ID}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `state=${state}&` +
        `scope=${encodeURIComponent(scope)}`;

    res.redirect(authUrl);
});

// LinkedIn OAuth callback
router.get('/linkedin/callback', async (req, res) => {
    const { code, state, error } = req.query;

    if (error) {
        return res.redirect(`${process.env.FRONTEND_URL}?linkedin_error=${error}`);
    }

    if (!linkedinStates.has(state)) {
        return res.redirect(`${process.env.FRONTEND_URL}?linkedin_error=invalid_state`);
    }

    linkedinStates.delete(state);

    try {
        // Exchange code for access token
        const redirectUri = `${process.env.BACKEND_URL || 'http://localhost:3001'}/api/share/linkedin/callback`;

        const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
            params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
                client_id: process.env.LINKEDIN_CLIENT_ID,
                client_secret: process.env.LINKEDIN_CLIENT_SECRET
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const accessToken = tokenResponse.data.access_token;

        // Store token (in production, save to user session/DB)
        // For now, redirect with token
        res.redirect(`${process.env.FRONTEND_URL}/wrapped?linkedin_token=${accessToken}`);

    } catch (error) {
        console.error('LinkedIn OAuth Error:', error.response?.data || error.message);
        res.redirect(`${process.env.FRONTEND_URL}?linkedin_error=token_failed`);
    }
});

// Post to LinkedIn
router.post('/linkedin/post', async (req, res) => {
    const { accessToken, text, imageBase64 } = req.body;

    if (!accessToken) {
        return res.status(400).json({ error: 'Access token required' });
    }

    try {
        // Get user profile
        const profileResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        const userId = profileResponse.data.sub;

        // If image provided, upload it first
        let imageUrn = null;
        if (imageBase64) {
            imageUrn = await uploadLinkedInImage(accessToken, userId, imageBase64);
        }

        // Create post
        const postData = {
            author: `urn:li:person:${userId}`,
            lifecycleState: 'PUBLISHED',
            specificContent: {
                'com.linkedin.ugc.ShareContent': {
                    shareCommentary: { text },
                    shareMediaCategory: imageUrn ? 'IMAGE' : 'NONE',
                    ...(imageUrn && {
                        media: [{
                            status: 'READY',
                            media: imageUrn
                        }]
                    })
                }
            },
            visibility: {
                'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
            }
        };

        const postResponse = await axios.post(
            'https://api.linkedin.com/v2/ugcPosts',
            postData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'X-Restli-Protocol-Version': '2.0.0'
                }
            }
        );

        res.json({
            success: true,
            postId: postResponse.data.id,
            message: 'Posted to LinkedIn successfully!'
        });

    } catch (error) {
        console.error('LinkedIn Post Error:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Failed to post to LinkedIn',
            details: error.response?.data || error.message
        });
    }
});

// Upload image to LinkedIn
async function uploadLinkedInImage(accessToken, userId, imageBase64) {
    // Register upload
    const registerResponse = await axios.post(
        'https://api.linkedin.com/v2/assets?action=registerUpload',
        {
            registerUploadRequest: {
                recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
                owner: `urn:li:person:${userId}`,
                serviceRelationships: [{
                    relationshipType: 'OWNER',
                    identifier: 'urn:li:userGeneratedContent'
                }]
            }
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }
    );

    const uploadUrl = registerResponse.data.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
    const asset = registerResponse.data.value.asset;

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    // Upload image
    await axios.put(uploadUrl, imageBuffer, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'image/png'
        }
    });

    return asset;
}

// Check LinkedIn connection status
router.get('/linkedin/status', (req, res) => {
    res.json({
        configured: !!process.env.LINKEDIN_CLIENT_ID,
        authUrl: process.env.LINKEDIN_CLIENT_ID
            ? '/api/share/linkedin/auth'
            : null
    });
});

export default router;
