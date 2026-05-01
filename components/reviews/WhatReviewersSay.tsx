"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import type { Review } from "@/types/review";
import ClassifiedReviewCard from "./ClassifiedReviewCard";
import { sortClassifiedReviews, type SortKey } from "@/lib/review-evidence";
import DevLabel from "@/components/dev/DevLabel";

type Props = {
  reviews: Review[];
  providerName: string;
  initialShow?: number;
};

const SORT_OPTIONS: { key: SortKey; label: string; description: string }[] = [
  {
    key: "most_useful",
    label: "Most useful",
    description: "Showing reviews with outcomes and use cases tagged first.",
  },
  {
    key: "most_recent",
    label: "Most recent",
    description: "Showing most recently submitted reviews first. Some reviews have no date on record.",
  },
  {
    key: "highest_rated",
    label: "Highest rated",
    description: "Showing 5-star reviews first.",
  },
  {
    key: "critical_first",
    label: "Critical first",
    description: "Showing lowest-rated reviews first.",
  },
];

const VALID_SORTS = SORT_OPTIONS.map((o) => o.key);

// ── Shared display layer ──────────────────────────────────────────────────────

function ReviewsDisplay({
  reviews,
  initialShow = 6,
  sortKey,
  onSort,
}: {
  reviews: Review[];
  initialShow?: number;
  sortKey: SortKey;
  onSort: (key: SortKey) => void;
}) {
  const [showAll, setShowAll] = useState(false);

  const classified = sortClassifiedReviews(reviews, sortKey);
  const visible = showAll ? classified : classified.slice(0, initialShow);
  const activeOption = SORT_OPTIONS.find((o) => o.key === sortKey) ?? SORT_OPTIONS[0];

  if (reviews.length === 0) return null;

  return (
    <div>

      {/* Classified review summaries */}
      {classified.length > 0 && (
        <div>
          <p className="font-sans text-[11px] uppercase tracking-widest text-(--muted) mb-4">
            {classified.length} classified {classified.length === 1 ? "review" : "reviews"}
          </p>

          {/* Sort controls */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-2">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.key}
                  onClick={() => { onSort(option.key); setShowAll(false); }}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    sortKey === option.key
                      ? "border-accent bg-accent text-white"
                      : "border-border bg-white text-body hover:border-accent hover:text-accent"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-muted">{activeOption.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((r) => (
              <ClassifiedReviewCard key={r.id} review={r} />
            ))}
          </div>

          {classified.length > initialShow && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="mt-6 text-[13px] font-medium text-(--accent) hover:underline"
            >
              Show all {classified.length} reviews
            </button>
          )}

          <p className="mt-4 font-sans text-[11px] text-(--muted) border-t border-(--line) pt-4">
            Source: Reviews sourced from Google Maps and summarized by RTR in our own words.
            We classify each review for removal type, outcome, and scarring mentions.
            Original reviews available on Google Maps.{" "}
            <Link href="/methodology" className="text-(--accent) hover:underline">
              Read our methodology
            </Link>
            .{" "}
            <Link href="/editorial-policy" className="text-(--accent) hover:underline">
              Editorial policy
            </Link>
            .
          </p>
        </div>
      )}

    </div>
  );
}

// ── URL-aware sort controller (needs Suspense) ────────────────────────────────

function ReviewsWithSort(props: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawSort = searchParams.get("sort") ?? "most_useful";
  const sortKey: SortKey = VALID_SORTS.includes(rawSort as SortKey)
    ? (rawSort as SortKey)
    : "most_useful";

  const handleSort = (key: SortKey) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key === "most_useful") {
      params.delete("sort");
    } else {
      params.set("sort", key);
    }
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  return <ReviewsDisplay {...props} sortKey={sortKey} onSort={handleSort} />;
}

// ── Public export — self-contained with Suspense boundary ─────────────────────

export default function WhatReviewersSay(props: Props) {
  return (
    <DevLabel name="WhatReviewersSay">
      <Suspense fallback={<ReviewsDisplay {...props} sortKey="most_useful" onSort={() => {}} />}>
        <ReviewsWithSort {...props} />
      </Suspense>
    </DevLabel>
  );
}
