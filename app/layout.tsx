import type { Metadata } from "next";
import { Inter, Inter_Tight, Instrument_Serif, Space_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { organizationSchema } from "@/lib/seo/schema";
import { getDataFreshness } from "@/lib/data/reviews";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const dmMono = Space_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
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
    images: [
      {
        url: "/images/image-test.jpg",
        width: 1200,
        height: 630,
        alt: "RealTattooReviews: Compare Tattoo Removal Clinics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RealTattooReviews | Compare Tattoo Removal Clinics Before You Book",
    description:
      "Compare tattoo removal clinics, read real reviews, and explore clear ratings, provider profiles, and location-based research before you book.",
    images: ["/images/image-test.jpg"],
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
    <html lang="en" className={`${instrumentSerif.variable} ${dmMono.variable} ${inter.variable} ${interTight.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-body" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer dataLastUpdated={dataLastUpdated} />
      </body>
    </html>
  );
}
