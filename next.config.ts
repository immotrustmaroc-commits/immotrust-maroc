import type { NextConfig } from "next";

// En-têtes de sécurité appliqués à toutes les routes.
// (HSTS est déjà servi par Vercel ; une CSP stricte est volontairement reportée
//  car elle nécessite des nonces côté Next et un test approfondi.)
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
