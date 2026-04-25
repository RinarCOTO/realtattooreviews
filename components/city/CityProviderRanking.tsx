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

export default async function CityProviderRanking({ city, staticProviders }: Props) {
  const liveRows = await getCityProviderAggregates(city);
  const liveByName = new Map(liveRows.map((r) => [r.providerName, r]));

  // Providers with live data, ranked by sample size then avg stars
  const ranked = liveRows.filter((r) => r.sampleSize > 0);
  // Static-only providers (pending scrape)
  const pendingNames = new Set(
    staticProviders
      .map((p) => p.providerName)
      .filter((n) => !liveByName.has(n))
  );

  const lastRefreshed = ranked.length > 0
    ? new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  return (
    <div className="space-y-4">
      {ranked.map((row, i) => {
        const profile = staticProviders.find((p) => p.providerName === row.providerName);
        const standout = computeStandoutFit(row);
        return (
          <div
            key={row.providerName}
            className="rounded-xl border border-(--line) bg-(--surface) p-6"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-(--accent) text-white text-[11px] font-bold shrink-0">
                    {i + 1}
                  </span>
                  <h3 className="font-sans font-bold text-[17px] text-(--ink) leading-snug m-0">
                    {row.providerName}
                  </h3>
                </div>
                {profile && (
                  <p className="font-sans text-[13px] text-(--muted) ml-8">
                    {profile.address} &middot; {profile.neighborhood}
                  </p>
                )}
              </div>
              {row.avgStars != null && (
                <span className="shrink-0 rounded-lg bg-(--feathering-mist) border border-(--line) px-3 py-1.5 text-[14px] font-bold text-(--ink)">
                  {row.avgStars.toFixed(2)}&#9733;
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4 ml-8">
              <span className="rounded-full border border-(--line) px-2.5 py-0.5 text-[12px] font-medium text-(--muted)">
                {profile?.staticMethod ?? row.methodUsed ?? "Laser"}
              </span>
              <span className="rounded-full border border-(--accent)/30 bg-(--accent)/5 px-2.5 py-0.5 text-[12px] font-medium text-(--accent)">
                {standout}
              </span>
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
                  {row.pctPositive != null ? `${row.pctPositive}%` : "—"}
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
        );
      })}

      {pendingNames.size > 0 && (
        <div className="rounded-xl border border-dashed border-(--line) bg-(--bg) p-5">
          <p className="font-sans text-[13px] text-(--muted) m-0">
            <span className="font-semibold text-(--ink)">Review sample pending: </span>
            {[...pendingNames].join(", ")}. These providers are operating in the city but have
            not yet been captured in our review dataset. Profiles are in the section below.
          </p>
        </div>
      )}

      {lastRefreshed && (
        <p className="font-sans text-[12px] text-(--muted) text-right">
          Data refreshed: {lastRefreshed} &middot; Sample capped at 50 per provider
        </p>
      )}
    </div>
  );
}
