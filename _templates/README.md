# Page Templates

Copy the right template, search for `TODO`, fill it in.

| Template | Use for | Copy to |
|---|---|---|
| `comparison-page.tsx` | Brand A vs Brand B pages | `app/comparisons/[brand-a]-vs-[brand-b]/page.tsx` |
| `guide-page.tsx` | Educational how-to guides | `app/guides/[slug]/page.tsx` |
| `category-page.tsx` | Use-case pages (dark skin, color ink, etc.) | `app/categories/[slug]/page.tsx` |

## Shared components used by all templates

| Component | Path | Purpose |
|---|---|---|
| `PageSection` | `@/components/reviews/PageSection` | Section wrapper — bg + border + Container. Use `bg="bg"` or `bg="surface"`. Add `className="verdict-bg"` for the verdict section. |
| `SectionHeading` | `@/components/guide/SectionHeading` | The h2. Pass `label="Key Difference"` for a MonoLabel kicker above it. |
| `PageHero` | `@/components/layout/PageHero` | Site-wide hero. Pass `label` (string or breadcrumb JSX), `title` (ReactNode), `subtitle` (ReactNode). Optional `children` for a CTA row below. |
| `ContentCard` | `@/components/comparison/ContentCard` | Info cards. Use `titleSize="sm"` for pros/cons cards (white bg + icon mode). |
| `GuideBulletList` | `@/components/guide/GuideBulletList` | Bullet list. Inside a `titleSize="sm"` ContentCard it auto-switches to ⊕/⊖ icons. Pass `variant="warning"` for cons. |
| `GuideTable` | `@/components/guide/GuideTable` | Comparison table. Pass `winners={[]}` array (1 = col 1, 2 = col 2, null = tie). |
| `GuideCallout` | `@/components/guide/GuideCallout` | Highlighted callout box. Pass `label="Quick answer"` or `label="Editorial note"`. |
| `GuideRelatedLinks` | `@/components/guide/GuideRelatedLinks` | Related links footer block. |
| `GuideFAQSection` | `@/components/guide/GuideFAQSection` | FAQ accordion section. Pass the `faqs` array. |

## Rules

- Every section must use `<PageSection bg="bg|surface">` — never write a raw `<section>` with inline Tailwind.
- Every section h2 must use `<SectionHeading>` — never a raw `<h2>`.
- Alternate `bg="bg"` and `bg="surface"` between sections for visual rhythm.
- The verdict section always gets `className="verdict-bg"` on `PageSection`.
- Never use `border-l-*` as a design element.
