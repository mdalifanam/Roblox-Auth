-- Run this script in your Supabase SQL Editor:
-- Table: roblox_users

CREATE TABLE IF NOT EXISTS public.roblox_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL,
    birthday DATE,
    gender TEXT DEFAULT 'unspecified',
    password TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.roblox_users ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for the signup page
CREATE POLICY "Allow public insert" ON public.roblox_users
    FOR INSERT WITH CHECK (true);

-- Allow public read of signups (or restrict as needed)
CREATE POLICY "Allow public read" ON public.roblox_users
    FOR SELECT USING (true);
