"use client";

import { useState } from "react";
import ReviewEvidenceCard from "@/components/reviews/ReviewEvidenceCard";
import type { Review } from "@/types/review";

const DEFAULT_PAGE_SIZE = 12;

interface ProviderReviewsArchiveProps {
  reviews: Review[];
  featuredCount?: number;
  pageSize?: number;
  showProvider?: boolean;
}

export default function ProviderReviewsArchive({
  reviews,
  featuredCount = 6,
  pageSize = DEFAULT_PAGE_SIZE,
  showProvider = false,
}: ProviderReviewsArchiveProps) {
  const remainingReviews = reviews.slice(featuredCount);
  const [visibleCount, setVisibleCount] = useState(pageSize);

  if (remainingReviews.length === 0) return null;

  const visibleReviews = remainingReviews.slice(0, visibleCount);
  const remainingCount = remainingReviews.length - visibleReviews.length;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-(--line) bg-white p-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-(--accent)">
            All Reviews
          </p>
          <p className="mt-1 text-[14px] leading-relaxed text-heading">
            Showing {visibleReviews.length} of {remainingReviews.length} additional sourced reviews beyond the featured evidence above.
          </p>
        </div>
        <a href="#results" className="text-[13px] font-medium text-(--accent) hover:underline">
          Back to featured evidence
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {visibleReviews.map((review) => (
          <ReviewEvidenceCard
            key={review.id}
            review={review}
            showProvider={showProvider}
          />
        ))}
      </div>

      {remainingCount > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + pageSize)}
            className="rounded-lg border border-(--line) bg-(--surface) px-6 py-2.5 text-sm font-medium text-(--ink) transition-colors hover:border-(--accent)/40 hover:text-(--accent)"
          >
            Load more reviews ({remainingCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
