import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { guides } from "@/lib/mock-data/guides";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};
  return {
    title: `${guide.title} | RealTattooReviews`,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-surface py-14">
        <Container>
          <p className="mb-2 text-sm text-muted">
            <Link href="/guides" className="hover:text-accent">Guides</Link>
            {" / "}
            <span className="text-heading">{guide.title}</span>
          </p>
          <h1 className="text-[36px] font-bold text-heading">{guide.title}</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            {guide.description}
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <p className="text-sm text-subtle">Full guide content coming soon.</p>
        </Container>
      </section>
    </main>
  );
}
