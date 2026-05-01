import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import BlobBackground from "@/components/ui/BlobBackground";
import JumpNav from "@/components/provider/JumpNav";
import BlockHeading from "@/components/provider/BlockHeading";
import { getAllCities, getCity } from "@/lib/page-data/cities";
import { cities as mockCities } from "@/lib/mock-data/cities";
import { providers } from "@/lib/mock-data/providers";
import { getReviewsByCity, getAllProviderAggregates } from "@/lib/data/reviews";
import WhatReviewersSay from "@/components/reviews/WhatReviewersSay";
import type { Review } from "@/types/review";

type Props = { params: Promise<{ city: string }> };

const STATIC_CITY_PAGES = new Set(["austin", "chicago", "houston", "tampa", "draper"]);

export async function generateStaticParams() {
  const sanityCities = await getAllCities();
  const slugs = sanityCities.length > 0 ? sanityCities.map((c) => c.slug) : mockCities.map((c) => c.slug);
  return slugs.filter((slug) => !STATIC_CITY_PAGES.has(slug)).map((slug) => ({ city: slug }));
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
  const description = (cityData as any).seoDescription ?? `Compare ${providerCount} tattoo removal providers in ${cityData.name}. ${reviewCount} sourced reviews covering outcomes, pricing, and session experience.`;
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

  const jumpItems = [
    { label: "Providers", href: "#providers" },
    ...(cityReviews.length > 0 ? [{ label: "Reviews", href: "#reviews" }] : []),
  ];

  return (
    <BlobBackground>
    <main className="min-h-screen">

      {/* Hero */}
      <section className="bg-canvas py-6 px-4 sm:px-6">
        <div className="rounded-3xl pt-18 pb-16" style={{ background: "linear-gradient(135deg, #C8E6E4 0%, #F0EDE8 52%, #F5DDD0 100%)" }}>
          <Container>
            <div className="flex items-center gap-2.5 mb-7 font-sans text-[11px] tracking-[0.14em] uppercase text-(--accent)">
              <span className="inline-block w-6 h-px bg-(--accent) shrink-0" />
              <Link href="/cities" className="hover:opacity-70 transition-opacity">Cities</Link>
              <span className="opacity-40">·</span>
              <span>{city.name}</span>
            </div>
            <h1 className="font-sans font-bold text-[clamp(40px,6vw,72px)] leading-none tracking-[-0.03em] m-0 text-(--ink) max-w-[20ch]">
              Tattoo Removal in {city.name}
            </h1>
            <p className="mt-5 font-sans font-normal text-[17px] leading-[1.55] text-(--muted) max-w-130">
              {providerCount} providers · {reviewCount} verified reviews
            </p>
          </Container>
        </div>
      </section>

      <JumpNav items={jumpItems} />

      {/* Providers */}
      <section id="providers" className="py-22">
        <Container>
          <BlockHeading
            title={`Providers in ${city.name}`}
            body="Compare providers before you book. Ratings are aggregated from public patient reviews."
          />
          {cityProviders.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cityProviders.map((provider) => (
                <Link
                  key={provider.id}
                  href={`/reviews/${provider.slug}`}
                  className="group flex flex-col gap-3 border border-(--line) bg-white p-5 rounded-xl transition-colors hover:border-(--accent)/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-(--ink) text-[15px]">{provider.name}</p>
                    <span className="font-sans font-semibold text-[13px] text-(--accent) shrink-0">
                      {(liveAggregates[provider.slug]?.rating ?? provider.rating).toFixed(1)}
                    </span>
                  </div>
                  <p className="text-[13px] leading-relaxed text-(--muted) line-clamp-2">{provider.summary}</p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <span className="text-[12px] text-(--muted)">{liveAggregates[provider.slug]?.reviewCount ?? provider.reviewCount} reviews</span>
                    <span className="text-[12px] font-medium text-(--accent) transition-transform group-hover:translate-x-0.5">View reviews →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-(--muted)">No providers listed for this city yet.</p>
          )}
        </Container>
      </section>

      {/* Reviews */}
      {cityReviews.length > 0 && (
        <section id="reviews" className="py-22">
          <Container>
            <BlockHeading
              title={`Patient Reviews in ${city.name}`}
              body="Public reviews grouped by provider. Negative-first ordering surfaces the most decision-relevant signals at the top."
            />
            {(() => {
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
                  {groups.map((group) => (
                    <div key={group.slug ?? group.name}>
                      <div className="mb-5 flex items-baseline gap-3">
                        {group.slug ? (
                          <Link
                            href={`/reviews/${group.slug}`}
                            className="text-[17px] font-semibold text-(--ink) hover:text-(--accent)"
                          >
                            {group.name}
                          </Link>
                        ) : (
                          <span className="text-[17px] font-semibold text-(--ink)">{group.name}</span>
                        )}
                        <span className="text-[13px] text-(--muted)">{group.reviews.length} reviews</span>
                      </div>
                      <WhatReviewersSay
                        reviews={group.reviews}
                        providerName={group.name}
                        initialShow={5}
                      />
                    </div>
                  ))}
                </div>
              );
            })()}
          </Container>
        </section>
      )}

    </main>
    </BlobBackground>
  );
}
