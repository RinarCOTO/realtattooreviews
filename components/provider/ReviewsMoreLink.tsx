interface ReviewsMoreLinkProps {
  total: number;
  featuredCount?: number;
  targetId?: string;
}

export default function ReviewsMoreLink({
  total,
  featuredCount = 6,
  targetId = "all-reviews",
}: ReviewsMoreLinkProps) {
  if (total <= featuredCount) return null;

  const remaining = total - featuredCount;

  return (
    <a href={`#${targetId}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
      Load {remaining} more review{remaining === 1 ? "" : "s"}
      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
      </svg>
    </a>
  );
}
