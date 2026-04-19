import type { ReactNode } from "react";
import Container from "@/components/layout/Container";

interface PageSectionProps {
  children: ReactNode;
  id?: string;
  bg?: "bg" | "surface";
  className?: string;
}

export default function PageSection({
  children,
  id,
  bg = "bg",
  className = "",
}: PageSectionProps) {
  return (
    <section
      id={id}
      className={[
        "border-b border-(--line) py-22",
        bg === "surface" ? "bg-(--surface)" : "bg-(--bg)",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container>{children}</Container>
    </section>
  );
}
