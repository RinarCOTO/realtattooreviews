import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import GuideSection from "@/components/guide/GuideSection";
import GuideCallout from "@/components/guide/GuideCallout";
import MonoLabel from "@/components/reviews/MonoLabel";

export const metadata: Metadata = {
  title: "Editorial Policy | RealTattooReviews",
  description:
    "How RealTattooReviews handles editorial independence, advertising disclosure, negative findings, source standards, and corrections.",
  alternates: {
    canonical: "https://realtattooreviews.com/editorial-policy",
  },
  openGraph: {
    title: "Editorial Policy | RealTattooReviews",
    description:
      "How RealTattooReviews handles editorial independence, advertising disclosure, negative findings, source standards, and corrections.",
  },
};

const faqs = [
  {
    question: "Does RealTattooReviews accept payment from providers?",
    answer:
      "inkOUT is the current advertising client. The relationship is advertising placement only. It does not affect scores, rankings, or editorial coverage.",
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
      "Use the contact page. Include the page, the issue, and a source. Reviewed within 5 business days.",
  },
];

const PAGE_PATH = "/editorial-policy";

export default function EditorialPolicyPage() {
  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Editorial Policy", href: PAGE_PATH },
  ]);
  const faqJsonLd = faqSchema(faqs);

  return (
    <div className="reviews-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="border-b border-(--line) pt-20 pb-16 bg-(--feathering-mist)">
        <Container>
          <MonoLabel color="accent" size="sm" className="mb-5">
            Transparency
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            Editorial{" "}
            <span className="text-(--accent)">Policy</span>
          </h1>

          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--muted) max-w-2xl">
            How the site handles advertising disclosure, editorial independence, negative findings,
            source standards, and corrections.
          </p>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-(--bg)">
        <Container>
          <div className="mx-auto max-w-2xl divide-y divide-(--line)">

            {/* Advertising Disclosure */}
            <GuideSection heading="Advertising Disclosure">
              <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                  inkOUT is a paying advertising client of RealTattooReviews. inkOUT pays for
                  advertising placement. inkOUT does not pay for review scores, rankings, or
                  editorial treatment. inkOUT is scored using the same framework as every other
                  provider on the site. Negative findings about inkOUT are published when the data
                  supports them.
                </p>
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0 mt-3">
                  The site does not use affiliate links. The site does not publish sponsored content.
                </p>
              </div>
            </GuideSection>

            {/* Editorial Independence */}
            <GuideSection heading="Editorial Independence">
              <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                  Coverage decisions are made by the editorial team based on user need, data
                  availability, and topical relevance. They are not made by advertisers. No provider
                  can pay to be listed, ranked, or featured. No provider can suppress, remove, or
                  pre-approve their coverage.
                </p>
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0 mt-3">
                  This applies equally to advertising clients.
                </p>
              </div>
            </GuideSection>

            {/* How Providers Are Reviewed */}
            <GuideSection heading="How Providers Are Reviewed">
              <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                  Provider scores are generated from public Google review data using a structured
                  scoring framework. The framework classifies reviews for sentiment, use case, and
                  scarring signals. Scores are calculated at the location level. National chains
                  receive separate scores for each location.
                </p>
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0 mt-3">
                  Every provider profile includes a "best for" and a "less ideal for" section. No
                  provider is presented as the right choice for every user.
                </p>
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0 mt-3">
                  The full framework is documented on the{" "}
                  <Link href="/methodology" className="text-(--accent) hover:underline">
                    methodology page
                  </Link>
                  .
                </p>
              </div>
            </GuideSection>

            {/* Negative Findings */}
            <GuideSection heading="Negative Findings">
              <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                  The site publishes negative findings. If a provider's review data contains
                  negative outcomes, those negatives appear in the provider's data on city pages,
                  comparison pages, and provider review pages. This applies to all providers,
                  including advertising clients.
                </p>
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0 mt-3">
                  Providers can report factual errors through the{" "}
                  <Link href="/contact" className="text-(--accent) hover:underline">
                    contact page
                  </Link>
                  . Providers cannot request removal of accurate negative data.
                </p>
              </div>
            </GuideSection>

            {/* Source Standards */}
            <GuideSection heading="Source Standards">
              <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                  Clinical claims are sourced from peer-reviewed literature (referenced by PMC or
                  PubMed ID), manufacturer documentation, and professional-practice consensus.
                  Fact-checking is performed against published sources before publication.
                </p>
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0 mt-3">
                  The site does not employ a named medical reviewer. Content is educational, not
                  medical advice. Consult a qualified provider before making treatment decisions.
                </p>
              </div>
            </GuideSection>

            {/* Corrections */}
            <GuideSection heading="Corrections">
              <div className="rounded-xl border border-(--line) bg-(--surface) p-5">
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0">
                  Errors are corrected when identified. The process is the same for all submitters.
                </p>
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0 mt-3">
                  <span className="font-semibold text-(--ink)">To report an error:</span> Use the{" "}
                  <Link href="/contact" className="text-(--accent) hover:underline">
                    contact page
                  </Link>
                  . Include the page URL, the specific issue, and a verifiable source. Corrections
                  are reviewed within 5 business days.
                </p>
                <p className="font-sans text-[14px] leading-relaxed text-(--muted) m-0 mt-3">
                  Provider disagreement with the scoring framework is not grounds for a correction.
                  Requests to remove accurate but unfavorable information are declined.
                </p>
              </div>
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
                . For corrections or inquiries, see{" "}
                <Link href="/contact" className="text-(--accent) hover:underline">
                  /contact
                </Link>
                .
              </GuideCallout>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-y border-(--line) bg-(--surface) py-20">
        <Container>
          <MonoLabel color="accent" size="sm" className="mb-5">
            FAQ
          </MonoLabel>
          <h2 className="font-sans font-bold text-[clamp(24px,3.5vw,36px)] leading-[1.05] tracking-[-0.025em] text-(--ink) m-0 mb-10">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="border border-(--line) bg-white p-6 rounded-xl"
              >
                <p className="font-semibold text-(--ink) text-[15px] mb-3 leading-snug m-0">
                  {faq.question}
                </p>
                <p className="text-[13px] leading-relaxed text-(--muted) m-0">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
