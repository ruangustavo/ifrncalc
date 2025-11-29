/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "github.com"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          }
        ],
      },  
    ]
  },
};

module.exports = nextConfig;
