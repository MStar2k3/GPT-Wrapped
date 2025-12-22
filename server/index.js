/* ============================================
   AI WRAPPED - BACKEND SERVER
   Google OAuth, Gemini API, LinkedIn Integration
   ============================================ */

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.js';
import generateRoutes from './routes/generate.js';
import shareRoutes from './routes/share.js';
// Screenshot routes loaded dynamically due to Puppeteer dependency
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - CORS for production and dev
const allowedOrigins = [
    'https://gptwrappedd.netlify.app',
    'http://localhost:5173',
    'http://localhost:3000'
];
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin) || process.env.FRONTEND_URL === origin) {
            return callback(null, true);
        }
        return callback(null, true); // Allow all for now
    },
    credentials: true
}));
app.use(express.json({ limit: '750mb' }));
app.use(express.urlencoded({ extended: true, limit: '750mb' }));

// Serve screenshots directory
app.use('/screenshots', express.static(path.join(__dirname, 'screenshots')));

// Session for OAuth
app.use(session({
    secret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// In-memory user store (replace with database in production)
const users = new Map();

// Google OAuth Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    const callbackURL = `${process.env.BACKEND_URL || 'http://localhost:3001'}/auth/google/callback`;
    console.log('📎 Google OAuth callback URL:', callbackURL);

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: callbackURL
    }, (accessToken, refreshToken, profile, done) => {
        // Store or retrieve user
        let user = users.get(profile.id);
        if (!user) {
            user = {
                id: profile.id,
                email: profile.emails?.[0]?.value,
                name: profile.displayName,
                picture: profile.photos?.[0]?.value,
                provider: 'google',
                createdAt: new Date()
            };
            users.set(profile.id, user);
        }
        return done(null, user);
    }));
}

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    const user = users.get(id);
    done(null, user || null);
});

// Routes
app.use('/auth', authRoutes);
app.use('/api/generate', generateRoutes);
app.use('/api/share', shareRoutes);

// Screenshot routes - loaded dynamically (Puppeteer may not work in all environments)
(async () => {
    try {
        const { default: screenshotRoutes } = await import('./routes/screenshot.js');
        app.use('/api/screenshots', screenshotRoutes);
        console.log('✅ Screenshot routes loaded successfully');
    } catch (err) {
        console.log('⚠️ Screenshot routes not available:', err.message);
        // Provide fallback endpoint
        app.use('/api/screenshots', (req, res) => {
            res.status(503).json({
                error: 'Screenshot service not available',
                message: 'Puppeteer is not configured in this environment. Use client-side canvas download instead.'
            });
        });
    }
})();

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        time: new Date().toISOString(),
        oauth: !!process.env.GOOGLE_CLIENT_ID,
        gemini: !!process.env.OPENROUTER_API_KEY,
        linkedin: !!process.env.LINKEDIN_CLIENT_ID
    });
});

// API info
app.get('/api', (req, res) => {
    res.json({
        name: 'AI Wrapped API',
        version: '1.0.0',
        endpoints: {
            auth: {
                'GET /auth/google': 'Start Google OAuth flow',
                'GET /auth/google/callback': 'OAuth callback',
                'GET /auth/me': 'Get current user',
                'POST /auth/logout': 'Logout'
            },
            generate: {
                'POST /api/generate/slide': 'Generate slide image with Gemini'
            },
            share: {
                'POST /api/share/linkedin': 'Post to LinkedIn'
            }
        }
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server
app.listen(PORT, () => {
    console.log(`
🚀 AI Wrapped Backend Server
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Running on: http://localhost:${PORT}
📍 Frontend:   ${process.env.FRONTEND_URL || 'http://localhost:5173'}

Status:
  ✅ Server: Running
  ${process.env.GOOGLE_CLIENT_ID ? '✅' : '❌'} Google OAuth: ${process.env.GOOGLE_CLIENT_ID ? 'Configured' : 'Not configured'}
  ${process.env.OPENROUTER_API_KEY ? '✅' : '❌'} OpenRouter (Gemini): ${process.env.OPENROUTER_API_KEY ? 'Configured' : 'Not configured'}
  ${process.env.LINKEDIN_CLIENT_ID ? '✅' : '❌'} LinkedIn: ${process.env.LINKEDIN_CLIENT_ID ? 'Configured' : 'Not configured'}
  `);
});

export default app;
