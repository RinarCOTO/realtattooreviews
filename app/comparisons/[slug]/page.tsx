import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { comparisons } from "@/lib/mock-data/comparisons";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comparison = comparisons.find((c) => c.slug === slug);
  if (!comparison) return {};
  return {
    title: `${comparison.title} — Side-by-Side Comparison | RealTattooReviews`,
    description: comparison.description,
    openGraph: {
      title: `${comparison.title} — Side-by-Side Comparison`,
      description: comparison.description,
    },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const comparison = comparisons.find((c) => c.slug === slug);
  if (!comparison) notFound();

  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-surface py-14">
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
