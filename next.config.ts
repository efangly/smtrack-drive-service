import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  crossOrigin: 'anonymous',
  reactStrictMode: false,
  output: 'standalone',
  env: {
    NEXT_PUBLIC_API_SERVER: "https://drive.siamatic.co.th",
    NEXT_PUBLIC_API: "https://api.siamatic.dev/smtrack",
  }
};

export default nextConfig;
