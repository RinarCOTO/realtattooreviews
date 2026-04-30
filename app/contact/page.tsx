import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHero from "@/components/layout/PageHero";

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
      <PageHero
        label="Contact"
        title={<>Contact <span className="text-(--accent)">Us</span></>}
        subtitle="Questions about reviews, provider listings, or editorial concerns."
      />
    </main>
  );
}
