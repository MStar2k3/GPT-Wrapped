/* ============================================
   AUTH ROUTES - Google OAuth
   ============================================ */

import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Check if Google OAuth is configured
const isGoogleConfigured = () => {
    return !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
};

// Start Google OAuth flow
router.get('/google', (req, res, next) => {
    if (!isGoogleConfigured()) {
        return res.status(503).json({
            error: 'Google OAuth not configured',
            message: 'Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in server/.env file',
            setup: {
                step1: 'Go to https://console.cloud.google.com/apis/credentials',
                step2: 'Create OAuth 2.0 Client ID',
                step3: 'Add http://localhost:3001/auth/google/callback as redirect URI',
                step4: 'Copy Client ID and Secret to server/.env'
            }
        });
    }
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

// Google OAuth callback
router.get('/google/callback', (req, res, next) => {
    if (!isGoogleConfigured()) {
        return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/?error=oauth_not_configured`);
    }
    passport.authenticate('google', {
        failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/?error=auth_failed`
    })(req, res, (err) => {
        if (err) return next(err);
        // Create JWT token
        const token = jwt.sign(
            {
                id: req.user.id,
                email: req.user.email,
                name: req.user.name
            },
            process.env.JWT_SECRET || 'dev-secret',
            { expiresIn: '7d' }
        );
        // Redirect to frontend with token
        res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/import?token=${token}`);
    });
});

// Get current user
router.get('/me', (req, res) => {
    if (req.user) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ error: 'Not authenticated' });
    }
});

// Verify JWT token
router.get('/verify', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
        res.json({ valid: true, user: decoded });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

// Logout
router.post('/logout', (req, res) => {
    req.logout(() => {
        res.json({ success: true });
    });
});

export default router;
