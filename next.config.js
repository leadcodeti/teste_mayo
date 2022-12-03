/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
<<<<<<< HEAD
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
=======

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        // pathname: '/vi/eRYjhOpLd_s/',
      },
    ],
  },
}
module.exports = nextConfig
>>>>>>> player
