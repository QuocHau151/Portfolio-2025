import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [new URL("https://s3.quochau.com/**")],
  },
};

export default nextConfig;
