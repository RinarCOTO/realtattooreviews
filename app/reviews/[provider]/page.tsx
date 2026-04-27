import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BrandReviewsPage from "@/components/provider/BrandReviewsPage";
import SingleProviderReviewsPage from "@/components/provider/SingleProviderReviewsPage";
import DBOnlyProviderPage from "@/components/provider/DBOnlyProviderPage";
import ProviderReviewPage from "@/components/provider/ProviderReviewPage";
import {
  brandToSlug,
  getMultiLocationBrands,
  getProviderBySlug,
  getProvidersByBrand,
  getSingleLocationProviders,
} from "@/lib/providers";
import { getReviewsByProvider, getUniqueProviderSlugs } from "@/lib/data/reviews";
import { getProviderReview } from "@/lib/page-data/reviews";

type Props = { params: Promise<{ provider: string }> };

export async function generateStaticParams() {
  const mockSlugs = new Set<string>([
    ...getMultiLocationBrands().map(brandToSlug),
    ...getSingleLocationProviders().map((p) => p.slug),
  ]);
  const dbSlugs = await getUniqueProviderSlugs();
  return [...new Set([...mockSlugs, ...dbSlugs])].map((slug) => ({ provider: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { provider: slug } = await params;

  const [sanityReview, reviews] = await Promise.all([
    getProviderReview(slug),
    getReviewsByProvider(slug),
  ]);

  if (sanityReview) {
    const matchedBrand = getMultiLocationBrands().find((b) => brandToSlug(b) === slug);
    const singleProvider = getProviderBySlug(slug);
    const locations = matchedBrand
      ? getProvidersByBrand(matchedBrand)
      : singleProvider
        ? [singleProvider]
        : [];
    const count =
      reviews.length || locations.reduce((s, l) => s + l.reviewCount, 0);
    const title =
      sanityReview.seoTitle ??
      `${sanityReview.providerName} Tattoo Removal Reviews`;
    const description =
      sanityReview.seoDescription ??
      `${count} sourced reviews for ${sanityReview.providerName}. Full breakdown of method, technology, pricing, and what to expect before you book.`;
    return {
      title,
      description,
      alternates: { canonical: `/reviews/${slug}/` },
      openGraph: {
        title,
        description,
        ...(sanityReview.seoImage ? { images: [{ url: sanityReview.seoImage.url, alt: sanityReview.seoImage.alt ?? "" }] } : {}),
      },
    };
  }

  const matchedBrand = getMultiLocationBrands().find((b) => brandToSlug(b) === slug);
  if (matchedBrand) {
    const locations = getProvidersByBrand(matchedBrand);
    const count = reviews.length || locations.reduce((s, l) => s + l.reviewCount, 0);
    const avg =
      reviews.length > 0
        ? (reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length).toFixed(1)
        : (locations.reduce((s, l) => s + l.rating, 0) / locations.length).toFixed(1);
    return {
      title: `${matchedBrand} Tattoo Removal Reviews`,
      description: `${count} sourced reviews across ${locations.length} ${matchedBrand} locations. ${avg} average rating with location-by-location review coverage.`,
      alternates: { canonical: `/reviews/${slug}/` },
      openGraph: {
        title: `${matchedBrand} Reviews`,
        description: `${count} sourced reviews across ${locations.length} locations. ${avg} average rating.`,
      },
    };
  }

  const singleProvider = getProviderBySlug(slug);

  if (!singleProvider) {
    if (reviews.length === 0) return {};
    const name = reviews[0].provider;
    const market = `${reviews[0].city ?? ""}${reviews[0].state ? `, ${reviews[0].state}` : ""}`.trim();
    const avg = (reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length).toFixed(1);
    return {
      title: `${name} Tattoo Removal Reviews`,
      description: `${reviews.length} sourced reviews for ${name}${market ? ` in ${market}` : ""}. ${avg} average rating.`,
      alternates: { canonical: `/reviews/${slug}/` },
    };
  }

  const count = reviews.length || singleProvider.reviewCount;
  const avg =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length).toFixed(1)
      : singleProvider.rating.toFixed(1);

  return {
    title: `${singleProvider.name} Tattoo Removal Reviews`,
    description: `${count} sourced reviews for ${singleProvider.name} in ${singleProvider.market}. ${avg} average rating. ${singleProvider.summary}`,
    alternates: { canonical: `/reviews/${slug}/` },
    openGraph: {
      title: `${singleProvider.name} Tattoo Removal Reviews`,
      description: `${count} sourced reviews for ${singleProvider.name}. ${avg} average rating.`,
    },
  };
}

export default async function ProviderReviewsPage({ params }: Props) {
  const { provider: slug } = await params;

  const [sanityReview, reviews] = await Promise.all([
    getProviderReview(slug),
    getReviewsByProvider(slug),
  ]);

  if (sanityReview) {
    const matchedBrand = getMultiLocationBrands().find((b) => brandToSlug(b) === slug);
    const singleProvider = getProviderBySlug(slug);
    const locations = matchedBrand
      ? getProvidersByBrand(matchedBrand)
      : singleProvider
        ? [singleProvider]
        : [];
    return (
      <ProviderReviewPage
        review={sanityReview}
        locations={locations}
        reviews={reviews}
        slug={slug}
      />
    );
  }

  const matchedBrand = getMultiLocationBrands().find((b) => brandToSlug(b) === slug);
  if (matchedBrand) {
    const locations = getProvidersByBrand(matchedBrand);
    return (
      <BrandReviewsPage
        brand={matchedBrand}
        slug={slug}
        locations={locations}
        reviews={reviews}
      />
    );
  }

  const singleProvider = getProviderBySlug(slug);

  if (!singleProvider) {
    if (reviews.length === 0) notFound();
    return <DBOnlyProviderPage slug={slug} reviews={reviews} />;
  }

  return <SingleProviderReviewsPage provider={singleProvider} reviews={reviews} />;
}
