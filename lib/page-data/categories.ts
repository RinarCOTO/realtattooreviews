import { sanity } from '@/lib/sanity'

export type SanityCategory = {
    title: string
    slug: string
    description: string
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
