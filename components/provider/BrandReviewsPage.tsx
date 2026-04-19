import Link from "next/link";
import Container from "@/components/layout/Container";
import ReviewCardGrid from "@/components/reviews/ReviewCardGrid";
import AlternativesSection from "./AlternativesSection";
import BlockHeading from "./BlockHeading";
import InfoCard from "./InfoCard";
import JumpNav from "./JumpNav";
import ProviderReviewsArchive from "./ProviderReviewsArchive";
import ProsCons from "./ProsCons";
import ProviderHero from "./ProviderHero";
import ResultsSnapshot from "./ResultsSnapshot";
import ReviewsMoreLink from "./ReviewsMoreLink";
import SourceSummary from "./SourceSummary";
import VerdictCard from "./VerdictCard";
import VerdictSidebar from "./VerdictSidebar";
import type { Review } from "@/types/review";
import type { Provider } from "@/types/provider";
import { getLocationSlug } from "@/lib/providers";
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
  const verdict = getVerdictFromRating(avgRatingValue);
  const { pros, cons } = buildProsConsFromReviews(reviews);
  const resultsSummary = buildResultsSummary(reviews);
  const alternatives = getAlternativeProviders(locations, slug);
  const faqItems = buildFAQ(brand);
  const brandTags = unique(locations.flatMap((l) => l.tags ?? [])).slice(0, 6);
  const hasMoreReviews = reviews.length > 6;
  const jumpItems = [
    { label: "Overview",     href: "#overview" },
    { label: "Reviews",      href: "#reviews" },
    { label: "Results",      href: "#results" },
    ...(hasMoreReviews ? [{ label: "All reviews", href: "#all-reviews" }] : []),
    { label: "Pricing",      href: "#pricing" },
    { label: "Treatment",    href: "#treatment" },
    { label: "Locations",    href: "#locations" },
    { label: "Alternatives", href: "#alternatives" },
    { label: "FAQ",          href: "#faq" },
  ];

  return (
    <main className="reviews-page min-h-screen bg-(--bg)">
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
          />
        }
      />

      <JumpNav items={jumpItems} />

      <section id="overview" className="border-b border-(--line) bg-(--bg) py-22">
        <Container>
          <BlockHeading title={`Is ${brand} Worth It?`} body="For some users, yes. The question is whether the reviews, treatment approach, pricing, and location consistency make it a good fit for your tattoo, budget, and goals." />
          <VerdictSidebar rows={buildOverviewStats(reviews)} />
          <ProsCons pros={pros} cons={cons} />
        </Container>
      </section>

      <section id="reviews" className="border-b border-(--line) bg-bg py-22">
        <Container>
          <BlockHeading title="What Reviews Say" body="Public reviews are most useful when they are treated as patterns, not as isolated quotes. Here is what appears most often in the feedback." />
          <SourceSummary reviews={reviews} />
        </Container>
      </section>

      <section id="results" className="border-b border-(--line) bg-(--wash) py-22">
        <Container className="grid gap-6 lg:grid-cols-[minmax(0,1fr),280px]">
          <div>
            <BlockHeading title="Rating Summary" body="Start with the biggest signals first. These do not tell the whole story, but they tell you where to look closer." />
            <ReviewCardGrid reviews={reviews.slice(0, 6)} columns={2} showProvider={false} />
            <ReviewsMoreLink total={reviews.length} />
          </div>
          <ResultsSnapshot {...resultsSummary} />
        </Container>
      </section>

      {hasMoreReviews && (
        <section id="all-reviews" className="border-b border-(--line) bg-(--bg) py-22">
          <Container>
            <BlockHeading title="All Reviews" body={`Browse the remaining sourced reviews for ${brand}, loaded in batches so the page stays readable.`} />
            <ProviderReviewsArchive reviews={reviews} />
          </Container>
        </section>
      )}

      <section id="pricing" className="border-b border-(--line) bg-(--surface) py-22">
        <Container>
          <BlockHeading title="Pricing" body="Pricing is one of the first things users want to know and one of the hardest things to compare cleanly. Look at session count expectations and total treatment path, not just the starting price." />
          <InfoCard label="Pricing signal" body={buildPricingContext(locations)} link="Compare against the national cost guide" linkHref="/cost" />
        </Container>
      </section>

      <section id="treatment" className="border-b border-(--line) bg-(--bg) py-22">
        <Container>
          <BlockHeading title="Treatment Approach and Technology" body="Brand reputation matters, but treatment fit matters more. A provider can look strong overall and still be a weak fit for a specific tattoo or skin profile." />
          <InfoCard label="Method and technology" body={buildTreatmentOverview(locations)} link="See our method comparison guide" linkHref="/comparisons/best-tattoo-removal-method" />
        </Container>
      </section>

      <section id="locations" className="border-b border-(--line) bg-(--surface) py-22">
        <Container>
          <BlockHeading title={`${brand} by Location`} body="Large brands often perform unevenly by city. A national reputation can be directionally useful, but local execution still matters." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <Link
                key={location.id}
                href={`/providers/${slug}/${getLocationSlug(location)}`}
                className="group flex flex-col gap-3 border border-(--line) bg-white p-5 rounded-xl transition-colors hover:border-(--accent)/30"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-(--ink) text-[15px]">{location.market}</p>
                    <MonoLabel className="mt-0.5">{location.location}</MonoLabel>
                  </div>
                  <span className="font-mono font-semibold text-[13px] text-(--accent)">{location.rating}</span>
                </div>
                <p className="text-[13px] leading-relaxed text-(--muted) line-clamp-3">{location.summary}</p>
                <div className="mt-auto flex items-center justify-between border-t border-(--line) pt-3">
                  <MonoLabel>{location.reviewCount} reviews</MonoLabel>
                  <span className="text-[12px] font-medium text-(--accent) transition-transform group-hover:translate-x-0.5">View location →</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section id="alternatives" className="border-b border-(--line) bg-(--bg) py-22">
        <Container>
          <BlockHeading title="Best Alternatives" body={`No provider should be reviewed in isolation. If you are considering ${brand}, these are the alternatives worth comparing next.`} />
          <AlternativesSection alternatives={alternatives} />
        </Container>
      </section>

      <section id="faq" className="bg-(--surface) py-22">
        <Container>
          <BlockHeading title="Frequently Asked Questions" body={`Common questions from people researching ${brand} before making a booking decision.`} />
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
    </main>
  );
}
