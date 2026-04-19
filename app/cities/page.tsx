import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { getAllCities } from "@/lib/page-data/cities";
import { cities as mockCities } from "@/lib/mock-data/cities";

export const metadata: Metadata = {
  title: "Tattoo Removal by City: Reviews and Provider Ratings",
  description:
    "Browse tattoo removal reviews and provider ratings by city. Coverage across Austin, Chicago, Tampa, Houston, Draper, and Pleasant Grove.",
  openGraph: {
    title: "Tattoo Removal by City: Reviews and Provider Ratings",
    description: "Browse reviews and provider ratings across 6 markets.",
  },
};

export default async function CitiesPage() {
  const sanityCities = await getAllCities();
  const cities = sanityCities.length > 0 ? sanityCities : mockCities;

  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-hero-bg py-14">
        <Container>
          <h1 className="text-[36px] font-bold text-heading">Browse by City</h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
            Compare tattoo removal providers and read verified patient reviews across {cities.length} markets.
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/cities/${city.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition hover:border-accent"
              >
                <h2 className="mb-1 text-[17px] font-semibold text-heading group-hover:text-accent">
                  {city.name}
                </h2>
                <p className="mb-4 flex-1 text-[14px] text-muted">
                  {city.providerCount} providers · {city.reviewCount} reviews
                </p>
                <span className="text-sm font-medium text-accent">Browse providers</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
