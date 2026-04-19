import Link from "next/link";
import Container from "@/components/layout/Container";
import ReviewCardGrid from "@/components/reviews/ReviewCardGrid";
import AlternativesSection from "./AlternativesSection";
import BlockHeading from "./BlockHeading";
import InfoCard from "./InfoCard";
import JumpNav from "./JumpNav";
import ProsCons from "./ProsCons";
import ProviderHero from "./ProviderHero";
import ProviderReviewsArchive from "./ProviderReviewsArchive";
import ResultsSnapshot from "./ResultsSnapshot";
import ReviewsMoreLink from "./ReviewsMoreLink";
import SourceSummary from "./SourceSummary";
import VerdictCard from "./VerdictCard";
import VerdictSidebar from "./VerdictSidebar";
import type { Review } from "@/types/review";
import type { Provider } from "@/types/provider";
import {
  buildFAQ,
  buildOverviewStats,
  buildPricingContext,
  buildProsConsFromReviews,
  buildResultsSummary,
  buildTreatmentOverview,
  getAlternativeProviders,
  getVerdictFromRating,
  summarizeSources,
} from "@/lib/provider-analysis";

interface SingleProviderReviewsPageProps {
  provider: Provider;
  reviews: Review[];
}

export default function SingleProviderReviewsPage({ provider, reviews }: SingleProviderReviewsPageProps) {
  const realCount = reviews.length || provider.reviewCount;
  const realAvgRating = reviews.length > 0
    ? reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length
    : provider.rating;
  const realAvg = realAvgRating.toFixed(1);
  const verdict = getVerdictFromRating(realAvgRating);
  const { pros, cons } = buildProsConsFromReviews(reviews);
  const resultsSummary = buildResultsSummary(reviews);
  const alternatives = getAlternativeProviders([provider], provider.slug);
  const faqItems = buildFAQ(provider.name, provider.market);
  const city = provider.market.split(",")[0].trim();
  const citySlug = city.toLowerCase().replace(/\s+/g, "-");
  const hasMoreReviews = reviews.length > 6;

  const jumpItems = [
    { label: "Overview",      href: "#overview" },
    { label: "Reviews",       href: "#reviews" },
    { label: "Results",       href: "#results" },
    ...(hasMoreReviews ? [{ label: "All reviews", href: "#all-reviews" }] : []),
    { label: "Pricing",       href: "#pricing" },
    { label: "Treatment",     href: "#treatment" },
    { label: "Local context", href: "#local-context" },
    { label: "Alternatives",  href: "#alternatives" },
    { label: "FAQ",           href: "#faq" },
  ];

  return (
    <main className="reviews-page min-h-screen bg-(--bg)">
      <ProviderHero
        breadcrumb={["Reviews", provider.name, city]}
        nameNode={<>{provider.name},{" "}<em className="italic text-[oklch(0.55_0.15_35)]">{city}.</em></>}
        body={`from ${provider.market}. Compare outcomes, session experience, and pricing context before deciding.`}
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
          />
        }
      />

      <JumpNav items={jumpItems} />

      <section className="border-b border-(--line) bg-(--surface) py-10">
        <Container>
          <VerdictSidebar rows={buildOverviewStats(reviews)} />
        </Container>
      </section>

      <section id="overview" className="border-b border-(--line) bg-hero-bg py-22">
        <Container>
          <BlockHeading title="Overview" body="Quick verdict first, then the biggest positives and the biggest cautions before someone reads deeper." />
          <ProsCons pros={pros} cons={cons} />
        </Container>
      </section>

      <section id="reviews" className="border-b border-(--line) bg-(--bg) py-22">
        <Container>
          <BlockHeading title="Review-Source Summary" body="Where reviews come from and how the signal splits across positive, mixed, and negative experiences." />
          <SourceSummary reviews={reviews} />
        </Container>
      </section>

      <section id="results" className="border-b border-(--line) bg-(--wash) py-22">
        <Container className="grid gap-6 lg:grid-cols-[minmax(0,1fr),280px]">
          <div>
            <BlockHeading title="Results and Review Evidence" body="Sourced review excerpts alongside an outcome signal count, showing how often fading results, pain, or scarring come up." />
            <ReviewCardGrid reviews={reviews.slice(0, 6)} columns={2} showProvider={false} />
            <ReviewsMoreLink total={reviews.length} />
          </div>
          <ResultsSnapshot {...resultsSummary} />
        </Container>
      </section>

      {hasMoreReviews && (
        <section id="all-reviews" className="border-b border-(--line) bg-(--bg) py-22">
          <Container>
            <BlockHeading title="All Reviews" body={`Browse the remaining sourced reviews for ${provider.name}, loaded in batches so the page stays readable.`} />
            <ProviderReviewsArchive reviews={reviews} />
          </Container>
        </section>
      )}

      <section id="pricing" className="border-b border-(--line) bg-(--bg) py-22">
        <Container>
          <BlockHeading title="Pricing Context" body="How this provider's pricing compares to typical session costs in the area." />
          <InfoCard label="Pricing signal" body={buildPricingContext([provider])} link="Compare against the cost guide" linkHref="/cost" />
        </Container>
      </section>

      <section id="treatment" className="border-b border-(--line) bg-(--surface) py-22">
        <Container>
          <BlockHeading title="Treatment and Technology Overview" body="The removal method and technology this provider uses, based on review signals and profile data." />
          <InfoCard label="Method and technology" body={buildTreatmentOverview([provider])} link="See our method comparison guide" linkHref="/comparisons/best-tattoo-removal-method" />
        </Container>
      </section>

      <section id="local-context" className="border-b border-(--line) bg-(--bg) py-22">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="border border-(--line) bg-white p-6 rounded-xl">
            <p className="font-sans font-semibold text-[22px] leading-[1.1] tracking-[-0.02em] text-(--ink) mb-3">
              City and Local Context
            </p>
            <p className="text-[14px] leading-relaxed text-(--muted)">
              {provider.name} operates in {provider.market}. Users comparing local options should read this page alongside the city page to see how it stacks up against nearby alternatives.
            </p>
            <Link href={`/cities/${citySlug}`} className="mt-4 inline-block text-[13px] font-medium text-(--accent) hover:underline">
              See local comparison coverage →
            </Link>
          </div>
          <div className="border border-(--line) bg-white p-6 rounded-xl">
            <p className="font-sans font-semibold text-[22px] leading-[1.1] tracking-[-0.02em] text-(--ink) mb-3">
              Provider Snapshot
            </p>
            <p className="text-[14px] leading-relaxed text-(--muted)">{provider.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {provider.tags.map((tag) => (
                <span key={tag} className="border border-(--line) bg-(--surface) px-3 py-1 font-mono text-[11px] tracking-widest uppercase text-(--muted)">{tag}</span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="alternatives" className="border-b border-(--line) bg-(--surface) py-22">
        <Container>
          <BlockHeading title="Alternatives and Comparisons" body={`Compare ${provider.name} against nearby and method-adjacent providers before making a decision.`} />
          <AlternativesSection alternatives={alternatives} />
        </Container>
      </section>

      <section id="faq" className="bg-(--bg) py-22">
        <Container>
          <BlockHeading title="Frequently Asked Questions" body={`Common questions from people researching ${provider.name} before making a booking decision.`} />
          <div className="grid gap-4 sm:grid-cols-3">
            {faqItems.map((item) => (
              <div key={item.q} className="border border-(--line) bg-white p-5 rounded-xl">
                <p className="font-semibold text-(--ink) text-[14px] mb-2">{item.q}</p>
                <p className="text-[13px] leading-relaxed text-(--muted)">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://realtattooreviews.com/" },
              { "@type": "ListItem", position: 2, name: "Reviews", item: "https://realtattooreviews.com/reviews/" },
              { "@type": "ListItem", position: 3, name: provider.name, item: `https://realtattooreviews.com/reviews/${provider.slug}/` },
            ],
          }),
        }}
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
  );
}
