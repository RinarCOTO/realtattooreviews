import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import ProviderCard from "@/components/cards/ProviderCard";
import CityCard from "@/components/cards/CityCard";
import Hero from "@/components/sections/home/Hero";
import StatsRow from "@/components/sections/home/StatsRow";
import CategoryTabs from "@/components/sections/home/CategoryTabs";
import HowItWorks from "@/components/sections/home/HowItWorks";
import IsItWorthIt from "@/components/sections/home/IsItWorthIt";
import CTASection from "@/components/sections/home/CTASection";
import FAQSection from "@/components/sections/home/FAQSection";
import HorizontalScrollWithBar from "@/components/ui/HorizontalScrollWithBar";
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
      {/* ── 1. Hero ─────────────────────────────────── */}
      <Hero headline={cms?.heroHeadline} subheadline={cms?.heroSubheadline} />

      {/* ── 2. Stats ────────────────────────────────── */}
      <StatsRow />

      {/* ── 3. The Problem ──────────────────────────── */}
      <section className="border-b border-border bg-surface py-16">
        <Container>
          <div>
            <h2 className="text-[28px] font-bold text-heading mb-6">
              The Problem This Site Solves
            </h2>
            <p className="text-[15px] leading-relaxed text-body mb-5">
              Most people researching tattoo removal start with a Google search and end up on provider websites. Provider websites are designed to book appointments, not to help you decide. They show their own best cases. They do not compare themselves to alternatives. They do not tell you which method fits your skin type or your tattoo colors.
            </p>
            <p className="text-[15px] leading-relaxed text-body mb-5">
              Google reviews help, but a star rating does not tell you whether a clinic is good at complete removal or just good at fading. It does not tell you whether the 5-star reviews are about tattoo removal or about the clinic's other services. It does not distinguish between a laser clinic and a non-laser provider.
            </p>
            <p className="text-[15px] leading-relaxed text-body">
              RealTattooReviews fills the gap between provider marketing and raw review data. The site takes public Google reviews, classifies them for outcome patterns (not just stars), and organizes them so you can compare providers on what actually matters for your case.
            </p>
          </div>
        </Container>
      </section>

      {/* ── 4. How Reviews works ─────────────────────────── */}
      <HowItWorks steps={cms?.howItWorksSteps} />

      {/* ── 5. Category tabs ────────────────────────── */}
      <CategoryTabs />

      {/* ── 6. Compare methods and brands ───────────── */}
      <section className="border-b border-border bg-bg py-16">
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-[28px] font-bold text-heading">Compare Methods and Brands</h2>
              <p className="mt-1 text-sm text-muted">Not sure which method is right? Start here.</p>
            </div>
            <Link href="/comparisons" className="hidden text-sm font-medium text-accent hover:underline sm:block">
              All comparisons →
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
                className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-5 shadow-card transition-colors hover:border-accent hover:bg-accent/8"
              >
                <p className="font-semibold text-heading text-[14px] transition-colors group-hover:text-accent">{link.title}</p>
                <p className="text-[13px] leading-relaxed text-muted">{link.desc}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 7. Highest rated providers ──────────────── */}
      <section className="bg-surface py-14">
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-[28px] font-bold text-heading">Highest rated providers</h2>
              <p className="mt-1 text-sm text-muted">
                Minimum 48 reviews. Sorted by average rating. Updated as new reviews are added.
              </p>
            </div>
            <Link href="/providers" className="hidden text-sm font-medium text-accent hover:underline sm:block">View all →</Link>
          </div>
        </Container>
        <Container>
          <HorizontalScrollWithBar>
            {highestRatedProviders.map((provider) => (
              <div key={provider.id} style={{ flexShrink: 0, width: "264px" }}>
                <ProviderCard provider={provider} />
              </div>
            ))}
            <div style={{ flexShrink: 0, width: "1rem" }} />
          </HorizontalScrollWithBar>
        </Container>
      </section>

      {/* ── 8. Browse by city ───────────────────────── */}
      <section className="border-t border-border bg-bg py-14">
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-[28px] font-bold text-heading">Browse by city</h2>
              <p className="mt-1 text-sm text-muted">
                Provider availability varies by metro. Each city page ranks every tracked provider using the same scoring framework.
              </p>
            </div>
            <Link href="/cities" className="hidden text-sm font-medium text-accent hover:underline sm:block">
              All cities →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── 9. Treatment guides ─────────────────────── */}
      <IsItWorthIt />

      {/* ── 10. Research before you book ────────────── */}
      <section className="border-t border-border bg-bg py-14">
        <Container>
          <div className="mb-8">
            <h2 className="text-[28px] font-bold text-heading">Research before you book</h2>
            <p className="mt-1 text-sm text-muted">Two resources every patient should read first.</p>
          </div>
        </Container>
        <CTASection />
      </section>

      {/* ── 11. FAQ ─────────────────────────────────── */}
      <section className="border-t border-border bg-surface">
        <FAQSection items={cms?.faqItems} />
      </section>

      {/* ── 12. Final CTA banner ────────────────────── */}
      <section className="border-t border-border bg-heading py-16">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-[28px] font-bold text-white">
              Ready to find the right clinic?
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-subtle">
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
                className="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white hover:border-white/50 transition-colors"
              >
                Compare Providers
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
