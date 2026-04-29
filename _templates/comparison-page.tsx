/**
 * BOILERPLATE — Comparison Page
 * ─────────────────────────────
 * Copy this file to:
 *   app/comparisons/[brand-a]-vs-[brand-b]/page.tsx
 *
 * Then:
 *  1. Replace every TODO with real content
 *  2. Fill in GLANCE_ROWS with the actual comparison data
 *  3. Fill in faqs[]
 *  4. Update metadata, PAGE_PATH, and canonical URL
 *  5. Set winners={[]} on GuideTable (1 = col 1 wins, 2 = col 2 wins, null = tie)
 *  6. Add/remove sections as needed — every section uses PageSection + SectionHeading
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";

// Layout
import PageSection from "@/components/reviews/PageSection";
import ComparisonHero from "@/components/comparison/ComparisonHero";

// Content primitives
import SectionHeading from "@/components/guide/SectionHeading";
import ContentCard from "@/components/comparison/ContentCard";
import GuideBulletList from "@/components/guide/GuideBulletList";
import GuideTable from "@/components/guide/GuideTable";
import GuideCallout from "@/components/guide/GuideCallout";
import GuideRelatedLinks from "@/components/guide/GuideRelatedLinks";
import GuideFAQSection from "@/components/guide/GuideFAQSection";
import MonoLabel from "@/components/reviews/MonoLabel";

// Data (remove if not a brand-vs-brand page)
import BrandComparisonEvidence from "@/components/comparison/BrandComparisonEvidence";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "TODO Brand A vs Brand B: Key Difference (2026) | RealTattooReviews",
  description: "TODO: One-sentence comparison summary for search snippets.",
  alternates: {
    canonical: "https://realtattooreviews.com/comparisons/TODO-brand-a-vs-brand-b",
  },
  openGraph: {
    title: "TODO Brand A vs Brand B: Key Difference (2026)",
    description: "TODO: Same as description above.",
  },
};

// ─── Static data ─────────────────────────────────────────────────────────────

const faqs = [
  {
    question: "TODO: Is Brand A better than Brand B?",
    answer: "TODO",
  },
  {
    question: "TODO: Is Brand A cheaper than Brand B?",
    answer: "TODO",
  },
  // Add more Q&As here
];

const PAGE_PATH = "/comparisons/TODO-brand-a-vs-brand-b";
const SITE_URL = "https://realtattooreviews.com";

/** Row format: [Feature label, Brand A value, Brand B value] */
const GLANCE_ROWS: [string, string, string][] = [
  ["TODO Feature 1", "TODO Brand A", "TODO Brand B"],
  ["TODO Feature 2", "TODO Brand A", "TODO Brand B"],
  // Add more rows
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BrandAVsBrandBPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Comparisons", href: "/comparisons" },
    { name: "TODO Brand A vs Brand B", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "TODO Brand A vs Brand B: Key Difference (2026)",
    description: "TODO",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: ["TODO Brand A vs Brand B", "TODO technology comparison"],
  };

  const faqJsonLd = faqSchema(faqs);

  return (
    <div className="reviews-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ── Hero ── */}
      <ComparisonHero
        label={
          <>
            <Link href="/comparisons" className="hover:text-(--ink) transition-colors">
              Comparisons
            </Link>
            <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
            <span className="text-(--muted) font-normal normal-case tracking-normal">
              TODO Brand A vs Brand B
            </span>
          </>
        }
        title={
          <>
            TODO Brand A vs{" "}
            <span className="text-(--accent)">Brand B</span>
          </>
        }
        subtitle="TODO: One or two sentences describing what this comparison covers and who it is for."
      />

      {/* ── Intro ── */}
      <PageSection bg="surface">
        <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl m-0">
          TODO: 2–3 paragraph intro. Explain what makes these two brands different and
          why the comparison matters. No winner declared here.
        </p>
      </PageSection>

      {/* ── At a Glance table ── */}
      <PageSection bg="bg">
        <SectionHeading>TODO Brand A vs Brand B at a Glance</SectionHeading>
        <div className="space-y-4">
          <p className="font-sans text-[15px] leading-relaxed text-(--muted) max-w-3xl">
            TODO: One sentence framing what the table shows.
          </p>
          <GuideTable
            headers={["", "TODO Brand A", "TODO Brand B"]}
            rows={GLANCE_ROWS.map(([feature, a, b]) => [feature, a, b])}
            winners={[null, null]} // TODO: set per-row winners
          />
        </div>
      </PageSection>

      {/* ── Key difference ── */}
      <PageSection bg="surface">
        <SectionHeading label="Key Difference">
          TODO: The Key Difference — Technology / Method / Model
        </SectionHeading>
        <div className="space-y-4">
          <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
            TODO: Explain the single most important structural difference between the two.
          </p>
          <div className="space-y-3">
            {[
              { title: "TODO Brand A", body: "TODO: What Brand A does / how its technology works." },
              { title: "TODO Brand B", body: "TODO: What Brand B does / how its technology works." },
            ].map((item) => (
              <ContentCard key={item.title} title={item.title} body={item.body} />
            ))}
          </div>
          <GuideBulletList
            items={[
              "TODO: Implication 1 of the key difference",
              "TODO: Implication 2 of the key difference",
            ]}
          />
        </div>
      </PageSection>

      {/* ── Pricing ── */}
      <PageSection bg="bg">
        <SectionHeading>TODO Brand A vs Brand B: Pricing and Cost</SectionHeading>
        <div className="space-y-4">
          <div className="space-y-3">
            {[
              { title: "TODO Brand A pricing", body: "TODO" },
              { title: "TODO Brand B pricing", body: "TODO" },
            ].map((item) => (
              <ContentCard key={item.title} title={item.title} body={item.body} />
            ))}
          </div>
        </div>
      </PageSection>

      {/* ── Cross-city evidence (remove if not brand-vs-brand) ── */}
      <PageSection bg="surface">
        <SectionHeading>Cross-City Review Evidence</SectionHeading>
        <div className="space-y-4">
          <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
            TODO: One sentence explaining what the evidence table shows.
          </p>
          <Suspense
            fallback={
              <div className="rounded-xl border border-(--line) bg-(--surface) p-8 text-center">
                <p className="font-sans text-[14px] text-(--muted) m-0">Loading evidence table&hellip;</p>
              </div>
            }
          >
            <BrandComparisonEvidence
              brandA="TODO Brand A"
              brandB="TODO Brand B"
            />
          </Suspense>
        </div>
      </PageSection>

      {/* ── Pros and cons Brand A ── */}
      <PageSection bg="bg">
        <SectionHeading>Pros and Cons of TODO Brand A</SectionHeading>
        <div className="grid sm:grid-cols-2 gap-4">
          <ContentCard title="Pros" titleSize="sm">
            <GuideBulletList items={["TODO pro 1", "TODO pro 2"]} />
          </ContentCard>
          <ContentCard title="Cons" titleSize="sm">
            <GuideBulletList variant="warning" items={["TODO con 1", "TODO con 2"]} />
          </ContentCard>
        </div>
      </PageSection>

      {/* ── Pros and cons Brand B ── */}
      <PageSection bg="surface">
        <SectionHeading>Pros and Cons of TODO Brand B</SectionHeading>
        <div className="grid sm:grid-cols-2 gap-4">
          <ContentCard title="Pros" titleSize="sm">
            <GuideBulletList items={["TODO pro 1", "TODO pro 2"]} />
          </ContentCard>
          <ContentCard title="Cons" titleSize="sm">
            <GuideBulletList variant="warning" items={["TODO con 1", "TODO con 2"]} />
          </ContentCard>
        </div>
      </PageSection>

      {/* ── Verdict ── */}
      <PageSection bg="bg" className="verdict-bg">
        <SectionHeading label="Verdict">
          Our Verdict: TODO Brand A or Brand B?
        </SectionHeading>
        <div className="space-y-4">
          <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
            TODO: One sentence framing the verdict as scenario-based, not a universal winner.
          </p>
          <div className="space-y-4">
            <ContentCard title="Choose TODO Brand A when:">
              <GuideBulletList items={["TODO scenario 1", "TODO scenario 2"]} />
            </ContentCard>
            <ContentCard title="Choose TODO Brand B when:">
              <GuideBulletList items={["TODO scenario 1", "TODO scenario 2"]} />
            </ContentCard>
            <ContentCard title="Get consultations at both when:">
              <GuideBulletList items={["Both have a location near you", "TODO other scenario"]} />
            </ContentCard>
          </div>
        </div>
      </PageSection>

      {/* ── Editorial note ── */}
      <PageSection bg="surface">
        <GuideCallout label="Editorial note">
          TODO: Describe data sources, methodology, sample sizes, and any conflicts of interest.
          See our{" "}
          <Link href="/methodology" className="text-(--accent) hover:underline">methodology</Link>{" "}
          and{" "}
          <Link href="/editorial-policy" className="text-(--accent) hover:underline">editorial policy</Link>{" "}
          for full details.
        </GuideCallout>
      </PageSection>

      {/* ── Related links ── */}
      <PageSection bg="bg">
        <GuideRelatedLinks
          links={[
            { href: "/comparisons/best-tattoo-removal-method", title: "Best Tattoo Removal Method", desc: "TODO" },
            { href: "/reviews/TODO-brand-a", title: "TODO Brand A Reviews", desc: "TODO" },
            { href: "/reviews/TODO-brand-b", title: "TODO Brand B Reviews", desc: "TODO" },
          ]}
        />
      </PageSection>

      <GuideFAQSection faqs={faqs} />
    </div>
  );
}
