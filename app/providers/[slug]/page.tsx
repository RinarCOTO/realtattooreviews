import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import {
  getMultiLocationBrands,
  getProvidersByBrand,
  getProviderBySlug,
  brandToSlug,
  getLocationSlug,
} from "@/lib/providers";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const brands = getMultiLocationBrands();
  const matchedBrand = brands.find((b) => brandToSlug(b) === slug);

  if (matchedBrand) {
    const locations = getProvidersByBrand(matchedBrand);
    const totalReviews = locations.reduce((s, p) => s + p.reviewCount, 0);
    const avgRating = (locations.reduce((s, p) => s + p.rating, 0) / locations.length).toFixed(1);
    return {
      title: `${matchedBrand} Reviews — ${locations.length} Locations, ${totalReviews} Patients`,
      description: `Compare all ${matchedBrand} locations. ${totalReviews} verified patient reviews across ${locations.length} markets. ${avgRating} avg rating.`,
      openGraph: {
        title: `${matchedBrand} Reviews — ${locations.length} Locations`,
        description: `${totalReviews} verified reviews · ${avgRating} avg rating across all locations.`,
      },
    };
  }

  const provider = getProviderBySlug(slug);
  if (!provider) return {};
  return {
    title: `${provider.name} Reviews — ${provider.market}`,
    description: `${provider.reviewCount} verified patient reviews for ${provider.name} in ${provider.market}. ${provider.rating} avg rating. ${provider.summary}`,
    openGraph: {
      title: `${provider.name} Reviews — ${provider.market}`,
      description: `${provider.reviewCount} verified reviews · ${provider.rating} avg rating.`,
    },
  };
}

export async function generateStaticParams() {
  const brands = getMultiLocationBrands();
  const brandParams = brands.map((b) => ({ slug: brandToSlug(b) }));

  const { getSingleLocationProviders } = await import("@/lib/providers");
  const singleParams = getSingleLocationProviders().map((p) => ({
    slug: p.slug,
  }));

  return [...brandParams, ...singleParams];
}

export default async function ProviderPage({ params }: Props) {
  const { slug } = await params;

  // Check if this is a brand hub
  const brands = getMultiLocationBrands();
  const matchedBrand = brands.find((b) => brandToSlug(b) === slug);

  if (matchedBrand) {
    const locations = getProvidersByBrand(matchedBrand);
    return <BrandHubPage brand={matchedBrand} locations={locations} />;
  }

  // Single-location provider
  const provider = getProviderBySlug(slug);
  if (!provider) notFound();

  return <SingleProviderPage provider={provider} />;
}

// ── Brand hub ────────────────────────────────────────────────────────────────

function BrandHubPage({
  brand,
  locations,
}: {
  brand: string;
  locations: ReturnType<typeof getProvidersByBrand>;
}) {
  const avgRating = (
    locations.reduce((sum, p) => sum + p.rating, 0) / locations.length
  ).toFixed(1);
  const totalReviews = locations.reduce((sum, p) => sum + p.reviewCount, 0);

  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-surface py-14">
        <Container>
          <p className="mb-2 text-sm text-muted">
            <Link href="/providers" className="hover:text-accent">Providers</Link>
            {" / "}
            <span className="text-heading">{brand}</span>
          </p>
          <h1 className="text-[36px] font-bold text-heading">{brand}</h1>
          <p className="mt-2 text-[15px] text-muted">
            {locations.length} locations · {totalReviews} reviews · {avgRating} avg rating
          </p>
          <p className="mt-1 text-xs text-subtle">
            {locations[0]?.specialty}
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <h2 className="mb-6 text-[20px] font-bold text-heading">
            Locations
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((loc) => {
              const locationSlug = getLocationSlug(loc);
              return (
                <Link
                  key={loc.id}
                  href={`/providers/${brandToSlug(brand)}/${locationSlug}`}
                  className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-heading">{loc.market}</p>
                      <p className="mt-0.5 text-xs text-muted">{loc.location}</p>
                    </div>
                    <span className="rounded-full bg-accent-light px-2.5 py-1 text-xs font-bold text-accent">
                      {loc.rating}
                    </span>
                  </div>
                  <p className="text-[13px] leading-relaxed text-muted line-clamp-2">
                    {loc.summary}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-divider pt-3">
                    <span className="text-xs text-subtle">
                      {loc.reviewCount} reviews
                    </span>
                    <span className="text-xs font-medium text-accent transition-transform group-hover:translate-x-0.5">
                      View reviews →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}

// ── Single provider ───────────────────────────────────────────────────────────

import type { Provider } from "@/types/provider";

function SingleProviderPage({ provider }: { provider: Provider }) {
  return (
    <main className="min-h-screen bg-bg">
      <section className="border-b border-border bg-surface py-14">
        <Container>
          <p className="mb-2 text-sm text-muted">
            <Link href="/providers" className="hover:text-accent">Providers</Link>
            {" / "}
            <span className="text-heading">{provider.name}</span>
          </p>
          <h1 className="text-[36px] font-bold text-heading">{provider.name}</h1>
          <p className="mt-1 text-[15px] text-muted">
            {provider.market} · {provider.reviewCount} reviews · {provider.rating} rating
          </p>
          <p className="mt-1 text-xs text-subtle">{provider.specialty}</p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <p className="max-w-2xl text-[15px] leading-relaxed text-body">
            {provider.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {provider.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
