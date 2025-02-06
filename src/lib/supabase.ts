import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Simple health check that logs connection status
const testConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    
    const { error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Supabase connection error:', error);
      return;
    }
    
    console.log('Supabase connected successfully');
  } catch (err) {
    console.error('Failed to connect to Supabase:', err);
  }
};

// Only run test in development
if (import.meta.env.DEV) {
  testConnection();
}
</boltArtifact>
