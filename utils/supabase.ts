import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aqcmjdnqncecnwmvlbld.supabase.co';
const supabasePublishableKey = 'sb_publishable_JyFPgdAvItagcaUBwqVm3A_jAScd4NI';

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});