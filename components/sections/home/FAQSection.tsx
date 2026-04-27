import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import FaqAccordion from "@/components/ui/FaqAccordion";

type Props = {
  items?: Array<{ question: string; answer: PortableTextBlock[] }>;
};

const DEFAULT_FAQS = [
  {
    question: "How are reviews collected?",
    answer: "We source reviews from public Google business listings for every provider and location we track. We do not accept reviews submitted directly to us. We do not use provider-owned testimonials.",
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
    answer: "We publish findings as they are, including negative ones. A low rating reflects consistent patterns across multiple reviews, not a single complaint. We do not suppress unfavorable results.",
  },
  {
    question: "How often is coverage updated?",
    answer: "Provider pages and ratings are reviewed on a rolling basis as new reviews are submitted. The last update date is shown on each provider page.",
  },
];

export default function FAQSection({ items }: Props) {
  const faqItems =
    items && items.length > 0
      ? items.map((f) => ({
          question: f.question,
          answer: <PortableText value={f.answer} />,
        }))
      : DEFAULT_FAQS.map((f) => ({ question: f.question, answer: f.answer }));

  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          title="Common questions"
          description="About how reviews are collected, rated, and published."
        />
        <FaqAccordion items={faqItems} />
      </Container>
    </section>
  );
}
