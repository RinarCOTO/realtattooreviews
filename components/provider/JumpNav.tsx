import Container from "@/components/layout/Container";
import DevLabel from "@/components/dev/DevLabel";

interface JumpNavProps {
  items: Array<{ label: string; href: string }>;
}

export default function JumpNav({ items }: JumpNavProps) {
  return (
    <DevLabel name="JumpNav">
    <div className="sticky top-0 z-20 bg-canvas backdrop-blur">
      <Container>
        <nav className="flex gap-2 overflow-x-auto py-3 scrollbar-none">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 px-3 py-1.5 font-sans text-[11px] font-medium tracking-widest uppercase text-heading transition-colors hover:text-(--accent)"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </div>
    </DevLabel>
  );
}
