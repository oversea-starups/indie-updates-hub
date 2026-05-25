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
    content: `## What's new

- 🌙 **Dark mode** — Your eyes will thank you at 2 AM
- ⚡ **50% faster load** — Cut bundle size from 180KB to 90KB
- 🐛 **Fixed login redirect** — No more infinite loops on Safari`,
    tag: 'feature'
  },
  {
    id: '2',
    date: '2026-05-15',
    title: 'v1.1 — Mobile responsiveness',
    content: `## What's new

- 📱 **Fully responsive** — Works great on phones and tablets
- 🔍 **Better search** — Find anything in under 200ms
- 🎨 **New color themes** — 5 new presets to choose from`,
    tag: 'improvement'
  },
  {
    id: '3',
    date: '2026-05-01',
    title: 'v1.0 — Public launch',
    content: `## 🚀 We're live!

After 3 months of building in public, v1.0 is finally here.

## Core features

- Real-time collaboration
- Export to PDF, Markdown, HTML
- API access for integrations

Thank you to everyone who followed the journey.`,
    tag: 'milestone'
  }
]

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function mdToHtml(md: string) {
  const lines = md.split('\n')
  const result: string[] = []
  let inList = false

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList) {
        result.push('<ul class="list-disc ml-6 mb-3 space-y-1">')
        inList = true
      }
      const item = escapeHtml(trimmed.slice(2))
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code class="bg-neutral-800 px-1.5 py-0.5 rounded text-sky-400 text-sm">$1</code>')
      result.push(`<li>${item}</li>`)
    } else {
      if (inList) {
        result.push('</ul>')
        inList = false
      }

      if (trimmed === '') {
        result.push('')
      } else if (trimmed.startsWith('### ')) {
        result.push(`<h3 class="text-lg font-semibold mt-4 mb-2">${escapeHtml(trimmed.slice(4)).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</h3>`)
      } else if (trimmed.startsWith('## ')) {
        result.push(`<h2 class="text-xl font-semibold mt-5 mb-3">${escapeHtml(trimmed.slice(3)).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</h2>`)
      } else if (trimmed.startsWith('# ')) {
        result.push(`<h1 class="text-2xl font-bold mb-4">${escapeHtml(trimmed.slice(2)).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</h1>`)
      } else if (trimmed.startsWith('> ')) {
        result.push(`<blockquote class="border-l-2 border-sky-500 pl-3 my-3 italic">${escapeHtml(trimmed.slice(2)).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</blockquote>`)
      } else {
        let p = escapeHtml(trimmed)
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/`([^`]+)`/g, '<code class="bg-neutral-800 px-1.5 py-0.5 rounded text-sky-400 text-sm">$1</code>')
        result.push(`<p class="mb-3 leading-relaxed">${p}</p>`)
      }
    }
  }

  if (inList) result.push('</ul>')

  return result.join('\n')
}

function ChangelogContent() {
  const searchParams = useSearchParams()
  const template = (searchParams.get('template') as 'dark' | 'minimal' | 'gradient') || 'dark'

  const templateStyles: Record<string, string> = {
    dark: 'bg-neutral-950 text-white',
    minimal: 'bg-white text-neutral-900',
    gradient: 'bg-gradient-to-br from-sky-900 to-purple-900 text-white',
  }

  const borderStyles: Record<string, string> = {
    dark: 'border-white/10',
    minimal: 'border-neutral-200',
    gradient: 'border-white/10',
  }

  return (
    <main className={`min-h-screen ${templateStyles[template] || templateStyles.dark}`}>
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
            <article key={update.id} className={`pb-8 border-b ${borderStyles[template] || borderStyles.dark} last:border-0`}>
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

        <footer className={`mt-16 pt-8 border-t text-center text-xs opacity-40 ${borderStyles[template] || borderStyles.dark}`}>
          Updates powered by <Link href="/" className="hover:opacity-100 transition">IndieUpdates</Link>
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
