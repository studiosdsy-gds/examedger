
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://plqvgcilzppmehbgydxb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBscXZnY2lsenBwbWVoYmd5ZHhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1NjA4MjEsImV4cCI6MjA4MTEzNjgyMX0.g1ML4jVr-y3N0r5Uuo0JpZPcK8BRSCTUQ5FjjnYoAhk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testFetch() {
    console.log('Attempting to fetch data...');
    const { data, error } = await supabase
        .from('exams')
        .select('*');

    if (error) {
        console.error('Error fetching data:', error);
    } else {
        console.log('Data fetched successfully:');
        console.log(JSON.stringify(data, null, 2));
    }
}

testFetch();
