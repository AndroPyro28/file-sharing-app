import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: Disabling ESLint during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
