import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import ProviderIndexWithFilters, {
  type BrandSummary,
} from "@/components/reviews/ProviderIndexWithFilters";
import FAQAccordion from "@/components/reviews/FAQAccordion";
import MonoLabel from "@/components/reviews/MonoLabel";
import PageSection from "@/components/reviews/PageSection";
import ReviewCard from "@/components/reviews/ReviewCard";
import SectionHeader from "@/components/reviews/SectionHeader";
import { getRecentReviews, getReviewStats } from "@/lib/data/reviews";
import { getAllProviders } from "@/lib/page-data/providers";
import {
  brandToSlug,
  getMultiLocationBrands,
  getSingleLocationProviders,
} from "@/lib/providers";
import { providers as mockProviders } from "@/lib/mock-data/providers";
import { cities } from "@/lib/mock-data/cities";

// ── Static data ───────────────────────────────────────────────────────────────

const TECH_TAGS = [
  "TEPR", "PicoWay", "PicoSure", "Q-Switch",
  "Fotona", "Spectra", "Laser (multiple)", "Medical", "Medical Spa",
];

const FAQ_ITEMS = [
  {
    q: "Are these reviews independent?",
    a: "Yes. We do not accept payment from providers for reviews or rankings. All reviews are collected from public sources, verified for legitimacy, and analyzed using a consistent methodology. Providers cannot remove or alter their reviews.",
  },
  {
    q: "How do you evaluate providers?",
    a: "We analyze sourced public reviews for outcome quality, session experience, pain reports, staff communication, and aftercare support. We also track scarring mentions, refund disputes, and incomplete removal patterns. Providers are scored on review volume, consistency, and outcome signals.",
  },
  {
    q: "How many reviews are enough to trust a clinic?",
    a: "We consider 15 or more sourced reviews a meaningful sample for most clinics. Below 10, patterns are difficult to confirm. Providers with 30 or more reviews are given higher confidence scores in our analysis.",
  },
  {
    q: "What should I look for in tattoo removal reviews?",
    a: "Look for reviews that mention specific outcomes rather than just general satisfaction. Pay attention to session count, fading progress, pain descriptions, and how the clinic handled complications. Avoid clinics where reviews are vague, clustered in a short time window, or lack detail.",
  },
  {
    q: "What is the difference between laser and non-laser removal?",
    a: "Laser removal uses targeted light energy to break down ink particles. Non-laser methods like TEPR use a different mechanism to draw ink to the surface. Each has trade-offs in pain, session count, scarring risk, and ink types. Our comparisons page covers this in detail.",
  },
  {
    q: "How do I know if a provider's results are real?",
    a: "Public-source Google reviews are harder to fabricate at scale than isolated testimonials. We cross-reference review patterns, flag sudden rating spikes, and note when review language is unusually uniform. Providers with longer review histories and more diverse reviewer profiles get higher credibility scores.",
  },
];

const RESEARCH_LINKS = [
  { label: "How much does removal cost?", href: "/cost", desc: "Price ranges by method and city", meta: "Cost guide" },
  { label: "Before and after results", href: "/before-and-after", desc: "Multi-provider outcome examples", meta: "Visual guide" },
  { label: "Laser vs non-laser compared", href: "/comparisons/best-tattoo-removal-method", desc: "Method comparison guide", meta: "Comparison" },
  { label: "Healing and aftercare", href: "/guides/tattoo-removal-aftercare", desc: "What to expect between sessions", meta: "Aftercare guide" },
];

const TRUST_ITEMS = [
  {
    num: "01",
    title: "How reviews are collected",
    body: "Sourced from public platforms, screened for duplication patterns, and tagged with structured signals: outcome, pain level, session count, and complication flags.",
    href: "#methodology",
    link: "Collection methodology",
  },
  {
    num: "02",
    title: "How providers are evaluated",
    body: "Each provider is scored on review volume, outcome consistency, communication quality, and complication rate. Scores update weekly.",
    href: "#methodology",
    link: "Read the full methodology",
  },
  {
    num: "03",
    title: "Independent, no paid placements",
    body: "No provider pays to appear here. Rankings reflect sourced review evidence and RTR analysis, nothing else.",
    href: "#editorial",
    link: "Editorial policy",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function brandWhyLine(brand: BrandSummary): string {
  const m = brand.method === "Non-Laser" ? "non-laser" : "laser";
  const r = brand.avgRating.toFixed(1);
  if (brand.totalReviews >= 150)
    return `Largest ${m} review base in our index, across ${brand.locationCount} markets.`;
  if (Number(r) >= 4.2)
    return `Highest-rated ${m} brand with ${brand.totalReviews} sourced reviews.`;
  if (brand.locationCount >= 3)
    return `${brand.locationCount}-city ${m} chain with ${brand.totalReviews} sourced reviews.`;
  return `${brand.totalReviews} sourced reviews across ${brand.locationCount} ${m} ${brand.locationCount === 1 ? "location" : "locations"}.`;
}

// ── SEO ───────────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const stats = await getReviewStats();
  const title = `Tattoo Removal Reviews: ${stats.totalReviews} Sourced Reviews Across ${stats.totalProviders} Providers`;
  const description = `Compare tattoo removal providers using ${stats.totalReviews} sourced reviews across ${stats.totalCities} cities. Compare methods, outcomes, pain signals, sessions, and cost before you book.`;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ReviewsPage() {
  const [stats, recentReviews] = await Promise.all([
    getReviewStats(),
    getRecentReviews(9),
  ]);

  const sanityProviders = await getAllProviders();
  const allProviders = sanityProviders.length > 0 ? sanityProviders : mockProviders;

  const brandNames = getMultiLocationBrands();
  const brandSummaries: BrandSummary[] = brandNames.map((brand) => {
    const locs = allProviders.filter(
      (p) => p.brand?.toLowerCase() === brand.toLowerCase()
    );
    const totalReviews = locs.reduce((s: number, p) => s + (p.reviewCount ?? 0), 0);
    const avgRating = locs.reduce((s: number, p) => s + (p.rating ?? 0), 0) / locs.length;
    const techTags: string[] = [
      ...new Set(locs.flatMap((p) => p.tags ?? []).filter((t: string) => TECH_TAGS.includes(t))),
    ];
    const method: "Non-Laser" | "Laser" = locs[0]?.specialty
      ?.toLowerCase()
      .includes("non-laser")
      ? "Non-Laser"
      : "Laser";
    return { name: brand, slug: brandToSlug(brand), locationCount: locs.length, totalReviews, avgRating, techTags, method };
  });

  const independents = getSingleLocationProviders().sort(
    (a, b) => (b.featuredScore ?? 0) - (a.featuredScore ?? 0)
  );

  const featuredSnapshots = recentReviews.slice(0, 3);
  const recentCoverage = recentReviews.slice(3);
  const featuredBrands = [...brandSummaries]
    .sort((a, b) => b.totalReviews - a.totalReviews)
    .slice(0, 4);


  return (
    <div className="reviews-page">

      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      <section className="border-b border-(--line) pt-24 pb-20 bg-(--bg)">
        <Container>
          <MonoLabel color="accent" size="sm" className="mb-6 flex items-center gap-2.5">
            <span className="inline-block w-6 h-px bg-(--accent)" />
            Independent reviews · Updated weekly
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(48px,7.5vw,92px)] leading-[0.98] tracking-[-0.035em] m-0 text-(--ink) max-w-[14ch]">
            Tattoo removal,{" "}
            <em className="italic text-(--accent)">reviewed</em>{" "}
            with receipts.
          </h1>

          <p className="mt-7 font-sans font-normal text-[19px] leading-normal text-(--muted) max-w-160">
            <span className="text-(--ink) font-medium">
              {stats.totalReviews.toLocaleString()} sourced reviews
            </span>{" "}
            across {stats.totalProviders} providers in {stats.totalCities} cities.
            Compare outcomes, methods, pain signals, sessions, and cost before you book.
          </p>

          <div className="mt-10 flex flex-wrap gap-2.5">
            <Link
              href="#featured"
              className="inline-flex items-center px-6 py-3 bg-(--ink) text-(--bg) font-sans text-[14px] font-medium no-underline tracking-[-0.01em] rounded-full"
            >
              Browse reviews →
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center px-6 py-3 border border-(--line) text-(--ink) font-sans text-[14px] font-medium no-underline tracking-[-0.01em] rounded-full"
            >
              How we review
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
          {TRUST_ITEMS.map((item) => (
            <div key={item.num} className="flex flex-col">
              <MonoLabel color="accent" size="sm" className="mb-4">
                {item.num} /
              </MonoLabel>
              <h3 className="font-normal text-[22px] leading-[1.15] text-(--ink) m-0 mb-3">
                {item.title}
              </h3>
              <p className="text-[14px] text-(--muted) m-0 mb-4 flex-1">
                {item.body}
              </p>
              <Link
                href={item.href}
                className="text-[13px] text-(--accent) font-medium no-underline border-b border-current pb-px self-start"
              >
                {item.link} →
              </Link>
            </div>
          ))}
        </div>
      </PageSection>

      {/* ── 3. Featured snapshots ─────────────────────────────────────────── */}
      <PageSection id="featured">
        <SectionHeader
          eyebrow="03 · Featured"
          title="Review snapshots, fresh off the clinic chair."
          description="Start with recent sourced review excerpts, then move into full provider review pages for deeper research."
          right={
            <Link href="#providers" className="text-[13px] text-(--accent) font-medium no-underline whitespace-nowrap">
              Jump to provider index →
            </Link>
          }
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4">
          {featuredSnapshots.map((r) => (
            <ReviewCard key={r.id} review={r} featured />
          ))}
        </div>
      </PageSection>

      {/* ── 4. Provider index ─────────────────────────────────────────────── */}
      <PageSection id="providers" bg="surface">
        <SectionHeader
          eyebrow="04 · Provider index"
          title="Compare providers side by side."
          description="Filter by method, sort by review volume or rating, then open the dedicated review page for pricing context and outcome synthesis."
        />
        <ProviderIndexWithFilters brands={brandSummaries} independents={independents} />
      </PageSection>

      {/* ── 5. Recent coverage ───────────────────────────────────────────── */}
      <PageSection>
        <SectionHeader
          eyebrow="05 · Recent coverage"
          title="Latest review activity."
          description="Every new sourced review we have analyzed across the providers we cover. Pattern changes and anomalies surface here first."
          right={
            <Link href="#providers" className="text-[13px] text-(--accent) font-medium no-underline whitespace-nowrap">
              Browse provider pages →
            </Link>
          }
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {recentCoverage.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </PageSection>

      {/* ── 6. Reviews by brand ──────────────────────────────────────────── */}
      <PageSection bg="surface">
        <SectionHeader
          eyebrow="06 · Reviews by brand"
          title="Know the name? Start there."
          description="The biggest branded review paths, with location-level follow-through. Averages reflect all sourced reviews across all locations of that brand."
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] border border-(--line) bg-white rounded-xl overflow-hidden">
          {featuredBrands.map((brand, i) => (
            <Link
              key={brand.slug}
              href={`/reviews/${brand.slug}`}
              className="flex flex-col p-7 no-underline text-inherit"
              style={{ borderLeft: i === 0 ? "none" : "1px solid var(--line)" }}
            >
              {/* Eyebrow row */}
              <div className="flex justify-between items-center mb-5">
                <MonoLabel>0{i + 1}</MonoLabel>
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium tracking-[0.03em]"
                  style={
                    brand.method === "Non-Laser"
                      ? { background: "oklch(0.93 0.06 30)", color: "oklch(0.42 0.12 30)" }
                      : { background: "oklch(0.93 0.05 200)", color: "oklch(0.35 0.08 200)" }
                  }
                >
                  {brand.method}
                </span>
              </div>

              {/* Brand name */}
              <h3 className="font-bold text-[26px] leading-[1.05] tracking-[-0.025em] text-(--ink) m-0">
                {brand.name}
              </h3>

              {/* Rating */}
              <div className="flex items-baseline gap-1.5 mt-3">
                <span className="font-sans font-bold text-[42px] leading-none tracking-[-0.03em] text-(--ink)">
                  {brand.avgRating.toFixed(1)}
                </span>
                <span className="text-[13px] text-(--muted)">/ 5</span>
              </div>
              <div className="flex items-center gap-0.5 mt-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      style={{ fill: s <= Math.round(brand.avgRating) ? "var(--warning)" : "var(--line)" }}
                    />
                  </svg>
                ))}
              </div>

              {/* Stats */}
              <div className="flex gap-4 mt-2 text-[12px] text-(--muted)">
                <span>{brand.totalReviews.toLocaleString()} reviews</span>
                <span>{brand.locationCount} locations</span>
              </div>

              {/* Divider */}
              <div className="my-5 h-px bg-(--line)" />

              {/* Why start here */}
              <p className="font-sans text-[14px] leading-[1.45] text-(--muted) m-0 flex-1">
                {brandWhyLine(brand)}
              </p>

              {/* CTA */}
              <div className="mt-5 text-[12px] text-(--accent) font-medium">
                Open brand reviews →
              </div>
            </Link>
          ))}
        </div>
      </PageSection>

      {/* ── 7. Reviews by city ───────────────────────────────────────────── */}
      <PageSection>
        <SectionHeader
          eyebrow="07 · Reviews by city"
          title="Looking local? Start here."
          description="Every city we cover at review-count depth. Entries update as new sourced reviews come in."
        />
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

      {/* ── 8. Research links ────────────────────────────────────────────── */}
      <PageSection bg="surface">
        <SectionHeader
          eyebrow="08 · Research"
          title="Before you book."
          description="Pricing context, method trade-offs, and what to actually expect between sessions."
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          {RESEARCH_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col gap-2 p-6 bg-(--bg) border border-(--line) no-underline text-inherit min-h-40"
            >
              <MonoLabel color="accent" className="mb-auto">
                0{i + 1}
              </MonoLabel>
              <div className="flex flex-col gap-2 mt-auto">
                <div className="font-serif text-[22px] leading-[1.2] tracking-[-0.015em] text-(--ink)">
                  {link.label}
                </div>
                <div className="text-[12px] text-(--muted)">{link.desc}</div>
              </div>
              <div className="mt-2.5 font-mono font-medium text-[12px] tracking-widest text-(--muted) uppercase flex justify-between">
                <span>{link.meta}</span>
                <span className="text-(--accent)">Read →</span>
              </div>
            </Link>
          ))}
        </div>
      </PageSection>

      {/* ── 9. FAQ ───────────────────────────────────────────────────────── */}
      <PageSection>
        <SectionHeader
          eyebrow="09 · Frequently asked"
          title="Questions we get."
          description="Collected from reader feedback and search patterns. Anything missing? Write to us."
        />
        <FAQAccordion items={FAQ_ITEMS} />
      </PageSection>

    </div>
  );
}
