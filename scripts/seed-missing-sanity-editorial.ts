/**
 * Seeds editorial documents that exist in code fallbacks but are missing in Sanity.
 *
 * Run from the project root:
 *   npx tsx --env-file=.env.local scripts/seed-missing-sanity-editorial.ts
 */

import { createClient } from "@sanity/client";
import { blogPosts } from "../lib/mock-data/blog-posts";
import { comparisons } from "../lib/mock-data/comparisons";
import { comparisonPages } from "../lib/mock-data/comparison-pages";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_WRITE_TOKEN ?? process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

let keyCounter = 0;
function key() {
  return `k${++keyCounter}`;
}

function block(text: string) {
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}

const missingComparisonSlugs = [
  "removery-vs-medermis-laser-clinic",
  "laseraway-vs-medermis-laser-clinic",
  "removery-vs-inkfree-md",
  "removery-vs-kovak-cosmetic-center",
] as const;

async function upsertBlogPost() {
  const post = blogPosts.find((item) => item.slug === "how-to-choose-a-tattoo-removal-provider");
  if (!post) throw new Error("Missing blog fallback: how-to-choose-a-tattoo-removal-provider");

  await client.createOrReplace({
    _id: `blog-${post.slug}`,
    _type: "blog",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    description: post.description,
    author: post.author,
    date: post.date,
    category: post.category,
    body: post.body.map(block),
  });

  console.log(`✓ blog/${post.slug}`);
}

async function upsertComparison(slug: (typeof missingComparisonSlugs)[number]) {
  const summary = comparisons.find((item) => item.slug === slug);
  const detailed = comparisonPages[slug];
  if (!summary || !detailed) throw new Error(`Missing comparison fallback: ${slug}`);

  const [sideA, sideB] = detailed.prosCons;

  await client.createOrReplace({
    _id: `comparison-${slug}`,
    _type: "comparison",
    title: summary.title,
    slug: { _type: "slug", current: slug },
    description: summary.description,
    providerA: detailed.brandA ?? sideA?.label ?? null,
    providerB: detailed.brandB ?? sideB?.label ?? null,
    verdict: detailed.verdict,
    intro: detailed.intro,
    choiceCards: detailed.choiceCards.map((card) => ({
      _key: key(),
      title: card.title,
      body: card.body,
      bullets: card.bullets,
    })),
    criteriaTitle: detailed.criteriaTitle,
    criteriaPoints: detailed.criteriaPoints,
    consultQuestions: detailed.consultQuestions,
    sourceNote: detailed.sourceNote,
    relatedLinks: detailed.relatedLinks.map((link) => ({
      _key: key(),
      label: link.label,
      href: link.href,
      description: link.description,
    })),
    tableRows: detailed.tableRows.map((row) => ({
      _key: key(),
      criteria: row.criterion,
      valueA: row.left,
      valueB: row.right,
      whyItMatters: row.takeaway,
    })),
    prosA: sideA?.pros ?? [],
    consA: sideA?.cons ?? [],
    prosB: sideB?.pros ?? [],
    consB: sideB?.cons ?? [],
    faqItems: detailed.faqs.map((faq) => ({
      _key: key(),
      question: faq.question,
      answer: faq.answer,
    })),
    seoTitle: detailed.metaTitle,
    seoDescription: detailed.metaDescription,
  });

  console.log(`✓ comparisons/${slug}`);
}

async function main() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required");
  }
  if (!process.env.SANITY_WRITE_TOKEN && !process.env.SANITY_API_TOKEN) {
    throw new Error("SANITY_WRITE_TOKEN or SANITY_API_TOKEN is required");
  }

  await upsertBlogPost();
  for (const slug of missingComparisonSlugs) {
    await upsertComparison(slug);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
