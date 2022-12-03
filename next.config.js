/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "i.scdn.co",
          port: "",
          pathname: "/image/**",
        },
      ],
    },
  },
};

module.exports = nextConfig;
