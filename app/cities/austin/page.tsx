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
 * inkOUT in Austin appears under both bucket='inkout' and bucket='tatt2away' for the same
 * place_id (historical brand-classification phases). getCityProviderAggregates aggregates
 * by provider_name and tracks isInkout=true when any row has bucket='inkout'.
 *
 * PROVIDERS WITHOUT SUPABASE DATA YET:
 * UNBRANDED Austin, Pigment, Think Again, Austin Laser Solutions: real Austin providers
 * with strong Google ratings but no rows in competitor_reviews yet. CityProviderRanking
 * renders them with a "Review sample pending" notice. Static prose mentions them by name
 * for SEO content preservation.
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
  title: "Best Tattoo Removal in Austin (2026): Clinics Compared & Reviewed | RealTattooReviews",
  description:
    "Compare tattoo removal clinics in Austin, explore reviews and provider differences, and see which local options are worth considering before you book.",
  alternates: {
    canonical: "https://realtattooreviews.com/cities/austin",
  },
  openGraph: {
    title: "Best Tattoo Removal in Austin (2026): Clinics Compared & Reviewed",
    description:
      "Compare tattoo removal clinics in Austin, explore reviews and provider differences, and see which local options are worth considering before you book.",
  },
};

const faqs = [
  {
    question: "What is the best tattoo removal clinic in Austin?",
    answer:
      "There is no single best clinic for every user. The ranked list above orders providers by current review-sample evidence and use-case fit. Removery offers the strongest national-chain package model. Think Again is a tattoo-removal-only specialist with picosecond technology. inkOUT (Rejuvatek Aesthetics on Hwy 71) is the only non-laser option. MEDermis is the longest-established Texas operator. Match the provider to your tattoo, budget, and method preference.",
  },
  {
    question: "How much does tattoo removal cost in Austin?",
    answer:
      "Per-session pricing in Austin runs $90 to $500. Most cases land in the $150 to $400 range. Total full-removal cost for a standard tattoo typically falls between $1,000 and $5,000. Package pricing models cap that total at a guaranteed price.",
  },
  {
    question: "Which tattoo removal clinics in Austin have the best reviews?",
    answer:
      "The ranked list above sorts by current review-sample sentiment. Lifetime Google review counts are higher than the sample sizes shown and are visible on each provider's Google business listing.",
  },
  {
    question: "Where can I get tattoo removal in Austin?",
    answer:
      "Providers serve every corner of the metro. South Congress hosts Removery and Think Again. South Austin hosts MEDermis on Dickson Drive. North Austin hosts UNBRANDED and Pigment. Round Rock hosts Removery and Clean Slate Ink. West Austin hosts inkOUT/Rejuvatek. Bee Cave hosts Austin Laser Solutions. Choose by proximity once you have narrowed by method and provider fit.",
  },
  {
    question: "What laser tattoo removal options are available in Austin?",
    answer:
      "Picosecond options include Candela PicoWay (Removery) and Quanta Discovery Pico Plus (Think Again). Q-switched options include MEDermis's Spectra system. Other Austin clinics use a range of size-tier laser systems. inkOUT (Rejuvatek) is the only non-laser TEPR option in the metro.",
  },
  {
    question: "Does tattoo removal hurt?",
    answer:
      "Most users describe laser tattoo removal as similar to a thick rubber band snapping against the skin. The sensation repeats for the duration of the treatment area. Sessions for small tattoos last under 10 minutes. Most Austin providers use cooling devices or ice packs before and after to reduce discomfort. TEPR (non-laser) feels different and is usually described as moderate, similar to a tattoo session.",
  },
  {
    question: "How many sessions does tattoo removal take in Austin?",
    answer:
      "Most tattoos need three to twelve sessions for complete removal. Three to eight sessions is typical for cover-up fading. Sessions are spaced six to eight weeks apart. The actual count depends on ink color, density, depth, your skin type, and your provider's technology.",
  },
  {
    question: "Do Austin clinics offer free consultations?",
    answer:
      "Most do. Removery, UNBRANDED, Think Again, MEDermis, Pigment, and inkOUT (Rejuvatek) all offer no-cost consultations. They assess the tattoo, estimate sessions, and quote pricing before commitment.",
  },
  {
    question: "Are there non-laser tattoo removal options in Austin?",
    answer:
      "Yes. inkOUT, operated by Rejuvatek Aesthetics at 7101 State Hwy 71, is the corporate Austin location for non-laser TEPR removal. This is the only non-laser tattoo removal option in the Austin metro at the time of writing.",
  },
];

const PAGE_PATH = "/cities/austin";
const SITE_URL = "https://realtattooreviews.com";

// All Austin providers. Order determines display order in table for pending providers.
const AUSTIN_PROVIDERS: StaticProviderProfile[] = [
  {
    providerName: "MEDermis Laser Clinic",
    address: "2111 Dickson Dr",
    neighborhood: "South Austin",
    staticMethod: "Spectra (Q-switched)",
  },
  {
    providerName: "Removery (South Congress)",
    address: "1400 S Congress Ave",
    neighborhood: "South Congress",
    staticMethod: "PicoWay (picosecond)",
  },
  {
    providerName: "Rejuvatek Aesthetics providing inkOUT",
    address: "7101 State Hwy 71",
    neighborhood: "West Austin",
    staticMethod: "TEPR (non-laser)",
  },
  {
    providerName: "Clean Slate Ink",
    address: "600 Round Rock W Dr",
    neighborhood: "Round Rock",
    staticMethod: "Laser",
  },
  {
    providerName: "UNBRANDED Austin",
    address: "5511 Parkcrest Dr",
    neighborhood: "North Austin",
    staticMethod: "Laser",
  },
  {
    providerName: "Pigment Tattoo & Laser Removal",
    address: "Ranch Road 620",
    neighborhood: "North Austin",
    staticMethod: "Laser",
  },
  {
    providerName: "Think Again Tattoo Removal",
    address: "3801 S Congress Ave",
    neighborhood: "South Austin",
    staticMethod: "Quanta Discovery Pico Plus (picosecond)",
  },
  {
    providerName: "Austin Laser Solutions",
    address: "12700 Hill Country Blvd",
    neighborhood: "Bee Cave",
    staticMethod: "Laser",
  },
];

export default function AustinPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Cities", href: "/cities" },
    { name: "Austin", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Tattoo Removal in Austin (2026): Clinics Compared & Reviewed",
    description:
      "Compare tattoo removal clinics in Austin, explore reviews and provider differences, and see which local options are worth considering before you book.",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: [
      "Tattoo removal Austin",
      "Laser tattoo removal Austin TX",
      "Best tattoo removal Austin",
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
            <span className="text-(--muted) font-normal normal-case tracking-normal">Austin</span>
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            Best Tattoo Removal{" "}
            <span className="text-(--accent)">in Austin</span>
          </h1>

          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--muted) max-w-2xl">
            Compare tattoo removal clinics in Austin, explore reviews and provider differences,
            and see which local options are worth considering before you book.
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
                  Tattoo removal Austin TX has more good options than most Texas cities of
                  comparable size. Specialist laser studios, dermatology practices, med spas, and
                  a non-laser inkOUT location all serve the metro. Providers are spread across
                  South Congress, downtown, North Austin, Round Rock, Cedar Park, and the Bee Cave
                  area.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  This page compares the providers that actually treat tattoos in Austin. It
                  covers what laser technology each provider uses, where they are located, and
                  which kinds of cases each is best suited to handle. The goal is to help you
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
            <GuideSection heading="Best Tattoo Removal Clinics in Austin">
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
                <CityProviderRanking city="Austin" staticProviders={AUSTIN_PROVIDERS} />
              </Suspense>
            </GuideSection>

            {/* Static editorial profiles */}
            <GuideSection heading="Austin Provider Profiles">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                These profiles describe what each clinic is, where it is located, and the kinds
                of cases it handles. Current performance metrics and rankings appear in the
                section above and update as our scrape refreshes.
              </p>

              <div className="space-y-4">
                {[
                  {
                    name: "MEDermis Laser Clinic (South Austin)",
                    body: "MEDermis Laser Clinic is at 2111 Dickson Dr in South Austin. The clinic has been in the Austin and San Antonio market since 2006, making it one of the longest-established tattoo removal operations in the metro. MEDermis uses a Spectra Q-switched Nd:YAG laser system and reports a 98% ink clearance rate across more than 300,000 treatments. The clinic offers a session guarantee that continues treatment at no additional cost for one year if a tattoo requires more than 10 sessions to clear, with limitations on green and blue tattoos.",
                    bestFor: [
                      "Users who want a long-established Texas operator with a session guarantee",
                      "Users with straightforward black or dark-blue tattoos",
                    ],
                    lessIdealFor: [
                      "Users with heavily colored tattoos in green or blue, where the guarantee does not apply",
                    ],
                  },
                  {
                    name: "Removery (South Congress)",
                    body: "Removery's South Congress location is at 1400 S Congress Ave. Removery is a national tattoo-removal-only chain that uses Candela PicoWay, a picosecond laser that handles most ink colors and skin types. Removery offers a Complete Removal Package model that caps the total cost regardless of session count. The brand also operates a Round Rock location at 2541 N IH-35 with similar service.",
                    bestFor: [
                      "Users who want package pricing with unlimited sessions",
                      "Users planning to relocate or travel during their removal series",
                      "Users who prefer a national-chain experience with consistent protocols",
                    ],
                    lessIdealFor: [
                      "Users seeking a smaller, owner-operated studio",
                      "Users who specifically want non-laser options",
                    ],
                  },
                  {
                    name: "Rejuvatek Aesthetics providing inkOUT (West Austin)",
                    body: "This is the Austin corporate location for inkOUT, the non-laser tattoo removal brand operated by Rejuvatek Medical. The clinic is at 7101 State Hwy 71 in West Austin. inkOUT uses TEPR (Trans-Epidermal Pigment Release), a non-laser method that lifts ink out through the skin surface rather than shattering it with laser pulses. This is the only non-laser option in the Austin metro.",
                    bestFor: [
                      "Users who want a non-laser method",
                      "Users with cosmetic tattoos like microblading or lip blush",
                      "Users with concerns about laser interaction with darker skin tones",
                      "Users seeking complete removal without typical laser-clearance limitations on certain ink colors",
                    ],
                    lessIdealFor: [
                      "Users with very large tattoos who prefer the per-session speed of laser",
                      "Users who are price-sensitive on a single small tattoo",
                    ],
                  },
                  {
                    name: "Clean Slate Ink (Round Rock)",
                    body: "Clean Slate Ink is in Round Rock at 600 Round Rock W Dr. The clinic offers both tattoo removal and other laser services, with an established lifetime review base in the North Austin suburbs.",
                    bestFor: [
                      "Users in Round Rock or North Austin suburbs who want a closer option than central Austin specialists",
                    ],
                    lessIdealFor: [
                      "Users seeking a tattoo-removal-only specialist focus",
                    ],
                  },
                  {
                    name: "UNBRANDED Austin (North Austin)",
                    body: "UNBRANDED is an owner-operated specialist studio in North Austin at 5511 Parkcrest Dr, near Mopac and 2222. Founder Alan personally performs treatments. Pricing is size-based and the clinic offers free consultations.",
                    bestFor: [
                      "Users who want a single experienced provider across their entire treatment series",
                      "Users with complex or sensitive cases",
                      "Users prioritizing scarring-risk minimization",
                    ],
                    lessIdealFor: [
                      "Users who need extended evening or weekend hours",
                    ],
                  },
                  {
                    name: "Pigment Tattoo & Laser Removal (North Austin)",
                    body: "Pigment is a combined tattoo studio and laser removal clinic on Ranch Road 620 in North Austin. The location handles both ends of the cover-up workflow. Laser fading happens on one side; cover-up tattoo work on the other. Pricing is published in size brackets, ranging from about $150 for postage-stamp-sized tattoos to $500 to $600 for half-sleeve outer-arm work.",
                    bestFor: [
                      "Users planning a cover-up who want fading and the new tattoo coordinated under one roof",
                      "Users who want transparent published pricing before consultation",
                    ],
                    lessIdealFor: [
                      "Users who specifically want a laser-only specialist with no tattooing services",
                    ],
                  },
                  {
                    name: "Think Again Tattoo Removal (South Austin)",
                    body: "Think Again is a tattoo-removal-only specialist on South Congress at 3801 S Congress. The clinic uses the Quanta Discovery Pico Plus, an FDA-cleared picosecond system. Think Again offers a Complete Care Commitment package model, with per-session pricing starting around $90 for very small tattoos.",
                    bestFor: [
                      "Users who want a tattoo-removal-only specialist",
                      "Users with stubborn blue or green ink that benefits from picosecond technology",
                      "Users who want a clear package guarantee",
                    ],
                    lessIdealFor: [
                      "Users who prefer a Texas-headquartered company with a longer local history",
                    ],
                  },
                  {
                    name: "Austin Laser Solutions (Bee Cave)",
                    body: "Austin Laser Solutions is in the Hill Country Galleria area at 12700 Hill Country Blvd. The clinic offers both tattoo removal and hair removal and runs periodic promotional pricing.",
                    bestFor: [
                      "Users in Bee Cave, Lakeway, or Westlake who want a closer option than central Austin specialists",
                    ],
                    lessIdealFor: [
                      "Users seeking the largest sample size of public reviews to evaluate against",
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
            <GuideSection heading="Compare Austin Tattoo Removal Providers">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The table below summarizes the best tattoo removal Austin options at a glance.
                Use it for orientation, then read the profiles above for fit-based detail. Sample
                size shows the number of recent reviews analyzed for sentiment scoring. Total
                lifetime Google review counts are higher than sample sizes shown.
              </p>
              <Suspense fallback={
                <div className="rounded-xl border border-(--line) bg-(--surface) p-6 text-center">
                  <p className="font-sans text-[14px] text-(--muted) m-0">Loading comparison table&hellip;</p>
                </div>
              }>
                <CityProviderComparisonTable city="Austin" staticProviders={AUSTIN_PROVIDERS} />
              </Suspense>
            </GuideSection>

            {/* Technology section */}
            <GuideSection heading="Laser Tattoo Removal Options in Austin">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Austin laser tattoo removal providers run several different systems. The system
                matters because pulse width, available wavelengths, and provider experience
                together determine which ink colors and skin types respond best.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Picosecond systems",
                    body: "Removery uses Candela PicoWay. Think Again uses Quanta Discovery Pico Plus. Picosecond lasers deliver pulses in the trillionths-of-a-second range, shattering ink particles more efficiently than older nanosecond Q-switched lasers. Peer-reviewed studies show picosecond systems reduce session counts and side effects on stubborn colors like blue, green, and red.",
                  },
                  {
                    title: "Spectra and Q-switched systems",
                    body: "MEDermis uses a Spectra laser, a Q-switched Nd:YAG system. Q-switched lasers remain effective and are the original gold standard for tattoo removal. They work particularly well on black and dark-blue ink. Experienced Q-switched operators can match or beat newer picosecond systems on standard cases.",
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
            <GuideSection heading="How Much Does Tattoo Removal Cost in Austin?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Tattoo removal Austin pricing generally runs $90 to $500 per session. Most
                standard cases fall in the $150 to $400 range. The big variables are tattoo size,
                ink density, and the provider&rsquo;s pricing model.
              </p>

              <div className="space-y-3">
                {[
                  { label: "Small (postage stamp to poker chip)", price: "$90 to $250 per session" },
                  { label: "Medium (business card to palm)", price: "$275 to $400 per session" },
                  { label: "Large (postcard to half-sleeve+)", price: "$400 to $600+ per session" },
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
                full-removal cost for a standard tattoo in Austin typically between $1,000 and
                $5,000. Package pricing (Removery&rsquo;s Complete Removal Package, Think Again&rsquo;s
                Complete Care Commitment, MEDermis&rsquo;s session guarantee) caps that total.
                Pay-per-session is usually cheaper if you finish in fewer sessions. Packages are
                usually cheaper if you need the average number or more.
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
            <GuideSection heading="How We Ranked Austin Tattoo Removal Clinics">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The ranked list above is generated from a structured analysis of the most recent
                public reviews per provider. We weighted six factors:
              </p>
              <GuideBulletList
                items={[
                  "Review sample size and sentiment. Larger samples carry more weight. Sentiment comes from review text classification, not from star averages alone.",
                  "Use-case fit signals. Reviews are tagged for use case (Complete removal, Cover-up fading, Microblading, Color). Providers showing repeated positive outcomes in a specific use case get credit for that fit.",
                  "Method specialization. Tattoo-removal-only specialists generally outperform med spas where tattoo removal is one of many services.",
                  "Technology fit for the case. Picosecond systems suit difficult colors and stubborn ink. Q-switched suits standard black work. TEPR suits cosmetic tattoos and users avoiding laser entirely.",
                  "Pricing transparency. Providers with published pricing rank above those that withhold it until consultation.",
                  "Honest fit framing. No provider wins for every user. Each profile above includes both a best-for and a less-ideal-for section.",
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
                from review text analysis. Pricing ranges reflect published Austin provider rates
                where public. Consult a qualified provider before proceeding. See our{" "}
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
