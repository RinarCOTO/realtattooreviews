import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { getAllComparisons, getComparison, getAllComparisonSlugs } from "@/lib/page-data/comparisons";
import { comparisons as mockComparisons } from "@/lib/mock-data/comparisons";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const sanitySlugs = await getAllComparisonSlugs();
  if (sanitySlugs.length > 0) return sanitySlugs.map((slug) => ({ slug }));
  return mockComparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comparison = (await getComparison(slug)) ?? mockComparisons.find((c) => c.slug === slug);
  if (!comparison) return {};
  const title = (comparison as any).seoTitle ?? `${comparison.title}: Side-by-Side Comparison | RealTattooReviews`;
  const description = (comparison as any).seoDescription ?? comparison.description;
  const seoImage = (comparison as any).seoImage;
  return {
    title,
    description,
    openGraph: {
      title: `${comparison.title}: Side-by-Side Comparison`,
      description,
      ...(seoImage ? { images: [{ url: seoImage.url, alt: seoImage.alt }] } : {}),
    },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const comparison = (await getComparison(slug)) ?? mockComparisons.find((c) => c.slug === slug);
  if (!comparison) notFound();

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
