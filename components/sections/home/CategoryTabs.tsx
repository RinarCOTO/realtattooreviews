"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  {
    label: "Complete Removal",
    slug: "complete-removal",
    description: "Full clearance across all ink types and skin tones.",
    count: 42,
  },
  {
    label: "Color Ink Removal",
    slug: "color-ink-removal",
    description: "Reviews focused on multi-color and vibrant ink clearance.",
    count: 28,
  },
  {
    label: "Cover-Up Prep",
    slug: "cover-up-prep",
    description: "Partial fading to allow for a cover-up tattoo.",
    count: 19,
  },
  {
    label: "Dark Skin Tattoo Removal",
    slug: "dark-skin-tattoo-removal",
    description: "Clinics with sourced review data for deeper skin tones.",
    count: 17,
  },
  {
    label: "Microblading Removal",
    slug: "microblading-removal",
    description: "Eyebrow and permanent makeup removal reviews.",
    count: 14,
  },
  {
    label: "Scarring Concerns",
    slug: "scarring-concerns",
    description: "Reviews that specifically address scarring risks and outcomes.",
    count: 11,
  },
];

export default function CategoryTabs() {
  const [active, setActive] = useState(categories[0].slug);
  const current = categories.find((c) => c.slug === active)!;

  return (
    <section className="bg-surface border-y border-border py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-[28px] font-bold text-heading">Browse by treatment type</h2>
            <p className="mt-1 text-sm text-muted">Filter reviews by what matters to your situation.</p>
          </div>
          <Link href="/categories" className="hidden text-sm font-medium text-accent hover:underline sm:block">
            View all categories →
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActive(cat.slug)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active === cat.slug
                  ? "border-accent bg-accent text-white"
                  : "border-border bg-white text-body hover:border-accent hover:text-accent"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Active category panel */}
        <div className="mt-5 flex items-center justify-between rounded-2xl border border-border bg-white px-6 py-5">
          <div>
            <h3 className="text-base font-semibold text-heading">{current.label}</h3>
            <p className="mt-1 text-sm text-muted">{current.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted">{current.count} reviews</span>
            <Link
              href={`/categories/${current.slug}`}
              className="rounded-full border border-accent px-5 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white"
            >
              Browse →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
