import StarsFull from "./StarsFull";

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
    <div className="flex flex-col p-[24px_28px] border border-(--line) bg-white min-w-65 rounded-xl">
      <span className="font-sans text-[10px] tracking-[0.14em] uppercase text-(--accent)">
        Our Verdict
      </span>
      <span className="mt-2 font-sans text-[28px] font-bold tracking-[-0.02em] text-(--ink)">
        {verdictLabel}
      </span>
      <div className="h-px bg-(--line) my-4" />
      <div className="flex items-center gap-2.5 flex-wrap">
        <span className="font-sans text-[52px] font-bold leading-none tracking-[-0.04em] text-(--ink)">
          {avgRating}
        </span>
        <span className="text-[14px] text-(--muted) self-end mb-1">/ 5</span>
        <StarsFull rating={Math.round(avgRatingValue)} />
      </div>
      <span className="mt-3 font-sans text-[12px] text-(--muted) leading-normal">
        Based on {reviewCount} sourced reviews · {sourcesSummary}
      </span>

      {verdictSummary && (
        <p className="mt-4 text-[12px] leading-relaxed text-(--muted) border-t border-(--line) pt-4">
          {verdictSummary}
        </p>
      )}
      {(bestFor || lessIdealFor) && (
        <div className="mt-4 flex flex-col gap-2 border-t border-(--line) pt-4">
          {bestFor && (
            <p className="text-[11px] leading-relaxed text-(--muted)">
              <span className="font-medium text-(--ink)">Best fit for:</span> {bestFor}
            </p>
          )}
          {lessIdealFor && (
            <p className="text-[11px] leading-relaxed text-(--muted)">
              <span className="font-medium text-(--ink)">Less ideal for:</span> {lessIdealFor}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
