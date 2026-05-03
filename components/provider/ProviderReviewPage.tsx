import Link from "next/link";
import Container from "@/components/layout/Container";
import AlternativesSection from "./AlternativesSection";
import BlockHeading from "./BlockHeading";
import JumpNav from "./JumpNav";
import ProviderHero from "./ProviderHero";
import VerdictCard from "./VerdictCard";
import MonoLabel from "@/components/reviews/MonoLabel";
import WhatReviewersSay from "@/components/reviews/WhatReviewersSay";
import type { SanityProviderReview } from "@/lib/page-data/reviews";
import type { Provider } from "@/types/provider";
import type { Review } from "@/types/review";
import FAQSection from "@/components/sections/FAQSection";
import BlobBackground from "@/components/ui/BlobBackground";
import {
  getAlternativeProviders,
  getVerdictFromRating,
  summarizeSources,
} from "@/lib/provider-analysis";
import { getLocationSlug } from "@/lib/providers";
import LocationsSection from "./LocationsSection";

interface Props {
  review: SanityProviderReview;
  locations: Provider[];
  reviews: Review[];
  slug: string;
}

function VerdictTable({ review }: { review: SanityProviderReview }) {
  const rows = [
    { label: "Method",                   value: review.method },
    { label: "Technology",               value: review.technology },
    { label: "Locations",                value: review.locationsValue },
    { label: "Typical sessions",         value: review.typicalSessions },
    { label: "Typical timeline",         value: review.typicalTimeline },
    { label: "Healing per session",      value: review.healingPerSession },
    { label: "Pricing model",            value: review.pricingModel },
    { label: "Years operating",          value: review.yearsOperating },
    { label: "Public reviews analyzed",  value: review.publicReviewsAnalyzed },
    { label: "Best for",                 value: review.bestFor?.join(", ") },
    { label: "Less ideal for",           value: review.lessIdealFor?.join(", ") },
  ];

  return (
    <div className="overflow-x-auto border border-(--line) rounded-xl">
      <table className="w-full border-collapse text-[13px]">
        <tbody>
          {rows.map(({ label, value }) =>
            value ? (
              <tr key={label} className="last:border-0">
                <td className="py-3 px-5 font-sans text-[11px] uppercase tracking-widest text-heading whitespace-nowrap w-55 bg-(--surface)">
                  {label}
                </td>
                <td className="py-3 px-5 text-(--ink) leading-relaxed">{value}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function ProviderReviewPage({ review, locations, reviews, slug }: Props) {
  const avgRatingValue =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length
      : locations.length > 0
        ? locations.reduce((s, l) => s + l.rating, 0) / locations.length
        : 4.5;
  const avgRating = avgRatingValue.toFixed(1);
  const totalReviews =
    reviews.length || locations.reduce((s, l) => s + l.reviewCount, 0);
  // Pass reviews so the verdict composer uses the multi-signal path. Without
  // this, the function falls into the legacy three-bucket branch and emits
  // older comparative phrasing like "above most covered providers in this
  // category", which we no longer produce on BrandReviewsPage or
  // SingleProviderReviewsPage.
  const verdict = getVerdictFromRating(avgRatingValue, reviews);
  const alternatives = getAlternativeProviders(locations, slug);
  const providerTags = locations
    .flatMap((l) => l.tags ?? [])
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 6);
  const jumpItems = [
    { label: "Verdict",     href: "#verdict" },
    { label: "Reviews",     href: "#reviews" },
    { label: "Does well",   href: "#does-well" },
    { label: "Hesitations", href: "#hesitations" },
    { label: "Different",   href: "#different" },
    { label: "Pricing",     href: "#pricing" },
    { label: "Compares",    href: "#comparison" },
    { label: "Locations",   href: "#locations" },
    { label: "Best for",    href: "#best-for" },
    { label: "FAQ",         href: "#faq" },
    { label: "Methodology", href: "#methodology" },
  ];

  return (
    <BlobBackground>
    <main className="reviews-page min-h-screen">
      <ProviderHero
        breadcrumb={["Reviews", review.providerName]}
        nameNode={<>{review.providerName}</>}
        body={`See how ${review.providerName} compares on method, technology, pricing, and real user feedback before you book.`}
        tags={providerTags}
        reviewCount={totalReviews}
        reviewsHref="#verdict"
        card={
          <VerdictCard
            verdictLabel={verdict.label}
            avgRating={avgRating}
            avgRatingValue={avgRatingValue}
            reviewCount={totalReviews}
            sourcesSummary={summarizeSources(reviews)}
            verdictSummary={verdict.summary}
            bestFor={review.bestFor?.[0]}
            lessIdealFor={review.lessIdealFor?.[0]}
          />
        }
      />

      <JumpNav items={jumpItems} />

      {/* Verdict */}
      <section id="verdict" className="py-22">
        <Container>
          <BlockHeading
            title={`${review.providerName} Verdict`}
            body={review.verdictLead ?? ""}
          />
          <VerdictTable review={review} />
          {locations.length > 1 && (
            <p className="mt-4 font-sans text-[11px] uppercase tracking-widest text-heading">
              Aggregate rating is a weighted composite across{" "}
              {locations.length} Google Business locations. Individual location ratings
              range from{" "}
              {Math.min(...locations.map((l) => l.rating)).toFixed(1)} to{" "}
              {Math.max(...locations.map((l) => l.rating)).toFixed(1)}.
            </p>
          )}
        </Container>
      </section>

      {/* What Reviewers Say */}
      {reviews.length > 0 && (
        <section id="reviews" className="py-22">
          <Container>
            <BlockHeading
              title="What Reviewers Say"
              body="Public reviews are most useful when treated as patterns, not isolated quotes. Negative-first ordering shows the most decision-relevant signals at the top."
            />
            <WhatReviewersSay reviews={reviews} providerName={review.providerName} />
          </Container>
        </section>
      )}

      {/* What the Provider Does Well */}
      <section id="does-well" className="py-22">
        <Container>
          <BlockHeading title={`What ${review.providerName} Does Well`} body="" />
          <ul className="flex flex-col gap-3 mt-2">
            {review.doesWell?.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[14px] leading-relaxed text-(--ink)"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Where Users Hesitate */}
      <section id="hesitations" className="py-22">
        <Container>
          <BlockHeading title="Where Users Hesitate" body="" />
          <ul className="flex flex-col gap-3 mt-2">
            {review.usersHesitate?.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[14px] leading-relaxed text-(--ink)"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-warning mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* What Makes Different */}
      <section id="different" className="py-22">
        <Container>
          <BlockHeading
            title={`What Makes ${review.providerName} Different`}
            body=""
          />
          <div className="max-w-prose">
            {review.whatMakesDifferent
              ?.split("\n\n")
              .map((para, i) => (
                <p key={i} className="text-[14px] leading-relaxed text-heading mb-4">
                  {para}
                </p>
              ))}
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-22">
        <Container>
          <BlockHeading title={`${review.providerName} Pricing`} body="" />
          <div className="max-w-prose">
            {review.pricingBody
              ?.split("\n\n")
              .map((para, i) => (
                <p key={i} className="text-[14px] leading-relaxed text-heading mb-4">
                  {para}
                </p>
              ))}
          </div>
          <p className="mt-2 text-[13px] text-heading">
            <Link href="/cost" className="text-(--accent) hover:underline">
              Compare against the national cost guide
            </Link>
          </p>
        </Container>
      </section>

      {/* Comparison */}
      <section id="comparison" className="py-22">
        <Container>
          <BlockHeading
            title={`How ${review.providerName} Compares`}
            body=""
          />
          <div className="max-w-prose mb-10">
            {review.comparisonBody
              ?.split("\n\n")
              .map((para, i) => (
                <p key={i} className="text-[14px] leading-relaxed text-heading mb-4">
                  {para}
                </p>
              ))}
          </div>
          <AlternativesSection alternatives={alternatives} />
        </Container>
      </section>

      {/* Locations */}
      <LocationsSection
        title={`${review.providerName} Locations`}
        body={
          locations.length === 1
            ? "This provider operates at a single location."
            : `${review.providerName} has ${locations.length} locations. Individual location ratings differ from the aggregate shown above. See each location below.`
        }
        locations={locations}
        slug={slug}
        websiteHref={locations[0]?.website}
      />

      {/* Who It Is Best For */}
      <section id="best-for" className="py-22">
        <Container>
          <BlockHeading
            title={`Who ${review.providerName} Is Best For`}
            body="Use this section to quickly judge whether this provider fits your situation before going deeper."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-md">
              <p className="mb-4 text-[15px] font-semibold text-(--ink)">
                {review.providerName} is most likely the right fit if you:
              </p>
              <ul className="flex flex-col gap-2">
                {(review.bestForDetails ?? review.bestFor)?.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[13px] leading-relaxed text-heading">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "#5A7A5A" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-md">
              <p className="mb-4 text-[15px] font-semibold text-(--ink)">
                Compare more carefully if you:
              </p>
              <ul className="flex flex-col gap-2">
                {(review.lessIdealForDetails ?? review.lessIdealFor)?.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[13px] leading-relaxed text-heading">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      {review.faqItems && (
        <FAQSection
          id="faq"
          title={`${review.providerName} Frequently Asked Questions`}
          description={`Common questions from people researching ${review.providerName} before making a booking decision.`}
          faqs={review.faqItems}
        />
      )}

      {/* How We Reviewed */}
      <section id="methodology" className="py-22">
        <Container>
          <BlockHeading title={`How We Reviewed ${review.providerName}`} body="" />
          <div className="max-w-prose border border-(--line) bg-(--surface) rounded-xl p-6">
            {review.publicReviewsAnalyzed && locations.length > 0 && (
              <p className="text-[14px] leading-relaxed text-heading mb-4">
                This review draws on {review.publicReviewsAnalyzed} patient reviews publicly
                posted on Google Business listings for all {locations.length}{" "}
                {review.providerName}{" "}
                {locations.length === 1 ? "location" : "locations"}.
              </p>
            )}
            {locations.length > 1 && (
              <p className="text-[14px] leading-relaxed text-heading mb-4">
                The aggregate rating shown on this page is a weighted composite across all{" "}
                {locations.length} locations, calculated from the total review pool across
                all Google Business listings. Individual location ratings differ from the
                aggregate. The per-location breakdown is in the Locations section above.
              </p>
            )}
            <p className="text-[14px] leading-relaxed text-heading mb-4">
              We excluded non-English reviews and reviews referring to unrelated services at
              the same business address.
            </p>
            <p className="text-[14px] leading-relaxed text-heading mb-4">
              These reviews are publicly posted by patients on Google. RealTattooReviews does
              not host user-submitted reviews. All review data is sourced from public
              platforms.
            </p>
            <p className="text-[14px] leading-relaxed text-heading mb-4">
              Provider data is verified against {review.providerName}&apos;s website and
              public sources.
            </p>
            <p className="text-[14px] leading-relaxed text-heading mb-4">
              We do not accept payment from {review.providerName} or any other provider for
              inclusion, placement, or favorable coverage. Providers cannot edit, remove, or
              pre-approve their reviews on RealTattooReviews.
            </p>
            <p className="text-[14px] leading-relaxed text-heading mb-4">
              This review will be updated as new public review data becomes available, as{" "}
              {review.providerName} adds or closes locations, or as the provider&apos;s
              methods or supporting clinical evidence changes.
            </p>
            <p className="text-[13px] text-heading">
              Read more in our{" "}
              <Link href="/methodology" className="text-(--accent) hover:underline">
                methodology
              </Link>{" "}
              and{" "}
              <Link href="/editorial-policy" className="text-(--accent) hover:underline">
                editorial policy
              </Link>
              .
            </p>
            {review.lastReviewed && (
              <p className="mt-4 font-sans text-[11px] uppercase tracking-widest text-heading">
                Last reviewed:{" "}
                {new Date(review.lastReviewed).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
        </Container>
      </section>


      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            articleSection: "Reviews",
            about: { "@type": "Organization", name: review.providerName },
            headline: `${review.providerName} Review`,
            mainEntityOfPage: `https://realtattooreviews.com/reviews/${slug}/`,
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
            ...(review.datePublished ? { datePublished: review.datePublished } : {}),
            ...(review.lastReviewed ? { dateModified: review.lastReviewed } : {}),
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://realtattooreviews.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Reviews",
                item: "https://realtattooreviews.com/reviews/",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: review.providerName,
                item: `https://realtattooreviews.com/reviews/${slug}/`,
              },
            ],
          }),
        }}
      />

      {review.faqItems && review.faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: review.faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            }),
          }}
        />
      )}
    </main>
    </BlobBackground>
  );
}
