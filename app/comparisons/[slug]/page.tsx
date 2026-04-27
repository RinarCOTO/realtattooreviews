import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Container from "@/components/layout/Container";
import BrandComparisonEvidence from "@/components/comparison/BrandComparisonEvidence";
import BlockHeading from "@/components/provider/BlockHeading";
import JumpNav from "@/components/provider/JumpNav";
import ComparisonTable from "@/components/sections/ComparisonTable";
import { getComparison, getAllComparisonSlugs } from "@/lib/page-data/comparisons";
import type { SanityComparison } from "@/lib/page-data/comparisons";
import { comparisons as mockComparisons } from "@/lib/mock-data/comparisons";
import { comparisonPages } from "@/lib/mock-data/comparison-pages";
import { providers as mockProviders } from "@/lib/mock-data/providers";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import type { ComparisonFAQ, ComparisonTableRow, ComparisonProsCons } from "@/types/comparison";

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
  topics: string[],
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
    about: topics,
    mentions: faqs.map((faq) => faq.question),
  };
}

function mapSanityTableRows(rows: SanityComparison["tableRows"]): ComparisonTableRow[] {
  if (!rows?.length) return [];
  return rows.map((r) => ({
    criterion: r.criteria,
    left: r.valueA,
    right: r.valueB,
    takeaway: r.whyItMatters ?? undefined,
  }));
}

function mapSanityProsCons(comparison: SanityComparison): ComparisonProsCons[] | null {
  const hasA = comparison.prosA?.length || comparison.consA?.length;
  const hasB = comparison.prosB?.length || comparison.consB?.length;
  if (!hasA && !hasB) return null;
  return [
    {
      label: comparison.providerA ?? "Provider A",
      pros: comparison.prosA ?? [],
      cons: comparison.consA ?? [],
    },
    {
      label: comparison.providerB ?? "Provider B",
      pros: comparison.prosB ?? [],
      cons: comparison.consB ?? [],
    },
  ];
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
        <section className="border-b border-border bg-feathering-mist py-14">
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

  const sanityComparison = comparison as SanityComparison;

  const activeVerdict = sanityComparison.verdict ?? detailedPage.verdict;
  const activeTableRows = mapSanityTableRows(sanityComparison.tableRows).length
    ? mapSanityTableRows(sanityComparison.tableRows)
    : detailedPage.tableRows;
  const activeProsCons = mapSanityProsCons(sanityComparison) ?? detailedPage.prosCons;
  const activeFaqs: ComparisonFAQ[] = sanityComparison.faqItems?.length
    ? sanityComparison.faqItems
    : detailedPage.faqs;
  const activeBrandA = sanityComparison.providerA ?? detailedPage.brandA ?? null;
  const activeBrandB = sanityComparison.providerB ?? detailedPage.brandB ?? null;
  const activeBrandAPendingCities = detailedPage.brandAPendingCities ?? [];
  const activeBrandBPendingCities = detailedPage.brandBPendingCities ?? [];

  const picoCoverage = getTechnologyCoverage("PicoWay");
  const qSwitchCoverage = getTechnologyCoverage("Q-Switch");
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Comparisons", href: "/comparisons" },
    { name: comparison.title, href: `/comparisons/${slug}` },
  ]);
  const faqJsonLd = faqSchema(
    activeFaqs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })),
  );
  const articleJsonLd = buildComparisonArticleSchema(
    comparison.title,
    detailedPage.metaDescription,
    slug,
    activeFaqs,
    [
      "Tattoo removal comparison",
      sanityComparison.providerA ?? "",
      sanityComparison.providerB ?? "",
    ].filter(Boolean),
  );

  const jumpItems = [
    { label: "Verdict",    href: "#verdict" },
    { label: "Table",      href: "#comparison-table" },
    { label: "When to choose", href: "#when-to-choose" },
    { label: "What matters", href: "#criteria" },
    ...(activeBrandA && activeBrandB ? [{ label: "Evidence", href: "#evidence" }] : []),
    { label: "Pros and cons", href: "#pros-cons" },
    { label: "Questions",  href: "#questions" },
    { label: "Next steps", href: "#next-steps" },
    { label: "FAQ",        href: "#faq" },
  ];

  return (
    <main className="min-h-screen bg-(--bg)">
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

      {/* Hero */}
      <section className="border-b border-(--line) bg-feathering-mist py-22">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.75fr)_minmax(280px,1fr)] lg:items-start">
            <div>
              <p className="mb-3 font-mono text-[11px] tracking-widest uppercase text-(--muted)">
                <Link href="/comparisons" className="hover:text-(--accent)">Comparisons</Link>
                {" / "}
                <span className="text-(--ink)">{comparison.title}</span>
              </p>
              <p className="mb-4 font-mono text-[11px] font-medium tracking-widest uppercase text-(--accent)">
                {detailedPage.eyebrow}
              </p>
              <h1 className="max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-bold leading-none tracking-[-0.03em] text-(--ink)">
                {comparison.title}
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] font-medium leading-[1.55] text-(--ink)">
                {activeVerdict}
              </p>
              <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-(--muted)">
                {comparison.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#comparison-table"
                  className="inline-flex items-center px-5 py-2.5 bg-(--ink) text-(--bg) font-sans text-[13px] font-medium tracking-[-0.01em] rounded-full"
                >
                  Jump to table
                </a>
                <a
                  href="/cost"
                  className="inline-flex items-center px-5 py-2.5 border border-(--line) text-(--ink) font-sans text-[13px] font-medium tracking-[-0.01em] rounded-full"
                >
                  See cost guide
                </a>
              </div>
            </div>

            <aside id="verdict" className="border border-(--line) bg-white p-6 rounded-xl">
              <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-(--muted)">
                The short answer
              </p>
              <p className="mt-3 text-[15px] font-semibold leading-snug text-(--ink)">
                {detailedPage.summary}
              </p>
              <div className="mt-6 space-y-4 border-t border-(--line) pt-5">
                <div>
                  <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-(--muted)">
                    Site coverage
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-(--muted)">
                    Current index includes {picoCoverage.count} clinics tagged{" "}
                    <span className="font-medium text-(--ink)">PicoWay</span> and{" "}
                    {qSwitchCoverage.count} tagged{" "}
                    <span className="font-medium text-(--ink)">Q-Switch</span>.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-(--muted)">
                    PicoWay examples
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-(--muted)">
                    {picoCoverage.providers.slice(0, 3).map((p) => p.name).join(", ")}
                    {" "}and other clinics in{" "}
                    {picoCoverage.markets.slice(0, 3).join(", ")}.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-(--muted)">
                    Q-switch examples
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-(--muted)">
                    {qSwitchCoverage.providers.map((p) => p.name).join(" and ")}
                    {" "}in {qSwitchCoverage.markets.join(" and ")}.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <JumpNav items={jumpItems} />

      {/* When to choose */}
      <section id="when-to-choose" className="border-b border-(--line) bg-(--bg) py-22">
        <Container>
          <BlockHeading title="When to choose" body="Use these three frames to decide which option fits your case before going deeper into providers." />
          <div className="grid gap-4 md:grid-cols-3">
            {detailedPage.choiceCards.map((card) => (
              <article
                key={card.title}
                className="border border-(--line) bg-white p-6 rounded-xl"
              >
                <p className="text-[15px] font-semibold text-(--ink)">{card.title}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-(--muted)">{card.body}</p>
                <ul className="mt-5 flex flex-col gap-2">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-[13px] leading-relaxed text-(--muted)">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison table */}
      <section id="comparison-table" className="border-b border-(--line) bg-(--surface) py-22">
        <Container>
          <BlockHeading title="Side by side" body="Use this table to compare the technology itself, then pressure-test the provider using it." />
          <ComparisonTable
            leftLabel={sanityComparison.providerA ?? "PicoWay"}
            rightLabel={sanityComparison.providerB ?? "Q-Switch"}
            rows={activeTableRows}
          />
        </Container>
      </section>

      {/* What matters more */}
      <section id="criteria" className="border-b border-(--line) bg-(--bg) py-22">
        <Container>
          <BlockHeading title={detailedPage.criteriaTitle} body="Device name is one factor. These are the others that tend to matter just as much." />
          <div className="grid gap-4 sm:grid-cols-2">
            {detailedPage.criteriaPoints.map((point) => {
              const [label, ...rest] = point.split(". ");
              const body = rest.join(". ");
              return (
                <div key={point} className="border border-(--line) bg-white p-5 rounded-xl">
                  <p className="text-[14px] font-semibold text-(--ink)">{label}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-(--muted)">{body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Cross-city review evidence */}
      {activeBrandA && activeBrandB && (
        <section id="evidence" className="border-b border-(--line) bg-(--bg) py-22">
          <Container>
            <BlockHeading
              title="Cross-city review evidence"
              body="How each brand's review sample compares across the cities where we have data. Sample sizes reflect reviews captured per provider location in our internal dataset."
            />
            <Suspense
              fallback={
                <div className="rounded-xl border border-(--line) bg-(--surface) p-8 text-center">
                  <p className="font-sans text-[14px] text-(--muted) m-0">Loading evidence table&hellip;</p>
                </div>
              }
            >
              <BrandComparisonEvidence
                brandA={activeBrandA}
                brandB={activeBrandB}
                brandAPendingCities={activeBrandAPendingCities}
                brandBPendingCities={activeBrandBPendingCities}
              />
            </Suspense>
            <p className="font-sans text-[13px] text-(--muted) mt-4">
              The table updates as our scrape refreshes. Use the cross-city evidence as a reference, not a verdict.
            </p>
          </Container>
        </section>
      )}

      {/* Pros and cons */}
      <section id="pros-cons" className="border-b border-(--line) bg-(--surface) py-22">
        <Container>
          <BlockHeading title="Pros and cons" body="A quick read on where each technology looks stronger and where it comes up short." />
          <div className="grid gap-5 md:grid-cols-2">
            {activeProsCons.map((block) => (
              <article key={block.label} className="border border-(--line) bg-white p-6 rounded-xl">
                <p className="text-[15px] font-semibold text-(--ink)">{block.label}</p>

                <div className="mt-5">
                  <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-(--accent)">
                    Pros
                  </p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {block.pros.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[13px] leading-relaxed text-(--muted)">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 border-t border-(--line) pt-5">
                  <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-(--muted)">
                    Cons
                  </p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {block.cons.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[13px] leading-relaxed text-(--muted)">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
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

      {/* Questions + source note */}
      <section id="questions" className="border-b border-(--line) bg-(--bg) py-22">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div>
              <BlockHeading title="Consultation checklist" body="Questions to ask before you let anyone treat your tattoo." />
              <ol className="flex flex-col gap-3">
                {detailedPage.consultQuestions.map((question, index) => (
                  <li
                    key={question}
                    className="border border-(--line) bg-white p-5 rounded-xl text-[13px] leading-relaxed text-(--muted)"
                  >
                    <span className="mr-2 font-semibold text-(--ink)">{index + 1}.</span>
                    {question}
                  </li>
                ))}
              </ol>
            </div>

            <aside className="border border-(--line) bg-white p-6 rounded-xl self-start">
              <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-(--accent)">
                Source transparency
              </p>
              <p className="mt-4 text-[13px] leading-relaxed text-(--muted)">
                {detailedPage.sourceNote}
              </p>
            </aside>
          </div>
        </Container>
      </section>

      {/* Related links */}
      <section id="next-steps" className="border-b border-(--line) bg-(--surface) py-22">
        <Container>
          <BlockHeading title="Where to go next" body="Comparison intent stays here. Once you know which type of clinic or method you want to evaluate, move into the page that owns that question." />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {detailedPage.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group border border-(--line) bg-white p-6 rounded-xl transition-colors hover:border-(--accent)/30"
              >
                <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-(--accent)">
                  {link.meta}
                </p>
                <p className="mt-3 text-[15px] font-semibold text-(--ink)">{link.label}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-(--muted)">
                  {link.description}
                </p>
                <p className="mt-4 text-[12px] font-medium text-(--accent) transition-transform group-hover:translate-x-0.5">
                  Open page →
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Editorial body */}
      {sanityComparison.body && sanityComparison.body.length > 0 && (
        <section className="border-b border-(--line) bg-(--bg) py-22">
          <Container>
            <div className="prose prose-neutral text-[15px] leading-relaxed text-(--muted)">
              <PortableText value={sanityComparison.body} />
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      <section id="faq" className="bg-(--bg) py-22">
        <Container>
          <BlockHeading title="Frequently asked questions" body="Common questions from people comparing PicoWay and Q-switch before making a booking decision." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {activeFaqs.map((faq) => (
              <div key={faq.question} className="border border-(--line) bg-white p-5 rounded-xl">
                <p className="text-[14px] font-semibold text-(--ink) mb-2">{faq.question}</p>
                <p className="text-[13px] leading-relaxed text-(--muted)">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
