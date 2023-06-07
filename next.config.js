/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    unoptimized: true,
  },

  env: {
    HOST_URL: process.env.HOST_URL,
    API_BASE_URL: process.env.API_BASE_URL,
  },
};

module.exports = nextConfig;
