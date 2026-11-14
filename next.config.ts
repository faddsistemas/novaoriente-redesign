import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/novaoriente-redesign",
  assetPrefix: "/novaoriente-redesign/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;