import { sanity } from '@/lib/sanity'

export type SanityProvider = {
    name: string
    slug: string
    brand?: string | null
    market?: string | null
    specialty?: string | null
    summary?: string | null
    rating?: number | null
    reviewCount?: number | null
    yearsActive?: number | null
    photo?: { url: string; alt: string } | null
    featured?: boolean | null
    tags?: string[]
    seoTitle?: string | null
    seoDescription?: string | null
    seoImage?: { url: string; alt: string } | null
}

const ALL_PROVIDERS_QUERY = `*[_type == "provider"] | order(rating desc) {
    name,
    "slug": slug.current,
    brand,
    market,
    specialty,
    summary,
    rating,
    reviewCount,
    yearsActive,
    photo {
        "url": asset->url,
        alt
    },
    featured,
    tags
}`

const SINGLE_PROVIDER_QUERY = `*[_type == "provider" && slug.current == $slug][0] {
    name,
    "slug": slug.current,
    brand,
    market,
    specialty,
    summary,
    rating,
    reviewCount,
    yearsActive,
    photo {
        "url": asset->url,
        alt
    },
    featured,
    tags,
    seoTitle,
    seoDescription,
    seoImage {
        "url": asset->url,
        alt
    }
}`

export async function getAllProviders(): Promise<SanityProvider[]> {
    try {
        const providers = await sanity.fetch(ALL_PROVIDERS_QUERY)
        return providers ?? []
    } catch {
        return []
    }
}

export async function getProvider(slug: string): Promise<SanityProvider | null> {
    try {
        const provider = await sanity.fetch(SINGLE_PROVIDER_QUERY, { slug })
        return provider ?? null
    } catch {
        return null
    }
}
