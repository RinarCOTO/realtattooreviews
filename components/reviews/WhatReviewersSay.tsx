"use client";

import { useState } from "react";
import Link from "next/link";
import type { Review } from "@/types/review";
import ClassifiedReviewCard from "./ClassifiedReviewCard";
import { buildPatternSummary, selectClassifiedReviews } from "@/lib/review-evidence";

const INITIAL_SHOW = 6;

type Props = {
  reviews: Review[];
  providerName: string;
  googleMapsUrl?: string;
};

export default function WhatReviewersSay({ reviews, providerName: _providerName, googleMapsUrl }: Props) {
  const [showAll, setShowAll] = useState(false);

  const patterns = buildPatternSummary(reviews);
  const classified = selectClassifiedReviews(reviews);
  const visible = showAll ? classified : classified.slice(0, INITIAL_SHOW);

  if (reviews.length === 0) return null;

  return (
    <div>

      {/* Layer 1: Pattern summary grouped by use case */}
      {patterns.length > 0 ? (
        <div className="mb-10">
          <p className="font-mono text-[11px] uppercase tracking-widest text-(--muted) mb-4">
            Patterns across {reviews.length} sourced {reviews.length === 1 ? "review" : "reviews"}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {patterns.map((p) => (
              <div key={p.useCase} className="border border-(--line) bg-(--surface) p-4 rounded-xl">
                <p className="font-mono text-[10px] uppercase tracking-widest text-(--muted) mb-2">
                  {p.label}
                </p>
                <p className="text-[13px] font-semibold text-(--ink) mb-1">
                  {p.count} {p.count === 1 ? "review" : "reviews"}
                  {p.avgStars != null ? ` · ${p.avgStars} avg stars` : ""}
                </p>
                {p.count >= 3 ? (
                  <p className="text-[12px] text-(--muted)">
                    {p.positives} positive, {p.negatives} negative
                    {p.cities.length > 0 ? ` · ${p.cities.slice(0, 2).join(", ")}` : ""}
                    {p.scarringSignal === "praised" ? " · Minimal scarring noted" : ""}
                    {p.scarringSignal === "reported" ? " · Scarring concerns noted" : ""}
                  </p>
                ) : (
                  <p className="text-[12px] text-(--muted) italic">Not enough data to identify a pattern.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="mb-10 text-[13px] text-(--muted) italic">
          Reviews not yet classified by use case.
        </p>
      )}

      {/* Layer 2: Classified review summaries (RTR paraphrases, negative-first) */}
      {classified.length > 0 && (
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-(--muted) mb-4">
            {classified.length} classified {classified.length === 1 ? "review" : "reviews"}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((r) => (
              <ClassifiedReviewCard key={r.id} review={r} />
            ))}
          </div>
          {classified.length > INITIAL_SHOW && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="mt-6 text-[13px] font-medium text-(--accent) hover:underline"
            >
              Show all {classified.length} reviews
            </button>
          )}
          {googleMapsUrl && (
            <p className="mt-6 text-[13px] text-(--muted)">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--accent) hover:underline"
              >
                Read all reviews on Google Maps
              </a>
            </p>
          )}
          <p className="mt-4 font-mono text-[11px] text-(--muted) border-t border-(--line) pt-4">
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
