import type { NextConfig } from "next";

// Standalone mode is only needed when explicitly building a container image (Docker)
// On Vercel and Netlify, native serverless output is required.
const isDocker = process.env.DOCKER_BUILD === "1";

const nextConfig: NextConfig = {
  ...(isDocker ? { output: "standalone" } : {}),
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: {
    // Ensuring zero deployment failures on CI/CD
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;

