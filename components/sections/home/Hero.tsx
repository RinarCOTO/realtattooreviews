"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PortableText, type PortableTextBlock } from "@portabletext/react";

type Props = {
  headline?:    string | null;
  subheadline?: PortableTextBlock[] | null;
}
const popular = [
  "Complete removal",
  "Color ink removal",
  "Cover-up prep",
  "Dark skin tattoo removal",
  "Microblading removal",
];

export default function Hero({headline, subheadline}: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/reviews?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <section
      className="border-b border-border py-20 sm:py-28"
      style={{
        backgroundImage: [
          "radial-gradient(ellipse 55% 60% at 0% 0%, #F1DFD7 0%, transparent 70%)",
          "radial-gradient(ellipse 50% 55% at 100% 0%, #DCEBE8 0%, transparent 70%)",
          "radial-gradient(ellipse 80% 45% at 50% 100%, #F5E8C8 0%, transparent 70%)",
        ].join(", "),
        backgroundColor: "#FFFDFC",
      }}
    >
      <div className="mx-auto max-w-3xl px-4 text-center">

        {/* Eyebrow */}
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-3.5 py-1 text-xs font-medium text-muted">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>Independent reviews</span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>Verified patients</span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>No paid placements</span>
        </span>

        {/* Heading */}
        <h1 className="mt-6 text-[42px] font-bold leading-[1.1] tracking-tight text-heading sm:text-[52px]">
          {headline ?? "Compare Tattoo Removal Clinics Before You Book"}
        </h1>

        {/* Subheading */}
        <div className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-body">
          {subheadline
            ? <PortableText value={subheadline} />
            : "Read real reviews, compare clear ratings, and explore provider and city pages built to help you choose with more confidence."
          }
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-10 flex max-w-xl overflow-hidden rounded-full border border-border bg-surface shadow-md shadow-black/5 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all"
        >
          <div className="flex flex-1 items-center gap-2 px-5">
            <svg className="h-4 w-4 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by provider, city, or treatment type..."
              className="w-full bg-transparent py-3.5 text-sm text-heading placeholder-subtle outline-none"
            />
          </div>
          <button
            type="submit"
            className="m-1.5 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
          >
            Search
          </button>
        </form>

        {/* Popular links */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-muted">Popular:</span>
          {popular.map((term) => (
            <Link
              key={term}
              href={`/reviews?q=${encodeURIComponent(term)}`}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-body transition-colors hover:border-accent hover:text-accent"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
