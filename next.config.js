/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "i.ytimg.com",
      //   port: "",
      //   // pathname: "/image/**",
      // },
      {
        protocol: "https",
        hostname: "mayo-player-backend-production.up.railway.app",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        // pathname: "/thumbnails/**",
      },
    ],
  },
}

module.exports = nextConfig;


