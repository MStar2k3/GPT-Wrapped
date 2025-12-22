-- GPT Wrapped - Supabase Database Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- Create emails table
CREATE TABLE IF NOT EXISTS emails (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    source VARCHAR(50) DEFAULT 'wrapped',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_emails_created_at ON emails(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anon key (for email collection)
CREATE POLICY "Allow anonymous inserts" ON emails
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Create policy to allow service role to read all
CREATE POLICY "Service role can read all" ON emails
    FOR SELECT
    TO service_role
    USING (true);
