import { supabase } from "@/lib/supabase";
import {
  getMultiLocationBrands,
  brandToSlug,
  getProvidersByBrand,
  getSingleLocationProviders,
} from "@/lib/providers";
import { buildReviewTags } from "@/lib/tagging";
import type { DbReview, Review } from "@/types/review";

// ── Table ────────────────────────────────────────────────────────────────────

const TABLE = "competitor_reviews";

// ── Constants ────────────────────────────────────────────────────────────────

// Computed once at module load. e.g. ["inkout", "tatt2away", "removery"]
const MULTI_LOCATION_BRAND_SLUGS: string[] = getMultiLocationBrands().map(brandToSlug);

// Maps RTR city slugs to the location_city / location_state values in competitor_reviews.
const CITY_SLUG_TO_LOCATION: Record<string, { city: string; state: string }> = {
  "austin-tx":         { city: "Austin",         state: "TX" },
  "chicago-il":        { city: "Chicago",         state: "IL" },
  "draper-ut":         { city: "Draper",          state: "UT" },
  "houston-tx":        { city: "Houston",         state: "TX" },
  "pleasant-grove-ut": { city: "Pleasant Grove",  state: "UT" },
  "tampa-fl":          { city: "Tampa",           state: "FL" },
};

// ── Provider helpers ─────────────────────────────────────────────────────────

// Normalize a DB provider_name to a URL-safe slug.
// "inkOUT" → "inkout"   "Removery (Bucktown)" → "removery-bucktown"
function providerNameToSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// Derive a city slug from DB columns.
// "Austin", "TX" → "austin-tx"   "Pleasant Grove", "UT" → "pleasant-grove-ut"
function deriveCitySlug(city: string, state: string): string {
  return `${city.toLowerCase().replace(/\s+/g, "-")}-${state.toLowerCase()}`;
}

type ProviderResolution = {
  providerType: "multi-location" | "single-location";
  providerSlug: string;
  locationId?: string;
};

/**
 * Resolve the canonical RTR providerSlug and providerType from a DB provider_name.
 *
 * Replaces the old resolveProviderMeta() which relied on a pre-computed provider_slug
 * column that does not exist in competitor_reviews.
 */
function resolveProviderMeta(providerName: string, city: string): ProviderResolution {
  const derived = providerNameToSlug(providerName);

  // Exact match on brand slug → brand-level multi-location (e.g. "inkout")
  if (MULTI_LOCATION_BRAND_SLUGS.includes(derived)) {
    return {
      providerType: "multi-location",
      providerSlug: derived,
      locationId: city.toLowerCase().replace(/\s+/g, "-"),
    };
  }

  // Prefix match → sub-location slug (e.g. "removery-bucktown" → brand "removery")
  const matchingBrand = MULTI_LOCATION_BRAND_SLUGS.find(
    (bs) => derived.startsWith(bs + "-")
  );
  if (matchingBrand) {
    return {
      providerType: "multi-location",
      providerSlug: matchingBrand,
      locationId: derived.slice(matchingBrand.length + 1),
    };
  }

  return { providerType: "single-location", providerSlug: derived };
}

/**
 * Return the provider_name values in competitor_reviews that correspond to an RTR slug,
 * plus whether this slug is the inkOUT brand (which requires a stricter bucket filter).
 *
 * Uses mock-data as the source of truth for name-to-slug mapping. All providers in
 * competitor_reviews are also in mock-data, so the lookup is reliable.
 */
function getProviderNamesForSlug(
  slug: string
): { names: string[]; isInkout: boolean } {
  const isInkout = slug === "inkout";

  // Multi-location brand slug (e.g. "inkout", "removery", "tatt2away")
  const brand = getMultiLocationBrands().find((b) => brandToSlug(b) === slug);
  if (brand) {
    // Deduplicate: inkOUT locations all share name "inkOUT", etc.
    const names = [...new Set(getProvidersByBrand(brand).map((p) => p.name))];
    return { names, isInkout };
  }

  // Single-location provider slug (e.g. "arviv-medical-aesthetics")
  const provider = getSingleLocationProviders().find((p) => p.slug === slug);
  if (provider) return { names: [provider.name], isInkout: false };

  return { names: [], isInkout: false };
}

// ── Formatter helpers ────────────────────────────────────────────────────────

function formatReviewerName(name: string | null): string | null {
  if (!name) return null;
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.`;
}

function formatReviewDate(isoDate: string | null): string | undefined {
  if (!isoDate) return undefined;
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// ── Provider classification ───────────────────────────────────────────────────
//
// Tattoo-removal-only providers: reviews with use_case = 'unknown' are still
// tattoo removal reviews — Qwen just didn't tag a specific use case. Default to
// 'Complete' so they surface on review pages.
//
// Mixed med-spa providers: reviews with use_case = 'unknown' may be about other
// services (facials, injectables, etc.) — keep them null so they stay hidden.

const REMOVAL_ONLY_PREFIXES = [
  "Removery",
  "MEDermis",
  "InkFree",
  "Inklifters",
  "Clean Slate",
  "Erasable",
  "Skintellect",
  "Tatt2Away",
  "LaserAway",
];

function isRemovalOnlyProvider(name: string): boolean {
  return REMOVAL_ONLY_PREFIXES.some((p) => name.startsWith(p));
}

// ── Mapper ───────────────────────────────────────────────────────────────────

export function dbReviewToReview(r: DbReview): Review {
  const { providerType, providerSlug, locationId } = resolveProviderMeta(
    r.provider_name,
    r.location_city
  );

  // pain_level is a number in competitor_reviews (not a string "1" to "5")
  const painRaw = typeof r.pain_level === "number" ? r.pain_level : null;
  // sessions_completed is a number in competitor_reviews (not a string)
  const sessions = typeof r.sessions_completed === "number" ? r.sessions_completed : null;

  return {
    id: r.id,
    reviewer: formatReviewerName(r.reviewer_name),
    provider: r.provider_name,
    providerSlug,
    providerType,
    // locationId: brand-derived (e.g. "austin") or full city-state slug fallback
    locationId: locationId ?? deriveCitySlug(r.location_city, r.location_state),
    locationName: `${r.location_city}, ${r.location_state}`,
    city: r.location_city,
    state: r.location_state,
    rating: r.star_rating,
    source: r.verified_source,
    // Use ISO timestamp (review_date_iso) for formatting; fall back to raw date string
    date: formatReviewDate(r.review_date_iso) ?? r.review_date ?? undefined,
    dateISO: r.review_date_iso ?? undefined,
    excerpt: r.review_text ?? undefined,
    fullText: r.review_text ?? undefined,
    reviewUrl: r.source_url
      ?? (r._place_id ? `https://www.google.com/maps/place/?q=place_id:${r._place_id}` : undefined),
    tags: buildReviewTags(r.review_text ?? ""),
    sessions,
    painLevel: painRaw,
    scarringReported: r.scarring_mentioned === "Yes"
      ? true
      : r.scarring_mentioned === "No"
      ? false
      : null,
    scarringPraised: r.scarring_mentioned === "Positive" ? true : null,
    resultsMentioned: r.result_rating != null && r.result_rating !== "unknown",
    useCase: (r.use_case && r.use_case !== "unknown")
      ? r.use_case
      : (r.bucket === "inkout" || isRemovalOnlyProvider(r.provider_name)) ? "Complete" : null,
    resultRating: (r.result_rating && r.result_rating !== "unknown") ? r.result_rating as Review["resultRating"] : null,
    methodUsed: r.method_used ?? null,
    reviewSummary: r.review_summary ?? null,
    hasText: r.has_text,
    // Fields not captured in competitor_reviews, kept for type compatibility
    healingIssues: null,
    costMentioned: null,
    staffMentioned: null,
    refundIssue: null,
  };
}

// ── Diversity selection ──────────────────────────────────────────────────────

/**
 * Select up to `maxCards` reviews from a pool, enforcing editorial diversity:
 * never the same provider+location twice; max 1 per brand in first pass;
 * allows a second card from the same brand only if from a different location.
 */
export function selectDiverseReviews(reviews: Review[], maxCards = 6): Review[] {
  const selected: Review[] = [];
  const brandCounts = new Map<string, number>();
  const seenBrandLocation = new Set<string>();

  function brandKey(r: Review): string {
    return r.providerSlug ?? r.provider.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }

  function locationKey(r: Review): string {
    return r.locationId ?? r.city?.toLowerCase().replace(/\s+/g, "-") ?? "unknown";
  }

  // First pass: strict 1 per brand
  for (const review of reviews) {
    if (selected.length >= maxCards) break;
    const bk = brandKey(review);
    const blKey = `${bk}:${locationKey(review)}`;
    if (seenBrandLocation.has(blKey)) continue;
    if ((brandCounts.get(bk) ?? 0) >= 1) continue;
    selected.push(review);
    brandCounts.set(bk, (brandCounts.get(bk) ?? 0) + 1);
    seenBrandLocation.add(blKey);
  }

  // Second pass: allow a 2nd from the same brand only from a different location
  if (selected.length < maxCards) {
    for (const review of reviews) {
      if (selected.length >= maxCards) break;
      const bk = brandKey(review);
      const blKey = `${bk}:${locationKey(review)}`;
      if (seenBrandLocation.has(blKey)) continue;
      if ((brandCounts.get(bk) ?? 0) >= 2) continue;
      selected.push(review);
      brandCounts.set(bk, (brandCounts.get(bk) ?? 0) + 1);
      seenBrandLocation.add(blKey);
    }
  }

  return selected;
}

// ── Public filter gatekeeper ─────────────────────────────────────────────────
//
// ALL queries against competitor_reviews must pass through applyPublicFilters.
// Never write a bare supabase.from(TABLE) call that bypasses these conditions.
//
// Bucket logic (verified from actual data in competitor_reviews, April 2026):
//   inkOUT reviews:     bucket = 'inkout'     (approved inkOUT reviews)
//   Competitor reviews: bucket = 'competitor' (Removery, Arviv, Clean Slate, etc.)
//   Tatt2Away method:   bucket = 'tatt2away'  (inkOUT sessions using Tatt2Away tech, shown on inkOUT pages)
//   review_required:    bucket = 'review_required' (flagged for manual review, not published)
//
// BucketScope controls how the bucket column is filtered:
//   "inkout"     -- inkOUT pages: bucket = 'inkout' OR bucket = 'tatt2away' (Tatt2Away merged into inkOUT)
//   "competitor" -- only bucket = 'competitor'
//   "any"        -- bucket = 'competitor' OR bucket = 'inkout' (site-wide; excludes tatt2away)

type BucketScope = "inkout" | "competitor" | "any";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyPublicFilters(query: any, bucketScope: BucketScope): any {
  // Only publicly-released rows
  query = query.eq("status", "published");

  // Bucket gate: prevent tatt2away and review_required from reaching public pages
  if (bucketScope === "inkout") {
    query = query.eq("bucket", "inkout");
  } else if (bucketScope === "competitor") {
    // Competitor pages: reviews stamped 'competitor' by the separator pipeline
    query = query.eq("bucket", "competitor");
  } else {
    // Site-wide (homepage, city pages, stats): both inkOUT-approved and competitor reviews
    // tatt2away bucket is intentionally excluded from all public RTR pages
    query = query.or("bucket.eq.competitor,bucket.eq.inkout");
  }

  // Manual review gate: include unreviewed (null) and explicitly approved; exclude rejected
  query = query.or("reviewed_decision.is.null,reviewed_decision.eq.approved");

  return query;
}

// ── Supabase queries ─────────────────────────────────────────────────────────

/**
 * Fetch recent reviews for the homepage.
 * Pulls a wider pool so diversity selection has meaningful choices.
 */
export async function getRecentReviews(limit = 6): Promise<Review[]> {
  const { data, error } = await applyPublicFilters(
    supabase
      .from(TABLE)
      .select("*")
      .order("review_date_iso", { ascending: false, nullsFirst: false })
      .order("last_analyzed_at", { ascending: false })
      .limit(limit * 5),
    "any"
  );

  if (error) {
    console.error("getRecentReviews error:", error.message);
    return [];
  }
  const pool = (data ?? []).map(dbReviewToReview);
  return selectDiverseReviews(pool, limit);
}

/**
 * Fetch all public reviews for a given RTR provider slug.
 *
 * inkOUT pages use bucket = 'inkout' (strict safety filter).
 * Competitor pages use bucket IS NULL (they were never processed by the separator).
 */
export async function getReviewsByProvider(providerSlug: string): Promise<Review[]> {
  const { names, isInkout } = getProviderNamesForSlug(providerSlug);
  if (names.length === 0) return [];

  const { data, error } = await applyPublicFilters(
    supabase
      .from(TABLE)
      .select("*")
      .in("provider_name", [...new Set(names)])
      .order("star_rating", { ascending: false }),
    isInkout ? "inkout" : "competitor"
  );

  if (error) {
    console.error("getReviewsByProvider error:", error.message);
    return [];
  }
  return (data ?? []).map(dbReviewToReview);
}

/**
 * Return all unique canonical page slugs present in the published review set.
 * Multi-location sub-names collapse to the brand slug (e.g. "Removery (Bucktown)" → "removery").
 */
export async function getUniqueProviderSlugs(): Promise<string[]> {
  const { data, error } = await applyPublicFilters(
    supabase.from(TABLE).select("provider_name"),
    "any"
  );

  if (error || !data) return [];

  const rawNames = (data as { provider_name: string }[]).map((r) => r.provider_name);
  const canonical = [...new Set(rawNames)].map((name) => resolveProviderMeta(name, "").providerSlug);
  return [...new Set(canonical)];
}

/** Fetch all public reviews for a given city slug. */
export async function getReviewsByCity(citySlug: string): Promise<Review[]> {
  const loc = CITY_SLUG_TO_LOCATION[citySlug];
  if (!loc) return [];

  const { data, error } = await applyPublicFilters(
    supabase
      .from(TABLE)
      .select("*")
      .eq("location_city", loc.city)
      .eq("location_state", loc.state)
      .order("star_rating", { ascending: false }),
    "any"
  );

  if (error) {
    console.error("getReviewsByCity error:", error.message);
    return [];
  }
  return (data ?? []).map(dbReviewToReview);
}

/** Fetch every public review, sorted best rating first. */
export async function getAllReviews(): Promise<Review[]> {
  const { data, error } = await applyPublicFilters(
    supabase
      .from(TABLE)
      .select("*")
      .order("star_rating", { ascending: false })
      .order("last_analyzed_at", { ascending: false }),
    "any"
  );

  if (error) {
    console.error("getAllReviews error:", error.message);
    return [];
  }
  return (data ?? []).map(dbReviewToReview);
}

/** Scar mention count and review total per brand slug. */
export async function getBrandStats(
  brandSlugs: string[]
): Promise<Record<string, { scarMentions: number; totalReviews: number }>> {
  if (brandSlugs.length === 0) return {};

  // Build a flat list of all provider_name values needed, keyed back to slug
  const slugForName = new Map<string, string>();
  const allNames: string[] = [];

  for (const slug of brandSlugs) {
    const { names } = getProviderNamesForSlug(slug);
    for (const name of names) {
      if (!slugForName.has(name)) slugForName.set(name, slug);
      allNames.push(name);
    }
  }

  const uniqueNames = [...new Set(allNames)];
  if (uniqueNames.length === 0) return {};

  // Fetch with site-wide public filters; refine per-provider in application code
  const { data, error } = await applyPublicFilters(
    supabase
      .from(TABLE)
      .select("provider_name, scarring_mentioned, bucket, is_tattoo_removal")
      .in("provider_name", uniqueNames),
    "any"
  );

  if (error || !data) return {};

  type StatRow = {
    provider_name: string;
    scarring_mentioned: string | null;
    bucket: string | null;
    is_tattoo_removal: boolean | null;
  };

  const result: Record<string, { scarMentions: number; totalReviews: number }> = {};

  for (const slug of brandSlugs) {
    const { names, isInkout } = getProviderNamesForSlug(slug);
    const rows = (data as StatRow[]).filter((r) => {
      if (!names.includes(r.provider_name)) return false;
      // Apply per-provider bucket restriction on top of the base "any" filter
      if (isInkout) return r.bucket === "inkout";
      return r.bucket === "competitor";
    });
    result[slug] = {
      scarMentions: rows.filter((r) => r.scarring_mentioned === "Yes").length,
      totalReviews: rows.length,
    };
  }

  return result;
}

export type DirectoryAggregate = {
  totalReviews: number;
  avgStars: number | null;
  cityList: string[];
};

/**
 * Brand-level aggregates for the /providers directory page.
 * Returns review count, average star rating, and distinct tracked cities per brand slug.
 * Structurally the same as getBrandStats but also computes avgStars and cityList.
 */
export async function getProviderDirectoryAggregates(
  brandSlugs: string[]
): Promise<Record<string, DirectoryAggregate>> {
  if (brandSlugs.length === 0) return {};

  const slugForName = new Map<string, string>();
  const allNames: string[] = [];

  for (const slug of brandSlugs) {
    const { names } = getProviderNamesForSlug(slug);
    for (const name of names) {
      if (!slugForName.has(name)) slugForName.set(name, slug);
      allNames.push(name);
    }
  }

  const uniqueNames = [...new Set(allNames)];
  if (uniqueNames.length === 0) return {};

  const { data, error } = await applyPublicFilters(
    supabase
      .from(TABLE)
      .select("provider_name, bucket, star_rating, location_city")
      .in("provider_name", uniqueNames),
    "any"
  );

  if (error || !data) return {};

  type Row = {
    provider_name: string;
    bucket: string | null;
    star_rating: number | null;
    location_city: string | null;
  };

  const result: Record<string, DirectoryAggregate> = {};

  for (const slug of brandSlugs) {
    const { names, isInkout } = getProviderNamesForSlug(slug);
    const rows = (data as Row[]).filter((r) => {
      if (!names.includes(r.provider_name)) return false;
      if (isInkout) return r.bucket === "inkout";
      return r.bucket === "competitor";
    });

    const stars = rows
      .map((r) => r.star_rating)
      .filter((s): s is number => s != null);
    const avgStars =
      stars.length > 0
        ? Math.round((stars.reduce((a, b) => a + b, 0) / stars.length) * 10) / 10
        : null;
    const cities = [
      ...new Set(rows.map((r) => r.location_city).filter((c): c is string => c != null)),
    ].sort();

    result[slug] = { totalReviews: rows.length, avgStars, cityList: cities };
  }

  return result;
}

/**
 * Compute live avg rating and review count per individual provider location slug.
 *
 * Return keys match the `slug` field in lib/mock-data/providers.ts exactly
 * (e.g. "inkout-austin", "removery-bucktown", "arviv-medical-aesthetics").
 *
 * Uses the "any" scope filter so inkOUT and competitor aggregates are both
 * included in one query. Each provider_name only carries one bucket type in the
 * DB, so grouping by (provider_name + location_city) naturally gives the correct
 * per-provider-scope counts without additional filtering.
 *
 * Option B pattern: pages call this function and overlay the live values onto
 * mock-data provider objects. The providers.ts file is never modified.
 */
export async function getAllProviderAggregates(): Promise<
  Record<string, { rating: number; reviewCount: number }>
> {
  const { data, error } = await applyPublicFilters(
    supabase
      .from(TABLE)
      .select("provider_name, location_city, location_state, star_rating"),
    "any"
  );

  if (error || !data) return {};

  const acc: Record<string, { sum: number; count: number }> = {};

  for (const row of data as Array<{
    provider_name: string;
    location_city: string;
    location_state: string;
    star_rating: number;
  }>) {
    if (row.star_rating == null) continue;

    const { providerSlug, locationId } = resolveProviderMeta(
      row.provider_name,
      row.location_city
    );
    const locationSlug = locationId ? `${providerSlug}-${locationId}` : providerSlug;

    if (!acc[locationSlug]) acc[locationSlug] = { sum: 0, count: 0 };
    acc[locationSlug].sum += row.star_rating;
    acc[locationSlug].count += 1;
  }

  const result: Record<string, { rating: number; reviewCount: number }> = {};
  for (const [slug, { sum, count }] of Object.entries(acc)) {
    result[slug] = {
      rating: count > 0 ? Math.round((sum / count) * 10) / 10 : 0,
      reviewCount: count,
    };
  }
  return result;
}

/**
 * Return the most recent last_analyzed_at timestamp across all public reviews,
 * formatted as "April 24, 2026". Used by the site footer to show data freshness.
 * Falls back to the current date (build date for static export) if the column
 * is null on all rows.
 */
export async function getDataFreshness(): Promise<string> {
  const { data, error } = await applyPublicFilters(
    supabase
      .from(TABLE)
      .select("last_analyzed_at")
      .order("last_analyzed_at", { ascending: false, nullsFirst: false })
      .limit(1),
    "any"
  );

  const isoDate =
    !error && data && data.length > 0
      ? (data[0] as { last_analyzed_at: string | null }).last_analyzed_at
      : null;

  const date = isoDate ? new Date(isoDate) : new Date();
  const valid = !Number.isNaN(date.getTime()) ? date : new Date();
  return valid.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** Aggregate site-wide stats used on the reviews hub page. */
export async function getReviewStats(): Promise<{
  totalReviews: number;
  totalProviders: number;
  totalCities: number;
  scarringMentions: number;
  lastUpdated: string;
}> {
  const { data, error } = await applyPublicFilters(
    supabase
      .from(TABLE)
      .select("provider_name, location_city, scarring_mentioned, review_date_iso"),
    "any"
  );

  if (error || !data) {
    return { totalReviews: 0, totalProviders: 0, totalCities: 0, scarringMentions: 0, lastUpdated: "" };
  }

  const scarringMentions = data.filter(
    (r: { scarring_mentioned: string | null }) => r.scarring_mentioned === "Yes"
  ).length;

  const dates = data
    .map((r: { review_date_iso: string | null }) => r.review_date_iso)
    .filter(Boolean)
    .map((d: string) => new Date(d))
    .filter((d: Date) => !Number.isNaN(d.getTime()));

  const mostRecent =
    dates.length > 0 ? new Date(Math.max(...dates.map((d: Date) => d.getTime()))) : null;

  const lastUpdated = mostRecent
    ? mostRecent.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "";

  return {
    totalReviews: data.length,
    totalProviders: new Set(data.map((r: { provider_name: string }) => r.provider_name)).size,
    totalCities: new Set(data.map((r: { location_city: string }) => r.location_city)).size,
    scarringMentions,
    lastUpdated,
  };
}

/**
 * Aggregate reviews by brand from Supabase and return the highest-rated brands
 * that meet the minimum review threshold.
 *
 * Groups by brand_name if available, otherwise strips location suffixes like
 * "(Bucktown)" from provider_name. Filters to minReviews, sorts by avg rating
 * DESC then brand name ASC, and returns up to `limit` results.
 */
export async function getHighestRatedProviders(
  limit = 6,
  minReviews = 48
): Promise<{ brandName: string; avgRating: number; reviewCount: number }[]> {
  const { data, error } = await applyPublicFilters(
    supabase
      .from(TABLE)
      .select("brand_name, provider_name, star_rating"),
    "any"
  );

  if (error || !data) return [];

  type Row = { brand_name: string | null; provider_name: string; star_rating: number | null };

  const brandMap = new Map<string, number[]>();
  for (const row of data as Row[]) {
    if (row.star_rating == null) continue;
    const brand =
      (row.brand_name?.trim()) ||
      row.provider_name.replace(/\s*\([^)]+\)\s*$/, "").trim();
    if (!brandMap.has(brand)) brandMap.set(brand, []);
    brandMap.get(brand)!.push(row.star_rating);
  }

  return [...brandMap.entries()]
    .map(([brandName, stars]) => ({
      brandName,
      avgRating: Math.round((stars.reduce((a, b) => a + b, 0) / stars.length) * 10) / 10,
      reviewCount: stars.length,
    }))
    .filter((b) => b.reviewCount >= minReviews)
    .sort((a, b) => b.avgRating - a.avgRating || a.brandName.localeCompare(b.brandName))
    .slice(0, limit);
}

// ── City provider aggregates ──────────────────────────────────────────────────

export interface CityProviderRow {
  providerName: string;
  methodUsed: string | null;
  isInkout: boolean;
  sampleSize: number;
  avgStars: number | null;
  positives: number;
  negatives: number;
  scarringPositive: number;
  useCaseComplete: number;
  useCaseMicroblading: number;
  pctPositive: number | null;
}

/**
 * Aggregate review stats per provider for a given city.
 * Client-side aggregation mirrors the Notion-specified SQL GROUP BY query.
 * See app/cities/chicago/page.tsx for the canonical SQL reference.
 */
export async function getCityProviderAggregates(
  locationCity: string
): Promise<CityProviderRow[]> {
  const { data, error } = await applyPublicFilters(
    supabase
      .from(TABLE)
      .select("provider_name, method_used, bucket, star_rating, result_rating, scarring_mentioned, use_case")
      .ilike("location_city", locationCity),
    "any"
  );

  if (error || !data) return [];

  type Row = {
    provider_name: string;
    method_used: string | null;
    bucket: string | null;
    star_rating: number | null;
    result_rating: string | null;
    scarring_mentioned: string | null;
    use_case: string | null;
  };

  const acc: Record<string, {
    methodUsed: string | null;
    isInkout: boolean;
    ratings: number[];
    positives: number;
    negatives: number;
    scarringPositive: number;
    useCaseComplete: number;
    useCaseMicroblading: number;
  }> = {};

  for (const row of data as Row[]) {
    const key = row.provider_name;
    if (!acc[key]) {
      acc[key] = {
        methodUsed: row.method_used ?? null,
        isInkout: row.bucket === "inkout",
        ratings: [],
        positives: 0,
        negatives: 0,
        scarringPositive: 0,
        useCaseComplete: 0,
        useCaseMicroblading: 0,
      };
    }
    if (!acc[key].methodUsed && row.method_used) acc[key].methodUsed = row.method_used;
    if (row.bucket === "inkout") acc[key].isInkout = true;
    if (row.star_rating != null) acc[key].ratings.push(row.star_rating);
    if (row.result_rating === "Positive") acc[key].positives++;
    if (row.result_rating === "Negative") acc[key].negatives++;
    if (row.scarring_mentioned === "Positive") acc[key].scarringPositive++;
    if (row.use_case === "Complete" && row.result_rating === "Positive") acc[key].useCaseComplete++;
    if (row.use_case === "Microblading" && row.result_rating === "Positive") acc[key].useCaseMicroblading++;
  }

  return Object.entries(acc)
    .map(([providerName, v]) => {
      const sampleSize = v.ratings.length;
      const avgStars =
        sampleSize > 0
          ? Math.round((v.ratings.reduce((a, b) => a + b, 0) / sampleSize) * 100) / 100
          : null;
      const pctPositive = sampleSize > 0 ? Math.round((v.positives / sampleSize) * 100) : null;
      return {
        providerName,
        methodUsed: v.methodUsed,
        isInkout: v.isInkout,
        sampleSize,
        avgStars,
        positives: v.positives,
        negatives: v.negatives,
        scarringPositive: v.scarringPositive,
        useCaseComplete: v.useCaseComplete,
        useCaseMicroblading: v.useCaseMicroblading,
        pctPositive,
      };
    })
    .sort((a, b) => b.sampleSize - a.sampleSize);
}

// ── Brand location aggregates ────────────────────────────────────────────────

export interface BrandLocationRow {
  providerName: string;
  locationCity: string;
  sampleSize: number;
  avgStars: number | null;
  positives: number;
  negatives: number;
  scarringPositive: number;
  useCaseComplete: number;
  useCaseMicroblading: number;
  pctPositive: number | null;
}

/**
 * Aggregate review stats per city for a given brand, identified by provider_name prefix.
 * Uses bucketScope "competitor" -- do not use this for inkOUT (use getCityProviderAggregates).
 *
 * CC BUILD NOTE: LaserAway rows have brand_name = NULL in competitor_reviews.
 * Identify them via .ilike("provider_name", "LaserAway%").
 */
export async function getBrandLocationAggregates(
  brandPrefix: string
): Promise<BrandLocationRow[]> {
  const { data, error } = await applyPublicFilters(
    supabase
      .from(TABLE)
      .select(
        "provider_name, location_city, star_rating, result_rating, scarring_mentioned, use_case"
      )
      .ilike("provider_name", `${brandPrefix}%`),
    "competitor"
  );

  if (error || !data) return [];

  type Row = {
    provider_name: string;
    location_city: string;
    star_rating: number | null;
    result_rating: string | null;
    scarring_mentioned: string | null;
    use_case: string | null;
  };

  const acc: Record<string, {
    providerName: string;
    ratings: number[];
    positives: number;
    negatives: number;
    scarringPositive: number;
    useCaseComplete: number;
    useCaseMicroblading: number;
  }> = {};

  for (const row of data as Row[]) {
    const key = row.location_city;
    if (!acc[key]) {
      acc[key] = {
        providerName: row.provider_name,
        ratings: [],
        positives: 0,
        negatives: 0,
        scarringPositive: 0,
        useCaseComplete: 0,
        useCaseMicroblading: 0,
      };
    }
    if (row.star_rating != null) acc[key].ratings.push(row.star_rating);
    if (row.result_rating === "Positive") acc[key].positives++;
    if (row.result_rating === "Negative") acc[key].negatives++;
    if (row.scarring_mentioned === "Positive") acc[key].scarringPositive++;
    if (row.use_case === "Complete" && row.result_rating === "Positive") acc[key].useCaseComplete++;
    if (row.use_case === "Microblading" && row.result_rating === "Positive") acc[key].useCaseMicroblading++;
  }

  return Object.entries(acc)
    .map(([locationCity, v]) => {
      const sampleSize = v.ratings.length;
      const avgStars =
        sampleSize > 0
          ? Math.round((v.ratings.reduce((a, b) => a + b, 0) / sampleSize) * 100) / 100
          : null;
      const pctPositive = sampleSize > 0 ? Math.round((v.positives / sampleSize) * 100) : null;
      return {
        providerName: v.providerName,
        locationCity,
        sampleSize,
        avgStars,
        positives: v.positives,
        negatives: v.negatives,
        scarringPositive: v.scarringPositive,
        useCaseComplete: v.useCaseComplete,
        useCaseMicroblading: v.useCaseMicroblading,
        pctPositive,
      };
    })
    .sort((a, b) => b.sampleSize - a.sampleSize);
}

// ── Cross-brand comparison aggregates ────────────────────────────────────────

export interface BrandComparisonRow {
  brand: string;
  city: string;
  sampleSize: number;
  avgStars: number | null;
  positives: number;
  negatives: number;
  pctPositive: number | null;
  scarringPositive: number;
  scarringYes: number;
  useCaseComplete: number;
  useCaseMicroblading: number;
  useCaseColor: number;
  useCaseCoverup: number;
  /** Star-rating distribution counts (4–5★ / 3★ / 1–2★) */
  starsHigh: number;
  starsMid: number;
  starsLow: number;
}

export interface BrandComparisonResult {
  rows: BrandComparisonRow[];
  lastRefreshed: string | null;
}

/**
 * Aggregate cross-city review stats for two competing brands.
 *
 * When inkOUT is one of the brands, it is identified via bucket='inkout' (the reliable
 * DB signal) rather than provider_name. All other brands are matched by provider_name
 * containing the brand string (case-insensitive), e.g. "Removery (Bucktown)" → "Removery".
 *
 * This makes the function work for any two-brand pair:
 *   getBrandComparisonAggregates("inkOUT", "Removery")   // inkOUT vs Removery
 *   getBrandComparisonAggregates("Removery", "LaserAway") // laser-vs-laser comparisons
 */
export async function getBrandComparisonAggregates(
  brandA: string,
  brandB: string
): Promise<BrandComparisonResult> {
  const { data, error } = await applyPublicFilters(
    supabase
      .from(TABLE)
      .select(
        "provider_name, bucket, location_city, star_rating, result_rating, scarring_mentioned, use_case, last_analyzed_at"
      ),
    "any"
  );

  if (error || !data) return { rows: [], lastRefreshed: null };

  type Row = {
    provider_name: string;
    bucket: string | null;
    location_city: string;
    star_rating: number | null;
    result_rating: string | null;
    scarring_mentioned: string | null;
    use_case: string | null;
    last_analyzed_at: string | null;
  };

  const SEP = "\x00";
  const acc: Record<
    string,
    {
      positives: number;
      negatives: number;
      ratings: number[];
      scarringPositive: number;
      scarringYes: number;
      useCaseComplete: number;
      useCaseMicroblading: number;
      useCaseColor: number;
      useCaseCoverup: number;
      starsHigh: number;
      starsMid: number;
      starsLow: number;
    }
  > = {};

  let latestTs: number | null = null;
  const brandALower = brandA.toLowerCase();
  const brandBLower = brandB.toLowerCase();
  // Which brand (if any) is inkOUT, identified by bucket rather than provider_name
  const inkoutLabel =
    brandALower === "inkout" ? brandA : brandBLower === "inkout" ? brandB : null;

  for (const row of data as Row[]) {
    if (row.last_analyzed_at) {
      const ts = new Date(row.last_analyzed_at).getTime();
      if (!Number.isNaN(ts) && (latestTs === null || ts > latestTs)) latestTs = ts;
    }

    let brand: string | null = null;
    if (inkoutLabel && row.bucket === "inkout") {
      // inkOUT rows are reliably identified by bucket, not provider_name
      brand = inkoutLabel;
    } else {
      // All other brands matched by provider_name substring
      const pnLower = (row.provider_name ?? "").toLowerCase();
      if (pnLower.includes(brandALower)) brand = brandA;
      else if (pnLower.includes(brandBLower)) brand = brandB;
    }
    if (!brand) continue;

    const key = `${brand}${SEP}${row.location_city}`;
    if (!acc[key]) {
      acc[key] = {
        positives: 0,
        negatives: 0,
        ratings: [],
        scarringPositive: 0,
        scarringYes: 0,
        useCaseComplete: 0,
        useCaseMicroblading: 0,
        useCaseColor: 0,
        useCaseCoverup: 0,
        starsHigh: 0,
        starsMid: 0,
        starsLow: 0,
      };
    }
    const a = acc[key];
    if (row.star_rating != null) {
      a.ratings.push(row.star_rating);
      if (row.star_rating >= 4) a.starsHigh++;
      else if (row.star_rating === 3) a.starsMid++;
      else a.starsLow++;
    }
    if (row.result_rating === "Positive") a.positives++;
    if (row.result_rating === "Negative") a.negatives++;
    if (row.scarring_mentioned === "Positive") a.scarringPositive++;
    if (row.scarring_mentioned === "Yes") a.scarringYes++;
    if (row.use_case === "Complete" && row.result_rating === "Positive") a.useCaseComplete++;
    if (row.use_case === "Microblading" && row.result_rating === "Positive") a.useCaseMicroblading++;
    if (row.use_case === "Color" && row.result_rating === "Positive") a.useCaseColor++;
    if (row.use_case === "Cover-up" && row.result_rating === "Positive") a.useCaseCoverup++;
  }

  const rows = Object.entries(acc)
    .map(([key, v]) => {
      const [brand, city] = key.split(SEP);
      const sampleSize = v.ratings.length;
      const avgStars =
        sampleSize > 0
          ? Math.round((v.ratings.reduce((a, b) => a + b, 0) / sampleSize) * 100) / 100
          : null;
      const pctPositive = sampleSize > 0 ? Math.round((v.positives / sampleSize) * 100) : null;
      return {
        brand,
        city,
        sampleSize,
        avgStars,
        positives: v.positives,
        negatives: v.negatives,
        pctPositive,
        scarringPositive: v.scarringPositive,
        scarringYes: v.scarringYes,
        useCaseComplete: v.useCaseComplete,
        useCaseMicroblading: v.useCaseMicroblading,
        useCaseColor: v.useCaseColor,
        useCaseCoverup: v.useCaseCoverup,
        starsHigh: v.starsHigh,
        starsMid: v.starsMid,
        starsLow: v.starsLow,
      };
    })
    .sort((a, b) => {
      if (a.brand !== b.brand) return a.brand.localeCompare(b.brand);
      return b.sampleSize - a.sampleSize;
    });

  const lastRefreshed = latestTs
    ? new Date(latestTs).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return { rows, lastRefreshed };
}
