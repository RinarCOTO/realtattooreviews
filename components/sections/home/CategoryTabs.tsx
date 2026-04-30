"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  {
    label: "Complete Removal",
    slug: "complete-removal",
    description: "Full clearance across all ink types and skin tones.",
    count: 42,
    image: "/images/categories/complete-tattoo-removal-bg.webp",
    alt: "Laser tattoo removal treatment showing complete ink clearance on skin",
  },
  {
    label: "Color Ink Removal",
    slug: "color-ink-removal",
    description: "Reviews focused on multi-color and vibrant ink clearance.",
    count: 28,
    image: "/images/categories/color-ink-removal.webp",
    alt: "Colorful tattoo undergoing laser removal treatment",
  },
  {
    label: "Cover-Up Prep",
    slug: "cover-up-prep",
    description: "Partial fading to allow for a cover-up tattoo.",
    count: 19,
    image: "/images/categories/color-coverup-prep-bg.webp",
    alt: "Tattoo being faded with laser treatment in preparation for a cover-up",
  },
  {
    label: "Dark Skin Tattoo Removal",
    slug: "dark-skin-tattoo-removal",
    description: "Clinics with sourced review data for deeper skin tones.",
    count: 17,
    image: "/images/categories/dark-skin-tattoo-remoival-bg.webp",
    alt: "Tattoo removal procedure performed on a patient with deeper skin tone",
  },
  {
    label: "Microblading Removal",
    slug: "microblading-removal",
    description: "Eyebrow and permanent makeup removal reviews.",
    count: 14,
    image: "/images/categories/microblading-procedure-bg.webp",
    alt: "Microblading eyebrow removal laser treatment close-up",
  },
  {
    label: "Scarring Concerns",
    slug: "scarring-concerns",
    description: "Reviews that specifically address scarring risks and outcomes.",
    count: 11,
    image: "/images/categories/scarring-bg.webp",
    alt: "Close-up of skin showing scarring concerns after tattoo removal treatment",
  },
];

export default function CategoryTabs() {
  const [active, setActive] = useState(categories[0].slug);
  const current = categories.find((c) => c.slug === active)!;

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="gradient-card rounded-3xl p-8">

        {/* Section label */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-[32px] font-bold text-heading">Browse by treatment type</h2>
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
        <div
          className="mt-5 relative flex items-end justify-between rounded-2xl overflow-hidden px-6 py-6 min-h-144"
          style={
            current.image
              ? { backgroundImage: `url(${current.image})`, backgroundSize: "cover", backgroundPosition: "center" }
              : { backgroundColor: "white" }
          }
          role={current.image ? "img" : undefined}
          aria-label={current.alt ?? undefined}
        >
          {current.image && (
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />
          )}
          <div className="relative z-10">
            <h3 className={`text-base font-semibold ${current.image ? "text-white" : "text-heading"}`}>
              {current.label}
            </h3>
            <p className={`mt-1 text-sm ${current.image ? "text-white/80" : "text-muted"}`}>
              {current.description}
            </p>
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <span className={`flex items-center gap-1 text-sm ${current.image ? "text-white/80" : "text-muted"}`}>
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.95 2.678c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
              </svg>
              {current.count} reviews
            </span>
            <Link
              href={`/categories/${current.slug}`}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                current.image
                  ? "border-white text-white hover:bg-white hover:text-accent"
                  : "border-accent text-accent hover:bg-accent hover:text-white"
              }`}
            >
              Browse →
            </Link>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
