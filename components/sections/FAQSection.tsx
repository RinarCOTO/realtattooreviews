import Container from "@/components/layout/Container";
import FaqAccordion from "@/components/ui/FaqAccordion";

type FAQ = { question: string; answer: string };

type Props = {
  faqs: FAQ[];
  title?: string;
  description?: string;
};

export default function FAQSection({
  faqs,
  title = "Frequently Asked Questions",
  description,
}: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section className="border-t border-(--line) py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <div className="mx-auto max-w-2xl">
          <div className="mb-10">
            <h2 className="text-[32px] font-bold text-(--ink)">{title}</h2>
            {description && (
              <p className="mt-2 text-[15px] leading-relaxed text-(--muted)">
                {description}
              </p>
            )}
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </Container>
    </section>
  );
}
