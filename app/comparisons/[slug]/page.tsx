import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import ComparisonTable from "@/components/sections/ComparisonTable";
import { getComparison, getAllComparisonSlugs } from "@/lib/page-data/comparisons";
import { comparisons as mockComparisons } from "@/lib/mock-data/comparisons";
import { comparisonPages } from "@/lib/mock-data/comparison-pages";
import { providers as mockProviders } from "@/lib/mock-data/providers";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import type { ComparisonFAQ } from "@/types/comparison";

type Props = { params: Promise<{ slug: string }> };
type ComparisonSeoFields = {
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoImage?: { url: string; alt: string } | null;
};

const siteUrl = "https://realtattooreviews.com";

function getTechnologyCoverage(tag: "PicoWay" | "Q-Switch") {
  const providers = mockProviders.filter((provider) => provider.tags?.includes(tag));
  const markets = [...new Set(providers.map((provider) => provider.market))];

  return {
    count: providers.length,
    providers,
    markets,
  };
}

function buildComparisonArticleSchema(
  title: string,
  description: string,
  slug: string,
  faqs: ComparisonFAQ[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: `${siteUrl}/comparisons/${slug}`,
    author: {
      "@type": "Organization",
      name: "RealTattooReviews",
    },
    publisher: {
      "@type": "Organization",
      name: "RealTattooReviews",
    },
    about: [
      "Tattoo removal comparison",
      "PicoWay",
      "Q-switch laser",
    ],
    mentions: faqs.map((faq) => faq.question),
  };
}

export async function generateStaticParams() {
  const sanitySlugs = await getAllComparisonSlugs();
  if (sanitySlugs.length > 0) return sanitySlugs.map((slug) => ({ slug }));
  return mockComparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comparison = (await getComparison(slug)) ?? mockComparisons.find((c) => c.slug === slug);
  if (!comparison) return {};
  const detailedPage = comparisonPages[slug];
  const title =
    detailedPage?.metaTitle ??
    (comparison as { seoTitle?: string | null }).seoTitle ??
    `${comparison.title}: Side-by-Side Comparison | RealTattooReviews`;
  const description =
    detailedPage?.metaDescription ??
    (comparison as { seoDescription?: string | null }).seoDescription ??
    comparison.description;
  const seoImage = (comparison as ComparisonSeoFields).seoImage;
  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/comparisons/${slug}`,
    },
    openGraph: {
      title: detailedPage?.metaTitle ?? `${comparison.title}: Side-by-Side Comparison`,
      description,
      ...(seoImage ? { images: [{ url: seoImage.url, alt: seoImage.alt }] } : {}),
    },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const comparison = (await getComparison(slug)) ?? mockComparisons.find((c) => c.slug === slug);
  if (!comparison) notFound();
  const detailedPage = comparisonPages[slug];

  if (!detailedPage) {
    return (
      <main className="min-h-screen bg-bg">
        <section className="border-b border-border bg-hero-bg py-14">
          <Container>
            <p className="mb-2 text-sm text-muted">
              <Link href="/comparisons" className="hover:text-accent">Comparisons</Link>
              {" / "}
              <span className="text-heading">{comparison.title}</span>
            </p>
            <h1 className="text-[36px] font-bold text-heading">{comparison.title}</h1>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
              {comparison.description}
            </p>
          </Container>
        </section>

        <section className="py-12">
          <Container>
            <p className="text-sm text-subtle">Full comparison content coming soon.</p>
          </Container>
        </section>
      </main>
    );
  }

  const picoCoverage = getTechnologyCoverage("PicoWay");
  const qSwitchCoverage = getTechnologyCoverage("Q-Switch");
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Comparisons", href: "/comparisons" },
    { name: comparison.title, href: `/comparisons/${slug}` },
  ]);
  const faqJsonLd = faqSchema(
    detailedPage.faqs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })),
  );
  const articleJsonLd = buildComparisonArticleSchema(
    comparison.title,
    detailedPage.metaDescription,
    slug,
    detailedPage.faqs,
  );

  return (
    <main className="min-h-screen bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <section className="border-b border-border bg-hero-bg py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.75fr)_minmax(280px,1fr)] lg:items-start">
            <div>
              <p className="mb-3 text-sm text-muted">
                <Link href="/comparisons" className="hover:text-accent">Comparisons</Link>
                {" / "}
                <span className="text-heading">{comparison.title}</span>
              </p>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {detailedPage.eyebrow}
              </p>
              <h1 className="max-w-3xl text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-heading">
                {comparison.title}
              </h1>
              <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-muted">
                {comparison.description}
              </p>
              <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-heading">
                {detailedPage.verdict}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#comparison-table" size="md">
                  Jump to table
                </Button>
                <Button href="/cost" variant="secondary" size="md">
                  See cost guide
                </Button>
              </div>
            </div>

            <aside className="rounded-3xl border border-border bg-surface p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
                The short answer
              </p>
              <p className="mt-3 text-lg font-semibold leading-snug text-heading">
                {detailedPage.summary}
              </p>
              <div className="mt-6 space-y-4 border-t border-border pt-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
                    Site coverage
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Current mock index includes {picoCoverage.count} clinics tagged{" "}
                    <span className="font-medium text-heading">PicoWay</span> and{" "}
                    {qSwitchCoverage.count} tagged{" "}
                    <span className="font-medium text-heading">Q-Switch</span>.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
                    PicoWay examples
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {picoCoverage.providers.slice(0, 3).map((provider) => provider.name).join(", ")}
                    {" "}and other clinics in{" "}
                    {picoCoverage.markets.slice(0, 3).join(", ")}.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
                    Q-switch examples
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {qSwitchCoverage.providers.map((provider) => provider.name).join(" and ")}
                    {" "}in {qSwitchCoverage.markets.join(" and ")}.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {detailedPage.choiceCards.map((card) => (
              <article
                key={card.title}
                className="rounded-3xl border border-border bg-surface p-6"
              >
                <h2 className="text-xl font-semibold text-heading">{card.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{card.body}</p>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="comparison-table" className="border-y border-border bg-surface py-16">
        <Container>
          <div className="mb-7 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Side-by-side
            </p>
            <h2 className="mt-3 text-[30px] font-bold leading-tight text-heading">
              PicoWay vs Q-switch, row by row
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              This page follows the comparison-page brief for individual head-to-head pages:
              one direct decision query, one structured table, and clear routing into cost,
              results, reviews, and guide follow-ups instead of trying to own every adjacent intent.
            </p>
          </div>

          <ComparisonTable
            leftLabel="PicoWay"
            rightLabel="Q-Switch"
            rows={detailedPage.tableRows}
          />
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)]">
            <article className="rounded-3xl border border-border bg-bg p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Decision criteria
              </p>
              <h2 className="mt-3 text-[30px] font-bold leading-tight text-heading">
                {detailedPage.criteriaTitle}
              </h2>
              <div className="mt-6 space-y-4">
                {detailedPage.criteriaPoints.map((point) => {
                  const [label, ...rest] = point.split(". ");
                  const body = rest.join(". ");

                  return (
                    <div key={point} className="rounded-2xl border border-border bg-surface p-5">
                      <h3 className="text-base font-semibold text-heading">{label}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="rounded-3xl border border-border bg-hero-bg p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Build brief
              </p>
              <div className="mt-4 space-y-5">
                <div>
                  <h2 className="text-base font-semibold text-heading">Intent summary</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {detailedPage.intentSummary}
                  </p>
                </div>
                <div>
                  <h2 className="text-base font-semibold text-heading">Keyword summary</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {detailedPage.keywordSummary}
                  </p>
                </div>
                <div>
                  <h2 className="text-base font-semibold text-heading">Internal-link next steps</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Keep direct-comparison intent here, then route users into reviews, cost,
                    results, and safety guides once they decide what kind of clinic or method
                    they want to evaluate next.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface py-16">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {detailedPage.prosCons.map((block) => (
              <article key={block.label} className="rounded-3xl border border-border bg-bg p-6">
                <h2 className="text-2xl font-semibold text-heading">{block.label}</h2>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Pros
                  </p>
                  <ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
                    {block.pros.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-border pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
                    Cons
                  </p>
                  <ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
                    {block.cons.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-heading" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <article>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Consultation checklist
              </p>
              <h2 className="mt-3 text-[30px] font-bold leading-tight text-heading">
                Questions to ask before you let anyone treat your tattoo
              </h2>
              <ol className="mt-7 space-y-4">
                {detailedPage.consultQuestions.map((question, index) => (
                  <li
                    key={question}
                    className="rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted"
                  >
                    <span className="mr-3 font-semibold text-heading">
                      {index + 1}.
                    </span>
                    {question}
                  </li>
                ))}
              </ol>
            </article>

            <aside className="rounded-3xl border border-border bg-hero-bg p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Source transparency
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {detailedPage.sourceNote}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                For this specific page, the user intent is comparison-first, not gallery,
                price-guide, or review-hub intent. That is why the page gives a verdict,
                a structured table, and clear follow-up links instead of trying to become
                a catch-all explainer.
              </p>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface py-16">
        <Container>
          <div className="mb-7 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Keep researching
            </p>
            <h2 className="mt-3 text-[30px] font-bold leading-tight text-heading">
              Where users usually go next
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              These links follow the keyword-ownership plan from the strategy docs:
              comparison intent stays here, then users branch into the page type that owns
              reviews, pricing, results, or risk questions.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {detailedPage.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-3xl border border-border bg-bg p-6 transition hover:border-accent"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {link.meta}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-heading">{link.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {link.description}
                </p>
                <p className="mt-5 text-sm font-medium text-accent">Open page →</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              FAQ
            </p>
            <h2 className="mt-3 text-[30px] font-bold leading-tight text-heading">
              PicoWay vs Q-switch, answered directly
            </h2>
          </div>
          <div className="mt-8 divide-y divide-border rounded-3xl border border-border bg-surface">
            {detailedPage.faqs.map((faq) => (
              <details key={faq.question} className="group px-6 py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-semibold text-heading">
                  <span>{faq.question}</span>
                  <span className="text-2xl text-accent transition group-open:rotate-45">+</span>
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
