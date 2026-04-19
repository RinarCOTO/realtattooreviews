import type { Review } from "@/types/review";
import MonoLabel from "./MonoLabel";
import RatingPill from "./RatingPill";
import PainBar from "./PainBar";
import ReviewTag from "./ReviewTag";

interface ReviewCardProps {
  review: Review;
  featured?: boolean;
}

export default function ReviewCard({ review, featured = false }: ReviewCardProps) {
  const excerpt = review.excerpt ?? "";
  const clipped =
    excerpt.length > 200 ? excerpt.slice(0, 200) + "\u2026" : excerpt;

  return (
    <article
      className="bg-white border border-(--line) rounded-xl flex flex-col gap-4"
      style={{ padding: featured ? 28 : 24 }}
    >
      <div className="flex justify-between items-start gap-3">
        <div>
          <MonoLabel className="mb-1.5">{review.city}</MonoLabel>
          <div className="text-[14px] font-semibold text-(--ink) tracking-[-0.01em] leading-[1.3]">
            {review.provider}
          </div>
        </div>
        {review.rating != null && <RatingPill value={review.rating} />}
      </div>

      <blockquote
        className="m-0 leading-[1.4] text-(--ink) italic flex-1"
        style={{ fontSize: featured ? 20 : 16.5 }}
      >
        &ldquo;{clipped}&rdquo;
      </blockquote>

      <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-(--line)">
        <div>
          <MonoLabel className="mb-0.5">Sessions</MonoLabel>
          <div className="text-[14px] font-semibold text-(--ink)">
            {review.sessions ?? "Not reported"}
          </div>
        </div>
        <div>
          <MonoLabel className="mb-0.5">Pain</MonoLabel>
          <div className="mt-1">
            {review.painLevel != null ? (
              <PainBar level={review.painLevel} />
            ) : (
              <span className="text-[12px] text-(--muted) font-mono font-medium">N/A</span>
            )}
          </div>
        </div>
        {review.resultsMentioned && (
          <div className="col-span-2">
            <MonoLabel className="mb-0.5">Outcome</MonoLabel>
            <div className="text-[13px] text-(--ink)">Results mentioned in review</div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center gap-2">
        <div className="text-[13px] font-medium text-(--ink)">
          {review.reviewer ?? review.date ?? "Verified reviewer"}
        </div>
        <span className="font-mono font-medium text-[12px] tracking-[0.12em] uppercase text-(--accent)">
          {review.source}
        </span>
      </div>

      {(review.tags ?? []).length > 0 && (
        <div className="flex gap-1.5 flex-wrap">
          {(review.tags ?? []).slice(0, 3).map((t) => (
            <ReviewTag key={t}>{t}</ReviewTag>
          ))}
        </div>
      )}
    </article>
  );
}
