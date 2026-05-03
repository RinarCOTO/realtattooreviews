import StarsFull from "./StarsFull";
import DevLabel from "@/components/dev/DevLabel";

interface VerdictCardProps {
  verdictLabel: string;
  avgRating: string;
  avgRatingValue: number;
  reviewCount: number;
  sourcesSummary: string;
  verdictSummary?: string;
  bestFor?: string;
  lessIdealFor?: string;
}

export default function VerdictCard({
  verdictLabel,
  avgRating,
  avgRatingValue,
  reviewCount,
  sourcesSummary,
  verdictSummary,
  bestFor,
  lessIdealFor,
}: VerdictCardProps) {
  return (
    <DevLabel name="VerdictCard">
    <div className="flex w-full min-w-0 max-w-full flex-col rounded-xl border border-(--line) bg-white p-5 sm:min-w-65 sm:p-[24px_28px]">
      <span className="font-sans text-[10px] tracking-[0.14em] uppercase text-(--accent)">
        Our Verdict
      </span>
      <span className="mt-2 break-words font-sans text-[clamp(22px,6vw,28px)] font-bold leading-tight tracking-[-0.02em] text-(--ink)">
        {verdictLabel}
      </span>
      <div className="h-px bg-(--line) my-4" />
      <div className="flex items-center gap-2.5 flex-wrap">
        <span className="font-sans text-[clamp(42px,13vw,52px)] font-bold leading-none tracking-[-0.04em] text-(--ink)">
          {avgRating}
        </span>
        <span className="text-[14px] text-heading self-end mb-1">/ 5</span>
        <StarsFull rating={Math.round(avgRatingValue)} />
      </div>
      <span className="mt-3 font-sans text-[12px] text-heading leading-normal">
        Based on {reviewCount} sourced reviews · {sourcesSummary}
      </span>

      {verdictSummary && (
        <p className="mt-4 text-[12px] leading-relaxed text-heading border-t border-(--line) pt-4">
          {verdictSummary}
        </p>
      )}
      {(bestFor || lessIdealFor) && (
        <div className="mt-4 flex flex-col gap-2 border-t border-(--line) pt-4">
          {bestFor && (
            <p className="text-[11px] leading-relaxed text-heading">
              <span className="font-medium text-(--ink)">Best fit for:</span> {bestFor}
            </p>
          )}
          {lessIdealFor && (
            <p className="text-[11px] leading-relaxed text-heading">
              <span className="font-medium text-(--ink)">Less ideal for:</span> {lessIdealFor}
            </p>
          )}
        </div>
      )}
    </div>
    </DevLabel>
  );
}
