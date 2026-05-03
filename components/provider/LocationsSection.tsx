import Link from "next/link";
import Container from "@/components/layout/Container";
import BlockHeading from "./BlockHeading";
import DevLabel from "@/components/dev/DevLabel";
import type { Provider } from "@/types/provider";
import { getLocationSlug } from "@/lib/providers";
import { getLocationAggregates } from "@/lib/data/reviews";
import ChevronRightIcon from "@/components/ui/ChevronRightIcon";

interface LocationsSectionProps {
  title: string;
  body: string;
  locations: Provider[];
  slug: string;
  websiteHref?: string;
}

function locationStatus(rating: number | null) {
  if (rating == null) return "Data coming soon";
  if (rating >= 4.5) return "Strong";
  if (rating >= 4.0) return "Solid";
  return "Mixed";
}

export default async function LocationsSection({
  title,
  body,
  locations,
  slug,
  websiteHref,
}: LocationsSectionProps) {
  if (locations.length === 0) return null;
  const aggregates = await getLocationAggregates(locations);

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
          {locations.map((location) => {
            const aggregate = aggregates.get(location.slug);
            const hasLiveData = !!aggregate && aggregate.totalReviews > 0;
            const hasMockData = location.reviewCount > 0 && location.rating > 0;
            const rating = hasLiveData
              ? aggregate.avgRating
              : hasMockData
                ? location.rating
                : null;
            const reviewCount = hasLiveData
              ? aggregate.totalReviews
              : hasMockData
                ? location.reviewCount
                : null;

            return (
              <div
                key={location.id}
                className="flex flex-col gap-3 border border-(--line) bg-white p-5 rounded-xl transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="font-semibold text-(--ink) text-[15px]">{location.market}</p>
                  <div className="text-right shrink-0">
                    {rating != null ? (
                      <p className="font-sans font-semibold text-[13px] text-(--accent)">
                        {rating.toFixed(1)}
                      </p>
                    ) : null}
                    <p className="text-[11px] text-heading">{locationStatus(rating)}</p>
                  </div>
                </div>
                <p className="text-[13px] leading-relaxed text-heading line-clamp-3">{location.summary}</p>
                <div className="mt-auto flex items-center justify-between gap-4 border-t border-(--line) pt-3">
                  <span className="text-[13px] text-heading">
                    {reviewCount != null ? `${reviewCount} reviews` : "Review sample pending"}
                  </span>
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
            );
          })}
        </div>
      </Container>
    </section>
    </DevLabel>
  );
}
