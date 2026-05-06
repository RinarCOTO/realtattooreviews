import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHero from "@/components/layout/PageHero";
import { breadcrumbSchema } from "@/lib/seo/schema";

const PAGE_PATH = "/before-and-after";

export const metadata: Metadata = {
  title: "Tattoo Removal Before & After: Result Research",
  description:
    "Tattoo removal result research by ink type, skin tone, session count, and provider. Use visual outcome context alongside public review evidence before booking.",
  openGraph: {
    title: "Tattoo Removal Before & After: Result Research",
    description: "Tattoo removal result context by ink type, skin tone, and session count.",
  },
  alternates: {
    canonical: `https://realtattooreviews.com${PAGE_PATH}`,
  },
};

export default function BeforeAndAfterPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Before & After", href: PAGE_PATH },
  ]);

  return (
    <main className="min-h-screen bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHero
        label="Before & After"
        title={<>Before <span className="text-(--accent)">&amp; After</span></>}
        subtitle="Research tattoo removal outcomes by ink type, skin tone, and session count. Use visual context alongside public review evidence before booking."
      />
    </main>
  );
}
