import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/Cadillac-Final" : "";

const nextConfig: NextConfig = {
  output: "export",          // static HTML — required for GitHub Pages
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,       // /page/ more reliable on GH Pages
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
