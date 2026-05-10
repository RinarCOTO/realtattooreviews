import type { PublicReview } from "@/types/public-review";

type Props = {
  review: PublicReview;
  showProvider?: boolean;
};

export default function ReviewEvidenceCard({ review }: Props) {
  return (
    <article className="flex flex-col border border-(--line) bg-white p-5 rounded-xl">
      <div className="flex items-center justify-between gap-3">
        <span className="font-sans text-[13px] font-semibold text-(--ink)">
          {review.evidenceLabel}
        </span>
        <span className="border border-(--accent) px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase text-(--accent)">
          {review.ratingTier}
        </span>
      </div>

      <p className="mt-4 text-[13px] leading-relaxed text-(--ink)">
        {review.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-heading">
        {[review.city, review.state].filter(Boolean).join(", ") && (
          <span>{[review.city, review.state].filter(Boolean).join(", ")}</span>
        )}
        {review.monthLabel && <span>{review.monthLabel}</span>}
        <span>{review.sourceLabel}</span>
      </div>

      {review.visibleTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-(--line) pt-3">
          {review.visibleTags.slice(0, 3).map((tag) => (
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
