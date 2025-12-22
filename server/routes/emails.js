/* ============================================
   EMAIL COLLECTION ROUTES
   Store user emails for lead generation
   ============================================ */

import express from 'express';
import { supabase, isSupabaseConfigured } from '../services/supabase.js';

const router = express.Router();

// Collect email endpoint
router.post('/collect', async (req, res) => {
    try {
        const { email, name, source = 'wrapped' } = req.body;

        // Validate email
        if (!email || !email.includes('@')) {
            return res.status(400).json({
                error: 'Invalid email address'
            });
        }

        // Check if Supabase is configured
        if (!isSupabaseConfigured()) {
            console.log('📧 Email received (Supabase not configured):', email);
            return res.json({
                success: true,
                message: 'Email recorded (dev mode)',
                stored: false
            });
        }

        // Insert into Supabase
        const { data, error } = await supabase
            .from('emails')
            .upsert(
                {
                    email: email.toLowerCase().trim(),
                    name: name || null,
                    source
                },
                { onConflict: 'email' }
            )
            .select();

        if (error) {
            console.error('Supabase error:', error);
            // Don't fail the request for DB errors - log and continue
            return res.json({
                success: true,
                message: 'Email processed',
                stored: false
            });
        }

        console.log('📧 Email stored:', email);
        res.json({
            success: true,
            message: 'Email collected successfully',
            stored: true
        });

    } catch (error) {
        console.error('Email collection error:', error);
        res.status(500).json({
            error: 'Failed to process email'
        });
    }
});

// Get all emails (protected - requires auth in production)
router.get('/list', async (req, res) => {
    try {
        if (!isSupabaseConfigured()) {
            return res.status(503).json({
                error: 'Database not configured'
            });
        }

        const { data, error } = await supabase
            .from('emails')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json({
            success: true,
            count: data.length,
            emails: data
        });

    } catch (error) {
        console.error('Error fetching emails:', error);
        res.status(500).json({
            error: 'Failed to fetch emails'
        });
    }
});

export default router;
