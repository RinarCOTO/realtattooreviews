import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import MonoLabel from "@/components/reviews/MonoLabel";

type Props = {
  /**
   * Breadcrumb / section label rendered inside MonoLabel (font-sans bold uppercase, accent color).
   *
   * Pass full JSX for breadcrumb trails:
   *   label={
   *     <>
   *       <Link href="/cities" className="hover:text-(--ink) transition-colors">Cities</Link>
   *       <span className="text-heading font-normal normal-case tracking-normal">/</span>
   *       <span className="text-heading font-normal normal-case tracking-normal">Austin</span>
   *     </>
   *   }
   *
   * For a single section label, just pass a string: label="Guides"
   */
  label: ReactNode;
  /**
   * The h1 content. Use a ReactNode to accent a word:
   *   title={<>Tattoo Removal <span className="text-(--accent)">Guides</span></>}
   */
  title: ReactNode;
  /** Subtitle paragraph (string or ReactNode) rendered below the h1. */
  subtitle: ReactNode;
  /** Optional slot for CTA buttons or extra content below the subtitle. */
  children?: ReactNode;
  /** Override the background class (defaults to "page-hero"). Pass "category-page-hero" for category pages. */
  heroClassName?: string;
};

/**
 * Page hero shared site-wide — guides, comparisons, cities, blog, etc.
 * Renders the breadcrumb (in MonoLabel), h1, and subtitle on the warm-textured `.page-hero` background.
 */
export default function PageHero({ label, title, subtitle, children, heroClassName = "" }: Props) {
  return (
    <section className={`bg-canvas py-6 px-4 sm:px-6 ${heroClassName}`}>
      <div className="rounded-3xl pt-18 pb-16" style={{ background: "linear-gradient(135deg, #C8E6E4 0%, #F0EDE8 52%, #F5DDD0 100%)" }}>
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

          {children && <div className="mt-8">{children}</div>}
        </Container>
      </div>
    </section>
  );
}
