import Link from "next/link";
import type { City } from "@/types/city";

type CityCardProps = {
  city: City;
};

export default function CityCard({ city }: CityCardProps) {
  return (
    <Link
      href={`/cities/${city.slug}`}
      className="flex items-center justify-between rounded-2xl border border-border bg-surface px-5 py-4 transition-all hover:border-accent hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-light text-accent">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <span className="text-sm font-semibold text-heading">{city.name}</span>
      </div>
      <div className="flex items-center gap-3 text-xs text-muted">
        <span>{city.reviewCount} reviews</span>
        <span className="text-border">·</span>
        <span>{city.providerCount} providers</span>
      </div>
    </Link>
  );
}
