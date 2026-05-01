import type { ReactNode } from "react";
import Container from "@/components/layout/Container";

interface PageSectionProps {
  children: ReactNode;
  id?: string;
  bg?: "bg" | "surface" | "none";
  noBorder?: boolean;
  className?: string;
}

export default function PageSection({
  children,
  id,
  bg = "bg",
  noBorder = false,
  className = "",
}: PageSectionProps) {
  const bgClass =
    bg === "none" ? "" : bg === "surface" ? "bg-(--surface)" : "bg-(--bg)";

  return (
    <section
      id={id}
      className={[
        noBorder ? "py-22" : "border-b border-(--line) py-22",
        bgClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container>{children}</Container>
    </section>
  );
}
