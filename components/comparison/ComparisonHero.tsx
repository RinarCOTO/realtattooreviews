import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import MonoLabel from "@/components/reviews/MonoLabel";

type Props = {
  /**
   * Full breadcrumb content rendered inside MonoLabel.
   * Pass the complete JSX — link + separator + page name:
   *
   *   label={<><Link href="/comparisons">Comparisons</Link>
   *     <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
   *     <span className="text-(--muted) font-normal normal-case tracking-normal">inkOUT vs Removery</span>
   *   </>}
   */
  label: ReactNode;
  /**
   * The h1 content. Use a ReactNode to accent a word:
   *   title={<>inkOUT vs <span className="text-(--accent)">Removery</span></>}
   */
  title: ReactNode;
  /** Short subtitle paragraph */
  subtitle: string;
};

/**
 * Hero section shared by all comparison pages.
 * Renders the breadcrumb, h1, and subtitle consistently.
 */
export default function ComparisonHero({ label, title, subtitle }: Props) {
  return (
    <section className="border-b border-(--line) pt-20 pb-16 comparison-hero">
      <Container>
        <MonoLabel color="accent" size="sm" className="mb-5 flex items-center gap-2">
          {label}
        </MonoLabel>

        <h1 className="font-sans font-bold text-[clamp(36px,6vw,64px)] leading-none tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
          {title}
        </h1>

        <p className="mt-6 font-sans text-[18px] leading-relaxed text-(--ink) max-w-2xl">
          {subtitle}
        </p>
      </Container>
    </section>
  );
}
