import Container from "@/components/layout/Container";

interface JumpNavProps {
  items: Array<{ label: string; href: string }>;
}

export default function JumpNav({ items }: JumpNavProps) {
  return (
    <div className="reviews-page sticky top-0 z-20 border-b border-(--line) bg-(--bg)/95 backdrop-blur">
      <Container>
        <nav className="flex gap-2 overflow-x-auto py-3 scrollbar-none">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 border border-(--line) px-3 py-1.5 font-mono text-[11px] font-medium tracking-widest uppercase text-(--muted) transition-colors hover:border-(--accent) hover:text-(--accent)"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </div>
  );
}
