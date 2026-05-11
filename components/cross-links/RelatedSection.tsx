/**
 * Cross-cluster related-content section.
 *
 * Reads a `CrossLinkBundle` (see `lib/mock-data/cross-links.ts`) and renders
 * up to four grouped subsections of related links: Related Categories,
 * Related Guides, Related Comparisons, Related Providers, Related Cities.
 *
 * Server component. Takes only the bundle (no full provider/guide/category
 * objects) so the per-post Sanity payload does not bloat. Each subsection
 * is hidden when empty, and the entire section renders nothing when every
 * group is empty or missing.
 *
 * Visual pattern matches `components/guide/GuideRelatedLinks.tsx`: rounded
 * border cards, accent chevron, title and short description per item.
 *
 * Wire into page templates near the bottom of the body, after the existing
 * intra-cluster related sections.
 */

import Link from "next/link";
import Container from "@/components/layout/Container";
import MonoLabel from "@/components/reviews/MonoLabel";
import ChevronRightIcon from "@/components/ui/ChevronRightIcon";
import type { CrossLink, CrossLinkBundle } from "@/lib/mock-data/cross-links";

type Group = {
  label: string;
  items: CrossLink[];
};

function buildGroups(bundle: CrossLinkBundle): Group[] {
  const groups: Group[] = [];
  if (bundle.categories?.length) {
    groups.push({ label: "Related categories", items: bundle.categories });
  }
  if (bundle.guides?.length) {
    groups.push({ label: "Related guides", items: bundle.guides });
  }
  if (bundle.comparisons?.length) {
    groups.push({ label: "Related comparisons", items: bundle.comparisons });
  }
  if (bundle.providers?.length) {
    groups.push({ label: "Related providers", items: bundle.providers });
  }
  if (bundle.cities?.length) {
    groups.push({ label: "Related cities", items: bundle.cities });
  }
  return groups;
}

type Props = {
  bundle: CrossLinkBundle;
  /** Optional id for in-page anchor links */
  id?: string;
  /** Override the section's outer padding when the parent already provides one. Defaults to py-12. */
  className?: string;
};

export default function RelatedSection({ bundle, id, className }: Props) {
  const groups = buildGroups(bundle);
  if (groups.length === 0) return null;

  return (
    <section id={id} className={className ?? "py-12"}>
      <Container>
        <div className="mx-auto max-w-3xl space-y-10">
          {groups.map((group) => (
            <div key={group.label}>
              <MonoLabel color="accent" size="sm" className="mb-5">
                {group.label}
              </MonoLabel>
              <div className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between rounded-xl border border-(--line) bg-white shadow-[0_1px_3px_0_rgb(0,0,0,0.05)] px-5 py-4 no-underline text-inherit hover:border-(--accent) transition-colors"
                  >
                    <div className="min-w-0 pr-4">
                      <p className="font-sans font-medium text-(--ink) text-[16px] m-0 mb-0.5">
                        {item.title}
                      </p>
                      <p className="font-sans text-[13px] text-heading m-0 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                    <ChevronRightIcon className="size-4 shrink-0 text-(--accent)" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
