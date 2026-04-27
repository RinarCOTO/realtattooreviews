import { createClient } from "@sanity/client";

const token = process.env.SANITY_API_TOKEN;

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn:    !token, // CDN rejects authenticated requests; use direct API when token is set
  token,
});
