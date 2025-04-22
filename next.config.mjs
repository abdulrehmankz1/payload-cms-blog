import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Good for development

  webpack(config) {
    // DO NOT try to mock 'fs' in Webpack; it's no longer valid in Next.js 15+
    // Make sure to conditionally import `fs` only in server-side code instead
    return config;
  },

  // Migrate deprecated experimental.turbo if you were using it
  turbopack: {
    enabled: true, // Only add this if you were using experimental.turbo
  },
};

export default withPayload(nextConfig, {
  devBundleServerPackages: false, // Payload CMS option
});
