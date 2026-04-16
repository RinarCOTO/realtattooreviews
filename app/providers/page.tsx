import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { providers } from "@/lib/mock-data/providers";
import {
  getMultiLocationBrands,
  getProvidersByBrand,
  getSingleLocationProviders,
  brandToSlug,
} from "@/lib/providers";

export const metadata: Metadata = {
  title: "All Tattoo Removal Providers — 22 Clinics Reviewed",
  description:
    "Browse all 22 tattoo removal providers across 6 markets. Compare ratings, review counts, and specialties across laser and non-laser removal clinics.",
  openGraph: {
    title: "All Tattoo Removal Providers — 22 Clinics Reviewed",
    description: "Compare 22 tattoo removal providers across 6 markets. Ratings based on 848 verified patient reviews.",
  },
};

export default function ProvidersPage() {
  const brands = getMultiLocationBrands();
  const singles = getSingleLocationProviders();

  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-surface py-14">
        <Container>
          <h1 className="text-[36px] font-bold text-heading">
            All Providers
          </h1>
          <p className="mt-2 text-[15px] text-muted">
            {providers.length} providers across 6 markets · {providers.reduce((s, p) => s + p.reviewCount, 0)} verified reviews
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>

          {/* Multi-location brands */}
          <h2 className="mb-5 text-[18px] font-bold text-heading">Brands</h2>
          <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => {
              const locs = getProvidersByBrand(brand);
              const avgRating = (locs.reduce((s, p) => s + p.rating, 0) / locs.length).toFixed(1);
              const totalReviews = locs.reduce((s, p) => s + p.reviewCount, 0);
              return (
                <Link
                  key={brand}
                  href={`/providers/${brandToSlug(brand)}`}
                  className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <p className="font-bold text-heading">{brand}</p>
                    <span className="rounded-full bg-accent-light px-2.5 py-1 text-xs font-bold text-accent">
                      {avgRating}
                    </span>
                  </div>
                  <p className="text-xs text-muted">
                    {locs.length} locations · {totalReviews} reviews
                  </p>
                  <p className="text-xs text-subtle">
                    {locs.map((l) => l.market).join(" · ")}
                  </p>
                  <span className="mt-auto text-xs font-medium text-accent">
                    View all locations →
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Single-location providers */}
          <h2 className="mb-5 text-[18px] font-bold text-heading">
            Independent Providers
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {singles.map((provider) => (
              <Link
                key={provider.id}
                href={`/providers/${provider.slug}`}
                className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-heading">{provider.name}</p>
                    <p className="mt-0.5 text-xs text-muted">{provider.market}</p>
                  </div>
                  <span className="rounded-full bg-accent-light px-2.5 py-1 text-xs font-bold text-accent">
                    {provider.rating}
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed text-muted line-clamp-2">
                  {provider.summary}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-divider pt-3">
                  <span className="text-xs text-subtle">
                    {provider.reviewCount} reviews
                  </span>
                  <span className="text-xs font-medium text-accent">
                    View reviews →
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </Container>
      </section>
    </main>
  );
}
