import Container from "@/components/layout/Container";
import BlockHeading from "./BlockHeading";
import type { Review } from "@/types/review";
import { generateFindingText } from "@/lib/review-evidence";

function evidenceSummary(review: Review) {
  if (review.reviewSummary) return review.reviewSummary;
  if (review.useCase && review.resultRating) return generateFindingText(review);
  return null;
}

function evidenceLabel(review: Review) {
  if (review.resultRating === "Negative") return "Mild downside"
  if (review.painLevel != null) return "Pain signal"
  if (review.resultRating === "Mixed") return "Mixed signal"
  if (review.costMentioned) return "Pricing signal"
  if (review.staffMentioned) return "Staff signal"
  return "Balanced review"
}

function sourceLabel(source?: string) {
  if (!source) return "Google Business Profile";
  return source.toLowerCase().includes("google") ? "Google Business Profile" : source;
}

export default function BalancedQuotesSection({ reviews }: { reviews: Review[] }) {
  const evidenceItems = reviews
    .map((review) => ({ review, summary: evidenceSummary(review) }))
    .filter((item): item is { review: Review; summary: string } => Boolean(item.summary));

  if (evidenceItems.length === 0) return null;

  return (
    <section className="py-12">
      <Container>
        <BlockHeading
          title="Review Evidence Summaries"
          body="RTR-authored summaries of public review signals. These are not first-party reviews and not full Google review text."
        />
        <p className="mb-5 max-w-3xl rounded-2xl border border-border bg-surface px-5 py-4 text-[13px] leading-relaxed text-heading">
          Review signals are derived from publicly available Google Business Profile reviews.
          RealTattooReviews does not collect first-party reviews, does not host Google
          reviews, and is not affiliated with Google or any provider.
        </p>

        <div className="grid gap-4 lg:grid-cols-2">
          {evidenceItems.map(({ review, summary }) => (
            <article
              key={review.id}
              className="rounded-2xl border border-border bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full bg-surface px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-heading">
                  {evidenceLabel(review)}
                </span>
                <span className="text-[12px] font-medium text-accent">
                  {review.locationName ?? [review.city, review.state].filter(Boolean).join(", ")}
                </span>
              </div>

              <p className="m-0 text-[15px] leading-7 text-(--ink)">
                {summary}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-divider pt-4 text-[12px] text-heading">
                {review.rating != null && <span>{review.rating.toFixed(1)}★</span>}
                {review.date && <span>{review.date}</span>}
                {review.resultRating && <span>{review.resultRating}</span>}
                <span>Source: {sourceLabel(review.source)}</span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
