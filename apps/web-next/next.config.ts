import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    dangerouslyAllowLocalIP: true,
    domains: ["i.ytimg.com", "api.betterbedrock.com"],

    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8084",
        pathname: "/**",
      },
    ],

  },
};

export default nextConfig;
