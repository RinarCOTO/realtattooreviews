import { sanity } from '@/lib/sanity'

export type SanityCity = {
    name: string
    slug: string
    description?: string | null
    providerCount?: number | null
    reviewCount?: number | null
    seoTitle?: string | null
    seoDescription?: string | null
    seoImage?: { url: string; alt: string } | null
}

const ALL_CITIES_QUERY = `*[_type == "city"] | order(name asc) {
    name,
    "slug": slug.current,
    description,
    providerCount,
    reviewCount
}`

const SINGLE_CITY_QUERY = `*[_type == "city" && slug.current == $slug][0] {
    name,
    "slug": slug.current,
    description,
    providerCount,
    reviewCount,
    seoTitle,
    seoDescription,
    seoImage {
        "url": asset->url,
        alt
    }
}`

export async function getAllCities(): Promise<SanityCity[]> {
    try {
        const cities = await sanity.fetch(ALL_CITIES_QUERY)
        return cities ?? []
    } catch {
        return []
    }
}

export async function getCity(slug: string): Promise<SanityCity | null> {
    try {
        const city = await sanity.fetch(SINGLE_CITY_QUERY, { slug })
        return city ?? null
    } catch {
        return null
    }
}
