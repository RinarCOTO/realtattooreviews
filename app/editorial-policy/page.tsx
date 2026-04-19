import type { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Editorial Policy: How We Publish Reviews",
  description:
    "RealTattooReviews editorial policy: how reviews are sourced, verified, and published. Negative reviews are published. No content is removed or suppressed by providers.",
  openGraph: {
    title: "Editorial Policy: RealTattooReviews",
    description: "How we source, verify, and publish reviews. Negative reviews are published.",
  },
};

export default function EditorialPolicyPage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-hero-bg py-14">
        <Container>
          <h1 className="text-[36px] font-bold text-heading">Editorial Policy</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            How reviews are sourced, verified, and published on RealTattooReviews.
            Negative reviews are published. No content is removed or suppressed at provider request.
          </p>
        </Container>
      </section>
    </main>
  );
}
