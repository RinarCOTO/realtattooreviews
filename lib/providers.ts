import { providers } from "@/lib/mock-data/providers";
import type { Provider } from "@/types/provider";

const BLOCKED_PROVIDER_LOCATION_PAGES = new Set(["inkout/tampa"]);

/** "inkOUT" → "inkout", "Removery" → "removery" */
export function brandToSlug(brand: string): string {
  return brand.toLowerCase().replace(/\s+/g, "-");
}

export function isBlockedProviderLocationPage(brandSlug: string, locationSlug: string): boolean {
  return BLOCKED_PROVIDER_LOCATION_PAGES.has(`${brandSlug}/${locationSlug}`);
}

/** All unique brands that have more than one location */
export function getMultiLocationBrands(): string[] {
  const counts: Record<string, number> = {};
  for (const p of providers) {
    if (p.brand) counts[p.brand] = (counts[p.brand] ?? 0) + 1;
  }
  return Object.entries(counts)
    .filter(([, count]) => count > 1)
    .map(([brand]) => brand);
}

/** All providers belonging to a brand */
export function getProvidersByBrand(brand: string): Provider[] {
  return providers.filter(
    (p) => p.brand?.toLowerCase() === brand.toLowerCase()
  );
}

/**
 * Derive the location slug from a provider slug.
 * "inkout-austin" + brand "inkout" → "austin"
 * "removery-south-congress" + brand "removery" → "south-congress"
 */
export function getLocationSlug(provider: Provider): string {
  if (!provider.brand) return "";
  const prefix = brandToSlug(provider.brand) + "-";
  return provider.slug.startsWith(prefix)
    ? provider.slug.slice(prefix.length)
    : provider.slug;
}

/** Find a brand-location provider by brand slug + location slug */
export function getProviderByBrandAndLocation(
  brandSlug: string,
  locationSlug: string
): Provider | undefined {
  return providers.find(
    (p) =>
      p.brand &&
      brandToSlug(p.brand) === brandSlug &&
      getLocationSlug(p) === locationSlug
  );
}

/** Single-location providers (no brand, or brand with only one location) */
export function getSingleLocationProviders(): Provider[] {
  const multiBrands = getMultiLocationBrands().map((b) => b.toLowerCase());
  return providers.filter(
    (p) => !p.brand || !multiBrands.includes(p.brand.toLowerCase())
  );
}

/** Get a single-location provider by slug */
export function getProviderBySlug(slug: string): Provider | undefined {
  return getSingleLocationProviders().find((p) => p.slug === slug);
}

/** Featured providers sorted by featuredScore desc */
export function getFeaturedProviders(limit = 6): Provider[] {
  return [...providers]
    .filter((p) => p.featured)
    .sort((a, b) => (b.featuredScore ?? 0) - (a.featuredScore ?? 0))
    .slice(0, limit);
}

/**
 * Return the canonical href for a review card CTA.
 *
 * Multi-location brand entry:  /reviews/{brand}/{location}
 *   e.g. provider slug "inkout-austin" with brand "inkOUT" -> /reviews/inkout/austin
 * Single-location or brand hub: /reviews/{providerSlug}
 *   e.g. "medermis-laser-clinic" -> /reviews/medermis-laser-clinic
 *
 * Multi-location provider slugs like "inkout-austin", "removery-bucktown", and
 * "laseraway-houston" do not resolve at /reviews/{slug} because the route tree
 * routes those to /reviews/{brand}/{location}. This helper splits the slug
 * before returning so callers do not need to know the convention.
 *
 * Blocked brand-location pairs (see BLOCKED_PROVIDER_LOCATION_PAGES) fall back
 * to the brand hub URL.
 */
export function resolveProviderHref({
  providerSlug,
}: {
  providerSlug?: string;
}): string {
  if (!providerSlug) return "/reviews";
  const provider = providers.find((p) => p.slug === providerSlug);
  if (provider?.brand) {
    const brandSlug = brandToSlug(provider.brand);
    const locationSlug = getLocationSlug(provider);
    if (brandSlug && locationSlug && locationSlug !== providerSlug) {
      if (isBlockedProviderLocationPage(brandSlug, locationSlug)) {
        return `/reviews/${brandSlug}`;
      }
      return `/reviews/${brandSlug}/${locationSlug}`;
    }
  }
  return `/reviews/${providerSlug}`;
}
