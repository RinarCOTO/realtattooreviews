"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";

type FAQ = {
  question: string;
  answer: string;
};

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="border-t border-border py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <div className="mx-auto max-w-2xl">
          <div className="mb-10">
            <h2 className="text-[32px] font-bold text-heading">{title}</h2>
            {description && (
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {description}
              </p>
            )}
          </div>

          <div className="space-y-2">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-xl border transition-colors ${
                    isOpen
                      ? "border-accent bg-surface"
                      : "border-border bg-surface hover:border-accent/50"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-[15px] font-semibold leading-snug text-heading">
                      {faq.question}
                    </span>
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                        isOpen
                          ? "border-accent bg-accent text-white"
                          : "border-border text-muted"
                      }`}
                    >
                      <svg
                        viewBox="0 0 12 12"
                        fill="none"
                        className={`h-3 w-3 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M2 4l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-200 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="px-6 pb-5 text-[14px] leading-relaxed text-muted">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
