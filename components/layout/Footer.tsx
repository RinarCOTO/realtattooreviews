import Link from "next/link";
import Container from "./Container";

const links = [
  { label: "Reviews", href: "/reviews" },
  { label: "Providers", href: "/providers" },
  { label: "Compare", href: "/comparisons" },
  { label: "Cost Guide", href: "/cost" },
  { label: "Before & After", href: "/before-and-after" },
  { label: "Guides", href: "/guides" },
  { label: "Methodology", href: "/methodology" },
  { label: "Editorial Policy", href: "/editorial-policy" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer({ dataLastUpdated }: { dataLastUpdated?: string }) {
  return (
    <footer className="relative border-t border-border bg-surface py-10" style={{ zIndex: 1 }}>
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">

          {/* Brand */}
          <div className="shrink-0">
            <p className="text-sm font-bold text-heading">
              RealTattoo<span className="text-muted">Reviews</span>
            </p>
            <p className="mt-1.5 max-w-55 text-xs leading-relaxed text-muted">
              Independent tattoo removal clinic reviews. Not affiliated with any provider.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-muted hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 flex flex-wrap items-center justify-between gap-y-1 text-xs text-subtle">
          <span>© {new Date().getFullYear()} RealTattooReviews. Independent and editorially autonomous.</span>
          {dataLastUpdated && (
            <span>Data last updated: {dataLastUpdated}</span>
          )}
        </div>
      </Container>
    </footer>
  );
}
