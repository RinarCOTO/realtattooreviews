import Link from "next/link";
import Container from "@/components/layout/Container";
import BlobBackground from "@/components/ui/BlobBackground";
import AlternativesSection from "./AlternativesSection";
import BlockHeading from "./BlockHeading";
import InfoCard from "./InfoCard";
import JumpNav from "./JumpNav";
import ProviderHero from "./ProviderHero";
import ResultsSnapshot from "./ResultsSnapshot";
import WhatReviewersSay from "@/components/reviews/WhatReviewersSay";
import VerdictCard from "./VerdictCard";
import VerdictSidebar from "./VerdictSidebar";
import type { Review } from "@/types/review";
import type { Provider } from "@/types/provider";
import BottomLineSection from "./BottomLineSection";
import BestForSection from "./BestForSection";
import OverviewSection from "./OverviewSection";
import FAQSection from "@/components/sections/FAQSection";
import ChevronRightIcon from "@/components/ui/ChevronRightIcon";
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
} from "@/lib/provider-analysis";

interface SingleProviderReviewsPageProps {
  provider: Provider;
  reviews: Review[];
  /**
   * Path used in BreadcrumbList structured data and as the canonical "self"
   * URL. Defaults to `/reviews/{provider.slug}/`. Pass an explicit value when
   * the page lives at a non-default URL (e.g. a per-location route like
   * `/reviews/removery/lincoln-square/`).
   */
  canonicalPath?: string;
  /**
   * Breadcrumb override. Defaults to ["Reviews", provider.name, city].
   */
  breadcrumb?: string[];
}

export default function SingleProviderReviewsPage({ provider, reviews, canonicalPath, breadcrumb }: SingleProviderReviewsPageProps) {
  const realCount = reviews.length || provider.reviewCount;
  const realAvgRating = reviews.length > 0
    ? reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length
    : provider.rating;
  const realAvg = realAvgRating.toFixed(1);
  const verdict = getVerdictFromRating(realAvgRating, reviews);
  const { pros, cons } = buildProsConsFromReviews(reviews);
  const resultsSummary = buildResultsSummary(reviews);
  const alternatives = getAlternativeProviders([provider], provider.slug);
  const faqItems = buildFAQ(provider.name, provider.market, reviews, provider);
  const bestForData = buildBestFor([provider], reviews);
  const bottomLine = buildBottomLine(provider.name, [provider], reviews, alternatives);
  const differentiator = buildDifferentiator(provider, reviews);
  const useCaseFocus = buildUseCaseFocus(reviews);
  const city = provider.market.split(",")[0].trim();
  const citySlug = city.toLowerCase().replace(/\s+/g, "-");
  const selfPath = canonicalPath ?? `/reviews/${provider.slug}/`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    articleSection: "Reviews",
    headline: `${provider.name} Tattoo Removal Reviews`,
    description: `${realCount} sourced reviews for ${provider.name}. Editorial review summary covering outcomes, pricing context, treatment approach, and local fit before booking.`,
    mainEntityOfPage: `https://realtattooreviews.com${selfPath}`,
    author: {
      "@type": "Organization",
      name: "RealTattooReviews",
      url: "https://realtattooreviews.com",
    },
    publisher: {
      "@type": "Organization",
      name: "RealTattooReviews",
      url: "https://realtattooreviews.com",
    },
    about: {
      "@type": "Organization",
      name: provider.name,
    },
  };
  const jumpItems = [
    { label: "Overview",      href: "#overview" },
    { label: "Reviews",       href: "#reviews" },
    { label: "Results",       href: "#results" },
    { label: "Pricing",       href: "#pricing" },
    { label: "Treatment",     href: "#treatment" },
    { label: "Local context", href: "#local-context" },
    { label: "Alternatives",  href: "#alternatives" },
    { label: "Who it fits",   href: "#best-for" },
    { label: "FAQ",           href: "#faq" },
    { label: "Bottom line",   href: "#bottom-line" },
  ];

  return (
    <BlobBackground>
    <main className="reviews-page min-h-screen">
      <ProviderHero
        breadcrumb={breadcrumb ?? ["Reviews", provider.name, city]}
        nameNode={<>{provider.name},{" "}<em className="italic text-[oklch(0.55_0.15_35)]">{city}.</em></>}
        body={`in ${provider.market}. See how ${provider.name} compares on ratings, pricing, treatment approach, and overall reputation before you book.`}
        tags={provider.tags ?? []}
        reviewCount={realCount}
        reviewsHref="#results"
        card={
          <VerdictCard
            verdictLabel={verdict.label}
            avgRating={realAvg}
            avgRatingValue={realAvgRating}
            reviewCount={realCount}
            sourcesSummary={summarizeSources(reviews)}
            verdictSummary={verdict.summary}
            bestFor={bestForData.bestFor[0]}
            lessIdealFor={bestForData.lessIdealFor[0]}
          />
        }
      />

      <JumpNav items={jumpItems} />

      <section className="py-10">
        <Container>
          <VerdictSidebar rows={buildOverviewStats(reviews)} />
        </Container>
      </section>

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
                <p className="font-sans text-[15px] leading-relaxed text-heading m-0">
                  {useCaseFocus}
                </p>
              )}
            </div>
          </Container>
        </section>
      )}

      <OverviewSection
        providerName={provider.name}
        intro={`If you are already researching ${provider.name} by name, this page should help you answer three things quickly: whether the provider seems credible, what the most common patient patterns look like, and which alternatives are worth comparing before you commit.`}
        pros={pros}
        cons={cons}
      />

      <section id="reviews" className="py-22">
        <Container>
          <BlockHeading title="What Reviewers Say" body="Public reviews are most useful when treated as patterns, not isolated quotes. Negative-first ordering shows the most decision-relevant signals at the top." />
          <WhatReviewersSay reviews={reviews} providerName={provider.name} />
        </Container>
      </section>

      <section id="results" className="py-22">
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
            body={buildPricingContext([provider])}
            link="Compare against the cost guide"
            linkHref="/cost"
            beforeBookingNote="how many sessions are realistic for your tattoo, what is included in the quoted price, and what happens if the tattoo fades more slowly than expected."
          />
        </Container>
      </section>

      <section id="treatment" className="py-22">
        <Container>
          <BlockHeading title="Treatment Approach and Technology" body="Brand reputation matters, but treatment fit matters more. A provider can look strong overall and still be a weak fit for a specific tattoo or skin profile." />
          <InfoCard label="Method and technology" body={buildTreatmentOverview([provider])} link="See our method comparison guide" linkHref="/comparisons/best-tattoo-removal-method" />
        </Container>
      </section>

      <section id="local-context" className="py-22">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="border border-(--line) bg-white p-6 rounded-xl">
            <p className="font-sans font-semibold text-[22px] leading-[1.1] tracking-[-0.02em] text-(--ink) mb-3">
              Local and City Context
            </p>
            <p className="text-[14px] leading-relaxed text-heading">
              {provider.name} operates in {provider.market}. If you already know your city, move next to the local comparison page before making a decision. A national reputation can be directionally useful, but local execution still matters.
            </p>
            <Link href={`/cities/${citySlug}`} className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-(--accent) hover:underline">
              See local comparison coverage <ChevronRightIcon className="size-3.5" />
            </Link>
          </div>
          <div className="border border-(--line) bg-white p-6 rounded-xl">
            <p className="font-sans font-semibold text-[22px] leading-[1.1] tracking-[-0.02em] text-(--ink) mb-3">
              Provider Snapshot
            </p>
            <p className="text-[14px] leading-relaxed text-heading">{provider.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {provider.tags.map((tag) => (
                <span key={tag} className="border border-(--line) bg-(--surface) px-3 py-1 font-sans text-[11px] tracking-widest uppercase text-heading">{tag}</span>
              ))}
            </div>
            {provider.website ? (
              <div className="mt-5 border-t border-(--line) pt-4">
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium text-(--accent) hover:underline"
                >
                  Visit official website ↗
                </a>
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <section id="alternatives" className="py-22">
        <Container>
          <BlockHeading title="Best Alternatives" body={`No provider should be reviewed in isolation. If you are considering ${provider.name}, these are the alternatives worth comparing next.`} />
          <AlternativesSection alternatives={alternatives} />
          <p className="mt-8 font-sans text-[14px] leading-relaxed text-heading">
            The right outcome is not choosing the most familiar brand. It is choosing the provider whose strengths match your case most closely.
          </p>
        </Container>
      </section>

      <BestForSection
        providerName={provider.name}
        bestFor={bestForData.bestFor}
        lessIdealFor={bestForData.lessIdealFor}
      />

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <FAQSection
        id="faq"
        description={`Common questions from people researching ${provider.name} before making a booking decision.`}
        faqs={faqItems.map((i) => ({ question: i.q, answer: i.a }))}
      />

      <BottomLineSection
        providerName={provider.name}
        copy={bottomLine.copy}
        actionLine={bottomLine.actionLine}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://realtattooreviews.com/" },
              { "@type": "ListItem", position: 2, name: "Reviews", item: "https://realtattooreviews.com/reviews/" },
              { "@type": "ListItem", position: 3, name: provider.name, item: `https://realtattooreviews.com${selfPath}` },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }),
        }}
      />
    </main>
    </BlobBackground>
  );
}
