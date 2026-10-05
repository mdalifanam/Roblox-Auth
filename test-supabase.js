import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

console.log('====================================');
console.log('  ROBLOX SUPABASE BACKEND TESTER    ');
console.log('====================================\n');

let url = process.env.VITE_SUPABASE_URL || '';
let anonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

// If not in process.env, parse .env file
if (!url || !anonKey) {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const urlMatch = envContent.match(/VITE_SUPABASE_URL\s*=\s*(.*)/);
    const keyMatch = envContent.match(/VITE_SUPABASE_ANON_KEY\s*=\s*(.*)/);
    if (urlMatch && urlMatch[1].trim()) url = urlMatch[1].trim();
    if (keyMatch && keyMatch[1].trim()) anonKey = keyMatch[1].trim();
  }
}

if (!url || !anonKey) {
  console.log('❌ Error: Supabase credentials are missing!');
  console.log('👉 Please open .env file and set:');
  console.log('   VITE_SUPABASE_URL=https://your-project-id.supabase.co');
  console.log('   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\n');
  console.log('Or click the "Supabase DB" button at the top-left in the web browser at http://127.0.0.1:5173/');
  process.exit(1);
}

console.log('Connecting to:', url);
console.log('Key prefix:   ', anonKey.substring(0, 12) + '...');

const supabase = createClient(url, anonKey);

async function testBackend() {
  try {
    console.log('\nChecking table "roblox_users"...');
    const { data, error, count } = await supabase
      .from('roblox_users')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.log('❌ Connection failed or table missing:');
      console.log('   Error message:', error.message);
      console.log('\n👉 If the table does not exist yet, run this in your Supabase SQL Editor:');
      console.log('   (Found in supabase-schema.sql)');
      console.log(`
CREATE TABLE IF NOT EXISTS public.roblox_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL,
    birthday DATE,
    gender TEXT DEFAULT 'unspecified',
    password TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.roblox_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON public.roblox_users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read" ON public.roblox_users FOR SELECT USING (true);
      `);
      process.exit(1);
    }

    console.log('✅ Supabase backend is successfully connected and online!');
    console.log(`📊 Table "roblox_users" is ready. Current rows: ${count || 0}`);
    console.log('🚀 Signups from the React app will now save directly into Supabase!');
  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
  }
}

testBackend();
