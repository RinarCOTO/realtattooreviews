import { providers } from "@/lib/mock-data/providers";
import type { Provider } from "@/types/provider";

/** "inkOUT" → "inkout", "Tatt2Away" → "tatt2away" */
export function brandToSlug(brand: string): string {
  return brand.toLowerCase().replace(/\s+/g, "-");
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
 * Multi-location:  /providers/{providerSlug}/{locationId}
 * Single-location: /providers/{providerSlug}
 *
 * providerSlug should be the brand-level slug (e.g. "removery", "inkout").
 * locationId should be the location segment (e.g. "bucktown", "austin").
 */
export function resolveProviderHref({
  providerSlug,
  providerType,
  locationId,
}: {
  providerSlug?: string;
  providerType?: "multi-location" | "single-location";
  locationId?: string;
}): string {
  if (!providerSlug) return "/providers";
  if (providerType === "multi-location" && locationId) {
    return `/providers/${providerSlug}/${locationId}`;
  }
  return `/providers/${providerSlug}`;
}
