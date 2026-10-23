import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 for the product gallery, where compression banding shows on flat colors
    qualities: [75, 90],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
