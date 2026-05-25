export const metadata = {
  title: 'Indie Updates Hub — Ship updates everywhere',
  description: 'Write once, publish everywhere. The update hub for indie makers.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
