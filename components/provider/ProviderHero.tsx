import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import DevLabel from "@/components/dev/DevLabel";
import ProviderPill from "@/components/ui/ProviderPill";

interface ProviderHeroProps {
  breadcrumb: string[];
  nameNode: ReactNode;
  body: string;
  tags: string[];
  reviewCount: number;
  reviewsHref?: string;
  providerHref?: string;
  providerLinkLabel?: string;
  card?: ReactNode;
}

export default function ProviderHero({
  breadcrumb,
  nameNode,
  body,
  tags,
  reviewCount,
  reviewsHref = "#reviews",
  providerHref,
  providerLinkLabel = "View provider profile",
  card,
}: ProviderHeroProps) {
  return (
    <DevLabel name="ProviderHero">
    <section className="bg-canvas py-6 px-4 sm:px-6">
      <div className="rounded-3xl pt-18 pb-16" style={{ background: "linear-gradient(135deg, #C8E6E4 0%, #F0EDE8 52%, #F5DDD0 100%)" }}>
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

              <p className="mt-5 font-sans font-normal text-[17px] leading-[1.55] text-(--muted) max-w-130">
                <span className="text-(--ink) font-medium">{reviewCount} sourced reviews</span>{" "}
                {body}
              </p>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {tags.slice(0, 6).map((tag) => (
                    <ProviderPill key={tag} tag={tag} />
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
            {card && (
              <div className="shrink-0">
                {card}
                {providerHref ? (
                  <div className="mt-3 text-right">
                    <Button href={providerHref} variant="ghost" size="sm">
                      {providerLinkLabel}
                    </Button>
                  </div>
                ) : null}
              </div>
            )}
          </div>
      </Container>
      </div>
    </section>
    </DevLabel>
  );
}
