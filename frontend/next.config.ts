import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_MESSAGE: 'hello frontend',
    NEXT_PUBLIC_DEV_SERVER_URL: 'http://localhost:5000'
  }
};

export default nextConfig;
