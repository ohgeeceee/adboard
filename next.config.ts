import type { NextConfig } from "next";

// GitHub Pages serves static files, so export the App Router site at build time.
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/adboard",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
