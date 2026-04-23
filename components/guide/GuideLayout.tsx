import Link from "next/link";
import Container from "@/components/layout/Container";
import MonoLabel from "@/components/reviews/MonoLabel";

type FAQ = { question: string; answer: string };

type Props = {
  breadcrumb: string;
  h1: React.ReactNode;
  description: string;
  faqs?: FAQ[];
  sources?: string;
  children: React.ReactNode;
};

export default function GuideLayout({
  breadcrumb,
  h1,
  description,
  faqs,
  sources,
  children,
}: Props) {
  const faqJsonLd = faqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <div className="reviews-page">
      {/* Hero */}
      <section className="border-b border-(--line) pt-20 pb-16 bg-(--feathering-mist)">
        <Container>
          <MonoLabel color="accent" size="sm" className="mb-5 flex items-center gap-2">
            <Link href="/guides" className="hover:text-(--ink) transition-colors">
              Guides
            </Link>
            <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
            <span className="text-(--muted) font-normal normal-case tracking-normal">
              {breadcrumb}
            </span>
          </MonoLabel>

          <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-[1.0] tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
            {h1}
          </h1>

          <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--muted) max-w-2xl">
            {description}
          </p>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-(--bg)">
        <Container>
          <div className="mx-auto max-w-2xl divide-y divide-(--line)">
            {children}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      {faqs && faqs.length > 0 && (
        <section className="border-t border-(--line) border-b border-(--line) bg-(--surface) py-20">
          {faqJsonLd && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
          )}
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
                  <p className="text-[13px] leading-relaxed text-(--muted) m-0">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Sources */}
      {sources && (
        <section className="border-t border-(--line) py-10 bg-(--bg)">
          <Container>
            <div className="mx-auto max-w-2xl">
              <p className="font-mono text-[11px] tracking-widest uppercase text-(--muted) mb-2">
                Sources
              </p>
              <p className="font-sans text-[13px] leading-relaxed text-(--muted)">
                {sources}
              </p>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
