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
 * inkOUT in Draper may have historical rows under bucket='tatt2away' for the same place_id.
 * getCityProviderAggregates merges rows by place_id, so these are combined automatically.
 * The tatt2away bucket is excluded from all public queries — only bucket='inkout' rows
 * reach the component.
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
      "It depends on your tattoo and your priorities. The ranked list above orders providers by current review-sample evidence and use-case fit. inkOUT (Rejuvatek Aesthetics) is the only non-laser option and suits users prioritizing complete removal, cosmetic tattoo removal, or avoiding laser entirely. Clarity Skin is a full-service med spa offering PicoWay picosecond laser in a physician-led setting and suits users who want an established medical practice with a broad aesthetic service menu. Match the provider to your case.",
  },
  {
    question: "What is the difference between inkOUT and Clarity Skin for tattoo removal?",
    answer:
      "The core difference is method. inkOUT uses TEPR (Trans-Epidermal Pigment Release), a non-laser technique that lifts ink through the skin surface without using laser energy. It avoids the wavelength-versus-color limitations that affect laser systems and avoids the wavelength-versus-melanin risk that elevates scarring concern on darker skin tones. Clarity Skin uses Candela PicoWay, a picosecond laser that is effective across most ink colors and skin types. Laser is faster per session for large tattoos. TEPR is the better fit for cosmetic tattoos, darker skin tones, and users who want to avoid laser-based treatment entirely. Both offer consultations — book one at each to compare quoted timelines and pricing before committing.",
  },
  {
    question: "How much does tattoo removal cost in Draper?",
    answer:
      "Per-session pricing in Draper generally runs $100 to $400. Small tattoos (postage stamp to poker chip) typically fall in the $100 to $200 range. Medium cases (business card to palm) run $200 to $350. Larger tattoos can exceed $400 per session. Total full-removal cost for a standard tattoo typically falls between $1,000 and $4,000 depending on size, ink density, and session count. Both inkOUT and Clarity Skin offer consultations where they will quote your specific case.",
  },
  {
    question: "Are there non-laser tattoo removal options in Draper?",
    answer:
      "Yes. inkOUT, operated by Rejuvatek Aesthetics, is the only non-laser tattoo removal option tracked by RealTattooReviews in the Draper and south Salt Lake Valley area. inkOUT uses TEPR, which lifts ink through the skin surface rather than using laser energy.",
  },
  {
    question: "Is there a Removery near Draper?",
    answer:
      "Removery does not currently operate a location in Draper or the immediate south Salt Lake Valley area based on our tracking. The closest national tattoo removal chain locations are in Salt Lake City proper. If chain pricing and unlimited-session package models are priorities, it is worth checking Removery's current location finder for the Salt Lake City metro, as chain footprints expand regularly.",
  },
  {
    question: "What laser does Clarity Skin use for tattoo removal?",
    answer:
      "Clarity Skin uses Candela PicoWay, a picosecond laser system with multiple wavelengths including 1064 nm, 532 nm, and 785 nm. PicoWay handles most ink colors and skin types and is one of the most capable picosecond systems on the market for tattoo removal.",
  },
  {
    question: "What is the best option for cosmetic tattoo removal in Draper?",
    answer:
      "Both inkOUT and Clarity Skin handle cosmetic tattoo removal, including microblading and permanent makeup. inkOUT's TEPR method is particularly well-suited to cosmetic tattoos because it avoids the risk of laser interaction with iron oxide pigments common in cosmetic inks and avoids wavelength-dependent color limitations. Clarity Skin's PicoWay can also handle cosmetic cases effectively with the right settings. For microblading or powder brow removal specifically, ask each provider at consultation about their experience with cosmetic ink types before booking.",
  },
  {
    question: "How many sessions does tattoo removal take?",
    answer:
      "Most tattoos need three to twelve sessions for complete removal. Three to eight sessions is typical for cover-up fading. Sessions are spaced six to eight weeks apart. The actual count depends on ink color, density, depth, your skin type, and your provider's technology.",
  },
  {
    question: "Does tattoo removal hurt?",
    answer:
      "Most users describe laser tattoo removal as similar to a thick rubber band snapping against the skin. Sessions for small tattoos last under 10 minutes. TEPR (non-laser, used by inkOUT) feels different and is usually described as moderate, similar to a tattoo session, rather than sharp.",
  },
  {
    question: "Do Draper tattoo removal clinics offer free consultations?",
    answer:
      "Both inkOUT (Rejuvatek Aesthetics) and Clarity Skin offer consultations. They assess the tattoo, estimate sessions, and quote pricing before you commit. Confirm consultation availability when you book.",
  },
  {
    question: "Are there tattoo removal options in Salt Lake City or nearby?",
    answer:
      "Yes. The broader Salt Lake City metro has several providers beyond Draper, including options in Murray, Sandy, Salt Lake City proper, and Pleasant Grove. RealTattooReviews currently tracks providers with sufficient public review data. If your tattoo case is complex or you want additional comparison options, broadening your search to the full SLC metro is worth doing before committing to a Draper provider.",
  },
];

const PAGE_PATH = "/cities/draper";
const SITE_URL = "https://realtattooreviews.com";

const DRAPER_PROVIDERS: StaticProviderProfile[] = [
  {
    providerName: "inkOUT",
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
                  Draper sits at the south end of the Salt Lake Valley and draws users from
                  Sandy, South Jordan, Riverton, Herriman, and the broader south metro. The
                  market is smaller than Salt Lake City proper, but it offers a genuinely
                  meaningful choice: a physician-led med spa running PicoWay picosecond laser,
                  and the south valley&rsquo;s only non-laser option using TEPR. Most users
                  in the area are choosing between those two methods before they choose a
                  provider.
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
                    body: "This is the Draper location for inkOUT, the non-laser tattoo removal brand operated by Rejuvatek Medical. inkOUT uses TEPR (Trans-Epidermal Pigment Release), a non-laser method that lifts ink out through the skin surface rather than shattering it with laser pulses. TEPR avoids the wavelength-versus-color limitations that affect laser systems and sidesteps the wavelength-versus-melanin interaction that elevates pigment-change risk on darker skin tones. This is the only non-laser tattoo removal option tracked by RealTattooReviews in the Draper and south Salt Lake Valley area.",
                    bestFor: [
                      "Users seeking complete removal rather than fading",
                      "Users who want a non-laser method",
                      "Users with cosmetic tattoos like microblading, powder brows, or lip blush",
                      "Users with darker skin tones who want to avoid laser pigment-change risk",
                      "Users whose tattoo contains colors that resist laser clearance (certain greens, whites, pastels)",
                    ],
                    lessIdealFor: [
                      "Users with very large tattoos who prefer the per-session speed of laser",
                      "Users who want a multi-service med spa experience alongside their removal",
                    ],
                  },
                  {
                    name: "Clarity Skin (Draper)",
                    body: "Clarity Skin is a full-service medical spa in Draper owned and led by four board-certified plastic surgeons. The practice offers tattoo removal alongside cosmetic injectables, laser hair removal, body contouring, facials, and other aesthetic services, with an on-site surgery center. Tattoo removal is performed using Candela PicoWay, a picosecond laser with multiple wavelengths (1064 nm, 532 nm, 785 nm) that handles most ink colors and skin types. Clarity Skin has a large overall review base, though many reviews cover services other than tattoo removal. Treatments are delivered by licensed laser technicians under physician oversight.",
                    bestFor: [
                      "Users who want tattoo removal in a physician-led, full-service medical setting",
                      "Users who already visit Clarity Skin for other services and want to add removal at the same provider",
                      "Users with straightforward black or dark-blue tattoos that respond well to picosecond laser",
                      "Users who want access to a broader aesthetic service menu at the same practice",
                    ],
                    lessIdealFor: [
                      "Users seeking a tattoo-removal-only specialist where the procedure is the clinic's primary focus",
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
                The Draper market offers both laser and non-laser tattoo removal. The method
                choice matters more here than provider choice — the two are genuinely different
                categories of treatment, not variations on the same process.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Picosecond laser (Clarity Skin)",
                    body: "Clarity Skin uses Candela PicoWay, a picosecond system that delivers pulses in the trillionths-of-a-second range. It shatters ink particles more efficiently than older nanosecond Q-switched lasers. PicoWay handles most ink colors with its multiple wavelengths and is one of the stronger picosecond systems on the market for difficult or multicolor cases.",
                  },
                  {
                    title: "Wavelengths and color coverage",
                    body: "PicoWay operates at 1064 nm (black, dark blue), 532 nm (red, orange), and 785 nm (green, light blue). Most ink colors respond to at least one of these wavelengths. Yellow, white, and certain pastel pigments remain difficult for all laser systems regardless of technology. If your tattoo includes these colors, ask Clarity Skin specifically at consultation.",
                  },
                  {
                    title: "Non-laser TEPR (inkOUT)",
                    body: "inkOUT uses TEPR, a non-laser method that lifts ink physically through the skin rather than shattering it with light. This avoids the wavelength-versus-color limitations that lasers face and avoids the wavelength-versus-melanin interaction that raises pigment-change risk on darker skin tones. TEPR is not faster per session than laser for large tattoos, but it is the only method in Draper that sidesteps these laser-specific constraints entirely.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-(--surface) p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">{item.body}</p>
                  </div>
                ))}
              </div>

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                If your tattoo includes hard-to-clear colors like green, teal, white, or pastels,
                ask Clarity Skin which of their wavelengths addresses those pigments and what
                their realistic session estimate is for your specific case before committing.
              </p>
            </GuideSection>

            {/* Pricing section */}
            <GuideSection heading="How Much Does Tattoo Removal Cost in Draper?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Tattoo removal in Draper generally runs $100 to $400 per session. The main
                variables are tattoo size, ink density, and the provider&rsquo;s pricing model.
              </p>

              <div className="space-y-3">
                {[
                  { label: "Small (postage stamp to poker chip)", price: "$100 to $200 per session" },
                  { label: "Medium (business card to palm)", price: "$200 to $350 per session" },
                  { label: "Large (postcard to half-sleeve+)", price: "$350 to $500+ per session" },
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
                Most tattoos need three to twelve sessions for complete removal. Three to eight
                sessions is typical for cover-up fading. Total cost for a standard tattoo
                typically falls between $1,000 and $4,000 in this market.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Per-session pricing suits users who want flexibility or expect to finish quickly.
                Ask each provider about payment plans and whether they offer any package pricing
                or session guarantees at the consultation.
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
            <GuideSection heading="How We Evaluated Draper Tattoo Removal Providers">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Draper is a two-provider market for tracked tattoo removal. The ranked list above
                reflects review-sample evidence — sentiment scores and use-case signals from the
                most recent public reviews for inkOUT and Clarity Skin. Where review samples are
                thin, the ranking reflects what the available data shows and flags low sample sizes
                clearly so you can weigh the evidence appropriately.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Because the providers use fundamentally different methods, the ranking is less
                about declaring a winner and more about surfacing which provider has demonstrated
                better outcomes for specific use cases — complete removal, cover-up fading,
                cosmetic tattoo removal, or color-heavy work. The factors we weighted:
              </p>
              <GuideBulletList
                items={[
                  "Review sample size and sentiment. Larger samples carry more weight. Sentiment comes from review text classification across the most recent reviews per provider, not from star averages alone.",
                  "Use-case fit signals. Reviews are tagged for use case (Complete removal, Cover-up fading, Microblading, Color, Other). Providers showing repeated positive outcomes in a specific use case get credit for that fit.",
                  "Method fit for the case. Picosecond laser (Clarity Skin) suits most standard ink colors and standard skin types. TEPR non-laser (inkOUT) suits cosmetic tattoos, darker skin tones, and color-limited cases where laser wavelengths fall short.",
                  "Pricing transparency. Providers with published per-session pricing rank above those that withhold all pricing until consultation.",
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
                listings into our internal review dataset. The ranked list and comparison table
                above are generated dynamically from this dataset and refresh as new reviews are
                scraped. Sample sizes are capped at 50 per provider; total lifetime Google review
                counts are higher. Sentiment classifications and use-case tags are derived from
                review text analysis. Pricing ranges reflect industry averages and published Draper
                provider rates where pricing is public. Method and technology details are drawn from
                each provider&rsquo;s published materials. Individual outcomes vary by tattoo, skin
                type, ink density, and provider skill. Consult a qualified provider before
                proceeding. See our{" "}
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
