/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental:{
    turbo: {
      "pino-pretty": true
    }
  }
};

module.exports = nextConfig
