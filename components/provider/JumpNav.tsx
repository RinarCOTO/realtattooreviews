import Container from "@/components/layout/Container";

interface JumpNavProps {
  items: Array<{ label: string; href: string }>;
}

export default function JumpNav({ items }: JumpNavProps) {
  return (
    <div className="sticky top-0 z-20 border-b border-(--ink)/20 bg-(--ink) backdrop-blur">
      <Container>
        <nav className="flex gap-2 overflow-x-auto py-3 scrollbar-none">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 border border-white/30 px-3 py-1.5 font-sans text-[11px] font-medium tracking-widest uppercase text-white transition-colors hover:border-white hover:bg-white/10"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </div>
  );
}
