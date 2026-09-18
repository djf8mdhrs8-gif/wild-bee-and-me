import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This app is a self-contained project inside a repository that also holds
  // another site, so Turbopack is told which directory is the root rather than
  // guessing from the nearest lockfile.
  turbopack: { root: __dirname },
  images: {
    // Real photography will land in /public/images. Remote sources (a CDN or a
    // headless CMS) can be added here later without touching any component.
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
