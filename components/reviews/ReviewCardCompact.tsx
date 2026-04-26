import Link from "next/link";
import { resolveProviderHref } from "@/lib/providers";
import Stars from "@/components/reviews/ui/Stars";
import SourceBadge from "@/components/reviews/ui/SourceBadge";
import type { Review } from "@/types/review";

type Props = { review: Review };

// ── Outcome badge ────────────────────────────────────────────────────────────

const OUTCOME_TIERS = [
  { min: 4, label: "Positive result", className: "bg-secondary-soft text-secondary" },
  { min: 3, label: "Mixed result",    className: "bg-warning-soft text-warning" },
  { min: 0, label: "Negative result", className: "bg-danger-soft text-danger" },
] as const;

function outcomeBadge(rating?: number, resultsMentioned?: boolean | null) {
  if (!resultsMentioned || rating == null) return null;
  return OUTCOME_TIERS.find((t) => rating >= t.min) ?? OUTCOME_TIERS[2];
}

// ── Component ────────────────────────────────────────────────────────────────

/**
 * ReviewCardCompact: homepage variant.
 *
 * Compact excerpt (line-clamp-2). City/location is the differentiator.
 * CTA routes to /reviews/{slug}#{location} for multi-location,
 * /reviews/{slug} for single-location.
 */
export default function ReviewCardCompact({ review }: Props) {
  const providerHref = resolveProviderHref(review);
  const badge = outcomeBadge(review.rating, review.resultsMentioned);
  const locationLine = review.locationName ?? (
    `${review.city ?? ""}${review.state ? `, ${review.state}` : ""}`
  );

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 transition-shadow hover:shadow-sm">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            href={providerHref}
            className="block truncate text-sm font-semibold text-heading hover:text-accent"
          >
            {review.provider}
          </Link>
          <p className="mt-0.5 text-xs text-muted">{locationLine}</p>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1.5">
          {review.rating != null && <Stars rating={review.rating} />}
          {badge && (
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium leading-tight ${badge.className}`}>
              {badge.label}
            </span>
          )}
        </div>
      </div>

      {/* ── Excerpt ─────────────────────────────────────────────────────── */}
      <p className="text-sm leading-relaxed text-body line-clamp-2">
        {review.excerpt ?? review.fullText}
      </p>

      {/* ── Tags ────────────────────────────────────────────────────────── */}
      {review.tags && review.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {review.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-bg px-2 py-0.5 text-[11px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t border-divider pt-3 text-xs">
        <div className="flex items-center gap-2">
          {review.date && <span className="text-muted">{review.date}</span>}
          {review.source && <SourceBadge source={review.source} />}
        </div>

        <Link
          href={providerHref}
          className="font-medium text-accent hover:underline"
          aria-label={`View all reviews for ${review.provider}, ${locationLine}`}
        >
          View provider →
        </Link>
      </div>
    </article>
  );
}
