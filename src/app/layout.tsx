export const metadata = {
  title: 'Indie Updates Hub — Ship updates everywhere',
  description: 'Write once, publish everywhere. The update hub for indie makers. Draft your product update once, then publish to your changelog, X/Twitter, Discord, and newsletter.',
  keywords: ['indie maker', 'changelog', 'product updates', 'twitter threads', 'discord webhook', 'newsletter'],
  authors: [{ name: 'Indie Updates Hub' }],
  creator: 'Indie Updates Hub',
  metadataBase: new URL('https://oversea-starups.github.io'),
  alternates: {
    canonical: '/indie-updates-hub',
  },
  openGraph: {
    title: 'Indie Updates Hub — Ship updates everywhere',
    description: 'Write once, publish everywhere. The update hub for indie makers.',
    url: 'https://oversea-starups.github.io/indie-updates-hub',
    siteName: 'Indie Updates Hub',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indie Updates Hub — Ship updates everywhere',
    description: 'Write once, publish everywhere. The update hub for indie makers.',
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
    icon: '/indie-updates-hub/favicon.svg',
    shortcut: '/indie-updates-hub/favicon.svg',
    apple: '/indie-updates-hub/favicon.svg',
  },
  other: {
    'referrer': 'strict-origin-when-cross-origin',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Indie Updates Hub',
              description: 'Write once, publish everywhere. The update hub for indie makers.',
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
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
