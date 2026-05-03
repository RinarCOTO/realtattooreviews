import type { Metadata } from "next";
import { Inter, Inter_Tight, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { organizationSchema } from "@/lib/seo/schema";
import { getDataFreshness } from "@/lib/data/reviews";
import { DevProvider } from "@/components/dev/DevContext";

const satoshi = localFont({
  src: "../public/fonts/satoshi/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

const siteUrl = "https://realtattooreviews.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RealTattooReviews | Compare Tattoo Removal Clinics Before You Book",
    template: "%s | RealTattooReviews",
  },
  description:
    "Compare tattoo removal clinics, read real reviews, and explore clear ratings, provider profiles, and location-based research before you book.",
  openGraph: {
    type: "website",
    siteName: "RealTattooReviews",
    title: "RealTattooReviews | Compare Tattoo Removal Clinics Before You Book",
    description:
      "Compare tattoo removal clinics, read real reviews, and explore clear ratings, provider profiles, and location-based research before you book.",
    url: siteUrl,
    // The OG image is generated at build time by app/opengraph-image.tsx
    // (Next.js App Router file convention). No `images` entry is needed
    // here — Next.js merges the generated image into the metadata. Adding
    // a manual entry would override the dynamic version with a stale
    // static asset.
  },
  twitter: {
    card: "summary_large_image",
    title: "RealTattooReviews | Compare Tattoo Removal Clinics Before You Book",
    description:
      "Compare tattoo removal clinics, read real reviews, and explore clear ratings, provider profiles, and location-based research before you book.",
    // Twitter card image is also handled by app/opengraph-image.tsx via
    // the file convention; an explicit `images` entry would override the
    // generated card, so it is intentionally omitted.
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dataLastUpdated = await getDataFreshness();
  return (
    <html lang="en" className={`${satoshi.variable} ${instrumentSerif.variable} ${inter.variable} ${interTight.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-body" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        {process.env.NODE_ENV === "development" ? (
          <DevProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer dataLastUpdated={dataLastUpdated} />
          </DevProvider>
        ) : (
          <>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer dataLastUpdated={dataLastUpdated} />
          </>
        )}
      </body>
    </html>
  );
}
