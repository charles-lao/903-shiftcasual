/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: process.env.NEXT_DISABLE_ESLINT === 'true',
    },
  };
  
  export default nextConfig;
  