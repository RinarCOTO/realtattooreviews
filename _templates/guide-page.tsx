/**
 * BOILERPLATE — Guide Page
 * ────────────────────────
 * Copy this file to:
 *   app/guides/[your-guide-slug]/page.tsx
 *
 * Then:
 *  1. Replace every TODO with real content
 *  2. Fill in faqs[]
 *  3. Update metadata, PAGE_PATH, and canonical URL
 *  4. Add/remove PageSection blocks as needed
 *  5. Remove the Suspense/BrandComparisonEvidence block if not comparing brands
 */

import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";

// Layout
import Container from "@/components/layout/Container";
import PageSection from "@/components/reviews/PageSection";
import MonoLabel from "@/components/reviews/MonoLabel";

// Content primitives
import SectionHeading from "@/components/guide/SectionHeading";
import ContentCard from "@/components/comparison/ContentCard";
import GuideBulletList from "@/components/guide/GuideBulletList";
import GuideCallout from "@/components/guide/GuideCallout";
import GuideRelatedLinks from "@/components/guide/GuideRelatedLinks";
import FAQSection from "@/components/sections/FAQSection";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "TODO Guide Title (2026) | RealTattooReviews",
  description: "TODO: One-sentence guide summary for search snippets.",
  alternates: {
    canonical: "https://realtattooreviews.com/guides/TODO-guide-slug",
  },
  openGraph: {
    title: "TODO Guide Title (2026)",
    description: "TODO: Same as description above.",
  },
};

// ─── Static data ─────────────────────────────────────────────────────────────

const faqs = [
  {
    question: "TODO: Most common question about this topic?",
    answer: "TODO",
  },
  {
    question: "TODO: Second most common question?",
    answer: "TODO",
  },
  // Add more Q&As here
];

const PAGE_PATH = "/guides/TODO-guide-slug";
const SITE_URL = "https://realtattooreviews.com";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TodoGuidePage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Guides", href: "/guides" },
    { name: "TODO Guide Title", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "TODO Guide Title (2026)",
    description: "TODO",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: ["TODO topic", "Tattoo removal"],
  };

  const faqJsonLd = faqSchema(faqs);

  return (
    <div className="reviews-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ── Hero ── */}
      <section className="border-b border-(--line) pt-20 pb-16">
        <Container>
          <MonoLabel color="accent" size="sm" className="mb-5 flex items-center gap-2">
            <Link href="/guides" className="hover:text-(--ink) transition-colors">
              Guides
            </Link>
            <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
            <span className="text-(--muted) font-normal normal-case tracking-normal">
              TODO Guide Title
            </span>
          </MonoLabel>
          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            TODO Guide{" "}
            <span className="text-(--accent)">Title</span>
          </h1>
          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--ink) max-w-2xl">
            TODO: One sentence describing what this guide covers and who it helps.
          </p>
        </Container>
      </section>

      {/* ── Intro / TL;DR ── */}
      <PageSection bg="surface">
        <GuideCallout label="Quick answer">
          TODO: 1–2 sentence bottom line for readers who want the answer fast.
        </GuideCallout>
        <p className="mt-4 font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
          TODO: 1–2 paragraph intro expanding on the quick answer and framing what the
          rest of the guide covers.
        </p>
      </PageSection>

      {/* ── Main section 1 ── */}
      <PageSection bg="bg">
        <SectionHeading>TODO: First Main Section Heading</SectionHeading>
        <div className="space-y-4">
          <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
            TODO: Section body text.
          </p>
          <GuideBulletList
            items={[
              "TODO point 1",
              "TODO point 2",
              "TODO point 3",
            ]}
          />
        </div>
      </PageSection>

      {/* ── Main section 2 — cards ── */}
      <PageSection bg="surface">
        <SectionHeading>TODO: Second Main Section Heading</SectionHeading>
        <div className="space-y-3">
          {[
            { title: "TODO Card Title 1", body: "TODO card body text." },
            { title: "TODO Card Title 2", body: "TODO card body text." },
            { title: "TODO Card Title 3", body: "TODO card body text." },
          ].map((item) => (
            <ContentCard key={item.title} title={item.title} body={item.body} />
          ))}
        </div>
      </PageSection>

      {/* ── What to look for / checklist ── */}
      <PageSection bg="bg">
        <SectionHeading>TODO: What to Look for / Checklist Section</SectionHeading>
        <div className="space-y-4">
          <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
            TODO: Framing sentence.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <ContentCard title="TODO: What to look for" titleSize="sm">
              <GuideBulletList items={["TODO item 1", "TODO item 2", "TODO item 3"]} />
            </ContentCard>
            <ContentCard title="TODO: Red flags" titleSize="sm">
              <GuideBulletList variant="warning" items={["TODO red flag 1", "TODO red flag 2"]} />
            </ContentCard>
          </div>
        </div>
      </PageSection>

      {/* ── Bottom line / summary ── */}
      <PageSection bg="surface">
        <SectionHeading label="Bottom line">TODO: Summary Section Heading</SectionHeading>
        <div className="space-y-4">
          <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
            TODO: Summarise the key takeaways in 2–3 sentences.
          </p>
          <GuideCallout label="Editorial note">
            TODO: Describe data sources and methodology. See our{" "}
            <Link href="/methodology" className="text-(--accent) hover:underline">methodology</Link>{" "}
            and{" "}
            <Link href="/editorial-policy" className="text-(--accent) hover:underline">editorial policy</Link>.
          </GuideCallout>
        </div>
      </PageSection>

      {/* ── Related links ── */}
      <PageSection bg="bg">
        <GuideRelatedLinks
          links={[
            { href: "/guides/TODO-related-guide", title: "TODO Related Guide", desc: "TODO" },
            { href: "/comparisons/best-tattoo-removal-method", title: "Best Tattoo Removal Method", desc: "TODO" },
            { href: "/cost", title: "Tattoo Removal Cost", desc: "TODO" },
          ]}
        />
      </PageSection>

      <FAQSection faqs={faqs} />
    </div>
  );
}
