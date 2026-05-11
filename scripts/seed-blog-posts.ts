/**
 * Seeds blog posts from the local drafts/ directory into Sanity.
 *
 * Each .md file in drafts/ must have:
 *   - YAML-style frontmatter at the top (slug, title, seoTitle, description,
 *     date, category, author, canonical)
 *   - An editor-only "Strategy notes" section
 *   - A delimiter line: `# Post body (publication content begins here)`
 *   - The publishable body in markdown after that line
 *
 * Run from the project root:
 *   npx tsx --env-file=.env.local scripts/seed-blog-posts.ts
 *
 * Idempotent: uses createOrReplace with a stable _id of `blog-{slug}`.
 *
 * Required env vars:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_WRITE_TOKEN
 */

import { createClient } from "@sanity/client";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const DRAFTS_DIR = join(process.cwd(), "drafts");
const BODY_DELIMITER = "# Post body (publication content begins here)";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_WRITE_TOKEN ?? process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

let keyCounter = 0;
function key(): string {
  return `k${++keyCounter}`;
}

// ── Frontmatter parser ──────────────────────────────────────────────────────

function parseFrontmatter(raw: string): Record<string, string> {
  if (!raw.startsWith("---")) return {};
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return {};
  const block = raw.slice(3, end).trim();
  const out: Record<string, string> = {};
  for (const line of block.split("\n")) {
    const m = line.match(/^([a-zA-Z][a-zA-Z0-9_]*):\s*(.+)$/);
    if (m) out[m[1]] = m[2].trim();
  }
  return out;
}

// ── Markdown to PortableText converter ──────────────────────────────────────
//
// Handles: H2/H3 headings, paragraphs, bullet lists, inline links, bold (**).
// Tables are flattened to a "Header , Row" bullet list since the default
// Sanity block schema does not include a table type. Strong text uses the
// "strong" mark.

type Span = { _type: "span"; _key: string; text: string; marks: string[] };
type MarkDef = { _type: "link"; _key: string; href: string };
type Block = {
  _type: "block";
  _key: string;
  style: "normal" | "h2" | "h3";
  markDefs: MarkDef[];
  listItem?: "bullet";
  level?: number;
  children: Span[];
};

/**
 * Tokenize a single line of inline markdown into a list of spans and the
 * markDefs they reference. Handles **bold** and [text](href).
 */
function tokenizeInline(line: string): { spans: Span[]; markDefs: MarkDef[] } {
  const spans: Span[] = [];
  const markDefs: MarkDef[] = [];

  // Match either a link [text](href) or a bold **text** segment.
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  const push = (text: string, marks: string[]) => {
    if (!text) return;
    spans.push({ _type: "span", _key: key(), text, marks });
  };

  while ((match = pattern.exec(line)) !== null) {
    const start = match.index;
    const end = pattern.lastIndex;
    if (start > cursor) push(line.slice(cursor, start), []);

    if (match[1] && match[2]) {
      // Link
      const linkKey = key();
      markDefs.push({ _type: "link", _key: linkKey, href: match[2] });
      push(match[1], [linkKey]);
    } else if (match[3]) {
      // Bold
      push(match[3], ["strong"]);
    }
    cursor = end;
  }
  if (cursor < line.length) push(line.slice(cursor), []);
  return { spans, markDefs };
}

function blockFromLine(
  style: Block["style"],
  text: string,
  listItem?: "bullet"
): Block {
  const { spans, markDefs } = tokenizeInline(text);
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs,
    ...(listItem ? { listItem, level: 1 } : {}),
    children: spans.length > 0 ? spans : [{ _type: "span", _key: key(), text, marks: [] }],
  };
}

/**
 * Convert a markdown table block (array of lines starting with `|`) into a
 * flattened bulleted list. The first non-separator row is treated as the
 * header. Each data row becomes a bullet of the form "col1: header1 , col2: header2".
 */
function tableToBullets(lines: string[]): Block[] {
  const rows = lines
    .filter((l) => l.trim().startsWith("|") && !/^\s*\|[\s\-|:]+\|\s*$/.test(l))
    .map((l) =>
      l
        .trim()
        .replace(/^\||\|$/g, "")
        .split("|")
        .map((c) => c.trim())
    );
  if (rows.length === 0) return [];
  const header = rows[0];
  const body = rows.slice(1);
  if (body.length === 0) return [];
  const intro = blockFromLine("normal", `**${header.join(" / ")}**`);
  const bullets = body.map((cells) => {
    const text = cells
      .map((cell, i) => (header[i] ? `${header[i]}: ${cell}` : cell))
      .join(". ");
    return blockFromLine("normal", text, "bullet");
  });
  return [intro, ...bullets];
}

function markdownToBlocks(md: string): Block[] {
  const lines = md.split("\n");
  const out: Block[] = [];
  let tableBuffer: string[] = [];

  const flushTable = () => {
    if (tableBuffer.length > 0) {
      out.push(...tableToBullets(tableBuffer));
      tableBuffer = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.replace(/\s+$/, "");

    // Skip the body-delimiter heading itself and the H1 (we already have title in frontmatter)
    if (line.startsWith("# ")) continue;

    if (line.trim().startsWith("|")) {
      tableBuffer.push(line);
      continue;
    } else {
      flushTable();
    }

    if (!line.trim()) continue;

    if (line.startsWith("## ")) {
      out.push(blockFromLine("h2", line.slice(3).trim()));
    } else if (line.startsWith("### ")) {
      out.push(blockFromLine("h3", line.slice(4).trim()));
    } else if (line.startsWith("- ")) {
      out.push(blockFromLine("normal", line.slice(2).trim(), "bullet"));
    } else {
      out.push(blockFromLine("normal", line.trim()));
    }
  }
  flushTable();
  return out;
}

// ── Per-file driver ─────────────────────────────────────────────────────────

async function seedFile(filename: string): Promise<void> {
  const path = join(DRAFTS_DIR, filename);
  const raw = readFileSync(path, "utf8");

  const fm = parseFrontmatter(raw);
  const required = ["slug", "title", "description", "date", "category", "author"];
  for (const k of required) {
    if (!fm[k]) throw new Error(`drafts/${filename}: missing frontmatter "${k}"`);
  }

  const delimiterIdx = raw.indexOf(BODY_DELIMITER);
  if (delimiterIdx === -1) {
    throw new Error(
      `drafts/${filename}: missing body delimiter "${BODY_DELIMITER}"`
    );
  }
  const bodyMd = raw.slice(delimiterIdx + BODY_DELIMITER.length).trim();
  const body = markdownToBlocks(bodyMd);

  const doc = {
    _id: `blog-${fm.slug}`,
    _type: "blog",
    title: fm.title,
    slug: { _type: "slug", current: fm.slug },
    description: fm.description,
    author: fm.author,
    date: fm.date,
    category: fm.category,
    ...(fm.seoTitle ? { seoTitle: fm.seoTitle } : {}),
    body,
  };

  await client.createOrReplace(doc);
  console.log(
    `✓ seeded blog/${fm.slug}  (${body.length} blocks, ${bodyMd.length} chars source)`
  );
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  if (!process.env.SANITY_WRITE_TOKEN && !process.env.SANITY_API_TOKEN) {
    throw new Error(
      "SANITY_WRITE_TOKEN (or SANITY_API_TOKEN) is required. Add it to .env.local and run with --env-file=.env.local."
    );
  }
  const files = readdirSync(DRAFTS_DIR).filter(
    (f) => f.startsWith("blog-") && f.endsWith(".md")
  );
  if (files.length === 0) {
    console.log("No drafts found in drafts/.");
    return;
  }
  console.log(`Found ${files.length} draft(s):`);
  for (const f of files) console.log(`  ${f}`);
  console.log("");
  for (const f of files) {
    await seedFile(f);
  }
  console.log("");
  console.log("Done. Verify on staging once Vercel rebuilds, or query Sanity directly:");
  console.log(`  curl 'https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=*%5B_type%3D%3D%22blog%22%5D%7Bslug%7D'`);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
