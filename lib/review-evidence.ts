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
  "Complete":    "COMPLETE REMOVAL",
  "Microblading": "MICROBLADING",
  "Color":       "COLOR INK",
  "Cover-up":    "COVER-UP",
  "Other":       "GENERAL",
};

export const SENTIMENT_STYLE: Record<string, string> = {
  "Positive": "bg-secondary-soft text-secondary",
  "Negative": "bg-danger-soft text-danger",
  "Mixed":    "bg-warning-soft text-warning",
  "Neutral":  "bg-(--surface) text-(--muted)",
};
