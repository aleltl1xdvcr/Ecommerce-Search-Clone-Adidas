/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL('https://res.cloudinary.com/dg2vnk374/**')],
    protocol: 'https',
    hostname: 'res.cloudinary.com',
    pathname: '/**',
  },
};

export default nextConfig;
