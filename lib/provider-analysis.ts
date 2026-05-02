import type { Review } from "@/types/review";
import type { Provider } from "@/types/provider";
import { providers as allProviders } from "@/lib/mock-data/providers";
import { brandToSlug } from "@/lib/providers";

export function unique<T>(values: T[]): T[] {
  return [...new Set(values)];
}

export function buildOverviewStats(reviews: Review[]): Array<{ label: string; value: string; numeric: number; decimals?: number }> {
  const total = reviews.length;
  const avgRatingNum = total > 0
    ? reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / total
    : null;
  const avgRating = avgRatingNum != null ? avgRatingNum.toFixed(1) : null;
  const resultsMentioned = reviews.filter((r) => r.resultsMentioned).length;

  const stats: Array<{ label: string; value: string; numeric: number; decimals?: number }> = [
    { label: "sourced reviews", value: String(total), numeric: total },
  ];
  if (avgRating && avgRatingNum != null) {
    stats.push({ label: "average rating", value: avgRating, numeric: avgRatingNum, decimals: 1 });
  }
  stats.push({ label: "reviews mention results", value: String(resultsMentioned), numeric: resultsMentioned });

  return stats;
}

export function summarizeSources(reviews: Review[]): string {
  const sources = unique(reviews.map((r) => r.source).filter(Boolean)) as string[];
  if (sources.length === 0) return "Public-source reviews";
  if (sources.length === 1) return `${sources[0]} reviews`;
  if (sources.length === 2) return `${sources[0]} and ${sources[1]} reviews`;
  return `${sources.slice(0, -1).join(", ")}, and ${sources.at(-1)} reviews`;
}

/**
 * Multi-signal verdict composer.
 *
 * Combines rating tier + review density + risk-signal density to produce a
 * label and summary that vary across providers instead of falling into one
 * of three fixed buckets. When called with just a rating (legacy callers),
 * degrades to the original three-bucket behavior.
 */
export function getVerdictFromRating(
  rating: number,
  reviews: Review[] = []
): { label: string; summary: string } {
  const total = reviews.length;

  // Legacy path: no reviews supplied, return rating-only verdict.
  // Phrasing is intentionally self-referential — there is no category-wide
  // comparison model behind these labels, so claims like "above most
  // covered providers in this category" or "less consistent than
  // higher-rated providers" overreach on what the rating alone supports.
  if (total === 0) {
    if (rating >= 4.4)
      return {
        label: "Above-average review profile",
        summary:
          "Average rating sits in the higher tier of the rating range. Cautions are still present and should be reviewed before booking.",
      };
    if (rating >= 4.0)
      return {
        label: "Mixed-to-positive review profile",
        summary:
          "Positive signals outweigh negative ones, but consistency varies. Compare alternatives and location-specific signals before deciding.",
      };
    return {
      label: "Limited-confidence review profile",
      summary:
        "Average rating sits in the lower tier of the rating range. Negative signals are present and deserve a closer look.",
    };
  }

  // Multi-signal path.
  const scarringCount = reviews.filter((r) => r.scarringReported === true).length;
  const scarringPct = (scarringCount / total) * 100;
  const lowRatedCount = reviews.filter((r) => (r.rating ?? 0) <= 2).length;
  const lowRatedPct = (lowRatedCount / total) * 100;
  const resultsCount = reviews.filter((r) => r.resultsMentioned).length;
  const resultsPct = (resultsCount / total) * 100;

  // Rating tier.
  const ratingTier =
    rating >= 4.5 ? "strong" : rating >= 4.0 ? "mixed" : rating >= 3.5 ? "uneven" : "weak";

  // Volume tier.
  const volumeTier = total >= 30 ? "heavy" : total >= 15 ? "moderate" : "light";

  // Compose label. Labels describe this provider's own review profile — they
  // are not relative rankings against other providers in any "category."
  // The tiers come from threshold buckets on rating + volume + scarring rate.
  let label: string;
  if (ratingTier === "strong" && volumeTier === "heavy" && scarringPct < 5)
    label = "Consistently positive, full review base";
  else if (ratingTier === "strong" && volumeTier === "heavy")
    label = "Consistently positive with a scarring caveat";
  else if (ratingTier === "strong" && volumeTier === "moderate")
    label = "Positive pattern on a moderate review base";
  else if (ratingTier === "strong")
    label = "Positive pattern on a light review base";
  else if (ratingTier === "mixed" && volumeTier === "heavy")
    label = "Mixed-to-positive on a full review base";
  else if (ratingTier === "mixed")
    label = "Mixed-to-positive review pattern";
  else if (ratingTier === "uneven" && volumeTier !== "light")
    label = "Uneven review pattern with real cautions";
  else label = "Limited-confidence review pattern";

  // Compose summary from signal pieces. Phrasing avoids cross-provider
  // comparative claims because there is no explicit category-wide comparison
  // model behind these labels — the tiers come from rating + volume thresholds
  // applied to this provider's own data, not against a computed median.
  const ratingSentence = (() => {
    if (ratingTier === "strong" && volumeTier === "heavy")
      return `Average rating of ${rating.toFixed(1)} across ${total} reviews is consistently positive on a sample large enough to read patterns from.`;
    if (ratingTier === "strong")
      return `Average rating of ${rating.toFixed(1)} is strong, though a sample size of ${total} review${total === 1 ? "" : "s"} keeps confidence narrower than a heavier review base would support.`;
    if (ratingTier === "mixed" && volumeTier === "heavy")
      return `Average rating of ${rating.toFixed(1)} across ${total} reviews shows positive signals outweighing negative ones, with consistency that varies by case.`;
    if (ratingTier === "mixed")
      return `Average rating of ${rating.toFixed(1)} across ${total} review${total === 1 ? "" : "s"} is positive on balance but uneven enough that comparison against alternatives is worth doing.`;
    return `Average rating of ${rating.toFixed(1)} across ${total} review${total === 1 ? "" : "s"} sits in the lower tier of the rating range. Negative signals deserve a close look.`;
  })();

  const cautionPieces: string[] = [];
  if (scarringPct >= 5)
    cautionPieces.push(
      `${scarringCount} of ${total} reviewers (${Math.round(scarringPct)}%) mention scarring or skin damage`
    );
  if (lowRatedPct >= 10)
    cautionPieces.push(`${lowRatedCount} review${lowRatedCount === 1 ? "" : "s"} report a 1-or-2-star experience`);

  const positivePieces: string[] = [];
  if (resultsPct >= 50) {
    if (resultsCount === total)
      positivePieces.push(`every reviewer describes a visible result`);
    else
      positivePieces.push(
        `${resultsCount} of ${total} reviewers (${Math.round(resultsPct)}%) describe a visible result`
      );
  }

  const caveat =
    cautionPieces.length > 0
      ? `Caveats worth weighing: ${cautionPieces.join(", and ")}.`
      : positivePieces.length > 0
        ? `Notable positive signal: ${positivePieces.join(", and ")}.`
        : "Cautions are still present and should be reviewed before booking.";

  return { label, summary: `${ratingSentence} ${caveat}` };
}

/**
 * Map a verdict label to badge and border colors.
 *
 * Used by DBOnlyProviderPage. VerdictCard does not call this function.
 *
 * Three tiers:
 *   - secondary (positive)  → "Consistently positive…" / "Positive pattern…"
 *   - warning   (mixed)     → "Mixed-to-positive…"
 *   - danger    (cautions)  → "Uneven…" / "Limited-confidence…"
 *
 * Legacy label strings ("Above-average review profile", "Mixed-to-positive
 * review profile") are still recognised so older renders that cached an
 * older label do not regress.
 */
export function verdictColors(label: string) {
  const SECONDARY = { badge: "bg-secondary text-white", border: "border-t-4 border-secondary" };
  const WARNING = { badge: "bg-warning text-white", border: "border-t-4 border-warning" };
  const DANGER = { badge: "bg-danger text-white", border: "border-t-4 border-danger" };

  // Positive tier: new labels start with "Consistently positive" or
  // "Positive pattern"; legacy label is "Above-average review profile".
  if (
    label.startsWith("Consistently positive") ||
    label.startsWith("Positive pattern") ||
    label === "Above-average review profile"
  ) {
    return SECONDARY;
  }

  // Mixed tier: new labels start with "Mixed-to-positive"; legacy label is
  // "Mixed-to-positive review profile".
  if (label.startsWith("Mixed-to-positive")) {
    return WARNING;
  }

  // Caution tier: "Uneven…", "Limited-confidence…", and any unknown label.
  return DANGER;
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

  if (total >= 30) pros.push(`Substantial review footprint (${total} reviews), enough to read patterns from confidently.`);
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
  else if (total < 15)
    cons.push("Sample size is too small to fully characterize scarring risk from public review data alone.");

  const refundCount = reviews.filter((r) => r.tags?.includes("Refund issue")).length;
  if (refundCount > 0) cons.push(`${refundCount} review${refundCount > 1 ? "s" : ""} flag a refund dispute or billing issue.`);

  const healingCount = reviews.filter((r) => r.tags?.includes("Healing issues")).length;
  if (healingCount > 0) cons.push(`${healingCount} review${healingCount > 1 ? "s" : ""} mention healing complications.`);

  if (avgPain !== null && avgPain >= 3.5)
    cons.push(`Pain levels average ${avgPain.toFixed(1)} / 5 across reviewers who reported it.`);

  if (total < 15)
    cons.push(`Limited review volume (${total} reviews) makes consistent patterns harder to confirm.`);

  // No "fill to 3 cautions" fallback. If the review evidence does not support
  // additional cautions, we render fewer rather than fabricate them. Earlier
  // versions of this function pushed generic strings like "Mixed signals
  // warrant a second opinion" or "Pain and session experience varies"
  // regardless of evidence; that produced misleading cautions on high-rated,
  // high-volume providers and has been removed.

  return { pros: pros.slice(0, 4), cons: cons.slice(0, 4) };
}

/**
 * Pricing context paragraph.
 *
 * NOTE: this is editorial logic, not review-data composition. The three
 * brand-specific branches below (Removery, inkOUT, LaserAway) are hand-
 * written paragraphs hardcoded by brand name to surface each brand's
 * documented pricing model. The fallback branches read provider tags +
 * specialty + tenure to compose a generic paragraph. None of this is
 * derived from review records. Any framing on the rendered page should
 * describe this section as editorial, not as auto-generated from reviews.
 */
export function buildPricingContext(providers: Provider[]): string {
  const brandNames = unique(providers.map((p) => p.brand ?? p.name));
  const primary = providers[0];

  // Brand-specific editorial paragraphs (hand-written, not data-composed).
  if (brandNames.includes("Removery"))
    return "Removery offers a Complete Removal Package: a single flat fee covers all sessions until the tattoo is fully removed. This fits users who want cost predictability and expect a longer treatment path, but the upfront cost is higher than per-session pricing at most clinics. See the cost guide for a calibrated comparison.";
  if (brandNames.includes("inkOUT"))
    return "inkOUT uses per-session pricing with package options available. As a non-laser provider using TEPR, pricing does not map directly to laser-clinic benchmarks. Compare total path cost across methods using the cost guide before settling on a quote.";
  if (brandNames.includes("LaserAway"))
    return "LaserAway uses per-session pricing without a bundled package option. Session rates vary by tattoo size and location. Compare the quoted session count and per-session rate against local specialists before committing.";

  const combinedTags = unique(providers.flatMap((p) => p.tags));
  const summaries = providers.map((p) => p.summary.toLowerCase());
  const yearsActive = primary?.yearsActive;

  // Derive a base paragraph from tags + summary signals.
  let base: string;
  if (summaries.some((s) => s.includes("higher price point")))
    base = `Pricing appears to sit above many standalone clinics. The tradeoff is usually clinical credibility, specialist positioning, or a more established setup.`;
  else if (combinedTags.includes("Affordable"))
    base = `This provider looks more price-accessible than many higher-end clinics, but affordability should be weighed against consistency and long-term results.`;
  else if (combinedTags.includes("National Chain"))
    base = `Chain pricing is often more standardized than independent clinics, but actual session quotes can still vary by location and treatment complexity.`;
  else if (combinedTags.includes("Medical") || combinedTags.includes("Medical Spa"))
    base = `Pricing posture likely reflects a more medical or premium aesthetic setup. Compare quotes against local laser specialists and national averages.`;
  else if (combinedTags.includes("Specialist") || (primary?.specialty ?? "").toLowerCase().includes("removal"))
    base = `As a tattoo-removal-focused practice, pricing is usually structured around a session count appropriate to the case rather than aesthetics-package bundling.`;
  else
    base = `Pricing varies by tattoo size, ink density, and session count rather than a single quoted rate. Use the cost guide for full-course math.`;

  // Add a tenure modifier if available, to differentiate similar providers.
  if (yearsActive && yearsActive >= 10)
    base += ` ${primary.name} has operated for ${yearsActive} years, which often correlates with established consultation pricing rather than promotional pricing.`;
  else if (yearsActive && yearsActive >= 5)
    base += ` With ${yearsActive} years in market, ${primary.name} sits between newer entrants and the most-tenured operators on pricing posture.`;

  return base;
}

export function buildTreatmentOverview(providers: Provider[]): string {
  const specialties = unique(providers.map((p) => p.specialty).filter(Boolean)) as string[];
  const tags = unique(providers.flatMap((p) => p.tags));
  const techTags = tags.filter((t) =>
    ["TEPR", "PicoWay", "PicoSure", "Q-Switch", "Spectra", "Fotona"].includes(t)
  );
  const isMedical = tags.some((t) => ["Medical", "Medical Spa"].includes(t));
  const isNonLaser = specialties.some((s) => s.toLowerCase().includes("non-laser"));
  const primary = providers[0];

  const methodLine = isNonLaser
    ? "This provider uses non-laser removal"
    : "This provider uses laser-based removal";
  const techLine =
    techTags.length > 0
      ? `, with ${techTags.join(" and ")} as the ${techTags.length === 1 ? "primary technology" : "primary technologies"}`
      : "";
  const clinicLine = isMedical ? " in a medical or medical spa setting" : "";
  const countLine = providers.length > 1 ? ` across ${providers.length} locations` : "";

  const opener = `${methodLine}${techLine}${clinicLine}${countLine}.`;

  // Weave in webSummary if available so the auto-section is differentiated.
  // webSummary text is paraphrased from each provider's published materials,
  // so the rendered paragraph mixes (a) editorial method/technology framing
  // and (b) provider-published technology descriptions. Be honest about that
  // composition rather than claim a "review-only" source.
  const webSummary = primary?.webSummary?.trim();
  if (webSummary) {
    // Take the first 1-2 sentences of webSummary to enrich the opener.
    const sentences = webSummary.split(/(?<=\.)\s+/);
    const seedClause = sentences.slice(0, Math.min(2, sentences.length)).join(" ");
    return `${opener} ${seedClause}`;
  }

  return opener;
}

/**
 * Compute use-case distribution from review data. Used by FAQ, differentiator,
 * and use-case focus paragraph.
 */
export function buildUseCaseDistribution(reviews: Review[]): {
  total: number;
  complete: number;
  coverUp: number;
  microblading: number;
  color: number;
  other: number;
  topUseCase: string | null;
  topUseCaseCount: number;
} {
  const total = reviews.length;
  const complete = reviews.filter((r) => r.useCase === "Complete").length;
  const coverUp = reviews.filter((r) => r.useCase === "Cover-up").length;
  const microblading = reviews.filter((r) => r.useCase === "Microblading").length;
  const color = reviews.filter((r) => r.useCase === "Color").length;
  const other = reviews.filter((r) => r.useCase === "Other").length;

  const tally: Array<[string, number]> = [
    ["Complete removal", complete],
    ["Cover-up fading", coverUp],
    ["Microblading removal", microblading],
    ["Color ink removal", color],
    ["Other cases", other],
  ];
  tally.sort((a, b) => b[1] - a[1]);
  const [topName, topCount] = tally[0] ?? ["", 0];

  return {
    total,
    complete,
    coverUp,
    microblading,
    color,
    other,
    topUseCase: topCount > 0 ? topName : null,
    topUseCaseCount: topCount,
  };
}

/**
 * One-paragraph prose describing the dominant use case in the review sample.
 * Returns null when no use-case classification data is present.
 */
export function buildUseCaseFocus(reviews: Review[]): string | null {
  const dist = buildUseCaseDistribution(reviews);
  if (dist.total === 0 || dist.topUseCase === null) return null;
  if (dist.topUseCaseCount < 3) return null;

  const pct = Math.round((dist.topUseCaseCount / dist.total) * 100);
  const lead = `${dist.topUseCase} dominates the review sample at ${dist.topUseCaseCount} of ${dist.total} reviewers (${pct}%).`;

  // Identify a notable secondary use case if present.
  const candidates: Array<[string, number]> = [
    ["complete removal", dist.complete],
    ["cover-up fading", dist.coverUp],
    ["microblading removal", dist.microblading],
    ["color ink removal", dist.color],
  ];
  const topLower = dist.topUseCase.toLowerCase();
  const remaining: Array<[string, number]> = candidates.filter(
    ([name]) => !topLower.includes(name.split(" ")[0])
  );
  remaining.sort((a, b) => b[1] - a[1]);
  const fallback: [string, number] = ["", 0];
  const [secondName, secondCount] = remaining[0] ?? fallback;

  if (secondCount >= 2) {
    const secondPct = Math.round((secondCount / dist.total) * 100);
    return `${lead} ${secondName.charAt(0).toUpperCase() + secondName.slice(1)} appears as a secondary signal at ${secondCount} of ${dist.total} (${secondPct}%). The use-case mix is what makes this provider's review base most useful for matching against your specific case.`;
  }

  return `${lead} The use-case mix is narrow enough that this provider's review evidence is most useful when your case lines up with the dominant pattern.`;
}

/**
 * Provider-specific differentiator paragraph derived from tags, market,
 * tenure, top use case, and editorial summary. Designed to inject one or
 * two sentences of copy that vary across providers and avoid duplicate
 * content patterns.
 *
 * Returns null when there is not enough signal to write something specific.
 */
export function buildDifferentiator(
  provider: Provider,
  reviews: Review[]
): string | null {
  if (!provider) return null;

  const tags = provider.tags ?? [];
  const topUseCase = buildUseCaseDistribution(reviews).topUseCase;
  const yearsActive = provider.yearsActive;
  const market = provider.market;
  const isNonLaser = (provider.specialty ?? "").toLowerCase().includes("non-laser");
  const isSpecialist =
    tags.includes("Specialist") || (provider.specialty ?? "").toLowerCase().includes("removal");
  const isMedical = tags.includes("Medical") || tags.includes("Medical Spa");
  const isChain = tags.includes("National Chain");

  const pieces: string[] = [];

  // Lead sentence: combine tenure + market + practice type.
  if (yearsActive && yearsActive >= 10 && isSpecialist)
    pieces.push(
      `${provider.name} is one of the longer-tenured tattoo-removal-focused practices in ${market}, with ${yearsActive} years in market.`
    );
  else if (yearsActive && yearsActive >= 10)
    pieces.push(
      `${provider.name} has operated in ${market} for ${yearsActive} years, putting it on the established side of the local market.`
    );
  else if (yearsActive && yearsActive >= 5 && isSpecialist)
    pieces.push(
      `${provider.name} is a tattoo-removal-focused practice in ${market} with ${yearsActive} years in market.`
    );
  else if (isNonLaser)
    pieces.push(
      `${provider.name} sits in a different category from most ${market} options because it is non-laser, which changes the comparison axis.`
    );
  else if (isChain)
    pieces.push(
      `${provider.name} is a multi-market chain with a ${market} location, which means standardized protocols rather than owner-operated variability.`
    );
  else if (isMedical)
    pieces.push(
      `${provider.name} operates as a medical aesthetics practice in ${market}, with tattoo removal positioned alongside a broader service menu.`
    );
  else
    pieces.push(
      `${provider.name} is a ${market} provider whose review evidence and treatment approach are worth comparing against alternatives.`
    );

  // Second sentence: pull from review evidence if available.
  if (topUseCase) {
    pieces.push(
      `Review evidence skews toward ${topUseCase.toLowerCase()} cases, which is a useful match signal if your case fits that pattern and a caution if it does not.`
    );
  }

  return pieces.join(" ");
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

/**
 * Deterministic seed from a string. Used to pick between sentence-shape
 * variants per provider so different providers render different sentence
 * structures (not just substituted data) without randomness across renders.
 */
function shapeSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pickShape<T>(seed: number, shapes: T[], offset = 0): T {
  return shapes[(seed + offset) % shapes.length];
}

/**
 * Hybrid FAQ composer with variant sentence shapes.
 *
 * Pulls inputs from THREE different sources and combines them:
 *
 *   1. Review signals — total, avgRating, highRatedPct, useCaseDist,
 *      scarringCount, costMentions. Numerical evidence from the review record.
 *   2. Provider profile — yearsActive, market, tags, specialty (chain /
 *      medical / non-laser / specialist flags). Editorial classification
 *      data from `lib/mock-data/providers.ts`.
 *   3. Editorial sentence templates — story buckets per question, with
 *      multiple variant phrasings per bucket selected deterministically by
 *      slug-seeded hash.
 *
 * The output is therefore a hybrid: numbers from reviews, framing from tags,
 * sentence shape from editorial templates. Anywhere this site describes the
 * FAQ as "auto-generated," that description should acknowledge the hybrid
 * composition rather than imply pure review-data output.
 */
export function buildFAQ(
  providerName: string,
  marketLine?: string,
  reviews: Review[] = [],
  provider?: Provider | null
) {
  const suffix = marketLine ? ` in ${marketLine}` : "";
  const total = reviews.length;
  const hasData = total > 0;

  // Pre-compute review-derived signals once.
  const avgRating = hasData
    ? (reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / total).toFixed(1)
    : null;
  const highRatedPct = hasData
    ? Math.round((reviews.filter((r) => (r.rating ?? 0) >= 4).length / total) * 100)
    : null;
  const useCaseDist = buildUseCaseDistribution(reviews);
  const scarringCount = reviews.filter((r) => r.scarringReported === true).length;
  const costMentions = reviews.filter((r) => r.costMentioned === true).length;
  const yearsActive = provider?.yearsActive ?? null;
  const market = provider?.market ?? marketLine ?? "";
  const tags = provider?.tags ?? [];
  const isSpecialist =
    tags.includes("Specialist") ||
    (provider?.specialty ?? "").toLowerCase().includes("removal");
  const isChain = tags.includes("National Chain");
  const isMedical = tags.includes("Medical") || tags.includes("Medical Spa");
  const isNonLaser = (provider?.specialty ?? "").toLowerCase().includes("non-laser");

  const seed = shapeSeed(provider?.slug ?? providerName);

  // ── Q1: legit ─────────────────────────────────────────────────────────────
  // Pick the strongest single "story" based on signal hierarchy, then pick a
  // sentence variant within that story so different providers in different
  // story buckets read differently, and providers in the same bucket still get
  // sentence-shape variation through the deterministic seed.
  let legitLeads: string[];
  if (yearsActive && yearsActive >= 10 && isSpecialist) {
    legitLeads = [
      `${providerName} has run a tattoo-removal-focused practice for ${yearsActive} years.`,
      `Tattoo-removal-only and operating for ${yearsActive} years, ${providerName} sits in the longer-tenured tier of specialist clinics.`,
      `${providerName} is a ${yearsActive}-year specialist in tattoo removal.`,
    ];
  } else if (yearsActive && yearsActive >= 10) {
    legitLeads = [
      `With ${yearsActive} years operating in ${market}, ${providerName} sits among the more established practices in its market.`,
      `${providerName} has ${yearsActive} years of local operating tenure in ${market}.`,
      `Operating tenure for ${providerName} runs ${yearsActive} years, which puts it on the established side of the market.`,
    ];
  } else if (yearsActive && yearsActive >= 5 && isSpecialist) {
    legitLeads = [
      `${providerName} is a tattoo-removal specialist with ${yearsActive} years in market.`,
      `As a specialist clinic, ${providerName} has built a ${yearsActive}-year operating record.`,
      `${providerName} runs as a tattoo-removal-focused practice and has been in business for ${yearsActive} years.`,
    ];
  } else if (yearsActive && yearsActive >= 5) {
    legitLeads = [
      `${providerName} carries ${yearsActive} years of operating tenure as one signal of legitimacy.`,
      `Operating tenure at ${providerName} runs ${yearsActive} years, which puts it on the established side of the market.`,
      `${providerName} has been in operation for ${yearsActive} years.`,
    ];
  } else if (isChain) {
    legitLeads = [
      `As part of a multi-market chain, ${providerName} carries a structural footprint that goes beyond a single location.`,
      `${providerName} is part of a multi-market chain, which gives it a different legitimacy signal than a single-location independent.`,
      `Chain affiliation is the structural answer for ${providerName}; the operating model is multi-location standardized.`,
    ];
  } else if (total >= 30) {
    legitLeads = [
      `${providerName} has ${total} sourced reviews on file, which is substantial enough to read meaningful patterns from.`,
      `${total} sourced reviews on ${providerName} confirm a real operating presence with public data to back it up.`,
      `Review volume for ${providerName} is high (${total} entries), pointing to an active practice with public visibility.`,
    ];
  } else if (total >= 15) {
    legitLeads = [
      `Public review data on ${providerName} runs to ${total} entries, enough to confirm an active operating presence.`,
      `${providerName} has ${total} sourced reviews, which is moderate volume but readable.`,
      `${total} reviews on file at ${providerName} establish basic operating presence.`,
    ];
  } else if (isMedical) {
    legitLeads = [
      `${providerName} operates as a medical aesthetics practice in ${market}, which carries clinical-setting credentialing as one legitimacy signal.`,
      `As a medical aesthetics clinic in ${market}, ${providerName} sits within a medically supervised model rather than a standalone studio.`,
      `Practice type for ${providerName} is medical aesthetics, which folds in clinical-setting credentialing as part of legitimacy.`,
    ];
  } else {
    legitLeads = [
      `${providerName} is a real operating practice with publicly available review data.`,
      `Operating presence for ${providerName} is documented in public review data, though detail is light compared to higher-volume providers.`,
      `${providerName} appears to be an active practice; review volume is on the lighter side.`,
    ];
  }

  const legitMids = [
    "The harder questions are pricing clarity, treatment fit, and local consistency.",
    "Tenure or review count tell you the practice exists. Whether it fits your case is a separate question.",
    "Operating presence is the entry-level signal. Outcome patterns and cost transparency carry more weight.",
    "Public review patterns, scarring track record, and pricing posture are the load-bearing comparisons.",
  ];

  const legitCloses = useCaseDist.topUseCase
    ? [
        `Reviewers most often describe ${useCaseDist.topUseCase.toLowerCase()} cases, which is a useful match check.`,
        `The dominant case pattern in the review sample is ${useCaseDist.topUseCase.toLowerCase()}; check whether your case fits.`,
        "Read the review-pattern sections above before deciding.",
      ]
    : [
        "Read the review-pattern sections above before deciding.",
        "Match the strengths and cautions above to your specific case.",
        "The evidence sections above cover the patterns in detail.",
      ];

  const legitAnswer = [
    pickShape(seed, legitLeads, 0),
    pickShape(seed, legitMids, 1),
    pickShape(seed, legitCloses, 2),
  ].join(" ");

  // ── Q2: worth it ──────────────────────────────────────────────────────────
  let worthLeads: string[];
  if (highRatedPct != null && highRatedPct >= 90 && total >= 15) {
    worthLeads = [
      `${highRatedPct}% of ${total} reviewers landed at 4 or 5 stars for ${providerName}, which is a high-consistency signal.`,
      `Out of ${total} sourced reviews, ${highRatedPct}% rate ${providerName} 4 or 5 stars; consistency is unusually high.`,
      `Review consistency for ${providerName} sits at ${highRatedPct}% positive across ${total} entries.`,
    ];
  } else if (highRatedPct != null && highRatedPct >= 80 && total >= 15) {
    worthLeads = [
      `${highRatedPct}% of ${total} reviewers gave ${providerName} 4 or 5 stars, which is a strong but not uniform signal.`,
      `${providerName} pulls ${highRatedPct}% positive across ${total} reviews, which is a strong consistency pattern on this provider's own data.`,
      `Across ${total} sourced reviews, ${providerName} runs ${highRatedPct}% at 4 or 5 stars.`,
    ];
  } else if (highRatedPct != null && highRatedPct >= 65) {
    worthLeads = [
      `${highRatedPct}% of ${total} reviewers rated ${providerName} 4 or 5, which is positive on balance but uneven.`,
      `Review pattern for ${providerName} is positive at ${highRatedPct}% high-rated, with enough variance to merit comparison.`,
      `${providerName} reads positive but inconsistent: ${highRatedPct}% high-rated across ${total} entries.`,
    ];
  } else if (hasData) {
    worthLeads = [
      `${providerName}'s review pattern across ${total} entries is mixed. Strong cases sit alongside weaker ones.`,
      `Across ${total} reviews, ${providerName} pulls a mixed pattern. The averages hide real outcome variance.`,
      `Review evidence on ${providerName} is mixed enough that comparison against alternatives is the right next step.`,
    ];
  } else {
    worthLeads = [
      `Worth-it depends on tattoo type, budget, and how the strengths and cautions match your priorities.`,
      `${providerName} looks strongest for users whose case lines up with the dominant review pattern.`,
      `Match the review patterns above to your specific case before deciding.`,
    ];
  }

  const worthMids = useCaseDist.topUseCase
    ? [
        `The clearest fit signal is ${useCaseDist.topUseCase.toLowerCase()}, which is the case type the review sample most often describes.`,
        `Reviewers tend to describe ${useCaseDist.topUseCase.toLowerCase()} cases, so users in that bucket get the most predictive read.`,
        "Match your case type to the dominant pattern above for the most useful comparison.",
      ]
    : [
        "The better test is whether the provider's strengths match your tattoo, skin type, and budget.",
        "Strong rating without strong fit usually still leaves users weighing alternatives.",
        "Match the strengths and cautions above to what matters most to your case.",
      ];

  const worthCloses = [
    `Compare ${providerName} against alternatives in the section above before deciding.`,
    "Run a side-by-side against at least one alternative before committing.",
    "Free consultations across multiple providers usually beat picking based on rating alone.",
  ];

  const worthItAnswer = [
    pickShape(seed, worthLeads, 3),
    pickShape(seed, worthMids, 4),
    pickShape(seed, worthCloses, 5),
  ].join(" ");

  // ── Q3: cost ──────────────────────────────────────────────────────────────
  let costLeads: string[];
  if (isNonLaser) {
    costLeads = [
      `Non-laser pricing for ${providerName} does not map directly to laser-clinic benchmarks because the method is different.`,
      `${providerName} prices outside the standard laser-clinic comparison frame; the non-laser method changes the math.`,
      `Because ${providerName} runs a non-laser method, per-session price comparisons against laser clinics are not apples-to-apples.`,
    ];
  } else if (isChain) {
    costLeads = [
      `As a multi-market chain, ${providerName} typically prices closer to a standardized session rate than independent specialists.`,
      `Chain pricing at ${providerName} tends to be more uniform than single-location quotes, though session counts still vary.`,
      `${providerName} usually quotes from a chain pricing tier rather than per-case independent pricing.`,
    ];
  } else if (isMedical) {
    costLeads = [
      `Medical aesthetics practices like ${providerName} tend to price above standalone laser specialists.`,
      `${providerName} prices within the medical-aesthetics tier, which usually sits above standalone laser specialists.`,
      `Medical-setting pricing at ${providerName} typically reflects a higher service-tier baseline.`,
    ];
  } else if (isSpecialist) {
    costLeads = [
      `Tattoo-removal specialists like ${providerName} typically structure pricing around session count rather than aesthetics packages.`,
      `${providerName} usually prices per-session against an estimated case count rather than a flat aesthetics-package rate.`,
      `Specialist pricing at ${providerName} maps to session count and case complexity rather than service-bundle tiers.`,
    ];
  } else if (costMentions >= 5 && hasData) {
    costLeads = [
      `${costMentions} of ${total} reviewers mention pricing or value, which gives a calibrated view of how ${providerName} quotes.`,
      `Cost comes up frequently in ${providerName}'s review base (${costMentions} of ${total}), pointing to a price-sensitive comparison.`,
      `Pricing is a recurring topic in ${costMentions} of ${total} reviews on ${providerName}.`,
    ];
  } else {
    costLeads = [
      `Pricing varies by tattoo size, ink density, and session count more than by any single quoted rate.`,
      `${providerName}'s pricing depends on case specifics; a single per-session number rarely captures the full picture.`,
      `Cost expectations at ${providerName} hinge on session count, which itself depends on the tattoo and skin type.`,
    ];
  }

  const costMids = [
    "Per-session pricing is the easy number to find. Total path cost is the one that matters.",
    "Always ask for projected session count and total cost, not just the per-session rate.",
    "Quote-vs-actual divergence usually comes from session count outliers, not session price.",
    "The relevant math is full-course total, including realistic outlier scenarios.",
  ];

  const costCloses = [
    `Use the cost guide for calibration against national averages.`,
    `See the pricing section above and the cost guide for full-course math.`,
    `Compare against local alternatives before treating any single quote as the right number.`,
  ];

  const costAnswer = [
    pickShape(seed, costLeads, 6),
    pickShape(seed, costMids, 7),
    pickShape(seed, costCloses, 8),
  ].join(" ");

  // ── Q4: good reviews ──────────────────────────────────────────────────────
  let reviewsLeads: string[];
  if (hasData && avgRating && total >= 30) {
    reviewsLeads = [
      `${providerName} carries ${total} sourced reviews averaging ${avgRating} stars, with enough volume to read patterns rather than anecdotes.`,
      `${total} reviews at ${avgRating} stars on ${providerName} give a high-confidence read on the typical experience.`,
      `Review evidence on ${providerName} runs deep: ${total} entries averaging ${avgRating}.`,
    ];
  } else if (hasData && avgRating && total >= 15) {
    reviewsLeads = [
      `Across ${total} sourced reviews, ${providerName} averages ${avgRating} stars. Volume is moderate but readable.`,
      `${providerName}'s ${total} reviews at ${avgRating} average put it in moderate-confidence territory.`,
      `${total} entries at ${avgRating} stars give ${providerName} a workable but not deep evidence base.`,
    ];
  } else if (hasData && avgRating) {
    reviewsLeads = [
      `${providerName} has ${total} sourced reviews on file at ${avgRating} stars. Sample size is light, so individual cases pull the average more.`,
      `Light review volume on ${providerName} (${total} entries at ${avgRating}) means each individual review weighs more than at higher-volume providers.`,
      `Only ${total} reviews currently on file at ${avgRating} stars; treat the average as preliminary.`,
    ];
  } else {
    reviewsLeads = [
      `Rating alone is the easy answer; pattern is the useful one.`,
      `Review goodness depends on volume, consistency, and which case types reviewers describe.`,
      `Star average alone is a thin signal. Pattern, consistency, and use-case distribution matter more.`,
    ];
  }

  const reviewsMids: string[] = [];
  if (useCaseDist.topUseCase)
    reviewsMids.push(
      `The dominant use-case signal is ${useCaseDist.topUseCase.toLowerCase()} (${useCaseDist.topUseCaseCount} of ${total}).`
    );
  if (scarringCount > 0)
    reviewsMids.push(
      `${scarringCount} review${scarringCount === 1 ? "" : "s"} flag scarring or skin damage.`
    );
  if (highRatedPct != null && highRatedPct >= 80)
    reviewsMids.push(
      `${highRatedPct}% of reviewers landed at 4 or 5 stars, indicating strong consistency.`
    );
  if (reviewsMids.length === 0)
    reviewsMids.push(
      "Look at recurring positives, recurring complaints, and consistency across locations."
    );

  const reviewsCloses = [
    "The evidence sections above break the pattern down in full.",
    "Read the negative-first ordering above for the load-bearing signals.",
    "Pros, cons, and use-case sections cover the rest.",
  ];

  const reviewsAnswer = [
    pickShape(seed, reviewsLeads, 9),
    pickShape(seed, reviewsMids, 10),
    pickShape(seed, reviewsCloses, 11),
  ].join(" ");

  return [
    { q: `Is ${providerName} legit?`, a: legitAnswer },
    { q: `Is ${providerName} worth it?`, a: worthItAnswer },
    { q: `How expensive is ${providerName}${suffix}?`, a: costAnswer },
    { q: `Does ${providerName} have good reviews?`, a: reviewsAnswer },
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
      : providers.reduce((s, p) => s + p.rating, 0) / Math.max(providers.length, 1);
  const isNonLaser = specialties.some((s) => s.toLowerCase().includes("non-laser"));
  const isMedical = tags.some((t) => ["Medical", "Medical Spa"].includes(t));
  const isChain = tags.includes("National Chain");
  const isAffordable = tags.includes("Affordable");
  const isSpecialist =
    tags.includes("Specialist") || specialties.some((s) => s.toLowerCase().includes("removal"));
  const lowRated = reviews.filter((r) => (r.rating ?? 0) <= 2).length;
  const lowRatedPct = total > 0 ? lowRated / total : 0;
  const scarringCount = reviews.filter((r) => r.scarringReported === true).length;
  const refundCount = reviews.filter((r) => r.tags?.includes("Refund issue")).length;
  const useCaseDist = buildUseCaseDistribution(reviews);

  const bestFor: string[] = [];
  const lessIdealFor: string[] = [];

  // bestFor: composed from data signals.
  if (isChain)
    bestFor.push("users who want a structured, multi-location provider with an established process");
  if (isSpecialist && !isChain)
    bestFor.push("users who prefer a tattoo-removal-focused practice over a multi-service med spa");
  if (isMedical)
    bestFor.push("users who prefer a clinical or medically supervised setting");
  if (isAffordable)
    bestFor.push("users comparing on price who want a more accessible entry point");
  if (avgRating >= 4.4)
    bestFor.push("users who want a provider with a strong overall review record");
  if (isNonLaser)
    bestFor.push("users open to non-laser removal methods");
  if (useCaseDist.topUseCase && useCaseDist.topUseCaseCount >= 3)
    bestFor.push(`users with ${useCaseDist.topUseCase.toLowerCase()} cases similar to the dominant pattern in the review sample`);
  if (bestFor.length < 2)
    bestFor.push("users comparing a known provider against local alternatives");

  // lessIdealFor: derived directly from data signals as clean noun phrases.
  // No interpolation of cons-text strings (which produced ungrammatical output).
  if (total < 15)
    lessIdealFor.push("users who want a large volume of consistent public reviews before deciding");
  if (lowRatedPct > 0.1)
    lessIdealFor.push("users highly sensitive to recurring negative review patterns");
  if (scarringCount > 0)
    lessIdealFor.push("users for whom scarring risk is the deciding factor");
  if (refundCount > 0)
    lessIdealFor.push("users for whom billing or refund disputes would be a non-starter");
  if (!isAffordable && !isMedical)
    lessIdealFor.push("users comparing primarily on price without a firm budget in mind");
  if (!isChain && providers.length === 1)
    lessIdealFor.push("users who want multi-location national coverage");
  if (lessIdealFor.length < 2)
    lessIdealFor.push("users who need more location-specific data before committing");

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
