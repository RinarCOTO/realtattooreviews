import type { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "About RealTattooReviews",
  description:
    "RealTattooReviews is an independent tattoo removal review platform. No affiliate deals, no paid placements — just transparent ratings and real patient experiences.",
  openGraph: {
    title: "About RealTattooReviews",
    description: "Independent tattoo removal reviews. No affiliate deals, no paid placements.",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-surface py-14">
        <Container>
          <h1 className="text-[36px] font-bold text-heading">About RealTattooReviews</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            RealTattooReviews is an independent tattoo removal review and comparison platform.
            No affiliate deals, no paid placements — transparent ratings based on real patient experiences.
          </p>
        </Container>
      </section>
    </main>
  );
}
