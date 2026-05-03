export const revalidate = 3600;

import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { organizationSchema } from "@/lib/seo/schema";
import ProviderCard from "@/components/cards/ProviderCard";
import CityCard from "@/components/cards/CityCard";
import Hero from "@/components/sections/home/Hero";
import StatsRow from "@/components/sections/home/StatsRow";
import CategoryTabs from "@/components/sections/home/CategoryTabs";
import HowItWorks from "@/components/sections/home/HowItWorks";
import IsItWorthIt from "@/components/sections/home/IsItWorthIt";
import CTASection from "@/components/sections/home/CTASection";
import FAQSection, { type FAQItem } from "@/components/sections/FAQSection";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import HorizontalScrollWithBar from "@/components/ui/HorizontalScrollWithBar";
import ChevronRightIcon from "@/components/ui/ChevronRightIcon";
import { providers } from "@/lib/mock-data/providers";
import type { Provider } from "@/types/provider";
import { getHighestRatedProviders } from "@/lib/data/reviews";
import { cities } from "@/lib/mock-data/cities";
import { getHomepageCMS } from "@/lib/page-data/homepage-cms";

const FALLBACK_TITLE = "RealTattooReviews: Compare Tattoo Removal Clinics Before You Book";
const FALLBACK_DESC = "Compare tattoo removal providers by method, technology, city, and review evidence. Sourced from public Google reviews across multiple US markets.";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getHomepageCMS();
  const title = cms?.seoTitle ?? FALLBACK_TITLE;
  const description = cms?.seoDescription ?? FALLBACK_DESC;
  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description: cms?.seoDescription ?? FALLBACK_DESC,
      ...(cms?.seoImage?.url ? { images: [{ url: cms.seoImage.url, alt: cms.seoImage.alt ?? "" }] } : {}),
    },
    alternates: {
      canonical: "https://realtattooreviews.com",
    },
  };
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RealTattooReviews",
  url: "https://realtattooreviews.com",
};

/** Flatten Sanity PortableText blocks to a single plain-text string for JSON-LD. */
function portableTextToPlainText(blocks: PortableTextBlock[] | undefined | null): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      const b = block as { _type?: string; children?: Array<{ text?: string }> };
      if (b._type !== "block" || !Array.isArray(b.children)) return "";
      return b.children.map((child) => child?.text ?? "").join("");
    })
    .filter(Boolean)
    .join("\n\n")
    .trim();
}

const HOMEPAGE_FAQ_DEFAULTS: FAQItem[] = [
  {
    question: "How are reviews collected?",
    answer: "We source reviews from public Google business listings for every provider and location we track. We do not accept reviews submitted directly to us. We do not use provider-owned testimonials.",
  },
  {
    question: "Does RealTattooReviews accept payment from providers?",
    answer: "No. We are not affiliated with any tattoo removal provider and do not accept payment for coverage, placement, or ratings. All reviews reflect independent findings.",
  },
  {
    question: "How are provider ratings calculated?",
    answer: "Ratings are based on a scored methodology covering result outcomes, session consistency, pricing transparency, and patient communication. The full scoring model is published on our methodology page.",
  },
  {
    question: "Why do some providers have low ratings?",
    answer: "We publish findings as they are, including negative ones. A low rating reflects consistent patterns across multiple reviews, not a single complaint. We do not suppress unfavorable results.",
  },
  {
    question: "How often is coverage updated?",
    answer: "Provider pages and ratings are reviewed on a rolling basis as new reviews are submitted. The last update date is shown on each provider page.",
  },
];


export default async function HomePage() {
  const [cms, liveRankings] = await Promise.all([
    getHomepageCMS(),
    getHighestRatedProviders(6, 48),
  ]);

  const highestRatedProviders: Provider[] = liveRankings.map(({ brandName, avgRating, reviewCount }) => {
    const locationCount = providers.filter(
      (p) => (p.brand ?? p.name) === brandName
    ).length;
    const primary = providers
      .filter((p) => (p.brand ?? p.name) === brandName)
      .sort((a, b) => (b.featuredScore ?? 0) - (a.featuredScore ?? 0))[0];
    return {
      id: primary?.id ?? brandName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: brandName,
      slug: primary?.slug ?? brandName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      brand: primary?.brand,
      market: primary?.market ?? "",
      rating: avgRating,
      reviewCount,
      specialty: primary?.specialty,
      yearsActive: primary?.yearsActive,
      location: locationCount > 1 ? `${locationCount} locations` : primary?.location,
      photo: primary?.photo,
      summary: primary?.summary ?? "",
      tags: primary?.tags ?? [],
      website: primary?.website,
    };
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
      />
      {/* ── 1–4. Hero + Stats + The Problem + How It Works (one merged bg) ── */}
      <div className="hero-section">
        {/* Floating blobs */}
        <div className="hero-blobs" aria-hidden="true">
          <div className="hero-blob" style={{ width: 760, height: 520, background: "#F5DDD0", left: "3%",  top: "30%", animation: "blob-a 20s ease-in-out infinite" }} />
          <div className="hero-blob" style={{ width: 680, height: 480, background: "#C8E6E4", right: "4%", top: "48%", animation: "blob-b 26s ease-in-out infinite" }} />
          <div className="hero-blob" style={{ width: 640, height: 440, background: "#EDE3C4", left: "36%", top: "65%", animation: "blob-c 18s ease-in-out infinite" }} />
        </div>

        <Hero headline={cms?.heroHeadline} subheadline={cms?.heroSubheadline} />
        <StatsRow />
        <HowItWorks steps={cms?.howItWorksSteps} />

        {/* ── 5. Category tabs ──────────────────────── */}
        <CategoryTabs />

        {/* ── 6. Compare methods and brands ─────────── */}
        <section className="py-16">
          <Container>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-[28px] font-bold text-heading">Compare Methods and Brands</h2>
                <p className="mt-1 text-sm font-medium text-heading">Not sure which method is right? Start here.</p>
              </div>
              <Link href="/comparisons" className="hidden items-center gap-1 text-sm font-medium text-accent hover:underline sm:inline-flex">
                All comparisons <ChevronRightIcon className="size-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { href: "/comparisons/best-tattoo-removal-method", title: "Best Tattoo Removal Method", desc: "Side-by-side method comparison across laser, non-laser, and saline." },
                { href: "/comparisons/picoway-vs-q-switch", title: "Pico Laser vs Q-Switch", desc: "How the two most common laser technologies compare for tattoo removal." },
                { href: "/comparisons/saline-vs-laser-tattoo-removal", title: "Saline vs Laser", desc: "Non-laser saline removal compared to standard laser treatment." },
                { href: "/comparisons/inkout-vs-removery", title: "inkOUT vs Removery", desc: "TEPR vs PicoWay: the two largest dedicated removal brands compared." },
                { href: "/comparisons/inkout-vs-laseraway", title: "inkOUT vs LaserAway", desc: "TEPR specialist vs laser chain, with pricing and technology breakdown." },
                { href: "/comparisons/removery-vs-laseraway", title: "Removery vs LaserAway", desc: "Two national laser chains compared on method, locations, and pricing." },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex flex-col gap-2 rounded-xl border border-border bg-white p-5 shadow-card transition-colors hover:border-accent hover:bg-accent/8"
                >
                  <p className="font-semibold text-heading text-[14px] transition-colors group-hover:text-accent">{link.title}</p>
                  <p className="text-[13px] leading-relaxed font-medium text-heading">{link.desc}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* ── 7. Highest rated providers ────────────── */}
        <section className="py-14 px-4 sm:px-6 lg:px-8">
          <div className="gradient-card-teal-peach rounded-3xl py-8">
            <div className="mx-auto max-w-6xl px-8 mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-[28px] font-bold text-heading">Highest rated providers</h2>
                <p className="mt-1 text-sm font-medium text-heading">
                  Minimum 48 reviews. Sorted by average rating. Updated as new reviews are added.
                </p>
              </div>
              <Link href="/providers" className="hidden items-center gap-1 text-sm font-medium text-accent hover:underline sm:inline-flex">
                View all <ChevronRightIcon className="size-4" />
              </Link>
            </div>
            <div className="flex justify-center">
              <HorizontalScrollWithBar>
                {highestRatedProviders.map((provider) => (
                  <div key={provider.id} style={{ flexShrink: 0, width: "264px" }}>
                    <ProviderCard provider={provider} />
                  </div>
                ))}
                <div style={{ flexShrink: 0, width: "1rem" }} />
              </HorizontalScrollWithBar>
            </div>
          </div>
        </section>

        {/* ── 8. Browse by city ─────────────────────── */}
        <section className="py-14">
          <Container>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-[28px] font-bold text-heading">Browse by city</h2>
                <p className="mt-1 text-sm font-medium text-heading">
                  Provider availability varies by metro. Each city page ranks every tracked provider using the same scoring framework.
                </p>
              </div>
              <Link href="/cities" className="hidden items-center gap-1 text-sm font-medium text-accent hover:underline sm:inline-flex">
                All cities <ChevronRightIcon className="size-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map((city) => (
                <CityCard key={city.id} city={city} />
              ))}
            </div>
          </Container>
        </section>

        {/* ── 9. Treatment guides ───────────────────── */}
        <IsItWorthIt />

        {/* ── 10. The Problem ─────────────────────────── */}
        <section className="py-14">
          <Container>
            <div className="mb-8">
              <h2 className="text-[28px] font-bold text-heading">The Problem This Site Solves</h2>
            </div>
            <div className="max-w-2xl">
              <p className="text-[15px] leading-relaxed text-body mb-3">
                Most people start with a Google search or an AI assistant. Both pull from provider marketing pages or summarize raw star ratings, neither of which tells you whether a clinic is good at complete removal or just fading.
              </p>
              <p className="text-[15px] leading-relaxed text-body">
                RealTattooReviews fills that gap. We classify public Google reviews by outcome so you can compare providers on what actually matters for your case.
              </p>
            </div>
          </Container>
        </section>

        {/* ── 11. Research before you book ──────────── */}
        <section className="py-14">
          <Container>
            <div className="mb-8">
              <h2 className="text-[28px] font-bold text-heading">Research before you book</h2>
              <p className="mt-1 text-sm font-medium text-heading">Two resources every patient should read first.</p>
            </div>
          </Container>
          <CTASection />
        </section>
      </div>

      {/* ── 11. FAQ ─────────────────────────────────── */}
      <FAQSection
        title="Common questions"
        description="About how reviews are collected, rated, and published."
        faqs={
          cms?.faqItems && cms.faqItems.length > 0
            ? cms.faqItems.map((f) => ({
                question: f.question,
                answer: <PortableText value={f.answer} />,
                answerText: portableTextToPlainText(f.answer),
              }))
            : HOMEPAGE_FAQ_DEFAULTS
        }
      />

      {/* ── 12. Final CTA banner ────────────────────── */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="rounded-3xl py-16" style={{ background: "linear-gradient(135deg, var(--color-blob-teal) 0%, #F8F5EE 50%, var(--color-blob-peach) 100%)" }}>
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-[28px] font-bold text-heading">
              Ready to find the right clinic?
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-body">
              Browse independent reviews, compare providers side by side, and make
              an informed decision, completely free.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/reviews"
                className="rounded-full bg-accent px-7 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
              >
                Browse Reviews
              </Link>
              <Link
                href="/comparisons"
                className="rounded-full border border-heading/30 px-7 py-3 text-sm font-medium text-heading hover:border-heading/60 transition-colors"
              >
                Compare Providers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
