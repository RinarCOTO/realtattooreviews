import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { getAllComparisons } from "@/lib/page-data/comparisons";
import { comparisons as mockComparisons } from "@/lib/mock-data/comparisons";

export const metadata: Metadata = {
  title: "Tattoo Removal Comparisons: Provider and Method Side-by-Side",
  description:
    "Side-by-side comparisons of tattoo removal providers and methods. Removery vs LaserAway, inkOUT vs Removery, PicoWay vs Q-Switch, saline vs laser, and more.",
  openGraph: {
    title: "Tattoo Removal Comparisons: Provider and Method Side-by-Side",
    description: "Side-by-side provider and method comparisons based on real patient reviews.",
  },
};

export default async function ComparisonsPage() {
  const sanityComparisons = await getAllComparisons();
  const comparisons = sanityComparisons.length > 0 ? sanityComparisons : mockComparisons;

  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-hero-bg py-14">
        <Container>
          <h1 className="text-[36px] font-bold text-heading">Comparisons</h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
            Side-by-side ratings, pricing, and patient outcomes across providers and removal methods.
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.map((comparison) => (
              <Link
                key={comparison.slug}
                href={`/comparisons/${comparison.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition hover:border-accent"
              >
                <h2 className="mb-2 text-[16px] font-semibold leading-snug text-heading group-hover:text-accent">
                  {comparison.title}
                </h2>
                <p className="mb-4 flex-1 text-[14px] leading-relaxed text-muted">
                  {comparison.description}
                </p>
                <span className="text-sm font-medium text-accent">Read comparison</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
