import Link from "next/link";
import type { Brand } from "@/types/brand";
import ProviderLogo from "@/components/ui/ProviderLogo";
import ChevronRightIcon from "@/components/ui/ChevronRightIcon";

type Props = {
  brand: Brand;
};

const METHOD_COLORS: Record<Brand["method"], string> = {
  "Laser":            "bg-accent-light text-accent",
  "Non-Laser":        "bg-secondary-soft text-secondary",
  "Laser + Non-Laser":"bg-warning-soft text-warning",
};

export default function BrandCard({ brand }: Props) {
  const methodStyle = METHOD_COLORS[brand.method];

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-card transition-all hover:border-accent hover:shadow-md">

      {/* Header: logo + name */}
      <div className="flex items-start gap-4">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border bg-bg p-1.5">
          <ProviderLogo
            slug={brand.slug}
            name={brand.name}
            className="h-full w-full object-contain"
            fallbackClassName="absolute inset-0 flex items-center justify-center text-lg font-bold text-heading"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[15px] font-bold text-heading">{brand.name}</p>
          <p className="text-[11px] text-heading">{brand.footprint}</p>
        </div>
      </div>

      {/* Descriptor */}
      <p className="mt-3 text-sm leading-relaxed text-heading">{brand.descriptor}</p>

      {/* Divider */}
      <div className="my-4 border-t border-divider" />

      {/* Stats row */}
      <div className="flex items-center gap-4 text-[13px]">
        <div className="flex flex-col items-center">
          <span className="font-bold text-heading">{brand.totalReviews}</span>
          <span className="text-[11px] text-heading">reviews</span>
        </div>
        <div className="h-7 w-px bg-divider" />
        <div className="flex flex-col items-center">
          <span className="font-bold text-heading">{brand.avgRating.toFixed(1)}</span>
          <span className="text-[11px] text-heading">avg rating</span>
        </div>
        <div className="h-7 w-px bg-divider" />
        <div className="flex flex-col items-center">
          <span className="font-bold text-heading">{brand.locationCount}</span>
          <span className="text-[11px] text-heading">{brand.locationCount === 1 ? "location" : "locations"}</span>
        </div>
      </div>

      {/* Markets */}
      <p className="mt-3 text-[12px] text-heading">
        <span className="font-medium text-heading">Markets: </span>
        {brand.markets.join(" · ")}
      </p>

      {/* Spacer */}
      <div className="mt-auto pt-5" />

      {/* Method badge + CTA */}
      <div className="flex items-center justify-between gap-2">
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${methodStyle}`}>
          {brand.method}
        </span>
        <Link
          href={`/reviews/${brand.slug}`}
          className="inline-flex items-center gap-1 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          View reviews <ChevronRightIcon className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
