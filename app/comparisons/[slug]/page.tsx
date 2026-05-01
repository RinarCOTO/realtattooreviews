import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Container from "@/components/layout/Container";
import BrandComparisonEvidence from "@/components/comparison/BrandComparisonEvidence";
import BrandTableHeader from "@/components/comparison/BrandTableHeader";
import BlockHeading from "@/components/provider/BlockHeading";
import JumpNav from "@/components/provider/JumpNav";
import ComparisonTable from "@/components/sections/ComparisonTable";
import GuideTable from "@/components/guide/GuideTable";
import GuideRelatedLinks from "@/components/guide/GuideRelatedLinks";
import SectionHeading from "@/components/guide/SectionHeading";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/reviews/PageSection";
import { getComparison, getAllComparisonSlugs } from "@/lib/page-data/comparisons";
import type { SanityComparison } from "@/lib/page-data/comparisons";
import { comparisons as mockComparisons } from "@/lib/mock-data/comparisons";
import { comparisonPages } from "@/lib/mock-data/comparison-pages";
import { providers as mockProviders } from "@/lib/mock-data/providers";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import FAQSection from "@/components/sections/FAQSection";
import type { ComparisonFAQ, ComparisonTableRow, ComparisonProsCons } from "@/types/comparison";

/**
 * Map a brand display name to its logo path under public/images/providers/logos.
 * Returns null when no logo exists; BrandTableHeader will fall back to initials.
 */
function getBrandLogo(name: string | null | undefined): string | null {
  if (!name) return null;
  const map: Record<string, string> = {
    "Removery": "/images/providers/logos/removery-logo.png",
    "inkOUT": "/images/providers/logos/inkout-logo.jpg",
    "MEDermis Laser Clinic": "/images/providers/logos/medermis-laser-clinic-logo.png",
    "InkFree, MD": "/images/providers/logos/inkfree-md-logo.png",
    "Kovak Cosmetic Center": "/images/providers/logos/kovak-cosmetic-center-logo.jpg",
    "Arviv Medical Aesthetics": "/images/providers/logos/arviv-medical-aesthetics-logo.jpg",
    "Clarity Skin": "/images/providers/logos/clarity-skin-logo.png",
    "DermSurgery Associates": "/images/providers/logos/dermsurgery-associates-logo.png",
    "Enfuse Medical Spa": "/images/providers/logos/enfuse-medical-spa-logo.png",
    "Erasable Med Spa": "/images/providers/logos/erasable-med-spa-logo.png",
    "Inklifters (Aesthetica)": "/images/providers/logos/inklifters-aesthetica-logo.png",
    "Skintellect Laser & Aesthetics": "/images/providers/logos/skintellect-laser-aesthetics-logo.png",
  };
  return map[name] ?? null;
}

function brandInitials(name: string | null | undefined): string {
  if (!name) return "?";
  const letters = name.replace(/[^A-Za-z ]/g, "").trim().split(/\s+/);
  if (letters.length === 1) return letters[0].slice(0, 2).toUpperCase();
  return (letters[0][0] + letters[1][0]).toUpperCase();
}

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
  const mockSlugs = mockComparisons.map((c) => c.slug);
  // Union: include every slug present in either source so mock-only pages still
  // statically render even when Sanity has its own (smaller) set of slugs.
  const all = [...new Set([...sanitySlugs, ...mockSlugs])];
  return all.map((slug) => ({ slug }));
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
      <main className="min-h-screen">
        <section className="py-14">
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
  const activeIntro: string[] = sanityComparison.intro?.length
    ? sanityComparison.intro
    : detailedPage.intro;
  const activeChoiceCards = sanityComparison.choiceCards?.length
    ? sanityComparison.choiceCards
    : detailedPage.choiceCards;
  const activeCriteriaTitle = sanityComparison.criteriaTitle ?? detailedPage.criteriaTitle;
  const activeCriteriaPoints: string[] = sanityComparison.criteriaPoints?.length
    ? sanityComparison.criteriaPoints
    : detailedPage.criteriaPoints;
  const activeConsultQuestions: string[] = sanityComparison.consultQuestions?.length
    ? sanityComparison.consultQuestions
    : detailedPage.consultQuestions;
  const activeSourceNote = sanityComparison.sourceNote ?? detailedPage.sourceNote;
  const activeRelatedLinks = sanityComparison.relatedLinks?.length
    ? sanityComparison.relatedLinks.map((l) => ({ href: l.href, label: l.label, description: l.description }))
    : detailedPage.relatedLinks;
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
    <main className="min-h-screen">
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
      <PageHero
        label={
          <>
            <Link href="/comparisons" className="hover:text-(--ink) transition-colors">
              Comparisons
            </Link>
            <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
            <span className="text-(--muted) font-normal normal-case tracking-normal">
              {comparison.title}
            </span>
          </>
        }
        title={
          activeBrandA && activeBrandB ? (
            <>
              {activeBrandA} vs <span className="text-(--accent)">{activeBrandB}</span>
            </>
          ) : (
            <>{comparison.title}</>
          )
        }
        subtitle={comparison.description}
      />

      {/* Intro */}
      <PageSection bg="none" noBorder>
        {activeIntro.map((paragraph, idx) => (
          <p
            key={idx}
            className={`font-sans text-[15px] leading-relaxed text-(--ink) max-w-3xl m-0 ${idx > 0 ? "mt-4" : ""}`}
          >
            {paragraph}
          </p>
        ))}
      </PageSection>

      <JumpNav items={jumpItems} />

      {/* When to choose */}
      <section id="when-to-choose" className="py-22">
        <Container>
          <BlockHeading title="When to choose" body="Use these three frames to decide which option fits your case before going deeper into providers." />
          <div className="grid gap-4 md:grid-cols-3">
            {activeChoiceCards.map((card) => (
              <article
                key={card.title}
                className="bg-white p-6 rounded-xl"
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
      <PageSection id="comparison-table" bg="none" noBorder>
        <SectionHeading>
          {activeBrandA && activeBrandB
            ? `${activeBrandA} vs ${activeBrandB} at a Glance`
            : `${comparison.title} at a Glance`}
        </SectionHeading>
        <p className="font-sans text-[15px] leading-relaxed text-(--muted) max-w-3xl mb-8">
          The most useful one-screen view of this comparison is the structural difference between
          the two providers. The table below summarizes the categorical differences. Quantitative
          review evidence appears further down in the cross-city evidence section.
        </p>
        {activeBrandA && activeBrandB ? (
          <GuideTable
            headers={[
              "",
              <BrandTableHeader
                key="left"
                name={activeBrandA}
                logoSrc={getBrandLogo(activeBrandA) ?? undefined}
                initials={brandInitials(activeBrandA)}
              />,
              <BrandTableHeader
                key="right"
                name={activeBrandB}
                logoSrc={getBrandLogo(activeBrandB) ?? undefined}
                initials={brandInitials(activeBrandB)}
              />,
            ]}
            rows={activeTableRows.map((row) => [row.criterion, row.left, row.right])}
          />
        ) : (
          <ComparisonTable
            leftLabel={sanityComparison.providerA ?? "PicoWay"}
            rightLabel={sanityComparison.providerB ?? "Q-Switch"}
            rows={activeTableRows}
          />
        )}
        <p className="font-sans text-[15px] leading-relaxed text-(--muted) max-w-3xl mt-6">
          The structural comparison sets the frame. The use-case sections below translate these
          differences into who each provider serves best.
        </p>
      </PageSection>

      {/* What matters more */}
      <section id="criteria" className="py-22">
        <Container>
          <BlockHeading title={activeCriteriaTitle} body="Device name is one factor. These are the others that tend to matter just as much." />
          <div className="grid gap-4 sm:grid-cols-2">
            {activeCriteriaPoints.map((point) => {
              const [label, ...rest] = point.split(". ");
              const body = rest.join(". ");
              return (
                <div key={point} className="bg-white p-5 rounded-xl">
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
        <section id="evidence" className="py-22">
          <Container>
            <BlockHeading
              title="Cross-city review evidence"
              body="How each brand's review sample compares across the cities where we have data. Sample sizes reflect reviews captured per provider location in our internal dataset."
            />
            <Suspense
              fallback={
                <div className="rounded-xl bg-white p-8 text-center">
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
      <section id="pros-cons" className="py-22">
        <Container>
          <BlockHeading title="Pros and cons" body="A quick read on where each technology looks stronger and where it comes up short." />
          <div className="grid gap-5 md:grid-cols-2">
            {activeProsCons.map((block) => (
              <article key={block.label} className="bg-white p-6 rounded-xl">
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

                <div className="mt-5 pt-5">
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
      <section id="questions" className="py-22">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div>
              <BlockHeading title="Consultation checklist" body="Questions to ask before you let anyone treat your tattoo." />
              <ol className="flex flex-col gap-3">
                {activeConsultQuestions.map((question, index) => (
                  <li
                    key={question}
                    className="bg-white p-5 rounded-xl text-[13px] leading-relaxed text-(--muted)"
                  >
                    <span className="mr-2 font-semibold text-(--ink)">{index + 1}.</span>
                    {question}
                  </li>
                ))}
              </ol>
            </div>

            <aside className="bg-white p-6 rounded-xl self-start">
              <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-(--accent)">
                Source transparency
              </p>
              <p className="mt-4 text-[13px] leading-relaxed text-(--muted)">
                {activeSourceNote}
              </p>
            </aside>
          </div>
        </Container>
      </section>

      {/* Related links */}
      <PageSection id="next-steps" bg="none" noBorder>
        <SectionHeading>Where to go next</SectionHeading>
        <p className="font-sans text-[15px] leading-relaxed text-(--muted) max-w-3xl mb-2">
          Comparison intent stays here. Once you know which type of clinic or method you want to
          evaluate, move into the page that owns that question.
        </p>
        <GuideRelatedLinks
          links={activeRelatedLinks.map((link) => ({
            href: link.href,
            title: link.label,
            desc: link.description,
          }))}
        />
      </PageSection>

      {/* Editorial body */}
      {sanityComparison.body && sanityComparison.body.length > 0 && (
        <section className="py-22">
          <Container>
            <div className="prose prose-neutral text-[15px] leading-relaxed text-(--muted)">
              <PortableText value={sanityComparison.body} />
            </div>
          </Container>
        </section>
      )}

      <FAQSection faqs={activeFaqs} />
    </main>
  );
}
