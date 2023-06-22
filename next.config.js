/** @type {import("next").NextConfig} */

const withOptimizedImages = require("next-optimized-images");

const nextConfig = withOptimizedImages({
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },
  swcMinify: false,
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000, http://localhost:3001, https://iframe-app-ivory.vercel.app, https://oauth-front.vercel.app/",
          },
        ],
      },
    ];
  },
});

module.exports = nextConfig;