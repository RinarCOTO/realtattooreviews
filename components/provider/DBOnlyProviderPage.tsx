import Link from "next/link";
import Container from "@/components/layout/Container";
import BlockHeading from "./BlockHeading";
import BestForSection from "./BestForSection";
import FAQSection from "@/components/sections/FAQSection";
import JumpNav from "./JumpNav";
import ProsCons from "./ProsCons";
import ResultsSnapshot from "./ResultsSnapshot";
import WhatReviewersSay from "@/components/reviews/WhatReviewersSay";
import StarsFull from "./StarsFull";
import VerdictSidebar from "./VerdictSidebar";
import type { Review } from "@/types/review";
import {
  buildBestFor,
  buildFAQ,
  buildOverviewStats,
  buildProsConsFromReviews,
  buildResultsSummary,
  getVerdictFromRating,
  verdictColors,
} from "@/lib/provider-analysis";

interface DBOnlyProviderPageProps {
  slug: string;
  reviews: Review[];
}

export default function DBOnlyProviderPage({ slug, reviews }: DBOnlyProviderPageProps) {
  const providerName = reviews[0]?.provider ?? slug;
  const market = reviews[0]
    ? `${reviews[0].city ?? ""}${reviews[0].state ? `, ${reviews[0].state}` : ""}`.trim()
    : "";
  const avgRatingValue = reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length;
  const avgRating = avgRatingValue.toFixed(1);
  const verdict = getVerdictFromRating(avgRatingValue);
  const { pros, cons } = buildProsConsFromReviews(reviews);
  const resultsSummary = buildResultsSummary(reviews);
  const faqItems = buildFAQ(providerName, market || undefined);
  const bestForData = buildBestFor([], reviews);
  return (
    <main className="reviews-page min-h-screen bg-(--bg)">
      <section className="relative overflow-hidden border-b border-primary-strong bg-primary py-14">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-1/3 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
        <Container>
          <p className="mb-4 text-sm text-white/70">
            <Link href="/reviews" className="hover:text-white">Reviews</Link>
            {" / "}
            <span className="text-white/90">{providerName}</span>
          </p>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <h1 className="text-[40px] font-black leading-tight text-white">{providerName} Reviews</h1>
              {market && (
                <p className="mt-3 text-[15px] leading-relaxed text-white/80">
                  {reviews.length} sourced reviews from {market}. Compare outcomes, session experience, and pricing context before deciding.
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/60">Reviews</p>
                  <p className="mt-1 text-[32px] font-black leading-none text-white">{reviews.length}</p>
                </div>
                {market && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/60">Location</p>
                    <p className="mt-1 text-[32px] font-black leading-none text-white">{market.split(",")[0].trim()}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-6 lg:items-center lg:text-center">
              <p className="text-xs uppercase tracking-widest text-white/60">Avg rating</p>
              <p className="text-[64px] font-black leading-none text-white">{avgRating}</p>
              <StarsFull rating={Math.round(avgRatingValue)} />
              <span className={`mt-1 rounded-full px-4 py-1.5 text-sm font-bold ${verdictColors(verdict.label).badge}`}>
                {verdict.label}
              </span>
            </div>
          </div>
        </Container>
      </section>

      <JumpNav items={[
        { label: "Overview",   href: "#overview" },
        { label: "Reviews",    href: "#reviews" },
        { label: "Results",    href: "#results" },
        { label: "Who it fits", href: "#best-for" },
        { label: "FAQ",        href: "#faq" },
      ]} />

      <section id="overview" className="border-b border-(--line) bg-(--surface) py-22">
        <Container>
          <BlockHeading title="Overview" body="Quick verdict and the most meaningful positives and cautions from the review data." />
          <VerdictSidebar rows={buildOverviewStats(reviews)} />
          <ProsCons pros={pros} cons={cons} />
        </Container>
      </section>

      <section id="reviews" className="border-b border-(--line) bg-(--bg) py-22">
        <Container>
          <BlockHeading title="What Reviewers Say" body="Public reviews are most useful when treated as patterns, not isolated quotes. Negative-first ordering shows the most decision-relevant signals at the top." />
          <WhatReviewersSay reviews={reviews} providerName={providerName} />
        </Container>
      </section>

      <section id="results" className="border-b border-(--line) bg-(--surface) py-22">
        <Container>
          <BlockHeading title="Rating Summary" body="Start with the biggest signals first. These do not tell the whole story, but they tell you where to look closer." />
          <ResultsSnapshot {...resultsSummary} />
        </Container>
      </section>

      <BestForSection
        providerName={providerName}
        bestFor={bestForData.bestFor}
        lessIdealFor={bestForData.lessIdealFor}
      />

      <FAQSection
        id="faq"
        description={`Common questions from people researching ${providerName} before making a booking decision.`}
        faqs={faqItems.map((i) => ({ question: i.q, answer: i.a }))}
      />
    </main>
  );
}
