/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_DISABLE_ESLINT === "true",
  },

  compress: false,

  // Disable JS/TS minification
  swcMinify: false, // Disables JavaScript/TypeScript minification

  // Disable CSS minification (Experimental)
  experimental: {
    optimizeCss: false, // Disable CSS minification
  },

  // Disable Next.js image optimization
  images: {
    unoptimized: true, // Disable image optimization
  },

  // // Disable cache headers for static assets
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)", // Applies to all routes
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value:
  //             "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  //         },
  //       ],
  //     },
  //   ];
  // },

  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all routes
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // Example for static caching
          },
        ],
      },
    ];
  },

  // Custom Webpack configuration to disable minification
  webpack: (config, { isServer }) => {
    // Disable minification in production
    if (!isServer) {
      config.optimization.minimizer = [];
    }
    return config;
  },
};

export default nextConfig;
