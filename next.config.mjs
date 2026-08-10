import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com'
      }
    ]
  },
  i18n: {
    locales: ['fr', 'en', 'alur'],
    defaultLocale: 'fr'
  },
  experimental: {
    typedRoutes: true
  }
};

export default nextConfig;
