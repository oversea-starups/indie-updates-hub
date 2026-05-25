import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath: '/indie-updates-hub',
  images: { unoptimized: true },
}

export default nextConfig
