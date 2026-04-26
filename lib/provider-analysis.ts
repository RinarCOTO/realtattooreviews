import type { Review } from "@/types/review";
import type { Provider } from "@/types/provider";
import { providers as allProviders } from "@/lib/mock-data/providers";
import { brandToSlug } from "@/lib/providers";

export function unique<T>(values: T[]): T[] {
  return [...new Set(values)];
}

export function buildOverviewStats(reviews: Review[]): Array<{ label: string; value: string }> {
  const total = reviews.length;
  const avgRating = total > 0
    ? (reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / total).toFixed(1)
    : null;
  const resultsMentioned = reviews.filter((r) => r.resultsMentioned).length;

  const stats: Array<{ label: string; value: string }> = [
    { label: "sourced reviews", value: String(total) },
  ];
  if (avgRating) stats.push({ label: "average rating", value: avgRating });
  stats.push({ label: "reviews mention results", value: String(resultsMentioned) });

  return stats;
}

export function summarizeSources(reviews: Review[]): string {
  const sources = unique(reviews.map((r) => r.source).filter(Boolean)) as string[];
  if (sources.length === 0) return "Public-source reviews";
  if (sources.length === 1) return `${sources[0]} reviews`;
  if (sources.length === 2) return `${sources[0]} and ${sources[1]} reviews`;
  return `${sources.slice(0, -1).join(", ")}, and ${sources.at(-1)} reviews`;
}

export function getVerdictFromRating(rating: number): { label: string; summary: string } {
  if (rating >= 4.4) return {
    label: "Above-average review profile",
    summary: "Review volume and signal consistency sit above most covered providers in this category. Cautions are still present and should be reviewed before booking.",
  };
  if (rating >= 4.0) return {
    label: "Mixed-to-positive review profile",
    summary: "Positive signals outweigh negative ones, but consistency varies. Compare alternatives and location-specific signals before deciding.",
  };
  return {
    label: "Limited-confidence review profile",
    summary: "Review signals are less consistent than higher-rated providers in this category. Negative signals are present and deserve a closer look.",
  };
}

export function verdictColors(label: string) {
  if (label === "Above-average review profile") return { badge: "bg-secondary text-white", border: "border-t-4 border-secondary" };
  if (label === "Mixed-to-positive review profile") return { badge: "bg-warning text-white", border: "border-t-4 border-warning" };
  return { badge: "bg-danger text-white", border: "border-t-4 border-danger" };
}

export function buildProsConsFromReviews(reviews: Review[]): { pros: string[]; cons: string[] } {
  if (reviews.length === 0) return { pros: [], cons: [] };

  const total = reviews.length;
  const pros: string[] = [];
  const cons: string[] = [];

  const highRated = reviews.filter((r) => (r.rating ?? 0) >= 4).length;
  const lowRated  = reviews.filter((r) => (r.rating ?? 0) <= 2).length;
  const highPct   = Math.round((highRated / total) * 100);

  // --- Positives (evidence-gated) ---
  if (highPct >= 80) pros.push(`${highPct}% of reviewers gave 4 or 5 stars (${highRated} of ${total}).`);
  else if (highPct >= 65) pros.push(`${highPct}% of reviewers gave 4 or 5 stars.`);

  if (total >= 30) pros.push(`Broader review footprint than most providers in this set (${total} reviews).`);
  else if (total >= 15) pros.push(`Review volume (${total}) is sufficient to identify recurring patterns.`);

  const staffCount = reviews.filter((r) => r.tags?.includes("Staff praised")).length;
  if (staffCount >= 3) pros.push(`Staff quality is mentioned positively in ${staffCount} of ${total} reviews.`);

  const resultsCount = reviews.filter((r) => r.resultsMentioned).length;
  if (resultsCount >= 5) pros.push(`Outcome mentions are frequent: ${resultsCount} of ${total} reviewers describe visible fading or a clear result.`);

  const scarringCount = reviews.filter((r) => r.scarringReported === true).length;

  const painReviews = reviews.filter((r) => r.painLevel != null);
  const avgPain = painReviews.length > 0
    ? painReviews.reduce((s, r) => s + (r.painLevel ?? 0), 0) / painReviews.length
    : null;

  if (avgPain !== null && avgPain <= 2.0)
    pros.push(`Pain levels average ${avgPain.toFixed(1)} / 5 across ${painReviews.length} reviewers who reported it.`);

  // --- Cautions (always aim for 3-4, use fallbacks to fill) ---
  if (lowRated > 0) cons.push(`${lowRated} review${lowRated > 1 ? "s" : ""} report a 1 or 2 star experience.`);

  if (scarringCount > 0)
    cons.push(`${scarringCount} review${scarringCount > 1 ? "s" : ""} mention scarring or skin damage.`);
  else
    cons.push("Scarring cannot be fully ruled out from public review data alone.");

  const refundCount = reviews.filter((r) => r.tags?.includes("Refund issue")).length;
  if (refundCount > 0) cons.push(`${refundCount} review${refundCount > 1 ? "s" : ""} flag a refund dispute or billing issue.`);

  const healingCount = reviews.filter((r) => r.tags?.includes("Healing issues")).length;
  if (healingCount > 0) cons.push(`${healingCount} review${healingCount > 1 ? "s" : ""} mention healing complications.`);

  if (avgPain !== null && avgPain >= 3.5)
    cons.push(`Pain levels average ${avgPain.toFixed(1)} / 5 across reviewers who reported it.`);

  if (total < 15)
    cons.push(`Limited review volume (${total} reviews) makes consistent patterns harder to confirm.`);

  // Structural fallbacks to always reach 3 cautions
  if (cons.length < 3)
    cons.push("Pain and session experience vary and are not consistently reported across all reviews.");
  if (cons.length < 3)
    cons.push("Negative and mixed signals are present and should be reviewed before booking.");

  return { pros: pros.slice(0, 4), cons: cons.slice(0, 4) };
}

export function buildPricingContext(providers: Provider[]): string {
  const brandNames = unique(providers.map((p) => p.brand ?? p.name));

  if (brandNames.includes("Removery")) {
    return "Removery offers a Complete Removal Package: a single flat fee covers all sessions until the tattoo is fully removed. This fits users who want cost predictability and expect a longer treatment path, but the upfront cost is higher than per-session pricing at most clinics. See the cost guide for a calibrated comparison.";
  }
  if (brandNames.includes("inkOUT")) {
    return "inkOUT uses per-session pricing with package options available. As a non-laser provider using TEPR, pricing does not map directly to laser-clinic benchmarks. Compare total path cost across methods using the cost guide before settling on a quote.";
  }
  if (brandNames.includes("LaserAway")) {
    return "LaserAway uses per-session pricing without a bundled package option. Session rates vary by tattoo size and location. Compare the quoted session count and per-session rate against local specialists before committing.";
  }

  const combinedTags = unique(providers.flatMap((p) => p.tags));
  const summaries = providers.map((p) => p.summary.toLowerCase());

  if (summaries.some((s) => s.includes("higher price point")))
    return "Pricing appears to sit above many standalone clinics. The tradeoff is usually clinical credibility, specialist positioning, or a more established setup.";
  if (combinedTags.includes("Affordable"))
    return "This provider looks more price-accessible than many higher-end clinics, but affordability should be weighed against consistency and long-term results.";
  if (combinedTags.includes("National Chain"))
    return "Chain pricing is often more standardized than independent clinics, but actual session quotes can still vary by location and treatment complexity.";
  if (combinedTags.includes("Medical") || combinedTags.includes("Medical Spa"))
    return "The pricing posture likely reflects a more medical or premium aesthetic setup. Users should compare quotes against local laser specialists and national averages.";
  return "There is enough signal to treat this provider as a real pricing comparison candidate, but not enough to publish a national price claim without city-by-city context. Use the cost guide and city pages for calibration.";
}

export function buildTreatmentOverview(providers: Provider[]): string {
  const specialties = unique(providers.map((p) => p.specialty).filter(Boolean)) as string[];
  const tags = unique(providers.flatMap((p) => p.tags));
  const techTags = tags.filter((t) =>
    ["TEPR", "PicoWay", "PicoSure", "Q-Switch", "Spectra", "Fotona"].includes(t)
  );
  const isMedical = tags.some((t) => ["Medical", "Medical Spa"].includes(t));
  const isNonLaser = specialties.some((s) => s.toLowerCase().includes("non-laser"));

  const methodLine = isNonLaser ? "This provider uses non-laser removal" : "This provider uses laser-based removal";
  const techLine = techTags.length > 0
    ? `, with ${techTags.join(" and ")} as the ${techTags.length === 1 ? "primary technology" : "primary technologies"}`
    : "";
  const clinicLine = isMedical ? " in a medical or medical spa setting" : "";
  const countLine = providers.length > 1 ? ` across ${providers.length} locations` : "";

  return `${methodLine}${techLine}${clinicLine}${countLine}. Review signals and provider profile data are the sources used here, not provider marketing claims.`;
}

export function buildResultsSummary(reviews: Review[]) {
  return {
    resultsMentioned: reviews.filter((r) => r.resultsMentioned).length,
    painMentioned: reviews.filter((r) => r.painLevel != null).length,
    scarringMentioned: reviews.filter((r) => r.scarringReported === true).length,
  };
}

export function getAlternativeProviders(providers: Provider[], currentSlug: string): Provider[] {
  const markets = unique(providers.map((p) => p.market));
  const specialties = unique(providers.map((p) => p.specialty));

  return allProviders
    .filter((p) => p.slug !== currentSlug && brandToSlug(p.brand ?? "") !== currentSlug)
    .filter((p) => markets.includes(p.market) || specialties.includes(p.specialty))
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 4);
}

export function buildFAQ(providerName: string, marketLine?: string) {
  const suffix = marketLine ? ` in ${marketLine}` : "";
  return [
    {
      q: `Is ${providerName} legit?`,
      a: `${providerName} appears to be a real, established operator, but legitimacy is not the only question. Users should still compare review patterns, pricing clarity, treatment fit, and local consistency before booking.`,
    },
    {
      q: `Is ${providerName} worth it?`,
      a: `It depends on your tattoo, budget, and priorities. ${providerName} looks strongest for users whose needs match its core strengths. The better test is whether its review patterns, pricing, and treatment approach match what matters most to you.`,
    },
    {
      q: `How expensive is ${providerName}${suffix}?`,
      a: `That depends on tattoo size, session count, location, and treatment plan. The right comparison is total path cost, not just the first quoted session. Use the pricing section above and the cost guide for calibration.`,
    },
    {
      q: `Does ${providerName} have good reviews?`,
      a: `The answer depends on both rating and pattern. Look at review count, repeated positives, repeated complaints, and whether the experience appears consistent across locations. The review-source summary and evidence sections above cover this in detail.`,
    },
  ];
}

export function buildBestFor(
  providers: Provider[],
  reviews: Review[]
): { bestFor: string[]; lessIdealFor: string[] } {
  const tags = unique(providers.flatMap((p) => p.tags));
  const specialties = unique(providers.map((p) => p.specialty).filter(Boolean)) as string[];
  const total = reviews.length;
  const avgRating =
    total > 0
      ? reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / total
      : providers.reduce((s, p) => s + p.rating, 0) / providers.length;
  const { cons } = buildProsConsFromReviews(reviews);
  const isNonLaser = specialties.some((s) => s.toLowerCase().includes("non-laser"));
  const isMedical = tags.some((t) => ["Medical", "Medical Spa"].includes(t));
  const isChain = tags.includes("National Chain");
  const isAffordable = tags.includes("Affordable");
  const lowRated = reviews.filter((r) => (r.rating ?? 0) <= 2).length;

  const bestFor: string[] = [];
  const lessIdealFor: string[] = [];

  if (isChain) bestFor.push("users who want a structured, multi-location provider with an established process");
  if (isMedical) bestFor.push("users who prefer a clinical or medically supervised setting");
  if (isAffordable) bestFor.push("users comparing on price who want a more accessible entry point");
  if (avgRating >= 4.4) bestFor.push("users who want a provider with a strong overall review record");
  if (isNonLaser) bestFor.push("users open to non-laser removal methods");
  if (bestFor.length < 2) bestFor.push("users comparing a known provider against local alternatives");

  if (total < 15) lessIdealFor.push("users who want a large volume of consistent public reviews before deciding");
  if (total > 0 && lowRated / total > 0.1)
    lessIdealFor.push("users highly sensitive to recurring negative review patterns");
  if (!isAffordable && !isMedical)
    lessIdealFor.push("users comparing primarily on price without a firm budget in mind");
  if (!isChain && providers.length === 1)
    lessIdealFor.push("users who want multi-location national coverage");
  if (cons.length > 0 && lessIdealFor.length < 3)
    lessIdealFor.push(
      "users for whom " +
        cons[0]
          .toLowerCase()
          .replace(/^\d+\s+reviews?\s+(report|flag|mention)\s+/i, "")
          .replace(/\.$/, "") +
        " is the deciding factor"
    );
  if (lessIdealFor.length < 2) lessIdealFor.push("users who need more location-specific data before committing");

  return { bestFor: bestFor.slice(0, 4), lessIdealFor: lessIdealFor.slice(0, 4) };
}

export function buildBottomLine(
  providerName: string,
  providers: Provider[],
  reviews: Review[],
  alternatives: Provider[]
): { copy: string; actionLine: string } {
  const { bestFor, lessIdealFor } = buildBestFor(providers, reviews);
  const alt1 = alternatives[0]?.name;
  const alt2 = alternatives[1]?.name;
  const altText = alt1 && alt2 ? `${alt1} and ${alt2}` : alt1 ?? "local alternatives";

  const copy = `${providerName} is not an automatic yes or no. It looks strongest for ${
    bestFor[0] ?? "users who match its core strengths"
  }, weaker for ${
    lessIdealFor[0] ?? "users with different priorities"
  }, and worth comparing directly against ${altText} before you choose.`;

  const actionLine =
    "If the overall pattern looks close to what you want, read the city-level section and compare alternatives next. If the weak points are the same ones you care about most, keep looking.";

  return { copy, actionLine };
}
