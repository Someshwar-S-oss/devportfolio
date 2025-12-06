/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  // Enable Turbopack for faster development
  experimental: {
    turbo: {
      resolveAlias: {
        '@': './src',
      },
    },
  },
  // Optimize webpack for development
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.cache = {
        type: 'filesystem',
      };
    }
    return config;
  },
}

module.exports = nextConfig
