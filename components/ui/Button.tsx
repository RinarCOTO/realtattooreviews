import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition-colors";

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  const variants = {
    primary:
      "bg-accent text-white hover:bg-accent-hover",
    secondary:
      "border border-border bg-white text-heading hover:border-accent hover:text-accent",
    ghost:
      "text-accent hover:bg-accent-light",
  };

  return (
    <Link href={href} className={`${base} ${sizes[size]} ${variants[variant]}`}>
      {children}
    </Link>
  );
}
