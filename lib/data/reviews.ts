import { supabase } from "@/lib/supabase";
import { getMultiLocationBrands, brandToSlug } from "@/lib/providers";
import { buildReviewTags } from "@/lib/tagging";
import type { DbReview, Review } from "@/types/review";

// ── Multi-location brand slugs (computed once at module load) ────────────────
// e.g. ["inkout", "tatt2away", "removery"]
const MULTI_LOCATION_BRAND_SLUGS: string[] = getMultiLocationBrands().map(brandToSlug);

// ── Provider-type resolution ─────────────────────────────────────────────────

type ProviderResolution = {
  providerType: "multi-location" | "single-location";
  providerSlug: string;
  locationId?: string;
};

/**
 * Determine providerType, providerSlug (brand-level), and locationId from a
 * raw DB provider_slug and city_slug.
 *
 * Two multi-location patterns exist in the data:
 *
 *   1. Brand-only slug — provider_name is just the brand, so provider_slug
 *      equals the brand slug exactly.
 *      Example: "inkOUT" → provider_slug "inkout" === brandToSlug("inkOUT")
 *      Location derived from city_slug ("austin", "chicago", …).
 *
 *   2. Brand+neighbourhood slug — provider_name includes the location.
 *      Example: "Removery (Bucktown)" → provider_slug "removery-bucktown"
 *      Location derived by stripping the brand prefix.
 */
function resolveProviderMeta(dbSlug: string, citySlug: string): ProviderResolution {
  // Pattern 1: exact match on a known brand slug
  if (MULTI_LOCATION_BRAND_SLUGS.includes(dbSlug)) {
    return {
      providerType: "multi-location",
      providerSlug: dbSlug,
      locationId: citySlug,
    };
  }

  // Pattern 2: starts with a known brand slug followed by "-"
  const matchingBrand = MULTI_LOCATION_BRAND_SLUGS.find(
    (bs) => dbSlug.startsWith(bs + "-")
  );
  if (matchingBrand) {
    return {
      providerType: "multi-location",
      providerSlug: matchingBrand,
      locationId: dbSlug.slice(matchingBrand.length + 1),
    };
  }

  return { providerType: "single-location", providerSlug: dbSlug };
}

// ── Mapper ───────────────────────────────────────────────────────────────────

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

export function dbReviewToReview(r: DbReview): Review {
  const { providerType, providerSlug, locationId } = resolveProviderMeta(
    r.provider_slug,
    r.city_slug
  );

  const painRaw = r.pain_level && r.pain_level !== "unknown"
    ? parseInt(r.pain_level, 10)
    : null;

  const sessions = r.sessions_completed
    ? parseInt(r.sessions_completed, 10) || null
    : null;

  return {
    id: r.id,
    reviewer: formatReviewerName(r.reviewer_name),
    provider: r.provider_name,
    providerSlug,
    providerType,
    locationId,
    locationName: `${r.location_city}, ${r.location_state}`,
    city: r.location_city,
    state: r.location_state,
    rating: r.star_rating,
    source: r.verified_source,
    date: formatReviewDate(r.review_date_at) ?? r.review_date ?? undefined,
    excerpt: r.review_text,   // cards use CSS line-clamp; excerpt = full text
    fullText: r.review_text,
    reviewUrl: r.source_review_url ?? undefined,
    tags: buildReviewTags(r.review_text),
    sessions,
    painLevel: Number.isNaN(painRaw) ? null : painRaw,
    scarringReported: r.scarring_mentioned === "Yes"
      ? true
      : r.scarring_mentioned === "No"
      ? false
      : null,
    resultsMentioned:
      r.result_rating != null && r.result_rating !== "unknown",
    // Fields not yet captured in Supabase schema — set to null until added
    healingIssues: null,
    costMentioned: null,
    staffMentioned: null,
    refundIssue: null,
  };
}

// ── Diversity selection ──────────────────────────────────────────────────────

/**
 * Select up to `maxCards` reviews from a pool, enforcing editorial diversity:
 *
 * - Never show the same provider+location combo twice.
 * - Default: max 1 card per provider brand.
 * - If the pool doesn't have enough distinct brands to fill `maxCards`, a second
 *   card from the same brand is allowed only when it comes from a different
 *   city/location.
 * - Returns fewer than `maxCards` when diversity genuinely runs out — never
 *   pads with repetitive brand/location combinations.
 *
 * `providerSlug` is used as the brand key (it is the brand-level slug for
 * multi-location providers; a unique per-location slug for single-location ones).
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

  // Second pass: allow a 2nd from the same brand only from a different location,
  // to fill remaining slots if strict diversity falls short.
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

// ── Supabase queries ─────────────────────────────────────────────────────────

/**
 * Fetch recent reviews for the homepage.
 *
 * Pulls a larger pool from Supabase so the diversity selector has room to work,
 * then trims down to `limit` cards with `selectDiverseReviews`.
 */
export async function getRecentReviews(limit = 6): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("review_date_at", { ascending: false, nullsFirst: false })
    .order("imported_at", { ascending: false })
    .limit(limit * 5); // wider pool so diversity selection has meaningful choices

  if (error) {
    console.error("getRecentReviews error:", error.message);
    return [];
  }
  const pool = (data ?? []).map(dbReviewToReview);
  return selectDiverseReviews(pool, limit);
}

/**
 * Fetch all reviews for a given provider slug, mapped to Review.
 *
 * Handles two patterns:
 *   - Single-location and brand-only slugs: exact match on provider_slug.
 *   - Multi-location brand slugs (e.g. "removery"): also matches sub-location
 *     slugs like "removery-bucktown" via a prefix filter.
 */
export async function getReviewsByProvider(providerSlug: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .or(`provider_slug.eq.${providerSlug},provider_slug.ilike.${providerSlug}-%`)
    .order("star_rating", { ascending: false });

  if (error) {
    console.error("getReviewsByProvider error:", error.message);
    return [];
  }
  return (data ?? []).map(dbReviewToReview);
}

/**
 * Return all unique canonical page slugs present in the reviews table.
 * Multi-location sub-slugs (e.g. "removery-bucktown") are collapsed to the
 * brand slug ("removery"). Single-location slugs are returned as-is.
 */
export async function getUniqueProviderSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("provider_slug");

  if (error || !data) return [];

  const rawSlugs = [...new Set(data.map((r) => r.provider_slug as string))];

  const canonical = rawSlugs.map((slug) => {
    // Collapse brand+location slugs (e.g. "removery-bucktown") → brand slug
    const matchingBrand = MULTI_LOCATION_BRAND_SLUGS.find(
      (bs) => slug.startsWith(bs + "-") || slug === bs
    );
    return matchingBrand ?? slug;
  });

  return [...new Set(canonical)];
}

/** Fetch all reviews for a given city slug, mapped to Review. */
export async function getReviewsByCity(citySlug: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("city_slug", citySlug)
    .order("star_rating", { ascending: false });

  if (error) {
    console.error("getReviewsByCity error:", error.message);
    return [];
  }
  return (data ?? []).map(dbReviewToReview);
}

/** Fetch every review, sorted best rating first. */
export async function getAllReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("star_rating", { ascending: false })
    .order("imported_at", { ascending: false });

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

  const orFilter = brandSlugs
    .flatMap((slug) => [`provider_slug.eq.${slug}`, `provider_slug.ilike.${slug}-%`])
    .join(",");

  const { data, error } = await supabase
    .from("reviews")
    .select("provider_slug, scarring_mentioned")
    .or(orFilter);

  if (error || !data) return {};

  const result: Record<string, { scarMentions: number; totalReviews: number }> = {};
  for (const slug of brandSlugs) {
    const rows = data.filter(
      (r) => r.provider_slug === slug || r.provider_slug.startsWith(slug + "-")
    );
    result[slug] = {
      scarMentions: rows.filter((r) => r.scarring_mentioned === "Yes").length,
      totalReviews: rows.length,
    };
  }
  return result;
}

/** Aggregate stats: total reviews, unique providers, unique cities. */
export async function getReviewStats(): Promise<{
  totalReviews: number;
  totalProviders: number;
  totalCities: number;
}> {
  const { data, error } = await supabase
    .from("reviews")
    .select("provider_name, location_city");

  if (error || !data) {
    return { totalReviews: 0, totalProviders: 0, totalCities: 0 };
  }

  return {
    totalReviews: data.length,
    totalProviders: new Set(data.map((r) => r.provider_name)).size,
    totalCities: new Set(data.map((r) => r.location_city)).size,
  };
}
