// Log UploadThing environment status at startup
const { uploadThingEnvStatus } = require('./scripts/log-uploadthing-env.cjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  env: {
    NEXT_PUBLIC_UPLOADTHING_MOCK_MODE:
      process.env.NEXT_PUBLIC_UPLOADTHING_MOCK_MODE ?? uploadThingEnvStatus.resolvedMockMode,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

module.exports = nextConfig;
