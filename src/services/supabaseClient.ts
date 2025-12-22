import { createClient } from '@supabase/supabase-js';

// Environment variables or fallback to hardcoded (development only)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://plqvgcilzppmehbgydxb.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBscXZnY2lsenBwbWVoYmd5ZHhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1NjA4MjEsImV4cCI6MjA4MTEzNjgyMX0.g1ML4jVr-y3N0r5Uuo0JpZPcK8BRSCTUQ5FjjnYoAhk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
