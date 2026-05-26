const isCustomDomain = process.env.CUSTOM_DOMAIN === 'true'
const basePath = isCustomDomain ? '' : '/indie-updates-hub'
const domain = isCustomDomain ? 'indieupdates.com' : 'oversea-starups.github.io'
const canonicalPath = isCustomDomain ? '/' : '/indie-updates-hub'

export const metadata = {
  title: 'Indie Updates Hub — Ship updates everywhere',
  description: 'Write once, publish everywhere. The AI-powered update hub for indie makers. Draft your product update once, then publish to your changelog, X/Twitter, Discord, and newsletter.',
  keywords: ['indie maker', 'changelog', 'product updates', 'twitter threads', 'discord webhook', 'newsletter', 'AI writing', 'build in public', 'open startup'],
  authors: [{ name: 'Indie Updates Hub' }],
  creator: 'Indie Updates Hub',
  metadataBase: new URL(`https://${domain}`),
  alternates: {
    canonical: canonicalPath,
  },
  openGraph: {
    title: 'Indie Updates Hub — Ship updates everywhere',
    description: 'Write once, publish everywhere. The AI-powered update hub for indie makers.',
    url: `https://${domain}${canonicalPath}`,
    siteName: 'Indie Updates Hub',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indie Updates Hub — Ship updates everywhere',
    description: 'Write once, publish everywhere. The AI-powered update hub for indie makers.',
    creator: '@indieupdateshub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
    apple: `${basePath}/favicon.svg`,
  },
  manifest: `${basePath}/manifest.json`,
  other: {
    'referrer': 'strict-origin-when-cross-origin',
    'theme-color': '#0ea5e9',
  },
}

import './globals.css'
import { ErrorBoundary } from '@/components/error-boundary'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://plausible.io; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self' https://plausible.io; frame-ancestors 'none'; base-uri 'self'; form-action 'self';" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Indie Updates Hub',
              description: 'Write once, publish everywhere. The AI-powered update hub for indie makers.',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '127',
              },
            }),
          }}
        />
        <script defer data-domain={domain} data-api={`${basePath}/api/event`} src="https://plausible.io/js/script.js" />
      </head>
      <body className="min-h-screen antialiased">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
