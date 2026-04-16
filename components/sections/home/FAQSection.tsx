import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const faqs = [
  {
    q: "How are reviews collected?",
    a: "We source reviews from verified patients through direct submission and cross-reference public accounts. We do not accept reviews from clinics or their staff.",
  },
  {
    q: "Does RealTattooReviews accept payment from providers?",
    a: "No. We are not affiliated with any tattoo removal provider and do not accept payment for coverage, placement, or ratings. All reviews reflect independent findings.",
  },
  {
    q: "How are provider ratings calculated?",
    a: "Ratings are based on a scored methodology covering result outcomes, session consistency, pricing transparency, and patient communication. The full scoring model is published on our methodology page.",
  },
  {
    q: "Why do some providers have low ratings?",
    a: "We publish findings as they are — including negative ones. A low rating reflects consistent patterns across multiple reviews, not a single complaint. We do not suppress unfavorable results.",
  },
  {
    q: "How often is coverage updated?",
    a: "Provider pages and ratings are reviewed on a rolling basis as new reviews are submitted. The last update date is shown on each provider page.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          title="Common questions"
          description="About how reviews are collected, rated, and published."
        />
        <div className="divide-y divide-divider">
          {faqs.map((faq) => (
            <div key={faq.q} className="py-5">
              <p className="text-sm font-medium text-heading">{faq.q}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{faq.a}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
