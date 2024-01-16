/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "ihcpvvksaeoqojsl.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;
