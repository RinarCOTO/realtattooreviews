import Container from "@/components/layout/Container";
import MonoLabel from "@/components/reviews/MonoLabel";

type FAQItem = { question: string; answer: string };

export default function GuideFAQSection({ faqs }: { faqs: FAQItem[] }) {
  return (
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
  );
}
