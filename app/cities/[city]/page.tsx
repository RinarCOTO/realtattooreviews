import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { cities } from "@/lib/mock-data/cities";
import { providers } from "@/lib/mock-data/providers";

type Props = { params: Promise<{ city: string }> };

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);
  if (!city) return {};
  return {
    title: `Tattoo Removal in ${city.name} — Reviews & Provider Ratings | RealTattooReviews`,
    description: `Compare ${city.providerCount} tattoo removal providers in ${city.name}. ${city.reviewCount} verified patient reviews covering outcomes, pricing, and session experience.`,
    openGraph: {
      title: `Tattoo Removal in ${city.name} — Reviews & Provider Ratings`,
      description: `Compare ${city.providerCount} tattoo removal providers in ${city.name}. ${city.reviewCount} verified patient reviews.`,
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);
  if (!city) notFound();

  const cityProviders = providers.filter((p) =>
    p.market.toLowerCase().includes(city.name.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-surface py-14">
        <Container>
          <p className="mb-2 text-sm text-muted">
            <Link href="/cities" className="hover:text-accent">Cities</Link>
            {" / "}
            <span className="text-heading">{city.name}</span>
          </p>
          <h1 className="text-[36px] font-bold text-heading">
            Tattoo Removal in {city.name}
          </h1>
          <p className="mt-2 text-[15px] text-muted">
            {city.providerCount} providers · {city.reviewCount} verified reviews
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          {cityProviders.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cityProviders.map((provider) => (
                <Link
                  key={provider.id}
                  href={`/providers/${provider.slug}`}
                  className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <p className="font-semibold text-heading">{provider.name}</p>
                    <span className="rounded-full bg-accent-light px-2.5 py-1 text-xs font-bold text-accent">
                      {provider.rating}
                    </span>
                  </div>
                  <p className="text-[13px] leading-relaxed text-muted line-clamp-2">
                    {provider.summary}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-divider pt-3">
                    <span className="text-xs text-subtle">{provider.reviewCount} reviews</span>
                    <span className="text-xs font-medium text-accent">View reviews →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted">No providers listed for this city yet.</p>
          )}
        </Container>
      </section>
    </main>
  );
}
