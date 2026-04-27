import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

const METHOD_TAGS = new Set([
  "TEPR", "Non-Laser", "Laser", "PicoWay", "PicoSure", "Q-Switch", "Spectra", "Enlighten", "RevLite",
]);
const SIGNAL_TAGS = new Set([
  "Top Rated", "High Rated", "Most Reviewed",
]);

function pillClass(tag: string): string {
  if (METHOD_TAGS.has(tag)) return "bg-(--accent) text-white";
  if (SIGNAL_TAGS.has(tag)) return "bg-[#F0D5CF] text-(--accent)";
  return "border border-(--line) bg-white text-(--muted)";
}

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
    <section className="border-b border-(--line) pt-18 pb-16 bg-feathering-mist">
      <Container>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2.5 mb-7 font-sans text-[11px] tracking-[0.14em] uppercase text-(--accent)">
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
                    className={`inline-flex items-center px-3 py-1 rounded-full font-sans text-[10px] tracking-widest uppercase ${pillClass(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2.5 mt-8">
              <Button href={reviewsHref} variant="primary" size="lg">
                See Reviews and Complaints →
              </Button>
              <Button href="#alternatives" variant="secondary" size="lg">
                Compare Alternatives
              </Button>
            </div>
          </div>

          {/* Right: rating card */}
          {card && <div className="shrink-0">{card}</div>}
        </div>
      </Container>
    </section>
  );
}
