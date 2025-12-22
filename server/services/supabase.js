/* ============================================
   SUPABASE CLIENT - Database connection
   ============================================ */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Only create client if credentials are configured
export const supabase = supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export const isSupabaseConfigured = () => !!supabase;

export default supabase;
