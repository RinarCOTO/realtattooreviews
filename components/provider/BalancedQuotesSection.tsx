import Container from "@/components/layout/Container";
import BlockHeading from "./BlockHeading";
import type { PublicReview } from "@/types/public-review";

export default function BalancedQuotesSection({ reviews }: { reviews: PublicReview[] }) {
  if (reviews.length === 0) return null;

  return (
    <section className="py-12">
      <Container>
        <BlockHeading
          title="Review Evidence Summaries"
          body="RTR-authored summaries of public review signals. These are not first-party reviews and not full Google review text."
        />
        <p className="mb-5 max-w-3xl rounded-2xl border border-border bg-surface px-5 py-4 text-[14px] leading-relaxed text-heading">
          Review signals are derived from publicly available Google Business Profile reviews.
          RealTattooReviews does not collect first-party reviews, does not host Google
          reviews, and is not affiliated with Google or any provider.
        </p>

        <div className="grid gap-4 lg:grid-cols-2">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-border bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full bg-surface px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-heading">
                  {review.evidenceLabel}
                </span>
                <span className="text-[12px] font-medium text-accent">
                  {[review.city, review.state].filter(Boolean).join(", ") || "Location not listed"}
                </span>
              </div>

              <p className="m-0 text-[17px] leading-7 text-(--ink)">
                {review.summary}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-divider pt-4 text-[12px] text-heading">
                {review.monthLabel && <span>{review.monthLabel}</span>}
                <span>{review.ratingTier}</span>
                <span>Source: {review.sourceLabel}</span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
