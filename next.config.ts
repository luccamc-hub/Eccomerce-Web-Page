import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  images:  {
    domains: ["files.stripe.com"],
  }
};

export default nextConfig;
