import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/reviews/PageSection";
import GuideRelatedLinks from "@/components/guide/GuideRelatedLinks";
import SectionHeading from "@/components/guide/SectionHeading";

export const metadata: Metadata = {
  title: "Page Not Found | RealTattooReviews",
  description:
    "The page you are looking for is not available. Browse providers, cities, guides, and comparisons to find what you need.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <PageHero
        label="404"
        title={
          <>
            Page <span className="text-(--accent)">not found</span>
          </>
        }
        subtitle="The page you are looking for is not available. It may have moved, or it may not exist. The links below cover the most-used parts of the site."
      />

      <PageSection bg="bg">
        <div className="mx-auto max-w-3xl">
          <SectionHeading>Where to go from here</SectionHeading>
          <p className="font-sans text-[15px] leading-relaxed text-(--muted) mb-2">
            Pick the path that fits what you were trying to do. Most users land back on a
            provider directory, a city comparison, or a method guide.
          </p>
          <GuideRelatedLinks
            links={[
              {
                href: "/providers",
                title: "Provider directory",
                desc: "Every tracked tattoo removal provider, ranked under the same scoring framework.",
              },
              {
                href: "/cities",
                title: "City comparisons",
                desc: "Tattoo removal providers compared by metro across Austin, Chicago, Houston, Tampa, and more.",
              },
              {
                href: "/comparisons",
                title: "Provider and method comparisons",
                desc: "Side-by-side comparisons of providers and removal methods using real review evidence.",
              },
              {
                href: "/guides",
                title: "Treatment guides",
                desc: "Method-by-method explainers, healing timelines, scarring guidance, and aftercare.",
              },
              {
                href: "/reviews",
                title: "Tattoo removal reviews",
                desc: "Brand-level review profiles with sentiment, sample size, and use-case fit.",
              },
              {
                href: "/cost",
                title: "Tattoo removal cost",
                desc: "Pricing breakdown by method, size, and provider type.",
              },
              {
                href: "/before-and-after",
                title: "Before and after",
                desc: "Visual outcomes across methods, skin types, and tattoo sizes.",
              },
              {
                href: "/methodology",
                title: "Methodology",
                desc: "How review data is collected, classified, and ranked.",
              },
            ]}
          />
        </div>
      </PageSection>

      <PageSection bg="surface">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-sans text-[14px] leading-relaxed text-(--muted)">
              If you typed or pasted the URL, double-check the spelling. If you arrived from a
              link on this site, the page may have been renamed or consolidated. Use the{" "}
              <Link href="/" className="text-(--accent) hover:underline">
                homepage
              </Link>{" "}
              as a fresh starting point.
            </p>
          </div>
        </Container>
      </PageSection>
    </main>
  );
}
