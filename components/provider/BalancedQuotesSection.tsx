import Container from "@/components/layout/Container";
import BlockHeading from "./BlockHeading";
import type { Review } from "@/types/review";

function quoteText(review: Review) {
  const text = (review.fullText ?? review.excerpt ?? "").replace(/\s+/g, " ").trim();
  if (text.length <= 260) return text;
  return `${text.slice(0, 257).trimEnd()}\u2026`;
}

function quoteLabel(review: Review) {
  if (review.resultRating === "Negative") return "Mild downside"
  if ((review.fullText ?? "").toLowerCase().includes("not fun")) return "Realistic expectation"
  if ((review.fullText ?? "").toLowerCase().includes("skeptical")) return "Started skeptical"
  if ((review.fullText ?? "").toLowerCase().includes("not a good fit")) return "Honest consultation"
  if ((review.fullText ?? "").toLowerCase().includes("pain")) return "Mild discomfort note"
  return "Balanced review"
}

export default function BalancedQuotesSection({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;

  return (
    <section className="py-12">
      <Container>
        <BlockHeading
          title="A More Realistic Read"
          body="These are direct patient quotes pulled from the live review set to add texture beyond summary classifications. They include honest friction, but exclude scarring-heavy or clearly severe-outcome reviews."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-border bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full bg-surface px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-heading">
                  {quoteLabel(review)}
                </span>
                <span className="text-[12px] font-medium text-accent">
                  {review.locationName ?? [review.city, review.state].filter(Boolean).join(", ")}
                </span>
              </div>

              <blockquote className="m-0 text-[15px] leading-7 text-(--ink)">
                &ldquo;{quoteText(review)}&rdquo;
              </blockquote>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-divider pt-4 text-[12px] text-heading">
                <span>{review.reviewer ?? "Google reviewer"}</span>
                {review.rating != null && <span>{review.rating.toFixed(1)}★</span>}
                {review.resultRating && <span>{review.resultRating}</span>}
                {review.reviewUrl && (
                  <a
                    href={review.reviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent hover:underline"
                  >
                    Read on Google Maps
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
