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

const SINGLE_CATEGORY_QUERY = `*[_type == "category" && slug.current == $slug][0] {
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

export async function getAllCategories(): Promise<SanityCategory[]> {
    try {
        const categories = await sanity.fetch(ALL_CATEGORIES_QUERY)
        return categories ?? []
    } catch {
        return []
    }
}

export async function getCategory(slug: string): Promise<SanityCategory | null> {
    try {
        const category = await sanity.fetch(SINGLE_CATEGORY_QUERY, { slug })
        return category ?? null
    } catch {
        return null
    }
}

export async function getAllCategorySlugs(): Promise<string[]> {
    try {
        const results = await sanity.fetch(`*[_type == "category"]{ "slug": slug.current }`)
        return (results ?? []).map((r: { slug: string }) => r.slug).filter(Boolean)
    } catch {
        return []
    }
}
