/*
 * CC BUILD NOTE:
 * - LaserAway rows in competitor_reviews have brand_name = NULL.
 *   BrandReviewSummary identifies them via .ilike("provider_name", "LaserAway%").
 * - bucketScope is "competitor" -- these are not inkOUT reviews.
 * - Tracked markets: Austin TX, Chicago IL, Houston TX, Tampa FL.
 *   Houston has multiple LaserAway sub-locations (Galleria, Heights, Pearland).
 *   All appear under location_city = "Houston" so they aggregate correctly.
 * - At initial data import, LaserAway had zero rows. BrandReviewSummary handles
 *   the empty state gracefully.
 * - /comparisons/picosure-vs-picoway does NOT exist. Use picoway-vs-q-switch or
 *   removery-vs-laseraway instead.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Container from "@/components/layout/Container";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import GuideSection from "@/components/guide/GuideSection";
import GuideBulletList from "@/components/guide/GuideBulletList";
import GuideTable from "@/components/guide/GuideTable";
import GuideCallout from "@/components/guide/GuideCallout";
import GuideRelatedLinks from "@/components/guide/GuideRelatedLinks";
import FAQSection from "@/components/sections/FAQSection";
import PageHero from "@/components/layout/PageHero";
import BrandReviewSummary from "@/components/provider/BrandReviewSummary";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "LaserAway Tattoo Removal Reviews | Real Patient Data | RealTattooReviews",
  description:
    "LaserAway tattoo removal reviews aggregated from real patients. Covers PicoSure technology, pricing model, tracked locations in Austin, Chicago, Houston, and Tampa, and how LaserAway compares to specialists.",
  alternates: {
    canonical: "https://realtattooreviews.com/reviews/laseraway",
  },
  openGraph: {
    title: "LaserAway Tattoo Removal Reviews | Real Patient Data",
    description:
      "LaserAway tattoo removal reviews aggregated from real patients. Covers PicoSure technology, pricing model, tracked locations in Austin, Chicago, Houston, and Tampa.",
  },
};

const faqs = [
  {
    question: "Does LaserAway tattoo removal actually work?",
    answer:
      "LaserAway uses Cynosure PicoSure, a clinically-validated picosecond laser. Picosecond technology produces meaningfully better clearance outcomes than Q-switched lasers for most ink types. Whether it works for a specific tattoo depends on the ink color, depth, skin tone, and clinician protocol. Standard black ink on light skin tends to respond well. Color ink and darker skin tones require more careful equipment and technique assessment.",
  },
  {
    question: "What laser does LaserAway use?",
    answer:
      "LaserAway uses the Cynosure PicoSure laser. The primary wavelength is 755nm (alexandrite), optimized for black, blue, and green ink. PicoSure Pro adds optional 532nm and 1064nm handpieces, which extend coverage to red ink (532nm) and darker skin tones (1064nm). Handpiece availability varies by location -- confirm before booking if multi-wavelength coverage matters to you.",
  },
  {
    question: "How many sessions does LaserAway typically require?",
    answer:
      "Session count depends on the tattoo, not the provider. Most professional tattoos require 6 to 12 sessions. Amateur tattoos and single-color designs typically clear faster. Saturated, multi-color, or older tattoos take longer. LaserAway does not offer a results guarantee or unlimited-sessions package, so each additional session beyond the initial estimate is an additional cost.",
  },
  {
    question: "How much does LaserAway charge per session?",
    answer:
      "LaserAway does not publish pricing online. Pricing is set at consultation and varies by tattoo size, location on the body, and market. Third-party financing is typically available. For national cost context, see the tattoo removal cost guide.",
  },
  {
    question: "What do LaserAway reviews say most often?",
    answer:
      "Recurring themes across LaserAway reviews include consistent equipment and standardized protocols across locations, and accessibility through a large location network. Recurring complaints include per-session pricing leaving patients with unexpected total costs when more sessions are needed, and the multi-service clinic model meaning tattoo removal is not the primary focus of each location.",
  },
  {
    question: "How does LaserAway compare to a local specialist?",
    answer:
      "A local tattoo removal specialist typically offers more individualized protocol, more flexibility on technique, and often works with a narrower patient volume. LaserAway offers standardized equipment, brand-name recognition, and a large footprint. A local specialist running a newer picosecond platform can outperform LaserAway on outcomes, particularly for complex cases. For a non-laser alternative, see the inkOUT vs LaserAway comparison.",
  },
];

const PAGE_PATH = "/reviews/laseraway";
const SITE_URL = "https://realtattooreviews.com";

const TECH_ROWS: [string, string][] = [
  ["Platform", "Cynosure PicoSure"],
  ["Technology", "Picosecond laser (alexandrite)"],
  ["Primary wavelength", "755nm"],
  ["Pulse duration", "550 to 750 picoseconds"],
  ["Optional handpieces (PicoSure Pro)", "532nm (red/orange ink), 1064nm (darker skin tones)"],
  ["Best ink response", "Black, blue, green (755nm)"],
  ["Dark skin suitability", "Requires 1064nm handpiece -- confirm availability at location"],
];

const TRACKED_CITIES = [
  {
    city: "Austin",
    state: "TX",
    href: "/cities/austin",
    note: "One tracked LaserAway location. Review sample building.",
  },
  {
    city: "Chicago",
    state: "IL",
    href: "/cities/chicago",
    note: "One tracked LaserAway location. Review sample building.",
  },
  {
    city: "Houston",
    state: "TX",
    href: "/cities/houston",
    note: "Multiple sub-locations (Galleria, Heights, Pearland). Aggregated under Houston.",
  },
  {
    city: "Tampa",
    state: "FL",
    href: "/cities/tampa",
    note: "One tracked LaserAway location. Review sample building.",
  },
];

export default function LaserAwayReviewsPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Reviews", href: "/reviews" },
    { name: "LaserAway", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "LaserAway Tattoo Removal Reviews | Real Patient Data",
    description:
      "LaserAway tattoo removal reviews aggregated from real patients across Austin, Chicago, Houston, and Tampa. Covers PicoSure technology, pricing, and provider comparisons.",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: ["LaserAway", "PicoSure tattoo removal", "Tattoo removal chain reviews"],
  };

  const faqJsonLd = faqSchema(faqs);

  return (
    <div className="reviews-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <PageHero
        label={
          <>
            <Link href="/reviews" className="hover:text-(--ink) transition-colors">
              Reviews
            </Link>
            <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
            <span className="text-(--muted) font-normal normal-case tracking-normal">
              LaserAway
            </span>
          </>
        }
        title={<>LaserAway <span className="text-(--accent)">Tattoo Removal</span> Reviews</>}
        subtitle="LaserAway is one of the largest multi-service aesthetic chains in the US. This page aggregates real patient reviews from RTR-tracked markets and covers the technology, pricing model, and where LaserAway fits relative to specialists."
      />

      {/* Body */}
      <section className="bg-(--bg)">
        <Container>
          <div className="mx-auto max-w-2xl divide-y divide-(--line)">

            {/* Intro */}
            <div className="py-12">
              <div className="rounded-xl border border-(--line) bg-(--surface) p-6">
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0">
                  LaserAway operates across more than 100 locations nationwide. Tattoo removal at
                  LaserAway uses Cynosure PicoSure, a picosecond alexandrite laser. Per-session
                  pricing applies at all locations. There is no unlimited-sessions package or formal
                  results guarantee.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  The multi-service model means tattoo removal is one of several offerings at each
                  location. Patients who want a tattoo-removal-only specialist or package pricing
                  that caps total cost may be better served by Removery or a local independent
                  clinic. Patients who want a nationally-recognized chain, location flexibility,
                  or the ability to bundle removal with other aesthetic services may find LaserAway
                  a reasonable fit.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  For a direct head-to-head, see the{" "}
                  <Link href="/comparisons/removery-vs-laseraway" className="text-(--accent) hover:underline">
                    Removery vs LaserAway comparison
                  </Link>{" "}
                  or the{" "}
                  <Link href="/comparisons/inkout-vs-laseraway" className="text-(--accent) hover:underline">
                    inkOUT vs LaserAway comparison
                  </Link>{" "}
                  for a non-laser alternative. For pricing context, see the{" "}
                  <Link href="/cost" className="text-(--accent) hover:underline">
                    tattoo removal cost guide
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Review data */}
            <GuideSection heading="Review Data by Location">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Aggregated from published patient reviews in RTR-tracked markets. Sample size,
                positive rate, and negative count are shown per city. Sample is capped at 50 per
                location.
              </p>
              <Suspense
                fallback={
                  <div className="rounded-xl border border-(--line) bg-(--surface) p-8 text-center">
                    <p className="font-sans text-[14px] text-(--muted) m-0">Loading review data&hellip;</p>
                  </div>
                }
              >
                <BrandReviewSummary brand="LaserAway" />
              </Suspense>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Review coverage for LaserAway is actively building. Markets listed below are tracked
                by RTR but may not yet have published samples.
              </p>
            </GuideSection>

            {/* Tracked locations */}
            <GuideSection heading="Tracked Locations">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                RTR currently tracks LaserAway in four markets. Each city page shows how LaserAway
                compares to other providers operating in that market.
              </p>
              <div className="space-y-3">
                {TRACKED_CITIES.map((loc) => (
                  <div
                    key={loc.city}
                    className="rounded-xl border border-(--line) bg-(--surface) p-5 flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="font-sans font-semibold text-(--ink) text-[15px] m-0 mb-0.5">
                        {loc.city}, {loc.state}
                      </p>
                      <p className="font-sans text-[13px] text-(--muted) m-0">{loc.note}</p>
                    </div>
                    <Link
                      href={loc.href}
                      className="shrink-0 text-[13px] font-medium text-(--accent) hover:underline"
                    >
                      City page →
                    </Link>
                  </div>
                ))}
              </div>
            </GuideSection>

            {/* Technology */}
            <GuideSection heading="LaserAway Technology: PicoSure">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                LaserAway uses Cynosure PicoSure across its locations. PicoSure was the first
                picosecond laser to receive FDA clearance for tattoo removal. Picosecond lasers
                deliver energy in shorter bursts than Q-switched nanosecond lasers, which improves
                ink fragmentation and reduces thermal damage to surrounding tissue.
              </p>
              <GuideTable
                headers={["Specification", "Detail"]}
                rows={TECH_ROWS.map(([spec, detail]) => [spec, detail])}
              />
              <GuideCallout label="Dark skin note">
                The 755nm alexandrite wavelength has higher melanin absorption than 1064nm Nd:YAG,
                which makes it less suitable for Fitzpatrick skin types V and VI without careful
                protocol adjustment. PicoSure Pro offers a 1064nm handpiece, but availability
                varies by location. Confirm handpiece options at your specific LaserAway location
                before booking if you have a darker skin tone. For a comparison of how different
                platforms handle this, see{" "}
                <Link href="/categories/dark-skin-tattoo-removal" className="text-(--accent) hover:underline">
                  dark skin tattoo removal reviews
                </Link>
                .
              </GuideCallout>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                For a technology comparison against Removery's PicoWay platform, see the{" "}
                <Link href="/comparisons/removery-vs-laseraway" className="text-(--accent) hover:underline">
                  Removery vs LaserAway comparison
                </Link>
                . For a broader laser vs non-laser technology overview, see{" "}
                <Link href="/comparisons/best-tattoo-removal-method" className="text-(--accent) hover:underline">
                  best tattoo removal method
                </Link>
                .
              </p>
            </GuideSection>

            {/* Best for / Less ideal for */}
            <GuideSection heading="Best Fit and Weak Fit">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2">
                    Better fit for LaserAway
                  </p>
                  <GuideBulletList
                    items={[
                      "Standard black or blue-black tattoos on light to medium skin tones (Fitzpatrick I to III)",
                      "Patients who want a nationally-recognized chain with many location options",
                      "Patients who prefer per-session pricing with no upfront package commitment",
                      "Patients who want to combine tattoo removal with laser hair removal or other services at the same location",
                      "Simple or small tattoos likely to clear in fewer sessions",
                    ]}
                  />
                </div>
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2">
                    Less ideal for LaserAway
                  </p>
                  <GuideBulletList
                    variant="warning"
                    items={[
                      "Darker skin tones (Fitzpatrick IV to VI) -- confirm 1064nm handpiece availability at your specific location",
                      "Complex color ink (green, yellow, purple) -- 755nm alone has limited coverage; multi-wavelength setup needed",
                      "Patients who want a tattoo-removal-only specialist",
                      "Patients who want package pricing that caps total cost across unlimited sessions",
                      "Patients for whom total cost certainty is a priority (no results guarantee)",
                      "Patients who want individualized protocol rather than standardized chain treatment",
                    ]}
                  />
                </div>
              </div>
            </GuideSection>

            {/* Pricing */}
            <GuideSection heading="LaserAway Pricing">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                LaserAway does not publish pricing online. Pricing is set at consultation and varies
                by tattoo size, location on the body, ink complexity, and market.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Pricing model",
                    body: "Per-session pricing. There is no LaserAway unlimited-sessions package or formal results guarantee. Each session beyond the initial estimate is an additional cost. This creates total cost uncertainty for tattoos that require more sessions than average.",
                  },
                  {
                    title: "Financing",
                    body: "Third-party financing options are typically available at LaserAway locations. Internal LaserAway financing within a package model is not offered, unlike Removery's complete removal package structure.",
                  },
                  {
                    title: "Getting a quote",
                    body: "Book a free consultation to receive a quote. LaserAway consultations are location-dependent -- some locations offer in-person consultations only. For national cost benchmarks, see the tattoo removal cost guide.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-(--surface) p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">{item.body}</p>
                  </div>
                ))}
              </div>

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                For national tattoo removal pricing benchmarks and what drives session count, see the{" "}
                <Link href="/cost" className="text-(--accent) hover:underline">
                  tattoo removal cost guide
                </Link>
                .
              </p>
            </GuideSection>

            {/* Comparisons */}
            <GuideSection heading="How LaserAway Compares to Other Options">
              <div className="space-y-3">
                {[
                  {
                    title: "LaserAway vs Removery",
                    body: "Removery is a tattoo-removal-only specialist using Candela PicoWay (three wavelengths including 785nm for green ink) with a complete removal package that caps total cost. LaserAway is a multi-service chain using PicoSure (755nm primary) with per-session pricing. If total cost certainty and specialist focus matter, Removery has a stronger structural offer.",
                    link: "/comparisons/removery-vs-laseraway",
                    linkText: "Full Removery vs LaserAway comparison",
                  },
                  {
                    title: "LaserAway vs local specialists",
                    body: "A local tattoo removal specialist typically offers individualized protocol, more flexibility on technique, and often smaller patient volume. Equipment quality varies by clinic. A local specialist running a current picosecond platform can match or outperform LaserAway, particularly for complex cases like color ink or darker skin tones. The tradeoff is less brand consistency and more due diligence required.",
                    link: null,
                    linkText: null,
                  },
                  {
                    title: "LaserAway vs non-laser removal",
                    body: "Non-laser methods like TEPR (used by inkOUT) work through a different mechanism entirely and are not limited by laser-melanin interaction. For patients who have been told laser is not safe for their skin tone, or who want a laser-free option, non-laser alternatives exist. Results and session counts differ substantially from laser removal.",
                    link: "/comparisons/inkout-vs-laseraway",
                    linkText: "inkOUT vs LaserAway comparison",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-(--surface) p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">{item.body}</p>
                    {item.link && (
                      <Link
                        href={item.link}
                        className="inline-block mt-2 text-[13px] font-medium text-(--accent) hover:underline"
                      >
                        {item.linkText} →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </GuideSection>

            {/* Editorial note */}
            <div className="py-12">
              <GuideCallout label="Editorial note">
                This page synthesizes brand-published technology and pricing material with
                RTR review-sample evidence from tracked markets. LaserAway review coverage is
                actively building. Technology specs from Cynosure. See our{" "}
                <Link href="/methodology" className="text-(--accent) hover:underline">
                  methodology
                </Link>{" "}
                and{" "}
                <Link href="/editorial-policy" className="text-(--accent) hover:underline">
                  editorial policy
                </Link>{" "}
                for full details.
              </GuideCallout>
            </div>

            <GuideRelatedLinks
              links={[
                {
                  href: "/comparisons/removery-vs-laseraway",
                  title: "Removery vs LaserAway",
                  desc: "Head-to-head on laser technology, pricing model, and session guarantee. PicoWay vs PicoSure.",
                },
                {
                  href: "/comparisons/inkout-vs-laseraway",
                  title: "inkOUT vs LaserAway",
                  desc: "Compare non-laser TEPR against LaserAway's PicoSure for method, cost, and use-case fit.",
                },
                {
                  href: "/comparisons/best-tattoo-removal-method",
                  title: "Best Tattoo Removal Method",
                  desc: "Side-by-side comparison of laser, non-laser, and other methods by effectiveness, cost, and risk.",
                },
                {
                  href: "/cost",
                  title: "Tattoo Removal Cost Guide",
                  desc: "What drives session count and total cost. National pricing benchmarks.",
                },
                {
                  href: "/guides/tattoo-removal-aftercare",
                  title: "Tattoo Removal Aftercare",
                  desc: "What to do in the first 24 hours, how to care for blisters, and when to contact your provider.",
                },
                {
                  href: "/categories/dark-skin-tattoo-removal",
                  title: "Dark Skin Tattoo Removal Reviews",
                  desc: "Provider reviews focused on patients with deeper skin tones. Covers technique and outcomes.",
                },
              ]}
            />
          </div>
        </Container>
      </section>

      <FAQSection faqs={faqs} />
    </div>
  );
}
