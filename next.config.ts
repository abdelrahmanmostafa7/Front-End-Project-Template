import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* other config options */
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || '', // fallback only for build-time
  },
  reactStrictMode: true,

  images: {
    remotePatterns: [],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
