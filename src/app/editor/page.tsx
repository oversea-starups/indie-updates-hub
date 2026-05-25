'use client'

import { useState, useCallback } from 'react'
import { ArrowLeft, Copy, Check, Twitter, Eye, Sparkles } from 'lucide-react'
import Link from 'next/link'

function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-5 mb-3">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/`([^`]+)`/gim, '<code class="bg-neutral-800 px-1.5 py-0.5 rounded text-sky-400 text-sm">$1</code>')
    .replace(/^\> (.*$)/gim, '<blockquote class="border-l-2 border-sky-500 pl-3 my-3 italic">$1</blockquote>')
    .replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
    .replace(/^(?!<[hlu]|\s*$)(.*$)/gim, '<p class="mb-3 leading-relaxed">$1</p>')
}

function generateXThread(md: string, title: string): string[] {
  const lines = md.split('\n').filter(l => l.trim())
  const tweets: string[] = []
  tweets.push(`🚀 ${title}`)
  const bullets = lines.filter(l => l.startsWith('- ') || l.startsWith('* '))
  if (bullets.length > 0) {
    tweets.push(`What's new:\n${bullets.slice(0, 3).map(b => `• ${b.replace(/^[-*]\s*/, '')}`).join('\n')}`)
  }
  const paras = lines.filter(l => !l.startsWith('#') && !l.startsWith('-') && !l.startsWith('*') && l.trim())
  if (paras.length > 0) {
    const short = paras[0].slice(0, 100)
    tweets.push(`${short}${paras[0].length > 100 ? '...' : ''}`)
  }
  tweets.push(`Try it out and let me know what you think 👇`)
  return tweets
}

export default function EditorPage() {
  const [title, setTitle] = useState('v1.2 — Dark mode & faster load')
  const [content, setContent] = useState(`## What's new

- 🌙 **Dark mode** — Your eyes will thank you at 2 AM
- ⚡ **50% faster load** — Cut bundle size from 180KB to 90KB
- 🐛 **Fixed login redirect** — No more infinite loops on Safari

## Behind the scenes

Refactored the auth layer to use JWT instead of session cookies. Shaved off ~200ms on every request.

## What's next?

Mobile app is in closed beta. DM me if you want early access.`)
  const [template, setTemplate] = useState<'dark' | 'minimal' | 'gradient'>('dark')
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'preview' | 'x' | 'changelog'>('preview')

  const xThread = generateXThread(content, title)

  const copyXThread = useCallback(() => {
    navigator.clipboard.writeText(xThread.join('\n\n---\n\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [xThread])

  return (
    <main className="min-h-screen bg-neutral-950">
      <nav className="border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" /> IndieUpdates
          </Link>
          <div className="flex gap-2">
            {(['preview', 'x', 'changelog'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  activeTab === tab ? 'bg-sky-500/20 text-sky-400' : 'text-neutral-400 hover:text-white'
                }`}>
                {tab === 'preview' && <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5"/> Preview</span>}
                {tab === 'x' && <span className="flex items-center gap-1.5"><Twitter className="w-3.5 h-3.5"/> X Thread</span>}
                {tab === 'changelog' && <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5"/> Changelog</span>}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Update title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-sky-500/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Content (Markdown)</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={18}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-sky-500/50 font-mono text-sm leading-relaxed resize-y" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Changelog template</label>
            <div className="flex gap-2">
              {(['dark', 'minimal', 'gradient'] as const).map((t) => (
                <button key={t} onClick={() => setTemplate(t)}
                  className={`px-4 py-2 rounded-lg text-sm capitalize transition border ${
                    template === t ? 'border-sky-500 bg-sky-500/10 text-sky-400' : 'border-neutral-800 text-neutral-400 hover:border-neutral-600'
                  }`}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {activeTab === 'preview' && (
            <div className="rounded-xl border border-neutral-800 overflow-hidden">
              <div className="px-4 py-2 bg-neutral-900 border-b border-neutral-800 text-xs text-neutral-500 flex items-center gap-2">
                <Eye className="w-3 h-3" /> Live preview
              </div>
              <div className="p-6 markdown-preview" dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} />
            </div>
          )}

          {activeTab === 'x' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-400">Generated X thread</span>
                <button onClick={copyXThread}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-sm text-neutral-300 transition">
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy all'}
                </button>
              </div>
              {xThread.map((tweet, i) => (
                <div key={i} className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Twitter className="w-3.5 h-3.5 text-sky-400" />
                    <span className="text-xs text-neutral-500">Tweet {i + 1}/{xThread.length}</span>
                    <span className="text-xs text-neutral-600 ml-auto">{tweet.length}/280</span>
                  </div>
                  <p className="text-sm text-neutral-300 whitespace-pre-wrap">{tweet}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'changelog' && (
            <div className={`rounded-xl overflow-hidden template-${template}`}>
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Changelog</h2>
                <span className="text-xs opacity-60">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="p-6 markdown-preview" dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} />
              <div className="px-6 py-3 border-t border-white/10 text-xs opacity-40 text-center">
                Updates powered by IndieUpdates
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
