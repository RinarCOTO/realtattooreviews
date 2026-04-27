
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Container from "@/components/layout/Container";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import GuideBulletList from "@/components/guide/GuideBulletList";
import GuideTable from "@/components/guide/GuideTable";
import GuideCallout from "@/components/guide/GuideCallout";
import GuideRelatedLinks from "@/components/guide/GuideRelatedLinks";
import MonoLabel from "@/components/reviews/MonoLabel";
import PageSection from "@/components/reviews/PageSection";
import FaqAccordion from "@/components/provider/FaqAccordion";
import BrandComparisonEvidence from "@/components/comparison/BrandComparisonEvidence";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "inkOUT vs Removery: TEPR vs PicoWay Compared (2026) | RealTattooReviews",
  description:
    "Compare inkOUT and Removery side by side, including TEPR vs PicoWay, pricing, results, pain, scarring risk, and which option may fit your tattoo and skin type best.",
  alternates: {
    canonical: "https://realtattooreviews.com/comparisons/inkout-vs-removery",
  },
  openGraph: {
    title: "inkOUT vs Removery: TEPR vs PicoWay Compared (2026)",
    description:
      "Compare inkOUT and Removery side by side, including TEPR vs PicoWay, pricing, results, pain, scarring risk, and which option may fit your tattoo and skin type best.",
  },
};

const faqs = [
  {
    question: "Is inkOUT better than Removery?",
    answer:
      "Neither brand is universally better. inkOUT is structurally better suited for cosmetic tattoo removal, darker skin tones avoiding laser-pigment risk, and users wanting a non-laser method for any reason. Removery is structurally better suited for users wanting a national chain with package pricing on standard body tattoos and the deepest public review history in the laser tattoo removal market. The cross-city evidence table on this page shows current review-sample evidence per brand per city to support fit-by-fit comparison rather than a single winner.",
  },
  {
    question: "Is inkOUT cheaper than Removery?",
    answer:
      "Pricing is consultation-set at both brands, so a real comparison requires getting quotes at both. Removery's Complete Removal Package caps total cost across unlimited sessions, which is meaningful if your tattoo needs more than the average session count. inkOUT's per-session model with package options can be cheaper for cases that complete in fewer sessions. Both brands offer free consultations, so the actual cost comparison is two phone calls away.",
  },
  {
    question: "Which has better tattoo removal results, inkOUT or Removery?",
    answer:
      "Both target full clearance. The cross-city evidence on this page shows positive complete-removal outcomes for both brands in the markets where we have data. Results in any individual case depend on the tattoo, the skin, the ink, and the provider's protocol more than the brand label. Look at the use-case fit signals in the evidence table for the better answer to \"which performs better on my type of tattoo.\"",
  },
  {
    question: "Is TEPR better than PicoWay?",
    answer:
      "TEPR and PicoWay are not directly comparable as better or worse because they are different categories of treatment. TEPR is non-laser; PicoWay is laser. TEPR performance is not bound by ink-color wavelength interaction or melanin interaction. PicoWay is well-established as a picosecond laser with strong color performance across most inks. The right question is which mechanism fits your specific case, not which is universally better.",
  },
  {
    question: "Which is better for dark skin?",
    answer:
      "For darker Fitzpatrick skin types specifically prioritizing avoidance of any laser-pigment-change risk, TEPR (inkOUT) is the structurally lower-risk option because the mechanism does not interact with melanin. Removery's PicoWay is on the lower-risk side of the laser spectrum and many providers handle darker skin successfully with conservative protocols, but the wavelength-versus-melanin interaction is structural to laser treatment.",
  },
  {
    question: "Which is better for color ink?",
    answer:
      "Color ink performance under PicoWay depends on the available wavelengths and the specific inks. PicoWay handles most colors well, with some limitations on white, yellow, and very light shades. TEPR is not wavelength-bound, so its performance on color ink does not depend on color absorption. For mixed-color tattoos, both are reasonable starting points; consultation-specific assessment of ink behavior is the better guide than brand-versus-brand abstraction.",
  },
  {
    question: "Which is better for complete removal?",
    answer:
      "Both brands target complete removal. inkOUT positions TEPR around complete removal as the primary outcome. Removery's Complete Removal Package is the laser-side equivalent: a capped-cost commitment to full removal across unlimited sessions. The cross-city evidence table on this page shows positive complete-removal outcomes for both brands. The choice on this dimension is mechanism preference more than outcome difference.",
  },
  {
    question: "Is inkOUT worth it?",
    answer:
      "For users in inkOUT's structural fit zone (non-laser preference, cosmetic tattoo removal, darker skin avoiding laser-melanin interaction, complete-removal focus): yes. For users with standard body tattoos in markets without inkOUT access, the answer is to compare to local laser providers including Removery rather than a default yes.",
  },
  {
    question: "Is Removery worth it?",
    answer:
      "For users who fit Removery's structural strength (national chain access, package pricing on standard body tattoos, mainstream laser preference): yes. For users with cosmetic tattoos, scarring sensitivity beyond what conservative laser protocols can address, or strong non-laser preference, inkOUT or another non-laser provider may be a better fit.",
  },
  {
    question: "How many sessions does inkOUT take vs Removery?",
    answer:
      "Session counts vary by case for both brands. Standard body tattoos under Removery's PicoWay typically clear in 6 to 12 sessions, spaced 6 to 8 weeks apart. inkOUT's TEPR session counts vary by tattoo size, ink density, and skin response; some users complete removal in fewer sessions than comparable laser counts, but case-specific outcomes depend on consultation assessment. Both brands provide session-count estimates at the free consultation that are more useful than brand-versus-brand averages.",
  },
];

const PAGE_PATH = "/comparisons/inkout-vs-removery";
const SITE_URL = "https://realtattooreviews.com";

const GLANCE_ROWS: [string, string, string][] = [
  ["Method", "TEPR (Trans-Epidermal Pigment Release)", "Candela PicoWay (picosecond laser)"],
  ["Modality category", "Non-laser", "Laser"],
  ["Ink interaction", "Lifts pigment out through the skin surface", "Shatters ink particles for body to clear"],
  ["Wavelength dependency", "None. The mechanism does not depend on light absorption by ink color.", "Yes. Different wavelengths handle different colors."],
  ["Skin tone interaction", "Mechanism does not interact with melanin", "Wavelength-versus-melanin interaction is a known consideration"],
  ["Pricing model", "Per-session and package options", "Complete Removal Package (capped total cost) and per-session"],
  ["Footprint", "Smaller, focused locations", "National chain with multi-city coverage"],
  ["Best fit category", "Complete removal, cosmetic tattoos, scarring-sensitive cases", "Mainstream laser removal, package pricing, multi-location convenience"],
  ["Free consultation", "Yes", "Yes"],
];

export default function InkoutVsRemoveryPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Comparisons", href: "/comparisons" },
    { name: "inkOUT vs Removery", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "inkOUT vs Removery: TEPR vs PicoWay Compared (2026)",
    description:
      "Compare inkOUT and Removery side by side, including TEPR vs PicoWay, pricing, results, pain, scarring risk, and which option may fit your tattoo and skin type best.",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: ["inkOUT vs Removery", "TEPR vs PicoWay", "Tattoo removal comparison"],
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
              inkOUT vs Removery
            </span>
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            inkOUT vs{" "}
            <span className="text-(--accent)">Removery</span>
          </h1>

          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--ink) max-w-2xl">
            Compare TEPR and PicoWay tattoo removal, including pricing, pain, scarring risk, and
            which provider fits different use cases.
          </p>
        </Container>
      </section>

      {/* Intro */}
      <section className="border-b border-(--line) bg-(--surface) py-22">
        <Container>
          <p className="font-sans text-[15px] leading-relaxed text-(--ink) m-0">
              inkOUT and Removery are two of the most-asked-about tattoo removal brands today.
              They are also two of the most different. Removery is a national tattoo-removal-only
              chain. It uses the Candela PicoWay laser. inkOUT is a non-laser brand. It uses TEPR (Trans-Epidermal Pigment Release). TEPR lifts ink
              out of the skin instead of using light to fragment it. The decision is rarely about
              which brand is bigger. It is about which method fits your tattoo, your skin type,
              and your removal goal.
            </p>
            <p className="font-sans text-[15px] leading-relaxed text-(--ink) m-0 mt-4">
              This page is a side-by-side comparison built to support that decision. inkOUT vs
              Removery is the right question if you are choosing between non-laser and laser
              approaches in markets where both are available. The page does not pretend either
              brand wins universally. It explains the real differences clearly, then identifies
              who each brand serves best.
            </p>
        </Container>
      </section>

      {/* At a glance */}
      <section className="border-b border-(--line) bg-(--bg) py-22">
        <Container>
          <h2 className="font-sans font-bold text-[clamp(20px,3vw,28px)] leading-[1.1] tracking-[-0.02em] text-(--ink) m-0 mb-6">
            inkOUT vs Removery at a Glance
          </h2>
          <div className="space-y-4">
            <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
              The most useful one-screen view of inkOUT vs Removery is the structural difference
              between the two brands. The table below summarizes the categorical differences.
              Quantitative review evidence appears further down in the cross-city evidence section.
            </p>
            <GuideTable
              headers={["", "inkOUT", "Removery"]}
              rows={GLANCE_ROWS.map(([feature, a, b]) => [feature, a, b])}
            />
            <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
              The structural comparison sets the frame. The use-case comparison further down
              translates these structural differences into who each brand actually serves best.
            </p>
          </div>
        </Container>
      </section>

      {/* TEPR vs PicoWay */}
      <section className="border-b border-(--line) bg-(--surface) py-22">
        <Container>
          <h2 className="font-sans font-bold text-[clamp(20px,3vw,28px)] leading-[1.1] tracking-[-0.02em] text-(--ink) m-0 mb-6">
            The Key Difference: TEPR vs PicoWay
          </h2>
          <div className="space-y-4">
            <p className="font-sans text-[15px] leading-relaxed text-(--ink)">
              The TEPR vs PicoWay distinction is the real comparison underneath inkOUT vs
              Removery. Almost every other difference between the two brands flows from this one
              technical choice.
            </p>

            <div className="space-y-3">
              {[
                {
                  title: "PicoWay",
                  body: "PicoWay is a picosecond laser. Picosecond lasers deliver pulses in the trillionths-of-a-second range. The pulse is short enough to shatter ink particles into smaller fragments through photoacoustic energy. The body's lymphatic system then clears the fragments over the weeks following each session. PicoWay handles most ink colors. The platform offers multiple wavelengths (typically 1064 nm, 532 nm, and 785 nm) to address black, blue, red, green, and other inks.",
                },
                {
                  title: "TEPR",
                  body: "TEPR (Trans-Epidermal Pigment Release) is not a laser. Rather than shattering ink with light, TEPR works mechanically. The treatment encourages ink to lift upward through the epidermis. The skin then sheds it naturally over the weeks following each session. TEPR does not rely on light wavelengths interacting with ink color. The method is not bound by the wavelength-versus-color limitations that affect every laser modality.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-(--line) bg-(--surface) p-5"
                >
                  <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">
                    {item.title}
                  </p>
                  <p className="font-sans text-[14px] leading-relaxed text-(--ink) m-0">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="font-sans text-[15px] leading-relaxed text-(--ink)">
              The implications stack up across the rest of the comparison:
            </p>
            <GuideBulletList
              items={[
                "Color performance. PicoWay strength on a given color depends on its wavelength options. TEPR performance is not color-bound in the same way.",
                "Skin tone. Laser methods carry a known wavelength-versus-melanin interaction in darker Fitzpatrick skin types. TEPR does not interact with melanin in the same way.",
                "Pain profile. Laser is typically described as a thick rubber band snapping against the skin. TEPR is typically described as moderate, similar to the sensation of getting a tattoo.",
                "Outcome target. Laser is well-suited to fading toward complete removal across many sessions. TEPR is positioned for complete removal as the primary outcome.",
              ]}
            />
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section className="border-b border-(--line) bg-(--bg) py-22">
        <Container>
          <h2 className="font-sans font-bold text-[clamp(20px,3vw,28px)] leading-[1.1] tracking-[-0.02em] text-(--ink) m-0 mb-6">
            inkOUT vs Removery: Pricing and Cost Comparison
          </h2>
          <div className="space-y-4">
            <p className="font-sans text-[15px] leading-relaxed text-(--ink)">
              inkOUT vs Removery cost decisions hinge on the pricing model as much as on the
              per-session price.
            </p>

            <div className="space-y-3">
              {[
                {
                  title: "Removery pricing",
                  body: "Removery uses a Complete Removal Package model. The brand quotes a total cost at consultation based on tattoo size, ink density, and complexity. The package covers unlimited sessions until the tattoo is removed, regardless of how many sessions that takes. Removery also offers per-session pricing. Monthly payment plans are available within the package model. The Complete Removal Package effectively functions as a results guarantee within the package terms.",
                },
                {
                  title: "inkOUT pricing",
                  body: "inkOUT typically uses a per-session pricing model. Package options are available for users who want a multi-session commitment. Per-session pricing is set at consultation and varies by tattoo size, ink density, and complexity. inkOUT generally positions packages around expected complete-removal session counts rather than around an unlimited-sessions guarantee.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-(--line) bg-(--surface) p-5"
                >
                  <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">
                    {item.title}
                  </p>
                  <p className="font-sans text-[14px] leading-relaxed text-(--ink) m-0">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="font-sans text-[15px] leading-relaxed text-(--ink)">
              Useful framing for cost comparison:
            </p>
            <GuideBulletList
              items={[
                "Per-session price. Both brands set per-session pricing at consultation. Direct per-session comparison requires consultations at both providers.",
                "Total cost certainty. Removery's Complete Removal Package caps total cost. This is meaningful for users uncertain how many sessions their tattoo will need.",
                "Cost-per-result. Both brands target measurable outcomes per session. Cost-per-clear-tattoo (rather than cost-per-session) is the more useful comparison for users planning complete removal.",
                "Consultation cost. Both brands offer free consultations, so two consultations cost nothing and produce two comparable quotes.",
              ]}
            />
            <p className="font-sans text-[15px] leading-relaxed text-(--ink)">
              For national pricing context across all methods and tattoo sizes, see the{" "}
              <Link href="/cost" className="text-(--accent) hover:underline">
                cost guide
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      {/* Results, scarring, pain */}
      <section className="border-b border-(--line) bg-(--surface) py-22">
        <Container>
          <h2 className="font-sans font-bold text-[clamp(20px,3vw,28px)] leading-[1.1] tracking-[-0.02em] text-(--ink) m-0 mb-6">
            inkOUT vs Removery: Results, Scarring, and Pain
          </h2>
          <div className="space-y-4">
            <div className="space-y-3">
              {[
                {
                  title: "Results",
                  body: "Both brands target tattoo clearance. Framing differs. Removery's Complete Removal Package treats results as the package goal across unlimited sessions. Most tattoos clear in the typical 6-to-12-session range for picosecond laser. inkOUT positions complete removal as a primary outcome. Session counts vary by tattoo size and ink density. Neither brand controls every variable that affects clearance. Ink composition, depth, and skin response are case-specific.",
                },
                {
                  title: "Scarring risk",
                  body: "Scarring is method-sensitive and skin-sensitive. Removery's PicoWay is on the lower-risk side of the laser spectrum. TEPR avoids the wavelength-versus-melanin interaction by using a non-laser mechanical mechanism, a structural difference relevant to scarring risk. Provider conservatism with intensity, technique, and session spacing matters more than the brand label. Both brands offer free consultations where you can ask about starting intensity, scarring rate, and what the studio does when a tattoo responds aggressively.",
                },
                {
                  title: "Pain",
                  body: "Most users describe Removery's PicoWay session as similar to a thick rubber band snapping against the skin. Sessions for small tattoos are typically under 10 minutes. inkOUT's TEPR has a different pain profile. Users typically describe it as moderate, comparable to the sensation of getting a tattoo, rather than sharp. Pain tolerance is personal. A consultation is the most reliable way to gauge fit before committing.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-(--line) bg-(--surface) p-5"
                >
                  <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">
                    {item.title}
                  </p>
                  <p className="font-sans text-[14px] leading-relaxed text-(--ink) m-0">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
            <p className="font-sans text-[15px] leading-relaxed text-(--ink)">
              For deeper context on scarring, see{" "}
              <Link href="/guides/tattoo-removal-scarring" className="text-(--accent) hover:underline">
                tattoo removal scarring
              </Link>
              . For visual outcome reference, see the{" "}
              <Link href="/before-and-after" className="text-(--accent) hover:underline">
                before-and-after gallery
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      {/* Use cases: dark skin, color, complete removal */}
      <section className="border-b border-(--line) bg-(--bg) py-22">
        <Container>
          <h2 className="font-sans font-bold text-[clamp(20px,3vw,28px)] leading-[1.1] tracking-[-0.02em] text-(--ink) m-0 mb-6">
            inkOUT vs Removery: Best for Dark Skin, Color Ink, and Complete Removal
          </h2>
          <div className="space-y-4">
            <p className="font-sans text-[15px] leading-relaxed text-(--ink)">
              Three high-stakes use cases drive most inkOUT vs Removery decisions. Each has a
              clear answer based on the structural difference between TEPR and PicoWay.
            </p>

            <div className="space-y-3">
              {[
                {
                  title: "Dark skin",
                  body: "Laser tattoo removal is safe for darker Fitzpatrick skin types in experienced hands. The wavelength-versus-melanin interaction is real. Aggressive laser settings on darker skin carry elevated risk of post-inflammatory hyperpigmentation or hypopigmentation. PicoWay is on the lower-risk side of the laser spectrum compared to Q-switched. Removery providers are typically experienced with adjusting protocols by skin tone. TEPR (inkOUT) avoids the wavelength-versus-melanin interaction by mechanism. For users prioritizing avoidance of any laser-pigment-change risk, TEPR is the structurally lower-risk option.",
                },
                {
                  title: "Color ink",
                  body: "Color ink performance under laser depends on which wavelengths the laser offers and how the ink absorbs at those wavelengths. PicoWay's multi-wavelength platform handles black, blue, red, and green well across most cases. There is some difficulty on light blue, white, and yellow shades. TEPR is not wavelength-bound. Its performance on color ink does not depend on color absorption. For mixed-color tattoos, both brands are reasonable starting points. The determinant is consultation-specific assessment of ink behavior.",
                },
                {
                  title: "Complete removal",
                  body: "This is where inkOUT positions most strongly. TEPR's mechanism is built around lifting ink out of the skin rather than fragmenting and waiting for clearance. Removery's Complete Removal Package is the laser-side equivalent: a structured commitment to full removal across unlimited sessions for a capped price. The choice between them on complete removal is mechanism preference more than outcome difference.",
                },
                {
                  title: "PMU and microblading removal",
                  body: "Cosmetic tattoo removal (microblading, powder brows, lip blush, eyeliner) is harder than body tattoo removal. Cosmetic tattoo inks often contain iron oxides. These can darken paradoxically under laser, a known consideration for any laser removal of cosmetic tattoos. TEPR avoids this risk because it does not use light. inkOUT is structurally well-suited to PMU and microblading cases. Removery handles cosmetic cases as well. Ask specifically about the studio's cosmetic-tattoo experience at consultation.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-(--line) bg-(--surface) p-5"
                >
                  <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">
                    {item.title}
                  </p>
                  <p className="font-sans text-[14px] leading-relaxed text-(--ink) m-0">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Cross-city evidence */}
      <section className="border-b border-(--line) bg-(--surface) py-22">
        <Container>
          <h2 className="font-sans font-bold text-[clamp(20px,3vw,28px)] leading-[1.1] tracking-[-0.02em] text-(--ink) m-0 mb-6">
            Cross-City Review Evidence
          </h2>
          <div className="space-y-4">
            <p className="font-sans text-[15px] leading-relaxed text-(--ink)">
              The evidence below shows how inkOUT and Removery compare across cities where we
              have direct review-sample data. Sample sizes reflect the most recent reviews
              captured per provider location in our internal review dataset. Lifetime Google
              review counts on each provider's business listing are higher than the sample sizes
              shown.
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
                brandB="Removery"
                brandBPendingCities={["Tampa", "Houston"]}
              />
            </Suspense>
            <p className="font-sans text-[15px] leading-relaxed text-(--ink)">
              The table updates as our scrape refreshes. Use the cross-city evidence as a
              reference, not a verdict, since both brands operate in markets not yet fully
              captured in our scrape.
            </p>
          </div>
        </Container>
      </section>

      {/* Pros and cons of inkOUT */}
      <section className="border-b border-(--line) bg-(--bg) py-22">
        <Container>
          <h2 className="font-sans font-bold text-[clamp(20px,3vw,28px)] leading-[1.1] tracking-[-0.02em] text-(--ink) m-0 mb-6">
            Pros and Cons of inkOUT
          </h2>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2">Pros</p>
                <GuideBulletList
                  items={[
                    "Only major non-laser tattoo removal brand at scale in the US market",
                    "Mechanism does not depend on wavelength-versus-color interaction, so color ink performance is not bound by laser color limitations",
                    "Mechanism does not interact with melanin in the way laser does, lowering the structural pigment-change risk for darker skin tones",
                    "Positioned around complete removal as the primary outcome rather than fading",
                    "Well-suited to cosmetic tattoo removal cases where iron-oxide pigments can darken paradoxically under laser",
                    "Free consultations to confirm fit before committing",
                  ]}
                />
              </div>
              <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2">Cons</p>
                <GuideBulletList
                  variant="warning"
                  items={[
                    "Smaller national footprint than mainstream laser chains, so geographic access is limited",
                    "Newer market presence in many cities means smaller public review history versus established laser providers",
                    "Per-session experience differs from laser; users expecting a laser-style appointment should adjust expectations",
                    "TEPR is one mechanism with one performance envelope, so it is not the right answer for every tattoo or every user",
                  ]}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Pros and cons of Removery */}
      <section className="border-b border-(--line) bg-(--surface) py-22">
        <Container>
          <h2 className="font-sans font-bold text-[clamp(20px,3vw,28px)] leading-[1.1] tracking-[-0.02em] text-(--ink) m-0 mb-6">
            Pros and Cons of Removery
          </h2>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2">Pros</p>
                <GuideBulletList
                  items={[
                    "National footprint with multiple locations across major metros, simplifying access and follow-up",
                    "Complete Removal Package model caps total cost regardless of session count, functioning as an effective results guarantee",
                    "Uses Candela PicoWay, a picosecond laser with strong color performance across most inks",
                    "Tattoo-removal-only specialist focus across all locations",
                    "Monthly payment plans within the package model for users spreading cost",
                    "Free consultations and consistent national protocols",
                  ]}
                />
              </div>
              <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2">Cons</p>
                <GuideBulletList
                  variant="warning"
                  items={[
                    "Laser modality carries the standard wavelength-versus-melanin consideration for darker skin tones",
                    "Cosmetic tattoo cases (microblading, powder brows) require careful consultation given the iron-oxide-pigment darkening risk under laser",
                    "Pricing is consultation-set, not published, which adds friction for users wanting a quick price comparison",
                    "Mainstream chain experience may not fit users seeking owner-operated continuity across the treatment series",
                  ]}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Verdict */}
      <section className="border-b border-(--line) bg-(--bg) py-22">
        <Container>
          <h2 className="font-sans font-bold text-[clamp(20px,3vw,28px)] leading-[1.1] tracking-[-0.02em] text-(--ink) m-0 mb-6">
            Our Verdict: inkOUT or Removery?
          </h2>
          <div className="space-y-4">
            <p className="font-sans text-[15px] leading-relaxed text-(--ink)">
              There is no universal winner between inkOUT and Removery. The honest verdict is
              by scenario.
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                <p className="font-sans mb-2 text-[14px] font-semibold text-(--ink)">
                  Choose Removery when:
                </p>
                <GuideBulletList
                  items={[
                    "You want a national chain with multiple locations and consistent protocols",
                    "You want package pricing that caps total cost across unlimited sessions",
                    "Your tattoo is a standard body tattoo without unusual cosmetic-pigment or skin-tone considerations",
                    "You prefer a long-established mainstream laser brand and want a deeper public review history to evaluate against",
                    "A Removery location is genuinely closer or more convenient than the nearest inkOUT location",
                  ]}
                />
              </div>

              <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                <p className="font-sans mb-2 text-[14px] font-semibold text-(--ink)">
                  Choose inkOUT when:
                </p>
                <GuideBulletList
                  items={[
                    "You specifically want a non-laser method, either by preference or by medical reason",
                    "You have a microblading, powder brows, lip blush, or other cosmetic tattoo to remove and want to avoid laser-iron-oxide darkening risk",
                    "You have darker skin and want to avoid the laser-melanin interaction altogether rather than rely on conservative laser settings",
                    "You are prioritizing complete removal as the primary outcome rather than gradual fading",
                    "You are scarring-sensitive and want a structurally different mechanism than laser",
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
                    "You want to compare quotes, session-count estimates, and provider judgment side by side before committing",
                    "You are uncertain which method fits your specific case best",
                  ]}
                />
              </div>
            </div>

            <p className="font-sans text-[15px] leading-relaxed text-(--ink)">
              The decision is not abstract. Most users have only one or two providers within
              reasonable driving distance. Geographic constraints often narrow the choice before
              method preference does. Use the{" "}
              <Link href="/cities/austin" className="text-(--accent) hover:underline">
                city comparison pages
              </Link>{" "}
              and the brand review pages at{" "}
              <Link href="/reviews/inkout" className="text-(--accent) hover:underline">
                /reviews/inkout
              </Link>{" "}
              and{" "}
              <Link href="/reviews/removery" className="text-(--accent) hover:underline">
                /reviews/removery
              </Link>{" "}
              to see which brand actually operates in your market before drawing a verdict.
            </p>
          </div>
        </Container>
      </section>

      {/* Editorial note */}
      <section className="border-b border-(--line) bg-(--surface) py-22">
        <Container>
          <div className="space-y-4">
            <GuideCallout label="Editorial note">
              This comparison synthesizes brand-published technology and pricing material with
              our internal review-sample evidence dataset for both brands. The cross-city
              evidence table renders dynamically from our internal review dataset and refreshes
              as new reviews are scraped. Sample sizes are capped at 50 per provider location;
              total lifetime Google review counts are higher. Sentiment classifications and
              use-case tags are derived from review text analysis. Method and technology details
              are drawn from each brand&rsquo;s published materials. Individual outcomes vary by
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
        </Container>
      </section>

      {/* Related links */}
      <section className="border-b border-(--line) bg-(--bg) py-22">
        <Container>
          <GuideRelatedLinks
            links={[
              {
                href: "/comparisons/best-tattoo-removal-method",
                title: "Best Tattoo Removal Method",
                desc: "Side-by-side comparison of laser, non-laser, and other methods by effectiveness, cost, and risk.",
              },
              {
                href: "/reviews/inkout",
                title: "inkOUT Reviews",
                desc: "Full review sample and provider profiles for inkOUT across all markets.",
              },
              {
                href: "/reviews/removery",
                title: "Removery Reviews",
                desc: "Full review sample and provider profiles for Removery across all markets.",
              },
              {
                href: "/cost",
                title: "Tattoo Removal Cost",
                desc: "National pricing breakdown by method, size, and provider type.",
              },
              {
                href: "/comparisons/picoway-vs-q-switch",
                title: "Pico Laser vs Q-Switch",
                desc: "Deep-dive into picosecond vs Q-switched laser technology for tattoo removal.",
              },
            ]}
          />
        </Container>
      </section>

      <PageSection id="faq" bg="bg">
        <div className="mb-10">
          <MonoLabel color="accent" size="sm" className="mb-4">FAQ</MonoLabel>
          <h2 className="font-sans font-bold text-[clamp(28px,4vw,42px)] leading-[1.05] tracking-[-0.025em] text-(--ink) m-0">
            Frequently Asked Questions
          </h2>
        </div>
        <FaqAccordion items={faqs} />
      </PageSection>
    </div>
  );
}
