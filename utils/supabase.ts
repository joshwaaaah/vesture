import { AppState, Platform } from 'react-native';
import { createClient, processLock } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

const supabaseUrl = 'https://aqcmjdnqncecnwmvlbld.supabase.co';
const supabasePublishableKey = 'sb_publishable_JyFPgdAvItagcaUBwqVm3A_jAScd4NI';

export const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    lock: processLock,
  },
});

if (Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}
