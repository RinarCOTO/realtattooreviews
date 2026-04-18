import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { PortableText, type PortableTextBlock } from "@portabletext/react";

type Props = {
  items?: Array<{ question: string; answer: PortableTextBlock[] }>;
}

type FallbackFaq = { question: string; answer: string };
const DEFAULT_FAQS: FallbackFaq[] = [
  {
    question: "How are reviews collected?",
    answer: "We source reviews from verified patients through direct submission and cross-reference public accounts. We do not accept reviews from clinics or their staff.",
  },
  {
    question: "Does RealTattooReviews accept payment from providers?",
    answer: "No. We are not affiliated with any tattoo removal provider and do not accept payment for coverage, placement, or ratings. All reviews reflect independent findings.",
  },
  {
    question: "How are provider ratings calculated?",
    answer: "Ratings are based on a scored methodology covering result outcomes, session consistency, pricing transparency, and patient communication. The full scoring model is published on our methodology page.",
  },
  {
    question: "Why do some providers have low ratings?",
    answer: "We publish findings as they are — including negative ones. A low rating reflects consistent patterns across multiple reviews, not a single complaint. We do not suppress unfavorable results.",
  },
  {
    question: "How often is coverage updated?",
    answer: "Provider pages and ratings are reviewed on a rolling basis as new reviews are submitted. The last update date is shown on each provider page.",
  },
];

export default function FAQSection({ items }: Props) {
  const faqs: Array<{ question: string; answer: PortableTextBlock[] | string }> =
    items && items.length > 0 ? items : DEFAULT_FAQS;
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          title="Common questions"
          description="About how reviews are collected, rated, and published."
        />
        <div className="divide-y divide-divider">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-5">
              <p className="text-sm font-medium text-heading">{faq.question}</p>
              <div className="mt-2 text-sm leading-relaxed text-muted">
                {typeof faq.answer === 'string'
                  ? faq.answer
                  : <PortableText value={faq.answer} />
                }
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
