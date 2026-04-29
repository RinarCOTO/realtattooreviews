/**
 * BOILERPLATE — Category Page
 * ───────────────────────────
 * Copy this file to:
 *   app/categories/[your-category-slug]/page.tsx
 *
 * Category pages answer "what is the best option for [use case]?"
 * They name providers and link to reviews, rather than comparing two brands head-to-head.
 *
 * Then:
 *  1. Replace every TODO with real content
 *  2. Fill in faqs[]
 *  3. Update metadata, PAGE_PATH, and canonical URL
 *  4. Add/remove PageSection blocks as needed
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
import GuideFAQSection from "@/components/guide/GuideFAQSection";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "TODO: Best Tattoo Removal for [Use Case] (2026) | RealTattooReviews",
  description: "TODO: One sentence describing who this category serves and what the page helps them decide.",
  alternates: {
    canonical: "https://realtattooreviews.com/categories/TODO-category-slug",
  },
  openGraph: {
    title: "TODO: Best Tattoo Removal for [Use Case] (2026)",
    description: "TODO: Same as description above.",
  },
};

// ─── Static data ─────────────────────────────────────────────────────────────

const faqs = [
  {
    question: "TODO: Most common question for this use case?",
    answer: "TODO",
  },
  {
    question: "TODO: Second most common question?",
    answer: "TODO",
  },
  // Add more Q&As here
];

const PAGE_PATH = "/categories/TODO-category-slug";
const SITE_URL = "https://realtattooreviews.com";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TodoCategoryPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Categories", href: "/categories" },
    { name: "TODO Category Title", href: PAGE_PATH },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "TODO: Best Tattoo Removal for [Use Case] (2026)",
    description: "TODO",
    mainEntityOfPage: `${SITE_URL}${PAGE_PATH}`,
    author: { "@type": "Organization", name: "RealTattooReviews" },
    publisher: { "@type": "Organization", name: "RealTattooReviews" },
    about: ["TODO use case", "Tattoo removal"],
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
            <Link href="/categories" className="hover:text-(--ink) transition-colors">
              Categories
            </Link>
            <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
            <span className="text-(--muted) font-normal normal-case tracking-normal">
              TODO Category Title
            </span>
          </MonoLabel>
          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            Tattoo Removal for{" "}
            <span className="text-(--accent)">TODO Use Case</span>
          </h1>
          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--ink) max-w-2xl">
            TODO: One sentence describing who this page is for and what decision it helps them make.
          </p>
        </Container>
      </section>

      {/* ── Quick answer ── */}
      <PageSection bg="surface">
        <GuideCallout label="Quick answer">
          TODO: 1–2 sentence bottom line — which method or provider type fits this use case and why.
        </GuideCallout>
        <p className="mt-4 font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
          TODO: 1–2 paragraph intro. Explain why this use case is distinct, what makes it harder
          or different from standard tattoo removal, and what the reader should focus on.
        </p>
      </PageSection>

      {/* ── Why this use case is different ── */}
      <PageSection bg="bg">
        <SectionHeading>Why TODO Use Case Requires a Different Approach</SectionHeading>
        <div className="space-y-4">
          <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
            TODO: Explain the unique challenge. What goes wrong if you use a standard approach?
          </p>
          <GuideBulletList
            items={[
              "TODO: Key risk or consideration 1",
              "TODO: Key risk or consideration 2",
              "TODO: Key risk or consideration 3",
            ]}
          />
        </div>
      </PageSection>

      {/* ── Best methods for this use case ── */}
      <PageSection bg="surface">
        <SectionHeading>Best Tattoo Removal Methods for TODO Use Case</SectionHeading>
        <div className="space-y-3">
          {[
            {
              title: "TODO: Best fit method",
              body: "TODO: Why this method is the best fit. What makes it structurally suited to this use case.",
            },
            {
              title: "TODO: Second option",
              body: "TODO: When and why you might choose this instead.",
            },
            {
              title: "TODO: What to avoid",
              body: "TODO: Methods that carry elevated risk for this specific use case, and why.",
            },
          ].map((item) => (
            <ContentCard key={item.title} title={item.title} body={item.body} />
          ))}
        </div>
      </PageSection>

      {/* ── What to look for in a provider ── */}
      <PageSection bg="bg">
        <SectionHeading>What to Look for in a Provider</SectionHeading>
        <div className="space-y-4">
          <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
            TODO: Framing sentence — not all providers handle this use case well.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <ContentCard title="Green flags" titleSize="sm">
              <GuideBulletList
                items={[
                  "TODO: Green flag 1",
                  "TODO: Green flag 2",
                  "TODO: Green flag 3",
                ]}
              />
            </ContentCard>
            <ContentCard title="Red flags" titleSize="sm">
              <GuideBulletList
                variant="warning"
                items={[
                  "TODO: Red flag 1",
                  "TODO: Red flag 2",
                ]}
              />
            </ContentCard>
          </div>
        </div>
      </PageSection>

      {/* ── Recommended providers / brands ── */}
      <PageSection bg="surface">
        <SectionHeading>Providers That Handle TODO Use Case Well</SectionHeading>
        <div className="space-y-4">
          <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
            TODO: Brief framing — this is not an exhaustive list, just the brands with documented
            fit for this use case.
          </p>
          <div className="space-y-3">
            {[
              {
                title: "TODO Provider / Brand Name",
                body: "TODO: Why this provider fits this use case specifically. Link to /reviews/[provider].",
              },
              {
                title: "TODO Provider / Brand Name",
                body: "TODO: Why this provider fits this use case specifically.",
              },
            ].map((item) => (
              <ContentCard key={item.title} title={item.title} body={item.body} />
            ))}
          </div>
        </div>
      </PageSection>

      {/* ── Questions to ask at consultation ── */}
      <PageSection bg="bg">
        <SectionHeading>Questions to Ask at Your Consultation</SectionHeading>
        <div className="space-y-4">
          <p className="font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl">
            TODO: Frame why these questions matter for this specific use case.
          </p>
          <GuideBulletList
            items={[
              "TODO: Specific question to ask the provider",
              "TODO: Specific question about their experience with this use case",
              "TODO: Specific question about risk or protocol",
            ]}
          />
        </div>
      </PageSection>

      {/* ── Editorial note ── */}
      <PageSection bg="surface">
        <GuideCallout label="Editorial note">
          TODO: Describe data sources and how provider recommendations were arrived at. See our{" "}
          <Link href="/methodology" className="text-(--accent) hover:underline">methodology</Link>{" "}
          and{" "}
          <Link href="/editorial-policy" className="text-(--accent) hover:underline">editorial policy</Link>.
        </GuideCallout>
      </PageSection>

      {/* ── Related links ── */}
      <PageSection bg="bg">
        <GuideRelatedLinks
          links={[
            { href: "/comparisons/best-tattoo-removal-method", title: "Best Tattoo Removal Method", desc: "All methods compared by use case." },
            { href: "/categories/TODO-related-category", title: "TODO Related Category", desc: "TODO" },
            { href: "/guides/TODO-related-guide", title: "TODO Related Guide", desc: "TODO" },
          ]}
        />
      </PageSection>

      <GuideFAQSection faqs={faqs} />
    </div>
  );
}
