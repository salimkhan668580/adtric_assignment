import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/news-events", destination: "/web/news-events" },
      { source: "/news-events/:slug", destination: "/web/news-events/:slug" },
    ];
  },
};

export default nextConfig;
