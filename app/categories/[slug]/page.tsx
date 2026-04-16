import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { categories } from "@/lib/mock-data/categories";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.title} — Patient Reviews & Outcomes | RealTattooReviews`,
    description: category.description,
    openGraph: {
      title: `${category.title} — Patient Reviews & Outcomes`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-surface py-14">
        <Container>
          <p className="mb-2 text-sm text-muted">
            <Link href="/categories" className="hover:text-accent">Categories</Link>
            {" / "}
            <span className="text-heading">{category.title}</span>
          </p>
          <h1 className="text-[36px] font-bold text-heading">{category.title}</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            {category.description}
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <p className="text-sm text-subtle">Reviews for this category coming soon.</p>
        </Container>
      </section>
    </main>
  );
}
