import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF first, fall back to WebP — browsers pick the best they support
    formats: ["image/avif", "image/webp"],
    // Add external domains here when you move images to a CDN or Supabase Storage
    // remotePatterns: [
    //   { protocol: "https", hostname: "your-supabase-project.supabase.co" },
    // ],
  },
};

export default nextConfig;
