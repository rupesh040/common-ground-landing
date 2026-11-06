import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/about-us", destination: "/#about", permanent: false },
      { source: "/causes", destination: "/#causes", permanent: false },
      { source: "/our-team", destination: "/#team", permanent: false },
      { source: "/gallery", destination: "/#gallery", permanent: false },
      { source: "/faq", destination: "/#faq", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
      { source: "/blog", destination: "/", permanent: false },
      { source: "/causes/:path*", destination: "/#causes", permanent: false },
      { source: "/blog/:path*", destination: "/", permanent: false },
    ];
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
