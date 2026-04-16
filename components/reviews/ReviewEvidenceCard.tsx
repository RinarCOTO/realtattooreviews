import Link from "next/link";
import type { Review } from "@/types/review";

type Props = {
  review: Review;
  showProvider?: boolean;
};

const subRatingLabels = {
  outcomes: "Outcomes",
  consistency: "Consistency",
  pricing: "Pricing",
  communication: "Communication",
};

function RatingBadge({ rating }: { rating: number }) {
  const color =
    rating >= 4.5
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : rating >= 3.5
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-red-50 text-red-700 border-red-200";

  return (
    <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-sm font-semibold ${color}`}>
      {rating.toFixed(1)}
      <span className="ml-1 text-xs font-normal opacity-60">/ 5</span>
    </span>
  );
}

function StarBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-3 w-3 ${star <= value ? "text-amber-400" : "text-border"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewEvidenceCard({ review, showProvider = true }: Props) {
  return (
    <article className="flex flex-col rounded-lg border border-border bg-surface p-5 transition-shadow hover:shadow-sm">

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          {showProvider && (
            <Link
              href={`/reviews/${review.providerSlug}`}
              className="text-sm font-semibold text-heading hover:text-accent"
            >
              {review.providerName}
            </Link>
          )}
          <div className="flex items-center gap-2">
            <StarBar value={Math.round(review.rating)} />
            <span className="text-xs text-muted">{review.city}</span>
          </div>
        </div>
        <RatingBadge rating={review.rating} />
      </div>

      {/* Body */}
      <p className="mt-4 text-sm leading-relaxed text-muted line-clamp-3">
        {review.body}
      </p>

      {/* Sub-ratings */}
      {review.subRatings && (
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-divider pt-4">
          {(Object.keys(review.subRatings) as (keyof typeof review.subRatings)[]).map((key) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-xs text-muted">{subRatingLabels[key]}</span>
              <div className="flex items-center gap-1.5">
                <div className="h-1 w-16 overflow-hidden rounded-full bg-bg">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${(review.subRatings![key] / 5) * 100}%` }}
                  />
                </div>
                <span className="w-4 text-right text-xs font-medium text-body">
                  {review.subRatings![key]}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

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
          {review.sessions && <span>{review.sessions} sessions</span>}
          <span>{review.date}</span>
          {review.verified && (
            <span className="flex items-center gap-1 text-emerald-600">
              <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Verified
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
