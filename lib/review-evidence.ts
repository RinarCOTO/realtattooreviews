import type { Review } from "@/types/review";

// Priority order for evidence card sorting (CC spec)
const USE_CASE_ORDER = ["Complete", "Microblading", "Color", "Cover-up", "Other", null] as const;
const SENTIMENT_ORDER = ["Negative", "Mixed", "Positive", "Neutral", null] as const;

type UseCaseKey = "Complete" | "Cover-up" | "Microblading" | "Color" | "Other";
type SentimentKey = "Positive" | "Negative" | "Mixed" | "Neutral";
type TemplateKey = `${UseCaseKey}_${SentimentKey}`;

/**
 * Select evidence reviews sorted by use-case diversity then negative-first
 * (per CC evidence display spec). Filters to reviews with both useCase and
 * resultRating populated.
 */
export function selectEvidenceReviews(reviews: Review[], maxCards = 10): Review[] {
  return [...reviews]
    .filter((r) => r.resultRating != null && r.useCase != null)
    .sort((a, b) => {
      const ucA = USE_CASE_ORDER.indexOf(a.useCase as typeof USE_CASE_ORDER[number]);
      const ucB = USE_CASE_ORDER.indexOf(b.useCase as typeof USE_CASE_ORDER[number]);
      if (ucA !== ucB) return ucA - ucB;
      const sA = SENTIMENT_ORDER.indexOf(a.resultRating as typeof SENTIMENT_ORDER[number]);
      const sB = SENTIMENT_ORDER.indexOf(b.resultRating as typeof SENTIMENT_ORDER[number]);
      if (sA !== sB) return sA - sB;
      return (a.rating ?? 5) - (b.rating ?? 5);
    })
    .slice(0, maxCards);
}

/**
 * Generate a paraphrased finding from classification fields.
 * No verbatim review text is used. Output is RTR's own editorial description
 * of the review signal.
 */
export function generateFindingText(review: Review): string {
  const city = review.city ?? "an unknown location";
  const method = review.methodUsed && review.methodUsed !== "Other" ? review.methodUsed : null;
  const methodText = method ? ` using ${method}` : "";
  const stars = review.rating;
  const starsText = stars != null ? ` ${stars} stars.` : "";

  const templates: Partial<Record<TemplateKey, string>> = {
    "Complete_Positive":    `Reviewer in ${city} described a positive complete removal outcome${methodText}.`,
    "Complete_Negative":    `Reviewer in ${city} reported concerns with complete removal progress.${starsText}`,
    "Complete_Mixed":       `Reviewer in ${city} reported mixed results on complete removal. Positive on some aspects, concerns on others.`,
    "Complete_Neutral":     `Reviewer in ${city} mentioned complete removal without a strong positive or negative outcome.`,
    "Microblading_Positive": `Reviewer in ${city} reported successful microblading removal${methodText}.`,
    "Microblading_Negative": `Reviewer in ${city} reported concerns with microblading removal outcome.${starsText}`,
    "Microblading_Mixed":   `Reviewer in ${city} reported mixed results on microblading removal.`,
    "Microblading_Neutral": `Reviewer in ${city} mentioned microblading removal without a clear positive or negative outcome.`,
    "Color_Positive":       `Reviewer in ${city} described positive results on color ink removal${methodText}.`,
    "Color_Negative":       `Reviewer in ${city} reported difficulty with color ink clearance.${starsText}`,
    "Color_Mixed":          `Reviewer in ${city} reported partial results on color ink removal.`,
    "Color_Neutral":        `Reviewer in ${city} mentioned color ink removal without a clear outcome noted.`,
    "Cover-up_Positive":    `Reviewer in ${city} reported successful fading for cover-up preparation.`,
    "Cover-up_Negative":    `Reviewer in ${city} reported insufficient fading for planned cover-up.${starsText}`,
    "Cover-up_Mixed":       `Reviewer in ${city} reported partial fading for cover-up preparation.`,
    "Cover-up_Neutral":     `Reviewer in ${city} mentioned cover-up prep without a clear outcome noted.`,
    "Other_Positive":       `Reviewer in ${city} shared a positive experience${methodText}.`,
    "Other_Negative":       `Reviewer in ${city} shared a negative experience.${starsText}`,
    "Other_Mixed":          `Reviewer in ${city} reported mixed results.`,
    "Other_Neutral":        `Reviewer in ${city} shared a neutral experience.`,
  };

  const key = `${review.useCase}_${review.resultRating}` as TemplateKey;
  let text =
    templates[key] ??
    `Reviewer in ${city} shared a ${(review.resultRating ?? "neutral").toLowerCase()} experience.${starsText}`;

  if (review.scarringPraised) {
    text += " Specifically noted minimal scarring.";
  } else if (review.scarringReported) {
    text += " Mentioned scarring concerns.";
  }

  return text;
}

export const USE_CASE_DISPLAY: Record<string, string> = {
  "Complete":    "Complete Removal",
  "Microblading": "Microblading",
  "Color":       "Color Ink",
  "Cover-up":    "Cover-Up",
  "Other":       "General",
};

export const SENTIMENT_STYLE: Record<string, string> = {
  "Positive": "bg-[#E8E0D8] text-[#3D3530]",
  "Negative": "bg-[#F0D5CF] text-(--accent)",
  "Mixed":    "bg-[#EDEBE8] text-[#8A8078]",
  "Neutral":  "bg-[#EDEBE8] text-[#8A8078]",
};

// ── Pattern summary (Layer 1 of What Reviewers Say) ───────────────────────────

export type PatternGroup = {
  useCase: string;
  label: string;
  count: number;
  positives: number;
  negatives: number;
  avgStars: number | null;
  cities: string[];
  scarringSignal: "praised" | "reported" | null;
};

const USE_CASE_SORT_ORDER = ["Complete", "Microblading", "Color", "Cover-up", "Other"];

export function buildPatternSummary(reviews: Review[]): PatternGroup[] {
  // Only include reviews with both classification fields populated (mirrors the Supabase query filter)
  const classified = reviews.filter((r) => r.useCase != null && r.resultRating != null);

  const grouped: Record<string, Review[]> = {};
  for (const r of classified) {
    const key = r.useCase!;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(r);
  }

  return Object.entries(grouped)
    .map(([useCase, group]): PatternGroup => {
      const positives = group.filter((r) => r.resultRating === "Positive").length;
      const negatives = group.filter((r) => r.resultRating === "Negative").length;
      const stars = group.map((r) => r.rating).filter((s): s is number => s != null);
      const avgStars =
        stars.length > 0
          ? Math.round((stars.reduce((a, b) => a + b, 0) / stars.length) * 10) / 10
          : null;
      const cities = [
        ...new Set(group.map((r) => r.city).filter((c): c is string => Boolean(c))),
      ];
      const hasPraised = group.some((r) => r.scarringPraised);
      const hasReported = group.some((r) => r.scarringReported);
      return {
        useCase,
        label: USE_CASE_DISPLAY[useCase] ?? useCase.toUpperCase(),
        count: group.length,
        positives,
        negatives,
        avgStars,
        cities,
        scarringSignal: hasPraised ? "praised" : hasReported ? "reported" : null,
      };
    })
    .sort(
      (a, b) =>
        USE_CASE_SORT_ORDER.indexOf(a.useCase) - USE_CASE_SORT_ORDER.indexOf(b.useCase)
    );
}

// ── Classified review selection (Layer 2 of What Reviewers Say) ───────────────

export type SortKey = "most_useful" | "most_recent" | "highest_rated" | "critical_first";

function compareDateDesc(a: string | undefined, b: string | undefined): number {
  if (!a && !b) return 0;
  if (!a) return 1;   // nulls last
  if (!b) return -1;
  return b.localeCompare(a);
}

export function sortClassifiedReviews(reviews: Review[], sortKey: SortKey = "most_useful"): Review[] {
  const filtered = [...reviews].filter(
    (r) => r.resultRating != null && (r.reviewSummary || r.useCase) && (r.hasText !== false || r.reviewSummary != null)
  );

  if (sortKey === "most_recent") {
    return filtered.sort((a, b) => compareDateDesc(a.dateISO, b.dateISO));
  }

  if (sortKey === "highest_rated") {
    return filtered.sort((a, b) => {
      const diff = (b.rating ?? 0) - (a.rating ?? 0);
      return diff !== 0 ? diff : compareDateDesc(a.dateISO, b.dateISO);
    });
  }

  if (sortKey === "critical_first") {
    // "Critical first" filters to actually-critical reviews (rating <= 3),
    // not just an ascending sort. Earlier behavior was to sort ascending and
    // page through the results, which silently mixed in 4- and 5-star cards
    // once the small pool of low-rated reviews was exhausted — confusing for
    // users who tap "Critical first" and then see a 5-star card on the same
    // screen. Filtering reflects the editorial intent of the label.
    return filtered
      .filter((r) => (r.rating ?? 5) <= 3)
      .sort((a, b) => {
        const diff = (a.rating ?? 5) - (b.rating ?? 5);
        return diff !== 0 ? diff : compareDateDesc(a.dateISO, b.dateISO);
      });
  }

  // most_useful: usefulness score then recency
  const sorted = filtered.sort((a, b) => {
    const tA = a.excerpt ? 1 : 0;
    const tB = b.excerpt ? 1 : 0;
    if (tA !== tB) return tB - tA;

    const rrA = a.resultRating != null ? 1 : 0;
    const rrB = b.resultRating != null ? 1 : 0;
    if (rrA !== rrB) return rrB - rrA;

    const ucA = a.useCase != null ? 1 : 0;
    const ucB = b.useCase != null ? 1 : 0;
    if (ucA !== ucB) return ucB - ucA;

    return compareDateDesc(a.dateISO, b.dateISO);
  });

  // If the top 6 are all 5-star, insert the first non-5-star review at position 3
  const firstNonFive = sorted.findIndex((r) => (r.rating ?? 5) < 5);
  if (firstNonFive >= 6) {
    const [pulled] = sorted.splice(firstNonFive, 1);
    sorted.splice(2, 0, pulled);
  }

  return sorted;
}

export function selectClassifiedReviews(reviews: Review[]): Review[] {
  return sortClassifiedReviews(reviews, "most_useful");
}
