/* eslint-disable @next/next/no-img-element */
/*
 * Site-wide OpenGraph card. Used by Next.js automatically when an editor
 * or social platform fetches metadata for the root URL.
 *
 * Why a dynamic image rather than a static PNG:
 *
 *   - keeps the brand wordmark, palette, and tagline in code so updates
 *     happen via git, not via image-asset hand-off;
 *   - regenerates at build time so any edit to copy or color tokens flows
 *     through without a separate image export step;
 *   - per-page OG cards can override this file by adding their own
 *     opengraph-image.tsx in the route's folder.
 *
 * This is a temporary card for the launch build. Replace with a higher-fi
 * design once a real wordmark exists.
 */
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RealTattooReviews: Compare Tattoo Removal Clinics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #C8E6E4 0%, #F0EDE8 50%, #F5DDD0 100%)",
          color: "#2B2118",
        }}
      >
        {/* Top row: wordmark badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "#2B2118",
              color: "#B05C42",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            R
          </div>
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#2B2118",
            }}
          >
            RealTattooReviews
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
              color: "#2B2118",
              maxWidth: 980,
            }}
          >
            Compare tattoo removal clinics before you book.
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              lineHeight: 1.35,
              color: "#5C4D40",
              maxWidth: 920,
            }}
          >
            Real reviews, evidence-based comparisons, no clinic marketing.
          </div>
        </div>

        {/* Stats row. Numbers come from the homepage CMS description so the
            OG card stays in sync with the meta description without computing
            them at build time. The numbers are intentionally rounded ("1,500+"
            rather than "1,508") so we do not have to regenerate the OG card
            every time the scraper picks up a few more rows. */}
        <div
          style={{
            display: "flex",
            gap: 64,
            paddingTop: 8,
            borderTop: "1px solid rgba(43, 33, 24, 0.18)",
          }}
        >
          {[
            { value: "1,500+", label: "public Google reviews" },
            { value: "21", label: "tattoo removal providers" },
            { value: "6", label: "US markets" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{ display: "flex", flexDirection: "column", gap: 4 }}
            >
              <span
                style={{
                  fontSize: 56,
                  fontWeight: 700,
                  letterSpacing: -1.5,
                  lineHeight: 1,
                  color: "#B05C42",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: "#5C4D40",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom row: anchored URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#5C4D40",
          }}
        >
          <span style={{ letterSpacing: 2, textTransform: "uppercase" }}>
            realtattooreviews.com
          </span>
          <span style={{ fontStyle: "italic" }}>Independent. Editorial. Free of ads.</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
