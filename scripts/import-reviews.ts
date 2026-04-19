/**
 * One-time script: imports reviews-all-export.csv into Supabase.
 *
 * Run from project root:
 *   npx tsx scripts/import-reviews.ts
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";

// ── Config ──────────────────────────────────────────────────────────────────

const CSV_PATH = path.resolve(
  "/Users/rinar/Documents/reviewscraper/reviews-all-export.csv"
);

const SUPABASE_URL = "https://rxrhvbfutjahgwaambqd.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4cmh2YmZ1dGphaGd3YWFtYnFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNTE3MDcsImV4cCI6MjA5MTkyNzcwN30.d9juaTC-mzWsxtej5MbK0neIZ6bKv73BgtGrMydhLsA";

const BATCH_SIZE = 100;

// ── CSV parser ───────────────────────────────────────────────────────────────
// Handles quoted fields that contain commas and newlines.

function parseCsv(raw: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    const next = raw[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        // escaped quote inside a quoted field
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        row.push(field);
        field = "";
      } else if (ch === "\r" && next === "\n") {
        row.push(field);
        field = "";
        rows.push(row);
        row = [];
        i++; // skip \n
      } else if (ch === "\n") {
        row.push(field);
        field = "";
        rows.push(row);
        row = [];
      } else {
        field += ch;
      }
    }
  }

  // last field / row
  if (field || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Reading CSV...");
  const raw = fs.readFileSync(CSV_PATH, "utf-8");
  const rows = parseCsv(raw);

  const [header, ...dataRows] = rows;
  console.log(`Columns: ${header.join(", ")}`);
  console.log(`Total rows: ${dataRows.length}`);

  // Map column names to indexes
  const col = (name: string) => header.indexOf(name);

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  const now = new Date().toISOString();
  let inserted = 0;
  let skipped = 0;
  let errors = 0;

  // Build all records first
  const records = dataRows
    .filter((row) => {
      const text = row[col("review_text")]?.trim();
      if (!text) {
        skipped++;
        return false;
      }
      return true;
    })
    .map((row) => {
      const providerName = row[col("provider_name")] ?? "";
      const city = row[col("location_city")] ?? "";
      const state = row[col("location_state")] ?? "";
      const painRaw = row[col("pain_level")] ?? "unknown";
      const scarringRaw = row[col("scarring_mentioned")] ?? null;
      const skinRaw = row[col("skin_type")] ?? "unknown";
      const useCaseRaw = row[col("use_case")] ?? "unknown";
      const sentimentRaw = row[col("sentiment")] ?? "unknown";
      const ratingRaw = row[col("star_rating")];

      return {
        id: crypto.randomUUID(),
        provider_name: providerName,
        location_city: city,
        location_state: state,
        method_used: row[col("method_used")] || null,
        review_text: row[col("review_text")],
        star_rating: ratingRaw ? Number(ratingRaw) : null,
        review_date: row[col("review_date")] || null,
        review_date_at: null,
        reviewer_name: row[col("reviewer_name")] || null,
        verified_source: row[col("verified_source")] ?? "Unknown",
        _place_title: row[col("_place_title")] || null,
        source_review_url: null,
        pain_level: (["1","2","3","4","5","unknown"].includes(painRaw) ? painRaw : "unknown") as string,
        scarring_mentioned: (["Yes","No","Positive"].includes(scarringRaw ?? "") ? scarringRaw : null) as string | null,
        sessions_completed: row[col("sessions_completed")] || null,
        skin_type: (["Light","Medium","Dark","unknown"].includes(skinRaw) ? skinRaw : "unknown") as string,
        use_case: (["Complete","Cover-up","Microblading","Color","Other","unknown"].includes(useCaseRaw) ? useCaseRaw : "unknown") as string,
        result_rating: (["Positive","Neutral","Mixed","Negative","unknown"].includes(sentimentRaw) ? sentimentRaw : "unknown") as string,
        imported_at: now,
      };
    });

  console.log(`\nRecords to insert: ${records.length} (skipped ${skipped} empty)`);

  // Upload in batches
  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(records.length / BATCH_SIZE);

    const { error } = await supabase.from("reviews").insert(batch);

    if (error) {
      console.error(`Batch ${batchNum}/${totalBatches} FAILED:`, error.message);
      errors++;
    } else {
      inserted += batch.length;
      console.log(`Batch ${batchNum}/${totalBatches} done (${inserted} inserted so far)`);
    }
  }

  console.log(`\nDone. Inserted: ${inserted} | Skipped empty: ${skipped} | Failed batches: ${errors}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
