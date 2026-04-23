type Props = {
  items: string[];
  variant?: "accent" | "warning";
};

export default function GuideBulletList({ items, variant = "accent" }: Props) {
  const dot = variant === "warning" ? "bg-(--danger)" : "bg-(--accent)";

  return (
    <ul className="space-y-2 m-0 p-0 list-none">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 font-sans text-[14px] leading-snug text-(--muted)"
        >
          <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
          {item}
        </li>
      ))}
    </ul>
  );
}
