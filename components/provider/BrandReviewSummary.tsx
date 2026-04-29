import { getBrandLocationAggregates } from "@/lib/data/reviews";

type Props = {
  brand: string;
};

export default async function BrandReviewSummary({ brand }: Props) {
  const rows = await getBrandLocationAggregates(brand);
  const ranked = rows.filter((r) => r.sampleSize > 0);

  const lastRefreshed =
    ranked.length > 0
      ? new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : null;

  if (ranked.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-(--line) bg-(--bg) p-5">
        <p className="font-sans text-[13px] text-(--muted) m-0">
          No published reviews for {brand} are in our dataset yet. Sample is building.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {ranked.map((row, i) => (
        <div
          key={row.locationCity}
          className="rounded-xl border border-(--line) bg-(--surface) p-6"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-(--accent) text-white text-[11px] font-bold shrink-0">
                {i + 1}
              </span>
              <h3 className="font-sans font-bold text-[17px] text-(--ink) leading-snug m-0">
                {brand} - {row.locationCity}
              </h3>
            </div>
            {row.avgStars != null && (
              <span className="shrink-0 rounded-lg bg-(--feathering-mist) border border-(--line) px-3 py-1.5 text-[14px] font-bold text-(--ink)">
                {row.avgStars.toFixed(2)}&#9733;
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 ml-8">
            <div className="rounded-lg bg-(--bg) border border-(--line) p-3 text-center">
              <p className="font-sans text-[11px] uppercase tracking-wider text-(--muted) mb-0.5">
                Sample
              </p>
              <p className="font-sans text-[18px] font-bold text-(--ink) leading-none">
                {row.sampleSize}
              </p>
            </div>
            <div className="rounded-lg bg-(--bg) border border-(--line) p-3 text-center">
              <p className="font-sans text-[11px] uppercase tracking-wider text-(--muted) mb-0.5">
                Positive
              </p>
              <p className="font-sans text-[18px] font-bold text-(--ink) leading-none">
                {row.pctPositive != null ? `${row.pctPositive}%` : "-"}
              </p>
            </div>
            <div className="rounded-lg bg-(--bg) border border-(--line) p-3 text-center">
              <p className="font-sans text-[11px] uppercase tracking-wider text-(--muted) mb-0.5">
                Negative
              </p>
              <p className="font-sans text-[18px] font-bold text-(--ink) leading-none">
                {row.negatives}
              </p>
            </div>
          </div>
        </div>
      ))}

      {lastRefreshed && (
        <p className="font-sans text-[12px] text-(--muted) text-right">
          Data refreshed: {lastRefreshed} &middot; Sample capped at 50 per location
        </p>
      )}
    </div>
  );
}
