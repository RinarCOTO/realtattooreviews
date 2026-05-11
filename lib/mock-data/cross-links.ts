/**
 * Cross-cluster link mapping for the RTR site.
 *
 * The four content silos (categories, guides, comparisons, providers) are
 * intra-linked but were barely inter-linked before this file existed. The
 * matrix audit on 2026-05-10 showed: guide -> category = 0 links, provider
 * -> category = 1, provider -> guide = 1, category -> city = 0. Four
 * comparisons had only 1 inbound link each.
 *
 * This table maps every entity slug to 3 to 5 cross-cluster relations.
 * The shared `<RelatedSection bundle={getCrossLinks(slug)} />` component
 * in `components/cross-links/RelatedSection.tsx` reads these bundles at
 * render time on provider review pages, guide pages, category pages,
 * comparison pages, and city pages.
 *
 * Each entry expresses an editorial judgment about which other pages a
 * reader on this page is most likely to want next. The relationships do
 * not need to be symmetric; sometimes A -> B is interesting but B -> A is
 * not.
 *
 * Maintenance:
 * - Adding a new provider, category, guide, comparison, or city: add the
 *   slug as a key here with a sensible bundle.
 * - Renaming a slug: update both the key here and any string references
 *   in other bundles.
 * - Removing a page: drop the key and remove any references from other
 *   bundles.
 */

import { providers as mockProviders } from "@/lib/mock-data/providers";
import { brandToSlug } from "@/lib/providers";

export type CrossLink = {
  href: string;
  title: string;
  desc: string;
  cluster: "category" | "guide" | "comparison" | "provider" | "city";
};

export type CrossLinkBundle = {
  categories?: CrossLink[];
  guides?: CrossLink[];
  comparisons?: CrossLink[];
  providers?: CrossLink[];
  cities?: CrossLink[];
};

// ── Reusable link definitions ───────────────────────────────────────────────
// Defined once and referenced by slug across bundles so the descriptions stay
// consistent everywhere the same target page is linked.

const CATEGORY: Record<string, CrossLink> = {
  "color-ink-removal": {
    cluster: "category",
    href: "/categories/color-ink-removal",
    title: "Color Ink Removal",
    desc: "Color removal evidence: which wavelengths help, what stalls.",
  },
  "complete-removal": {
    cluster: "category",
    href: "/categories/complete-removal",
    title: "Complete Removal",
    desc: "Full clearance pathway across multiple sessions.",
  },
  "cover-up-prep": {
    cluster: "category",
    href: "/categories/cover-up-prep",
    title: "Cover-Up Prep",
    desc: "Fading sessions before a cover-up tattoo: how many, how cleanly.",
  },
  "dark-skin-tattoo-removal": {
    cluster: "category",
    href: "/categories/dark-skin-tattoo-removal",
    title: "Tattoo Removal on Dark Skin",
    desc: "Wavelength and pigment-change considerations by Fitzpatrick type.",
  },
  "microblading-removal": {
    cluster: "category",
    href: "/categories/microblading-removal",
    title: "Microblading Removal",
    desc: "Cosmetic ink: when laser fits, when saline or non-laser fits better.",
  },
  "permanent-makeup-removal": {
    cluster: "category",
    href: "/categories/permanent-makeup-removal",
    title: "Permanent Makeup Removal",
    desc: "Pigments like iron oxide and titanium dioxide need careful method choice.",
  },
  "scarring-concerns": {
    cluster: "category",
    href: "/categories/scarring-concerns",
    title: "Scarring Concerns",
    desc: "How scarring rates vary by method, provider, and aftercare.",
  },
};

const GUIDE: Record<string, CrossLink> = {
  "laser-tattoo-removal": {
    cluster: "guide",
    href: "/guides/laser-tattoo-removal",
    title: "Laser Tattoo Removal",
    desc: "How picosecond and Q-switched lasers actually work.",
  },
  "non-laser-tattoo-removal": {
    cluster: "guide",
    href: "/guides/non-laser-tattoo-removal",
    title: "Non-Laser Tattoo Removal",
    desc: "Method category: saline, chemical extraction, dermabrasion-based.",
  },
  "saline-tattoo-removal": {
    cluster: "guide",
    href: "/guides/saline-tattoo-removal",
    title: "Saline Tattoo Removal",
    desc: "Outcomes, healing, and when saline fits cosmetic ink cases.",
  },
  "tattoo-removal-aftercare": {
    cluster: "guide",
    href: "/guides/tattoo-removal-aftercare",
    title: "Tattoo Removal Aftercare",
    desc: "Wound care between sessions: sun, cleansing, what to avoid.",
  },
  "tattoo-removal-healing-process": {
    cluster: "guide",
    href: "/guides/tattoo-removal-healing-process",
    title: "Healing Process Timeline",
    desc: "What to expect day by day: blistering, scabbing, peeling, fading.",
  },
  "tattoo-removal-scarring": {
    cluster: "guide",
    href: "/guides/tattoo-removal-scarring",
    title: "Tattoo Removal Scarring",
    desc: "Why scarring happens, how to evaluate a provider's track record.",
  },
  "tattoo-removal-side-effects": {
    cluster: "guide",
    href: "/guides/tattoo-removal-side-effects",
    title: "Tattoo Removal Side Effects",
    desc: "Pigment change, infection risk, blistering: what is normal.",
  },
};

const COMPARISON: Record<string, CrossLink> = {
  "best-tattoo-removal-method": {
    cluster: "comparison",
    href: "/comparisons/best-tattoo-removal-method",
    title: "Best Tattoo Removal Method",
    desc: "Method landscape: laser, non-laser, saline compared.",
  },
  "picoway-vs-q-switch": {
    cluster: "comparison",
    href: "/comparisons/picoway-vs-q-switch",
    title: "PicoWay vs Q-Switched",
    desc: "Picosecond vs nanosecond pulse width and clearance evidence.",
  },
  "saline-vs-laser-tattoo-removal": {
    cluster: "comparison",
    href: "/comparisons/saline-vs-laser-tattoo-removal",
    title: "Saline vs Laser",
    desc: "Two mechanisms compared on color, scarring risk, and use cases.",
  },
  "inkout-vs-laseraway": {
    cluster: "comparison",
    href: "/comparisons/inkout-vs-laseraway",
    title: "inkOUT vs LaserAway",
    desc: "Non-laser specialist vs national laser chain on price and method.",
  },
  "inkout-vs-removery": {
    cluster: "comparison",
    href: "/comparisons/inkout-vs-removery",
    title: "inkOUT vs Removery",
    desc: "Non-laser TEPR vs PicoWay across cities.",
  },
  "removery-vs-laseraway": {
    cluster: "comparison",
    href: "/comparisons/removery-vs-laseraway",
    title: "Removery vs LaserAway",
    desc: "Two national laser chains compared on technology and pricing.",
  },
  "removery-vs-medermis-laser-clinic": {
    cluster: "comparison",
    href: "/comparisons/removery-vs-medermis-laser-clinic",
    title: "Removery vs MEDermis",
    desc: "National chain vs Austin specialist.",
  },
  "laseraway-vs-medermis-laser-clinic": {
    cluster: "comparison",
    href: "/comparisons/laseraway-vs-medermis-laser-clinic",
    title: "LaserAway vs MEDermis",
    desc: "Chain vs specialist in Austin and San Antonio.",
  },
  "removery-vs-inkfree-md": {
    cluster: "comparison",
    href: "/comparisons/removery-vs-inkfree-md",
    title: "Removery vs Inkfree, MD",
    desc: "National chain vs Houston physician-owned clinic.",
  },
  "removery-vs-kovak-cosmetic-center": {
    cluster: "comparison",
    href: "/comparisons/removery-vs-kovak-cosmetic-center",
    title: "Removery vs Kovak Cosmetic Center",
    desc: "Chain vs Chicago cosmetic practice.",
  },
};

const CITY: Record<string, CrossLink> = {
  austin: {
    cluster: "city",
    href: "/cities/austin",
    title: "Tattoo Removal in Austin",
    desc: "Provider landscape across the Austin metro.",
  },
  chicago: {
    cluster: "city",
    href: "/cities/chicago",
    title: "Tattoo Removal in Chicago",
    desc: "Tracked providers across the Chicago metro.",
  },
  houston: {
    cluster: "city",
    href: "/cities/houston",
    title: "Tattoo Removal in Houston",
    desc: "Largest tracked market: chains, specialists, dermatology practices.",
  },
  tampa: {
    cluster: "city",
    href: "/cities/tampa",
    title: "Tattoo Removal in Tampa",
    desc: "Tampa Bay metro providers compared.",
  },
  draper: {
    cluster: "city",
    href: "/cities/draper",
    title: "Tattoo Removal in Draper",
    desc: "South Salt Lake Valley provider coverage.",
  },
  "pleasant-grove": {
    cluster: "city",
    href: "/cities/pleasant-grove",
    title: "Tattoo Removal in Pleasant Grove",
    desc: "Utah County provider coverage.",
  },
};

const PROVIDER_BRAND: Record<string, CrossLink> = {
  inkout: {
    cluster: "provider",
    href: "/reviews/inkout",
    title: "inkOUT",
    desc: "Non-laser specialist across five markets.",
  },
  removery: {
    cluster: "provider",
    href: "/reviews/removery",
    title: "Removery",
    desc: "Largest US laser-removal chain by footprint.",
  },
  laseraway: {
    cluster: "provider",
    href: "/reviews/laseraway",
    title: "LaserAway",
    desc: "National laser-removal chain with PicoSure platform.",
  },
  "medermis-laser-clinic": {
    cluster: "provider",
    href: "/reviews/medermis-laser-clinic",
    title: "MEDermis Laser Clinic",
    desc: "Tattoo-removal-only specialist in Austin and San Antonio.",
  },
  "clarity-skin": {
    cluster: "provider",
    href: "/reviews/clarity-skin",
    title: "Clarity Skin",
    desc: "Plastic-surgeon-led practice in Draper.",
  },
  "inkfree-md": {
    cluster: "provider",
    href: "/reviews/inkfree-md",
    title: "Inkfree, MD",
    desc: "Physician-owned independent clinic in Houston.",
  },
  "kovak-cosmetic-center": {
    cluster: "provider",
    href: "/reviews/kovak-cosmetic-center",
    title: "Kovak Cosmetic Center",
    desc: "Established cosmetic practice near Chicago.",
  },
};

// ── Bundle table ────────────────────────────────────────────────────────────

export const crossLinksByEntity: Record<string, CrossLinkBundle> = {
  // ── Providers (brands) ────────────────────────────────────────────────────
  inkout: {
    categories: [
      CATEGORY["cover-up-prep"],
      CATEGORY["scarring-concerns"],
      CATEGORY["microblading-removal"],
      CATEGORY["permanent-makeup-removal"],
    ],
    guides: [GUIDE["non-laser-tattoo-removal"], GUIDE["saline-tattoo-removal"]],
    comparisons: [COMPARISON["inkout-vs-laseraway"], COMPARISON["inkout-vs-removery"]],
  },
  removery: {
    categories: [
      CATEGORY["complete-removal"],
      CATEGORY["color-ink-removal"],
      CATEGORY["dark-skin-tattoo-removal"],
    ],
    guides: [GUIDE["laser-tattoo-removal"], GUIDE["tattoo-removal-aftercare"]],
    comparisons: [
      COMPARISON["removery-vs-laseraway"],
      COMPARISON["removery-vs-medermis-laser-clinic"],
      COMPARISON["removery-vs-inkfree-md"],
      COMPARISON["removery-vs-kovak-cosmetic-center"],
    ],
  },
  laseraway: {
    categories: [
      CATEGORY["complete-removal"],
      CATEGORY["color-ink-removal"],
    ],
    guides: [GUIDE["laser-tattoo-removal"], GUIDE["tattoo-removal-side-effects"]],
    comparisons: [
      COMPARISON["inkout-vs-laseraway"],
      COMPARISON["removery-vs-laseraway"],
      COMPARISON["laseraway-vs-medermis-laser-clinic"],
    ],
  },
  // Single-location providers
  "medermis-laser-clinic": {
    categories: [CATEGORY["complete-removal"], CATEGORY["color-ink-removal"]],
    guides: [GUIDE["laser-tattoo-removal"]],
    comparisons: [
      COMPARISON["removery-vs-medermis-laser-clinic"],
      COMPARISON["laseraway-vs-medermis-laser-clinic"],
    ],
    cities: [CITY.austin],
  },
  "clarity-skin": {
    categories: [CATEGORY["complete-removal"], CATEGORY["color-ink-removal"]],
    guides: [GUIDE["laser-tattoo-removal"]],
    comparisons: [COMPARISON["best-tattoo-removal-method"]],
    cities: [CITY.draper],
  },
  "clean-slate-ink": {
    categories: [CATEGORY["complete-removal"], CATEGORY["color-ink-removal"]],
    guides: [GUIDE["laser-tattoo-removal"]],
    comparisons: [COMPARISON["best-tattoo-removal-method"]],
    cities: [CITY.austin],
  },
  "dermsurgery-associates": {
    categories: [CATEGORY["complete-removal"], CATEGORY["scarring-concerns"]],
    guides: [GUIDE["laser-tattoo-removal"], GUIDE["tattoo-removal-scarring"]],
    comparisons: [COMPARISON["picoway-vs-q-switch"]],
    cities: [CITY.houston],
  },
  "dermaluxe-spa": {
    categories: [
      CATEGORY["microblading-removal"],
      CATEGORY["permanent-makeup-removal"],
      CATEGORY["color-ink-removal"],
    ],
    guides: [GUIDE["saline-tattoo-removal"], GUIDE["laser-tattoo-removal"]],
    comparisons: [COMPARISON["saline-vs-laser-tattoo-removal"]],
    cities: [CITY.houston],
  },
  "enfuse-medical-spa": {
    categories: [CATEGORY["complete-removal"], CATEGORY["dark-skin-tattoo-removal"]],
    guides: [GUIDE["laser-tattoo-removal"]],
    comparisons: [COMPARISON["best-tattoo-removal-method"]],
    cities: [CITY.chicago],
  },
  "erasable-med-spa": {
    categories: [CATEGORY["complete-removal"]],
    guides: [GUIDE["laser-tattoo-removal"]],
    comparisons: [COMPARISON["best-tattoo-removal-method"]],
    cities: [CITY.tampa],
  },
  "inkfree-md": {
    categories: [CATEGORY["complete-removal"], CATEGORY["color-ink-removal"]],
    guides: [GUIDE["laser-tattoo-removal"]],
    comparisons: [COMPARISON["removery-vs-inkfree-md"]],
    cities: [CITY.houston],
  },
  "inklifters-aesthetica": {
    categories: [CATEGORY["complete-removal"]],
    guides: [GUIDE["laser-tattoo-removal"]],
    comparisons: [COMPARISON["picoway-vs-q-switch"]],
    cities: [CITY["pleasant-grove"]],
  },
  "kovak-cosmetic-center": {
    categories: [CATEGORY["complete-removal"]],
    guides: [GUIDE["laser-tattoo-removal"]],
    comparisons: [COMPARISON["removery-vs-kovak-cosmetic-center"]],
    cities: [CITY.chicago],
  },
  "arviv-medical-aesthetics": {
    categories: [CATEGORY["complete-removal"]],
    guides: [GUIDE["laser-tattoo-removal"]],
    comparisons: [COMPARISON["picoway-vs-q-switch"]],
    cities: [CITY.tampa],
  },
  "think-again-tattoo-removal": {
    categories: [CATEGORY["complete-removal"]],
    guides: [GUIDE["laser-tattoo-removal"]],
    comparisons: [COMPARISON["best-tattoo-removal-method"]],
  },
  "unbranded-atx": {
    categories: [CATEGORY["complete-removal"]],
    guides: [GUIDE["laser-tattoo-removal"]],
    comparisons: [COMPARISON["best-tattoo-removal-method"]],
    cities: [CITY.austin],
  },
  eraditatt: {
    categories: [CATEGORY["complete-removal"]],
    guides: [GUIDE["laser-tattoo-removal"]],
    comparisons: [COMPARISON["best-tattoo-removal-method"]],
    cities: [CITY.tampa],
  },
  reversatatt: {
    categories: [CATEGORY["complete-removal"]],
    guides: [GUIDE["laser-tattoo-removal"]],
    comparisons: [COMPARISON["best-tattoo-removal-method"]],
    cities: [CITY.tampa],
  },
  "rethink-laser": {
    categories: [CATEGORY["complete-removal"]],
    guides: [GUIDE["laser-tattoo-removal"]],
    comparisons: [COMPARISON["best-tattoo-removal-method"]],
    cities: [CITY.houston],
  },
  "houston-tattoo-removal-clinic": {
    categories: [CATEGORY["complete-removal"]],
    guides: [GUIDE["laser-tattoo-removal"]],
    comparisons: [COMPARISON["best-tattoo-removal-method"]],
    cities: [CITY.houston],
  },
  skintellect: {
    categories: [CATEGORY["complete-removal"]],
    guides: [GUIDE["laser-tattoo-removal"]],
    comparisons: [COMPARISON["best-tattoo-removal-method"]],
  },

  // ── Categories ────────────────────────────────────────────────────────────
  "color-ink-removal": {
    guides: [GUIDE["laser-tattoo-removal"], GUIDE["tattoo-removal-side-effects"]],
    comparisons: [
      COMPARISON["picoway-vs-q-switch"],
      COMPARISON["best-tattoo-removal-method"],
    ],
    providers: [PROVIDER_BRAND.removery, PROVIDER_BRAND["medermis-laser-clinic"]],
    cities: [CITY.austin, CITY.houston],
  },
  "complete-removal": {
    guides: [GUIDE["laser-tattoo-removal"], GUIDE["non-laser-tattoo-removal"]],
    comparisons: [
      COMPARISON["inkout-vs-removery"],
      COMPARISON["best-tattoo-removal-method"],
    ],
    providers: [PROVIDER_BRAND.inkout, PROVIDER_BRAND.removery],
    cities: [CITY.austin, CITY.houston, CITY.tampa],
  },
  "cover-up-prep": {
    guides: [GUIDE["laser-tattoo-removal"], GUIDE["tattoo-removal-healing-process"]],
    comparisons: [COMPARISON["best-tattoo-removal-method"]],
    providers: [PROVIDER_BRAND.inkout, PROVIDER_BRAND.removery],
  },
  "dark-skin-tattoo-removal": {
    guides: [GUIDE["laser-tattoo-removal"], GUIDE["tattoo-removal-scarring"]],
    comparisons: [
      COMPARISON["picoway-vs-q-switch"],
      COMPARISON["best-tattoo-removal-method"],
    ],
    providers: [PROVIDER_BRAND.removery],
    cities: [CITY.houston, CITY.chicago],
  },
  "microblading-removal": {
    guides: [GUIDE["saline-tattoo-removal"], GUIDE["non-laser-tattoo-removal"]],
    comparisons: [
      COMPARISON["saline-vs-laser-tattoo-removal"],
      COMPARISON["best-tattoo-removal-method"],
    ],
    providers: [PROVIDER_BRAND.inkout, PROVIDER_BRAND["medermis-laser-clinic"]],
  },
  "permanent-makeup-removal": {
    guides: [GUIDE["saline-tattoo-removal"], GUIDE["non-laser-tattoo-removal"]],
    comparisons: [COMPARISON["saline-vs-laser-tattoo-removal"]],
    providers: [PROVIDER_BRAND.inkout],
  },
  "scarring-concerns": {
    guides: [
      GUIDE["tattoo-removal-scarring"],
      GUIDE["tattoo-removal-side-effects"],
      GUIDE["tattoo-removal-aftercare"],
    ],
    comparisons: [COMPARISON["picoway-vs-q-switch"]],
    providers: [PROVIDER_BRAND.inkout, PROVIDER_BRAND["medermis-laser-clinic"]],
  },

  // ── Guides ────────────────────────────────────────────────────────────────
  "laser-tattoo-removal": {
    categories: [
      CATEGORY["complete-removal"],
      CATEGORY["color-ink-removal"],
      CATEGORY["dark-skin-tattoo-removal"],
    ],
    comparisons: [
      COMPARISON["picoway-vs-q-switch"],
      COMPARISON["saline-vs-laser-tattoo-removal"],
      COMPARISON["best-tattoo-removal-method"],
    ],
    providers: [PROVIDER_BRAND.removery, PROVIDER_BRAND.laseraway],
  },
  "non-laser-tattoo-removal": {
    categories: [
      CATEGORY["microblading-removal"],
      CATEGORY["permanent-makeup-removal"],
      CATEGORY["cover-up-prep"],
    ],
    comparisons: [
      COMPARISON["saline-vs-laser-tattoo-removal"],
      COMPARISON["best-tattoo-removal-method"],
    ],
    providers: [PROVIDER_BRAND.inkout],
  },
  "saline-tattoo-removal": {
    categories: [
      CATEGORY["microblading-removal"],
      CATEGORY["permanent-makeup-removal"],
    ],
    comparisons: [COMPARISON["saline-vs-laser-tattoo-removal"]],
    providers: [PROVIDER_BRAND.inkout],
  },
  "tattoo-removal-aftercare": {
    categories: [CATEGORY["scarring-concerns"], CATEGORY["complete-removal"]],
    guides: [
      GUIDE["tattoo-removal-healing-process"],
      GUIDE["tattoo-removal-side-effects"],
      GUIDE["tattoo-removal-scarring"],
    ],
  },
  "tattoo-removal-healing-process": {
    categories: [CATEGORY["scarring-concerns"]],
    guides: [
      GUIDE["tattoo-removal-aftercare"],
      GUIDE["tattoo-removal-side-effects"],
      GUIDE["tattoo-removal-scarring"],
    ],
  },
  "tattoo-removal-scarring": {
    categories: [CATEGORY["scarring-concerns"], CATEGORY["dark-skin-tattoo-removal"]],
    guides: [GUIDE["tattoo-removal-side-effects"], GUIDE["tattoo-removal-aftercare"]],
    comparisons: [COMPARISON["picoway-vs-q-switch"]],
  },
  "tattoo-removal-side-effects": {
    categories: [CATEGORY["scarring-concerns"]],
    guides: [
      GUIDE["tattoo-removal-scarring"],
      GUIDE["tattoo-removal-aftercare"],
      GUIDE["tattoo-removal-healing-process"],
    ],
  },

  // ── Comparisons ──────────────────────────────────────────────────────────
  "best-tattoo-removal-method": {
    categories: [CATEGORY["complete-removal"], CATEGORY["cover-up-prep"]],
    providers: [PROVIDER_BRAND.inkout, PROVIDER_BRAND.removery],
  },
  "picoway-vs-q-switch": {
    categories: [CATEGORY["color-ink-removal"], CATEGORY["dark-skin-tattoo-removal"]],
    providers: [PROVIDER_BRAND.removery, PROVIDER_BRAND.laseraway],
  },
  "saline-vs-laser-tattoo-removal": {
    categories: [CATEGORY["microblading-removal"], CATEGORY["permanent-makeup-removal"]],
    providers: [PROVIDER_BRAND.inkout],
  },
  "inkout-vs-laseraway": {
    categories: [CATEGORY["complete-removal"], CATEGORY["cover-up-prep"]],
    comparisons: [COMPARISON["inkout-vs-removery"], COMPARISON["removery-vs-laseraway"]],
  },
  "inkout-vs-removery": {
    categories: [CATEGORY["complete-removal"], CATEGORY["cover-up-prep"]],
    comparisons: [COMPARISON["inkout-vs-laseraway"], COMPARISON["removery-vs-laseraway"]],
  },
  "removery-vs-laseraway": {
    categories: [CATEGORY["complete-removal"]],
    comparisons: [COMPARISON["inkout-vs-removery"], COMPARISON["inkout-vs-laseraway"]],
  },
  "removery-vs-medermis-laser-clinic": {
    categories: [CATEGORY["complete-removal"], CATEGORY["color-ink-removal"]],
    comparisons: [COMPARISON["laseraway-vs-medermis-laser-clinic"]],
    cities: [CITY.austin],
  },
  "laseraway-vs-medermis-laser-clinic": {
    categories: [CATEGORY["complete-removal"]],
    comparisons: [COMPARISON["removery-vs-medermis-laser-clinic"]],
    cities: [CITY.austin],
  },
  "removery-vs-inkfree-md": {
    categories: [CATEGORY["complete-removal"]],
    comparisons: [COMPARISON["removery-vs-medermis-laser-clinic"]],
    cities: [CITY.houston],
  },
  "removery-vs-kovak-cosmetic-center": {
    categories: [CATEGORY["complete-removal"]],
    comparisons: [COMPARISON["removery-vs-laseraway"]],
    cities: [CITY.chicago],
  },

  // ── Cities ────────────────────────────────────────────────────────────────
  austin: {
    categories: [CATEGORY["complete-removal"], CATEGORY["color-ink-removal"]],
    guides: [GUIDE["laser-tattoo-removal"]],
    comparisons: [
      COMPARISON["removery-vs-medermis-laser-clinic"],
      COMPARISON["laseraway-vs-medermis-laser-clinic"],
    ],
    providers: [PROVIDER_BRAND["medermis-laser-clinic"], PROVIDER_BRAND.inkout],
  },
  chicago: {
    categories: [CATEGORY["complete-removal"]],
    guides: [GUIDE["laser-tattoo-removal"]],
    comparisons: [COMPARISON["removery-vs-kovak-cosmetic-center"]],
    providers: [PROVIDER_BRAND["kovak-cosmetic-center"], PROVIDER_BRAND.removery],
  },
  houston: {
    categories: [CATEGORY["complete-removal"], CATEGORY["scarring-concerns"]],
    guides: [GUIDE["laser-tattoo-removal"]],
    comparisons: [COMPARISON["removery-vs-inkfree-md"]],
    providers: [PROVIDER_BRAND["inkfree-md"], PROVIDER_BRAND.removery],
  },
  tampa: {
    categories: [CATEGORY["complete-removal"]],
    guides: [GUIDE["laser-tattoo-removal"]],
    comparisons: [COMPARISON["best-tattoo-removal-method"]],
    providers: [PROVIDER_BRAND.removery, PROVIDER_BRAND.laseraway],
  },
  draper: {
    categories: [CATEGORY["complete-removal"]],
    guides: [GUIDE["non-laser-tattoo-removal"], GUIDE["laser-tattoo-removal"]],
    comparisons: [COMPARISON["best-tattoo-removal-method"]],
    providers: [PROVIDER_BRAND.inkout, PROVIDER_BRAND["clarity-skin"]],
  },
  "pleasant-grove": {
    categories: [CATEGORY["complete-removal"]],
    guides: [GUIDE["laser-tattoo-removal"]],
    comparisons: [COMPARISON["best-tattoo-removal-method"]],
  },
};

// ── Helper ──────────────────────────────────────────────────────────────────

/**
 * Return the cross-link bundle for an entity slug. Multi-location provider
 * slugs like "removery-bucktown" or "inkout-austin" fall back to the brand
 * hub bundle when no slug-specific bundle exists, so per-location pages
 * inherit their brand's cross-cluster relationships without per-location
 * authoring.
 *
 * Returns an empty bundle for unknown slugs. Never throws.
 */
export function getCrossLinks(slug: string): CrossLinkBundle {
  if (crossLinksByEntity[slug]) return crossLinksByEntity[slug];

  // Multi-location provider slug like "removery-bucktown" inherits from "removery".
  const provider = mockProviders.find((p) => p.slug === slug);
  if (provider?.brand) {
    const brandSlug = brandToSlug(provider.brand);
    if (crossLinksByEntity[brandSlug]) return crossLinksByEntity[brandSlug];
  }

  return {};
}
