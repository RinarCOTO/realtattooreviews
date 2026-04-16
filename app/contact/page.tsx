import type { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the RealTattooReviews team. Questions about reviews, provider listings, or editorial concerns.",
  openGraph: {
    title: "Contact RealTattooReviews",
    description: "Questions about reviews, provider listings, or editorial concerns.",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-surface py-14">
        <Container>
          <h1 className="text-[36px] font-bold text-heading">Contact Us</h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
            Questions about reviews, provider listings, or editorial concerns.
          </p>
        </Container>
      </section>
    </main>
  );
}
