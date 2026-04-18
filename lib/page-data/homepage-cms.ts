import { sanity } from "@/lib/sanity";
import type { PortableTextBlock } from "@portabletext/react";

const HOMEPAGE_QUERY = `*[_type == "homepage"][0]{
    heroHeadline,
    heroSubheadline,
    howItWorksSteps,
    faqItems
    }`;

export type HomepageCMSData = {
    heroHeadline:    string | null;
    heroSubheadline: PortableTextBlock[] | null; // rich text — supports bold, italic
    howItWorksSteps: Array<{
        stepNumber: string;
        title:      string;
        body:       PortableTextBlock[]; // rich text
    }>;
    faqItems: Array<{
        question: string;
        answer:   PortableTextBlock[]; // rich text
    }>;
};

export async function getHomepageCMS(): Promise<HomepageCMSData> {
    const data = await sanity.fetch(HOMEPAGE_QUERY);
    return data;
}