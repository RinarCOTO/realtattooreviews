import Link from "next/link";
import Stars from "@/components/reviews/ui/Stars";
import SourceBadge from "@/components/reviews/ui/SourceBadge";
import type { Review } from "@/types/review";

type Props = {
  review: Review;
  showProvider?: boolean;
};

// ── Numeric rating badge (detail pages only) ─────────────────────────────────

function RatingBadge({ rating }: { rating: number }) {
  const className =
    rating >= 4.5
      ? "bg-secondary-soft text-secondary border-secondary/20"
      : rating >= 3.5
      ? "bg-warning-soft text-warning border-warning/20"
      : "bg-danger-soft text-danger border-danger/20";

  return (
    <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-sm font-semibold ${className}`}>
      {rating.toFixed(1)}
      <span className="ml-1 text-xs font-normal opacity-60">/ 5</span>
    </span>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ReviewEvidenceCard({ review, showProvider = true }: Props) {
  const providerHref = review.providerSlug ? `/providers/${review.providerSlug}` : "/providers";
  const displayText = review.fullText ?? review.excerpt ?? "";
  const locationLine = review.locationName ?? review.city ?? null;

  return (
    <article className="flex flex-col rounded-lg border border-border bg-surface p-5 transition-shadow hover:shadow-sm">

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          {showProvider && (
            <Link
              href={providerHref}
              className="text-sm font-semibold text-heading hover:text-accent"
            >
              {review.provider}
              {review.providerType === "multi-location" && review.locationName && (
                <span className="ml-1.5 font-normal text-muted">· {review.locationName}</span>
              )}
            </Link>
          )}
          <div className="flex items-center gap-2">
            {review.rating !== undefined && <Stars rating={Math.round(review.rating)} />}
            {locationLine && <span className="text-xs text-muted">{locationLine}</span>}
          </div>
        </div>
        {review.rating !== undefined && <RatingBadge rating={review.rating} />}
      </div>

      {/* Body */}
      <p className="mt-4 text-sm leading-relaxed text-muted line-clamp-3">
        {displayText}
      </p>

      {/* Footer */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-divider pt-4">
        <div className="flex flex-wrap gap-1.5">
          {review.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-bg px-2 py-0.5 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-subtle">
          {review.sessions != null && <span>{review.sessions} sessions</span>}
          {review.date && <span>{review.date}</span>}
          {review.source && <SourceBadge source={review.source} />}
        </div>
      </div>
    </article>
  );
}
