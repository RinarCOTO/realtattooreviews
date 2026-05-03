"use client";

import { useState, useMemo } from "react";
import ReviewEvidenceCard from "@/components/reviews/ReviewEvidenceCard";
import type { Review } from "@/types/review";

const PAGE_SIZE = 24;

type Props = {
  reviews: Review[];
  showProvider?: boolean;
};

export default function ReviewListWithFilters({ reviews, showProvider = true }: Props) {
  const [cityFilter, setCityFilter] = useState("all");
  const [providerFilter, setProviderFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Build unique sorted lists for the dropdowns
  const cities = useMemo(() => {
    const set = new Set(reviews.map((r) => r.city).filter(Boolean) as string[]);
    return Array.from(set).sort();
  }, [reviews]);

  const providerNames = useMemo(() => {
    const set = new Set(reviews.map((r) => r.provider).filter(Boolean));
    return Array.from(set).sort();
  }, [reviews]);

  // Apply filters
  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      if (cityFilter !== "all" && r.city !== cityFilter) return false;
      if (providerFilter !== "all" && r.provider !== providerFilter) return false;
      if (ratingFilter !== "all" && (r.rating ?? 0) < Number(ratingFilter)) return false;
      return true;
    });
  }, [reviews, cityFilter, providerFilter, ratingFilter]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleFilterChange() {
    // Reset pagination whenever a filter changes
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div>
      {/* ── Filter bar ──────────────────────────────────────────────────────── */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <select
          value={cityFilter}
          onChange={(e) => { setCityFilter(e.target.value); handleFilterChange(); }}
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-body focus:outline-none focus:ring-2 focus:ring-accent/30"
          aria-label="Filter by city"
        >
          <option value="all">All cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select
          value={providerFilter}
          onChange={(e) => { setProviderFilter(e.target.value); handleFilterChange(); }}
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-body focus:outline-none focus:ring-2 focus:ring-accent/30"
          aria-label="Filter by provider"
        >
          <option value="all">All providers</option>
          {providerNames.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        <select
          value={ratingFilter}
          onChange={(e) => { setRatingFilter(e.target.value); handleFilterChange(); }}
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-body focus:outline-none focus:ring-2 focus:ring-accent/30"
          aria-label="Filter by minimum rating"
        >
          <option value="all">All ratings</option>
          <option value="5">5 stars only</option>
          <option value="4">4 stars and up</option>
          <option value="3">3 stars and up</option>
        </select>

        <span className="ml-auto text-sm text-heading">
          {filtered.length} review{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── Review grid ─────────────────────────────────────────────────────── */}
      {visible.length === 0 ? (
        <p className="py-12 text-center text-sm text-heading">No reviews match your filters.</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {visible.map((review) => (
              <ReviewEvidenceCard
                key={review.id}
                review={review}
                showProvider={showProvider}
              />
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="rounded-lg border border-border bg-surface px-6 py-2.5 text-sm font-medium text-body transition-colors hover:border-accent/40 hover:text-accent"
              >
                Load more ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
