/** @type {import('next').NextConfig} */

// On GitHub Pages the site is served from https://<user>.github.io/<repo>/.
// The deploy workflow injects the correct base path (e.g. "/Real_estate");
// it stays empty for local `next dev` / `next start`.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  reactStrictMode: true,
  // Emit a fully static site to ./out for GitHub Pages.
  output: 'export',
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    // next/image optimization requires a server; static export serves the
    // original URLs directly (Unsplash already returns optimized WebP).
    unoptimized: true,
  },
};

module.exports = nextConfig;
