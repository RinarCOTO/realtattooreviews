"use client";

import { useState, useEffect } from "react";
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

const PLACEHOLDER_WORDS = ["provider", "city", "treatment type", "method"];

export default function Hero({headline, subheadline}: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setExiting(true);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % PLACEHOLDER_WORDS.length);
        setExiting(false);
      }, 250);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/reviews?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <section className="hero-section border-b border-border py-24 sm:py-32 bg-feathering-mist">
      <div className="mx-auto max-w-4xl px-4 text-center">

        {/* Eyebrow */}
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-1 text-xs font-medium text-muted">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>Independent reviews</span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>Sourced from Google</span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>Multiple US markets</span>
        </span>

        {/* Heading */}
        <h1 className="mt-6 text-[36px] font-bold leading-[1.1] tracking-tight text-heading sm:text-[50px]">
          {headline ?? (
            <>
              Compare Tattoo Removal Providers
              <br />
              <span className="text-accent">Before You Book</span>
            </>
          )}
        </h1>

        {/* Subheading */}
        <div className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-body">
          {subheadline
            ? <PortableText value={subheadline} />
            : "See how clinics differ on method, technology, pricing, and review patterns. Built from sourced Google reviews across multiple US markets."
          }
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-10 flex max-w-xl overflow-hidden rounded-full border border-border bg-white shadow-md shadow-black/5 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all"
        >
          <div className="relative flex flex-1 items-center gap-2 px-5">
            <svg className="h-4 w-4 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder=""
                className="w-full bg-transparent py-3.5 text-sm text-heading outline-none"
              />
              {!query && (
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center text-sm text-subtle">
                  Search by{" "}
                  <span
                    key={wordIndex}
                    className={`ml-1 inline-block font-medium text-secondary transition-all duration-250 ${
                      exiting ? "translate-y-1.5 opacity-0" : "translate-y-0 opacity-100"
                    }`}
                  >
                    {PLACEHOLDER_WORDS[wordIndex]}
                  </span>
                </span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="m-1.5 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
          >
            Search
          </button>
        </form>

        {/* Primary CTAs */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/cities"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
          >
            Find providers in your city
          </Link>
          <Link
            href="/comparisons/best-tattoo-removal-method"
            className="rounded-full border border-border bg-white px-6 py-3 text-sm font-medium text-body hover:border-accent hover:text-accent transition-colors"
          >
            Compare methods
          </Link>
        </div>

        {/* Browse by case type */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-muted">Browse by case:</span>
          {popular.map((term) => (
            <Link
              key={term}
              href={`/categories/${term.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-full border border-border bg-white px-3 py-1.5 text-xs text-body transition-colors hover:border-accent hover:text-accent"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
