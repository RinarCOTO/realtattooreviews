import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import MonoLabel from "@/components/reviews/MonoLabel";

export type FAQItem = {
  question: string;
  /** Rendered answer. Strings render as plain text; ReactNode allows rich content (e.g. PortableText). */
  answer: ReactNode;
  /**
   * Plain-text version of the answer for FAQPage JSON-LD.
   * Falls back to `answer` when it's a string. Required to include a rich-content
   * answer in the structured-data graph.
   */
  answerText?: string;
};

type Props = {
  faqs: FAQItem[];
  /** Override the h2 (defaults to "Frequently Asked Questions"). */
  title?: string;
  /** Optional supporting copy under the h2. */
  description?: string;
  /** Anchor id for in-page nav (e.g. "faq"). */
  id?: string;
  /** Override the section background (defaults to "bg-white"). */
  className?: string;
};

/**
 * Single shared FAQ section for the entire site.
 *
 * Visual: MonoLabel "FAQ" eyebrow + h2 + optional description, followed by an
 * accordion (<details>) of questions on a (--surface) panel bordered top/bottom.
 *
 * SEO: Always emits FAQPage schema.org JSON-LD for items that have plain-text
 * answers (either `answer` as a string, or via the `answerText` fallback).
 */
export default function FAQSection({
  faqs,
  title = "Frequently Asked Questions",
  description,
  id,
  className = "bg-white",
}: Props) {
  if (!faqs || faqs.length === 0) return null;

  const ldEntities = faqs
    .map((f) => {
      const text =
        f.answerText ?? (typeof f.answer === "string" ? f.answer : undefined);
      if (!text) return null;
      return {
        "@type": "Question" as const,
        name: f.question,
        acceptedAnswer: { "@type": "Answer" as const, text },
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const jsonLd =
    ldEntities.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: ldEntities,
        }
      : null;

  return (
    <section
      id={id}
      className={`${className} py-20`}
    >
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Container>
        <MonoLabel color="accent" size="sm" className="mb-5">
          FAQ
        </MonoLabel>
        <h2 className="font-sans font-bold text-[clamp(24px,3.5vw,36px)] leading-[1.05] tracking-[-0.025em] text-(--ink) m-0 mb-3">
          {title}
        </h2>
        {description && (
          <p className="text-[15px] leading-relaxed text-heading max-w-2xl m-0 mb-10">
            {description}
          </p>
        )}
        {!description && <div className="mb-10" />}

        <div className="divide-y divide-(--line) border-t border-b border-(--line)">
          {faqs.map((item, i) => (
            <details key={`${item.question}-${i}`} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                <span className="text-[16px] font-semibold text-(--ink) leading-snug">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-[20px] leading-none text-(--accent) transition-transform duration-200 group-open:rotate-45 mt-1"
                >
                  +
                </span>
              </summary>
              <div className="mt-3 max-w-2xl text-[14px] leading-relaxed text-heading">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
