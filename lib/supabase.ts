import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | undefined;

/**
 * Resolve Supabase env vars at first client access.
 *
 * Behavior by environment:
 * - production (`NODE_ENV === "production"`): throws if either env var is
 *   missing. A misconfigured deploy fails loudly instead of silently
 *   rendering empty data, which would otherwise look like a content bug.
 * - development / test: falls back to placeholder values so local builds
 *   without `.env.local` still load. Network calls against the placeholder
 *   simply fail and the app's catch-and-return-empty pattern keeps pages
 *   navigable.
 */
function resolveCredentials(): { url: string; key: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (process.env.NODE_ENV === "production") {
    if (!url) {
      throw new Error(
        "[supabase] NEXT_PUBLIC_SUPABASE_URL is not set in production. The deploy is misconfigured."
      );
    }
    if (!key) {
      throw new Error(
        "[supabase] NEXT_PUBLIC_SUPABASE_ANON_KEY is not set in production. The deploy is misconfigured."
      );
    }
    return { url, key };
  }

  return {
    url: url ?? "https://placeholder.supabase.co",
    key: key ?? "placeholder",
  };
}

function getClient(): SupabaseClient {
  if (!_client) {
    const { url, key } = resolveCredentials();
    _client = createClient(url, key);
  }
  return _client;
}

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop: string | symbol) {
    const client = getClient();
    const value = (client as never)[prop];
    return typeof value === "function" ? (value as Function).bind(client) : value;
  },
});
