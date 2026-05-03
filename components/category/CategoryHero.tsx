import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import MonoLabel from "@/components/reviews/MonoLabel";

type Props = {
  label: ReactNode;
  title: ReactNode;
  subtitle: string;
  /** Right-side visual card slot */
  visual?: ReactNode;
  /** Optional slot below subtitle (badge, feature grid, etc.) */
  children?: ReactNode;
};

/**
 * Two-column hero for category detail pages.
 * Text on the left, visual card on the right.
 * Stacks to single column on mobile.
 */
export default function CategoryHero({
  label,
  title,
  subtitle,
  visual,
  children,
}: Props) {
  return (
    <section className="bg-white py-20 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: text ─────────────────────────────────────────── */}
          <div>
            <MonoLabel color="accent" size="sm" className="mb-5 flex items-center gap-2">
              {label}
            </MonoLabel>

            <h1 className="font-sans font-bold text-[clamp(32px,4.5vw,52px)] leading-[1.05] tracking-[-0.03em] text-(--ink) max-w-[22ch] m-0">
              {title}
            </h1>

            <p className="mt-5 font-sans text-[16px] leading-relaxed text-heading max-w-xl m-0">
              {subtitle}
            </p>

            {children && <div className="mt-7">{children}</div>}
          </div>

          {/* ── Right: visual with radial glow ─────────────────────── */}
          {visual && (
            <div className="relative flex justify-center lg:justify-end">
              {/* Radial glow behind the card */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  width: "130%",
                  height: "130%",
                  top: "-15%",
                  left: "-15%",
                  background: "radial-gradient(ellipse 70% 70% at 50% 50%, #C8E6E4 0%, #C8E6E4 35%, #F5F0DC 62%, transparent 80%)",
                  filter: "blur(48px)",
                  zIndex: 0,
                }}
              />
              <div style={{ position: "relative", zIndex: 1 }}>
                {visual}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
