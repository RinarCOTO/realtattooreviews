import type { Review } from "@/types/review";
import { USE_CASE_DISPLAY, generateFindingText } from "@/lib/review-evidence";
import DevLabel from "@/components/dev/DevLabel";
import ProviderPill from "@/components/ui/ProviderPill";


function StarRating({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span
      className="ml-auto shrink-0 font-sans text-[13px] text-accent"
      aria-label={`${rating} out of 5 stars`}
    >
      {"★".repeat(full)}{"☆".repeat(5 - full)}{" "}{rating.toFixed(1)}
    </span>
  );
}

export default function ClassifiedReviewCard({ review }: { review: Review }) {
  const useCaseLabel = review.useCase
    ? (USE_CASE_DISPLAY[review.useCase] ?? "General")
    : null;
  const sentiment = review.resultRating ?? "Neutral";
  const location = [review.city, review.state].filter(Boolean).join(", ");

  // Use RTR paraphrase from DB if available; fall back to template-generated text
  const summaryText = review.reviewSummary ?? (
    review.useCase && review.resultRating ? generateFindingText(review) : null
  );

  if (!summaryText) return null;

  return (
    <DevLabel name="ClassifiedReviewCard">
    <article
      className="flex flex-col gap-3 rounded-xl border border-(--line) bg-white p-5 transition-shadow hover:shadow-md"
    >

      {/* Classification badges + star rating on one row */}
      <div className="flex flex-wrap items-center gap-2">
        {useCaseLabel && <ProviderPill tag={useCaseLabel} />}
        <ProviderPill tag={sentiment} />
        {review.methodUsed && review.methodUsed !== "Other" && (
          <ProviderPill tag={review.methodUsed} />
        )}
        {review.rating != null && <StarRating rating={review.rating} />}
      </div>

      {/* RTR paraphrase: no verbatim text, no quotation marks */}
      <p className="flex-1 text-[13px] leading-relaxed text-(--ink)">
        {summaryText}
      </p>

      {/* Attribution and per-review Google Maps link */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-(--line) pt-3">
        <p className="font-sans text-[11px] text-(--muted)">
          Sourced from Google Reviews{location ? `, ${location}` : ""}
        </p>
        {review.reviewUrl && (
          <a
            href={review.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-sans text-[11px] text-(--accent) hover:underline"
          >
            Read original on Google Maps
          </a>
        )}
      </div>

    </article>
    </DevLabel>
  );
}
