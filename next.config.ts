import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/**
 * Content-Security-Policy for a static-first site with no backend and no third-party embeds.
 * - Everything loads from our own origin (fonts are self-hosted by next/font at build time).
 * - 'unsafe-inline' for scripts/styles is required by Next.js' inline hydration data without a per-request nonce;
 *   the remaining directives still block exfiltration (connect-src), clickjacking (frame-ancestors),
 *   <base>/<object> injection and cross-site form posts.
 * - Production only: the dev server needs eval and websockets for hot reload.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self' blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  ...(isProd ? [{ key: "Content-Security-Policy", value: contentSecurityPolicy }] : []),
  // Force HTTPS for a year. Add `includeSubDomains; preload` only after confirming every subdomain serves HTTPS.
  ...(isProd ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }] : []),
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  // The custom video player needs fullscreen and picture-in-picture; everything else is switched off.
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), serial=(), accelerometer=(), gyroscope=(), magnetometer=(), browsing-topics=(), fullscreen=(self), picture-in-picture=(self)",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Only optimise our own images: no remote patterns means the image optimiser can't be abused as an open proxy.
    remotePatterns: [],
    dangerouslyAllowSVG: false,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
