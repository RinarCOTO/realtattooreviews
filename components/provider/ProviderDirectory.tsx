"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

type Method = "Laser" | "Non-laser";
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

function SortBtn({
  col,
  label,
  sortKey,
  sortDir,
  onClick,
}: {
  col: SortKey;
  label: string;
  sortKey: SortKey;
  sortDir: SortDir;
  onClick: (k: SortKey) => void;
}) {
  const active = sortKey === col;
  return (
    <button
      onClick={() => onClick(col)}
      className="font-semibold text-heading hover:text-accent"
    >
      {label}
      {active ? (
        <span className="ml-1 text-accent">{sortDir === "asc" ? "↑" : "↓"}</span>
      ) : (
        <span className="ml-1 opacity-30">↕</span>
      )}
    </button>
  );
}

function StarBar({ value }: { value: number | null }) {
  if (value == null) return <span className="text-subtle">-</span>;
  const pct = ((value - 1) / 4) * 100;
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="relative inline-block h-1.5 w-16 rounded-full bg-border overflow-hidden"
        aria-hidden
      >
        <span
          className="absolute inset-y-0 left-0 rounded-full bg-accent"
          style={{ width: `${pct}%` }}
        />
      </span>
      <span className="tabular-nums">{value.toFixed(1)}</span>
    </span>
  );
}

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

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

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
        if (sortKey === "name") { aVal = a.name; bVal = b.name; }
        else if (sortKey === "locationCount") { aVal = a.locationCount; bVal = b.locationCount; }
        else if (sortKey === "reviews") { aVal = a.reviews ?? -1; bVal = b.reviews ?? -1; }
        else { aVal = a.avgStars ?? -1; bVal = b.avgStars ?? -1; }

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

  const hasActiveFilters = methodFilter !== "All" || footprintFilter !== "All";

  return (
    <div>
      {/* Filters */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-[12px] font-medium text-muted">Method</label>
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className={selectClass}
          >
            <option>All</option>
            <option>Laser</option>
            <option>Non-laser</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-[12px] font-medium text-muted">Footprint</label>
          <select
            value={footprintFilter}
            onChange={(e) => setFootprintFilter(e.target.value)}
            className={selectClass}
          >
            <option>All</option>
            <option value="National chain">National chain</option>
            <option value="Local specialist">Local specialist</option>
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

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-border bg-hero-bg">
              <th className="px-4 py-3 text-left">
                <SortBtn col="name" label="Provider" sortKey={sortKey} sortDir={sortDir} onClick={handleSort} />
              </th>
              <th className="px-4 py-3 text-left font-semibold text-heading">Method</th>
              <th className="px-4 py-3 text-left font-semibold text-heading">Technology</th>
              <th className="px-4 py-3 text-left">
                <SortBtn col="locationCount" label="Cities" sortKey={sortKey} sortDir={sortDir} onClick={handleSort} />
              </th>
              <th className="px-4 py-3 text-left">
                <SortBtn col="reviews" label="Reviews" sortKey={sortKey} sortDir={sortDir} onClick={handleSort} />
              </th>
              <th className="px-4 py-3 text-left">
                <SortBtn col="avgStars" label="Avg Stars" sortKey={sortKey} sortDir={sortDir} onClick={handleSort} />
              </th>
              <th className="px-4 py-3 text-left font-semibold text-heading">Best For</th>
              <th className="px-4 py-3 sr-only">Link</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-muted">
                  No providers match the selected filters.
                </td>
              </tr>
            )}
            {filtered.map((p, i) => (
              <tr
                key={p.slug}
                className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-surface" : "bg-bg"}`}
              >
                <td className="px-4 py-3 font-medium text-heading">
                  <Link href={`/reviews/${p.slug}`} className="hover:text-accent hover:underline">
                    {p.name}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      p.method === "Non-laser"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-accent-light text-accent"
                    }`}
                  >
                    {p.method}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted">{p.technology}</td>
                <td className="px-4 py-3 text-muted">{p.locations}</td>
                <td className="px-4 py-3 text-muted">
                  {p.reviews != null ? p.reviews : <span className="text-subtle">-</span>}
                </td>
                <td className="px-4 py-3 text-muted">
                  <StarBar value={p.avgStars} />
                </td>
                <td className="px-4 py-3 text-muted">{p.bestFor}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/reviews/${p.slug}`}
                    className="whitespace-nowrap text-accent hover:underline"
                  >
                    Read review →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer note */}
      <p className="mt-3 text-[11px] text-subtle">
        Review counts reflect our internal review sample, not lifetime Google totals. Default sort is alphabetical.{" "}
        Data refreshed: {refreshedAt}
      </p>

      {/* Coverage pending */}
      {pendingProviders.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 text-[15px] font-semibold text-heading">Coverage pending</h3>
          <p className="mb-4 text-[13px] leading-relaxed text-muted">
            The following providers appear in our city pages or are tracked in our coverage plan but do not yet have a review sample in our dataset.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-border bg-hero-bg">
                  <th className="px-4 py-3 text-left font-semibold text-heading">Provider</th>
                  <th className="px-4 py-3 text-left font-semibold text-heading">Markets</th>
                  <th className="px-4 py-3 text-left font-semibold text-heading">Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingProviders.map((p, i) => (
                  <tr
                    key={p.name}
                    className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-surface" : "bg-bg"}`}
                  >
                    <td className="px-4 py-3 font-medium text-heading">{p.name}</td>
                    <td className="px-4 py-3 text-muted">{p.markets}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full bg-border/60 px-2.5 py-0.5 text-[11px] font-medium text-muted">
                        Review sample pending
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
