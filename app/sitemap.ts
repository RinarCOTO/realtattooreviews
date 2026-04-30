import type { MetadataRoute } from "next";
import { sanity } from "@/lib/sanity";

const BASE_URL = "https://realtattooreviews.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`,                    priority: 1.0, changeFrequency: "daily" },
    { url: `${BASE_URL}/providers`,          priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE_URL}/reviews`,            priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE_URL}/categories`,         priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE_URL}/comparisons`,                          priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE_URL}/comparisons/picoway-vs-q-switch`,      priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/guides`,             priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE_URL}/blog`,               priority: 0.7, changeFrequency: "daily" },
    { url: `${BASE_URL}/cities`,             priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/cost`,               priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/before-and-after`,   priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/methodology`,        priority: 0.5, changeFrequency: "yearly" },
    { url: `${BASE_URL}/editorial-policy`,   priority: 0.5, changeFrequency: "yearly" },
    { url: `${BASE_URL}/about`,              priority: 0.4, changeFrequency: "yearly" },
    { url: `${BASE_URL}/contact`,            priority: 0.3, changeFrequency: "yearly" },
  ];

  const [blogs, guides, categories, comparisons, providers, cities] =
    await Promise.all([
      sanity.fetch<{ slug: string }[]>(`*[_type == "blog" && defined(slug.current)]{ "slug": slug.current }`),
      sanity.fetch<{ slug: string }[]>(`*[_type == "guide" && defined(slug.current)]{ "slug": slug.current }`),
      sanity.fetch<{ slug: string }[]>(`*[_type == "category" && defined(slug.current)]{ "slug": slug.current }`),
      sanity.fetch<{ slug: string }[]>(`*[_type == "comparison" && defined(slug.current)]{ "slug": slug.current }`),
      sanity.fetch<{ slug: string }[]>(`*[_type == "provider" && defined(slug.current)]{ "slug": slug.current }`),
      sanity.fetch<{ slug: string }[]>(`*[_type == "city" && defined(slug.current)]{ "slug": slug.current }`),
    ]);

  const blogUrls: MetadataRoute.Sitemap = blogs.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const guideUrls: MetadataRoute.Sitemap = guides.map((p) => ({
    url: `${BASE_URL}/guides/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((p) => ({
    url: `${BASE_URL}/categories/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const comparisonUrls: MetadataRoute.Sitemap = comparisons.map((p) => ({
    url: `${BASE_URL}/comparisons/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const providerUrls: MetadataRoute.Sitemap = providers.map((p) => ({
    url: `${BASE_URL}/reviews/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const cityUrls: MetadataRoute.Sitemap = cities.map((p) => ({
    url: `${BASE_URL}/cities/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...blogUrls,
    ...guideUrls,
    ...categoryUrls,
    ...comparisonUrls,
    ...providerUrls,
    ...cityUrls,
  ];
}
