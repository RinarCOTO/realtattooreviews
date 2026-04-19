import type { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "How We Rate Clinics: Our Methodology",
  description:
    "How RealTattooReviews evaluates tattoo removal providers: scoring formula, review verification process, editorial standards, and conflict-of-interest disclosures.",
  openGraph: {
    title: "How We Rate Clinics: RealTattooReviews Methodology",
    description: "Our scoring formula, verification process, and editorial standards explained.",
  },
};

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-hero-bg py-14">
        <Container>
          <h1 className="text-[36px] font-bold text-heading">How We Rate Clinics</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            Our scoring methodology, review verification process, and editorial standards.
            Featured placement is determined by a composite score, not by payment or editorial preference.
          </p>
        </Container>
      </section>
    </main>
  );
}
