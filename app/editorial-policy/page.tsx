import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import GuideLayout from "@/components/guide/GuideLayout";
import GuideSection from "@/components/guide/GuideSection";
import GuideCallout from "@/components/guide/GuideCallout";

export const metadata: Metadata = {
  title: "Editorial Policy | RealTattooReviews",
  description:
    "How RealTattooReviews handles editorial independence, funding, negative findings, source standards, and corrections.",
  alternates: {
    canonical: "https://realtattooreviews.com/editorial-policy",
  },
  openGraph: {
    title: "Editorial Policy | RealTattooReviews",
    description:
      "How RealTattooReviews handles editorial independence, funding, negative findings, source standards, and corrections.",
  },
};

const faqs = [
  {
    question: "Does RealTattooReviews accept payment from providers?",
    answer:
      "No. The site does not accept advertising. The site does not use affiliate links. The site does not publish sponsored content. Provider rankings and review classifications are based on review-sample evidence and the scoring framework, not on commercial relationships.",
  },
  {
    question: "Does the site publish negative reviews?",
    answer:
      "Yes. Negative findings are published when the data supports them. No provider can suppress or remove accurate negative data.",
  },
  {
    question: "Are pages medically reviewed?",
    answer:
      "Content is fact-checked against peer-reviewed literature. The site does not employ a medical reviewer. Content is educational, not medical advice.",
  },
  {
    question: "How do I report an error?",
    answer:
      "Errors are reviewed and corrected when identified. Each correction record includes the page URL, the specific issue, and a verifiable source. Corrections are reviewed within 5 business days.",
  },
];

const PAGE_PATH = "/editorial-policy";

export default function EditorialPolicyPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Editorial Policy", href: PAGE_PATH },
  ]);
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
        breadcrumb="Editorial Policy"
        h1={<>Editorial <span className="text-(--accent)">Policy</span></>}
        description="How the site handles editorial independence, funding, negative findings, source standards, and corrections."
        faqs={faqs}
        path={PAGE_PATH}
      >
        {/* Intro */}
        <div className="py-12">
          <p className="font-sans text-[15px] leading-relaxed text-(--muted) m-0">
            RealTattooReviews does not accept advertising, affiliate deals, or sponsored content.
            Every provider on the site is subject to the same scoring framework, the same evidence
            rules, and the same correction process.
          </p>
        </div>

        {/* Independence and Funding */}
        <GuideSection heading="Independence and Funding">
          <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
            The site does not accept advertising. The site does not use affiliate links. The site
            does not publish sponsored content. Provider rankings, review classifications, and
            editorial coverage are based on review-sample evidence and the scoring framework, not
            on commercial relationships.
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
            No provider can pay to be listed, ranked, or featured. No provider can suppress or
            pre-approve their coverage. Negative findings are published when the data supports them.
          </p>
        </GuideSection>

        {/* Editorial Independence */}
        <GuideSection heading="Editorial Independence">
          <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
            Coverage decisions are made by the editorial team based on user need, data availability,
            and topical relevance. No provider can pay to be listed, ranked, or featured. No provider
            can suppress, remove, or pre-approve their coverage.
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
            The same scoring framework, evidence rules, and correction process apply to every
            provider on the site.
          </p>
        </GuideSection>

        {/* How Providers Are Reviewed */}
        <GuideSection heading="How Providers Are Reviewed">
          <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
            Provider scores are generated from public Google review data using a structured scoring
            framework. The framework classifies reviews for sentiment, use case, and scarring
            signals. Scores are calculated at the location level. National chains receive separate
            scores for each location.
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
            Every provider profile includes a "best for" and a "less ideal for" section. No provider
            is presented as the right choice for every user.
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
            The full framework is documented on the{" "}
            <Link href="/methodology" className="text-(--accent) hover:underline">
              methodology page
            </Link>
            .
          </p>
        </GuideSection>

        {/* Negative Findings */}
        <GuideSection heading="Negative Findings">
          <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
            The site publishes negative findings. If a provider's review data contains negative
            outcomes, those negatives appear in the provider's data on city pages, comparison
            pages, and provider review pages. This applies to every provider on the site.
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
            Factual errors are reviewed and corrected when identified. Providers cannot request
            removal of accurate negative data.
          </p>
        </GuideSection>

        {/* Source Standards */}
        <GuideSection heading="Source Standards">
          <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
            Clinical claims are sourced from peer-reviewed literature (referenced by PMC or PubMed
            ID), manufacturer documentation, and professional-practice consensus. Fact-checking is
            performed against published sources before publication.
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
            The site does not employ a named medical reviewer. Content is educational, not medical
            advice. Consult a qualified provider before making treatment decisions.
          </p>
        </GuideSection>

        {/* Corrections */}
        <GuideSection heading="Corrections">
          <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
            Errors are corrected when identified. The process is the same for all submitters.
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
            Corrections are reviewed within 5 business days of identification. Each correction
            includes the page URL, the specific issue, and a verifiable source.
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-(--muted)">
            Provider disagreement with the scoring framework is not grounds for a correction.
            Requests to remove accurate but unfavorable information are declined.
          </p>
        </GuideSection>

        {/* Footer note */}
        <div className="py-12">
          <GuideCallout label="More">
            For scoring details, see{" "}
            <Link href="/methodology" className="text-(--accent) hover:underline">
              /methodology
            </Link>
            . For site background, see{" "}
            <Link href="/about" className="text-(--accent) hover:underline">
              /about
            </Link>
            .
          </GuideCallout>
        </div>
      </GuideLayout>
    </>
  );
}
