import type { Review } from "@/types/review";
import { USE_CASE_DISPLAY, SENTIMENT_STYLE, generateFindingText } from "@/lib/review-evidence";

function StarRating({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="text-amber-400 text-[13px]" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(full)}
      {"☆".repeat(5 - full)}
    </span>
  );
}

export default function ClassifiedReviewCard({ review }: { review: Review }) {
  const useCaseLabel = review.useCase
    ? (USE_CASE_DISPLAY[review.useCase] ?? "GENERAL")
    : null;
  const sentiment = review.resultRating ?? "Neutral";
  const sentimentStyle = SENTIMENT_STYLE[sentiment] ?? SENTIMENT_STYLE["Neutral"];
  const location = [review.city, review.state].filter(Boolean).join(", ");

  // Use RTR paraphrase from DB if available; fall back to template-generated text from classification fields
  const summaryText = review.reviewSummary ?? (
    review.useCase && review.resultRating ? generateFindingText(review) : null
  );

  if (!summaryText) return null;

  const mapsUrl = review.reviewUrl ?? `https://www.google.com/maps/search/${encodeURIComponent(
    [review.provider, review.city, "tattoo removal"].filter(Boolean).join(" ")
  )}`;

  return (
    <article className="flex flex-col gap-3 border border-(--line) bg-white p-5 rounded-xl">

      {/* Classification badges */}
      <div className="flex flex-wrap items-center gap-2">
        {useCaseLabel && (
          <span className="font-mono text-[10px] tracking-widest uppercase text-(--muted) border border-(--line) px-2 py-0.5">
            {useCaseLabel}
          </span>
        )}
        <span className={`font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm ${sentimentStyle}`}>
          {sentiment}
        </span>
        {review.methodUsed && review.methodUsed !== "Other" && (
          <span className="font-mono text-[10px] tracking-widest uppercase text-(--muted) border border-(--line) px-2 py-0.5">
            {review.methodUsed}
          </span>
        )}
      </div>

      {/* Visual star rating */}
      {review.rating != null && <StarRating rating={review.rating} />}

      {/* RTR paraphrase: no verbatim text, no quotation marks */}
      <p className="text-[13px] leading-relaxed text-(--ink) flex-1">
        {summaryText}
      </p>

      {/* Attribution and per-review Google Maps link */}
      <div className="border-t border-(--line) pt-3 flex items-center justify-between gap-2 flex-wrap">
        <p className="font-mono text-[11px] text-(--muted)">
          Sourced from Google Reviews{location ? `, ${location}` : ""}
        </p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] text-(--accent) hover:underline shrink-0"
        >
          Read original on Google Maps
        </a>
      </div>

    </article>
  );
}
