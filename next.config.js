/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "github.com"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
