import type { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Tattoo Removal Before & After: Real Patient Results",
  description:
    "Before and after photos from real tattoo removal patients. See what results actually look like by ink type, skin tone, session count, and provider.",
  openGraph: {
    title: "Tattoo Removal Before & After: Real Patient Results",
    description: "Real before and after photos by ink type, skin tone, and session count.",
  },
};

export default function BeforeAndAfterPage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-hero-bg py-14">
        <Container>
          <h1 className="text-[36px] font-bold text-heading">Before & After</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            Real patient results by ink type, skin tone, and session count.
            All photos are from verified reviews.
          </p>
        </Container>
      </section>
    </main>
  );
}
