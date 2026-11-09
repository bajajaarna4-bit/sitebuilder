import type { NextConfig } from "next";

const isDockerOrLinux = process.platform === "linux" || process.env.DOCKER_BUILD === "1";

const nextConfig: NextConfig = {
  ...(isDockerOrLinux ? { output: "standalone" } : {}),
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: {
    // Ensuring clean builds while maintaining strict local typing
    ignoreBuildErrors: false,
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

