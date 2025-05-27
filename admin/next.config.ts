import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_DEV_SERVER_URL: 'http://localhost:5000',
  }
};

export default nextConfig;
