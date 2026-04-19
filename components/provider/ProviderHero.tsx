import type { ReactNode } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";

interface ProviderHeroProps {
  breadcrumb: string[];
  nameNode: ReactNode;
  body: string;
  tags: string[];
  reviewCount: number;
  reviewsHref?: string;
  card?: ReactNode;
}

export default function ProviderHero({
  breadcrumb,
  nameNode,
  body,
  tags,
  reviewCount,
  reviewsHref = "#reviews",
  card,
}: ProviderHeroProps) {
  return (
    <section className="reviews-page border-b border-(--line) pt-18 pb-16 bg-(--bg)">
      <Container>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2.5 mb-7 font-mono text-[11px] tracking-[0.14em] uppercase text-(--accent)">
          <span className="inline-block w-6 h-px bg-(--accent) shrink-0" />
          {breadcrumb.map((crumb, i) => (
            <span key={crumb}>
              {i > 0 && <span className="opacity-40 mx-1.5">·</span>}
              {crumb}
            </span>
          ))}
        </div>

        <div className="flex items-start justify-between gap-10 flex-wrap">
          {/* Left: text */}
          <div className="flex-1 min-w-0" style={{ flexBasis: "400px" }}>
            <h1 className="font-sans font-bold text-[clamp(40px,6vw,72px)] leading-none tracking-[-0.03em] m-0 text-(--ink) max-w-[20ch]">
              {nameNode}
            </h1>

            <p className="mt-5 font-sans font-normal text-[17px] leading-[1.55] text-(--muted) max-w-[520px]">
              <span className="text-(--ink) font-medium">{reviewCount} sourced reviews</span>{" "}
              {body}
            </p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {tags.slice(0, 6).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 border border-(--line) rounded-full font-sans text-[10px] tracking-[0.1em] uppercase text-(--muted)"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2.5 mt-8">
              <Link
                href={reviewsHref}
                className="inline-flex items-center px-6 py-3 bg-(--ink) text-(--bg) font-sans text-[14px] font-medium no-underline tracking-[-0.01em] rounded-full"
              >
                See Reviews and Complaints →
              </Link>
              <Link
                href="#alternatives"
                className="inline-flex items-center px-6 py-3 border border-(--line) text-(--ink) font-sans text-[14px] font-medium no-underline tracking-[-0.01em] rounded-full"
              >
                Compare Alternatives
              </Link>
            </div>
          </div>

          {/* Right: rating card */}
          {card && <div className="shrink-0">{card}</div>}
        </div>
      </Container>
    </section>
  );
}
