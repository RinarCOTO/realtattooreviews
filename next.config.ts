import type { NextConfig } from "next";

// On GitHub Actions the GITHUB_ACTIONS env var is always "true".
// Locally it's unset, so basePath and image prefix are empty.
const BASE_PATH = process.env.GITHUB_ACTIONS === "true" ? "/realtattooreviews" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
  allowedDevOrigins: ["192.168.1.236"],
};

export default nextConfig;
