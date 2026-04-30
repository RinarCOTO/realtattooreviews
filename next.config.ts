import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  trailingSlash: true,

  allowedDevOrigins: ["192.168.1.236"],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
