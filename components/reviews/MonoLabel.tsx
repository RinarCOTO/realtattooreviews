import type { CSSProperties, ReactNode } from "react";

interface MonoLabelProps {
  children: ReactNode;
  color?: "muted" | "accent";
  size?: "xs" | "sm";
  className?: string;
  style?: CSSProperties;
}

export default function MonoLabel({
  children,
  color = "muted",
  size = "xs",
  className = "",
  style,
}: MonoLabelProps) {
  return (
    <div
      className={[
        "font-sans font-bold uppercase tracking-wider",
        size === "xs" ? "text-[13px]" : "text-[14px]",
        color === "accent" ? "text-(--accent)" : "text-(--muted)",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}
