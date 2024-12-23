import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript:{
    ignoreBuildErrors:true
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint warnings and errors during the build
  },
};

export default nextConfig;
