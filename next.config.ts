import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["localhost", "your-production-strapi-domain.com"],
  },
};

export default nextConfig;
