import { useAuth } from '@clerk/clerk-react';
import { createClient } from '@supabase/supabase-js';
import { useMemo } from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export function useSupabaseAuth() {
  const { getToken, userId } = useAuth();

  const supabase = useMemo(() => {
    return createClient(supabaseUrl, supabaseKey, {
      global: {
        // Get the Supabase token with a custom fetch implementation
        fetch: async (url, options = {}) => {
          const clerkToken = await getToken({ template: 'supabase' });

          // Insert the Clerk token into the headers
          const headers = new Headers(options?.headers);
          headers.set('Authorization', `Bearer ${clerkToken}`);

          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
    });
  }, [getToken]);

  return { supabase, userId };
}
