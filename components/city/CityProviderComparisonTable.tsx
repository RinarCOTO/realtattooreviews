import { getCityProviderAggregates, type CityProviderRow } from "@/lib/data/reviews";
import type { StaticProviderProfile } from "./types";

function computeStandoutFit(row: CityProviderRow): string {
  if (row.isInkout) return "Non-laser TEPR";
  if (row.useCaseComplete >= 5) return `Complete removal (${row.useCaseComplete} wins)`;
  if (row.useCaseMicroblading >= 2) return "Microblading";
  if (row.scarringPositive >= 2) return "Scarring-aware";
  return row.methodUsed ?? "Laser";
}

type Props = {
  city: string;
  staticProviders: StaticProviderProfile[];
};

export default async function CityProviderComparisonTable({ city, staticProviders }: Props) {
  const liveRows = await getCityProviderAggregates(city);
  const liveByName = new Map(liveRows.map((r) => [r.providerName, r]));

  // All providers in display order: live first (by sample size), then pending
  const liveProviders = staticProviders.filter((p) => liveByName.has(p.providerName));
  const pendingProviders = staticProviders.filter((p) => !liveByName.has(p.providerName));
  const allInOrder = [...liveProviders, ...pendingProviders];

  return (
    <div className="overflow-x-auto rounded-xl border border-(--line)">
      <table className="w-full text-[13px] font-sans border-collapse">
        <thead>
          <tr className="bg-(--surface) border-b border-(--line)">
            {["Provider", "Neighborhood", "Method", "Sample", "Avg ★", "% Positive", "Standout fit"].map(
              (h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-(--muted) whitespace-nowrap"
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-(--line)">
          {allInOrder.map((profile) => {
            const live = liveByName.get(profile.providerName);
            const isPending = !live;
            return (
              <tr key={profile.providerName} className="bg-white hover:bg-(--bg) transition-colors">
                <td className="px-4 py-3 font-semibold text-(--ink) whitespace-nowrap">
                  {profile.providerName}
                </td>
                <td className="px-4 py-3 text-(--muted) whitespace-nowrap">
                  {profile.neighborhood}
                </td>
                <td className="px-4 py-3 text-(--muted) whitespace-nowrap">
                  {profile.staticMethod}
                </td>
                {isPending ? (
                  <td colSpan={3} className="px-4 py-3 text-(--muted) italic">
                    Review sample pending
                  </td>
                ) : (
                  <>
                    <td className="px-4 py-3 text-(--ink) font-medium whitespace-nowrap">
                      {live.sampleSize}
                    </td>
                    <td className="px-4 py-3 text-(--ink) font-medium whitespace-nowrap">
                      {live.avgStars != null ? live.avgStars.toFixed(2) : "-"}
                    </td>
                    <td className="px-4 py-3 text-(--ink) font-medium whitespace-nowrap">
                      {live.pctPositive != null ? `${live.pctPositive}%` : "-"}
                    </td>
                  </>
                )}
                <td className="px-4 py-3 text-(--muted) whitespace-nowrap">
                  {live ? computeStandoutFit(live) : "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="px-4 py-2 text-[11px] text-(--muted) bg-(--surface) border-t border-(--line)">
        Sample capped at 50 per provider. Lifetime Google review counts are higher.
      </p>
    </div>
  );
}
