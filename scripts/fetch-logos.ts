/**
 * Fetches provider logos from Clearbit and saves them to
 * public/images/providers/logos/{slug}-logo.png
 *
 * Run from project root:
 *   npx tsx scripts/fetch-logos.ts
 *
 * Skips any provider that already has a logo file.
 * Deduplicates multi-location brands (one logo fetch per brand).
 */

import fs from "node:fs";
import path from "node:path";
import { providers } from "@/lib/mock-data/providers";
import { brandToSlug } from "@/lib/providers";

const LOGOS_DIR = path.join(process.cwd(), "public/images/providers/logos");
const EXTS = ["png", "jpg", "jpeg"];

function alreadyHasLogo(slug: string): boolean {
  return EXTS.some((ext) =>
    fs.existsSync(path.join(LOGOS_DIR, `${slug}-logo.${ext}`))
  );
}

async function fetchFromClearbit(domain: string, slug: string): Promise<boolean> {
  const url = `https://logo.clearbit.com/${domain}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return false;
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(path.join(LOGOS_DIR, `${slug}-logo.png`), buffer);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  fs.mkdirSync(LOGOS_DIR, { recursive: true });

  const seen = new Set<string>();

  for (const provider of providers) {
    const slug = provider.brand ? brandToSlug(provider.brand) : provider.slug;

    if (seen.has(slug)) continue;
    seen.add(slug);

    if (alreadyHasLogo(slug)) {
      console.log(`  skip  ${slug}-logo  (already exists)`);
      continue;
    }

    const domain = new URL(provider.website).hostname.replace(/^www\./, "");
    process.stdout.write(`  fetch  ${slug}-logo  from ${domain} ... `);

    const ok = await fetchFromClearbit(domain, slug);
    console.log(ok ? "saved" : "not found on Clearbit");
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
