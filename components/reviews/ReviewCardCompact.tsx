import type { PublicReview } from "@/types/public-review";

type Props = { review: PublicReview };

const TIER_CLASS: Record<PublicReview["ratingTier"], string> = {
  positive: "bg-secondary-soft text-secondary",
  mixed: "bg-warning-soft text-warning",
  negative: "bg-danger-soft text-danger",
  neutral: "bg-bg text-heading",
};

export default function ReviewCardCompact({ review }: Props) {
  const locationLine = [review.city, review.state].filter(Boolean).join(", ");

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="block truncate text-sm font-semibold text-heading">
            {review.evidenceLabel}
          </p>
          <p className="mt-0.5 text-xs text-heading">{locationLine || "Location not listed"}</p>
        </div>

        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium leading-tight ${TIER_CLASS[review.ratingTier]}`}>
          {review.ratingTier}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-body line-clamp-2">
        {review.summary}
      </p>

      {review.visibleTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {review.visibleTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-bg px-2 py-0.5 text-[11px] text-heading"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-divider pt-3 text-xs">
        <div className="flex items-center gap-2">
          {review.monthLabel && <span className="text-heading">{review.monthLabel}</span>}
          <span className="text-heading">{review.sourceLabel}</span>
        </div>
      </div>
    </article>
  );
}
