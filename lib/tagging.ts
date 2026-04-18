/**
 * lib/tagging.ts
 *
 * Homepage review tag derivation.
 *
 * Tags are assigned only when the review text explicitly states the condition —
 * never inferred from sentiment or structured columns alone.
 *
 * Update cadence: this file is intended to be updated independently of the
 * data layer. Adjust patterns, labels, priority order, or the max-tag cap here
 * without touching lib/data/reviews.ts.
 */

/** Maximum number of tags to surface on a homepage card. */
export const MAX_HOMEPAGE_TAGS = 4;

/**
 * Derive homepage tags from raw review text.
 *
 * Tags are evaluated in priority order — the first MAX_HOMEPAGE_TAGS
 * that match are returned. Adjust the order below to change what
 * surfaces when multiple signals are present.
 */
export function buildReviewTags(reviewText: string): string[] {
  const t = reviewText.toLowerCase();
  const tags: string[] = [];

  // ── Negative / safety signals — highest priority ─────────────────────────

  // Scarring reported — explicit scar, keloid, or permanent skin damage
  if (/\b(scarring?|keloid|permanent (skin )?damage|skin damage|scarred)\b/.test(t)) {
    tags.push("Scarring reported");
  }

  // Refund issue — explicit refund conflict, dispute, or billing complaint
  if (/\b(refund|dispute|chargeback|money back|billing issue|refused.{0,15}refund|partial refund|charge conflict)\b/.test(t)) {
    tags.push("Refund issue");
  }

  // Healing issues — explicit blistering, swelling, infection, prolonged healing
  if (/\b(blister(ing|ed|s)?|swelling|swelled|infect(ion|ed)?|prolonged heal|slow(er)? heal(ing)?|skin recover|raw skin)\b/.test(t)) {
    tags.push("Healing issues");
  }

  // Pain mentioned — explicit pain, discomfort, or noted absence of pain
  if (/\b(pain(ful)?|hurt(s|ing)?|discomfort|didn'?t hurt|no pain|sting(ing|s)?|burning|sore|tolerable)\b/.test(t)) {
    tags.push("Pain mentioned");
  }

  // ── Practical info ───────────────────────────────────────────────────────

  // Session count — explicit numeric count of sessions/treatments/visits
  const sessionMatch = t.match(/\b(\d+)\s+(sessions?|treatments?|visits?)\b/);
  if (sessionMatch) {
    const n = parseInt(sessionMatch[1], 10);
    tags.push(`${n} ${n === 1 ? "session" : "sessions"}`);
  }

  // Cost mentioned — explicit price, payment, or money reference
  if (/(\$\d|\b(price|cost(ing)?|paid|payment|expensive|cheap|affordable|quote|deposit|financ(ing|ed)?|package deal|fee|billing|overcharged)\b)/.test(t)) {
    tags.push("Cost mentioned");
  }

  // ── Outcome signals ──────────────────────────────────────────────────────

  // Results mentioned — explicit fading, removal outcome, or progress note
  if (/\b(fad(e|ed|ing)|cleared?|no progress|lighter|result(s)?|outcome|removal (success|fail)|complet(e|ed) removal|still visible|barely noticeable|significant(ly)? (faded?|lighter))\b/.test(t)) {
    tags.push("Results mentioned");
  }

  // Staff praised — explicit positive mention of staff, skill, or communication
  if (/\b(staff|technician|tech\b|nurse|doctor|dr\.|friendly|kindness?|professional(ism)?|helpful|caring|compassionate|skilled?|knowledgeable|warm (and )?welcoming|great communication)\b/.test(t)) {
    tags.push("Staff praised");
  }

  return tags.slice(0, MAX_HOMEPAGE_TAGS);
}
