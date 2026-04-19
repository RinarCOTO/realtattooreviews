"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Provider } from "@/types/provider";

// ── Types ────────────────────────────────────────────────────────────────────

export type BrandSummary = {
  name: string;
  slug: string;
  locationCount: number;
  totalReviews: number;
  avgRating: number;
  techTags: string[];
  method: "Non-Laser" | "Laser";
};

type Props = {
  brands: BrandSummary[];
  independents: Provider[];
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const TECH_TAG_COLORS: Record<string, string> = {
  "TEPR":             "bg-secondary-soft text-secondary",
  "PicoWay":          "bg-accent-light text-accent",
  "PicoSure":         "bg-accent-light text-accent",
  "Q-Switch":         "bg-accent-light text-accent",
  "Fotona":           "bg-accent-light text-accent",
  "Spectra":          "bg-accent-light text-accent",
  "Laser (multiple)": "bg-accent-light text-accent",
  "Medical":          "bg-warning-soft text-warning",
  "Medical Spa":      "bg-warning-soft text-warning",
};

const TECH_TAGS = Object.keys(TECH_TAG_COLORS);

function techTagsOf(p: Provider): string[] {
  return (p.tags ?? []).filter((t) => TECH_TAGS.includes(t));
}

function methodOf(p: Provider): "Non-Laser" | "Laser" {
  return p.specialty?.toLowerCase().includes("non-laser") ? "Non-Laser" : "Laser";
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`h-3 w-3 ${rating >= s ? "text-amber-400" : "text-border"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const INDEPENDENTS_DEFAULT_VISIBLE = 5;

// ── Component ────────────────────────────────────────────────────────────────

export default function ProviderIndexWithFilters({ brands, independents }: Props) {
  const [methodFilter, setMethodFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [showAllIndependents, setShowAllIndependents] = useState(false);

  const selectClass =
    "rounded-lg border border-border bg-surface px-3 py-2 text-sm text-body focus:outline-none focus:ring-2 focus:ring-accent/30";

  // Filter brands
  const filteredBrands = useMemo(() => brands.filter((b) => {
    if (methodFilter !== "all" && b.method !== methodFilter) return false;
    if (ratingFilter !== "all" && b.avgRating < Number(ratingFilter)) return false;
    return true;
  }), [brands, methodFilter, ratingFilter]);

  // Filter independents
  const filteredIndependents = useMemo(() => independents.filter((p) => {
    if (methodFilter !== "all" && methodOf(p) !== methodFilter) return false;
    if (ratingFilter !== "all" && p.rating < Number(ratingFilter)) return false;
    return true;
  }), [independents, methodFilter, ratingFilter]);

  const visibleIndependents = showAllIndependents
    ? filteredIndependents
    : filteredIndependents.slice(0, INDEPENDENTS_DEFAULT_VISIBLE);

  const hiddenCount = filteredIndependents.length - INDEPENDENTS_DEFAULT_VISIBLE;
  const totalFiltered = filteredBrands.length + filteredIndependents.length;

  return (
    <div>
      {/* ── Filter bar ────────────────────────────────────────────────────── */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <select
          value={methodFilter}
          onChange={(e) => { setMethodFilter(e.target.value); setShowAllIndependents(false); }}
          className={selectClass}
          aria-label="Filter by method"
        >
          <option value="all">All methods</option>
          <option value="Non-Laser">Non-Laser (TEPR)</option>
          <option value="Laser">Laser</option>
        </select>

        <select
          value={ratingFilter}
          onChange={(e) => { setRatingFilter(e.target.value); setShowAllIndependents(false); }}
          className={selectClass}
          aria-label="Filter by minimum rating"
        >
          <option value="all">All ratings</option>
          <option value="4.3">4.3 and above</option>
          <option value="4.0">4.0 and above</option>
          <option value="3.5">3.5 and above</option>
        </select>

        <span className="ml-auto text-sm text-muted">
          {totalFiltered} provider{totalFiltered !== 1 ? "s" : ""}
        </span>
      </div>

      {totalFiltered === 0 && (
        <p className="py-8 text-center text-sm text-muted">No providers match your filters.</p>
      )}

      {/* ── Tier 1: Brand cards ───────────────────────────────────────────── */}
      {filteredBrands.length > 0 && (
        <div className="mb-10">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-subtle">
            Multi-City Brands
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {filteredBrands.map((brand) => (
              <div
                key={brand.slug}
                className="flex flex-col rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-sm"
              >
                {/* Brand header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-bg text-base font-bold text-heading">
                    {brand.name.charAt(0)}
                  </div>
                  <div className="flex flex-wrap justify-end gap-1">
                    {brand.techTags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${TECH_TAG_COLORS[tag] ?? "bg-bg text-muted"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <p className="mt-3 text-[16px] font-bold text-heading">{brand.name}</p>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-2">
                  <StarRow rating={Math.round(brand.avgRating)} />
                  <span className="text-sm font-semibold text-accent">{brand.avgRating.toFixed(1)}</span>
                </div>

                {/* Stats */}
                <div className="mt-3 flex items-center gap-3 text-xs text-muted">
                  <span>{brand.totalReviews} reviews</span>
                  <span className="text-border">·</span>
                  <span>{brand.locationCount} locations</span>
                </div>

                {/* CTA */}
                <Link
                  href={`/reviews/${brand.slug}`}
                  className="mt-4 block rounded-lg border border-border py-2 text-center text-xs font-semibold text-body transition-colors hover:border-accent/40 hover:text-accent"
                >
                  View review page →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tier 2: Independents ──────────────────────────────────────────── */}
      {filteredIndependents.length > 0 && (
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-subtle">
            Independent Providers
          </p>
          <div className="flex flex-col divide-y divide-divider overflow-hidden rounded-xl border border-border bg-white">
            {visibleIndependents.map((p) => (
              <Link
                key={p.id}
                href={`/reviews/${p.slug}`}
                className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-bg"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-bg text-sm font-bold text-heading">
                  {p.name.charAt(0)}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-heading">{p.name}</p>
                  <p className="text-xs text-muted">{p.market}</p>
                </div>

                <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
                  {techTagsOf(p).slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${TECH_TAG_COLORS[tag] ?? "bg-bg text-muted"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-heading">{p.rating.toFixed(1)}</p>
                  <p className="text-[11px] text-muted">{p.reviewCount} reviews</p>
                </div>

                <svg className="h-4 w-4 shrink-0 text-subtle" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            ))}
          </div>

          {!showAllIndependents && hiddenCount > 0 && (
            <button
              onClick={() => setShowAllIndependents(true)}
              className="mt-3 w-full rounded-lg border border-border bg-white py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent/40 hover:text-accent"
            >
              Show {hiddenCount} more independent providers
            </button>
          )}
        </div>
      )}
    </div>
  );
}
