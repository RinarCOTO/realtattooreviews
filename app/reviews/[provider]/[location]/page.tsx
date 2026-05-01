import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SingleProviderReviewsPage from "@/components/provider/SingleProviderReviewsPage";
import {
  brandToSlug,
  getMultiLocationBrands,
  getProviderByBrandAndLocation,
  getProvidersByBrand,
  getLocationSlug,
} from "@/lib/providers";
import { getReviewsByProviderLocation } from "@/lib/data/reviews";

type Props = { params: Promise<{ provider: string; location: string }> };

/**
 * Per-location pages for multi-location brands.
 *
 * URL: /reviews/{brandSlug}/{locationSlug}/
 *      e.g. /reviews/removery/lincoln-square/
 *           /reviews/inkout/austin/
 *
 * Only emits params for brands that go through BrandReviewsPage and use
 * LocationsSection (currently inkOUT and Removery). LaserAway has its own
 * bespoke top-level page that does not link out per location, so its
 * locations are intentionally not built here.
 */
export async function generateStaticParams() {
  const targetBrands = ["inkOUT", "Removery"];
  return getMultiLocationBrands()
    .filter((brand) => targetBrands.includes(brand))
    .flatMap((brand) => {
      const brandSlug = brandToSlug(brand);
      return getProvidersByBrand(brand).map((p) => ({
        provider: brandSlug,
        location: getLocationSlug(p),
      }));
    });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { provider: brandSlug, location: locationSlug } = await params;
  const provider = getProviderByBrandAndLocation(brandSlug, locationSlug);
  if (!provider) return {};

  const reviews = await getReviewsByProviderLocation(brandSlug, locationSlug);
  const count = reviews.length || provider.reviewCount;
  const avg =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length).toFixed(1)
      : provider.rating.toFixed(1);

  const title = `${provider.name} ${provider.market} Tattoo Removal Reviews`;
  const description = `${count} sourced reviews for ${provider.name} in ${provider.market}. ${avg} average rating. Patient feedback on pricing, technology, and treatment outcomes.`;

  return {
    title,
    description,
    alternates: { canonical: `/reviews/${brandSlug}/${locationSlug}/` },
    openGraph: { title, description },
  };
}

export default async function ProviderLocationPage({ params }: Props) {
  const { provider: brandSlug, location: locationSlug } = await params;
  const provider = getProviderByBrandAndLocation(brandSlug, locationSlug);
  if (!provider) notFound();

  const reviews = await getReviewsByProviderLocation(brandSlug, locationSlug);
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
