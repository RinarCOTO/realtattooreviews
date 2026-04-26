import type { Review } from "@/types/review";
import {
  generateFindingText,
  USE_CASE_DISPLAY,
  SENTIMENT_STYLE,
} from "@/lib/review-evidence";

type Props = { review: Review };

export default function EvidenceCard({ review }: Props) {
  const useCaseLabel = review.useCase
    ? (USE_CASE_DISPLAY[review.useCase] ?? "GENERAL")
    : "GENERAL";
  const sentiment = review.resultRating ?? "Neutral";
  const sentimentStyle = SENTIMENT_STYLE[sentiment] ?? SENTIMENT_STYLE["Neutral"];
  const city = review.city ?? "";
  const state = review.state ?? "";
  const location = [city, state].filter(Boolean).join(", ");
  const source = review.source ?? "Google review";
  const stars = review.rating;

  return (
    <article className="flex flex-col gap-3 border border-(--line) bg-white p-5 rounded-xl">

      {/* Use-case + sentiment tags */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] tracking-widest uppercase text-(--muted) border border-(--line) px-2 py-0.5">
          {useCaseLabel}
        </span>
        <span className="font-mono text-[10px] px-0.5 text-(--muted)">|</span>
        <span className={`font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm ${sentimentStyle}`}>
          {sentiment}
        </span>
      </div>

      {/* Paraphrased finding */}
      <p className="text-[13px] leading-relaxed text-(--ink) flex-1">
        {generateFindingText(review)}
      </p>

      {/* Source attribution */}
      <p className="font-mono text-[11px] text-(--muted) border-t border-(--line) pt-3">
        Source: {source}{stars != null ? `, ${stars} stars` : ""}
        {location ? ` | ${location}` : ""}
      </p>

    </article>
  );
}
