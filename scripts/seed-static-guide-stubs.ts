/**
 * scripts/seed-static-guide-stubs.ts
 *
 * Creates minimal Sanity `guide` documents for the two static (hardcoded)
 * guide pages so editors can update their `dateModified` field from Sanity
 * Studio without a code commit. The documents only carry the metadata
 * needed for the "Last reviewed" stamp; rendering still happens from the
 * hardcoded TSX files.
 *
 * Idempotent: running multiple times patches the existing document in place
 * (matched by `slug.current`) without overwriting editor-controlled fields
 * like sections, body, or faqItems.
 *
 * NOTE: this script intentionally creates docs with auto-generated UUID
 * `_id`s rather than custom prefixed IDs (e.g., `guide.laser-tattoo-removal`).
 * Sanity's anonymous read access on this project filters out custom-prefix
 * IDs, so prefixed docs are invisible to the public site even though they
 * show up in Sanity Studio. UUIDs avoid that trap.
 *
 * Run with:
 *   npx tsx scripts/seed-static-guide-stubs.ts
 *
 * Requires .env.local with SANITY_WRITE_TOKEN.
 */

import * as fs from "fs";
import * as path from "path";
import { createClient } from "@sanity/client";

const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf8")
    .split("\n")
    .forEach((line) => {
      const m = line.match(/^([^#=][^=]*)=(.*)$/);
      if (m) process.env[m[1].trim()] = m[2].trim().replace(/^['"]|['"]$/g, "");
    });
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN ?? process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

const STATIC_GUIDE_STUBS = [
  {
    slug: "non-laser-tattoo-removal",
    title: "Non-Laser Tattoo Removal",
    description:
      "How non-laser methods work, where dermabrasion-based tissue-expulsion and chemical extraction fit in the methods landscape, and how to weigh them against laser on outcomes, healing time, and skin-type considerations.",
  },
  {
    slug: "laser-tattoo-removal",
    title: "Laser Tattoo Removal",
    description:
      "How laser tattoo removal actually works, how Q-switched and picosecond lasers differ, what affects outcomes by ink color and skin tone, and how to evaluate a provider before booking.",
  },
];

async function main() {
  for (const stub of STATIC_GUIDE_STUBS) {
    // Look up the existing UUID-keyed doc by slug rather than by a custom
    // prefixed ID. See header comment for why custom IDs are avoided.
    const existing = await client.fetch<{ _id: string; description?: string; dateModified?: string; datePublished?: string } | null>(
      `*[_type == "guide" && slug.current == $slug][0]{ _id, description, dateModified, datePublished }`,
      { slug: stub.slug }
    );

    if (!existing?._id) {
      const created = await client.create({
        _type: "guide",
        title: stub.title,
        slug: { _type: "slug", current: stub.slug },
        description: stub.description,
        dateModified: today,
        datePublished: today,
      });
      console.log(`Created  ${created._id} (${stub.slug})`);
    } else {
      await client
        .patch(existing._id)
        .set({
          // Do not overwrite editor content (sections, body, faqItems, etc).
          // Only refresh metadata fields the static page needs.
          title: stub.title,
          slug: { _type: "slug", current: stub.slug },
          description: existing.description ?? stub.description,
          dateModified: existing.dateModified ?? today,
          datePublished: existing.datePublished ?? today,
        })
        .commit();
      console.log(`Patched  ${existing._id} (${stub.slug}, preserved existing content fields)`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
