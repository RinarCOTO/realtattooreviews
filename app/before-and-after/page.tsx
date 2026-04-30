import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHero from "@/components/layout/PageHero";

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
      <PageHero
        label="Before & After"
        title={<>Before <span className="text-(--accent)">&amp; After</span></>}
        subtitle="Real patient results by ink type, skin tone, and session count. All photos are from verified reviews."
      />
    </main>
  );
}
