import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Container from "@/components/layout/Container";
import PageSection from "@/components/reviews/PageSection";
import FAQSection from "@/components/sections/FAQSection";
import { breadcrumbSchema } from "@/lib/seo/schema";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Tattoo Removal Comparisons: Methods, Brands, and Technology Compared | RealTattooReviews",
  description:
    "Side-by-side comparisons of tattoo removal providers and methods. inkOUT vs Removery, Removery vs LaserAway, saline vs laser, pico vs Q-switch, and more. Based on real patient reviews.",
  alternates: {
    canonical: "https://realtattooreviews.com/comparisons",
  },
  openGraph: {
    title: "Tattoo Removal Comparisons: Methods, Brands, and Technology Compared",
    description:
      "Side-by-side provider and method comparisons based on real patient reviews. Brands, lasers, and techniques compared by city.",
  },
};

const faqs = [
  {
    question: "Which tattoo removal provider is best overall?",
    answer:
      "There is no single best provider for every case. The right choice depends on your tattoo type, location, skin tone, and budget. Use the comparison pages to see how providers perform on specific use cases and in specific cities before deciding.",
  },
  {
    question: "Is picosecond laser better than Q-switched laser?",
    answer:
      "Picosecond lasers (like PicoWay and PicoSure) deliver energy in shorter pulses than Q-switched lasers, which can improve ink shattering and may reduce treatment sessions for some ink types. However, the operator's skill and protocol matter as much as the machine. See the full pico vs Q-switch comparison for a detailed breakdown.",
  },
  {
    question: "How are these comparisons built?",
    answer:
      "Each comparison page pulls live review evidence from our Supabase dataset of classified Google reviews. Sample sizes, sentiment scores, scarring signals, and use-case win counts are calculated from real patient review text, not editorial opinion. See our methodology page for the full scoring framework.",
  },
];

const BRAND_COMPARISONS = [
  {
    title: "inkOUT vs Removery",
    description:
      "Side-by-side review evidence across Austin, Chicago, Houston, and Tampa. Compares TEPR (saline) technology against laser on sentiment, scarring signals, and use-case fit.",
    href: "/comparisons/inkout-vs-removery",
    live: true,
  },
  {
    title: "Removery vs LaserAway",
    description:
      "Two national laser chains compared by city. Review sample sizes, average star ratings, positive sentiment rates, and use-case wins side by side.",
    href: "/comparisons/removery-vs-laseraway",
    live: true,
  },
  {
    title: "inkOUT vs LaserAway",
    description:
      "TEPR vs PicoSure comparison. Specialist vs chain framing, dark skin safety, color ink, and use-case fit side by side.",
    href: "/comparisons/inkout-vs-laseraway",
    live: true,
  },
];

const TECH_COMPARISONS = [
  {
    title: "Best Tattoo Removal Method",
    description:
      "A full breakdown of all major removal methods: picosecond laser, Q-switched laser, saline, TEPR, and others. How to choose based on your case.",
    href: "/comparisons/best-tattoo-removal-method",
    live: true,
  },
  {
    title: "Saline vs Laser Tattoo Removal",
    description:
      "When saline removal outperforms laser and when it does not. Use-case fit, pain, healing, and scar risk compared using patient review evidence.",
    href: "/comparisons/saline-vs-laser-tattoo-removal",
    live: true,
  },
  {
    title: "Picosecond vs Q-Switched Laser",
    description:
      "Pico and Q-switch laser technologies compared on ink types, skin tones, treatment count expectations, and real patient outcomes. Coming soon.",
    href: "/comparisons/picoway-vs-q-switch",
    live: true,
  },
];

function ComparisonCard({
  title,
  description,
  href,
  live,
}: {
  title: string;
  description: string;
  href: string | null;
  live: boolean;
}) {
  if (!live) {
    return (
      <div className="flex flex-col rounded-xl border border-(--line) bg-(--surface) p-6 opacity-60">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full border border-(--line) px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-(--subtle)">
            Coming soon
          </span>
        </div>
        <h3 className="mb-2 text-[17px] font-semibold leading-snug text-(--ink)">{title}</h3>
        <p className="flex-1 text-[14px] leading-relaxed text-(--muted)">{description}</p>
      </div>
    );
  }

  return (
    <Link
      href={href!}
      className="group flex flex-col rounded-xl border border-(--line) bg-(--surface) p-6 transition hover:border-(--accent)"
    >
      <h3 className="mb-2 text-[17px] font-semibold leading-snug text-(--ink) group-hover:text-(--accent)">
        {title}
      </h3>
      <p className="mb-4 flex-1 text-[14px] leading-relaxed text-(--muted)">{description}</p>
      <span className="text-sm font-medium text-(--accent)">Read comparison</span>
    </Link>
  );
}

export default function ComparisonsPage() {
  const crumbs = breadcrumbSchema([
    { name: "Home", href: "https://realtattooreviews.com" },
    { name: "Comparisons", href: "https://realtattooreviews.com/comparisons" },
  ]);

  return (
    <main className="comparison-page min-h-screen bg-(--bg)">
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />

      <PageHero
        label="Comparisons"
        title={<>Tattoo Removal <span className="text-(--accent)">Comparisons</span></>}
        subtitle="Compare before you book. Each page below puts two providers or two methods side by side using real patient review evidence: sample sizes, sentiment rates, scarring signals, and use-case wins. No editorial opinion. No sponsored rankings."
      />

      {/* Body */}
      <PageSection bg="bg">
        <div className="space-y-14">

            {/* Intro */}
            <div className="space-y-4">
              <p className="text-[15px] leading-relaxed text-(--ink)">
                Choosing a tattoo removal provider or method without comparing your options is one of
                the most common mistakes patients make. Providers vary significantly by technology,
                specialty, price, and outcome quality depending on tattoo type and skin tone. Method
                comparisons matter even more: the right technique for microblading removal is not the
                same as the right technique for a saturated multi-color sleeve.
              </p>
              <p className="text-[15px] leading-relaxed text-(--muted)">
                The pages below use live review evidence from our classified dataset to make those
                tradeoffs concrete. See our{" "}
                <Link href="/methodology" className="font-medium text-(--accent) hover:underline">
                  methodology page
                </Link>{" "}
                for how scores and signals are calculated.
              </p>
            </div>

            {/* Brand Comparisons */}
            <div className="space-y-6">
              <div>
                <h2 className="text-[26px] font-bold text-(--ink)">Brand Comparisons</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-(--muted)">
                  Provider-to-provider comparisons with city-level review breakdowns. Each page shows
                  sample sizes, average star ratings, positive sentiment percentages, and use-case
                  win counts for every covered city.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {BRAND_COMPARISONS.map((c) => (
                  <ComparisonCard key={c.title} {...c} />
                ))}
              </div>
            </div>

            {/* Technology Comparisons */}
            <div className="space-y-6">
              <div>
                <h2 className="text-[26px] font-bold text-(--ink)">Technology Comparisons</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-(--muted)">
                  Method-to-method comparisons covering how each technology performs by ink type,
                  skin tone, treatment count, pain, scarring risk, and documented patient outcomes.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {TECH_COMPARISONS.map((c) => (
                  <ComparisonCard key={c.title} {...c} />
                ))}
              </div>
            </div>

            {/* How to use */}
            <div className="space-y-5">
              <h2 className="text-[26px] font-bold text-(--ink)">How to Use These Pages</h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Start with your use case",
                    body: "Are you removing a tattoo completely, fading for a cover-up, or addressing microblading or permanent makeup? Use-case fit differs between providers and methods. Every comparison page shows use-case win counts from our classified review dataset.",
                  },
                  {
                    title: "Check the city-level data",
                    body: "National chains vary significantly by location. A provider with strong aggregate scores may have a weak location in your city. Brand comparison pages break scores down by city so you can see what the evidence looks like where you actually live.",
                  },
                  {
                    title: "Look at sample sizes",
                    body: "A 90% positive rate from 6 reviews means something different from a 90% positive rate from 48 reviews. Sample sizes are shown on every comparison table. Small samples are flagged explicitly.",
                  },
                  {
                    title: "Use comparisons alongside provider profiles",
                    body: "Comparison pages show aggregate signals. Provider profile pages show location-specific detail, best-for and not-ideal-for summaries, and city context. Use both.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-xl border border-(--line) bg-(--surface) p-5">
                    <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-(--accent)" />
                    <div>
                      <p className="text-[15px] font-semibold text-(--ink)">{item.title}</p>
                      <p className="mt-1 text-[14px] leading-relaxed text-(--muted)">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related */}
            <div className="space-y-4">
              <h2 className="text-[22px] font-bold text-(--ink)">Related</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Provider directory", href: "/providers" },
                  { label: "City guides", href: "/cities/austin" },
                  { label: "Category guides", href: "/categories" },
                  { label: "Scoring methodology", href: "/methodology" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between rounded-lg border border-(--line) bg-(--surface) px-4 py-3 text-[14px] font-medium text-(--ink) transition hover:border-(--accent) hover:text-(--accent)"
                  >
                    {link.label}
                    <span className="text-(--muted)">→</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Editorial note */}
            <div className="rounded-xl border border-(--line) bg-(--surface) p-5 text-[14px] leading-relaxed text-(--muted)">
              <p className="font-semibold text-(--ink)">Editorial note</p>
              <p className="mt-2">
                Comparison pages on RealTattooReviews use live review evidence, not editorial
                opinion. Rankings and win counts are produced by our scoring framework applied
                consistently across all providers. inkOUT is a current advertising client and is
                evaluated under the same framework as every other provider. See the{" "}
                <Link href="/editorial-policy" className="font-medium text-(--accent) hover:underline">
                  editorial policy
                </Link>{" "}
                for full disclosure.
              </p>
            </div>

        </div>
      </PageSection>

      <FAQSection faqs={faqs} />
    </main>
  );
}
