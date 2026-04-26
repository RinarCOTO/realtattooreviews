/*
 * DYNAMIC DATA NOTE FOR CLAUDE CODE:
 * One dynamic component on this page renders live cross-city evidence from Supabase.
 * The prose is intentionally GENERIC and STATIC: no hardcoded numbers, ratings, win
 * counts, or rankings. All quantitative data is rendered by BrandComparisonEvidence.
 *
 * PROSE RULE: The page describes WHAT each brand IS (technology, business model, pricing
 * structure, footprint logic, specialist vs chain framing). The dynamic component handles
 * HOW each brand is currently performing across the review-sample dataset.
 *
 * COMPONENT: <BrandComparisonEvidence brand_a="inkOUT" brand_b="LaserAway" />
 * Renders the cross-city evidence table. Same reusable component as inkout-vs-removery
 * with brand_b parameterized to "LaserAway".
 *
 * CRITICAL DATA GAP:
 * LaserAway currently has ZERO rows in competitor_reviews. Component renders
 * LaserAway section as "Review sample pending" until backfill.
 * Known LaserAway place_ids for Houston scrape backfill:
 *   - Houston Galleria: ChIJaYtupZWfToYR6rSxp4DfDGk (5385 Westheimer Rd)
 *   - Houston Heights: ChIJa6EksDvHQIYRhBw7x-Qz2SY (246 W 19th St)
 *   - Houston Pearland: ChIJ5RNNeCGTQIYR9p204w-kHfY (11200 Broadway St)
 *
 * TECHNOLOGY: PicoSure (not PicoWay). Cynosure PicoSure, 755nm primary alexandrite.
 * First FDA-cleared picosecond aesthetic laser, December 2012. PressureWave technology.
 * PMC4859414 (Torbeck et al 2016): >75% clearance in avg 4.25 treatments.
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
  title: "inkOUT vs LaserAway: TEPR vs PicoSure Compared (2026) | RealTattooReviews",
  description:
    "Compare inkOUT and LaserAway side by side, including TEPR vs PicoSure, specialist vs chain differences, pricing, dark skin safety, color ink, and which option fits your removal goal.",
  alternates: {
    canonical: "https://realtattooreviews.com/comparisons/inkout-vs-laseraway",
  },
  openGraph: {
    title: "inkOUT vs LaserAway: TEPR vs PicoSure Compared (2026)",
    description:
      "Compare inkOUT and LaserAway side by side, including TEPR vs PicoSure, specialist vs chain differences, pricing, dark skin safety, color ink, and which option fits your removal goal.",
  },
};

const faqs = [
  {
    question: "Is inkOUT better than LaserAway?",
    answer:
      "Neither brand is universally better. inkOUT is structurally better suited for users who want a non-laser method, have cosmetic tattoos with iron-oxide pigments, have darker skin tones and want to avoid laser-melanin interaction, or prioritize complete removal as a primary outcome. LaserAway is structurally better suited for users who want a large national chain, prefer PicoSure laser, want access to multiple aesthetic services in one location, or are in a market where LaserAway is the most accessible option.",
  },
  {
    question: "Is inkOUT cheaper than LaserAway?",
    answer:
      "Pricing is consultation-set at both brands, so a real comparison requires quotes from both. inkOUT offers free consultations. LaserAway consultation policy varies by location. Per-session and package pricing depend on tattoo size, ink density, and complexity. The most reliable cost comparison is two consultations.",
  },
  {
    question: "Which has better tattoo removal results, inkOUT or LaserAway?",
    answer:
      "Both brands target clearance. PicoSure has peer-reviewed evidence supporting greater than 75% clearance in an average of 4.25 treatments (Torbeck et al 2016). TEPR targets complete removal as a primary outcome. Individual results depend on the tattoo, the skin, the ink composition, and the provider's protocol more than the brand label.",
  },
  {
    question: "What laser does LaserAway use?",
    answer:
      "LaserAway uses Cynosure PicoSure. PicoSure is a picosecond laser with a primary 755nm alexandrite wavelength. PicoSure Pro adds optional 532nm and 1064nm wavelengths. It was the first picosecond aesthetic laser to receive FDA clearance, in December 2012. LaserAway also offers other aesthetic services using different devices.",
  },
  {
    question: "What type of laser does LaserAway use?",
    answer:
      "LaserAway uses picosecond laser technology. Specifically Cynosure PicoSure, which uses PressureWave technology to deliver ultra-short pulses that shatter ink particles through photoacoustic energy rather than heat. This reduces thermal damage compared to older nanosecond Q-switched lasers.",
  },
  {
    question: "Is LaserAway worth it?",
    answer:
      "For users who fit LaserAway's structural strengths: national chain access, PicoSure laser, service bundling, and standard body tattoo removal. For users with cosmetic tattoos, darker skin tones, strong non-laser preference, or a need for specialist focus, inkOUT or another provider may be a better fit. Get a consultation to compare quotes and protocols before deciding.",
  },
  {
    question: "Is LaserAway legit?",
    answer:
      "Yes. LaserAway is a large, established national aesthetics chain using FDA-cleared picosecond laser technology. It operates in many markets across the US. The primary considerations are not legitimacy but fit: LaserAway is a multi-service chain rather than a tattoo-removal specialist, and its technology and pricing structure may or may not suit your specific case.",
  },
  {
    question: "Is TEPR better than PicoSure?",
    answer:
      "TEPR and PicoSure are not directly comparable as better or worse because they are different categories of treatment. TEPR is non-laser and not bound by wavelength-versus-color or wavelength-versus-melanin limitations. PicoSure is a well-established picosecond laser with strong evidence on standard ink colors. The right question is which mechanism fits your specific tattoo, skin type, and removal goal.",
  },
  {
    question: "Which is better for dark skin?",
    answer:
      "For darker Fitzpatrick skin types specifically prioritizing avoidance of any laser-pigment-change risk, TEPR (inkOUT) is the structurally lower-risk option because the mechanism does not interact with melanin. PicoSure's 755nm alexandrite wavelength has a higher melanin absorption ratio than 1064nm, which is a relevant consideration for darker skin types. Experienced providers can mitigate this risk with conservative protocols, but the structural interaction is present.",
  },
  {
    question: "Which is better for color ink?",
    answer:
      "PicoSure's primary 755nm wavelength is effective on black, blue, and green inks. The optional 532nm adds red and orange coverage. TEPR is not wavelength-bound, so its performance on color ink does not depend on color absorption by wavelength. For mixed-color tattoos with unusual ink compositions, TEPR's mechanism avoids the wavelength matching problem entirely.",
  },
  {
    question: "Which is better for complete removal?",
    answer:
      "Both brands target complete removal. inkOUT positions TEPR around complete removal as the primary outcome. LaserAway frames tattoo removal as one of many services. For users specifically prioritizing complete removal as the goal rather than fading, inkOUT's specialist focus is the stronger signal.",
  },
  {
    question: "How many sessions does inkOUT take vs LaserAway?",
    answer:
      "Session counts vary by case for both brands. PicoSure peer-reviewed evidence shows greater than 75% clearance in an average of 4 to 5 sessions. inkOUT's TEPR session counts vary by tattoo size, ink density, and skin response. Both brands provide session-count estimates at consultation that are more useful than brand-versus-brand averages.",
  },
];

const PAGE_PATH = "/comparisons/inkout-vs-laseraway";
const SITE_URL = "https://realtattooreviews.com";

const GLANCE_ROWS: [string, string, string][] = [
  ["Method", "TEPR (Trans-Epidermal Pigment Release)", "Cynosure PicoSure (picosecond laser)"],
  ["Modality", "Non-laser", "Laser"],
  ["Wavelength dependency", "None", "755nm primary; optional 532nm and 1064nm"],
  ["Business model", "Tattoo removal specialist", "Multi-service aesthetics chain"],
  ["Footprint", "Smaller, focused locations", "Large national chain"],
  ["Free consultation", "Yes", "Varies by location"],
];

export default function InkoutVsLaserawayPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Comparisons", href: "/comparisons" },
    { name: "inkOUT vs LaserAway", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "inkOUT vs LaserAway: TEPR vs PicoSure Compared (2026)",
    description:
      "Compare inkOUT and LaserAway side by side, including TEPR vs PicoSure, specialist vs chain differences, pricing, dark skin safety, color ink, and which option fits your removal goal.",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: ["inkOUT vs LaserAway", "TEPR vs PicoSure", "Tattoo removal comparison"],
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
              inkOUT vs LaserAway
            </span>
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            inkOUT vs{" "}
            <span className="text-(--accent)">LaserAway</span>
          </h1>

          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--muted) max-w-2xl">
            Compare TEPR and PicoSure tattoo removal, including the specialist vs chain distinction,
            pricing, dark skin safety, and which provider fits your removal goal.
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
                  inkOUT and LaserAway represent two fundamentally different approaches to tattoo
                  removal. LaserAway is a large multi-service aesthetics chain. It offers tattoo
                  removal alongside laser hair removal, body contouring, injectables, and other
                  cosmetic procedures. LaserAway uses Cynosure PicoSure, a picosecond laser built
                  around a 755nm alexandrite wavelength. inkOUT is a non-laser brand that uses TEPR
                  (Trans-Epidermal Pigment Release). TEPR tattoo removal lifts ink out through the
                  skin surface rather than shattering it with light.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  The inkOUT vs LaserAway decision sits on two axes. The first is TEPR vs PicoSure:
                  non-laser versus laser, two different mechanisms with different strengths. The
                  second is specialist vs chain: a focused tattoo removal brand versus a
                  broad-service aesthetics platform where tattoo removal is one of many offerings.
                  Both axes matter. LaserAway vs inkOUT, inkOUT or LaserAway, and inkout vs
                  laseraway tattoo removal all come back to the same two-layer comparison.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  This page does not force a universal winner. It explains the real differences on
                  both axes, then maps those differences onto who each provider actually serves best.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  For broader method comparison, see the{" "}
                  <Link
                    href="/comparisons/best-tattoo-removal-method"
                    className="text-(--accent) hover:underline"
                  >
                    best tattoo removal method overview
                  </Link>
                  . For inkOUT versus another laser chain, see{" "}
                  <Link
                    href="/comparisons/inkout-vs-removery"
                    className="text-(--accent) hover:underline"
                  >
                    inkOUT vs Removery
                  </Link>
                  . For a chain-versus-chain comparison, see{" "}
                  <Link
                    href="/comparisons/removery-vs-laseraway"
                    className="text-(--accent) hover:underline"
                  >
                    Removery vs LaserAway
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* At a glance */}
            <GuideSection heading="inkOUT vs LaserAway at a Glance">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The structural comparison between inkOUT and LaserAway spans method, business model,
                and specialization focus. Quantitative review evidence appears in the cross-city
                evidence section further down.
              </p>
              <GuideTable
                headers={["", "inkOUT", "LaserAway"]}
                rows={GLANCE_ROWS.map(([feature, a, b]) => [feature, a, b])}
              />
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The structural comparison sets the frame. The use-case comparison further down
                translates these structural differences into who each brand actually serves best.
              </p>
            </GuideSection>

            {/* TEPR vs PicoSure */}
            <GuideSection heading="The Key Difference: TEPR vs PicoSure">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                TEPR vs PicoSure is the core technology difference underneath the inkOUT vs
                LaserAway comparison. Almost every other difference between the two brands flows
                from this one technical choice.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "PicoSure",
                    body: "PicoSure is a picosecond laser manufactured by Cynosure (now Cynosure Lutronic). It was the first picosecond aesthetic laser to receive FDA clearance, in December 2012. PicoSure's primary wavelength is 755nm alexandrite, which is effective on black, blue, and green inks. PicoSure Pro adds optional 532nm and 1064nm wavelengths for red, orange, yellow, and darker-skin-type treatment. PicoSure uses Cynosure's PressureWave technology to deliver ultra-short pulses that shatter ink particles through photoacoustic energy. Peer-reviewed evidence shows greater than 75% clearance in an average of 4.25 treatments (Torbeck et al 2016, PMC4859414).",
                  },
                  {
                    title: "TEPR",
                    body: "TEPR (Trans-Epidermal Pigment Release) is not a laser. It does not use light wavelengths. TEPR works by lifting ink upward through the epidermis. The skin then sheds the ink naturally. TEPR is not bound by wavelength-versus-color limitations. It does not interact with melanin the way laser wavelengths do. This makes TEPR structurally different on two dimensions: color ink performance does not depend on wavelength matching, and the mechanism avoids the melanin interaction that is a known consideration in laser treatment of darker skin types.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-(--line) bg-(--surface) p-5"
                  >
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">
                      {item.title}
                    </p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Key implications for the inkOUT vs LaserAway comparison:
              </p>
              <GuideBulletList
                items={[
                  "Color range. PicoSure depends on wavelength matching. TEPR is not wavelength-bound.",
                  "Skin tone. PicoSure 755nm has a higher melanin absorption ratio than 1064nm, a relevant factor for darker skin types. TEPR avoids melanin interaction.",
                  "Pain profile. PicoSure: rubber band snap. TEPR: moderate, similar to a tattoo session.",
                  "Session counts. PicoSure has published peer-reviewed evidence. TEPR session counts vary by case.",
                ]}
              />
            </GuideSection>

            {/* Specialist vs Chain */}
            <GuideSection heading="Specialist vs Chain: What Type of Provider Fits Your Needs?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The specialist-vs-chain axis is unique to this comparison. LaserAway is explicitly a
                chain where tattoo removal is one offering among many.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "What specialist focus means",
                    body: "A tattoo removal specialist concentrates all clinical volume on one procedure. Deeper per-clinician experience on edge cases is the structural benefit: cosmetic tattoos, stubborn inks, darker skin types, and scarring-sensitive users all benefit from providers who handle those cases frequently rather than occasionally. inkOUT's entire clinical focus is tattoo removal.",
                  },
                  {
                    title: "What chain breadth means",
                    body: "LaserAway operates a national aesthetics platform with multiple service lines. Tattoo removal is one of many revenue-generating procedures. Wide geographic access and brand familiarity are real advantages. The trade-off is diluted per-clinician tattoo removal volume across a high-service-line count. For users with standard body tattoos in uncomplicated cases, this trade-off is minor. For edge cases, it matters more.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-(--line) bg-(--surface) p-5"
                  >
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">
                      {item.title}
                    </p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </GuideSection>

            {/* Pricing */}
            <GuideSection heading="inkOUT vs LaserAway: Pricing and Cost Comparison">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Both brands set pricing at consultation. Neither publishes pricing online. inkOUT
                offers free consultations. LaserAway consultation policy varies by location.
              </p>

              <GuideBulletList
                items={[
                  "Per-session price. Both brands set per-session pricing at consultation based on tattoo size, ink density, and complexity. Direct comparison requires consultations at both.",
                  "Total cost certainty. Neither brand offers an open-ended unlimited-sessions package in the same way as Removery's Complete Removal Package model.",
                  "Cost-per-result. Both brands target measurable outcomes per session. Cost-per-clear-tattoo is the more useful comparison for users planning complete removal.",
                  "Consultation cost. inkOUT offers free consultations. LaserAway consultation policy varies by location. Check before booking.",
                ]}
              />

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                For national pricing context across all methods and tattoo sizes, see the{" "}
                <Link href="/cost" className="text-(--accent) hover:underline">
                  cost guide
                </Link>
                .
              </p>
            </GuideSection>

            {/* Results, scarring, pain */}
            <GuideSection heading="inkOUT vs LaserAway: Results, Scarring, and Pain">
              <div className="space-y-3">
                {[
                  {
                    title: "Results",
                    body: "Both brands target tattoo clearance. PicoSure has peer-reviewed support: greater than 75% clearance in an average of 4.25 treatments (PMC4859414). TEPR targets complete removal as a primary outcome. Session counts under TEPR vary by tattoo size and ink density. Neither brand controls every variable affecting clearance. Ink composition, depth, and skin response are case-specific.",
                  },
                  {
                    title: "Scarring risk",
                    body: "PicoSure's picosecond pulse reduces thermal damage compared to Q-switched nanosecond lasers, placing it on the lower-risk side of the laser spectrum. TEPR avoids the wavelength-versus-melanin interaction by using a non-laser mechanical mechanism. For scarring-sensitive users or users with darker skin types, this is a structural difference. Provider conservatism with intensity, technique, and session spacing matters alongside device choice.",
                  },
                  {
                    title: "Pain",
                    body: "PicoSure sessions are typically described as a rubber band snap against the skin. Sessions for small tattoos are short. TEPR has a different pain profile: users typically describe it as moderate, comparable to getting a tattoo, rather than sharp. Pain tolerance is personal. A consultation is the most reliable way to assess fit before committing.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-(--line) bg-(--surface) p-5"
                  >
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">
                      {item.title}
                    </p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </GuideSection>

            {/* Use cases */}
            <GuideSection heading="inkOUT vs LaserAway: Best for Dark Skin, Color Ink, and Complete Removal">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Three high-stakes use cases drive most inkOUT vs LaserAway decisions. Each has a
                clear answer based on the structural difference between TEPR and PicoSure.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Dark skin",
                    body: "PicoSure 755nm alexandrite has a higher melanin absorption ratio than 1064nm. This is a known consideration for darker Fitzpatrick skin types. Conservative settings and experienced providers can mitigate the risk, but the structural wavelength-versus-melanin interaction is present. TEPR avoids melanin interaction entirely by mechanism. For users prioritizing avoidance of any laser-pigment-change risk, TEPR is the structurally lower-risk option.",
                  },
                  {
                    title: "Color ink",
                    body: "PicoSure handles black, blue, and green inks well at 755nm. The optional 532nm adds red and orange coverage. TEPR is not wavelength-bound: its performance on color ink does not depend on color absorption. For mixed-color tattoos with unusual ink compositions, TEPR avoids the wavelength-matching problem entirely.",
                  },
                  {
                    title: "Complete removal",
                    body: "inkOUT positions TEPR around complete removal as the primary outcome. LaserAway frames tattoo removal as one of many services, which affects how specialist the per-clinician focus is. For users specifically prioritizing complete removal as the primary goal rather than gradual fading, inkOUT's specialist depth is the stronger signal.",
                  },
                  {
                    title: "PMU and microblading removal",
                    body: "Cosmetic tattoo inks often contain iron oxides. These can darken paradoxically under laser, a known consideration for any laser removal of cosmetic tattoos. TEPR avoids this risk because it does not use light. inkOUT is structurally well-suited to PMU and microblading cases. If you have cosmetic tattooing to remove, this is one of the strongest arguments for consulting inkOUT first.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-(--line) bg-(--surface) p-5"
                  >
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">
                      {item.title}
                    </p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </GuideSection>

            {/* Cross-city evidence */}
            <GuideSection heading="Cross-City Review Evidence">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The evidence below shows how inkOUT and LaserAway compare across cities where we
                have direct review-sample data. LaserAway data is pending backfill into our review
                dataset. Sample sizes reflect the most recent reviews captured per provider location.
                Lifetime Google review counts on each provider listing are higher than the sample
                sizes shown.
              </p>
              <Suspense
                fallback={
                  <div className="rounded-xl border border-(--line) bg-(--surface) p-8 text-center">
                    <p className="font-sans text-[14px] text-(--muted) m-0">
                      Loading evidence table&hellip;
                    </p>
                  </div>
                }
              >
                <BrandComparisonEvidence
                  brandA="inkOUT"
                  brandB="LaserAway"
                />
              </Suspense>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The table updates as our scrape refreshes. LaserAway data will appear once the
                backfill capturing confirmed locations is complete.
              </p>
            </GuideSection>

            {/* Pros and cons */}
            <GuideSection heading="Pros and Cons of inkOUT">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2">Pros</p>
                  <GuideBulletList
                    items={[
                      "Non-laser mechanism: not bound by wavelength-versus-color or wavelength-versus-melanin limitations",
                      "Avoids iron-oxide pigment darkening risk, making it structurally well-suited to cosmetic tattoo removal",
                      "Specialist focus: entire clinical volume is tattoo removal, not one service among many",
                      "Positioned around complete removal as the primary outcome",
                      "Free consultations to confirm fit before committing",
                      "Lower structural risk for darker skin types avoiding laser-melanin interaction",
                    ]}
                  />
                </div>
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2">Cons</p>
                  <GuideBulletList
                    variant="warning"
                    items={[
                      "Smaller national footprint than LaserAway, limiting geographic access",
                      "Newer market presence in many cities means smaller public review history",
                      "No service bundling for users who want aesthetics and tattoo removal at one location",
                      "TEPR is one mechanism: not the right answer for every tattoo or every user",
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
                      "Large national footprint with locations across many metros",
                      "Uses PicoSure, the first FDA-cleared picosecond aesthetic laser with strong published evidence",
                      "PressureWave technology delivers ultra-short pulses with reduced thermal damage vs Q-switched",
                      "Multi-service platform: tattoo removal, laser hair removal, injectables, and other aesthetics at one location",
                      "Brand recognition and wide geographic access",
                      "Multi-wavelength options (755nm, 532nm, 1064nm) for color and skin-type range",
                    ]}
                  />
                </div>
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2">Cons</p>
                  <GuideBulletList
                    variant="warning"
                    items={[
                      "Multi-service chain model dilutes per-clinician tattoo removal specialization",
                      "755nm primary wavelength has higher melanin absorption: a consideration for darker skin types",
                      "Cosmetic tattoo cases carry the laser iron-oxide darkening risk shared by all laser devices",
                      "Pricing is consultation-set and not published online",
                      "Aggregate reviews cover all service lines, making tattoo-removal-specific evidence harder to isolate",
                    ]}
                  />
                </div>
              </div>
            </GuideSection>

            {/* Verdict */}
            <GuideSection heading="Our Verdict: inkOUT or LaserAway?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                There is no universal winner between inkOUT and LaserAway. The honest verdict is
                by scenario.
              </p>

              <div className="space-y-4">
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans mb-2 text-[14px] font-semibold text-(--ink)">
                    Choose LaserAway when:
                  </p>
                  <GuideBulletList
                    items={[
                      "You want a large national chain with wide geographic access",
                      "You prefer laser removal and specifically want PicoSure technology",
                      "Your tattoo is a standard body tattoo without unusual ink or skin-tone considerations",
                      "You want to bundle tattoo removal with other aesthetic services at one location",
                      "A LaserAway location is the most accessible option in your market",
                    ]}
                  />
                </div>

                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans mb-2 text-[14px] font-semibold text-(--ink)">
                    Choose inkOUT when:
                  </p>
                  <GuideBulletList
                    items={[
                      "You specifically want a non-laser method, by preference or medical reason",
                      "You have a microblading, powder brows, lip blush, or other cosmetic tattoo and want to avoid the laser iron-oxide darkening risk",
                      "You have darker skin and want to avoid the 755nm melanin interaction altogether",
                      "You want a tattoo removal specialist rather than a multi-service chain",
                      "You are prioritizing complete removal as the primary outcome",
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
                      "You want to compare quotes, session-count estimates, and provider judgment side by side",
                      "You are uncertain which method fits your specific case best",
                    ]}
                  />
                </div>
              </div>

              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Use the{" "}
                <Link href="/cities" className="text-(--accent) hover:underline">
                  city comparison pages
                </Link>{" "}
                to see which brands operate in your market before drawing a verdict.
              </p>
            </GuideSection>

            {/* Editorial note */}
            <div className="py-12">
              <GuideCallout label="Editorial note">
                inkOUT is a current advertising client of RealTattooReviews and is evaluated under
                the same framework as every other provider. PicoSure technology details are drawn
                from Cynosure product documentation and PMC4859414 (Torbeck et al, JCAD 2016).
                LaserAway review data is pending backfill into the current dataset; the evidence
                table will populate as confirmed locations are captured. Individual outcomes vary by
                tattoo, skin type, ink density, and provider skill. Consult both providers before
                deciding. See our{" "}
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
                  href: "/comparisons/inkout-vs-removery",
                  title: "inkOUT vs Removery",
                  desc: "TEPR vs PicoWay comparison for users choosing between inkOUT and the other major laser chain.",
                },
                {
                  href: "/comparisons/removery-vs-laseraway",
                  title: "Removery vs LaserAway",
                  desc: "Chain-versus-chain comparison for users choosing between the two largest laser removal brands.",
                },
                {
                  href: "/cost",
                  title: "Tattoo Removal Cost",
                  desc: "National pricing breakdown by method, size, and provider type.",
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
