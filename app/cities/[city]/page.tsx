import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import PageHero from "@/components/layout/PageHero";
import { getAllCities, getCity } from "@/lib/page-data/cities";
import { cities as mockCities } from "@/lib/mock-data/cities";
import { providers } from "@/lib/mock-data/providers";
import { getReviewsByCity, getAllProviderAggregates } from "@/lib/data/reviews";
import WhatReviewersSay from "@/components/reviews/WhatReviewersSay";
import type { Review } from "@/types/review";

type Props = { params: Promise<{ city: string }> };

export async function generateStaticParams() {
  const sanityCities = await getAllCities();
  if (sanityCities.length > 0) return sanityCities.map((c) => ({ city: c.slug }));
  return mockCities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const [city, cityReviews] = await Promise.all([
    getCity(citySlug),
    getReviewsByCity(citySlug),
  ]);
  const cityData = city ?? mockCities.find((c) => c.slug === citySlug);
  if (!cityData) return {};
  const cityProviders = providers.filter((p) =>
    p.market.toLowerCase().includes(cityData.name.toLowerCase())
  );
  const providerCount = cityProviders.length;
  const reviewCount = cityReviews.length;
  const title = (cityData as any).seoTitle ?? `Tattoo Removal in ${cityData.name}: Reviews & Provider Ratings | RealTattooReviews`;
  const description = (cityData as any).seoDescription ?? `Compare ${providerCount} tattoo removal providers in ${cityData.name}. ${reviewCount} verified patient reviews covering outcomes, pricing, and session experience.`;
  const seoImage = (cityData as any).seoImage;
  return {
    title,
    description,
    openGraph: {
      title: `Tattoo Removal in ${cityData.name}: Reviews & Provider Ratings`,
      description,
      ...(seoImage ? { images: [{ url: seoImage.url, alt: seoImage.alt }] } : {}),
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = (await getCity(citySlug)) ?? mockCities.find((c) => c.slug === citySlug);
  if (!city) notFound();

  const cityProviders = providers.filter((p) =>
    p.market.toLowerCase().includes(city.name.toLowerCase())
  );

  const [cityReviews, liveAggregates] = await Promise.all([
    getReviewsByCity(citySlug),
    getAllProviderAggregates(),
  ]);
  const providerCount = cityProviders.length;
  const reviewCount = cityReviews.length;

  return (
    <main className="min-h-screen bg-bg">
      <PageHero
        label={
          <>
            <Link href="/cities" className="hover:text-(--ink) transition-colors">
              Cities
            </Link>
            <span className="text-(--muted) font-normal normal-case tracking-normal">/</span>
            <span className="text-(--muted) font-normal normal-case tracking-normal">
              {city.name}
            </span>
          </>
        }
        title={<>Tattoo Removal in <span className="text-(--accent)">{city.name}</span></>}
        subtitle={`${providerCount} providers · ${reviewCount} verified reviews`}
      />

      <section className="py-12">
        <Container>
          {cityProviders.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cityProviders.map((provider) => (
                <Link
                  key={provider.id}
                  href={`/reviews/${provider.slug}`}
                  className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <p className="font-semibold text-heading">{provider.name}</p>
                    <span className="rounded-full bg-accent-light px-2.5 py-1 text-xs font-bold text-accent">
                      {(liveAggregates[provider.slug]?.rating ?? provider.rating).toFixed(1)}
                    </span>
                  </div>
                  <p className="text-[13px] leading-relaxed text-muted line-clamp-2">
                    {provider.summary}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-divider pt-3">
                    <span className="text-xs text-subtle">{liveAggregates[provider.slug]?.reviewCount ?? provider.reviewCount} reviews</span>
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

      {cityReviews.length > 0 && (
        <section className="border-t border-border py-12">
          <Container>
            <h2 className="mb-8 text-[20px] font-bold text-heading">
              Patient Reviews in {city.name}
            </h2>
            {(() => {
              // Group reviews by provider, sorted by review count descending
              const groups = Object.values(
                cityReviews.reduce<Record<string, { name: string; slug: string | null; reviews: Review[] }>>(
                  (acc, r) => {
                    const key = r.providerSlug ?? r.provider;
                    if (!acc[key]) acc[key] = { name: r.provider, slug: r.providerSlug ?? null, reviews: [] };
                    acc[key].reviews.push(r);
                    return acc;
                  },
                  {}
                )
              ).sort((a, b) => b.reviews.length - a.reviews.length);

              return (
                <div className="flex flex-col gap-12">
                  {groups.map((group) => {
                    return (
                      <div key={group.slug ?? group.name}>
                        <div className="mb-5 flex items-baseline gap-3">
                          {group.slug ? (
                            <Link
                              href={`/reviews/${group.slug}`}
                              className="text-[17px] font-semibold text-heading hover:text-accent"
                            >
                              {group.name}
                            </Link>
                          ) : (
                            <span className="text-[17px] font-semibold text-heading">{group.name}</span>
                          )}
                          <span className="text-[13px] text-muted">{group.reviews.length} reviews</span>
                        </div>
                        <WhatReviewersSay
                          reviews={group.reviews}
                          providerName={group.name}
                          initialShow={5}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </Container>
        </section>
      )}
    </main>
  );
}
