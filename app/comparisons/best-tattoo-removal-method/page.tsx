/*
 * CC BUILD NOTE:
 * - Zero em dashes and zero en dashes anywhere on this page.
 *   Use periods, commas, colons, or parentheses instead.
 * - Never disclose "Rejuvatek Medical" or "Rejuvatek Aesthetics" in user-facing copy.
 *   The brand is "inkOUT" only.
 */
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import GuideSection from "@/components/guide/GuideSection";
import GuideBulletList from "@/components/guide/GuideBulletList";
import GuideTable from "@/components/guide/GuideTable";
import GuideCallout from "@/components/guide/GuideCallout";
import GuideRelatedLinks from "@/components/guide/GuideRelatedLinks";
import MonoLabel from "@/components/reviews/MonoLabel";

export const metadata: Metadata = {
  title:
    "Best Tattoo Removal Method (2026): Laser, Non-Laser, and Saline Compared | RealTattooReviews",
  description:
    "Compare all major tattoo removal methods. Laser vs non-laser, picosecond vs Q-switch, saline vs laser, and which method fits your tattoo, skin type, and goal.",
  alternates: {
    canonical: "https://realtattooreviews.com/comparisons/best-tattoo-removal-method",
  },
  openGraph: {
    title: "Best Tattoo Removal Method (2026): Laser, Non-Laser, and Saline Compared",
    description:
      "Compare all major tattoo removal methods. Laser vs non-laser, picosecond vs Q-switch, saline vs laser, and which method fits your tattoo, skin type, and goal.",
  },
};

const faqs = [
  {
    question: "What is the best tattoo removal method?",
    answer:
      "There is no single best method. Picosecond laser is the most effective for standard body tattoos. Saline is the safest for cosmetic tattoos with iron-oxide pigments. Non-laser methods (TEPR, saline) are structurally lower-risk for darker skin types. Match the method to your case.",
  },
  {
    question: "What is the best laser for tattoo removal?",
    answer:
      "Picosecond lasers (PicoWay, PicoSure, PiQo4) outperform Q-switched on session count, color range, and dark-skin safety.",
  },
  {
    question: "Is laser tattoo removal better than non-laser?",
    answer:
      "For standard body tattoos, laser is typically more efficient. For cosmetic tattoos, dark skin, or cases where laser carries specific pigment risks, non-laser methods may be the better fit.",
  },
  {
    question: "What tattoo removal method works best for dark skin?",
    answer:
      "Non-laser methods (TEPR, saline) are structurally lower-risk because they do not interact with melanin. Picosecond laser at 1064nm is the safest laser option for Fitzpatrick IV through VI.",
  },
  {
    question: "What method is best for microblading removal?",
    answer:
      "Saline removal is the lowest-risk starting point. It avoids iron-oxide paradoxical darkening. TEPR is also well-suited.",
  },
  {
    question: "Does non-laser tattoo removal work?",
    answer:
      "Yes. TEPR and saline removal are established methods with documented results. They are not fringe techniques.",
  },
  {
    question: "What is the safest tattoo removal method?",
    answer:
      "Safety depends on the case. Picosecond laser is safe for most users. Non-laser methods carry lower thermal and melanin-interaction risk. Saline is safest for cosmetic tattoos with iron-oxide pigments.",
  },
  {
    question: "What is the most effective tattoo removal option?",
    answer:
      "For standard body tattoos: picosecond laser. For cosmetic tattoos: saline or TEPR. For complete removal: both laser and non-laser can achieve it through different mechanisms.",
  },
  {
    question: "Does tattoo removal hurt?",
    answer:
      "All methods involve discomfort. Laser is described as a rubber band snapping against the skin. Non-laser methods (TEPR, saline) are described as moderate, similar to getting a tattoo. Neither is painless.",
  },
  {
    question: "Do tattoo removal creams work?",
    answer:
      "No. No published clinical evidence supports tattoo removal cream effectiveness on dermally implanted ink.",
  },
];

const METHOD_TYPES = [
  {
    title: "Laser",
    body: "Uses light energy to shatter ink particles inside the skin. The body clears the fragments through the lymphatic system. Two laser classes: picosecond (PicoWay, PicoSure, PiQo4) and Q-switched (Nd:YAG). Picosecond is the current standard. Q-switched is older but still effective on standard cases.",
  },
  {
    title: "Non-laser mechanical",
    body: "Uses a physical mechanism to lift or extract ink. Two main subtypes: TEPR (Trans-Epidermal Pigment Release, used by inkOUT) lifts ink out through the skin surface. Saline removal uses osmotic lift to draw pigment into a scab. Neither depends on ink color or interacts with melanin.",
  },
  {
    title: "Surgical excision",
    body: "A dermatologist or surgeon cuts out the tattooed skin and sutures the wound closed. Only practical for very small tattoos. Leaves a scar. Rarely used as a first-line method.",
  },
  {
    title: "Dermabrasion",
    body: "Sanding the skin surface to remove layers containing ink. Largely replaced by laser. Higher scarring risk than modern laser or non-laser methods. Rarely recommended today.",
  },
  {
    title: "Topical creams",
    body: "Marketed as painless, at-home tattoo removal. No published clinical evidence supports tattoo removal cream effectiveness on dermally implanted ink. Do not waste money on tattoo removal creams. They do not work.",
  },
];

const COMPARISON_HEADERS = [
  "",
  "Picosecond Laser",
  "Q-Switched Laser",
  "TEPR (Non-Laser)",
  "Saline Removal",
  "Surgical Excision",
];

const COMPARISON_ROWS: React.ReactNode[][] = [
  [
    "How it works",
    "Shatters ink with ultra-short light pulses",
    "Shatters ink with nanosecond light pulses",
    "Lifts ink out through the skin surface",
    "Osmotic lift draws ink into a scab",
    "Surgically removes tattooed skin",
  ],
  [
    "Color dependency",
    "Yes (wavelength-specific)",
    "Yes (more limited)",
    "No",
    "No",
    "No",
  ],
  [
    "Melanin interaction",
    "Yes (reducible with 1064nm)",
    "Yes (higher risk)",
    "No",
    "No",
    "No",
  ],
  [
    "Best for",
    "Standard body tattoos, multi-color, large tattoos",
    "Standard black ink, budget-conscious",
    "Complete removal, dark skin, cosmetic tattoos",
    "Microblading, PMU, cosmetic tattoos",
    "Very small tattoos only",
  ],
  [
    "Sessions (typical)",
    "4 to 8",
    "6 to 12",
    "Varies by case",
    "2 to 6 for PMU",
    "1 (single procedure)",
  ],
  [
    "Pain",
    "Rubber band snap",
    "Rubber band snap",
    "Moderate (similar to tattoo application)",
    "Moderate (similar to tattoo application)",
    "Requires anesthesia",
  ],
  [
    "Scarring risk",
    "Low",
    "Moderate (higher at aggressive settings)",
    "Low",
    "Low (if no picking)",
    "Guaranteed scar",
  ],
  [
    "Cost per session",
    "Higher",
    "Lower",
    "Varies",
    "Lower",
    "High (surgical)",
  ],
  [
    "Availability",
    "Major metros, specialist clinics",
    "Widely available",
    "Limited (fewer providers)",
    "PMU specialists",
    "Dermatologists, surgeons",
  ],
];

const EFFECTIVENESS_CASES = [
  {
    title: "Standard body tattoos with black ink on lighter skin",
    body: "Picosecond laser is the most effective and most efficient method. Fewest sessions, broadest evidence base, widest availability.",
  },
  {
    title: "Multi-color tattoos",
    body: "Picosecond laser with multi-wavelength platforms (PicoWay, PicoSure Pro) handles the broadest color range among laser options. Non-laser methods (TEPR, saline) are not color-dependent and handle all colors without wavelength limitations.",
  },
  {
    title: "Cosmetic tattoos (microblading, PMU)",
    body: "Saline removal is often more effective than laser because it avoids the iron-oxide oxidation risk. TEPR is also well-suited. Laser can work but carries paradoxical darkening risk on iron-oxide pigments.",
  },
  {
    title: "Complete removal (no trace)",
    body: "Both laser and non-laser methods can achieve complete removal. Laser fragments ink for internal clearance over many sessions. TEPR lifts ink out through the skin surface. Saline lifts shallow pigment through osmosis.",
  },
  {
    title: "Cover-up fading",
    body: "Laser is typically the most efficient method for fading a tattoo enough to cover with new ink. Fewer sessions are needed for fading than for complete removal.",
  },
];

const COLOR_ROWS = [
  { ink: "Black, dark blue", body: "All laser platforms handle well at 1064nm." },
  { ink: "Red, orange", body: "Handled at 532nm on both picosecond and Q-switched." },
  {
    ink: "Green, blue-green",
    body: "Requires 785nm (PicoWay) or 755nm (PicoSure). Q-switched Nd:YAG struggles with green.",
  },
  {
    ink: "Yellow, white",
    body: "Difficult for all laser platforms. Low absorption across available wavelengths.",
  },
  {
    ink: "Non-laser (TEPR, saline)",
    body: "Not wavelength-dependent. Performance does not vary by color.",
  },
];

const PROS_CONS = [
  {
    method: "Picosecond laser",
    pros: "Fewest sessions, broadest color range, largest evidence base, widest availability.",
    cons: "Higher per-session cost, melanin interaction on darker skin, ineffective on yellow and white.",
  },
  {
    method: "Q-switched laser",
    pros: "Widely available, lower per-session cost, long track record.",
    cons: "More sessions, limited color range, higher thermal damage at aggressive settings, higher melanin risk.",
  },
  {
    method: "TEPR",
    pros: "Not color-dependent, no melanin interaction, positioned for complete removal, suited for cosmetic tattoos and dark skin.",
    cons: "Fewer providers, newer market presence, smaller public review base.",
  },
  {
    method: "Saline",
    pros: "Not color-dependent, no melanin interaction, lowest risk for PMU pigments, generally cheapest per session.",
    cons: "Limited to small treatment areas, not practical for large body tattoos, requires conservative technician to avoid scarring.",
  },
  {
    method: "Surgical excision",
    pros: "Single procedure, immediate removal.",
    cons: "Guaranteed scar, only for very small tattoos, rarely recommended as first-line.",
  },
  {
    method: "Tattoo removal creams",
    pros: "None.",
    cons: "Do not work. No clinical evidence. Do not buy them.",
  },
];

const PAGE_PATH = "/comparisons/best-tattoo-removal-method";
const SITE_URL = "https://realtattooreviews.com";

export default function BestTattooRemovalMethodPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Comparisons", href: "/comparisons" },
    { name: "Best Tattoo Removal Method", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Tattoo Removal Method (2026): Laser, Non-Laser, and Saline Compared",
    description:
      "Compare all major tattoo removal methods. Laser vs non-laser, picosecond vs Q-switch, saline vs laser, and which method fits your tattoo, skin type, and goal.",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: [
      "Tattoo removal methods",
      "Picosecond laser",
      "TEPR",
      "Saline tattoo removal",
      "Laser vs non-laser",
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
            <Link href="/comparisons" className="hover:text-(--ink) transition-colors">
              Comparisons
            </Link>
            <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
            <span className="text-(--muted) font-normal normal-case tracking-normal">
              Best Tattoo Removal Method
            </span>
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            Best Tattoo{" "}
            <span className="text-(--accent)">Removal Method</span>
          </h1>

          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--muted) max-w-2xl">
            Compare all major tattoo removal methods. Laser vs non-laser, picosecond vs Q-switch,
            saline vs laser, and which method fits your tattoo, skin type, and goal.
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
                  The best tattoo removal method depends on your tattoo, your skin, and your goal.
                  Laser is the most common. It is not always the best fit. Non-laser methods exist
                  for cases where laser carries specific risks. Saline removal exists for cosmetic
                  tattoos where laser can make things worse.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  This page compares every major method across the same criteria: how it works,
                  what it is best for, what it is worst for, effectiveness, pain, scarring risk,
                  sessions, and cost. For deeper dives into individual methods or head-to-head brand
                  comparisons, use the links throughout this page.
                </p>
              </div>
            </div>

            {/* Types of Methods */}
            <GuideSection heading="Types of Tattoo Removal Methods">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Tattoo removal methods fall into three categories: laser, non-laser mechanical, and
                topical. Only the first two produce reliable results.
              </p>
              <div className="space-y-3">
                {METHOD_TYPES.map((item) => (
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

            {/* Comparison Table */}
            <GuideSection heading="Tattoo Removal Methods Compared">
              <GuideTable headers={COMPARISON_HEADERS} rows={COMPARISON_ROWS} />
            </GuideSection>

            {/* Laser vs Non-Laser */}
            <GuideSection heading="Laser vs Non-Laser Tattoo Removal">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                The laser vs non-laser decision is the first fork in the road. Everything else
                follows from this choice.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2 uppercase tracking-wider">
                    Choose laser when
                  </p>
                  <GuideBulletList
                    items={[
                      "You have a standard body tattoo (especially medium to large)",
                      "Your tattoo is predominantly black ink on lighter skin",
                      "You want access to the widest range of providers and the deepest clinical evidence base",
                      "You want the fastest per-session coverage on larger surface areas",
                    ]}
                  />
                </div>
                <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                  <p className="font-sans text-[12px] font-semibold text-(--ink) mb-2 uppercase tracking-wider">
                    Choose non-laser when
                  </p>
                  <GuideBulletList
                    items={[
                      "You have a cosmetic tattoo (microblading, powder brows, lip liner, eyeliner) with iron-oxide or titanium-dioxide pigments",
                      "You have darker skin and want to avoid any laser-melanin interaction",
                      "You are prioritizing complete removal as the primary outcome",
                      "You are scarring-sensitive and want a method that does not involve thermal energy",
                    ]}
                  />
                </div>
              </div>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                For the head-to-head brand comparison between the largest non-laser and laser
                providers, see{" "}
                <Link
                  href="/comparisons/inkout-vs-removery"
                  className="text-(--accent) hover:underline"
                >
                  inkOUT vs Removery
                </Link>
                . For saline vs laser specifically, see{" "}
                <Link
                  href="/comparisons/saline-vs-laser-tattoo-removal"
                  className="text-(--accent) hover:underline"
                >
                  saline vs laser tattoo removal
                </Link>
                .
              </p>
            </GuideSection>

            {/* Which Is Most Effective */}
            <GuideSection heading="Which Tattoo Removal Method Is Most Effective?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Effectiveness depends on the case, not the method alone. No method removes every
                tattoo perfectly in every situation.
              </p>
              <div className="space-y-3">
                {EFFECTIVENESS_CASES.map((item) => (
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

            {/* Dark Skin */}
            <GuideSection heading="Best Tattoo Removal Method for Dark Skin">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Dark skin tattoo removal requires extra attention to the wavelength-versus-melanin
                interaction that affects all laser methods.
              </p>
              <div className="space-y-3">
                {[
                  {
                    title: "Picosecond laser at 1064nm",
                    body: "The safest laser option for Fitzpatrick IV through VI skin types. The 1064nm wavelength has the lowest melanin absorption. Picosecond pulse duration reduces thermal damage compared to Q-switched.",
                  },
                  {
                    title: "Q-switched Nd:YAG at 1064nm",
                    body: "Viable with conservative settings and an experienced provider. Higher thermal profile than picosecond means higher risk at equivalent energy levels.",
                  },
                  {
                    title: "Non-laser methods (TEPR, saline)",
                    body: "Do not interact with melanin because they do not use light energy. For users who want to eliminate any laser-melanin interaction, non-laser is the structurally lower-risk option.",
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
                See{" "}
                <Link
                  href="/categories/dark-skin-tattoo-removal"
                  className="text-(--accent) hover:underline"
                >
                  dark skin tattoo removal
                </Link>{" "}
                for provider-level guidance.
              </p>
            </GuideSection>

            {/* Color Ink */}
            <GuideSection heading="Best Tattoo Removal Method for Color Ink">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Color ink performance under laser depends on which wavelengths the laser offers.
              </p>
              <div className="space-y-2">
                {COLOR_ROWS.map((row) => (
                  <div
                    key={row.ink}
                    className="flex gap-4 rounded-xl border border-(--line) bg-(--surface) px-5 py-4"
                  >
                    <p className="font-sans text-[14px] font-semibold text-(--ink) m-0 shrink-0 w-40">
                      {row.ink}
                    </p>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                      {row.body}
                    </p>
                  </div>
                ))}
              </div>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                See{" "}
                <Link
                  href="/categories/color-ink-removal"
                  className="text-(--accent) hover:underline"
                >
                  color ink removal
                </Link>{" "}
                for provider-level guidance.
              </p>
            </GuideSection>

            {/* Microblading and PMU */}
            <GuideSection heading="Best Method for Microblading and PMU Removal">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Cosmetic tattoo removal is a separate category. The pigments, the depth, and the
                risks are different from body tattoo removal.
              </p>
              <div className="space-y-3">
                {[
                  {
                    title: "Saline removal",
                    body: "The lowest-risk starting point for microblading, powder brows, lip liner, and eyeliner. Avoids iron-oxide oxidation and titanium-dioxide darkening. Works best on the shallow pigment depth typical of cosmetic tattoos. Most cases complete in 2 to 4 sessions.",
                  },
                  {
                    title: "TEPR",
                    body: "Also well-suited to cosmetic tattoos. Avoids all laser-pigment interaction risks.",
                  },
                  {
                    title: "Laser",
                    body: "Can work on cosmetic tattoos with experienced providers using conservative settings and appropriate wavelengths (1064nm is safer than 532nm or 755nm for iron-oxide pigments). The paradoxical darkening risk is structural. Always ask the provider about their specific experience with cosmetic tattoo pigments.",
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
                See{" "}
                <Link
                  href="/categories/microblading-removal"
                  className="text-(--accent) hover:underline"
                >
                  microblading removal
                </Link>{" "}
                and{" "}
                <Link
                  href="/categories/permanent-makeup-removal"
                  className="text-(--accent) hover:underline"
                >
                  permanent makeup removal
                </Link>
                .
              </p>
            </GuideSection>

            {/* Pros and Cons */}
            <GuideSection heading="Tattoo Removal Options: Pros and Cons">
              <div className="space-y-3">
                {PROS_CONS.map((item) => (
                  <div
                    key={item.method}
                    className="rounded-xl border border-(--line) bg-(--surface) p-5"
                  >
                    <p className="font-sans text-[14px] font-semibold text-(--ink) mb-2">
                      {item.method}
                    </p>
                    <p className="font-sans text-[13px] leading-relaxed text-(--muted) m-0">
                      <span className="font-medium text-(--ink)">Pros:</span> {item.pros}
                    </p>
                    <p className="font-sans text-[13px] leading-relaxed text-(--muted) m-0 mt-1">
                      <span className="font-medium text-(--ink)">Cons:</span> {item.cons}
                    </p>
                  </div>
                ))}
              </div>
            </GuideSection>

            {/* Editorial note */}
            <div className="py-12">
              <GuideCallout label="Editorial note">
                This guide is educational and reflects published clinical understanding of tattoo
                removal methods. Individual outcomes vary. Always consult a qualified provider
                before proceeding. inkOUT is a current advertising client of RealTattooReviews and
                is evaluated under the same framework as all other providers. See our{" "}
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
                  desc: "Head-to-head comparison of TEPR and picosecond laser across outcomes, pricing, dark skin, and PMU removal.",
                },
                {
                  href: "/comparisons/saline-vs-laser-tattoo-removal",
                  title: "Saline vs Laser Tattoo Removal",
                  desc: "Full comparison across PMU, microblading, scarring risk, color ink, and cost.",
                },
                {
                  href: "/guides/saline-tattoo-removal",
                  title: "Saline Tattoo Removal Guide",
                  desc: "How saline removal works, which cases it handles best, and what to expect.",
                },
                {
                  href: "/guides/tattoo-removal-scarring",
                  title: "Tattoo Removal Scarring",
                  desc: "Scarring risk by method, skin type, and provider. What to do if scarring occurs.",
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
