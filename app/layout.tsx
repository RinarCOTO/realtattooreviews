import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
        alt: "RealTattooReviews — Compare Tattoo Removal Clinics",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-body">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
