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
        hostname: "app.mayoplayer.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        // pathname: "/thumbnails/**",
      },
    ],
  },
}

// app.mayoplayer.com

module.exports = nextConfig;


