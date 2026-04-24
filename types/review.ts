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

  // ── Reviewer ─────────────────────────────────────────────────────────────
  reviewer?: string | null;                        // e.g. "Anastasia P."

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
  painLevel?: number | null;                     // 1–5
  scarringReported?: boolean | null;
  healingIssues?: boolean | null;
  costMentioned?: boolean | null;
  resultsMentioned?: boolean | null;
  staffMentioned?: boolean | null;
  refundIssue?: boolean | null;
};

/**
 * Row shape from the Supabase competitor_reviews table.
 *
 * Key differences from the old `reviews` table shape:
 *   - review_date_iso replaces review_date_at
 *   - pain_level is a number (not a string "1"–"5")
 *   - sessions_completed is a number (not a string)
 *   - provider_slug and city_slug do not exist; derived in application code
 *   - source_review_url does not exist in this table
 *   - bucket, is_tattoo_removal, status, reviewed_decision, etc. are new filter columns
 */
export type DbReview = {
  id: string;
  provider_name: string;
  location_city: string;
  location_state: string;
  method_used: string | null;
  review_text: string | null;
  star_rating: number;
  review_date: string | null;
  review_date_iso: string | null;               // ISO timestamp; replaces review_date_at
  reviewer_name: string | null;
  verified_source: string;
  _place_title: string | null;
  pain_level: number | "unknown" | null;        // already a number, not a string
  scarring_mentioned: "Yes" | "No" | null;
  sessions_completed: number | "unknown" | null; // already a number, not a string
  skin_type: "Light" | "Medium" | "Dark" | "unknown" | null;
  use_case: "Complete" | "Cover-up" | "Microblading" | "Color" | "Other" | "unknown" | null;
  result_rating: "Positive" | "Neutral" | "Mixed" | "Negative" | "unknown" | null;
  // ── Pipeline filter columns ──────────────────────────────────────────────
  // inkOUT reviews: bucket = 'inkout' | 'tatt2away' | 'review_required'
  // Competitor reviews: bucket = null (never processed by separator pipeline)
  bucket: "inkout" | "tatt2away" | "review_required" | "competitor" | null;
  is_tattoo_removal: boolean | null;
  status: "published" | "pending" | "rejected" | "draft" | null;
  reviewed_decision: string | null;
  reviewed_at: string | null;
  routing_reason: string | null;
  relevance_reason: string | null;
  last_analyzed_at: string | null;
};
