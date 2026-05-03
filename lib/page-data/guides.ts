import { sanity } from '@/lib/sanity'
import type { PortableTextBlock } from '@portabletext/react'

export type SanityGuideSection = {
    heading: string
    body: PortableTextBlock[]
}

export type SanityRelatedLink = {
    href: string
    title: string
    desc: string
}

export type SanityGuide = {
    title: string
    slug: string
    description: string
    intro?: string | null
    author?: string | null
    image?: { url: string; alt: string } | null
    sections?: SanityGuideSection[] | null
    relatedLinks?: SanityRelatedLink[] | null
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
    intro,
    author,
    sections[] {
        heading,
        body
    },
    relatedLinks[] {
        href,
        title,
        desc
    },
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

// Lightweight query for just the review-date metadata. Used by static guide
// pages (laser, non-laser) so the "Last reviewed" stamp can be edited in
// Sanity without a redeploy. Returns dateModified preferentially, with
// datePublished as the fallback for fresh docs that have not been re-reviewed
// yet.
const GUIDE_REVIEW_DATE_QUERY = `*[_type == "guide" && slug.current == $slug][0]{
    dateModified,
    datePublished
}`

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
        const guide = await sanity.fetch(SINGLE_GUIDE_QUERY, { slug }, { next: { revalidate: 60 } })
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

/**
 * Fetch a guide's review-date metadata from Sanity for the given slug.
 *
 * Returns an ISO date string (YYYY-MM-DD) if the doc exists and has
 * dateModified or datePublished set. Returns null when:
 *   - Sanity has no doc for the slug
 *   - Both date fields are empty
 *   - The Sanity request fails (network, parse, etc.)
 *
 * Callers (currently the static laser and non-laser guide pages) should
 * always supply a hardcoded fallback date so the build does not surface a
 * blank "Last reviewed" line if Sanity is unreachable.
 */
export async function getGuideReviewDate(slug: string): Promise<string | null> {
    try {
        const result = await sanity.fetch<{
            dateModified?: string | null
            datePublished?: string | null
        } | null>(
            GUIDE_REVIEW_DATE_QUERY,
            { slug },
            { next: { revalidate: 60 } }
        )
        if (!result) return null
        return result.dateModified ?? result.datePublished ?? null
    } catch {
        return null
    }
}

/**
 * Format an ISO date (YYYY-MM-DD) as "Month D, YYYY". Returns the supplied
 * fallback string when the input is null, undefined, or unparseable.
 *
 * Use this with `getGuideReviewDate` so static guide pages can render an
 * editor-controlled date when Sanity is set up, and a hardcoded date
 * otherwise.
 */
export function formatGuideReviewDate(
    iso: string | null | undefined,
    fallback: string
): string {
    if (!iso) return fallback
    // Append T00:00:00 so the date is interpreted in local time and not
    // shifted backwards by the UTC parse default.
    const d = new Date(`${iso}T00:00:00`)
    if (Number.isNaN(d.getTime())) return fallback
    return d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}
