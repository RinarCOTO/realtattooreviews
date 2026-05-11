import { CONTAINER } from "@/lib/layout/widths";

/**
 * Outer page container. Provides the site-wide max-width (CONTAINER token)
 * and horizontal padding. Every section's outermost wrapper is a Container.
 *
 * Width contract:
 *   - Container provides outer width (max-w-7xl / 1280px).
 *   - Sections never re-declare max-w-* on their own root div.
 *   - For body text that needs a narrower line length inside a Container,
 *     wrap with <ReadableText> (max-w-4xl / 896px).
 *   - For h1/h2 line-break control, apply HEADING_LINE from lib/layout/widths
 *     directly on the heading element.
 *
 * If you find yourself adding a max-w-* class on a section's root, check
 * first whether ReadableText is what you want. The whole point of this
 * two-layer system is that future width changes touch one file
 * (lib/layout/widths.ts), not 30 component files.
 */

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full ${CONTAINER} px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
