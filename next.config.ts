import type { NextConfig } from 'next'

const isCustomDomain = process.env.CUSTOM_DOMAIN === 'true'

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath: isCustomDomain ? '' : '/indie-updates-hub',
  images: { unoptimized: true },
}

export default nextConfig
