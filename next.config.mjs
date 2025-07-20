/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL('https://res.cloudinary.com/dg2vnk374/**')],
  },
};

export default nextConfig;
