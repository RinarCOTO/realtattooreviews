import Link from "next/link";
import Stars from "@/components/reviews/ui/Stars";
import type { Review } from "@/types/review";

type Props = {
  review: Review;
  showProvider?: boolean;
};

export default function ReviewEvidenceCard({ review, showProvider = true }: Props) {
  const providerHref = review.providerSlug ? `/reviews/${review.providerSlug}` : "/reviews";
  const displayText = review.fullText ?? review.excerpt ?? "";

  const byline = review.reviewer ?? null;

  return (
    <article className="flex flex-col border border-(--line) bg-white p-5 rounded-xl">

      {/* Stars + rating / source badge */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {review.rating !== undefined && (
            <>
              <Stars rating={Math.round(review.rating)} size="sm" />
              <span className="text-[14px] font-semibold text-(--ink)">{review.rating.toFixed(1)}</span>
            </>
          )}
        </div>
        {review.source && (
          <span className="border border-(--accent) px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase text-(--accent)">
            {review.source}
          </span>
        )}
      </div>

      {/* Reviewer + date */}
      {byline && (
        <p className="mt-1.5 text-[12px] text-(--ink)">
          {byline}
        </p>
      )}

      {/* Provider link (optional) */}
      {showProvider && review.providerSlug && (
        <Link href={providerHref} className="mt-3 text-[12px] font-medium text-(--accent) hover:underline">
          {review.provider}
        </Link>
      )}

      {/* Quote */}
      <blockquote className="mt-4 m-0 text-[14px] leading-[1.6] text-(--ink) flex-1">
        &ldquo;{displayText}&rdquo;
      </blockquote>

      {/* Tags */}
      {(review.tags ?? []).length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-(--line) pt-3">
          {(review.tags ?? []).slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="border border-(--line) px-2.5 py-0.5 font-mono text-[11px] tracking-widest uppercase text-(--ink)"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
