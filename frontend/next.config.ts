import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stashbox-library-bucket.s3.eu-north-1.amazonaws.com",
        pathname: "/**",
      }
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    }
  }
};

export default nextConfig;
