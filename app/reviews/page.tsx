import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import MonoLabel from "@/components/reviews/MonoLabel";
import FAQSection from "@/components/sections/FAQSection";
import PageSection from "@/components/reviews/PageSection";
import ReviewCard from "@/components/reviews/ReviewCard";
import ProvidersTable from "@/components/reviews/ProvidersTable";
import { getRecentReviews, getReviewStats, selectDiverseReviews, getAllProviderAggregates } from "@/lib/data/reviews";
import { getAllProviders, type SanityProvider } from "@/lib/page-data/providers";
import { brandToSlug } from "@/lib/providers";
import { providers as mockProviders } from "@/lib/mock-data/providers";
import type { Provider } from "@/types/provider";
import { cities } from "@/lib/mock-data/cities";

function sanityToProvider(p: SanityProvider): Provider {
  return {
    id: p.slug,
    name: p.name,
    slug: p.slug,
    brand: p.brand ?? undefined,
    market: p.market ?? "",
    rating: p.rating ?? 0,
    reviewCount: p.reviewCount ?? 0,
    summary: p.summary ?? "",
    tags: p.tags ?? [],
    specialty: p.specialty ?? undefined,
    yearsActive: p.yearsActive ?? undefined,
    featured: p.featured ?? undefined,
  };
}

// ── Static data ───────────────────────────────────────────────────────────────

const RESEARCH_LINKS = [
  { label: "How much does removal cost?", href: "/cost" },
  { label: "Before and after results", href: "/before-and-after" },
  { label: "Laser vs non-laser compared", href: "/comparisons/best-tattoo-removal-method" },
  { label: "Healing and aftercare", href: "/guides/tattoo-removal-aftercare" },
];

// ── SEO ───────────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const stats = await getReviewStats();
  const title = `Tattoo Removal Reviews: ${stats.totalReviews} Sourced Reviews Across ${stats.totalProviders} Providers`;
  const description = `Compare tattoo removal providers using ${stats.totalReviews} sourced reviews across ${stats.totalCities} cities. Ratings, complaint patterns, session expectations, and cost signals before you book.`;
  return {
    title,
    description,
    openGraph: { title, description },
    alternates: {
      canonical: "https://realtattooreviews.com/reviews",
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ReviewsPage() {
  const [stats, allReviewsPool, liveAggregates] = await Promise.all([
    getReviewStats(),
    getRecentReviews(60),
    getAllProviderAggregates(),
  ]);

  const sanityProviders = await getAllProviders();
  const baseProviders: Provider[] = sanityProviders.length > 0
    ? sanityProviders.map(sanityToProvider)
    : mockProviders;

  // Overlay live DB aggregates onto every provider object so the table and
  // inkOUT FAQ stats reflect the filtered review pool, not hardcoded values.
  const allProviders: Provider[] = baseProviders.map((p) => ({
    ...p,
    rating: liveAggregates[p.slug]?.rating ?? p.rating,
    reviewCount: liveAggregates[p.slug]?.reviewCount ?? p.reviewCount,
  }));

  // Mixed reviews: sort pool by rating alternating high/low for natural interleaving
  const highRated = allReviewsPool.filter((r) => (r.rating ?? 0) >= 4);
  const lowRated  = allReviewsPool.filter((r) => (r.rating ?? 0) <= 3);
  const interleaved = highRated.flatMap((h, i) => (lowRated[i] ? [h, lowRated[i]] : [h]));
  const mixedReviews = selectDiverseReviews(interleaved, 6);

  // inkOUT stats for FAQ answer
  const inkoutLocs = allProviders.filter(
    (p) => brandToSlug(p.brand ?? "") === "inkout"
  );
  const inkoutReviews = inkoutLocs.reduce((s, p) => s + (p.reviewCount ?? 0), 0);
  const inkoutLocCount = inkoutLocs.length;
  const inkoutAvg =
    inkoutLocs.length > 0
      ? (inkoutLocs.reduce((s, p) => s + (p.rating ?? 0), 0) / inkoutLocs.length).toFixed(1)
      : "4.4";

  // FAQ items built with live DB numbers
  const faqs = [
    {
      question: "Are tattoo removal reviews trustworthy?",
      answer: `They can be, if you read patterns rather than single quotes. One glowing review and one complaint both tell you almost nothing. ${stats.totalReviews} sourced reviews across ${stats.totalProviders} providers tell you a great deal. This page is designed to surface those patterns, not promote individual clinics.`,
    },
    {
      question: "What should I look for in tattoo removal reviews?",
      answer: "Look for: review count (more volume means more signal), complaint patterns (especially scarring, session count underestimates, and billing disputes), whether positive experiences are consistent or isolated, and whether the provider sets realistic expectations about pain and sessions. Single five-star reviews are easy to post. Consistent patterns across dozens of reviews are harder to fake.",
    },
    {
      question: `Is inkOUT worth it?`,
      answer: `inkOUT is the most-reviewed provider in our index: ${inkoutReviews} sourced reviews across ${inkoutLocCount} locations with a ${inkoutAvg} average. That volume makes it one of the more reliable providers to evaluate. Whether it is the right fit depends on your city, tattoo, and budget. Read the full inkOUT brand page to see location-level patterns before deciding.`,
    },
    {
      question: "Are tattoo removal clinics safe?",
      answer: `Most are, when operated correctly. Of ${stats.totalReviews} reviews in our index, ${stats.scarringMentions} mention scarring or skin damage. That is a small percentage, but it is not zero. Scarring risk increases with undertrained operators, overly aggressive settings, and poor aftercare. Look for providers who discuss aftercare explicitly and have consistent safety signals across their reviews.`,
    },
    {
      question: "How many sessions does tattoo removal take?",
      answer: "Most professional tattoos require 5 to 10 sessions with a quality laser. Amateur tattoos and lighter inks often clear faster. Colors other than black (especially greens and blues) take longer. Clinics that quote 3 sessions without examining your tattoo are not giving you an honest answer. Use session count expectations in reviews as a trust signal.",
    },
  ];

  return (
    <div className="reviews-page">

      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      <section className="border-b border-(--line) pt-24 pb-20 bg-(--feathering-mist)">
        <Container>
          <MonoLabel color="accent" size="sm" className="mb-6 flex items-center gap-2.5">
            <span className="inline-block w-6 h-px bg-(--accent)" />
            Independent Provider Reviews
            {stats.lastUpdated && (
              <span className="text-(--muted) font-normal normal-case tracking-normal">
                · Updated {stats.lastUpdated}
              </span>
            )}
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(48px,7.5vw,92px)] leading-[0.98] tracking-[-0.035em] m-0 text-(--ink) max-w-[14ch]">
            Tattoo Removal Reviews
          </h1>

          <p className="mt-7 font-sans font-normal text-[19px] leading-normal text-(--muted) max-w-160">
            {stats.totalReviews.toLocaleString()} sourced reviews across {stats.totalProviders} providers in {stats.totalCities} cities. Brand sites hide negative reviews. Yelp won't synthesize them across providers. This page does both.
          </p>

          <div className="mt-10 flex flex-wrap gap-2.5">
            <Link
              href="#providers"
              className="inline-flex items-center px-6 py-3 bg-(--ink) text-(--bg) font-sans text-[14px] font-medium no-underline tracking-[-0.01em] rounded-full"
            >
              Compare Providers →
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center px-6 py-3 border border-(--line) text-(--ink) font-sans text-[14px] font-medium no-underline tracking-[-0.01em] rounded-full"
            >
              How We Evaluate Clinics
            </Link>
          </div>

          {/* Stat strip */}
          <div className="mt-20 grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] border-t border-b border-(--line)">
            {[
              { n: stats.totalReviews.toLocaleString(), l: "Sourced reviews" },
              { n: stats.totalProviders, l: "Providers tracked" },
              { n: stats.totalCities, l: "Cities covered" },
              { n: "0", l: "Paid placements" },
            ].map((s, i) => (
              <div
                key={i}
                className="px-6 py-7"
                style={{ borderLeft: i === 0 ? "none" : "1px solid var(--line)" }}
              >
                <div className="font-serif text-[44px] leading-none tracking-[-0.03em] text-(--ink)">
                  {s.n}
                </div>
                <MonoLabel className="mt-2.5">{s.l}</MonoLabel>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 2. Trust strip ───────────────────────────────────────────────── */}
      <PageSection id="methodology" bg="surface" className="py-18">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-12">
          <div className="flex flex-col">
            <MonoLabel color="accent" size="sm" className="mb-4">01 /</MonoLabel>
            <h3 className="font-normal text-[22px] leading-[1.15] text-(--ink) m-0 mb-3">
              Negative reviews are included, not filtered
            </h3>
            <p className="text-[14px] text-(--muted) m-0 mb-4 flex-1">
              Every sourced review in our index is public record from Google Business Profile. We do not remove low ratings, hide complaints, or rank providers who pay us. If {stats.scarringMentions > 0 ? `${stats.scarringMentions} reviews across our index mention scarring` : "reviews mention scarring"}, that stays in.
            </p>
            <Link href="/methodology" className="text-[13px] text-(--accent) font-medium no-underline border-b border-current pb-px self-start">
              Collection methodology →
            </Link>
          </div>
          <div className="flex flex-col">
            <MonoLabel color="accent" size="sm" className="mb-4">02 /</MonoLabel>
            <h3 className="font-normal text-[22px] leading-[1.15] text-(--ink) m-0 mb-3">
              Complaint patterns are flagged, not buried
            </h3>
            <p className="text-[14px] text-(--muted) m-0 mb-4 flex-1">
              We flag when the same complaint appears across multiple reviews or locations. Scarring mentions, billing disputes, session count underestimates, and aftercare failures all surface in provider pages. A single complaint is noise. A pattern is a signal.
            </p>
            <Link href="/methodology" className="text-[13px] text-(--accent) font-medium no-underline border-b border-current pb-px self-start">
              Read the full methodology →
            </Link>
          </div>
          <div className="flex flex-col">
            <MonoLabel color="accent" size="sm" className="mb-4">03 /</MonoLabel>
            <h3 className="font-normal text-[22px] leading-[1.15] text-(--ink) m-0 mb-3">
              No paid placements, no affiliate rankings
            </h3>
            <p className="text-[14px] text-(--muted) m-0 mb-4 flex-1">
              No provider pays to appear here or to rank higher. Provider order in the table below defaults to review count, not revenue. We do not accept sponsored placements.
            </p>
            <Link href="/editorial" className="text-[13px] text-(--accent) font-medium no-underline border-b border-current pb-px self-start">
              Editorial policy →
            </Link>
          </div>
        </div>
      </PageSection>

      {/* ── 3. Recent reviews (mixed positive + negative) ────────────────── */}
      <PageSection id="reviews">
        <div className="mb-10">
          <MonoLabel color="accent" size="sm" className="mb-4">03 · Recent reviews</MonoLabel>
          <h2 className="font-sans font-bold text-[clamp(28px,4vw,42px)] leading-[1.05] tracking-[-0.025em] text-(--ink) m-0 mb-3">
            What Patients Are Actually Saying
          </h2>
          <p className="font-sans text-[16px] leading-relaxed text-(--muted) max-w-prose m-0">
            Positive and negative reviews side by side. One high-rated clinic and one complaint-flagged clinic appearing in the same section is intentional.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {mixedReviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </PageSection>

      {/* ── 4. All providers table ───────────────────────────────────────── */}
      <PageSection id="providers" bg="surface">
        <div className="mb-10">
          <MonoLabel color="accent" size="sm" className="mb-4">04 · All providers</MonoLabel>
          <h2 className="font-sans font-bold text-[clamp(28px,4vw,42px)] leading-[1.05] tracking-[-0.025em] text-(--ink) m-0 mb-3">
            Compare Tattoo Removal Providers
          </h2>
          <p className="font-sans text-[16px] leading-relaxed text-(--muted) max-w-prose m-0">
            Every provider in our index. Sort by rating, review count, or city. Click a provider name to open the full review page.
          </p>
        </div>
        <ProvidersTable providers={allProviders} />
      </PageSection>

      {/* ── 5. Browse by city ───────────────────────────────────────────── */}
      <PageSection id="cities">
        <div className="mb-10">
          <MonoLabel color="accent" size="sm" className="mb-4">05 · By city</MonoLabel>
          <h2 className="font-sans font-bold text-[clamp(28px,4vw,42px)] leading-[1.05] tracking-[-0.025em] text-(--ink) m-0 mb-3">
            Browse by City
          </h2>
          <p className="font-sans text-[16px] leading-relaxed text-(--muted) max-w-prose m-0">
            National brand ratings are a starting point. Local execution still matters. Each city page shows which providers operate there and how their reviews compare locally.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] border border-(--line)">
          {cities.map((city, i) => (
            <Link
              key={city.id}
              href={`/cities/${city.slug}`}
              className="flex items-center justify-between px-6 py-5 border-b border-r border-(--line) bg-(--bg) no-underline text-inherit gap-3"
            >
              <div className="flex items-baseline gap-3 min-w-0">
                <span className="font-mono font-medium text-[12px] tracking-widest text-(--muted) shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div className="text-[15px] font-medium text-(--ink) tracking-[-0.01em] whitespace-nowrap overflow-hidden text-ellipsis">
                    {city.name}
                  </div>
                  <div className="text-[11px] text-(--muted) mt-0.5">
                    {city.providerCount} providers · {city.reviewCount} reviews
                  </div>
                </div>
              </div>
              <span className="text-(--muted) text-[14px]">→</span>
            </Link>
          ))}
        </div>
      </PageSection>

      {/* ── 6. FAQ ──────────────────────────────────────────────────────── */}
      <FAQSection faqs={faqs} />

      {/* ── 7. Where to go next ─────────────────────────────────────────── */}
      <PageSection id="guides">
        <div className="mb-8">
          <MonoLabel color="accent" size="sm" className="mb-4">07 · Where to go next</MonoLabel>
          <h2 className="font-sans font-bold text-[clamp(28px,4vw,42px)] leading-[1.05] tracking-[-0.025em] text-(--ink) m-0">
            Go Deeper
          </h2>
        </div>
        <div className="flex flex-col divide-y divide-(--line) border border-(--line) rounded-xl overflow-hidden bg-white">
          {RESEARCH_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between px-6 py-4 no-underline text-inherit hover:bg-(--wash) transition-colors"
            >
              <span className="font-medium text-(--ink) text-[15px]">{link.label}</span>
              <span className="text-(--accent) text-[14px] font-medium">→</span>
            </Link>
          ))}
        </div>
      </PageSection>

      {/* ── 8. Footer disclosure ────────────────────────────────────────── */}
      <section className="border-t border-(--line) bg-(--surface) py-12">
        <Container>
          <p className="font-mono text-[11px] tracking-widest uppercase text-(--muted) mb-4">
            Disclosure
          </p>
          <p className="font-sans text-[12px] leading-relaxed text-(--muted) max-w-3xl">
            realtattooreviews.com is operated by {process.env.LEGAL_ENTITY_NAME ?? "[operator]"}.
            Reviews are sourced from public Google Business Profile listings and reflect the opinions of individual patients, not RTR editorial opinion.
            RTR does not verify individual review claims and is not responsible for the accuracy of third-party reviews.
            This site does not provide medical advice. Consult a licensed provider before undergoing any tattoo removal procedure.
            To request removal of a review you believe is inaccurate or defamatory, contact{" "}
            <a
              href={`mailto:${process.env.TAKEDOWN_EMAIL ?? "legal@realtattooreviews.com"}`}
              className="underline hover:text-(--ink)"
            >
              {process.env.TAKEDOWN_EMAIL ?? "legal@realtattooreviews.com"}
            </a>.
            {stats.lastUpdated && ` Reviews last pulled: ${stats.lastUpdated}.`}
          </p>
        </Container>
      </section>

      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
