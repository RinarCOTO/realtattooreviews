import { sanity } from "@/lib/sanity";
import type { PortableTextBlock } from "@portabletext/react";

const HOMEPAGE_QUERY = `*[_type == "homepage"][0]{
    heroHeadline,
    heroSubheadline,
    howItWorksSteps,
    faqItems,
    seoTitle,
    seoDescription,
    seoImage {
        "url": asset->url,
        alt
    }
    }`;

export type HomepageCMSData = {
    heroHeadline:    string | null;
    heroSubheadline: PortableTextBlock[] | null;
    howItWorksSteps: Array<{
        stepNumber: string;
        title:      string;
        body:       PortableTextBlock[];
    }>;
    faqItems: Array<{
        question: string;
        answer:   PortableTextBlock[];
    }>;
    seoTitle?: string | null;
    seoDescription?: string | null;
    seoImage?: { url: string; alt: string } | null;
};

export async function getHomepageCMS(): Promise<HomepageCMSData | null> {
    try {
        const data = await sanity.fetch(HOMEPAGE_QUERY);
        return data ?? null;
    } catch {
        return null;
    }
}