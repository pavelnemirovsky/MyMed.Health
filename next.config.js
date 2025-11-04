/** @type {import('next').NextConfig} */
const nextConfig = {
  // Using Cloudflare Pages adapter for Next.js API routes support
  trailingSlash: true, // Better for Cloudflare Pages
  images: {
    unoptimized: true, // Recommended for Cloudflare Pages
  },
};

module.exports = nextConfig;

