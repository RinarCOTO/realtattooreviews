import { sanity } from '@/lib/sanity'
import type { PortableTextBlock } from '@portabletext/react'

export type SanityComparison = {
    title: string
    slug: string
    description: string
    providerA?: string | null
    providerB?: string | null
    body?: PortableTextBlock[]
    seoTitle?: string | null
    seoDescription?: string | null
    seoImage?: { url: string; alt: string } | null
}

const ALL_COMPARISONS_QUERY = `*[_type == "comparison"] | order(_createdAt asc) {
    title,
    "slug": slug.current,
    description,
    providerA,
    providerB
}`

const SINGLE_COMPARISON_QUERY = `*[_type == "comparison" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    description,
    providerA,
    providerB,
    body,
    seoTitle,
    seoDescription,
    seoImage {
        "url": asset->url,
        alt
    }
}`

const ALL_COMPARISON_SLUGS_QUERY = `*[_type == "comparison"]{ "slug": slug.current }`

export async function getAllComparisons(): Promise<SanityComparison[]> {
    try {
        const comparisons = await sanity.fetch(ALL_COMPARISONS_QUERY)
        return comparisons ?? []
    } catch {
        return []
    }
}

export async function getComparison(slug: string): Promise<SanityComparison | null> {
    try {
        const comparison = await sanity.fetch(SINGLE_COMPARISON_QUERY, { slug })
        return comparison ?? null
    } catch {
        return null
    }
}

export async function getAllComparisonSlugs(): Promise<string[]> {
    try {
        const results = await sanity.fetch(ALL_COMPARISON_SLUGS_QUERY)
        return (results ?? []).map((r: { slug: string }) => r.slug).filter(Boolean)
    } catch {
        return []
    }
}
