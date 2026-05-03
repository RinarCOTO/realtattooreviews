import Link from "next/link";
import type { Provider } from "@/types/provider";
import ProviderLogo from "@/components/ui/ProviderLogo";
import { brandToSlug } from "@/lib/providers";

type Props = {
  provider: Provider;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-3.5 w-3.5 ${rating >= star ? "text-amber-400" : "text-border"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProviderCard({ provider }: Props) {
  const logoSlug = provider.brand ? brandToSlug(provider.brand) : provider.slug;

  return (
    <div className="relative flex h-full flex-col items-center rounded-2xl border border-border bg-white px-6 pb-6 pt-8 text-center shadow-card transition-all hover:border-accent hover:shadow-md">

      {/* Logo */}
      <div className="relative mb-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-border bg-white p-2.5">
          <ProviderLogo
            slug={logoSlug}
            name={provider.name}
            className="h-full w-full object-contain"
            fallbackClassName="absolute inset-0 flex items-center justify-center text-xl font-bold text-heading"
          />
        </div>
        {/* Verified badge */}
        <span className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-accent">
          <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </span>
      </div>

      {/* Name & specialty */}
      <p className="text-[15px] font-bold text-heading">{provider.name}</p>
      {provider.specialty && (
        <p className="mt-0.5 text-xs text-heading">{provider.specialty}</p>
      )}

      {/* Rating row */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        <StarRating rating={provider.rating} />
        <span className="text-sm font-semibold text-accent">{provider.rating.toFixed(1)}</span>
        <span className="text-xs text-border">|</span>
        <span className="text-xs font-medium text-accent">{provider.reviewCount} Reviews</span>
      </div>

      {/* Meta */}
      <div className="mt-3 flex flex-col items-center gap-1 text-xs text-heading">
        {provider.yearsActive && (
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5 text-heading" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {provider.yearsActive} years active
          </span>
        )}
        {provider.location && (
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5 text-heading" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {provider.location}
          </span>
        )}
      </div>

      {/* Spacer pushes buttons to bottom */}
      <div className="mt-auto w-full border-t border-divider pt-5" />

      {/* CTAs */}
      <div className="flex w-full gap-2">
        <Link
          href={`/reviews/${provider.slug}`}
          className="flex-1 rounded-full border border-border py-2 text-xs font-semibold text-body transition-colors hover:border-accent hover:text-accent"
        >
          Reviews
        </Link>
        <Link
          href={`/reviews/${provider.slug}`}
          className="flex-1 rounded-full bg-accent py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Profile
        </Link>
      </div>
    </div>
  );
}
