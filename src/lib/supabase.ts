import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !publishableKey) {
  throw new Error(
    "Supabase env vars missing: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  );
}

// Shared client used by both server and client. RLS gates writes; reads on
// `vehicles` are publicly allowed. Admin mutations go through server actions
// that bypass RLS via a dedicated postgres function (see `admin_*` SQL helpers).
export const supabase: SupabaseClient = createClient(url, publishableKey, {
  auth: { persistSession: false },
});
