import { getBrandComparisonAggregates, type BrandComparisonRow } from "@/lib/data/reviews";

type Props = {
  brandA: string;
  brandB: string;
  brandAPendingCities?: string[];
  brandBPendingCities?: string[];
};

function Totals({ rows }: { rows: BrandComparisonRow[] }) {
  const totalSample = rows.reduce((s, r) => s + r.sampleSize, 0);
  const totalPos = rows.reduce((s, r) => s + r.positives, 0);
  const totalNeg = rows.reduce((s, r) => s + r.negatives, 0);
  const totalComplete = rows.reduce((s, r) => s + r.useCaseComplete, 0);
  const totalMicro = rows.reduce((s, r) => s + r.useCaseMicroblading, 0);
  const totalScarringPos = rows.reduce((s, r) => s + r.scarringPositive, 0);
  const totalScarringYes = rows.reduce((s, r) => s + r.scarringYes, 0);
  const pctPositive = totalSample > 0 ? Math.round((totalPos / totalSample) * 100) : null;
  const weightedStarSum = rows.reduce((s, r) => s + (r.avgStars ?? 0) * r.sampleSize, 0);
  const avgStars = totalSample > 0 ? (weightedStarSum / totalSample).toFixed(2) : null;

  return (
    <tr className="bg-(--surface) border-t-2 border-(--line) font-semibold text-(--ink) text-[12px]">
      <td className="px-4 py-2.5 whitespace-nowrap">Total</td>
      <td className="px-4 py-2.5 whitespace-nowrap">{totalSample}</td>
      <td className="px-4 py-2.5 whitespace-nowrap">{avgStars ? `${avgStars}★` : "-"}</td>
      <td className="px-4 py-2.5 whitespace-nowrap">{pctPositive != null ? `${pctPositive}%` : "-"}</td>
      <td className="px-4 py-2.5 whitespace-nowrap">{totalPos}</td>
      <td className="px-4 py-2.5 whitespace-nowrap">{totalNeg}</td>
      <td className="px-4 py-2.5 whitespace-nowrap">{totalComplete}</td>
      <td className="px-4 py-2.5 whitespace-nowrap">{totalMicro}</td>
      <td className="px-4 py-2.5 whitespace-nowrap">{totalScarringPos + totalScarringYes}</td>
    </tr>
  );
}

export default async function BrandComparisonEvidence({
  brandA,
  brandB,
  brandAPendingCities = [],
  brandBPendingCities = [],
}: Props) {
  const { rows, lastRefreshed } = await getBrandComparisonAggregates(brandA, brandB);

  const brandARows = rows.filter((r) => r.brand === brandA);
  const brandBRows = rows.filter((r) => r.brand === brandB);

  const headers = ["City", "Sample", "Avg ★", "% Pos", "Pos", "Neg", "Complete", "Micro", "Scarring"];

  function BrandTable({
    brand,
    liveRows,
    pendingCities,
  }: {
    brand: string;
    liveRows: BrandComparisonRow[];
    pendingCities: string[];
  }) {
    const liveCities = new Set(liveRows.map((r) => r.city));
    const pendingOnly = pendingCities.filter((c) => !liveCities.has(c));

    return (
      <div className="overflow-x-auto rounded-xl border border-(--line) mb-6">
        <div className="bg-(--surface) border-b border-(--line) px-4 py-2.5">
          <p className="font-sans text-[12px] font-semibold uppercase tracking-wider text-(--accent) m-0">
            {brand} review evidence
          </p>
        </div>
        <table className="w-full text-[13px] font-sans border-collapse">
          <thead>
            <tr className="bg-(--surface) border-b border-(--line)">
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-(--muted) whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-(--line)">
            {liveRows.map((row) => (
              <tr key={row.city} className="bg-white hover:bg-surface transition-colors">
                <td className="px-4 py-3 font-medium text-heading whitespace-nowrap">{row.city}</td>
                <td className="px-4 py-3 text-body whitespace-nowrap">{row.sampleSize}</td>
                <td className="px-4 py-3 text-body whitespace-nowrap">
                  {row.avgStars != null ? row.avgStars.toFixed(2) : <span className="text-muted">-</span>}
                </td>
                <td className="px-4 py-3 text-body whitespace-nowrap">
                  {row.pctPositive != null ? `${row.pctPositive}%` : <span className="text-muted">-</span>}
                </td>
                <td className="px-4 py-3 text-body whitespace-nowrap">{row.positives}</td>
                <td className="px-4 py-3 text-body whitespace-nowrap">{row.negatives}</td>
                <td className="px-4 py-3 text-body whitespace-nowrap">{row.useCaseComplete}</td>
                <td className="px-4 py-3 text-body whitespace-nowrap">{row.useCaseMicroblading}</td>
                <td className="px-4 py-3 text-body whitespace-nowrap">
                  {row.scarringPositive + row.scarringYes}
                </td>
              </tr>
            ))}
            {pendingOnly.map((city) => (
              <tr key={city} className="bg-white">
                <td className="px-4 py-3 font-medium text-(--ink) whitespace-nowrap">{city}</td>
                <td colSpan={8} className="px-4 py-3 text-(--muted) italic text-[12px]">
                  Review sample pending
                </td>
              </tr>
            ))}
            {liveRows.length > 0 && <Totals rows={liveRows} />}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <BrandTable brand={brandA} liveRows={brandARows} pendingCities={brandAPendingCities} />
      <BrandTable brand={brandB} liveRows={brandBRows} pendingCities={brandBPendingCities} />
      <p className="font-sans text-[11px] text-(--muted) text-right mt-2">
        {lastRefreshed && <>Data refreshed: {lastRefreshed} &middot; </>}
        Sample sizes capped at 50 per provider location. Lifetime Google review counts are higher.
      </p>
    </div>
  );
}
