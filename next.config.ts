import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ["./src/styles", "./styles"],
  },
};

export default nextConfig;
