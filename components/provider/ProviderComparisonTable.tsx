"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

type Method = "Laser" | "Non-laser";
type Footprint = "National chain" | "Regional" | "Single-market";
type Setting = "Tattoo removal specialist" | "Medical spa" | "Dermatology practice";

export type TableProvider = {
  name: string;
  slug: string;
  method: Method;
  technology: string;
  locations: string;
  locationCount: number;
  reviews: number | null;
  yearsActive: number | null;
  bestFor: string;
  footprint: Footprint;
  setting: Setting;
};

type SortKey = "name" | "locationCount" | "reviews" | "yearsActive";
type SortDir = "asc" | "desc";

export default function ProviderComparisonTable({ providers }: { providers: TableProvider[] }) {
  const [methodFilter, setMethodFilter] = useState<string>("All");
  const [footprintFilter, setFootprintFilter] = useState<string>("All");
  const [settingFilter, setSettingFilter] = useState<string>("All");
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
        if (footprintFilter !== "All" && p.footprint !== footprintFilter) return false;
        if (settingFilter !== "All" && p.setting !== settingFilter) return false;
        return true;
      })
      .sort((a, b) => {
        let aVal: string | number;
        let bVal: string | number;
        if (sortKey === "name") { aVal = a.name; bVal = b.name; }
        else if (sortKey === "locationCount") { aVal = a.locationCount; bVal = b.locationCount; }
        else if (sortKey === "reviews") { aVal = a.reviews ?? -1; bVal = b.reviews ?? -1; }
        else { aVal = a.yearsActive ?? -1; bVal = b.yearsActive ?? -1; }

        if (typeof aVal === "string") {
          return sortDir === "asc"
            ? aVal.localeCompare(bVal as string)
            : (bVal as string).localeCompare(aVal);
        }
        return sortDir === "asc"
          ? (aVal as number) - (bVal as number)
          : (bVal as number) - (aVal as number);
      });
  }, [providers, methodFilter, footprintFilter, settingFilter, sortKey, sortDir]);

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <span className="ml-1 text-muted opacity-40">↕</span>;
    return <span className="ml-1 text-accent">{sortDir === "asc" ? "↑" : "↓"}</span>;
  }

  const selectClass =
    "rounded-md border border-border bg-surface px-3 py-1.5 text-[13px] text-heading focus:outline-none focus:ring-2 focus:ring-accent/30";

  return (
    <div>
      {/* Filters */}
      <div className="mb-5 flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <label className="text-[12px] font-medium text-muted">Method</label>
          <select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)} className={selectClass}>
            <option>All</option>
            <option>Laser</option>
            <option>Non-laser</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-[12px] font-medium text-muted">Footprint</label>
          <select value={footprintFilter} onChange={(e) => setFootprintFilter(e.target.value)} className={selectClass}>
            <option>All</option>
            <option value="National chain">National chain</option>
            <option value="Regional">Regional</option>
            <option value="Single-market">Single-market</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-[12px] font-medium text-muted">Setting</label>
          <select value={settingFilter} onChange={(e) => setSettingFilter(e.target.value)} className={selectClass}>
            <option>All</option>
            <option value="Tattoo removal specialist">Tattoo removal specialist</option>
            <option value="Medical spa">Medical spa</option>
            <option value="Dermatology practice">Dermatology practice</option>
          </select>
        </div>
        {(methodFilter !== "All" || footprintFilter !== "All" || settingFilter !== "All") && (
          <button
            onClick={() => { setMethodFilter("All"); setFootprintFilter("All"); setSettingFilter("All"); }}
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
                <button onClick={() => handleSort("name")} className="font-semibold text-heading hover:text-accent">
                  Provider<SortIcon col="name" />
                </button>
              </th>
              <th className="px-4 py-3 text-left font-semibold text-heading">Method</th>
              <th className="px-4 py-3 text-left font-semibold text-heading">Technology</th>
              <th className="px-4 py-3 text-left">
                <button onClick={() => handleSort("locationCount")} className="font-semibold text-heading hover:text-accent">
                  Locations<SortIcon col="locationCount" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button onClick={() => handleSort("reviews")} className="font-semibold text-heading hover:text-accent">
                  Reviews<SortIcon col="reviews" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button onClick={() => handleSort("yearsActive")} className="font-semibold text-heading hover:text-accent">
                  Years Active<SortIcon col="yearsActive" />
                </button>
              </th>
              <th className="px-4 py-3 text-left font-semibold text-heading">Best For</th>
              <th className="px-4 py-3 text-left font-semibold text-heading sr-only">Review</th>
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
                <td className="px-4 py-3 font-medium text-heading">{p.name}</td>
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
                  {p.reviews != null ? p.reviews : <span className="text-subtle">—</span>}
                </td>
                <td className="px-4 py-3 text-muted">
                  {p.yearsActive != null ? `${p.yearsActive} yrs` : <span className="text-subtle">—</span>}
                </td>
                <td className="px-4 py-3 text-muted">{p.bestFor}</td>
                <td className="px-4 py-3">
                  <Link href={`/reviews/${p.slug}`} className="whitespace-nowrap text-accent hover:underline">
                    Read review →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-[11px] text-subtle">
          Review counts marked — are pending verification. Years active blanks indicate unverified founding dates. Default sort: alphabetical.
        </p>
        <Link
          href="/reviews"
          className="shrink-0 ml-4 text-[13px] font-medium text-accent hover:underline"
        >
          Read all patient reviews →
        </Link>
      </div>
    </div>
  );
}
