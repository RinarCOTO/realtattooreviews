/**
 * Single source of truth for content-width tokens.
 *
 * The site has two width layers:
 *
 *   1. CONTAINER (outer page bound, 1280px)
 *      Applied once per section via the <Container> component.
 *      Sections never re-declare max-w-* on their root div.
 *
 *   2. READABLE (editorial column, 896px)
 *      Applied to body text inside a Container via the <ReadableText> wrapper.
 *      Headings + paragraphs that share a column use this so the line length
 *      stays readable while the rest of the section (cards, grids, ItemList)
 *      stretches to the full Container width.
 *
 * HEADING_LINE is a separate token applied directly to h1/h2 elements to
 * control where the title line-breaks. It is character-based (ch), not
 * pixel-based, because heading line-break behavior depends on font.
 *
 * If a future redesign needs a wider or narrower editorial column, change
 * READABLE here and the entire site moves together. Do not hardcode
 * max-w-* on text wrappers — use these tokens or the <ReadableText> wrapper.
 */

export const CONTAINER = "max-w-7xl";
export const READABLE = "max-w-4xl";
export const HEADING_LINE = "max-w-[22ch]";
