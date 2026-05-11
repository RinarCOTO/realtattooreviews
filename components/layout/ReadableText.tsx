import type { ReactNode } from "react";
import { READABLE } from "@/lib/layout/widths";

/**
 * Editorial-column wrapper. Constrains body text to the READABLE width
 * (max-w-4xl / 896px) inside a wider <Container>.
 *
 * Use anywhere a heading + paragraph block sits inside a section that has
 * full-width content elsewhere (cards, ItemList, grids). The wrapper keeps
 * the text column at a readable line length while the surrounding layout
 * stretches to the Container bounds.
 *
 * Polymorphic: render as <div> (default) for grouping multiple children, or
 * <p> when wrapping a single paragraph. className passes through, but the
 * READABLE token is always applied first so component-local additions
 * (margins, font, color) compose on top of the width.
 *
 * Example:
 *
 *   <Container>
 *     <ReadableText>
 *       <h2>Title</h2>
 *       <p>Body text wraps at 896px.</p>
 *     </ReadableText>
 *     <CardGrid />   // stretches to full Container width
 *   </Container>
 */

type Tag = "div" | "p" | "section" | "article";

type Props = {
  children: ReactNode;
  as?: Tag;
  className?: string;
  id?: string;
};

export default function ReadableText({
  children,
  as: Tag = "div",
  className = "",
  id,
}: Props) {
  const composed = className ? `${READABLE} ${className}` : READABLE;
  return (
    <Tag id={id} className={composed}>
      {children}
    </Tag>
  );
}
