import Link from "next/link";
import Container from "@/components/layout/Container";
import BlockHeading from "./BlockHeading";
import DevLabel from "@/components/dev/DevLabel";
import type { Provider } from "@/types/provider";
import { getLocationSlug } from "@/lib/providers";
import ChevronRightIcon from "@/components/ui/ChevronRightIcon";

interface LocationsSectionProps {
  title: string;
  body: string;
  locations: Provider[];
  slug: string;
  websiteHref?: string;
}

export default function LocationsSection({
  title,
  body,
  locations,
  slug,
  websiteHref,
}: LocationsSectionProps) {
  if (locations.length === 0) return null;

  return (
    <DevLabel name="LocationsSection">
    <section id="locations" className="py-22">
      <Container>
        <BlockHeading title={title} body={body} />
        {websiteHref ? (
          <div className="mb-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
            <a
              href={websiteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex font-medium text-(--accent) hover:underline"
            >
              Visit official website ↗
            </a>
          </div>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <div
              key={location.id}
              className="flex flex-col gap-3 border border-(--line) bg-white p-5 rounded-xl transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <p className="font-semibold text-(--ink) text-[15px]">{location.market}</p>
                <div className="text-right shrink-0">
                  <p className="font-sans font-semibold text-[13px] text-(--accent)">{location.rating}</p>
                  <p className="text-[11px] text-heading">
                    {location.rating >= 4.5 ? "Strong" : location.rating >= 4.0 ? "Solid" : "Mixed"}
                  </p>
                </div>
              </div>
              <p className="text-[13px] leading-relaxed text-heading line-clamp-3">{location.summary}</p>
              <div className="mt-auto flex items-center justify-between border-t border-(--line) pt-3">
                <span className="text-[13px] text-heading">{location.reviewCount} reviews</span>
                {location.googleBusinessUrl ? (
                  <a
                    href={location.googleBusinessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[12px] font-medium text-(--accent) hover:underline"
                  >
                    Google reviews <ChevronRightIcon className="size-3.5" />
                  </a>
                ) : (
                  <Link
                    href={`/reviews/${slug}/${getLocationSlug(location)}/`}
                    className="inline-flex items-center gap-1 text-[12px] font-medium text-(--accent) hover:underline"
                  >
                    View location <ChevronRightIcon className="size-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
    </DevLabel>
  );
}
