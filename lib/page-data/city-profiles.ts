import { sanity } from '@/lib/sanity'
import { getCityProfiles, type CityProviderProfile } from '@/lib/data/city-profiles'

type SanityCityProviderProfile = {
    name: string
    href?: string | null
    body: string
    bestFor?: string[] | null
    lessIdealFor?: string[] | null
    order?: number | null
}

const QUERY = `
  *[_type == "cityProviderProfile" && city == $city] | order(order asc, name asc) {
    name,
    href,
    body,
    bestFor,
    lessIdealFor,
    order,
  }
`

function toProfile(s: SanityCityProviderProfile): CityProviderProfile {
    return {
        name: s.name,
        href: s.href ?? undefined,
        body: s.body,
        bestFor: s.bestFor ?? [],
        lessIdealFor: s.lessIdealFor ?? [],
    }
}

export async function getCityProviderProfiles(city: string): Promise<CityProviderProfile[]> {
    try {
        const results = await sanity.fetch<SanityCityProviderProfile[]>(QUERY, { city: city.toLowerCase() })
        if (results && results.length > 0) {
            return results.map(toProfile)
        }
    } catch {
        // fall through to static data
    }
    return getCityProfiles(city)
}
