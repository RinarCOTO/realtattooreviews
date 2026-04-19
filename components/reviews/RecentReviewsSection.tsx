import Link from "next/link";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import ReviewCardCompact from "@/components/reviews/ReviewCardCompact";
import type { Review } from "@/types/review";

type Props = {
  reviews: Review[];
};

/**
 * RecentReviewsSection — homepage review section.
 *
 * Renders up to 6 ReviewCardCompact cards in a responsive grid.
 * Section heading, editorial note, and a CTA row are included.
 * Data is fetched by the parent page (app/page.tsx) so this component
 * stays stateless and easy to test.
 *
 * Refresh cadence: the parent page revalidates on a build-time schedule
 * (static export + CI rebuild every few days). No changes needed here.
 */
export default function RecentReviewsSection({ reviews }: Props) {
  if (reviews.length === 0) return null;

  return (
    <section className="py-14">
      <Container>

        {/* ── Section heading ───────────────────────────────────────────── */}
        <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-[28px] font-bold text-heading">
              Recent sourced reviews
            </h2>
            <p className="mt-1 max-w-lg text-sm text-muted">
              Sourced from public platforms. Not curated for sentiment — positive, mixed,
              and negative submissions are all included.
            </p>
          </div>
          <Link
            href="/reviews"
            className="hidden shrink-0 text-sm font-medium text-accent hover:underline sm:block"
          >
            Browse all reviews →
          </Link>
        </div>

        {/* ── Card grid ─────────────────────────────────────────────────── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCardCompact key={review.id} review={review} />
          ))}
        </div>

        {/* ── CTA row ───────────────────────────────────────────────────── */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button href="/reviews" variant="primary" size="md">
            Browse all reviews
          </Button>
          <Button href="/providers" variant="secondary" size="md">
            Browse providers
          </Button>
        </div>

      </Container>
    </section>
  );
}
