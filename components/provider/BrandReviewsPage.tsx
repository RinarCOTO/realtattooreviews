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
import { getLocationSlug } from "@/lib/providers";
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
  const bestForData = buildBestFor(locations, reviews);
  const bottomLine = buildBottomLine(brand, locations, reviews, alternatives);
  const brandTags = unique(locations.flatMap((l) => l.tags ?? [])).slice(0, 6);
  // Use first location's Google Business URL if populated; fall back to Maps search
  const googleMapsUrl =
    locations.find((l) => l.googleBusinessUrl)?.googleBusinessUrl ||
    `https://www.google.com/maps/search/${encodeURIComponent(`${brand} tattoo removal`)}`;
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
            verdictSummary={verdict.summary}
            bestFor={bestForData.bestFor[0]}
            lessIdealFor={bestForData.lessIdealFor[0]}
          />
        }
      />

      <JumpNav items={jumpItems} />

      <section id="overview" className="border-b border-(--line) bg-card py-22">
        <Container>
          <BlockHeading title={`Is ${brand} Worth It?`} body="For some users, yes. The question is whether the reviews, treatment approach, pricing, and location consistency make it a good fit for your tattoo, budget, and goals." />
          <p className="-mt-4 mb-8 font-sans text-[14px] leading-relaxed text-(--muted) max-w-prose">
            If you are already researching {brand} by name, this page should help you answer three things quickly: whether the provider seems credible, what the most common patient patterns look like, and which alternatives are worth comparing before you commit.
          </p>
          <VerdictSidebar rows={buildOverviewStats(reviews)} />
          <ProsCons pros={pros} cons={cons} />
          <p className="mt-6 font-sans text-[13px] leading-relaxed text-(--muted) border-t border-(--line) pt-5">
            The important question is not whether every review is positive. It is whether the negatives feel isolated or repeated.
          </p>
        </Container>
      </section>

      <section id="reviews" className="border-b border-(--line) bg-(--surface) py-22">
        <Container>
          <BlockHeading title="What Reviewers Say" body="Public reviews are most useful when treated as patterns, not isolated quotes. Negative-first ordering shows the most decision-relevant signals at the top." />
          <WhatReviewersSay reviews={reviews} providerName={brand} googleMapsUrl={googleMapsUrl} />
        </Container>
      </section>

      <section id="results" className="border-b border-(--line) bg-(--bg) py-22">
        <Container>
          <BlockHeading title="Rating Summary" body="Start with the biggest signals first. These do not tell the whole story, but they tell you where to look closer." />
          <ResultsSnapshot {...resultsSummary} />
        </Container>
      </section>

      <section id="pricing" className="border-b border-(--line) bg-(--surface) py-22">
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
                href={`/reviews/${slug}#${getLocationSlug(location)}`}
                className="group flex flex-col gap-3 border border-(--line) bg-white p-5 rounded-xl transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <p className="font-semibold text-(--ink) text-[15px]">{location.market}</p>
                  <div className="text-right shrink-0">
                    <p className="font-sans font-semibold text-[13px] text-(--accent)">{location.rating}</p>
                    <p className="text-[11px] text-(--muted)">
                      {location.rating >= 4.5 ? "Strong" : location.rating >= 4.0 ? "Solid" : "Mixed"}
                    </p>
                  </div>
                </div>
                <p className="text-[13px] leading-relaxed text-(--muted) line-clamp-3">{location.summary}</p>
                <div className="mt-auto flex items-center justify-between border-t border-(--line) pt-3">
                  <span className="text-[13px] text-(--muted)">{location.reviewCount} reviews</span>
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
          <p className="mt-8 font-sans text-[14px] leading-relaxed text-(--muted)">
            The right outcome is not choosing the most familiar brand. It is choosing the provider whose strengths match your case most closely.
          </p>
        </Container>
      </section>

      {/* ── Who it fits ──────────────────────────────────────────────────── */}
      <section id="best-for" className="border-b border-(--line) bg-(--surface) py-22">
        <Container>
          <BlockHeading title={`Who ${brand} Is Best For`} body="Use this section to quickly judge whether this provider fits your situation before going deeper." />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-md">
              <p className="mb-4 text-[15px] font-semibold text-(--ink)">{brand} may be a strong option if you:</p>
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
      <section id="faq" className="border-b border-(--line) bg-(--bg) py-22">
        <Container>
          <BlockHeading title="Frequently Asked Questions" body={`Common questions from people researching ${brand} before making a booking decision.`} />
          <FaqAccordion items={faqItems.map((i) => ({ question: i.q, answer: i.a }))} />
        </Container>
      </section>

      {/* ── Bottom line ──────────────────────────────────────────────────── */}
      <section id="bottom-line" className="bg-heading py-22">
        <Container>
          <div className="mb-8 max-w-2xl">
            <h2 className="font-sans font-bold text-[32px] leading-[1.1] tracking-[-0.02em] text-white mb-3 m-0">
              Bottom Line on {brand}
            </h2>
            <p className="text-[15px] leading-[1.6] text-white/70">{bottomLine.copy}</p>
          </div>
          <p className="-mt-4 mb-10 font-sans text-[14px] leading-relaxed text-subtle max-w-prose">
            {bottomLine.actionLine}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="#alternatives" className="inline-flex items-center px-5 py-2.5 bg-accent text-white font-sans text-[13px] font-medium no-underline tracking-[-0.01em] rounded-full hover:bg-accent-hover transition-colors">
              Compare {brand} Alternatives
            </Link>
            <Link href="/reviews" className="inline-flex items-center px-5 py-2.5 border border-white/20 text-white font-sans text-[13px] font-medium no-underline tracking-[-0.01em] rounded-full hover:border-white/50 transition-colors">
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
  );
}
