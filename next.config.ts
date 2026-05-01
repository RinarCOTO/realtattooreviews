import type { NextConfig } from "next";
import path from "path";

/**
 * Site-wide security headers.
 *
 * Notes:
 * - `script-src` allows `'unsafe-inline'` because every page emits inline
 *   JSON-LD via `<script type="application/ld+json" dangerouslySetInnerHTML>`.
 *   Payloads are typed local objects passed through JSON.stringify, never user
 *   input, so the inline-script surface is bounded.
 * - `'unsafe-eval'` is added in development only, because React's dev runtime
 *   uses `eval()` for stack-reconstruction and HMR. Production builds do not
 *   require it and React will never use it in production mode.
 * - `connect-src` whitelists Supabase and Sanity CDNs; no other origins are
 *   needed for runtime data fetching. Webpack HMR via `ws:` is added in dev.
 * - `img-src` allows https + data: + blob: to support Sanity image CDN,
 *   provider logos, and inline blob backgrounds.
 * - `frame-ancestors 'none'` blocks clickjacking. The site is not embedded in
 *   any iframe surface today.
 */
const isDev = process.env.NODE_ENV !== "production";

const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel.app"
  : "script-src 'self' 'unsafe-inline' https://*.vercel.app";

const connectSrc = isDev
  ? "connect-src 'self' https://*.supabase.co https://*.sanity.io https://cdn.sanity.io https://*.vercel-insights.com ws: wss:"
  : "connect-src 'self' https://*.supabase.co https://*.sanity.io https://cdn.sanity.io https://*.vercel-insights.com";

const SECURITY_HEADERS = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' https: data: blob:",
      "font-src 'self' data:",
      connectSrc,
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join("; "),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    // `interest-cohort` (FLoC) was deprecated in modern browsers; omit to avoid
    // console warnings. Add new feature names here as they become relevant.
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  trailingSlash: true,

  allowedDevOrigins: ["192.168.1.236"],
  turbopack: {
    root: path.resolve(__dirname),
  },

  async headers() {
    return [
      {
        // Apply to every route on the domain.
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
