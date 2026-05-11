import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SingleProviderReviewsPage from "@/components/provider/SingleProviderReviewsPage";
import {
  brandToSlug,
  getMultiLocationBrands,
  getProviderByBrandAndLocation,
  getProvidersByBrand,
  getLocationSlug,
  isBlockedProviderLocationPage,
} from "@/lib/providers";
import { getReviewsByProviderLocation } from "@/lib/data/reviews";

type Props = { params: Promise<{ provider: string; location: string }> };

/**
 * Per-location pages for multi-location brands.
 *
 * URL: /reviews/{brandSlug}/{locationSlug}/
 *      e.g. /reviews/removery/lincoln-square/
 *           /reviews/inkout/austin/
 *           /reviews/laseraway/houston/
 *
 * Emits params for every multi-location brand we sanction for per-location
 * coverage. inkOUT and Removery use the dynamic LocationsSection on their
 * brand hub. LaserAway has a bespoke static brand hub at /reviews/laseraway/
 * that lists tracked cities; its per-location pages are still served here.
 */
export async function generateStaticParams() {
  const targetBrands = ["inkOUT", "Removery", "LaserAway"];
  const candidates = getMultiLocationBrands()
    .filter((brand) => targetBrands.includes(brand))
    .flatMap((brand) => {
      const brandSlug = brandToSlug(brand);
      return getProvidersByBrand(brand).map((p) => ({
        provider: brandSlug,
        location: getLocationSlug(p),
      }));
    });

  const params: Array<{ provider: string; location: string }> = [];
  for (const candidate of candidates) {
    if (isBlockedProviderLocationPage(candidate.provider, candidate.location)) continue;
    const reviews = await getReviewsByProviderLocation(candidate.provider, candidate.location);
    if (reviews.length > 0) params.push(candidate);
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { provider: brandSlug, location: locationSlug } = await params;
  if (isBlockedProviderLocationPage(brandSlug, locationSlug)) return {};
  const provider = getProviderByBrandAndLocation(brandSlug, locationSlug);
  if (!provider) return {};

  const reviews = await getReviewsByProviderLocation(brandSlug, locationSlug);
  if (reviews.length === 0) return {};
  const count = reviews.length || provider.reviewCount;
  const avg =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length).toFixed(1)
      : provider.rating.toFixed(1);

  const title = `${provider.name} ${provider.market} Tattoo Removal Reviews`;
  const description = `${count} sourced reviews for ${provider.name} in ${provider.market}. ${avg} average rating. Public review feedback on pricing, technology, and treatment outcomes.`;

  return {
    title,
    description,
    alternates: { canonical: `https://realtattooreviews.com/reviews/${brandSlug}/${locationSlug}/` },
    openGraph: { title, description },
  };
}

export default async function ProviderLocationPage({ params }: Props) {
  const { provider: brandSlug, location: locationSlug } = await params;
  if (isBlockedProviderLocationPage(brandSlug, locationSlug)) notFound();
  const provider = getProviderByBrandAndLocation(brandSlug, locationSlug);
  if (!provider) notFound();

  const reviews = await getReviewsByProviderLocation(brandSlug, locationSlug);
  if (reviews.length === 0) notFound();
  const city = provider.market.split(",")[0].trim();
  const canonicalPath = `/reviews/${brandSlug}/${locationSlug}/`;

  return (
    <SingleProviderReviewsPage
      provider={provider}
      reviews={reviews}
      canonicalPath={canonicalPath}
      breadcrumb={["Reviews", provider.brand ?? provider.name, city]}
    />
  );
}
