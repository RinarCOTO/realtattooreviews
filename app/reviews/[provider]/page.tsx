import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { providers } from "@/lib/mock-data/providers";

type Props = { params: Promise<{ provider: string }> };

export async function generateStaticParams() {
  return providers.map((p) => ({ provider: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { provider: slug } = await params;
  const provider = providers.find((p) => p.slug === slug);
  if (!provider) return {};
  return {
    title: `${provider.name} Reviews — ${provider.market} | RealTattooReviews`,
    description: `${provider.reviewCount} verified patient reviews for ${provider.name} in ${provider.market}. ${provider.rating} avg rating. ${provider.summary}`,
    openGraph: {
      title: `${provider.name} Reviews — ${provider.market}`,
      description: `${provider.reviewCount} verified patient reviews for ${provider.name}. ${provider.rating} avg rating.`,
    },
  };
}

export default async function ProviderReviewsPage({ params }: Props) {
  const { provider: slug } = await params;
  const provider = providers.find((p) => p.slug === slug);
  if (!provider) notFound();

  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-surface py-14">
        <Container>
          <p className="mb-2 text-sm text-muted">
            <Link href="/reviews" className="hover:text-accent">Reviews</Link>
            {" / "}
            <span className="text-heading">{provider.name}</span>
          </p>
          <h1 className="text-[36px] font-bold text-heading">
            {provider.name} Reviews
          </h1>
          <p className="mt-2 text-[15px] text-muted">
            {provider.market} · {provider.reviewCount} verified reviews · {provider.rating} avg rating
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <p className="max-w-2xl text-[15px] leading-relaxed text-body">
            {provider.summary}
          </p>
        </Container>
      </section>
    </main>
  );
}
