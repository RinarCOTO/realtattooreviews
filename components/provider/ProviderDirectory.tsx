"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import Card from "@/components/ui/Card";
import ChevronRightIcon from "@/components/ui/ChevronRightIcon";

type Method = "Laser" | "Non-laser" | "Hybrid";
type Footprint = "National chain" | "Regional" | "Single-market";
type Setting = "Tattoo removal specialist" | "Medical spa" | "Dermatology practice";

export type DirectoryRow = {
  name: string;
  slug: string;
  method: Method;
  technology: string;
  locations: string;
  locationCount: number;
  reviews: number | null;
  avgStars: number | null;
  yearsActive: number | null;
  bestFor: string;
  footprint: Footprint;
  setting: Setting;
};

export type PendingRow = {
  name: string;
  markets: string;
};

type SortKey = "name" | "locationCount" | "reviews" | "avgStars";
type SortDir = "asc" | "desc";

const selectClass =
  "rounded-md border border-border bg-surface px-3 py-1.5 text-[13px] text-heading focus:outline-none focus:ring-2 focus:ring-accent/30";

export default function ProviderDirectory({
  providers,
  pendingProviders,
  refreshedAt,
}: {
  providers: DirectoryRow[];
  pendingProviders: PendingRow[];
  refreshedAt: string;
}) {
  const [methodFilter, setMethodFilter] = useState("All");
  const [footprintFilter, setFootprintFilter] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const hasActiveFilters = methodFilter !== "All" || footprintFilter !== "All";

  const filtered = useMemo(() => {
    return providers
      .filter((p) => {
        if (methodFilter !== "All" && p.method !== methodFilter) return false;
        if (footprintFilter === "National chain" && p.footprint !== "National chain") return false;
        if (footprintFilter === "Local specialist" && p.footprint === "National chain") return false;
        return true;
      })
      .sort((a, b) => {
        let aVal: string | number;
        let bVal: string | number;
        if (sortKey === "name")          { aVal = a.name;              bVal = b.name; }
        else if (sortKey === "locationCount") { aVal = a.locationCount; bVal = b.locationCount; }
        else if (sortKey === "reviews")  { aVal = a.reviews ?? -1;     bVal = b.reviews ?? -1; }
        else                             { aVal = a.avgStars ?? -1;    bVal = b.avgStars ?? -1; }

        if (typeof aVal === "string") {
          return sortDir === "asc"
            ? aVal.localeCompare(bVal as string)
            : (bVal as string).localeCompare(aVal);
        }
        return sortDir === "asc"
          ? (aVal as number) - (bVal as number)
          : (bVal as number) - (aVal as number);
      });
  }, [providers, methodFilter, footprintFilter, sortKey, sortDir]);

  function handleSortChange(value: string) {
    const lastDash = value.lastIndexOf("-");
    const key = value.slice(0, lastDash) as SortKey;
    const dir = value.slice(lastDash + 1) as SortDir;
    setSortKey(key);
    setSortDir(dir);
  }

  return (
    <>
    <Card>
    <div className="p-6">
      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-[12px] font-medium text-heading">Method</label>
          <select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)} className={selectClass}>
            <option>All</option>
            <option>Laser</option>
            <option>Non-laser</option>
            <option>Hybrid</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-[12px] font-medium text-heading">Footprint</label>
          <select value={footprintFilter} onChange={(e) => setFootprintFilter(e.target.value)} className={selectClass}>
            <option>All</option>
            <option value="National chain">National chain</option>
            <option value="Local specialist">Local specialist</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-[12px] font-medium text-heading">Sort</label>
          <select
            value={`${sortKey}-${sortDir}`}
            onChange={(e) => handleSortChange(e.target.value)}
            className={selectClass}
          >
            <option value="name-asc">Name A–Z</option>
            <option value="name-desc">Name Z–A</option>
            <option value="locationCount-desc">Most locations</option>
            <option value="reviews-desc">Most reviews</option>
            <option value="avgStars-desc">Highest rated</option>
          </select>
        </div>
        {hasActiveFilters && (
          <button
            onClick={() => { setMethodFilter("All"); setFootprintFilter("All"); }}
            className="text-[12px] text-accent underline underline-offset-2"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Provider cards */}
      {filtered.length === 0 ? (
        <p className="py-8 text-center text-heading">No providers match the selected filters.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              href={`/reviews/${p.slug}`}
              className="group flex flex-col gap-2 rounded-xl border border-border bg-white p-5 shadow-card transition-all hover:border-accent hover:shadow-md"
            >
              {/* Name + method pill */}
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-[14px] leading-snug text-heading transition-colors group-hover:text-accent">
                  {p.name}
                </p>
                <span
                  className={[
                    "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                    p.method === "Non-laser"
                      ? "bg-secondary-soft text-secondary"
                      : p.method === "Hybrid"
                        ? "bg-warning-soft text-warning"
                        : "bg-accent-light text-accent",
                  ].join(" ")}
                >
                  {p.method}
                </span>
              </div>

              {/* Technology */}
              <p className="text-[12px] text-heading">{p.technology}</p>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-heading">
                <span>{p.locations}</span>
                {p.reviews != null && (
                  <>
                    <span className="text-border">·</span>
                    <span>{p.reviews} reviews</span>
                  </>
                )}
                {p.avgStars != null && (
                  <>
                    <span className="text-border">·</span>
                    <span className="font-medium text-amber-500">{p.avgStars.toFixed(1)} ★</span>
                  </>
                )}
              </div>

              {/* Best for */}
              <p className="text-[12px] leading-relaxed text-heading">{p.bestFor}</p>

              {/* CTA */}
              <p className="mt-auto inline-flex items-center gap-1 pt-1 text-[13px] font-semibold text-accent">
                Read review <ChevronRightIcon className="size-3.5" />
              </p>
            </Link>
          ))}
        </div>
      )}

      {/* Footer note */}
      <p className="mt-4 text-[11px] text-heading">
        Review counts reflect our internal review sample, not lifetime Google totals. Data refreshed: {refreshedAt}
      </p>

    </div>
    </Card>

      {/* Coverage pending */}
      {pendingProviders.length > 0 && (
        <Card className="mt-4 p-6">
          <h3 className="mb-1 text-[15px] font-semibold text-heading">Coverage pending</h3>
          <p className="mb-4 text-[13px] leading-relaxed text-heading">
            Providers tracked in our coverage plan that do not yet have a review sample in our dataset.
          </p>
          <p className="text-[13px] leading-relaxed text-heading">
            {pendingProviders.map((p, i) => (
              <span key={p.name}>
                {i > 0 && <span className="mx-2 text-border">·</span>}
                <span className="font-medium">{p.name}</span>
                {p.markets && <span className="text-[12px] text-heading"> ({p.markets})</span>}
              </span>
            ))}
          </p>
        </Card>
      )}
    </>
  );
}
