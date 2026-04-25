/*
 * DYNAMIC DATA NOTE FOR CLAUDE CODE:
 * One dynamic component renders live cross-city evidence from Supabase.
 * The prose is intentionally GENERIC and STATIC — no hardcoded numbers, ratings,
 * or counts. All quantitative data is rendered by BrandComparisonEvidence.
 *
 * COMPONENT: <BrandComparisonEvidence brand_a="Removery" brand_b="LaserAway" />
 * Same reusable component as inkout-vs-removery. Goes where [[CROSS_CITY_EVIDENCE_TABLE]] appears.
 *
 * DATA STATUS (snapshot at draft time):
 * - Removery: Austin (50 reviews), Chicago (100 reviews) in competitor_reviews.
 *   Tampa (Westshore), Houston (3 locations), Round Rock pending next scrape.
 * - LaserAway: ZERO rows in competitor_reviews currently.
 *   Known markets: Austin, Chicago, Houston (Galleria/Heights/Pearland), Tampa.
 *   All render as "Review sample pending" via brandBPendingCities prop.
 *
 * SQL CASE expression for brand detection:
 *   WHEN provider_name ILIKE '%Removery%' THEN 'Removery'
 *   WHEN provider_name ILIKE '%LaserAway%' THEN 'LaserAway'
 * (inkOUT bucket not relevant — neither brand is inkOUT)
 *
 * Sources: Candela (PicoWay specs), Cynosure (PicoSure specs),
 * PMC4859414 (Torbeck et al 2016 — PicoSure FDA clearance reference).
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
import MonoLabel from "@/components/reviews/MonoLabel";
import BrandComparisonEvidence from "@/components/comparison/BrandComparisonEvidence";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Removery vs LaserAway: PicoWay vs PicoSure Compared (2026) | RealTattooReviews",
  description:
    "Compare Removery and LaserAway on laser technology, pricing model, session guarantees, and review evidence. Specialist vs chain, PicoWay vs PicoSure.",
  alternates: {
    canonical: "https://realtattooreviews.com/comparisons/removery-vs-laseraway",
  },
  openGraph: {
    title: "Removery vs LaserAway: PicoWay vs PicoSure Compared (2026)",
    description:
      "Compare Removery and LaserAway on laser technology, pricing model, session guarantees, and review evidence. Specialist vs chain, PicoWay vs PicoSure.",
  },
};

const faqs = [
  {
    question: "Is Removery better than LaserAway?",
    answer:
      "Neither is universally better. Removery is better suited for users who want a tattoo-removal-only specialist, package pricing with total cost certainty, and an effective results guarantee. LaserAway is better suited for users who want a larger national footprint, per-session flexibility, and the ability to bundle aesthetic services.",
  },
  {
    question: "Is Removery cheaper than LaserAway?",
    answer:
      "It depends on how many sessions your tattoo needs. Removery's Complete Removal Package caps total cost. LaserAway's per-session model may be cheaper if your tattoo clears quickly. Neither publishes pricing online. Two free consultations produce two comparable quotes.",
  },
  {
    question: "Which has better tattoo removal results, Removery or LaserAway?",
    answer:
      "Both use picosecond lasers with strong clearance evidence. The technology difference between PicoWay and PicoSure is smaller than the difference between either platform and a Q-switched laser. Results depend on the tattoo, ink, skin, and provider protocol.",
  },
  {
    question: "What laser does Removery use?",
    answer:
      "Removery uses Candela PicoWay, a picosecond laser with three wavelengths: 1064nm, 532nm, and 785nm.",
  },
  {
    question: "What laser does LaserAway use for tattoo removal?",
    answer:
      "LaserAway uses Cynosure PicoSure, a picosecond laser. The primary wavelength is 755nm (alexandrite). PicoSure Pro adds optional 532nm and 1064nm handpieces.",
  },
  {
    question: "Which provider has more locations?",
    answer:
      "LaserAway has more total locations. Removery has fewer but each is exclusively focused on tattoo removal.",
  },
  {
    question: "Is Removery worth it?",
    answer:
      "For users who want total cost certainty, a results guarantee, and a tattoo-removal-only specialist, yes. See /reviews/removery for the full picture.",
  },
  {
    question: "Is LaserAway worth it?",
    answer:
      "For users with standard body tattoos in markets where LaserAway is conveniently located, it is a reasonable mainstream option. For users who want cost certainty or a removal-only specialist, Removery or a local specialist may be a better fit. See /reviews/laseraway for the full picture.",
  },
  {
    question: "Does Removery offer a guarantee?",
    answer:
      "Removery's Complete Removal Package functions as an effective results guarantee. The package covers unlimited sessions until the tattoo is removed at the quoted price.",
  },
  {
    question: "Which is better for dark skin?",
    answer:
      "Both platforms can treat darker Fitzpatrick skin types. The 1064nm wavelength is safest for darker skin. PicoWay includes 1064nm as standard. PicoSure Pro offers it as an optional handpiece — confirm availability at your LaserAway location. For users who want to avoid laser-melanin interaction entirely, non-laser options exist. See the best tattoo removal method overview.",
  },
];

const PAGE_PATH = "/comparisons/removery-vs-laseraway";
const SITE_URL = "https://realtattooreviews.com";

const GLANCE_ROWS: [string, string, string][] = [
  ["Business model", "Tattoo-removal-only specialist", "Multi-service aesthetics chain"],
  ["Laser technology", "Candela PicoWay (picosecond)", "Cynosure PicoSure (picosecond)"],
  ["Wavelengths", "1064nm, 532nm, 785nm", "755nm primary; optional 532nm, 1064nm"],
  ["Green ink coverage", "785nm (strong green clearance)", "755nm (strong green and blue clearance)"],
  ["Pricing model", "Complete Removal Package (capped total cost) + per-session", "Per-session pricing"],
  ["Guarantee", "Package functions as effective results guarantee", "No formal unlimited-sessions guarantee"],
  ["Payment plans", "Internal financing within the package", "Third-party financing options"],
  ["Service focus", "Tattoo removal only", "Tattoo removal + laser hair removal + body contouring + injectables + skin treatments"],
  ["Free consultation", "Yes", "Varies by location"],
  ["National footprint", "Large (tattoo-removal-only locations)", "Larger (multi-service locations across more metros)"],
];

export default function RemoveryVsLaserawayPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Comparisons", href: "/comparisons" },
    { name: "Removery vs LaserAway", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Removery vs LaserAway: PicoWay vs PicoSure Compared (2026)",
    description:
      "Compare Removery and LaserAway on laser technology, pricing model, session guarantees, and review evidence.",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: ["Removery vs LaserAway", "PicoWay vs PicoSure", "Tattoo removal comparison"],
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
      <section className="border-b border-(--line) pt-20 pb-16 bg-(--feathering-mist)">
        <Container>
          <MonoLabel color="accent" size="sm" className="mb-5 flex items-center gap-2">
            <Link href="/comparisons" className="hover:text-(--ink) transition-colors">
              Comparisons
            </Link>
            <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
            <span className="text-(--muted) font-normal normal-case tracking-normal">
              Removery vs LaserAway
            </span>
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            Removery vs{" "}
            <span className="text-(--accent)">LaserAway</span>
          </h1>

          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--muted) max-w-2xl">
            Specialist vs chain, PicoWay vs PicoSure, package pricing vs per-session. The head-to-head
            decision for two of the largest national tattoo removal brands.
          </p>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-(--bg)">
        <Container>
          <div className="mx-auto max-w-2xl divide-y divide-(--line)">

            {/* Intro */}
            <div className="py-12">
              <div className="rounded-xl border border-(--line) bg-(--surface) p-6">
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0">
                  Removery and LaserAway are both national brands offering laser tattoo removal.
                  That is where the similarity ends. The Removery vs LaserAway decision comes down
                  to three differences: technology, pricing model, and business focus.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  Removery is a tattoo-removal-only specialist chain that uses Candela PicoWay, a
                  picosecond laser with three wavelengths (1064nm, 532nm, 785nm), and offers a
                  Complete Removal Package that caps total cost regardless of session count.
                  LaserAway is a multi-service aesthetics chain that uses Cynosure PicoSure, a
                  picosecond laser built around a 755nm alexandrite wavelength, with per-session
                  pricing.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  This page covers the head-to-head decision without forcing a universal winner. For
                  non-laser alternatives, see the{" "}
                  <Link href="/comparisons/inkout-vs-removery" className="text-(--accent) hover:underline">
                    inkOUT vs Removery
                  </Link>{" "}
                  comparison. For the broader method overview, see{" "}
                  <Link href="/comparisons/best-tattoo-removal-method" className="text-(--accent) hover:underline">
                    best tattoo removal method
                  </Link>
                  . For brand reviews, see{" "}
                  <Link href="/reviews/removery" className="text-(--accent) hover:underline">
                    /reviews/removery
                  </Link>{" "}
                  and{" "}
                  <Link href="/reviews/laseraway" className="text-(--accent) hover:underline">
                    /reviews/laseraway
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Key differences */}
            <GuideSection heading="Key Differences Between Removery and LaserAway">
              <GuideTable
                headers={["", "Removery", "LaserAway"]}
                rows={GLANCE_ROWS.map(([feature, a, b]) => [feature, a, b])}
              />
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Both brands use picosecond lasers. Both are national chains. The differences are
                in the details.
              </p>
            </GuideSection>

            {/* Pricing */}
            <GuideSection heading="Removery vs LaserAway: Pricing and Packages">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The pricing model difference is the single most impactful axis in the Removery vs
                LaserAway decision for most users.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Removery pricing",
                    body: "Removery offers a Complete Removal Package. At consultation, Removery quotes a total cost based on tattoo size, ink density, and treatment complexity. The package covers unlimited sessions until the tattoo is removed, regardless of how many sessions it actually takes. The package functions as an effective results guarantee. Removery also offers per-session pricing for users who prefer flexibility, and includes internal monthly payment plans within the package model.",
                  },
                  {
                    title: "LaserAway pricing",
                    body: "LaserAway uses per-session pricing. LaserAway does not publish pricing online. Users get a quote at consultation. LaserAway does not offer a formal unlimited-sessions package. If your tattoo needs more sessions than initially estimated, each additional session is an additional cost. Third-party financing options are typically available.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-(--surface) p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">{item.body}</p>
                  </div>
                ))}
              </div>

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                What this means for users:
              </p>
              <GuideBulletList
                items={[
                  "If your tattoo ends up needing more sessions than average, Removery's package protects your total cost. LaserAway's per-session model does not.",
                  "If your tattoo clears in fewer sessions than average, per-session pricing may produce a lower total cost than a package commitment.",
                  "If total cost certainty matters to you, Removery's model is structurally stronger. If flexibility matters more, LaserAway's per-session model avoids an upfront commitment.",
                  "Removery vs LaserAway cost comparison requires consultations at both. Neither publishes pricing online.",
                ]}
              />
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                For national pricing context, see the{" "}
                <Link href="/cost" className="text-(--accent) hover:underline">cost guide</Link>.
              </p>
            </GuideSection>

            {/* Technology */}
            <GuideSection heading="Removery vs LaserAway: Laser Technology and Results">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Both brands use picosecond lasers. The platforms differ in wavelength configuration
                and heritage.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Removery: Candela PicoWay",
                    body: "PicoWay offers three wavelengths: 1064nm (black, dark ink, safer for darker skin), 532nm (red, orange, warm tones), and 785nm (green, blue-green, purple). The 785nm wavelength gives PicoWay a specific advantage on green ink clearance. PicoWay's pulse duration is among the shortest in the picosecond class.",
                  },
                  {
                    title: "LaserAway: Cynosure PicoSure",
                    body: "PicoSure's primary wavelength is 755nm (alexandrite). This wavelength handles black, blue, and green inks effectively. PicoSure Pro adds optional 532nm and 1064nm handpieces. PicoSure was the first picosecond aesthetic laser to receive FDA clearance (December 2012). PicoSure uses Cynosure's patented PressureWave technology.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-(--surface) p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">{item.body}</p>
                  </div>
                ))}
              </div>

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Wavelength comparison:
              </p>
              <GuideBulletList
                items={[
                  "Black ink. Both platforms handle black well at 1064nm. No meaningful difference.",
                  "Green ink. PicoWay uses 785nm. PicoSure uses 755nm. Both target green effectively. Clinical performance on green ink is comparable between the two platforms.",
                  "Red and orange. Both platforms handle at 532nm. No meaningful difference.",
                  "Dark skin. The 1064nm wavelength has the lowest melanin absorption and is safest for darker Fitzpatrick skin types. PicoWay includes 1064nm as standard. PicoSure Pro offers it as an optional handpiece. Availability may vary by LaserAway location.",
                ]}
              />
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Both platforms have peer-reviewed evidence supporting strong clearance rates. The
                technology difference between PicoWay and PicoSure is smaller than the difference
                between either picosecond platform and a Q-switched laser. For the full technology
                comparison, see{" "}
                <Link href="/comparisons/picoway-vs-q-switch" className="text-(--accent) hover:underline">
                  PicoWay vs Q-switch
                </Link>
                .
              </p>
            </GuideSection>

            {/* Locations */}
            <GuideSection heading="Removery vs LaserAway: Locations and Convenience">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Both brands operate across major US metros.
              </p>
              <div className="space-y-3">
                {[
                  {
                    title: "Removery locations",
                    body: "Removery operates tattoo-removal-only locations. Every location is dedicated to tattoo removal. Staff, equipment, and scheduling are built around one service.",
                  },
                  {
                    title: "LaserAway locations",
                    body: "LaserAway operates multi-service aesthetics locations. Tattoo removal is one offering alongside laser hair removal, CoolSculpting, injectables, and other cosmetic procedures. LaserAway's footprint is generally larger.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-(--surface) p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">{item.body}</p>
                  </div>
                ))}
              </div>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                LaserAway has more total locations. Removery has fewer but each is exclusively
                focused on tattoo removal. Check both for availability in your metro.
              </p>
            </GuideSection>

            {/* Reviews and evidence */}
            <GuideSection heading="Removery vs LaserAway: Reviews and Reputation">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Both brands carry strong aggregate Google ratings across their national footprint.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  {
                    title: "Review volume",
                    body: "LaserAway's total lifetime review count is higher because the multi-service model generates reviews from multiple procedure types. Removery's reviews are exclusively about tattoo removal. Isolating tattoo-removal-specific reviews from LaserAway's aggregate is harder.",
                  },
                  {
                    title: "Review quality signal",
                    body: "The cross-city evidence table below shows tattoo-removal-specific review data from our internal dataset where available. The table updates as our scrape refreshes.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-(--surface) p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">{item.body}</p>
                  </div>
                ))}
              </div>
              <Suspense
                fallback={
                  <div className="rounded-xl border border-(--line) bg-(--surface) p-8 text-center">
                    <p className="font-sans text-[14px] text-(--muted) m-0">Loading evidence table&hellip;</p>
                  </div>
                }
              >
                <BrandComparisonEvidence
                  brandA="Removery"
                  brandB="LaserAway"
                  brandAPendingCities={["Tampa", "Houston"]}
                  brandBPendingCities={["Austin", "Chicago", "Houston", "Tampa"]}
                />
              </Suspense>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Both brands have coverage gaps in the current dataset.
              </p>
            </GuideSection>

            {/* Pros and cons */}
            <GuideSection heading="Pros and Cons of Removery">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2">Pros</p>
                  <GuideBulletList
                    items={[
                      "Tattoo-removal-only specialist focus across all locations",
                      "Complete Removal Package caps total cost regardless of session count",
                      "Package functions as an effective results guarantee",
                      "Uses Candela PicoWay with three wavelengths including 785nm for green ink",
                      "Internal financing within the package model",
                      "Free consultations at all locations",
                      "Reviews are exclusively about tattoo removal",
                      "Consistent national protocols",
                    ]}
                  />
                </div>
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2">Cons</p>
                  <GuideBulletList
                    variant="warning"
                    items={[
                      "Fewer total locations than a multi-service chain",
                      "No ability to bundle tattoo removal with other aesthetic services",
                      "Pricing is consultation-set, not published online",
                      "Package commitment may exceed per-session cost if the tattoo clears quickly",
                    ]}
                  />
                </div>
              </div>
            </GuideSection>

            <GuideSection heading="Pros and Cons of LaserAway">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2">Pros</p>
                  <GuideBulletList
                    items={[
                      "Larger national footprint with more total locations",
                      "Uses Cynosure PicoSure, the first FDA-cleared picosecond laser",
                      "Multi-service platform lets users bundle tattoo removal with other aesthetic treatments",
                      "Strong mainstream brand recognition",
                      "PicoSure Pro offers multi-wavelength coverage when all handpieces are available",
                      "Per-session model avoids upfront package commitment",
                    ]}
                  />
                </div>
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2">Cons</p>
                  <GuideBulletList
                    variant="warning"
                    items={[
                      "Tattoo removal is one service among many; per-clinician specialization is diluted",
                      "No formal unlimited-sessions package or results guarantee",
                      "Per-session pricing exposes users to total cost risk if more sessions are needed",
                      "Google reviews reflect the full aesthetics service mix, not tattoo removal specifically",
                      "Pricing is not published online",
                      "PicoSure's 755nm has higher melanin absorption than 1064nm; darker skin types require careful clinician judgment",
                    ]}
                  />
                </div>
              </div>
            </GuideSection>

            {/* Verdict */}
            <GuideSection heading="Our Verdict: Removery or LaserAway?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Neither brand is universally better.
              </p>

              <div className="space-y-4">
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans mb-2 text-[14px] font-semibold text-(--ink)">
                    Choose Removery when:
                  </p>
                  <GuideBulletList
                    items={[
                      "You want a tattoo-removal-only specialist",
                      "You want package pricing that caps total cost across unlimited sessions",
                      "You want an effective results guarantee",
                      "You want reviews that are exclusively about tattoo removal",
                      "You have a larger or denser tattoo and want cost certainty",
                      "Green ink clearance is important and you want the 785nm wavelength as standard",
                    ]}
                  />
                </div>

                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans mb-2 text-[14px] font-semibold text-(--ink)">
                    Choose LaserAway when:
                  </p>
                  <GuideBulletList
                    items={[
                      "You want a larger national footprint with more location options",
                      "You want to bundle tattoo removal with other aesthetic services",
                      "You prefer per-session pricing without an upfront package commitment",
                      "You have a simpler tattoo that is likely to clear in fewer sessions",
                      "You are comfortable with a mainstream aesthetics chain",
                      "A LaserAway location is closer or more convenient",
                    ]}
                  />
                </div>

                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans mb-2 text-[14px] font-semibold text-(--ink)">
                    Get consultations at both when:
                  </p>
                  <GuideBulletList
                    items={[
                      "Both brands have a location near you",
                      "You want to compare quotes and session-count estimates",
                      "You are uncertain whether package or per-session pricing will be cheaper for your tattoo",
                    ]}
                  />
                </div>
              </div>

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The decision often narrows on geography. Use the city comparison pages to see which
                brands operate in your metro. See{" "}
                <Link href="/reviews/removery" className="text-(--accent) hover:underline">
                  /reviews/removery
                </Link>{" "}
                and{" "}
                <Link href="/reviews/laseraway" className="text-(--accent) hover:underline">
                  /reviews/laseraway
                </Link>{" "}
                for deeper brand coverage.
              </p>
            </GuideSection>

            {/* Editorial note */}
            <div className="py-12">
              <GuideCallout label="Editorial note">
                This comparison synthesizes brand-published technology and pricing material with
                our internal review-sample evidence dataset. Both brands have coverage gaps in the
                current dataset. PicoWay specs from Candela. PicoSure specs from Cynosure and
                PMC4859414 (Torbeck et al 2016). inkOUT is a current advertising client of
                RealTattooReviews; this page does not directly evaluate inkOUT. See our{" "}
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
                  href: "/comparisons/inkout-vs-removery",
                  title: "inkOUT vs Removery",
                  desc: "Compare non-laser TEPR against Removery's PicoWay — method, pricing, and use-case fit.",
                },
                {
                  href: "/comparisons/best-tattoo-removal-method",
                  title: "Best Tattoo Removal Method",
                  desc: "Side-by-side comparison of laser, non-laser, and other methods by effectiveness, cost, and risk.",
                },
                {
                  href: "/reviews/removery",
                  title: "Removery Reviews",
                  desc: "Full review sample and provider profiles for Removery across all markets.",
                },
                {
                  href: "/reviews/laseraway",
                  title: "LaserAway Reviews",
                  desc: "Full review sample and provider profiles for LaserAway across all markets.",
                },
              ]}
            />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-y border-(--line) bg-(--surface) py-20">
        <Container>
          <MonoLabel color="accent" size="sm" className="mb-5">
            FAQ
          </MonoLabel>
          <h2 className="font-sans font-bold text-[clamp(24px,3.5vw,36px)] leading-[1.05] tracking-[-0.025em] text-(--ink) m-0 mb-10">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="border border-(--line) bg-white p-6 rounded-xl"
              >
                <p className="font-semibold text-(--ink) text-[15px] mb-3 leading-snug m-0">
                  {faq.question}
                </p>
                <p className="text-[13px] leading-relaxed text-(--muted) m-0">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
