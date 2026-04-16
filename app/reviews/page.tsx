import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import { providers } from "@/lib/mock-data/providers";

export const metadata: Metadata = {
  title: "All Tattoo Removal Reviews — 848 Verified Patients",
  description:
    "Browse 848 verified patient reviews across 22 tattoo removal providers in 6 markets. Filter by provider, city, ink type, and rating.",
  openGraph: {
    title: "All Tattoo Removal Reviews — 848 Verified Patients",
    description: "848 verified reviews across 22 providers. Filter by provider, city, and ink type.",
  },
};

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-surface py-14">
        <Container>
          <h1 className="text-[36px] font-bold text-heading">All Reviews</h1>
          <p className="mt-2 text-[15px] text-muted">
            848 verified patient reviews across {providers.length} providers
          </p>
        </Container>
      </section>
    </main>
  );
}
