import type { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Blog — Tattoo Removal Research & Updates",
  description:
    "Editorial articles on tattoo removal research, provider trends, method comparisons, and patient outcomes. Written by the RealTattooReviews team.",
  openGraph: {
    title: "Blog — Tattoo Removal Research & Updates",
    description: "Editorial articles on tattoo removal research, provider trends, and patient outcomes.",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-surface py-14">
        <Container>
          <h1 className="text-[36px] font-bold text-heading">Blog</h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
            Research, provider trends, and editorial coverage on tattoo removal.
          </p>
        </Container>
      </section>
    </main>
  );
}
