import type { MetadataRoute } from "next";
import { sanity } from "@/lib/sanity";
import { providers as mockProviders } from "@/lib/mock-data/providers";
import { comparisons as mockComparisons } from "@/lib/mock-data/comparisons";
import {
  brandToSlug,
  getMultiLocationBrands,
  getSingleLocationProviders,
  getProvidersByBrand,
  getLocationSlug,
} from "@/lib/providers";
import { getUniqueProviderSlugs } from "@/lib/data/reviews";

const BASE_URL = "https://realtattooreviews.com";

// Slugs that are owned by hardcoded TSX pages and already listed under
// staticPages above. Don't double-list them through the dynamic sources.
const STATIC_PROVIDER_SLUGS = new Set(["laseraway"]);

// Slugs that must never appear in the public sitemap, even if Supabase or
// mock-data surfaces them. `tatt2away` is the historical brand for inkOUT
// locations; reviews tagged with bucket='tatt2away' are gated at the data
// layer (see lib/data/reviews.ts) so any /reviews/tatt2away/ page would
// render with zero reviews. Listing it in the sitemap would tell Google
// to crawl a zombie page.
const SITEMAP_BLOCKED_PROVIDER_SLUGS = new Set(["tatt2away"]);

// Brands that have hand-curated per-location coverage at
// `/reviews/[provider]/[location]/`. Only these brands get their per-location
// URLs added to the sitemap, matching the route's actual coverage.
const BRANDS_WITH_LOCATION_PAGES = new Set(["inkOUT", "Removery"]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`,                    priority: 1.0, changeFrequency: "daily" },
    { url: `${BASE_URL}/providers`,          priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE_URL}/reviews`,                                          priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE_URL}/reviews/laseraway`,                                priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE_URL}/blog/how-to-choose-a-tattoo-removal-provider`,     priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/categories`,         priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE_URL}/comparisons`,        priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE_URL}/guides`,             priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE_URL}/blog`,               priority: 0.7, changeFrequency: "daily" },
    { url: `${BASE_URL}/cities`,             priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/cost`,               priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/before-and-after`,   priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/methodology`,        priority: 0.5, changeFrequency: "yearly" },
    { url: `${BASE_URL}/editorial-policy`,   priority: 0.5, changeFrequency: "yearly" },
    { url: `${BASE_URL}/about`,              priority: 0.4, changeFrequency: "yearly" },
  ];

  const [blogs, guides, categories, comparisons, providers, cities] =
    await Promise.all([
      sanity.fetch<{ slug: string }[]>(`*[_type == "blog" && defined(slug.current)]{ "slug": slug.current }`),
      sanity.fetch<{ slug: string }[]>(`*[_type == "guide" && defined(slug.current)]{ "slug": slug.current }`),
      sanity.fetch<{ slug: string }[]>(`*[_type == "category" && defined(slug.current)]{ "slug": slug.current }`),
      sanity.fetch<{ slug: string }[]>(`*[_type == "comparison" && defined(slug.current)]{ "slug": slug.current }`),
      sanity.fetch<{ slug: string }[]>(`*[_type == "provider" && defined(slug.current)]{ "slug": slug.current }`),
      sanity.fetch<{ slug: string }[]>(`*[_type == "city" && defined(slug.current)]{ "slug": slug.current }`),
    ]);

  const blogUrls: MetadataRoute.Sitemap = blogs.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const guideUrls: MetadataRoute.Sitemap = guides.map((p) => ({
    url: `${BASE_URL}/guides/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((p) => ({
    url: `${BASE_URL}/categories/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const comparisonUrls: MetadataRoute.Sitemap = comparisons.map((p) => ({
    url: `${BASE_URL}/comparisons/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const providerUrls: MetadataRoute.Sitemap = providers.map((p) => ({
    url: `${BASE_URL}/reviews/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const cityUrls: MetadataRoute.Sitemap = cities.map((p) => ({
    url: `${BASE_URL}/cities/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // ── Mock-data + DB-derived URLs not surfaced by Sanity queries ──────────────
  //
  // The Sanity-only queries above miss several real, deployed pages because
  // their content lives in code (mock-data) or Supabase rather than Sanity:
  //
  //   - /reviews/[provider]/        — auto-generated review summaries
  //   - /reviews/[provider]/[location]/  — per-location pages (inkOUT, Removery)
  //   - /comparisons/[slug]/        — 4 newer mock-data comparisons not yet
  //                                   migrated into Sanity
  //
  // Without these the sitemap declared roughly 60% fewer URLs than the build
  // actually shipped. We union all sources and dedupe by URL.

  // Provider review pages: union of mock-data (multi-location brands +
  // single-location providers) and Supabase distinct provider slugs.
  const dbProviderSlugs = await getUniqueProviderSlugs().catch(() => [] as string[]);
  const sanityProviderSlugs = new Set(providers.map((p) => p.slug));
  const allProviderSlugs = new Set<string>([
    ...getMultiLocationBrands().map(brandToSlug),
    ...getSingleLocationProviders().map((p) => p.slug),
    ...dbProviderSlugs,
  ]);
  // Don't re-list slugs already covered by hardcoded static pages or by the
  // Sanity provider URLs block above.
  const dynamicProviderUrls: MetadataRoute.Sitemap = [...allProviderSlugs]
    .filter((slug) => !STATIC_PROVIDER_SLUGS.has(slug))
    .filter((slug) => !sanityProviderSlugs.has(slug))
    .filter((slug) => !SITEMAP_BLOCKED_PROVIDER_SLUGS.has(slug))
    .map((slug) => ({
      url: `${BASE_URL}/reviews/${slug}`,
      changeFrequency: "weekly",
      priority: 0.9,
    }));

  // Per-location pages — only inkOUT and Removery have route coverage.
  const locationUrls: MetadataRoute.Sitemap = mockProviders
    .filter((p) => BRANDS_WITH_LOCATION_PAGES.has(p.brand ?? p.name))
    .map((p) => ({
      url: `${BASE_URL}/reviews/${brandToSlug(p.brand ?? p.name)}/${getLocationSlug(p)}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  // Mock-data comparisons not yet in Sanity. Dedupe against the Sanity slugs
  // already listed above so a comparison that exists in both sources is
  // listed once.
  const sanityComparisonSlugs = new Set(comparisons.map((c) => c.slug));
  const mockComparisonUrls: MetadataRoute.Sitemap = mockComparisons
    .filter((c) => !sanityComparisonSlugs.has(c.slug))
    .map((c) => ({
      url: `${BASE_URL}/comparisons/${c.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [
    ...staticPages,
    ...blogUrls,
    ...guideUrls,
    ...categoryUrls,
    ...comparisonUrls,
    ...providerUrls,
    ...cityUrls,
    ...dynamicProviderUrls,
    ...locationUrls,
    ...mockComparisonUrls,
  ];
}
