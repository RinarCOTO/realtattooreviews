import type { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Tattoo Removal Cost Guide: What Patients Actually Pay",
  description:
    "Real cost data from 848 verified patient reviews. See what tattoo removal costs by provider, city, tattoo size, and ink type. Not what clinics advertise.",
  openGraph: {
    title: "Tattoo Removal Cost Guide: What Patients Actually Pay",
    description: "Real cost data from 848 verified reviews across 22 providers.",
  },
};

export default function CostPage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-hero-bg py-14">
        <Container>
          <h1 className="text-[36px] font-bold text-heading">
            Tattoo Removal Cost Guide
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            Real cost data from verified patient reviews, not clinic advertised pricing.
            See what people actually paid by provider, city, and tattoo type.
          </p>
        </Container>
      </section>
    </main>
  );
}
