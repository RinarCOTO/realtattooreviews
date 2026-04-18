/**
 * Normalized review shape used across all card components and page-data layers.
 *
 * Populated by mapping a DbReview via dbReviewToReview() in lib/data/reviews.ts,
 * or by constructing from mock data directly.
 */
export type Review = {
  id: string;

  // ── Provider identity ────────────────────────────────────────────────────
  provider: string;                              // brand/entity name, e.g. "Removery"
  providerSlug?: string;                         // brand-level slug, e.g. "removery"
  providerType?: "multi-location" | "single-location";

  // ── Location ─────────────────────────────────────────────────────────────
  locationId?: string;                           // stable slug for the specific location
  locationName?: string;                         // human-readable, e.g. "Bucktown, Chicago, IL"
  city?: string;
  state?: string;

  // ── Review content ───────────────────────────────────────────────────────
  rating?: number;
  source?: string;                               // e.g. "Google"
  date?: string;
  excerpt?: string;                              // short teaser for cards
  fullText?: string;                             // full review text for detail pages
  reviewUrl?: string;                            // link back to original source

  // ── Structured tags ──────────────────────────────────────────────────────
  tags?: string[];

  // ── Derived structured signals ───────────────────────────────────────────
  sessions?: number | null;
  painLevel?: number | null;                     // 1–5, derived from pain_level field
  scarringReported?: boolean | null;
  healingIssues?: boolean | null;
  costMentioned?: boolean | null;
  resultsMentioned?: boolean | null;
  staffMentioned?: boolean | null;
  refundIssue?: boolean | null;
};

/** Row shape from the Supabase reviews table (matches actual column names). */
export type DbReview = {
  id: string;
  provider_name: string;
  location_city: string;
  location_state: string;
  method_used: string | null;
  review_text: string;
  star_rating: number;
  review_date: string | null;
  review_date_at: string | null;
  reviewer_name: string | null;
  verified_source: string;
  _place_title: string | null;
  source_review_url: string | null;
  pain_level: "1" | "2" | "3" | "4" | "5" | "unknown" | null;
  scarring_mentioned: "Yes" | "No" | "Positive" | null;
  sessions_completed: string | null;
  skin_type: "Light" | "Medium" | "Dark" | "unknown" | null;
  use_case: "Complete" | "Cover-up" | "Microblading" | "Color" | "Other" | "unknown" | null;
  result_rating: "Positive" | "Neutral" | "Mixed" | "Negative" | "unknown" | null;
  provider_slug: string;
  city_slug: string;
  imported_at: string;
  created_at: string;
  updated_at: string;
};
