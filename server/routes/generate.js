/* ============================================
   GENERATE ROUTES - OpenRouter + Gemini/Gemma AI
   ============================================ */

import express from 'express';
import axios from 'axios';

const router = express.Router();

// OpenRouter API configuration
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = 'google/gemma-3n-e2b-it:free';  // Updated to Gemma

// Helper function to call OpenRouter with Gemma model
async function callAI(prompt, systemPrompt = '', model = DEFAULT_MODEL) {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        throw new Error('OPENROUTER_API_KEY not configured');
    }

    const messages = [];
    if (systemPrompt) {
        messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });

    console.log('🤖 Calling AI model:', model);

    const response = await axios.post(OPENROUTER_API_URL, {
        model: model,
        messages
    }, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:5173',
            'X-Title': 'AI Wrapped'
        }
    });

    return response.data.choices[0].message.content;
}

// Alias for backward compatibility
const callGemini = callAI;

// Analyze HTML content using AI
router.post('/analyze-html', async (req, res) => {
    try {
        const { htmlContent, textContent } = req.body;

        if (!textContent && !htmlContent) {
            return res.status(400).json({ error: 'No content provided' });
        }

        const content = textContent || htmlContent;

        // Truncate if too long (keep first 15000 chars for analysis)
        const truncatedContent = content.length > 15000
            ? content.substring(0, 15000) + '\n...[truncated]'
            : content;

        const prompt = `Analyze this ChatGPT conversation export and extract the following information. Return ONLY a valid JSON object with no other text.

Content to analyze:
${truncatedContent}

Return this exact JSON structure:
{
    "totalConversations": <number of distinct conversations/topics>,
    "totalUserMessages": <count of User messages>,
    "totalAssistantMessages": <count of ChatGPT/Assistant responses>,
    "conversationTitles": [<array of conversation topic titles found>],
    "topTopics": [<top 5 topic categories like "Coding", "Research", "Creative Writing", etc.>],
    "estimatedTokens": <rough estimate of total tokens>
}

Count carefully - each conversation starts with a title, then has User/ChatGPT exchanges.`;

        const result = await callAI(prompt);

        // Try to parse the JSON response
        let analysis;
        try {
            // Clean up the response - remove markdown code blocks if present
            const cleanedResult = result.replace(/```json\n?|\n?```/g, '').trim();
            analysis = JSON.parse(cleanedResult);
        } catch (parseError) {
            console.error('Failed to parse AI response:', result);
            analysis = { raw: result, parseError: true };
        }

        res.json({
            success: true,
            analysis,
            model: DEFAULT_MODEL
        });

    } catch (error) {
        console.error('AI Analysis Error:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Failed to analyze content',
            message: error.message
        });
    }
});


// Generate slide content with Gemini
router.post('/slide', async (req, res) => {
    try {
        const { slideType, data } = req.body;

        const prompt = createSlidePrompt(slideType, data);
        const content = await callGemini(prompt);

        res.json({
            success: true,
            slideType,
            content,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Gemini API Error:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Failed to generate content',
            message: error.message
        });
    }
});

// Generate personalized insights
router.post('/insights', async (req, res) => {
    try {
        const { userData } = req.body;

        const prompt = `Analyze this ChatGPT user's data and generate 3 fun, quirky insights:
    
    - Total conversations: ${userData.totalConversations}
    - Total prompts: ${userData.totalPrompts}
    - Top topic: ${userData.topTopic}
    - Active days: ${userData.activeDays}
    - Personality type: ${userData.personalityType}
    
    Make them humorous, relatable, and shareable. Format as a JSON array of 3 strings. Return ONLY the JSON array, no other text.`;

        const text = await callGemini(prompt);

        // Try to parse as JSON
        let insights;
        try {
            insights = JSON.parse(text.replace(/```json\n?|\n?```/g, '').trim());
        } catch {
            insights = [text];
        }

        res.json({ success: true, insights });

    } catch (error) {
        console.error('Gemini API Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to generate insights' });
    }
});

// Generate personalized roast
router.post('/roast', async (req, res) => {
    try {
        const { userData } = req.body;

        const prompt = `Generate a funny, friendly "roast" for someone based on their ChatGPT usage:
    
    - ${userData.totalConversations} conversations in 2025
    - Top topic: ${userData.topTopic}
    - Used ChatGPT ${userData.activeDays} days
    - Sent ${userData.totalPrompts} prompts
    
    Keep it light-hearted, maximum 2 sentences. Be creative and Gen-Z friendly. Just return the roast text, no quotes or extra formatting.`;

        const roast = await callGemini(prompt);

        res.json({
            success: true,
            roast: roast.replace(/^["']|["']$/g, '').trim()
        });

    } catch (error) {
        console.error('Gemini API Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to generate roast' });
    }
});

// Generate AI personality description
router.post('/personality', async (req, res) => {
    try {
        const { personalityType, traits } = req.body;

        const prompt = `You are creating content for an "AI Wrapped" app (like Spotify Wrapped but for ChatGPT usage).

    Based on this AI personality type: "${personalityType}"
    And these traits: ${traits.join(', ')}
    
    Write a fun, witty 2-3 sentence description of this personality. Make it sound like a horoscope but for AI power users. Be playful and Gen-Z friendly.
    
    Just return the description, no quotes or labels.`;

        const description = await callGemini(prompt);

        res.json({
            success: true,
            description: description.trim()
        });

    } catch (error) {
        console.error('Gemini API Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to generate personality' });
    }
});

// Check API status
router.get('/status', (req, res) => {
    res.json({
        configured: !!process.env.OPENROUTER_API_KEY,
        model: MODEL
    });
});

// Helper function to create slide prompts
function createSlidePrompt(slideType, data) {
    const prompts = {
        'year-summary': `Create a catchy one-liner for someone who had ${data.conversations} ChatGPT conversations and sent ${data.prompts} prompts in 2025. Make it fun and shareable. Just return the one-liner.`,

        'personality': `Based on this AI personality type "${data.type}", write a 2-sentence description that's witty and relatable. Make it sound like a horoscope but for AI users. Just return the description.`,

        'top-topic': `Someone spent ${data.percentage}% of their ChatGPT time on "${data.topic}". Write a funny observation about this in one sentence. Just return the sentence.`,

        'tokens': `This person used ${data.tokens} tokens with ChatGPT, equivalent to ${data.books} books. Write a humorous comparison in one sentence. Just return the sentence.`,

        'badges': `Someone earned these AI badges: ${data.badges?.join(', ') || 'Token Titan, Code Goblin'}. Write a fun achievement description in one sentence. Just return the sentence.`
    };

    return prompts[slideType] || `Generate creative, fun content for AI Wrapped about: ${JSON.stringify(data)}. Keep it short and shareable.`;
}

export default router;
