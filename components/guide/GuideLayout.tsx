import Link from "next/link";
import Container from "@/components/layout/Container";
import PageHero from "@/components/layout/PageHero";
import FAQSection from "@/components/sections/FAQSection";
import { breadcrumbSchema } from "@/lib/seo/schema";

const siteUrl = "https://realtattooreviews.com";

type FAQ = { question: string; answer: string };

type Props = {
  breadcrumb: string;
  h1: React.ReactNode;
  description: string;
  faqs?: FAQ[];
  sources?: string;
  path?: string;
  children: React.ReactNode;
  heroClassName?: string;
  /** Replaces the default PageHero entirely when provided (e.g. CategoryHero) */
  hero?: React.ReactNode;
};

export default function GuideLayout({
  breadcrumb,
  h1,
  description,
  faqs,
  sources,
  path,
  children,
  heroClassName,
  hero,
}: Props) {
  const breadcrumbJsonLd = path
    ? breadcrumbSchema([
        { name: "Guides", href: "/guides" },
        { name: breadcrumb, href: path },
      ])
    : null;

  const articleJsonLd = path
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: breadcrumb,
        description,
        mainEntityOfPage: `${siteUrl}${path}`,
        author: { "@type": "Organization", name: "RealTattooReviews" },
        publisher: { "@type": "Organization", name: "RealTattooReviews" },
      }
    : null;

  return (
    <div className="reviews-page">
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      {hero ?? (
        <PageHero
          heroClassName={heroClassName}
          label={
            <>
              <Link href="/guides" className="hover:text-(--ink) transition-colors">
                Guides
              </Link>
              <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
              <span className="text-(--muted) font-normal normal-case tracking-normal">
                {breadcrumb}
              </span>
            </>
          }
          title={h1}
          subtitle={description}
        />
      )}

      {/* Body */}
      <section className="bg-white">
        <Container>
          <div className="mx-auto max-w-4xl">
            {children}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      {faqs && faqs.length > 0 && <FAQSection faqs={faqs} />}

      {/* Sources */}
      {sources && (
        <section className="border-t border-(--line) py-10 bg-(--bg)">
          <Container>
            <div className="mx-auto max-w-4xl">
              <p className="font-mono text-[11px] tracking-widest uppercase text-(--muted) mb-2">
                Sources
              </p>
              <p className="font-sans text-[13px] leading-relaxed text-(--muted)">
                {sources}
              </p>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
