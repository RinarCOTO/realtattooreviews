import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import GuideSection from "@/components/guide/GuideSection";
import GuideBulletList from "@/components/guide/GuideBulletList";
import GuideCallout from "@/components/guide/GuideCallout";
import MonoLabel from "@/components/reviews/MonoLabel";

export const metadata: Metadata = {
  title:
    "Tattoo Removal by City: Compare Local Providers in Your Metro | RealTattooReviews",
  description:
    "Find and compare tattoo removal providers in your city. Austin, Chicago, Houston, and Tampa Bay covered with rankings, reviews, pricing, and method breakdowns.",
  alternates: {
    canonical: "https://realtattooreviews.com/cities",
  },
  openGraph: {
    title: "Tattoo Removal by City: Compare Local Providers in Your Metro",
    description:
      "Find and compare tattoo removal providers in your city. Austin, Chicago, Houston, and Tampa Bay covered with rankings, reviews, pricing, and method breakdowns.",
  },
};

const faqs = [
  {
    question: "How do you choose which cities to cover?",
    answer:
      "We cover cities where we have sufficient review-sample data to produce meaningful provider rankings. Coverage expands as our scraping captures additional markets.",
  },
  {
    question: "How many providers do you track per city?",
    answer:
      "It varies. Each city page tracks every provider in our review dataset for that metro, plus prose mentions of additional providers verified through Google Places but not yet in our dataset. Those providers appear with a Review sample pending badge.",
  },
  {
    question: "Are city rankings the same as national rankings?",
    answer:
      "No. City rankings are generated from location-level review data for that specific metro. A provider's ranking in Austin is independent of their ranking in Chicago. For cross-city brand comparison, see the comparison pages.",
  },
  {
    question: "Can a provider pay to rank higher in a city?",
    answer:
      "No. Rankings are generated from review-sample evidence using the same methodology across all cities. No provider can pay for placement.",
  },
];

const CITIES = [
  {
    href: "/cities/austin",
    name: "Austin, TX",
    tagline: "Austin, Round Rock, and the greater Austin metro",
    desc: "Four tracked providers including MEDermis (tattoo-removal-only specialist), Removery (national chain), Clean Slate (affordable local option), and inkOUT (non-laser).",
  },
  {
    href: "/cities/chicago",
    name: "Chicago, IL",
    tagline: "Chicago neighborhoods and the near suburbs",
    desc: "Four tracked providers including Removery (two locations), Kovak Cosmetic Center (established Q-switch practice), Enfuse Medical Spa (PicoWay), and inkOUT (non-laser).",
  },
  {
    href: "/cities/houston",
    name: "Houston, TX",
    tagline: "Greater Houston including the Heights, Galleria, and Energy Corridor",
    desc: "Three tracked providers including DermSurgery Associates (dermatologist-supervised), InkFree MD (physician-owned), and inkOUT (non-laser).",
  },
  {
    href: "/cities/tampa",
    name: "Tampa Bay, FL",
    tagline: "Tampa, St. Petersburg, Clearwater, and the wider Tampa Bay metro",
    desc: "Five tracked providers including Arviv Medical Aesthetics, Erasable Med Spa, Skintellect, Removery, and inkOUT (non-laser).",
  },
];

const HOW_IT_WORKS = [
  {
    title: "Dynamic provider ranking",
    body: "A ranked list generated from our review-sample data. Rankings update as new reviews are scraped. Sentiment scores, sample sizes, and use-case wins are shown per provider.",
  },
  {
    title: "Provider profiles",
    body: "Static prose describing what each clinic is, where it is located, what technology it uses, and who it serves best. Every profile includes a best-for and a less-ideal-for section.",
  },
  {
    title: "Comparison table",
    body: "An at-a-glance table showing all providers side by side on method, technology, review data, and fit.",
  },
  {
    title: "Pricing context",
    body: "Per-session and total-cost ranges specific to the metro market.",
  },
  {
    title: "FAQ section",
    body: "Answers to the most common local search queries for each city.",
  },
];

const PAGE_PATH = "/cities";
const SITE_URL = "https://realtattooreviews.com";

export default function CitiesIndexPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Cities", href: PAGE_PATH },
  ]);

  const faqJsonLd = faqSchema(faqs);

  return (
    <div className="reviews-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="border-b border-(--line) pt-20 pb-16 bg-(--feathering-mist)">
        <Container>
          <MonoLabel color="accent" size="sm" className="mb-5">
            Cities
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            Tattoo Removal{" "}
            <span className="text-(--accent)">by City</span>
          </h1>

          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--muted) max-w-2xl">
            Find and compare every tracked tattoo removal provider in your metro. Rankings, review
            evidence, pricing, and method breakdowns — no provider pays for placement.
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
                  Tattoo removal is a local decision. The best provider for you is one you can
                  reach, afford, and trust across a treatment series that may span 6 to 18 months.
                  The city pages below compare every tracked provider in each metro area so you can
                  make that decision based on evidence.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
                  Each city page covers which providers operate in your market, what technology each
                  uses, how their review evidence stacks up, what each charges, and who each
                  provider serves best. Rankings are generated from our review-sample analysis and
                  refresh as new data enters our dataset. No provider pays for placement.
                </p>
              </div>
            </div>

            {/* Covered Cities */}
            <GuideSection heading="Covered Cities">
              <div className="space-y-3">
                {CITIES.map((city) => (
                  <Link
                    key={city.href}
                    href={city.href}
                    className="group flex flex-col rounded-xl border border-(--line) bg-(--surface) p-5 transition hover:border-(--accent) hover:bg-(--surface)"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-sans text-[16px] font-semibold text-(--ink) m-0 group-hover:text-(--accent) transition-colors">
                          {city.name}
                        </p>
                        <p className="font-sans text-[12px] text-(--muted) m-0 mt-0.5 uppercase tracking-wider">
                          {city.tagline}
                        </p>
                      </div>
                      <span className="font-sans text-[13px] font-medium text-(--accent) shrink-0 mt-0.5">
                        View →
                      </span>
                    </div>
                    <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0 mt-3">
                      {city.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </GuideSection>

            {/* How City Pages Work */}
            <GuideSection heading="How City Pages Work">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                Each city page follows the same structure.
              </p>
              <div className="space-y-3">
                {HOW_IT_WORKS.map((item) => (
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

            {/* Your city is not listed */}
            <GuideSection heading="Your City Is Not Listed?">
              <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
                We are expanding coverage as our review dataset grows. If your city is not listed:
              </p>
              <GuideBulletList
                items={[
                  "Check the providers page to see if a national chain (Removery, LaserAway, inkOUT) has a location near you.",
                  "Use the comparison pages to understand the method and brand differences before booking a consultation.",
                  "Use the category pages to filter by your specific use case (microblading, dark skin, color ink, etc.).",
                ]}
              />
              <div className="flex flex-wrap gap-3 mt-2">
                <Link
                  href="/providers"
                  className="inline-flex items-center rounded-lg border border-(--line) bg-(--surface) px-4 py-2 font-sans text-[13px] font-medium text-(--ink) hover:border-(--accent) hover:text-(--accent) transition-colors"
                >
                  Browse providers
                </Link>
                <Link
                  href="/comparisons"
                  className="inline-flex items-center rounded-lg border border-(--line) bg-(--surface) px-4 py-2 font-sans text-[13px] font-medium text-(--ink) hover:border-(--accent) hover:text-(--accent) transition-colors"
                >
                  Comparison pages
                </Link>
                <Link
                  href="/categories"
                  className="inline-flex items-center rounded-lg border border-(--line) bg-(--surface) px-4 py-2 font-sans text-[13px] font-medium text-(--ink) hover:border-(--accent) hover:text-(--accent) transition-colors"
                >
                  Category pages
                </Link>
              </div>
            </GuideSection>

            {/* Editorial note */}
            <div className="py-12">
              <GuideCallout label="Editorial note">
                City pages are generated from our internal review dataset (Supabase) and verified
                against Google Places data. Provider rankings refresh as new reviews are scraped.
                inkOUT is a current advertising client of RealTattooReviews and is evaluated under
                the same framework as every other provider. See our{" "}
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
