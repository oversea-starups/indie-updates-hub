'use client'

import { useState, useCallback } from 'react'
import { ArrowLeft, Copy, Check, Twitter, Eye, Sparkles, Send, Hash, MessageCircle, Mail, Newspaper } from 'lucide-react'
import Link from 'next/link'

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function markdownToHtml(md: string): string {
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

const channels = [
  { key: 'changelog', label: 'Changelog', icon: <Sparkles className="w-3.5 h-3.5" />, color: 'text-sky-400' },
  { key: 'twitter', label: 'X / Twitter', icon: <Twitter className="w-3.5 h-3.5" />, color: 'text-sky-400' },
  { key: 'discord', label: 'Discord', icon: <MessageCircle className="w-3.5 h-3.5" />, color: 'text-indigo-400' },
  { key: 'slack', label: 'Slack', icon: <Hash className="w-3.5 h-3.5" />, color: 'text-amber-400' },
  { key: 'newsletter', label: 'Newsletter', icon: <Mail className="w-3.5 h-3.5" />, color: 'text-rose-400' },
] as const

const templates = [
  { key: 'dark' as const, label: 'Dark', desc: 'Sleek dark mode' },
  { key: 'minimal' as const, label: 'Minimal', desc: 'Clean & simple' },
  { key: 'gradient' as const, label: 'Gradient', desc: 'Vibrant colors' },
]

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
  const [selectedChannels, setSelectedChannels] = useState<Set<string>>(new Set(['changelog', 'twitter']))
  const [publishing, setPublishing] = useState(false)
  const [published, setPublished] = useState(false)

  const xThread = generateXThread(content, title)

  const toggleChannel = (key: string) => {
    setSelectedChannels(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const copyXThread = useCallback(() => {
    navigator.clipboard.writeText(xThread.join('\n\n---\n\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [xThread])

  const handlePublish = useCallback(() => {
    setPublishing(true)
    setTimeout(() => {
      setPublishing(false)
      setPublished(true)
      setTimeout(() => setPublished(false), 3000)
    }, 1200)
  }, [])

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

          {/* Channel Selection */}
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Publish to</label>
            <div className="flex flex-wrap gap-2">
              {channels.map((ch) => (
                <button key={ch.key} onClick={() => toggleChannel(ch.key)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border transition ${
                    selectedChannels.has(ch.key)
                      ? 'border-sky-500/50 bg-sky-500/10 text-white'
                      : 'border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300'
                  }`}>
                  {ch.icon}
                  {ch.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Changelog template</label>
            <div className="flex gap-2">
              {templates.map((t) => (
                <button key={t.key} onClick={() => setTemplate(t.key)}
                  className={`px-4 py-2 rounded-lg text-sm transition border text-left ${
                    template === t.key ? 'border-sky-500 bg-sky-500/10 text-sky-400' : 'border-neutral-800 text-neutral-400 hover:border-neutral-600'
                  }`}>
                  <span className="block font-medium">{t.label}</span>
                  <span className="text-xs opacity-60">{t.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Publish Button */}
          <button onClick={handlePublish} disabled={publishing || selectedChannels.size === 0}
            className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg transition ${
              publishing || selectedChannels.size === 0
                ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                : 'bg-sky-500 hover:bg-sky-400 text-white'
            }`}>
            {publishing ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Publishing...</>
            ) : published ? (
              <><Check className="w-4 h-4" /> Published!</>
            ) : (
              <><Send className="w-4 h-4" /> Publish to {selectedChannels.size} channel{selectedChannels.size !== 1 ? 's' : ''}</>
            )}
          </button>
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
            <div className={`rounded-xl overflow-hidden ${template === 'dark' ? 'bg-neutral-900 border border-neutral-800 text-white' : template === 'minimal' ? 'bg-white text-neutral-900 border border-neutral-200' : 'bg-gradient-to-br from-sky-500/20 to-purple-500/20 border border-white/10 text-white'}`}>
              <div className={`px-6 py-4 border-b flex items-center justify-between ${template === 'minimal' ? 'border-neutral-200' : 'border-white/10'}`}>
                <h2 className="text-lg font-semibold">Changelog</h2>
                <span className="text-xs opacity-60">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="p-6 markdown-preview" dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} />
              <div className={`px-6 py-3 border-t text-xs opacity-40 text-center ${template === 'minimal' ? 'border-neutral-200' : 'border-white/10'}`}>
                Updates powered by IndieUpdates
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
