import { sanity } from '@/lib/sanity'
import type { PortableTextBlock } from '@portabletext/react'

export type SanityGuide = {
    title: string
    slug: string
    description: string
    author?: string | null
    image?: { url: string; alt: string } | null
    body?: PortableTextBlock[]
    faqItems?: { question: string; answer: string }[] | null
    seoTitle?: string | null
    seoDescription?: string | null
    seoImage?: { url: string; alt: string } | null
}

const ALL_GUIDES_QUERY = `*[_type == "guide"] | order(_createdAt asc) {
    title,
    "slug": slug.current,
    description,
    image {
        "url": asset->url,
        alt
    }
}`

const SINGLE_GUIDE_QUERY = `*[_type == "guide" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    description,
    author,
    body,
    faqItems[] {
        question,
        answer
    },
    image {
        "url": asset->url,
        alt
    },
    seoTitle,
    seoDescription,
    seoImage {
        "url": asset->url,
        alt
    }
}`

const ALL_GUIDE_SLUGS_QUERY = `*[_type == "guide"]{ "slug": slug.current }`

export async function getAllGuides(): Promise<SanityGuide[]> {
    try {
        const guides = await sanity.fetch(ALL_GUIDES_QUERY)
        return guides ?? []
    } catch {
        return []
    }
}

export async function getGuide(slug: string): Promise<SanityGuide | null> {
    try {
        const guide = await sanity.fetch(SINGLE_GUIDE_QUERY, { slug })
        return guide ?? null
    } catch {
        return null
    }
}

export async function getAllGuideSlugs(): Promise<string[]> {
    try {
        const results = await sanity.fetch(ALL_GUIDE_SLUGS_QUERY)
        return (results ?? []).map((r: { slug: string }) => r.slug).filter(Boolean)
    } catch {
        return []
    }
}
