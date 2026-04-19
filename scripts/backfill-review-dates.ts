/**
 * One-time script: backfills review_date_at for all rows using the
 * relative review_date string ("5 days ago", "a year ago", etc.)
 * anchored to the known scrape date of March 29, 2026.
 *
 * Run from project root:
 *   npx tsx scripts/backfill-review-dates.ts
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rxrhvbfutjahgwaambqd.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4cmh2YmZ1dGphaGd3YWFtYnFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNTE3MDcsImV4cCI6MjA5MTkyNzcwN30.d9juaTC-mzWsxtej5MbK0neIZ6bKv73BgtGrMydhLsA";

// The date the reviews were scraped
const SCRAPE_DATE = new Date("2026-03-29T12:00:00.000Z");

const BATCH_SIZE = 50;

// ── Date parser ──────────────────────────────────────────────────────────────
// Takes a relative string like "5 days ago" or "Edited a year ago"
// and returns an ISO date string calculated from SCRAPE_DATE.

function parseRelativeDate(raw: string | null): string | null {
  if (!raw) return null;

  // Strip leading "Edited " prefix
  const cleaned = raw.replace(/^Edited\s+/i, "").trim().toLowerCase();

  const result = new Date(SCRAPE_DATE);

  // "a day ago" / "a week ago" / "a month ago" / "a year ago"
  if (cleaned === "a day ago") {
    result.setDate(result.getDate() - 1);
    return result.toISOString();
  }
  if (cleaned === "a week ago") {
    result.setDate(result.getDate() - 7);
    return result.toISOString();
  }
  if (cleaned === "a month ago") {
    result.setMonth(result.getMonth() - 1);
    return result.toISOString();
  }
  if (cleaned === "a year ago") {
    result.setFullYear(result.getFullYear() - 1);
    return result.toISOString();
  }

  // "N hours ago"
  const hoursMatch = cleaned.match(/^(\d+)\s+hours?\s+ago$/);
  if (hoursMatch) {
    result.setHours(result.getHours() - parseInt(hoursMatch[1], 10));
    return result.toISOString();
  }

  // "N days ago"
  const daysMatch = cleaned.match(/^(\d+)\s+days?\s+ago$/);
  if (daysMatch) {
    result.setDate(result.getDate() - parseInt(daysMatch[1], 10));
    return result.toISOString();
  }

  // "N weeks ago"
  const weeksMatch = cleaned.match(/^(\d+)\s+weeks?\s+ago$/);
  if (weeksMatch) {
    result.setDate(result.getDate() - parseInt(weeksMatch[1], 10) * 7);
    return result.toISOString();
  }

  // "N months ago"
  const monthsMatch = cleaned.match(/^(\d+)\s+months?\s+ago$/);
  if (monthsMatch) {
    result.setMonth(result.getMonth() - parseInt(monthsMatch[1], 10));
    return result.toISOString();
  }

  // "N years ago"
  const yearsMatch = cleaned.match(/^(\d+)\s+years?\s+ago$/);
  if (yearsMatch) {
    result.setFullYear(result.getFullYear() - parseInt(yearsMatch[1], 10));
    return result.toISOString();
  }

  return null;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  console.log("Fetching all reviews...");
  const { data, error } = await supabase
    .from("reviews")
    .select("id, review_date");

  if (error || !data) {
    console.error("Failed to fetch reviews:", error?.message);
    process.exit(1);
  }

  console.log(`Fetched ${data.length} rows`);

  // Parse each row
  const updates = data
    .map((row) => ({
      id: row.id,
      review_date_at: parseRelativeDate(row.review_date),
    }))
    .filter((u) => u.review_date_at !== null);

  const skipped = data.length - updates.length;
  console.log(`Parseable: ${updates.length} | Skipped (null): ${skipped}`);

  // Preview a few so you can sanity-check before it runs
  console.log("\nSample conversions:");
  updates.slice(0, 8).forEach((u) => {
    const original = data.find((r) => r.id === u.id)?.review_date;
    console.log(`  "${original}" → ${u.review_date_at?.slice(0, 10)}`);
  });

  // Upload in batches
  let updated = 0;
  let errors = 0;

  for (let i = 0; i < updates.length; i += BATCH_SIZE) {
    const batch = updates.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(updates.length / BATCH_SIZE);

    // Supabase doesn't support bulk update with different values per row,
    // so we update each row individually within the batch in parallel.
    const results = await Promise.all(
      batch.map((u) =>
        supabase
          .from("reviews")
          .update({ review_date_at: u.review_date_at })
          .eq("id", u.id)
      )
    );

    const batchErrors = results.filter((r) => r.error).length;
    errors += batchErrors;
    updated += batch.length - batchErrors;

    console.log(`Batch ${batchNum}/${totalBatches} done (${updated} updated so far)`);
  }

  console.log(`\nDone. Updated: ${updated} | Skipped null dates: ${skipped} | Errors: ${errors}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
