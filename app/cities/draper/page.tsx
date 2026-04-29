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
 * inkOUT in Draper appears under both bucket='inkout' and bucket='tatt2away' for the same
 * place_id (historical brand-classification phases). getCityProviderAggregates must aggregate
 * inkOUT rows by place_id BEFORE ranking, not by bucket alone. The two bucket values represent
 * the same physical Draper location.
 *
 * CLARITY SKIN NOTE:
 * Clarity Skin is a full-service med spa. Many of their Google reviews cover filler, botox,
 * facials, and other non-tattoo-removal services. The component should only count reviews
 * where is_tattoo_removal IS TRUE or where review text clearly references tattoo removal.
 *
 * LIFETIME VS SAMPLE COUNT:
 * scrape_sample_size is capped at 50 per provider in the current scrape. Lifetime Google
 * review counts are higher. Display "X of last Y reviews positive" language and include
 * a footer note explaining the sample cap.
 *
 * LAST_REVIEWED stamp:
 * At the bottom of Component 1 and Component 2, render: "Data refreshed: <timestamp>"
 * where timestamp is MAX(created_at) across the rows queried for this city.
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
import GuideFAQSection from "@/components/guide/GuideFAQSection";
import CityProviderRanking from "@/components/city/CityProviderRanking";
import CityProviderComparisonTable from "@/components/city/CityProviderComparisonTable";
import type { StaticProviderProfile } from "@/components/city/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Best Tattoo Removal in Draper, UT (2026): Clinics Compared & Reviewed | RealTattooReviews",
  description:
    "Compare tattoo removal clinics in Draper, Utah. See provider differences across method, reviews, and pricing before you book.",
  alternates: {
    canonical: "https://realtattooreviews.com/cities/draper",
  },
  openGraph: {
    title: "Best Tattoo Removal in Draper, UT (2026): Clinics Compared & Reviewed",
    description:
      "Compare tattoo removal clinics in Draper, Utah. See provider differences across method, reviews, and pricing before you book.",
  },
};

const faqs = [
  {
    question: "What is the best tattoo removal clinic in Draper?",
    answer:
      "It depends on your tattoo and your priorities. The ranked list above orders providers by current review-sample evidence and use-case fit. inkOUT (Rejuvatek Aesthetics) is the only non-laser option and serves users prioritizing complete removal or avoiding laser. Clarity Skin offers PicoWay picosecond laser in a full med spa setting. Match the provider to your case.",
  },
  {
    question: "How much does tattoo removal cost in Draper?",
    answer:
      "Per-session pricing in Draper generally runs $100 to $400. Total full-removal cost for a standard tattoo typically falls between $1,000 and $5,000 depending on size, ink density, and session count.",
  },
  {
    question: "Are there non-laser tattoo removal options in Draper?",
    answer:
      "Yes. inkOUT, operated by Rejuvatek Aesthetics, is the only non-laser tattoo removal option in the Draper and south Salt Lake Valley area. inkOUT uses TEPR, which lifts ink through the skin surface rather than using laser energy.",
  },
  {
    question: "What laser does Clarity Skin use for tattoo removal?",
    answer:
      "Clarity Skin uses Candela PicoWay, a picosecond laser system with multiple wavelengths that handles most ink colors and skin types.",
  },
  {
    question: "How many sessions does tattoo removal take?",
    answer:
      "Most tattoos need three to twelve sessions for complete removal. Three to eight sessions is typical for cover-up fading. Sessions are spaced six to eight weeks apart. The actual count depends on ink color, density, depth, your skin type, and your provider's technology.",
  },
  {
    question: "Does tattoo removal hurt?",
    answer:
      "Most users describe laser tattoo removal as similar to a thick rubber band snapping against the skin. Sessions for small tattoos last under 10 minutes. TEPR (non-laser, used by inkOUT) feels different and is usually described as moderate, similar to a tattoo session.",
  },
  {
    question: "Do Draper tattoo removal clinics offer free consultations?",
    answer:
      "Both inkOUT (Rejuvatek Aesthetics) and Clarity Skin offer consultations. They assess the tattoo, estimate sessions, and quote pricing before you commit. Confirm consultation availability when you book.",
  },
];

const PAGE_PATH = "/cities/draper";
const SITE_URL = "https://realtattooreviews.com";

const DRAPER_PROVIDERS: StaticProviderProfile[] = [
  {
    providerName: "Rejuvatek Aesthetics providing inkOUT",
    address: "Draper, UT",
    neighborhood: "Draper",
    staticMethod: "TEPR (non-laser)",
  },
  {
    providerName: "Clarity Skin",
    address: "Draper, UT",
    neighborhood: "Draper",
    staticMethod: "PicoWay (picosecond)",
  },
];

export default function DraperPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Cities", href: "/cities" },
    { name: "Draper", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Tattoo Removal in Draper, UT (2026): Clinics Compared & Reviewed",
    description:
      "Compare tattoo removal clinics in Draper, Utah. See provider differences across method, reviews, and pricing before you book.",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: [
      "Tattoo removal Draper",
      "Laser tattoo removal Draper UT",
      "Best tattoo removal Draper Utah",
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
            <span className="text-(--muted) font-normal normal-case tracking-normal">Draper</span>
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            Best Tattoo Removal{" "}
            <span className="text-(--accent)">in Draper</span>
          </h1>

          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--muted) max-w-2xl">
            Compare tattoo removal clinics in Draper, Utah. See provider differences across method,
            reviews, and pricing before you book.
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
                  Draper is a smaller tattoo removal market than Austin or Houston, but it has a
                  meaningful choice that most Utah users do not realize exists. Two providers serve
                  the area with fundamentally different methods: a full-service med spa offering
                  picosecond laser removal and a dedicated non-laser inkOUT location using TEPR.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  This page compares the providers that handle tattoo removal in Draper. It covers
                  what technology each uses, where they are located, and which kinds of cases each
                  handles best. The goal is to help you decide which provider fits your tattoo,
                  your skin, and your priorities before booking a consultation.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  If you are still deciding between methods rather than providers, the{" "}
                  <Link
                    href="/comparisons/best-tattoo-removal-method"
                    className="text-(--accent) hover:underline"
                  >
                    best tattoo removal method comparison
                  </Link>{" "}
                  covers laser versus non-laser at a high level. For session counts, costs, and
                  visual expectations across all methods, see the{" "}
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
            <GuideSection heading="Best Tattoo Removal Clinics in Draper">
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
                <CityProviderRanking city="Draper" staticProviders={DRAPER_PROVIDERS} />
              </Suspense>
            </GuideSection>

            {/* Static editorial profiles */}
            <GuideSection heading="Draper Provider Profiles">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                These profiles describe what each clinic is, where it is located, and the kinds of
                cases it handles. Current performance metrics, rankings, and review breakdowns
                appear in the section above and update as our scrape refreshes.
              </p>

              <div className="space-y-4">
                {[
                  {
                    name: "Rejuvatek Aesthetics providing inkOUT (Draper)",
                    body: "This is the Draper corporate location for inkOUT, the non-laser tattoo removal brand operated by Rejuvatek Medical. inkOUT uses TEPR (Trans-Epidermal Pigment Release), a non-laser method that lifts ink out through the skin surface rather than shattering it with laser pulses. This is the only non-laser tattoo removal option in the Draper and greater Salt Lake City south valley area.",
                    bestFor: [
                      "Users seeking complete removal rather than fading",
                      "Users who want a non-laser method",
                      "Users with cosmetic tattoos like microblading or lip blush",
                      "Users with darker skin tones who want to avoid laser pigment-change risk",
                      "Users seeking removal without the typical laser-clearance limitations on certain ink colors",
                    ],
                    lessIdealFor: [
                      "Users with very large tattoos who prefer the per-session speed of laser",
                      "Users who want a multi-service med spa experience alongside their removal",
                    ],
                  },
                  {
                    name: "Clarity Skin (Draper)",
                    body: "Clarity Skin is a full-service medical spa in Draper that offers tattoo removal alongside cosmetic injectables, laser hair removal, facials, and other aesthetic services. Tattoo removal is performed using PicoWay, a picosecond laser that handles most ink colors and skin types. The clinic has a large overall review base, though many reviews cover services other than tattoo removal.",
                    bestFor: [
                      "Users who want tattoo removal in a full med spa setting",
                      "Users who already visit Clarity Skin for other services and want to add removal at the same provider",
                      "Users with straightforward black or dark-blue tattoos that respond well to picosecond laser",
                    ],
                    lessIdealFor: [
                      "Users seeking a tattoo-removal-only specialist focus",
                      "Users who specifically want a non-laser option",
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
            <GuideSection heading="Compare Draper Tattoo Removal Providers">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The table below summarizes the Draper options at a glance. Use it for orientation,
                then read the profiles above for fit-based detail. Sample size shows the number of
                recent reviews analyzed for sentiment scoring. Total lifetime Google review counts
                are higher than sample sizes shown.
              </p>
              <Suspense fallback={
                <div className="rounded-xl border border-(--line) bg-(--surface) p-6 text-center">
                  <p className="font-sans text-[14px] text-(--muted) m-0">Loading comparison table&hellip;</p>
                </div>
              }>
                <CityProviderComparisonTable city="Draper" staticProviders={DRAPER_PROVIDERS} />
              </Suspense>
            </GuideSection>

            {/* Technology section */}
            <GuideSection heading="Laser and Non-Laser Options in Draper">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Draper offers both laser and non-laser tattoo removal, which is unusual for a
                market this size.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Picosecond laser",
                    body: "Clarity Skin uses Candela PicoWay, a picosecond system that delivers pulses in the trillionths-of-a-second range. It shatters ink particles more efficiently than older nanosecond Q-switched lasers. PicoWay handles most ink colors with its multiple wavelengths including 1064 nm, 532 nm, and 785 nm.",
                  },
                  {
                    title: "Non-laser TEPR",
                    body: "inkOUT uses TEPR, a non-laser method that lifts ink physically through the skin rather than shattering it with light. This avoids the wavelength-versus-color limitations that lasers face and avoids the wavelength-versus-melanin interaction that raises risk on darker skin tones.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-(--surface) p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">{item.body}</p>
                  </div>
                ))}
              </div>

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                If your tattoo includes hard-to-clear colors like green, teal, or white, ask your
                provider which wavelengths their machine offers (for laser) or how TEPR handles
                those pigments differently.
              </p>
            </GuideSection>

            {/* Pricing section */}
            <GuideSection heading="How Much Does Tattoo Removal Cost in Draper?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Tattoo removal in Draper generally runs $100 to $400 per session for most cases.
                The main variables are tattoo size, ink density, and the provider's pricing model.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Most tattoos need three to twelve sessions for complete removal. Three to eight
                sessions is typical for cover-up fading. Total cost for a standard tattoo typically
                falls between $1,000 and $5,000.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Per-session pricing suits users who want flexibility. Package pricing caps total
                cost regardless of session count. Ask each provider about their pricing structure,
                payment plans, and any package options at the consultation.
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
            <GuideSection heading="How We Ranked Draper Tattoo Removal Clinics">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The ranked list above is generated from a structured analysis of the most recent
                public reviews per provider. We weighted six factors:
              </p>
              <GuideBulletList
                items={[
                  "Review sample size and sentiment. Larger samples carry more weight. Sentiment comes from review text classification across the most recent reviews per provider, not from star averages alone.",
                  "Use-case fit signals. Reviews are tagged for use case (Complete removal, Cover-up fading, Microblading, Color, Other). Providers showing repeated positive outcomes in a specific use case get credit for that fit.",
                  "Method specialization. Tattoo-removal-only specialists generally outperform med spas where tattoo removal is one of many services. The gap is widest on complex or color-heavy cases.",
                  "Technology fit for the case. Picosecond systems suit difficult colors and stubborn ink. TEPR (non-laser) suits cosmetic tattoos and users avoiding laser entirely.",
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
                Provider review samples reflect recent reviews scraped from public Google business
                listings. Rankings refresh as new reviews are scraped. See our{" "}
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

      <GuideFAQSection faqs={faqs} />
    </div>
  );
}
