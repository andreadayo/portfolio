import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  sassOptions: {
    includePaths: ["./src/styles", "./styles"],
  },
};

export default nextConfig;
