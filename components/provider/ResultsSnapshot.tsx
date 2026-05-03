import Link from "next/link";
import DevLabel from "@/components/dev/DevLabel";
import ChevronRightIcon from "@/components/ui/ChevronRightIcon";

interface ResultsSnapshotProps {
  totalReviews: number;
  resultsMentioned: number;
  painMentioned: number;
  scarringMentioned: number;
}

/**
 * Render a `count / total` split where the count is large and the
 * denominator sits in smaller type immediately to its right. We do not use
 * a muted color to soften the denominator (per RTR's no-muted-text rule).
 * font size + weight contrast carries the visual hierarchy instead.
 */
function CountWithDenominator({
  count,
  total,
  countColor,
}: {
  count: number;
  total: number;
  countColor: string;
}) {
  return (
    <p className="flex items-baseline gap-1.5">
      <span className="text-3xl font-bold" style={{ color: countColor }}>
        {count}
      </span>
      <span className="text-base font-medium text-(--ink)">
        / {total}
      </span>
    </p>
  );
}

export default function ResultsSnapshot({
  totalReviews,
  resultsMentioned,
  painMentioned,
  scarringMentioned,
}: ResultsSnapshotProps) {
  return (
    <DevLabel name="ResultsSnapshot">
    <div>
      <div className="rounded-xl bg-white p-5" style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)" }}>
        <p className="mb-1 font-sans text-[22px] font-semibold leading-[1.1] tracking-[-0.02em] text-(--ink)">
          Results Snapshot
        </p>
        <p className="mb-4 font-sans text-[13px] text-heading">
          Counts shown out of {totalReviews} sourced reviews.
        </p>

        <div className="grid grid-cols-3 divide-x divide-(--line)">

          {/* Results mentioned */}
          <div className="flex flex-col gap-1 pr-4">
            <CountWithDenominator
              count={resultsMentioned}
              total={totalReviews}
              countColor="var(--ink)"
            />
            <p className="text-sm text-heading">Results mentioned</p>
          </div>

          {/* Pain signals */}
          <div className="flex flex-col gap-1 px-4">
            <CountWithDenominator
              count={painMentioned}
              total={totalReviews}
              countColor={painMentioned === 0 ? "#5A7A5A" : "var(--ink)"}
            />
            <p className="text-sm text-heading">Pain signals</p>
          </div>

          {/* Scarring mentions */}
          <div className="flex flex-col gap-1 pl-4">
            <CountWithDenominator
              count={scarringMentioned}
              total={totalReviews}
              countColor={scarringMentioned === 0 ? "#5A7A5A" : "var(--accent)"}
            />
            <p className="text-sm text-heading">Scarring mentions</p>
          </div>

        </div>
      </div>

      {/* Moved outside the card */}
      <Link
        href="/before-and-after"
        className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-(--accent) hover:underline"
      >
        Explore before-and-after research <ChevronRightIcon className="size-3.5" />
      </Link>
    </div>
    </DevLabel>
  );
}
