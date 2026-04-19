import { sanity } from "@/lib/sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/react";

const builder = imageUrlBuilder(sanity);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

type SanityImageSource = {
  asset: { _ref: string };
  hotspot?: { x: number; y: number };
};

export type SanityBlogPost = {
  title: string;
  slug: string;
  description: string;
  author: string;
  date: string;
  category: string;
  featuredImage?: { _ref: string; url: string; alt: string } | null;
  seoImage?: { _ref: string; url: string; alt: string } | null;
  body?: PortableTextBlock[];
};

const ALL_POSTS_QUERY = `*[_type == "blog"] | order(date desc) {
  title,
  "slug": slug.current,
  description,
  author,
  date,
  category,
  featuredImage {
    "_ref": asset._ref,
    "url": asset->url,
    alt
  }
}`;

const SINGLE_POST_QUERY = `*[_type == "blog" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  description,
  author,
  date,
  category,
  body,
  featuredImage {
    "_ref": asset._ref,
    "url": asset->url,
    alt
  },
  seoImage {
    "_ref": asset._ref,
    "url": asset->url,
    alt
  }
}`;

const ALL_SLUGS_QUERY = `*[_type == "blog"]{ "slug": slug.current }`;

export async function getAllBlogPosts(): Promise<SanityBlogPost[]> {
  try {
    const posts = await sanity.fetch(ALL_POSTS_QUERY);
    return posts ?? [];
  } catch {
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<SanityBlogPost | null> {
  try {
    const post = await sanity.fetch(SINGLE_POST_QUERY, { slug });
    return post ?? null;
  } catch {
    return null;
  }
}

export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const results = await sanity.fetch(ALL_SLUGS_QUERY);
    return (results ?? []).map((r: { slug: string }) => r.slug).filter(Boolean);
  } catch {
    return [];
  }
}
