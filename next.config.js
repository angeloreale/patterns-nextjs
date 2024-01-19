/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-auth"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/signin",
        destination: "/api/auth/signin",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
