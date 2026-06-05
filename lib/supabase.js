/*
 * lib/supabase.js
 *
 * Minimal Supabase admin helper for upserting subscriptions.
 * Environment variables required (server-only):
 * - SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 *
 * Install the client with: `npm i @supabase/supabase-js`
 */

export async function getSupabaseClient() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
  }
  try {
    const supabase = await import('@supabase/supabase-js');
    const { createClient } = supabase;
    return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
  } catch (err) {
    throw new Error('@supabase/supabase-js not installed. Run `npm i @supabase/supabase-js`');
  }
}

export async function upsertSubscription(payload) {
  const client = await getSupabaseClient();
  const { data, error } = await client.from('subscriptions').upsert(payload, { onConflict: 'subscription_id' }).select();
  if (error) {
    console.error('Supabase upsert error', error);
    throw error;
  }
  return data;
}
