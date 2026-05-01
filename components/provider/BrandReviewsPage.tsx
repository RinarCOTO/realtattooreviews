import Link from "next/link";
import Container from "@/components/layout/Container";
import AlternativesSection from "./AlternativesSection";
import BlockHeading from "./BlockHeading";
import InfoCard from "./InfoCard";
import JumpNav from "./JumpNav";
import ProviderHero from "./ProviderHero";
import ResultsSnapshot from "./ResultsSnapshot";
import WhatReviewersSay from "@/components/reviews/WhatReviewersSay";
import VerdictCard from "./VerdictCard";
import type { Review } from "@/types/review";
import type { Provider } from "@/types/provider";
import { getLocationSlug } from "@/lib/providers";
import BottomLineSection from "./BottomLineSection";
import BestForSection from "./BestForSection";
import LocationsSection from "./LocationsSection";
import OverviewSection from "./OverviewSection";
import FAQSection from "@/components/sections/FAQSection";
import BlobBackground from "@/components/ui/BlobBackground";
import {
  buildBestFor,
  buildBottomLine,
  buildDifferentiator,
  buildFAQ,
  buildOverviewStats,
  buildPricingContext,
  buildProsConsFromReviews,
  buildResultsSummary,
  buildTreatmentOverview,
  buildUseCaseFocus,
  getAlternativeProviders,
  getVerdictFromRating,
  summarizeSources,
  unique,
} from "@/lib/provider-analysis";
import MonoLabel from "@/components/reviews/MonoLabel";

interface BrandReviewsPageProps {
  brand: string;
  slug: string;
  locations: Provider[];
  reviews: Review[];
}

export default function BrandReviewsPage({ brand, slug, locations, reviews }: BrandReviewsPageProps) {
  const totalReviews = reviews.length || locations.reduce((s, l) => s + l.reviewCount, 0);
  const avgRatingValue = reviews.length > 0
    ? reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length
    : locations.reduce((s, l) => s + l.rating, 0) / locations.length;
  const avgRating = avgRatingValue.toFixed(1);
  const verdict = getVerdictFromRating(avgRatingValue, reviews);
  const { pros, cons } = buildProsConsFromReviews(reviews);
  const resultsSummary = buildResultsSummary(reviews);
  const alternatives = getAlternativeProviders(locations, slug);
  const faqItems = buildFAQ(brand, undefined, reviews, locations[0] ?? null);
  const bestForData = buildBestFor(locations, reviews);
  const bottomLine = buildBottomLine(brand, locations, reviews, alternatives);
  const brandTags = unique(locations.flatMap((l) => l.tags ?? [])).slice(0, 6);
  const differentiator = locations[0] ? buildDifferentiator(locations[0], reviews) : null;
  const useCaseFocus = buildUseCaseFocus(reviews);
  // Use first location's Google Business URL if populated; fall back to Maps search
  const jumpItems = [
    { label: "Overview",     href: "#overview" },
    { label: "Reviews",      href: "#reviews" },
    { label: "Results",      href: "#results" },
    { label: "Pricing",      href: "#pricing" },
    { label: "Treatment",    href: "#treatment" },
    { label: "Locations",    href: "#locations" },
    { label: "Alternatives", href: "#alternatives" },
    { label: "Who it fits",  href: "#best-for" },
    { label: "FAQ",          href: "#faq" },
    { label: "Bottom line",  href: "#bottom-line" },
  ];

  return (
    <BlobBackground>
    <main className="reviews-page min-h-screen">
      <ProviderHero
        breadcrumb={["Reviews", brand]}
        nameNode={
          <>{brand},<br />
          <em className="italic text-(--accent)">
            {locations.length} {locations.length === 1 ? "location" : "locations"}.
          </em></>
        }
        body={`across ${locations.length} ${locations.length === 1 ? "location" : "locations"}. See how ${brand} compares on ratings, pricing, treatment approach, and overall reputation before you book.`}
        tags={brandTags}
        reviewCount={totalReviews}
        reviewsHref="#results"
        card={
          <VerdictCard
            verdictLabel={verdict.label}
            avgRating={avgRating}
            avgRatingValue={avgRatingValue}
            reviewCount={totalReviews}
            sourcesSummary={summarizeSources(reviews)}
            verdictSummary={verdict.summary}
            bestFor={bestForData.bestFor[0]}
            lessIdealFor={bestForData.lessIdealFor[0]}
          />
        }
      />

      <JumpNav items={jumpItems} />

      {(differentiator || useCaseFocus) && (
        <section className="py-12">
          <Container>
            <div className="max-w-3xl space-y-4">
              {differentiator && (
                <p className="font-sans text-[15px] leading-relaxed text-(--ink) m-0">
                  {differentiator}
                </p>
              )}
              {useCaseFocus && (
                <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0">
                  {useCaseFocus}
                </p>
              )}
            </div>
          </Container>
        </section>
      )}

      <OverviewSection
        providerName={brand}
        intro={`If you are already researching ${brand} by name, this page should help you answer three things quickly: whether the provider seems credible, what the most common patient patterns look like, and which alternatives are worth comparing before you commit.`}
        pros={pros}
        cons={cons}
        statsRows={buildOverviewStats(reviews)}
      />

      <section id="reviews" className="py-22">
        <Container>
          <BlockHeading title="What Reviewers Say" body="Public reviews are most useful when treated as patterns, not isolated quotes. Negative-first ordering shows the most decision-relevant signals at the top." />
          <WhatReviewersSay reviews={reviews} providerName={brand} />
        </Container>
      </section>

      <section id="results" className="py-22" style={{ background: "linear-gradient(135deg, #EDE3C4 0%, #C8E6E4 45%, #A8D5D3 100%)" }}>
        <Container>
          <BlockHeading title="Rating Summary" body="Start with the biggest signals first. These do not tell the whole story, but they tell you where to look closer." />
          <ResultsSnapshot {...resultsSummary} />
        </Container>
      </section>

      <section id="pricing" className="py-22">
        <Container>
          <BlockHeading title="Pricing" body="Pricing is one of the first things users want to know and one of the hardest things to compare cleanly. Look at session count expectations and total treatment path, not just the starting price." />
          <InfoCard
            label="Pricing signal"
            body={buildPricingContext(locations)}
            link="Compare against the national cost guide"
            linkHref="/cost"
            beforeBookingNote="how many sessions are realistic for your tattoo, what is included in the quoted price, and what happens if the tattoo fades more slowly than expected."
          />
        </Container>
      </section>

      <section id="treatment" className="py-22">
        <Container>
          <BlockHeading title="Treatment Approach and Technology" body="Brand reputation matters, but treatment fit matters more. A provider can look strong overall and still be a weak fit for a specific tattoo or skin profile." />
          <InfoCard label="Method and technology" body={buildTreatmentOverview(locations)} link="See our method comparison guide" linkHref="/comparisons/best-tattoo-removal-method" />
        </Container>
      </section>

      <LocationsSection
        title={`${brand} by Location`}
        body="Large brands often perform unevenly by city. A national reputation can be directionally useful, but local execution still matters."
        locations={locations}
        slug={slug}
        websiteHref={locations[0]?.website}
      />

      <section id="alternatives" className="py-22">
        <Container>
          <BlockHeading title="Best Alternatives" body={`No provider should be reviewed in isolation. If you are considering ${brand}, these are the alternatives worth comparing next.`} />
          <AlternativesSection alternatives={alternatives} />
          <p className="mt-8 font-sans text-[14px] leading-relaxed text-(--muted)">
            The right outcome is not choosing the most familiar brand. It is choosing the provider whose strengths match your case most closely.
          </p>
        </Container>
      </section>

      <BestForSection
        providerName={brand}
        bestFor={bestForData.bestFor}
        lessIdealFor={bestForData.lessIdealFor}
      />

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <FAQSection
        id="faq"
        description={`Common questions from people researching ${brand} before making a booking decision.`}
        faqs={faqItems.map((i) => ({ question: i.q, answer: i.a }))}
      />

      <BottomLineSection
        providerName={brand}
        copy={bottomLine.copy}
        actionLine={bottomLine.actionLine}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
    </main>
    </BlobBackground>
  );
}
