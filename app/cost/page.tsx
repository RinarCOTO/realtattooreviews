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
import PageHero from "@/components/layout/PageHero";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import GuideSection from "@/components/guide/GuideSection";
import GuideBulletList from "@/components/guide/GuideBulletList";
import GuideCallout from "@/components/guide/GuideCallout";
import GuideRelatedLinks from "@/components/guide/GuideRelatedLinks";
import FAQSection from "@/components/sections/FAQSection";
import BlobBackground from "@/components/ui/BlobBackground";
import JumpNav from "@/components/provider/JumpNav";

export const metadata: Metadata = {
  title:
    "Tattoo Removal Cost (2026): Prices, Sessions, and What Affects Your Total | RealTattooReviews",
  description:
    "How much does tattoo removal cost? A provider-neutral guide to tattoo removal pricing by size, method, session count, and financing options.",
  alternates: {
    canonical: "https://realtattooreviews.com/cost",
  },
  openGraph: {
    title: "Tattoo Removal Cost (2026): Prices, Sessions, and What Affects Your Total",
    description:
      "How much does tattoo removal cost? A provider-neutral guide to tattoo removal pricing by size, method, session count, and financing options.",
  },
};

const faqs = [
  {
    question: "How much does tattoo removal cost on average?",
    answer:
      "The average cost of tattoo removal per session in the United States is $200 to $400 for a medium-sized tattoo. Total cost for complete removal typically ranges from $1,000 to $10,000 depending on size, ink complexity, and session count.",
  },
  {
    question: "How much does it cost to remove a small tattoo?",
    answer:
      "Small tattoo removal typically costs $75 to $250 per session. Most small tattoos need 3 to 6 sessions for complete removal, putting total cost in the $225 to $1,500 range.",
  },
  {
    question: "Does insurance cover tattoo removal?",
    answer:
      "Standard health insurance does not cover tattoo removal because it is classified as cosmetic. Rare exceptions exist for medically necessary cases. HSA and FSA accounts may apply in limited situations with physician documentation.",
  },
  {
    question: "What is the cheapest way to get a tattoo removed?",
    answer:
      "The cheapest path depends on the tattoo. For small, simple, black-ink tattoos, per-session pricing at a competitive local provider often produces the lowest total cost. For larger tattoos, package pricing that caps total cost can be cheaper than accumulating per-session charges over many sessions. Promotional pricing and Groupon bundles reduce cost but should be evaluated against provider quality.",
  },
  {
    question: "Why is tattoo removal so expensive?",
    answer:
      "Tattoo removal requires specialized equipment ($50,000 to $300,000+ for laser systems), trained providers, clinical facilities, and liability insurance. The multi-session nature of the treatment multiplies the per-session cost into a significant total. The gap between expected and actual session count is where most cost frustration originates.",
  },
  {
    question: "Can you pay for tattoo removal in installments?",
    answer:
      "Yes. Most providers offer payment plans, either through internal financing or third-party services like CareCredit. National chains commonly include monthly payment options within their package pricing. Terms and interest rates vary, so compare options at consultation.",
  },
  {
    question: "How many sessions does tattoo removal take?",
    answer:
      "Most tattoos need 3 to 12 sessions for complete removal. Cover-up fading typically takes 3 to 6 sessions. Sessions are spaced six to eight weeks apart. Session count depends on ink color, density, tattoo age, body location, skin type, and the provider's technology.",
  },
];

const PAGE_PATH = "/cost";
const SITE_URL = "https://realtattooreviews.com";

const jumpItems = [
  { label: "Pricing by Size", href: "#how-much" },
  { label: "Session vs Total", href: "#per-session" },
  { label: "Pricing Factors", href: "#factors" },
  { label: "By Method", href: "#by-method" },
  { label: "Sessions", href: "#session-count" },
  { label: "Insurance", href: "#insurance" },
  { label: "Financing", href: "#financing" },
  { label: "Provider Types", href: "#provider-type" },
  { label: "FAQ", href: "#faq" },
];

export default function CostPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Tattoo Removal Cost", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Tattoo Removal Cost (2026): Prices, Sessions, and What Affects Your Total",
    description:
      "How much does tattoo removal cost? A provider-neutral guide to tattoo removal pricing by size, method, session count, and financing options.",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: [
      "Tattoo removal cost",
      "Laser tattoo removal cost",
      "Tattoo removal financing",
      "Tattoo removal pricing",
      "How much does tattoo removal cost",
    ],
  };

  const faqJsonLd = faqSchema(faqs);

  return (
    <BlobBackground>
    <main className="reviews-page min-h-screen">
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

      <PageHero
        label={
          <>
            <Link href="/" className="hover:text-(--ink) transition-colors">
              Home
            </Link>
            <span className="text-heading font-normal normal-case tracking-normal">/</span>
            <span className="text-heading font-normal normal-case tracking-normal">
              Tattoo Removal Cost
            </span>
          </>
        }
        title={<>Tattoo Removal <span className="text-(--accent)">Cost</span></>}
        subtitle="How much does tattoo removal cost? A provider-neutral guide to tattoo removal pricing by size, method, session count, and financing options."
      />

      <JumpNav items={jumpItems} />

      <section className="py-6">
        <Container>
          <div className="mx-auto max-w-3xl">

            {/* Intro */}
            <div className="py-12 space-y-4">
              <p className="font-sans text-[15px] leading-relaxed text-heading">
                Tattoo removal cost ranges from $100 to $500 per session for most tattoos. Total
                cost for complete removal typically falls between $1,000 and $10,000 depending on
                the tattoo's size, ink density, color complexity, and how many sessions it takes.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-heading">
                That range is wide because every tattoo is different. A small black ankle tattoo
                and a full-color half-sleeve are not the same job. This page breaks down what
                drives tattoo removal pricing, how session count multiplies the total, how
                different methods compare on cost, and what financing options exist. For visual
                proof of what removal looks like over time, see the{" "}
                <Link href="/before-and-after" className="text-(--accent) hover:underline">
                  before-and-after gallery
                </Link>
                .
              </p>
            </div>

            {/* How Much Does It Cost */}
            <GuideSection id="how-much" heading="How Much Does Tattoo Removal Cost?">
              <p className="font-sans text-[15px] leading-relaxed text-heading">
                The average cost of tattoo removal per session in the United States falls between
                $200 and $400 for a medium-sized tattoo. Here is how pricing breaks down by size:
              </p>

              <div className="space-y-2">
                {[
                  {
                    size: "Small (postage stamp to poker chip)",
                    price: "$75 to $250 per session",
                    note: "3 to 6 sessions typical",
                  },
                  {
                    size: "Medium (business card to palm of hand)",
                    price: "$200 to $400 per session",
                    note: "6 to 12 sessions for complete removal",
                  },
                  {
                    size: "Large (postcard to half-sleeve)",
                    price: "$400 to $800 per session",
                    note: "Total can reach $5,000 to $10,000",
                  },
                  {
                    size: "Extra-large (full sleeve, back piece, or larger)",
                    price: "$800+ per session",
                    note: "Quoted individually at consultation",
                  },
                ].map((tier) => (
                  <div
                    key={tier.size}
                    className="rounded-xl border border-(--line) bg-white shadow-[0_1px_3px_0_rgb(0,0,0,0.05)] px-5 py-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-sans text-[14px] font-medium text-(--ink) m-0">{tier.size}</p>
                        <p className="font-sans text-[12px] text-heading m-0 mt-0.5">{tier.note}</p>
                      </div>
                      <p className="font-sans text-[14px] font-semibold text-(--ink) m-0 shrink-0">{tier.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="font-sans text-[15px] leading-relaxed text-heading">
                These ranges reflect national averages across laser and non-laser providers. Local
                pricing varies by city and provider type. For city-specific pricing, see the city
                comparison pages for{" "}
                <Link href="/cities/austin" className="text-(--accent) hover:underline">Austin</Link>
                ,{" "}
                <Link href="/cities/chicago" className="text-(--accent) hover:underline">Chicago</Link>
                ,{" "}
                <Link href="/cities/houston" className="text-(--accent) hover:underline">Houston</Link>
                , and{" "}
                <Link href="/cities/tampa" className="text-(--accent) hover:underline">Tampa</Link>
                .
              </p>
            </GuideSection>

            {/* Per Session vs Total */}
            <GuideSection id="per-session" heading="Tattoo Removal Cost Per Session vs Total Cost">
              <p className="font-sans text-[15px] leading-relaxed text-heading">
                The per-session price is not the number that matters most. Total cost is per-session
                price multiplied by session count. A $150 session that takes 10 sessions costs
                $1,500. A $300 session that takes 5 sessions costs the same.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-heading">
                Most tattoos need 3 to 12 sessions for complete removal. Three to eight sessions is
                typical for cover-up fading. Sessions are spaced six to eight weeks apart, which
                means a full removal series takes 6 months to 2 years or longer.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-heading">
                The session count depends on ink color, ink density, tattoo age, skin type, body
                location, and the provider's technology and technique. Older tattoos and faded ink
                typically clear faster. Dense, saturated, and multi-color tattoos take longer.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-heading">
                For a full breakdown of what healing looks like between sessions, see the{" "}
                <Link
                  href="/guides/tattoo-removal-healing-process"
                  className="text-(--accent) hover:underline"
                >
                  healing process guide
                </Link>
                .
              </p>
            </GuideSection>

            {/* What Affects Pricing */}
            <GuideSection id="factors" heading="What Affects Tattoo Removal Pricing?">
              <p className="font-sans text-[15px] leading-relaxed text-heading">
                Six factors drive most of the price variation across providers and cases.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Tattoo size",
                    body: "This is the primary pricing variable. Most providers use size tiers based on measurements or common comparisons (coin, card, palm, half-sheet). Larger tattoos cost more per session and need more sessions.",
                  },
                  {
                    title: "Ink color and density",
                    body: "Black ink is the easiest to remove with laser. Greens, blues, yellows, and whites are harder. Dense, saturated ink needs more energy and more sessions. Multi-color tattoos often need multiple wavelengths, which can increase per-session cost.",
                  },
                  {
                    title: "Number of sessions",
                    body: "This is the multiplier. A tattoo that clears in 4 sessions costs half as much total as one that takes 8, assuming the same per-session rate. Session count is the hardest variable to predict before treatment begins.",
                  },
                  {
                    title: "Body location",
                    body: "Areas with more blood flow (upper arms, chest, back) tend to clear faster. Areas with less circulation (ankles, fingers, feet, wrists) heal slower and often need more sessions.",
                  },
                  {
                    title: "Provider type and technology",
                    body: "Tattoo-removal-only specialists, national chains, dermatology practices, and med spas all price differently. Picosecond lasers often cost more per session than Q-switched lasers but may need fewer sessions. Non-laser methods have different pricing structures entirely.",
                  },
                  {
                    title: "Geographic market",
                    body: "Pricing is higher in coastal metros and lower in mid-market cities. A session that costs $350 in New York may cost $200 in a smaller Texas market.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-white shadow-[0_1px_3px_0_rgb(0,0,0,0.05)] p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-heading m-0">{item.body}</p>
                  </div>
                ))}
              </div>
            </GuideSection>

            {/* Laser Cost */}
            <GuideSection heading="Laser Tattoo Removal Cost">
              <p className="font-sans text-[15px] leading-relaxed text-heading">
                Laser tattoo removal cost per session typically ranges from $150 to $500 for most
                cases. This covers both picosecond and Q-switched laser systems.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Picosecond lasers (PicoWay, PicoSure, Enlighten)",
                    body: "Tend to cost more per session, often $200 to $500+. They deliver shorter pulses and generally need fewer sessions for the same result, which can make total cost comparable or lower than Q-switched despite the higher per-session rate.",
                  },
                  {
                    title: "Q-switched lasers (Nd:YAG, Alexandrite)",
                    body: "Often priced lower per session, typically $150 to $400. May require more sessions than picosecond systems for the same ink clearance, especially on stubborn colors.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-white shadow-[0_1px_3px_0_rgb(0,0,0,0.05)] p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-heading m-0">{item.body}</p>
                  </div>
                ))}
              </div>

              <p className="font-sans text-[15px] leading-relaxed text-heading">
                The technology affects cost in both directions: a more expensive laser per session
                that clears a tattoo in fewer sessions can cost less total than a cheaper laser
                that takes more sessions. Ask providers about both per-session pricing and estimated
                total session count at consultation.
              </p>
            </GuideSection>

            {/* Cost by Method */}
            <GuideSection id="by-method" heading="Cost by Tattoo Removal Method">
              <p className="font-sans text-[15px] leading-relaxed text-heading">
                Different removal methods carry different cost structures. For a full comparison of
                methods, see the{" "}
                <Link
                  href="/comparisons/best-tattoo-removal-method"
                  className="text-(--accent) hover:underline"
                >
                  best tattoo removal method
                </Link>{" "}
                comparison.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Laser removal",
                    body: "The most common method, typically $150 to $500 per session. Most providers offer per-session pricing, package pricing, or both.",
                  },
                  {
                    title: "Non-laser removal (TEPR and similar methods)",
                    body: "Has a different cost structure. Pricing varies by provider and is often quoted at consultation rather than published. Non-laser methods avoid the wavelength limitations of lasers but serve different case profiles.",
                  },
                  {
                    title: "Saline removal",
                    body: "Used primarily for cosmetic tattoos (microblading, lip blush, eyeliner). Per-session pricing typically ranges from $100 to $350. Sessions are shorter and the treated area is smaller than most body tattoos.",
                  },
                  {
                    title: "Surgical excision",
                    body: "Used rarely and only for very small tattoos. A one-time procedure with costs ranging from $500 to $2,000+ depending on the surgeon and complexity. It trades a single procedure for a surgical scar.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-white shadow-[0_1px_3px_0_rgb(0,0,0,0.05)] p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-heading m-0">{item.body}</p>
                  </div>
                ))}
              </div>
            </GuideSection>

            {/* Why So Expensive */}
            <GuideSection heading="Why Is Tattoo Removal So Expensive?">
              <p className="font-sans text-[15px] leading-relaxed text-heading">
                Tattoo removal is expensive because it is a multi-session medical or aesthetic
                procedure using specialized equipment. The cost reflects the provider's investment
                in laser systems (which range from $50,000 to $300,000+), the clinical training
                required to operate them safely, the facility overhead, and the liability insurance
                required for any procedure that affects skin tissue.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-heading">
                The session count is the biggest cost amplifier. A tattoo that seems small and
                simple might still need 6 to 10 sessions at $200 each. That is $1,200 to $2,000
                for something that felt like it should have been cheaper. The gap between
                expectation and reality is where most frustration comes from.
              </p>
              <GuideCallout label="Practical advice">
                Get two or three consultations, compare quoted session ranges and pricing models,
                and evaluate total estimated cost across the full treatment rather than just the
                per-session headline number.
              </GuideCallout>
            </GuideSection>

            {/* Session Count */}
            <GuideSection id="session-count" heading="How Many Sessions to Remove a Tattoo">
              <p className="font-sans text-[15px] leading-relaxed text-heading">
                Session count is the most important cost variable and the hardest to predict.
                Providers use assessment tools like the Kirby-Desai scale to estimate sessions
                based on ink color, density, location, skin type, and scarring. These estimates
                are useful but not guarantees.
              </p>
              <GuideBulletList
                items={[
                  "Small, simple, black-ink tattoos: 3 to 6 sessions",
                  "Medium, moderate-density tattoos: 5 to 8 sessions",
                  "Large, dense, or multi-color tattoos: 8 to 12+ sessions",
                  "Cover-up fading (not full removal): 3 to 6 sessions",
                  "Cosmetic tattoo removal (microblading, PMU): 2 to 6 sessions depending on method and ink type",
                ]}
              />
              <p className="font-sans text-[15px] leading-relaxed text-heading">
                Sessions are spaced six to eight weeks apart. Some providers space sessions further
                (eight to twelve weeks) for darker skin tones or more conservative treatment
                protocols. For scarring risk and how spacing affects outcomes, see the{" "}
                <Link
                  href="/guides/tattoo-removal-scarring"
                  className="text-(--accent) hover:underline"
                >
                  scarring guide
                </Link>
                .
              </p>
            </GuideSection>

            {/* Insurance */}
            <GuideSection id="insurance" heading="Does Insurance Cover Tattoo Removal?">
              <p className="font-sans text-[15px] leading-relaxed text-heading">
                In most cases, no. Tattoo removal is classified as a cosmetic procedure and is not
                covered by standard health insurance plans. This applies to laser, non-laser, and
                saline removal.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-heading">
                There are rare exceptions. Some insurance plans may cover removal if the tattoo is
                directly related to a medical condition, traumatic injury, or reconstructive need.
                Documentation from a physician is typically required. HSA and FSA accounts can
                sometimes be used for tattoo removal if a provider or physician classifies it as
                medically necessary, though this is uncommon.
              </p>
              <GuideCallout label="Bottom line">
                For most users, tattoo removal is an out-of-pocket expense. Financing and payment
                plans are the main tools for managing the total cost.
              </GuideCallout>
            </GuideSection>

            {/* Financing */}
            <GuideSection id="financing" heading="Tattoo Removal Financing and Payment Plans">
              <p className="font-sans text-[15px] leading-relaxed text-heading">
                Most providers offer some form of cost management beyond pay-per-session pricing.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Package pricing",
                    body: "Bundles a set number of sessions (or unlimited sessions) at a total price that is lower than paying per session individually. National chains commonly offer complete removal packages that cap the total cost regardless of how many sessions are needed. Package pricing is cheaper if you end up needing more sessions than average. Per-session pricing is cheaper if you finish in fewer sessions.",
                  },
                  {
                    title: "Payment plans",
                    body: "Split the total cost into monthly installments. Some providers offer internal financing. Others work with third-party medical financing (CareCredit, Cherry, Prosper Healthcare Lending). Interest rates and terms vary. Read the fine print before signing.",
                  },
                  {
                    title: "Promotional pricing",
                    body: "Appears periodically. Chains and med spas run seasonal discounts, Groupon-style bundles, and referral programs. Per-session promotional pricing can be significantly lower than standard rates, especially for first-time clients.",
                  },
                  {
                    title: "Consultation as cost comparison",
                    body: "Most providers offer free consultations. Getting two or three consultations produces comparable quotes and helps you evaluate total estimated cost, not just the per-session headline number.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-white shadow-[0_1px_3px_0_rgb(0,0,0,0.05)] p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-heading m-0">{item.body}</p>
                  </div>
                ))}
              </div>
            </GuideSection>

            {/* Cost by Provider Type */}
            <GuideSection id="provider-type" heading="Tattoo Removal Cost by Provider Type">
              <p className="font-sans text-[15px] leading-relaxed text-heading">
                Different provider types price differently. Understanding the model helps you
                compare apples to apples.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "National chains",
                    body: "Typically offer package pricing with unlimited sessions at a guaranteed total. Per-session equivalent cost is often higher, but total cost is capped. Chains also tend to offer internal financing and payment plans.",
                  },
                  {
                    title: "Tattoo-removal-only specialists",
                    body: "Often offer per-session pricing with volume discounts. They tend to be more transparent about session estimates because removal is their primary focus.",
                  },
                  {
                    title: "Dermatology practices",
                    body: "Price tattoo removal as one service among many. Per-session rates are often competitive but session estimates can be less specific because removal is not the primary practice focus.",
                  },
                  {
                    title: "Med spas",
                    body: "Vary widely. Some are competitively priced with strong aesthetic equipment. Others bundle removal with other services at higher margins. Ask specifically about the laser system used and the experience of the person performing the treatment.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-(--line) bg-white shadow-[0_1px_3px_0_rgb(0,0,0,0.05)] p-5">
                    <p className="font-sans mb-1 text-[14px] font-semibold text-(--ink)">{item.title}</p>
                    <p className="font-sans text-[14px] leading-relaxed text-heading m-0">{item.body}</p>
                  </div>
                ))}
              </div>

              <p className="font-sans text-[15px] leading-relaxed text-heading">
                For provider-specific reviews and pricing context, see the{" "}
                <Link href="/reviews" className="text-(--accent) hover:underline">
                  provider review pages
                </Link>
                .
              </p>
            </GuideSection>

            {/* Editorial note */}
            <div className="py-12">
              <GuideCallout label="Editorial note">
                Pricing ranges reflect national averages across laser and non-laser providers.
                Individual costs vary by provider, location, and case complexity. See our{" "}
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
                  href: "/before-and-after",
                  title: "Before & After Gallery",
                  desc: "Visual outcomes across methods, skin types, and tattoo sizes.",
                },
                {
                  href: "/comparisons/best-tattoo-removal-method",
                  title: "Best Tattoo Removal Method",
                  desc: "Side-by-side comparison of laser, non-laser, and other methods by effectiveness, cost, and risk.",
                },
                {
                  href: "/guides/tattoo-removal-healing-process",
                  title: "Tattoo Removal Healing Process",
                  desc: "Stage-by-stage breakdown of what happens after each session, from frosting to full recovery.",
                },
                {
                  href: "/reviews",
                  title: "Provider Reviews",
                  desc: "Sourced review evidence and rankings for tattoo removal providers by city.",
                },
              ]}
            />

          </div>
        </Container>
      </section>

      <FAQSection id="faq" faqs={faqs} />
    </main>
    </BlobBackground>
  );
}
