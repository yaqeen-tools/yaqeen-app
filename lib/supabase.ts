import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qtixhhztkuyqgsflhmkt.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_pwpm5E87mMcr20tyUnzZ-w_yp0-Daez';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
