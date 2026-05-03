import { createClient, type SanityClient } from "@sanity/client";

// Public read client: no token needed for a public Sanity dataset.
// SANITY_API_TOKEN is intentionally not used here; the dataset is public
// and an expired/invalid token causes 401s that silently return null.
//
// useCdn: true → reads from Sanity's CDN with ~1-3 min cache. This returns a
// stable single-JSON response shape. Setting useCdn: false hits the live
// API, which can return event-stream-style chunked responses for larger
// records, causing intermittent
// `JSON.parse: Unexpected non-whitespace character after JSON at position N`
// errors inside @sanity/client. CDN-mode trades a couple minutes of
// freshness for response-shape stability.
export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn:    true,
});
