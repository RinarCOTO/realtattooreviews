import Link from "next/link";
import Container from "@/components/layout/Container";
import AlternativesSection from "./AlternativesSection";
import BlockHeading from "./BlockHeading";
import InfoCard from "./InfoCard";
import JumpNav from "./JumpNav";
import ProsCons from "./ProsCons";
import ProviderHero from "./ProviderHero";
import ResultsSnapshot from "./ResultsSnapshot";
import WhatReviewersSay from "@/components/reviews/WhatReviewersSay";
import VerdictCard from "./VerdictCard";
import VerdictSidebar from "./VerdictSidebar";
import type { Review } from "@/types/review";
import type { Provider } from "@/types/provider";
import FaqAccordion from "./FaqAccordion";
import {
  buildBestFor,
  buildBottomLine,
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
  const bestForData = buildBestFor([provider], reviews);
  const bottomLine = buildBottomLine(provider.name, [provider], reviews, alternatives);
  const city = provider.market.split(",")[0].trim();
  const citySlug = city.toLowerCase().replace(/\s+/g, "-");
  const googleMapsUrl =
    provider.googleBusinessUrl ||
    `https://www.google.com/maps/search/${encodeURIComponent(`${provider.name} ${city} tattoo removal`)}`;
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
    <main className="reviews-page min-h-screen bg-(--bg)">
      <ProviderHero
        breadcrumb={["Reviews", provider.name, city]}
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

      <section className="border-b border-(--line) bg-(--surface) py-10">
        <Container>
          <VerdictSidebar rows={buildOverviewStats(reviews)} />
        </Container>
      </section>

      <section id="overview" className="border-b border-(--line) bg-hero-bg py-22">
        <Container>
          <BlockHeading title={`Is ${provider.name} Worth It?`} body="For some users, yes. The question is whether the reviews, treatment approach, pricing, and local consistency make it a good fit for your tattoo, budget, and goals." />
          <p className="-mt-4 mb-8 font-sans text-[14px] leading-relaxed text-(--muted) max-w-prose">
            If you are already researching {provider.name} by name, this page should help you answer three things quickly: whether the provider seems credible, what the most common patient patterns look like, and which alternatives are worth comparing before you commit.
          </p>
          <ProsCons pros={pros} cons={cons} />
          <p className="mt-6 font-sans text-[13px] leading-relaxed text-(--muted) border-t border-(--line) pt-5">
            The important question is not whether every review is positive. It is whether the negatives feel isolated or repeated.
          </p>
        </Container>
      </section>

      <section id="reviews" className="border-b border-(--line) bg-(--bg) py-22">
        <Container>
          <BlockHeading title="What Reviewers Say" body="Public reviews are most useful when treated as patterns, not isolated quotes. Negative-first ordering shows the most decision-relevant signals at the top." />
          <WhatReviewersSay reviews={reviews} providerName={provider.name} googleMapsUrl={googleMapsUrl} />
        </Container>
      </section>

      <section id="results" className="border-b border-(--line) bg-(--wash) py-22">
        <Container>
          <BlockHeading title="Rating Summary" body="Start with the biggest signals first. These do not tell the whole story, but they tell you where to look closer." />
          <ResultsSnapshot {...resultsSummary} />
        </Container>
      </section>

      <section id="pricing" className="border-b border-(--line) bg-(--bg) py-22">
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

      <section id="treatment" className="border-b border-(--line) bg-(--surface) py-22">
        <Container>
          <BlockHeading title="Treatment Approach and Technology" body="Brand reputation matters, but treatment fit matters more. A provider can look strong overall and still be a weak fit for a specific tattoo or skin profile." />
          <InfoCard label="Method and technology" body={buildTreatmentOverview([provider])} link="See our method comparison guide" linkHref="/comparisons/best-tattoo-removal-method" />
        </Container>
      </section>

      <section id="local-context" className="border-b border-(--line) bg-(--bg) py-22">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="border border-(--line) bg-white p-6 rounded-xl">
            <p className="font-sans font-semibold text-[22px] leading-[1.1] tracking-[-0.02em] text-(--ink) mb-3">
              Local and City Context
            </p>
            <p className="text-[14px] leading-relaxed text-(--muted)">
              {provider.name} operates in {provider.market}. If you already know your city, move next to the local comparison page before making a decision. A national reputation can be directionally useful, but local execution still matters.
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
                <span key={tag} className="border border-(--line) bg-(--surface) px-3 py-1 font-sans text-[11px] tracking-widest uppercase text-(--muted)">{tag}</span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="alternatives" className="border-b border-(--line) bg-(--surface) py-22">
        <Container>
          <BlockHeading title="Best Alternatives" body={`No provider should be reviewed in isolation. If you are considering ${provider.name}, these are the alternatives worth comparing next.`} />
          <AlternativesSection alternatives={alternatives} />
          <p className="mt-8 font-sans text-[14px] leading-relaxed text-(--muted)">
            The right outcome is not choosing the most familiar brand. It is choosing the provider whose strengths match your case most closely.
          </p>
        </Container>
      </section>

      {/* ── Who it fits ──────────────────────────────────────────────────── */}
      <section id="best-for" className="border-b border-(--line) bg-(--bg) py-22">
        <Container>
          <BlockHeading title={`Who ${provider.name} Is Best For`} body="Use this section to quickly judge whether this provider fits your situation before going deeper." />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-md">
              <p className="mb-4 text-[15px] font-semibold text-(--ink)">{provider.name} may be a strong option if you:</p>
              <ul className="flex flex-col gap-2">
                {bestForData.bestFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[13px] leading-relaxed text-(--muted)">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "#5A7A5A" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-md">
              <p className="mb-4 text-[15px] font-semibold text-(--ink)">You should compare more carefully if you:</p>
              <ul className="flex flex-col gap-2">
                {bestForData.lessIdealFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[13px] leading-relaxed text-(--muted)">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="border-b border-(--line) bg-(--surface) py-22">
        <Container>
          <BlockHeading title="Frequently Asked Questions" body={`Common questions from people researching ${provider.name} before making a booking decision.`} />
          <FaqAccordion items={faqItems.map((i) => ({ question: i.q, answer: i.a }))} />
        </Container>
      </section>

      {/* ── Bottom line ──────────────────────────────────────────────────── */}
      <section id="bottom-line" className="bg-(--bg) py-22">
        <Container>
          <BlockHeading title={`Bottom Line on ${provider.name}`} body={bottomLine.copy} />
          <p className="-mt-4 mb-10 font-sans text-[14px] leading-relaxed text-(--muted) max-w-prose">
            {bottomLine.actionLine}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="#alternatives" className="inline-flex items-center px-5 py-2.5 bg-(--ink) text-(--bg) font-sans text-[13px] font-medium no-underline tracking-[-0.01em] rounded-full">
              Compare {provider.name} Alternatives
            </Link>
            <Link href="/reviews" className="inline-flex items-center px-5 py-2.5 border border-(--line) text-(--ink) font-sans text-[13px] font-medium no-underline tracking-[-0.01em] rounded-full">
              Read Tattoo Removal Reviews
            </Link>
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
