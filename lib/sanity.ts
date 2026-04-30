import { createClient, type SanityClient } from "@sanity/client";

// Public read client — no token needed for a public Sanity dataset.
// SANITY_API_TOKEN is intentionally not used here; the dataset is public
// and an expired/invalid token causes 401s that silently return null.
export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn:    false, // false = always fresh from API (no CDN delay)
});
