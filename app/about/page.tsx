import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import GuideLayout from "@/components/guide/GuideLayout";
import GuideSection from "@/components/guide/GuideSection";
import GuideCallout from "@/components/guide/GuideCallout";
import FAQSection from "@/components/sections/FAQSection";

export const metadata: Metadata = {
  title: "About RealTattooReviews | RealTattooReviews",
  description:
    "What RealTattooReviews is, who runs it, and why it exists. An independent review site for tattoo removal providers, methods, and practical guides.",
  alternates: {
    canonical: "https://realtattooreviews.com/about",
  },
  openGraph: {
    title: "About RealTattooReviews",
    description:
      "What RealTattooReviews is, who runs it, and why it exists. An independent review site for tattoo removal providers, methods, and practical guides.",
  },
};

const faqs = [
  {
    question: "What is RealTattooReviews?",
    answer:
      "A review and comparison site for tattoo removal. It covers providers, methods, and practical guides.",
  },
  {
    question: "Who runs it?",
    answer:
      "An independent editorial team. No provider, manufacturer, or corporate parent has ownership or editorial control. See the editorial policy for full details.",
  },
  {
    question: "How are providers scored?",
    answer:
      "From public Google review data, classified for sentiment, use case, and scarring signals. The full framework is on the methodology page.",
  },
  {
    question: "How do I report an error?",
    answer:
      "Use the contact page. Include the page, the specific issue, and a source we can verify against.",
  },
];

const PAGE_PATH = "/about";

export default function AboutPage() {
  const breadcrumbJsonLd = breadcrumbSchema([{ name: "About", href: PAGE_PATH }]);
  const faqJsonLd = faqSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <GuideLayout
        breadcrumb="About"
        h1={<>About <span className="text-(--accent)">RealTattooReviews</span></>}
        description="An independent review and comparison site for tattoo removal. Providers, methods, and practical guides, all under the same scoring framework."
        faqs={faqs}
        path={PAGE_PATH}
      >
        {/* Intro */}
        <div className="py-12">
          <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0">
            RealTattooReviews is a review and comparison site for tattoo removal. It covers
            providers, methods, and the practical decisions people face when removing a tattoo.
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0 mt-4">
            The site publishes provider reviews built from public Google review data. City
            pages rank providers in each metro. Comparison pages put methods and brands side
            by side. Category pages organize by use case. Guides cover healing, aftercare,
            scarring, and saline removal. Every page uses the same scoring framework,
            documented on the{" "}
            <Link href="/methodology" className="text-(--accent) hover:underline">
              methodology page
            </Link>
            .
          </p>
        </div>

        {/* Why it exists */}
        <GuideSection heading="Why It Exists">
          <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
            Most people researching tattoo removal are working from provider websites and
            scattered forum posts. Provider marketing is designed to sell. Forum advice is
            inconsistent. Pricing is hidden behind consultations. Method comparisons barely
            exist, and the ones that do usually favor whatever the writer sells.
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
            The result is that people make a decision involving months of treatment, thousands
            of dollars, and real risk to their skin based on incomplete or biased information.
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
            This site exists because that gap is real and nobody was filling it well. The goal
            is straightforward: help people match the right method and provider to their
            specific tattoo, skin type, and budget. Not push a single answer. Not rank one
            provider above all others. Just make the real differences between options clear
            enough that someone can walk into a consultation already knowing what to ask.
          </p>
        </GuideSection>

        {/* Who runs it */}
        <GuideSection heading="Who Runs It">
          <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
            The site is operated independently. Editorial decisions, scoring, and publication
            are handled by the team that built it. No tattoo removal provider, laser
            manufacturer, or device company has ownership or editorial control.
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
            For how the site handles funding, editorial independence, and corrections,
            see the{" "}
            <Link href="/editorial-policy" className="text-(--accent) hover:underline">
              editorial policy
            </Link>
            .
          </p>
        </GuideSection>

        {/* How it works */}
        <GuideSection heading="How It Works">
          <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
            The{" "}
            <Link href="/methodology" className="text-(--accent) hover:underline">
              methodology page
            </Link>{" "}
            documents the full scoring framework. The short version:
          </p>
          {[
            {
              title: "Provider scores",
              body: "Come from public Google reviews. Each review is classified for sentiment, use case (complete removal, cover-up, microblading, color), and scarring signals. Providers are ranked per city based on sample size, sentiment, use-case fit, method specialization, and pricing transparency.",
            },
            {
              title: "Live data",
              body: "Rankings update as new review data enters the dataset. Every dynamic data section on the site shows when it was last refreshed.",
            },
            {
              title: "No pay-for-placement",
              body: "No provider can pay to be listed, ranked higher, or given favorable coverage. Negative findings are published when the evidence supports them. Every provider profile includes a best-for and a less-ideal-for section.",
            },
          ].map((item) => (
            <div key={item.title}>
              <p className="font-sans text-[15px] font-semibold text-(--ink) mb-1">{item.title}</p>
              <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0">{item.body}</p>
            </div>
          ))}
        </GuideSection>

        {/* Footer note */}
        <div className="py-12">
          <GuideCallout label="More">
            For editorial standards and commercial disclosures, see{" "}
            <Link href="/editorial-policy" className="text-(--accent) hover:underline">
              /editorial-policy
            </Link>
            . For scoring details, see{" "}
            <Link href="/methodology" className="text-(--accent) hover:underline">
              /methodology
            </Link>
            .
          </GuideCallout>
        </div>
      </GuideLayout>
    </>
  );
}
