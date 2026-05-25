'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { ArrowLeft, Calendar } from 'lucide-react'
import Link from 'next/link'

const demoUpdates = [
  {
    id: '1',
    date: '2026-05-20',
    title: 'v1.2 — Dark mode & faster load',
    content: `## What's new\n\n- 🌙 **Dark mode** — Your eyes will thank you at 2 AM\n- ⚡ **50% faster load** — Cut bundle size from 180KB to 90KB\n- 🐛 **Fixed login redirect** — No more infinite loops on Safari`,
    tag: 'feature'
  },
  {
    id: '2',
    date: '2026-05-15',
    title: 'v1.1 — Mobile responsiveness',
    content: `## What's new\n\n- 📱 **Fully responsive** — Works great on phones and tablets\n- 🔍 **Better search** — Find anything in under 200ms\n- 🎨 **New color themes** — 5 new presets to choose from`,
    tag: 'improvement'
  },
  {
    id: '3',
    date: '2026-05-01',
    title: 'v1.0 — Public launch',
    content: `## 🚀 We're live!\n\nAfter 3 months of building in public, v1.0 is finally here.\n\n## Core features\n\n- Real-time collaboration\n- Export to PDF, Markdown, HTML\n- API access for integrations\n\nThank you to everyone who followed the journey.`,
    tag: 'milestone'
  }
]

function mdToHtml(md: string) {
  return md
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-5 mb-3">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/`([^`]+)`/gim, '<code class="bg-neutral-800 px-1.5 py-0.5 rounded text-sky-400 text-sm">$1</code>')
    .replace(/^\- (.*$)/gim, '<li class="ml-4 mb-1">$1</li>')
    .replace(/^(?!<[hlu]|\s*$)(.*$)/gim, '<p class="mb-3 leading-relaxed">$1</p>')
}

function ChangelogContent() {
  const searchParams = useSearchParams()
  const template = (searchParams.get('template') as 'dark' | 'minimal' | 'gradient') || 'dark'

  return (
    <main className={`min-h-screen template-${template}`}>
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link href="/editor" className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to editor
        </Link>

        <header className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Changelog</h1>
          <p className="opacity-60">All the latest updates and improvements.</p>
        </header>

        <div className="space-y-8">
          {demoUpdates.map((update) => (
            <article key={update.id} className="pb-8 border-b border-white/10 last:border-0">
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  update.tag === 'feature' ? 'bg-sky-500/20 text-sky-400' :
                  update.tag === 'milestone' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {update.tag}
                </span>
                <div className="flex items-center gap-1.5 text-xs opacity-50">
                  <Calendar className="w-3 h-3" />
                  {update.date}
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-3">{update.title}</h2>
              <div className="markdown-preview" dangerouslySetInnerHTML={{ __html: mdToHtml(update.content) }} />
            </article>
          ))}
        </div>

        <footer className="mt-16 pt-8 border-t border-white/10 text-center text-xs opacity-40">
          Updates powered by IndieUpdates
        </footer>
      </div>
    </main>
  )
}

export default function ChangelogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950 flex items-center justify-center text-neutral-500">Loading...</div>}>
      <ChangelogContent />
    </Suspense>
  )
}
