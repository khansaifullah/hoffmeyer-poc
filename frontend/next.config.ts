import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/product/:slug",
        destination: "/#categories",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
