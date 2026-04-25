/*
 * DYNAMIC DATA NOTE FOR CLAUDE CODE:
 * Two dynamic components on this page render live data from Supabase. The prose is
 * intentionally GENERIC and STATIC (no hardcoded numbers, ratings, rankings, or counts).
 * All quantitative data is rendered by CityProviderRanking and CityProviderComparisonTable.
 *
 * PROSE RULE: Provider profiles describe what each clinic IS (location, method, business
 * model, pricing structure, who they serve). Profiles do NOT describe how each clinic is
 * RANKED or PERFORMING in current data. The components handle that.
 *
 * Required SQL (run by getCityProviderAggregates in lib/data/reviews.ts):
 *   SELECT provider_name, brand_name, _place_id AS place_id, MIN(method_used) AS method_used,
 *     COUNT(*) AS scrape_sample_size, ROUND(AVG(star_rating)::numeric, 2) AS scrape_avg_stars,
 *     SUM(CASE WHEN result_rating='Positive' THEN 1 ELSE 0 END) AS positives,
 *     SUM(CASE WHEN result_rating='Negative' THEN 1 ELSE 0 END) AS negatives,
 *     SUM(CASE WHEN scarring_mentioned='Positive' THEN 1 ELSE 0 END) AS scarring_positive_mentions,
 *     SUM(CASE WHEN scarring_mentioned='Yes' THEN 1 ELSE 0 END) AS scarring_yes_mentions,
 *     SUM(CASE WHEN use_case='Complete' AND result_rating='Positive' THEN 1 ELSE 0 END) AS use_case_complete,
 *     SUM(CASE WHEN use_case='Microblading' AND result_rating='Positive' THEN 1 ELSE 0 END) AS use_case_microblading,
 *     SUM(CASE WHEN use_case='Cover-up' AND result_rating='Positive' THEN 1 ELSE 0 END) AS use_case_coverup,
 *     SUM(CASE WHEN use_case='Color' AND result_rating='Positive' THEN 1 ELSE 0 END) AS use_case_color,
 *     MAX(bucket) AS bucket
 *   FROM competitor_reviews
 *   WHERE LOWER(location_city) = $1
 *     AND status IN ('published','draft')
 *     AND (is_tattoo_removal IS TRUE OR is_tattoo_removal IS NULL)
 *   GROUP BY provider_name, brand_name, _place_id
 *   ORDER BY scrape_sample_size DESC, scrape_avg_stars DESC;
 *
 * INKOUT BUCKET AGGREGATION:
 * inkOUT in Chicago appears under both bucket='inkout' and bucket='tatt2away' for the same
 * place_id (ChIJWYHkrrfND4gRCP1pNElFEe8). getCityProviderAggregates aggregates by
 * provider_name and sets isInkout=true when any row has bucket='inkout'.
 *
 * PROVIDERS WITHOUT SUPABASE DATA YET:
 * LaserAway (Lincoln Park, River North, Bucktown) and Advanced Laser Aesthetics — real
 * Chicago providers with established Google ratings but no rows in competitor_reviews yet.
 * CityProviderRanking renders them with "Review sample pending". Static prose preserves
 * SEO content for all providers by name.
 *
 * SUBURBAN DATA:
 * Only Chicago city is in the dataset currently. Naperville and Orland Park Removery
 * locations are mentioned in prose but will not appear in the dynamic components until
 * their place_ids are scraped.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Container from "@/components/layout/Container";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import GuideSection from "@/components/guide/GuideSection";
import GuideBulletList from "@/components/guide/GuideBulletList";
import GuideCallout from "@/components/guide/GuideCallout";
import GuideRelatedLinks from "@/components/guide/GuideRelatedLinks";
import MonoLabel from "@/components/reviews/MonoLabel";
import CityProviderRanking from "@/components/city/CityProviderRanking";
import CityProviderComparisonTable from "@/components/city/CityProviderComparisonTable";
import type { StaticProviderProfile } from "@/components/city/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Best Tattoo Removal in Chicago (2026): Clinics Compared & Reviewed | RealTattooReviews",
  description:
    "Compare tattoo removal clinics in Chicago and the suburbs. See provider differences across method, reviews, and pricing before you book.",
  alternates: {
    canonical: "https://realtattooreviews.com/cities/chicago",
  },
  openGraph: {
    title: "Best Tattoo Removal in Chicago (2026): Clinics Compared & Reviewed",
    description:
      "Compare tattoo removal clinics in Chicago and the suburbs. See provider differences across method, reviews, and pricing before you book.",
  },
};

const faqs = [
  {
    question: "What is the best tattoo removal clinic in Chicago?",
    answer:
      "There is no single best clinic for every user. The ranked list above orders providers by current review-sample evidence and use-case fit. Removery is the deepest national chain in the market. inkOUT (Rejuvatek Aesthetics on Lincoln Ave) is the only non-laser option. Kovak is the longest-established South Loop med spa. Match the provider to your tattoo, budget, and method preference.",
  },
  {
    question: "How much does tattoo removal cost in Chicago?",
    answer:
      "Per-session pricing in Chicago runs $150 to $500. Most cases land in the $200 to $400 range. Total full-removal cost for a standard tattoo typically falls between $1,000 and $5,000. Package pricing models cap that total at a guaranteed price.",
  },
  {
    question: "Which tattoo removal clinics in Chicago have the best reviews?",
    answer:
      "The ranked list above sorts by current review-sample sentiment. Lifetime Google review counts are higher than the sample sizes shown and are visible on each provider's Google business listing.",
  },
  {
    question: "Where can I get tattoo removal in Chicago?",
    answer:
      "Providers serve every part of the metro. Bucktown hosts Removery and LaserAway. Lincoln Square hosts Removery. Lincoln Park hosts inkOUT (Rejuvatek), LaserAway, and several med spas. River North hosts LaserAway. The South Loop hosts Kovak Cosmetic Center. The Northwest Side hosts Advanced Laser Aesthetics. Suburbs like Naperville and Orland Park have Removery locations.",
  },
  {
    question: "What laser tattoo removal options are available in Chicago?",
    answer:
      "Picosecond options include Candela PicoWay (both Removery locations, Enfuse) and PicoSure (LaserAway). Q-Switch options include Kovak Cosmetic Center. inkOUT (Rejuvatek) is the only non-laser TEPR option in Chicago.",
  },
  {
    question: "How many sessions does tattoo removal take?",
    answer:
      "Most tattoos need three to twelve sessions for complete removal. Three to eight sessions is typical for cover-up fading. Sessions are spaced six to eight weeks apart. The actual count depends on ink color, density, depth, your skin type, and your provider's technology.",
  },
  {
    question: "Does tattoo removal hurt?",
    answer:
      "Most users describe laser tattoo removal as similar to a thick rubber band snapping against the skin. The sensation repeats for the duration of the treatment area. Sessions for small tattoos last under 10 minutes. Most Chicago providers use cooling devices or ice packs before and after to reduce discomfort. TEPR (non-laser) feels different and is usually described as moderate, similar to a tattoo session.",
  },
  {
    question: "Is PicoWay or PicoSure better for tattoo removal?",
    answer:
      "Both are picosecond systems and both are effective. PicoWay (used by Removery and Enfuse) offers strong performance across most ink colors with three core wavelengths. PicoSure (used by LaserAway) was first to market and performs particularly well on green ink with its 755 nm wavelength. The provider's experience and treatment protocol matter more than the brand label. Both meaningfully outperform older nanosecond Q-switched lasers.",
  },
  {
    question: "Do any Chicago tattoo removal clinics offer free consultations?",
    answer:
      "Most do. Removery, LaserAway, Enfuse Medical Spa, Kovak Cosmetic Center, and inkOUT (Rejuvatek) all offer no-cost consultations. They assess the tattoo, estimate sessions, and quote pricing before commitment. Free tattoo removal Chicago programs (full procedures at no cost) are not common; some clinics occasionally offer limited charity removal for tattoos linked to abuse, gang affiliation, or human trafficking recovery, but this is rare.",
  },
  {
    question: "Are there tattoo removal deals or discounts in Chicago?",
    answer:
      "Yes. LaserAway runs frequent promotional bundles, often through Groupon. Removery has offered Black Friday and seasonal discount programs. Per-session pricing is rarely the cheapest path; package pricing typically beats per-session if your tattoo needs the average number of treatments or more.",
  },
  {
    question: "Is PicoSure tattoo removal Chicago available?",
    answer:
      "Yes. PicoSure tattoo removal Chicago coverage runs through LaserAway's three locations (Lincoln Park, River North, Bucktown). PicoSure performs particularly well on green ink with its 755 nm wavelength. Other Chicago providers using picosecond technology (Removery, Enfuse) run PicoWay, a different picosecond system with comparable overall performance.",
  },
];

const PAGE_PATH = "/cities/chicago";
const SITE_URL = "https://realtattooreviews.com";

const CHICAGO_PROVIDERS: StaticProviderProfile[] = [
  {
    providerName: "Removery (Bucktown)",
    address: "1864 N Damen Ave",
    neighborhood: "Bucktown",
    staticMethod: "PicoWay (picosecond)",
  },
  {
    providerName: "Removery (Lincoln Square)",
    address: "4347 N Lincoln Ave",
    neighborhood: "Lincoln Square",
    staticMethod: "PicoWay (picosecond)",
  },
  {
    providerName: "Kovak Cosmetic Center",
    address: "850 S Wabash Ave",
    neighborhood: "South Loop",
    staticMethod: "Q-Switch",
  },
  {
    providerName: "Enfuse Medical Spa",
    address: "Chicago",
    neighborhood: "Chicago",
    staticMethod: "PicoWay (picosecond)",
  },
  {
    providerName: "Rejuvatek Aesthetics providing inkOUT",
    address: "2724 N Lincoln Ave Suite 6",
    neighborhood: "Lincoln Park",
    staticMethod: "TEPR (non-laser)",
  },
  {
    providerName: "LaserAway",
    address: "Lincoln Park / River North / Bucktown",
    neighborhood: "Multiple",
    staticMethod: "PicoSure (picosecond)",
  },
  {
    providerName: "Advanced Laser Aesthetics",
    address: "5906 N Milwaukee Ave",
    neighborhood: "Edgebrook",
    staticMethod: "Laser",
  },
];

export default function ChicagoPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Cities", href: "/cities" },
    { name: "Chicago", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Tattoo Removal in Chicago (2026): Clinics Compared & Reviewed",
    description:
      "Compare tattoo removal clinics in Chicago and the suburbs. See provider differences across method, reviews, and pricing before you book.",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: [
      "Tattoo removal Chicago",
      "Laser tattoo removal Chicago IL",
      "Best tattoo removal Chicago",
    ],
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
            <Link href="/cities" className="hover:text-(--ink) transition-colors">
              Cities
            </Link>
            <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
            <span className="text-(--muted) font-normal normal-case tracking-normal">Chicago</span>
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            Best Tattoo Removal{" "}
            <span className="text-(--accent)">in Chicago</span>
          </h1>

          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--muted) max-w-2xl">
            Compare tattoo removal clinics in Chicago and the suburbs. See provider differences
            across method, reviews, and pricing before you book.
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
                  Tattoo removal Chicago is a fragmented market. National chains, dedicated
                  removal specialists, aesthetic med spas, and a non-laser inkOUT location all
                  serve the city. Providers are spread across Bucktown, Lincoln Square, Lincoln
                  Park, Wicker Park, the South Loop, and the suburbs. The good news is choice.
                  The bad news is comparison fatigue.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  This page focuses on Chicago city locations where we have direct review
                  evidence. Suburban options like Removery in Naperville and Orland Park exist
                  and are good choices for users in those markets. The goal here is to help you
                  narrow down a shortlist before booking a consultation, not to push a single
                  winner for every situation.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  If you are still deciding between methods rather than providers, the{" "}
                  <Link href="/comparisons/best-tattoo-removal-method" className="text-(--accent) hover:underline">
                    best tattoo removal method comparison
                  </Link>{" "}
                  covers laser versus non-laser at a high level. For session counts, costs, and
                  visual expectations, see the{" "}
                  <Link href="/cost" className="text-(--accent) hover:underline">
                    cost guide
                  </Link>{" "}
                  and the{" "}
                  <Link href="/before-and-after" className="text-(--accent) hover:underline">
                    before-and-after gallery
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Dynamic ranking */}
            <GuideSection heading="Best Tattoo Removal Clinics in Chicago">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The ranked list below is generated from our review-sample analysis. Sentiment
                scores, sample sizes, and use-case wins reflect the most recent reviews captured
                in our internal review dataset. Lifetime Google review counts are higher than the
                sample sizes shown.
              </p>
              <Suspense fallback={
                <div className="rounded-xl border border-(--line) bg-(--surface) p-8 text-center">
                  <p className="font-sans text-[14px] text-(--muted) m-0">Loading provider data&hellip;</p>
                </div>
              }>
                <CityProviderRanking city="Chicago" staticProviders={CHICAGO_PROVIDERS} />
              </Suspense>
            </GuideSection>

            {/* Static editorial profiles */}
            <GuideSection heading="Chicago Provider Profiles">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                These profiles describe what each clinic is, where it is located, and the kinds
                of cases it handles. Current performance metrics and rankings appear in the
                section above and update as our scrape refreshes.
              </p>

              <div className="space-y-4">
                {[
                  {
                    name: "Removery (Bucktown)",
                    body: "Removery's Bucktown location is at 1864 N Damen Ave. Removery is a national tattoo-removal-only chain. The clinic uses Candela PicoWay, a picosecond laser that handles most ink colors. Removery offers a Complete Removal Package model that caps total cost regardless of session count.",
                    bestFor: [
                      "Users who want package pricing with unlimited sessions",
                      "Users planning complete removal",
                      "Users who prefer a national-chain experience with consistent protocols",
                    ],
                    lessIdealFor: [
                      "Users seeking an owner-operated studio",
                      "Users who specifically want non-laser options",
                    ],
                  },
                  {
                    name: "Removery (Lincoln Square)",
                    body: "Removery's Lincoln Square location is at 4347 N Lincoln Ave. Same chain, same PicoWay laser, same package pricing model as the Bucktown studio. The two locations operate independently for scheduling but share Removery's national protocols.",
                    bestFor: [
                      "Users in the North Side who prefer Lincoln Square over Bucktown",
                      "Users with cosmetic tattoo removal needs, including microblading cases",
                    ],
                    lessIdealFor: [
                      "Users who want a tattoo-removal-only specialist studio rather than a chain location",
                    ],
                  },
                  {
                    name: "Kovak Cosmetic Center (South Loop)",
                    body: "Kovak Cosmetic Center is at 850 S Wabash Ave in the South Loop. The clinic is an established med spa offering tattoo removal alongside other aesthetic services. Kovak uses Q-Switch laser technology, which is well-established for black and dark-blue ink.",
                    bestFor: [
                      "Users in the South Loop or Loop area who prefer a longer-established med spa",
                      "Users with straightforward black-ink tattoos",
                    ],
                    lessIdealFor: [
                      "Users with complex color tattoos that benefit from picosecond technology",
                    ],
                  },
                  {
                    name: "Enfuse Medical Spa",
                    body: "Enfuse Medical Spa is a Chicago med spa that offers tattoo removal alongside other aesthetic services. The clinic uses PicoWay, a picosecond laser system, and handles cosmetic and microblading cases alongside body tattoos.",
                    bestFor: [
                      "Users who want a med spa experience that handles cosmetic and microblading cases alongside body tattoos",
                    ],
                    lessIdealFor: [
                      "Users who specifically want a tattoo-removal-only specialist focus",
                    ],
                  },
                  {
                    name: "Rejuvatek Aesthetics providing inkOUT (Lincoln Park)",
                    body: "This is the Chicago corporate location for inkOUT, the non-laser tattoo removal brand operated by Rejuvatek Medical. The clinic is at 2724 N Lincoln Ave Suite 6 in Lincoln Park. inkOUT uses TEPR (Trans-Epidermal Pigment Release), a non-laser method that lifts ink out through the skin rather than shattering it with light. This is the only non-laser option in Chicago.",
                    bestFor: [
                      "Users who want a non-laser method",
                      "Users with cosmetic tattoos like microblading or lip blush",
                      "Users with darker skin tones who want to avoid laser pigment-change risk",
                      "Users seeking complete removal without laser-clearance limitations on certain ink colors",
                    ],
                    lessIdealFor: [
                      "Users with very large tattoos who prefer the per-session speed of laser",
                      "Users who want a deep public review history before committing",
                    ],
                  },
                  {
                    name: "LaserAway (Lincoln Park, River North, Bucktown)",
                    body: "LaserAway operates three Chicago locations: Lincoln Park (2032 N Halsted St), River North (666 N Wells St), and Bucktown (1953 W Wabansia Ave). LaserAway is a national aesthetic chain where tattoo removal is one service among many. The brand uses the PicoSure laser.",
                    bestFor: [
                      "Users who already use LaserAway for hair removal or other aesthetic services",
                      "Users who want extended evening and weekend hours",
                    ],
                    lessIdealFor: [
                      "Users seeking a tattoo-removal-only specialist",
                      "Users with complex color or cover-up cases that benefit from a specialist's narrower focus",
                    ],
                  },
                  {
                    name: "Advanced Laser Aesthetics (Edgebrook)",
                    body: "Advanced Laser Aesthetics is at 5906 N Milwaukee Ave on the city's far Northwest Side. It is a smaller clinic that handles tattoo removal alongside other laser services.",
                    bestFor: [
                      "Users on the Northwest Side or near Edgebrook who want a closer option than central Chicago specialists",
                    ],
                    lessIdealFor: [
                      "Users with complex multi-color cases, where higher-volume specialists may have more pattern-matched experience",
                    ],
                  },
                ].map((p) => (
                  <div key={p.name} className="rounded-xl border border-(--line) bg-(--surface) p-6">
                    <h3 className="font-sans font-bold text-[16px] text-(--ink) m-0 mb-3">{p.name}</h3>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) mb-4">{p.body}</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="font-sans text-[12px] font-semibold text-(--ink) mb-1.5">Best for</p>
                        <GuideBulletList items={p.bestFor} />
                      </div>
                      <div>
                        <p className="font-sans text-[12px] font-semibold text-(--ink) mb-1.5">Less ideal for</p>
                        <GuideBulletList variant="warning" items={p.lessIdealFor} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GuideSection>

            {/* Dynamic comparison table */}
            <GuideSection heading="Compare Chicago Tattoo Removal Providers">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The table below summarizes the best tattoo removal Chicago options at a glance.
                Use it for orientation, then read the profiles above for fit-based detail.
                Sample size shows the number of recent reviews analyzed for sentiment scoring.
                Total lifetime Google review counts are higher than sample sizes shown.
              </p>
              <Suspense fallback={
                <div className="rounded-xl border border-(--line) bg-(--surface) p-6 text-center">
                  <p className="font-sans text-[14px] text-(--muted) m-0">Loading comparison table&hellip;</p>
                </div>
              }>
                <CityProviderComparisonTable city="Chicago" staticProviders={CHICAGO_PROVIDERS} />
              </Suspense>
            </GuideSection>

            {/* Technology section */}
            <GuideSection heading="Laser Tattoo Removal Options in Chicago">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Laser tattoo removal Chicago providers run several different systems. The system
                matters because pulse width, available wavelengths, and provider experience
                together determine which ink colors and skin types respond best.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Picosecond systems",
                    body: "Both Removery locations use Candela PicoWay. Enfuse Medical Spa uses PicoWay. LaserAway uses PicoSure. Picosecond lasers deliver pulses in the trillionths-of-a-second range, shattering ink particles more efficiently than older nanosecond Q-switched lasers. Peer-reviewed studies show picosecond systems reduce session counts and side effects on stubborn colors like blue, green, and red.",
                  },
                  {
                    title: "Q-switched systems",
                    body: "Kovak Cosmetic Center uses Q-Switch laser technology. Q-switched lasers remain effective and were the original gold standard for tattoo removal. They work particularly well on black and dark-blue ink. They typically need more sessions than picosecond systems for the same color range, but they have a longer track record and are widely available.",
                  },
                  {
                    title: "Wavelengths",
                    body: "Most modern systems offer 1064 nm and 532 nm at minimum, covering black, dark blue, red, and orange. Picosecond systems often add 755 nm or 785 nm, which improve clearance on green and light blue. If your tattoo includes green, teal, yellow, or white, ask your provider which wavelengths their machine offers.",
                  },
                  {
                    title: "Non-laser (TEPR)",
                    body: "inkOUT uses TEPR, a non-laser method that avoids wavelength-versus-color limitations entirely. It lifts ink physically through the skin rather than shattering it with light. This is a different category of treatment, not a laser variant.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-(--surface) p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">{item.body}</p>
                  </div>
                ))}
              </div>
            </GuideSection>

            {/* Pricing section */}
            <GuideSection heading="How Much Does Tattoo Removal Cost in Chicago?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Tattoo removal cost Chicago providers charge generally runs $150 to $500 per
                session. Most cases land in the $200 to $400 range. The big variables are
                tattoo size, ink density, and the provider&rsquo;s pricing model.
              </p>

              <div className="space-y-3">
                {[
                  { label: "Small (postage stamp to poker chip)", price: "$150 – $250 per session" },
                  { label: "Medium (business card to palm)", price: "$250 – $400 per session" },
                  { label: "Large (postcard to half-sleeve+)", price: "$400 – $600+ per session" },
                ].map((tier) => (
                  <div
                    key={tier.label}
                    className="flex items-center justify-between rounded-xl border border-(--line) bg-(--surface) px-5 py-4"
                  >
                    <p className="font-sans text-[14px] text-(--muted) m-0">{tier.label}</p>
                    <p className="font-sans text-[14px] font-semibold text-(--ink) m-0 ml-4 shrink-0">{tier.price}</p>
                  </div>
                ))}
              </div>

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Most tattoos need three to twelve sessions for complete removal, putting total
                full-removal cost for a standard Chicago tattoo typically between $1,000 and
                $5,000. Package pricing (Removery&rsquo;s Complete Removal Package) caps that total.
                LaserAway frequently offers Groupon-style promotional bundles. Removery has run
                Black Friday discount programs in past years. Cheap tattoo removal Chicago options
                usually come from these promotional windows rather than from base per-session
                pricing.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                For a national pricing breakdown by method and size, see the{" "}
                <Link href="/cost" className="text-(--accent) hover:underline">
                  cost guide
                </Link>
                .
              </p>
            </GuideSection>

            {/* Ranking methodology */}
            <GuideSection heading="How We Ranked Chicago Tattoo Removal Clinics">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The ranked list above is generated from a structured analysis of the most recent
                public reviews per provider. We weighted six factors:
              </p>
              <GuideBulletList
                items={[
                  "Review sample size and sentiment. Larger samples carry more weight. Sentiment comes from review text classification, not from star averages alone.",
                  "Use-case fit signals. Reviews are tagged for use case (Complete removal, Cover-up fading, Microblading, Color). Providers showing repeated positive outcomes in a specific use case get credit for that fit.",
                  "Method specialization. Tattoo-removal-only specialists generally outperform med spas where tattoo removal is one of many services.",
                  "Technology fit for the case. Picosecond systems suit difficult colors and stubborn ink. Q-Switch suits standard black work. TEPR suits cosmetic tattoos and users avoiding laser entirely.",
                  "Pricing transparency. Providers with published pricing rank above those that withhold it until consultation.",
                  "Honest fit framing. No provider wins for every user. Each profile includes both a best-for and a less-ideal-for section.",
                ]}
              />
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                For the full review and ranking framework used across the site, see the{" "}
                <Link href="/methodology" className="text-(--accent) hover:underline">
                  methodology page
                </Link>
                .
              </p>
            </GuideSection>

            {/* Editorial note */}
            <div className="py-12">
              <GuideCallout label="Editorial note">
                Provider review samples reflect recent reviews scraped from public Google
                business listings into our internal review dataset. The ranked list and comparison
                table above are generated dynamically from this dataset and refresh as new reviews
                are scraped. Sample sizes are capped at 50 per provider; total lifetime Google
                review counts are higher. Sentiment classifications and use-case tags are derived
                from review text analysis. Pricing ranges reflect published Chicago provider rates
                where public. inkOUT is a current advertising client of RealTattooReviews and is
                operated by Rejuvatek Medical; this relationship is disclosed on the{" "}
                <Link href="/editorial-policy" className="text-(--accent) hover:underline">
                  editorial policy page
                </Link>{" "}
                and inkOUT is evaluated on the same criteria as every other provider. Consult a
                qualified provider before proceeding. See our{" "}
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
                  href: "/comparisons/best-tattoo-removal-method",
                  title: "Best Tattoo Removal Method",
                  desc: "Side-by-side comparison of laser, non-laser, and other methods by effectiveness, cost, and risk.",
                },
                {
                  href: "/cost",
                  title: "Tattoo Removal Cost",
                  desc: "National pricing breakdown by method, size, and provider type.",
                },
                {
                  href: "/before-and-after",
                  title: "Before & After Gallery",
                  desc: "Visual outcomes across methods, skin types, and tattoo sizes.",
                },
                {
                  href: "/methodology",
                  title: "Methodology",
                  desc: "How we collect, classify, and rank provider reviews.",
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
                <p className="text-[13px] leading-relaxed text-(--muted) m-0">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
