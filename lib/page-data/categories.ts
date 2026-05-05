import { unstable_cache } from 'next/cache'
import { sanity } from '@/lib/sanity'
import type { PortableTextBlock } from '@portabletext/react'

export type SanityCategorySection = {
    heading: string
    body: PortableTextBlock[]
}

export type SanityRelatedLink = {
    href: string
    title: string
    desc: string
}

export type SanityCategory = {
    title: string
    slug: string
    description: string
    intro?: string | null
    sections?: SanityCategorySection[] | null
    faqItems?: { question: string; answer: string }[] | null
    relatedLinks?: SanityRelatedLink[] | null
    seoTitle?: string | null
    seoDescription?: string | null
    seoImage?: { url: string; alt: string } | null
}

const ALL_CATEGORIES_QUERY = `*[_type == "category"] | order(title asc) {
    title,
    "slug": slug.current,
    description
}`

// When duplicate category docs exist for the same slug (e.g. an empty stub
// alongside a fully-seeded doc), prefer the one that has `sections` defined.
const SINGLE_CATEGORY_QUERY = `*[_type == "category" && slug.current == $slug] | order(defined(sections) desc, _updatedAt desc)[0] {
    title,
    "slug": slug.current,
    description,
    intro,
    sections[] {
        heading,
        body
    },
    faqItems[] {
        question,
        answer
    },
    relatedLinks[] {
        href,
        title,
        desc
    },
    seoTitle,
    seoDescription,
    seoImage {
        "url": asset->url,
        alt
    }
}`

async function getAllCategoriesRaw(): Promise<SanityCategory[]> {
    try {
        const categories = await sanity.fetch(ALL_CATEGORIES_QUERY)
        return categories ?? []
    } catch {
        return []
    }
}

export const getAllCategories = unstable_cache(
    getAllCategoriesRaw,
    ['all-categories'],
    { revalidate: 3600 },
)

async function getCategoryRaw(slug: string): Promise<SanityCategory | null> {
    try {
        const category = await sanity.fetch(SINGLE_CATEGORY_QUERY, { slug })
        return category ?? null
    } catch {
        return null
    }
}

export const getCategory = unstable_cache(
    getCategoryRaw,
    ['category-by-slug'],
    { revalidate: 3600 },
)

async function getAllCategorySlugsRaw(): Promise<string[]> {
    try {
        // Only return slugs whose doc has sections. Avoids static-building empty stub docs.
        // when duplicate category docs exist for the same slug (orphan or unseeded entries).
        const results = await sanity.fetch(
            `*[_type == "category" && defined(sections)]{ "slug": slug.current }`,
        )
        const slugs = (results ?? []).map((r: { slug: string }) => r.slug).filter(Boolean)
        return Array.from(new Set<string>(slugs))
    } catch {
        return []
    }
}

export const getAllCategorySlugs = unstable_cache(
    getAllCategorySlugsRaw,
    ['all-category-slugs'],
    { revalidate: 3600 },
)
