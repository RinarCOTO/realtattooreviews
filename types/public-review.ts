export type RatingTier = "positive" | "mixed" | "negative" | "neutral";
export type ResultTier = "complete" | "fade" | "mixed" | "no-result" | null;
export type PainSignal = "low" | "moderate" | "high" | null;
export type ScarringSignal = "none" | "mentioned" | "praised" | null;

export type PublicReview = {
  id: string;
  ratingTier: RatingTier;
  summary: string;
  evidenceLabel: string;
  city: string | null;
  state: string | null;
  monthLabel: string | null;
  sourceLabel: string;
  visibleTags: string[];
  resultTier: ResultTier;
  painSignal: PainSignal;
  scarringSignal: ScarringSignal;
  costMentioned: boolean;
  staffMentioned: boolean;
};
