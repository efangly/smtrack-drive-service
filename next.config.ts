import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  env: {
    NEXT_PUBLIC_API_SERVER: "https://drive.siamatic.co.th",
  }
};

export default nextConfig;
