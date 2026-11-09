import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hhiomleelpegrbqxhams.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoaW9tbGVlbHBlZ3JicXhoYW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI4MzE5OTUsImV4cCI6MjEwODQwNzk5NX0.6n86lned-GCtlOuFglRNe3l6uzxed04sL1wxO23j2Us';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

