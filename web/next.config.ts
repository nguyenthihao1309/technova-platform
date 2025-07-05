/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
       {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: 'anphat.com.vn',
      },
    ],
  },
}

module.exports = nextConfig