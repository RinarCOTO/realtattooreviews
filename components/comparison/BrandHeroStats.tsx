import { getBrandComparisonAggregates, type BrandComparisonRow } from "@/lib/data/reviews";

type Props = {
  brandA: string;
  brandB: string;
};

function aggregate(brandRows: BrandComparisonRow[]) {
  const totalSample = brandRows.reduce((s, r) => s + r.sampleSize, 0);
  const weightedStarSum = brandRows.reduce(
    (s, r) => s + (r.avgStars ?? 0) * r.sampleSize,
    0
  );
  const avgStars =
    totalSample > 0 ? (weightedStarSum / totalSample).toFixed(1) : null;

  // Star-distribution counts: aggregate raw counts so percentages are accurate
  const totalHigh = brandRows.reduce((s, r) => s + r.starsHigh, 0);
  const totalMid  = brandRows.reduce((s, r) => s + r.starsMid,  0);
  const totalLow  = brandRows.reduce((s, r) => s + r.starsLow,  0);
  const pctHigh = totalSample > 0 ? Math.round((totalHigh / totalSample) * 100) : null;
  const pctMid  = totalSample > 0 ? Math.round((totalMid  / totalSample) * 100) : null;
  const pctLow  = totalSample > 0 ? Math.round((totalLow  / totalSample) * 100) : null;

  return { totalSample, avgStars, pctHigh, pctMid, pctLow };
}

function StarDisplay({ avgStars }: { avgStars: string }) {
  const rating = parseFloat(avgStars);
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = i <= full;
          const isHalf = i === full + 1 && half;
          return (
            <svg
              key={i}
              className={`w-4 h-4 ${filled ? "text-amber-400" : isHalf ? "text-amber-300" : "text-(--line)"}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        })}
      </div>
    </div>
  );
}

function BrandCard({
  brand,
  totalSample,
  avgStars,
  pctHigh,
  pctMid,
  pctLow,
}: {
  brand: string;
  totalSample: number;
  avgStars: string | null;
  pctHigh: number | null;
  pctMid: number | null;
  pctLow: number | null;
}) {
  if (totalSample === 0) return null;

  return (
    <div className="flex-1 min-w-[200px] max-w-[280px] rounded-xl border border-(--line) bg-white shadow-[0_2px_10px_0_rgb(0,0,0,0.07)] p-5">
      {/* Brand label */}
      <p className="font-sans text-[10px] font-semibold uppercase tracking-widest text-heading m-0 mb-4">
        {brand}
      </p>

      {/* Headline: avg star rating */}
      {avgStars && (
        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="font-sans text-[48px] font-bold leading-none tracking-[-0.03em] text-(--ink)">
            {avgStars}
          </span>
          <div className="flex flex-col gap-1 pb-1">
            <StarDisplay avgStars={avgStars} />
            <span className="font-sans text-[10px] text-heading leading-none">
              avg rating
            </span>
          </div>
        </div>
      )}

      {/* Review count */}
      <p className="font-sans text-[11px] text-heading m-0 mb-4">
        Based on {totalSample} reviews
      </p>

      {/* Star-based sentiment bar */}
      {pctHigh != null && pctMid != null && pctLow != null && (
        <div>
          <div className="flex rounded-full overflow-hidden h-1.5 gap-[2px]">
            <div
              className="bg-emerald-500 rounded-l-full"
              style={{ width: `${pctHigh}%` }}
            />
            {pctMid > 0 && (
              <div
                className="bg-(--line)"
                style={{ width: `${pctMid}%` }}
              />
            )}
            <div
              className="bg-[oklch(0.62_0.14_32)] rounded-r-full"
              style={{ width: `${Math.max(pctLow, 1)}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="font-sans text-[10px] text-heading">
              4–5★{" "}
              <span className="font-semibold text-(--ink)">{pctHigh}%</span>
            </span>
            {pctMid > 0 && (
              <span className="font-sans text-[10px] text-heading">
                3★{" "}
                <span className="font-semibold text-(--ink)">{pctMid}%</span>
              </span>
            )}
            <span className="font-sans text-[10px] text-heading">
              1–2★{" "}
              <span className="font-semibold text-(--ink)">{pctLow}%</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default async function BrandHeroStats({ brandA, brandB }: Props) {
  const { rows } = await getBrandComparisonAggregates(brandA, brandB);

  const statsA = aggregate(rows.filter((r) => r.brand === brandA));
  const statsB = aggregate(rows.filter((r) => r.brand === brandB));

  if (statsA.totalSample === 0 && statsB.totalSample === 0) return null;

  return (
    <div className="mt-10 flex flex-wrap gap-4">
      <BrandCard brand={brandA} {...statsA} />
      <BrandCard brand={brandB} {...statsB} />
    </div>
  );
}
