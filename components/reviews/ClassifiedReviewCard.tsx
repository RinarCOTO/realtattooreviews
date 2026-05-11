import type { PublicReview } from "@/types/public-review";
import DevLabel from "@/components/dev/DevLabel";
import ProviderPill from "@/components/ui/ProviderPill";

const RATING_TIER_LABEL: Record<PublicReview["ratingTier"], string> = {
  positive: "Positive",
  mixed: "Mixed",
  negative: "Critical",
  neutral: "Neutral",
};

export default function ClassifiedReviewCard({ review }: { review: PublicReview }) {
  const location = [review.city, review.state].filter(Boolean).join(", ");

  return (
    <DevLabel name="ClassifiedReviewCard">
      <article className="flex flex-col gap-3 rounded-xl border border-(--line) bg-white p-5 transition-shadow hover:shadow-md">
        <div className="flex flex-wrap items-center gap-2">
          <ProviderPill tag={review.evidenceLabel} />
          <ProviderPill tag={RATING_TIER_LABEL[review.ratingTier]} />
          {review.resultTier && <ProviderPill tag={review.resultTier} />}
        </div>

        <p className="flex-1 text-[14px] leading-relaxed text-(--ink)">
          {review.summary}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-(--line) pt-3">
          <p className="font-sans text-[11px] text-heading">
            Source: {review.sourceLabel}{location ? `, ${location}` : ""}
          </p>
          {review.monthLabel && (
            <p className="font-sans text-[11px] text-heading">{review.monthLabel}</p>
          )}
        </div>
      </article>
    </DevLabel>
  );
}
