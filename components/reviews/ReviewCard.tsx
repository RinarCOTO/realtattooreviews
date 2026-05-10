import type { PublicReview } from "@/types/public-review";
import MonoLabel from "./MonoLabel";
import ReviewTag from "./ReviewTag";

interface ReviewCardProps {
  review: PublicReview;
  featured?: boolean;
}

const PAIN_LABEL: Record<NonNullable<PublicReview["painSignal"]>, string> = {
  low: "Low pain signal",
  moderate: "Moderate pain signal",
  high: "High pain signal",
};

export default function ReviewCard({ review, featured = false }: ReviewCardProps) {
  const location = [review.city, review.state].filter(Boolean).join(", ");

  return (
    <article
      className="bg-white border border-(--line) rounded-xl flex flex-col gap-4"
      style={{ padding: featured ? 28 : 24 }}
    >
      <div className="flex justify-between items-start gap-3">
        <div>
          <MonoLabel className="mb-1.5">{location || "Location not listed"}</MonoLabel>
          <div className="text-[14px] font-semibold text-(--ink) tracking-[-0.01em] leading-[1.3]">
            {review.evidenceLabel}
          </div>
        </div>
        <span className="rounded-full border border-(--line) px-3 py-1 text-[12px] font-medium uppercase tracking-[0.08em] text-(--accent)">
          {review.ratingTier}
        </span>
      </div>

      <p
        className="m-0 leading-[1.4] text-(--ink) flex-1"
        style={{ fontSize: featured ? 20 : 16.5 }}
      >
        {review.summary}
      </p>

      <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-(--line)">
        <div>
          <MonoLabel className="mb-0.5">Result</MonoLabel>
          <div className="text-[13px] text-(--ink)">{review.resultTier ?? "Not classified"}</div>
        </div>
        <div>
          <MonoLabel className="mb-0.5">Pain</MonoLabel>
          <div className="text-[13px] text-(--ink)">
            {review.painSignal ? PAIN_LABEL[review.painSignal] : "Not shown"}
          </div>
        </div>
        {review.scarringSignal !== "none" && (
          <div className="col-span-2">
            <MonoLabel className="mb-0.5">Scarring</MonoLabel>
            <div className="text-[13px] text-(--ink)">Scarring {review.scarringSignal}</div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center gap-2">
        <div className="text-[13px] font-medium text-(--ink)">
          {review.monthLabel ?? "Date not listed"}
        </div>
        <span className="font-mono font-medium text-[12px] tracking-[0.12em] uppercase text-(--accent)">
          {review.sourceLabel}
        </span>
      </div>

      {review.visibleTags.length > 0 && (
        <div className="flex gap-1.5 flex-wrap">
          {review.visibleTags.slice(0, 3).map((tag) => (
            <ReviewTag key={tag}>{tag}</ReviewTag>
          ))}
        </div>
      )}
    </article>
  );
}
