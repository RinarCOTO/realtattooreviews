import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import {
  getMultiLocationBrands,
  getProvidersByBrand,
  getProviderByBrandAndLocation,
  brandToSlug,
  getLocationSlug,
} from "@/lib/providers";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/seo/schema";

type Props = { params: Promise<{ slug: string; location: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, location } = await params;
  const provider = getProviderByBrandAndLocation(slug, location);
  if (!provider) return {};
  return {
    title: `${provider.brand} ${provider.market} Reviews: ${provider.reviewCount} Patients | RealTattooReviews`,
    description: `${provider.reviewCount} verified patient reviews for ${provider.brand} in ${provider.market}. ${provider.rating} avg rating. ${provider.summary}`,
    openGraph: {
      title: `${provider.brand} ${provider.market} Reviews`,
      description: `${provider.reviewCount} verified reviews · ${provider.rating} avg rating`,
    },
  };
}

export async function generateStaticParams() {
  const brands = getMultiLocationBrands();
  const params: { slug: string; location: string }[] = [];

  for (const brand of brands) {
    const locations = getProvidersByBrand(brand);
    for (const loc of locations) {
      params.push({
        slug: brandToSlug(brand),
        location: getLocationSlug(loc),
      });
    }
  }

  return params;
}

export default async function BrandLocationPage({ params }: Props) {
  const { slug, location } = await params;

  const provider = getProviderByBrandAndLocation(slug, location);
  if (!provider) notFound();

  const brandName = provider.brand!;
  const allLocations = getProvidersByBrand(brandName);

  const ldBusiness = localBusinessSchema(provider);
  const ldBreadcrumb = breadcrumbSchema([
    { name: "Providers", href: "/providers" },
    { name: brandName, href: `/providers/${slug}` },
    { name: provider.market, href: `/providers/${slug}/${location}` },
  ]);

  return (
    <main className="min-h-screen bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBreadcrumb) }}
      />
      {/* Header */}
      <section className="border-b border-border bg-hero-bg py-14">
        <Container>
          {/* Breadcrumb */}
          <p className="mb-2 text-sm text-muted">
            <Link href="/providers" className="hover:text-accent">
              Providers
            </Link>
            {" / "}
            <Link
              href={`/providers/${brandToSlug(brandName)}`}
              className="hover:text-accent"
            >
              {brandName}
            </Link>
            {" / "}
            <span className="text-heading">{provider.market}</span>
          </p>

          <h1 className="text-[36px] font-bold text-heading">
            {brandName}: {provider.market}
          </h1>
          <p className="mt-1 text-[15px] text-muted">
            {provider.reviewCount} reviews · {provider.rating} avg rating · {provider.specialty}
          </p>

          {/* Stats row */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="rounded-xl border border-border bg-bg px-5 py-3 text-center">
              <p className="text-[22px] font-bold text-accent">{provider.rating}</p>
              <p className="text-xs text-muted">Avg rating</p>
            </div>
            <div className="rounded-xl border border-border bg-bg px-5 py-3 text-center">
              <p className="text-[22px] font-bold text-heading">{provider.reviewCount}</p>
              <p className="text-xs text-muted">Reviews</p>
            </div>
            {provider.yearsActive && (
              <div className="rounded-xl border border-border bg-bg px-5 py-3 text-center">
                <p className="text-[22px] font-bold text-heading">{provider.yearsActive}</p>
                <p className="text-xs text-muted">Years active</p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Summary */}
      <section className="py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-3 text-[18px] font-bold text-heading">
                Overview
              </h2>
              <p className="text-[15px] leading-relaxed text-body">
                {provider.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {provider.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Other locations sidebar */}
            <div>
              <h2 className="mb-3 text-[15px] font-bold text-heading">
                Other {brandName} locations
              </h2>
              <div className="flex flex-col gap-2">
                {allLocations
                  .filter((loc) => loc.id !== provider.id)
                  .map((loc) => (
                    <Link
                      key={loc.id}
                      href={`/providers/${brandToSlug(brandName)}/${getLocationSlug(loc)}`}
                      className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-sm transition-colors hover:border-accent/30"
                    >
                      <span className="text-body">{loc.market}</span>
                      <span className="font-semibold text-accent">
                        {loc.rating} ★
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
