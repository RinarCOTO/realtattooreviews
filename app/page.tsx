import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import BrandCard from "@/components/cards/BrandCard";
import CityCard from "@/components/cards/CityCard";
import Hero from "@/components/sections/home/Hero";
import StatsRow from "@/components/sections/home/StatsRow";
import CategoryTabs from "@/components/sections/home/CategoryTabs";
import HowItWorks from "@/components/sections/home/HowItWorks";
import IsItWorthIt from "@/components/sections/home/IsItWorthIt";
import CTASection from "@/components/sections/home/CTASection";
import HorizontalScroll from "@/components/ui/HorizontalScroll";
import FAQSection from "@/components/sections/home/FAQSection";
import RecentReviewsSection from "@/components/reviews/RecentReviewsSection";
import { brands } from "@/lib/mock-data/brands";
import { cities } from "@/lib/mock-data/cities";
import { getRecentReviews } from "@/lib/data/reviews";
import { getHomepageCMS } from "@/lib/page-data/homepage-cms";

const FALLBACK_TITLE = "RealTattooReviews: Compare Tattoo Removal Clinics Before You Book";
const FALLBACK_DESC = "848 verified patient reviews across 22 tattoo removal providers in 6 markets. Compare clinics by rating, city, ink type, and outcome before you book.";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getHomepageCMS();
  const title = cms?.seoTitle ?? FALLBACK_TITLE;
  const description = cms?.seoDescription ?? FALLBACK_DESC;
  return {
    title,
    description,
    openGraph: {
      title,
      description: cms?.seoDescription ?? "848 verified patient reviews across 22 providers. Compare clinics by rating, city, and outcome.",
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
  const [recentReviews, cms] = await Promise.all([
    getRecentReviews(6),
    getHomepageCMS(),
  ]);

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

      {/* ── 3. How it works ─────────────────────────── */}
      <HowItWorks steps={cms?.howItWorksSteps} />

      {/* ── 4. Category tabs ────────────────────────── */}
      <CategoryTabs />

      {/* ── 5. Recent reviews ───────────────────────── */}
      <RecentReviewsSection reviews={recentReviews} />

      {/* ── 6. Featured providers ───────────────────── */}
      <section className="py-14">
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-[28px] font-bold text-heading">Featured providers</h2>
              <p className="mt-1 text-sm text-muted">
                Ratings reflect all verified patient reviews. Not a ranked endorsement list.
              </p>
            </div>
            <Button href="/providers" variant="secondary" size="sm">View all →</Button>
          </div>
        </Container>
        <div className="pl-4 sm:pl-6 lg:pl-8 xl:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]">
          <HorizontalScroll>
            {brands.map((brand) => (
              <div key={brand.id} className="w-72 shrink-0">
                <BrandCard brand={brand} />
              </div>
            ))}
            <div className="w-4 shrink-0 sm:w-6 lg:w-8" />
          </HorizontalScroll>
        </div>
      </section>

      {/* ── 7. Browse by city ───────────────────────── */}
      <section className="border-t border-border bg-surface py-14">
        <Container>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-[28px] font-bold text-heading">Browse by city</h2>
              <p className="mt-1 text-sm text-muted">
                Clinic coverage and patient reviews organized by location.
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

      {/* ── 8. Treatment guides ─────────────────────── */}
      <IsItWorthIt />

      {/* ── 9. Research before you book ─────────────── */}
      <section className="border-t border-border py-14">
        <Container>
          <div className="mb-8">
            <h2 className="text-[28px] font-bold text-heading">Research before you book</h2>
            <p className="mt-1 text-sm text-muted">Two resources every patient should read first.</p>
          </div>
        </Container>
        <CTASection />
      </section>

      {/* ── 10. FAQ ─────────────────────────────────── */}
      <section className="border-t border-border bg-surface">
        <FAQSection items={cms?.faqItems} />
      </section>

      {/* ── 11. Final CTA banner ────────────────────── */}
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
