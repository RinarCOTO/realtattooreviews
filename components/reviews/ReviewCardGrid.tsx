import type { Review } from "@/types/review";
import ReviewEvidenceCard from "./ReviewEvidenceCard";

type Props = {
  reviews: Review[];
  showProvider?: boolean;
  columns?: 1 | 2 | 3;
};

const columnClass = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

export default function ReviewCardGrid({ reviews, showProvider = true, columns = 2 }: Props) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-heading">No reviews found.</p>
    );
  }

  return (
    <div className={`grid gap-4 ${columnClass[columns]}`}>
      {reviews.map((review) => (
        <ReviewEvidenceCard
          key={review.id}
          review={review}
          showProvider={showProvider}
        />
      ))}
    </div>
  );
}
