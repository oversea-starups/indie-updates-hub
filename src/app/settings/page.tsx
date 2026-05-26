'use client'

import { useState } from 'react'
import { ArrowLeft, Twitter, MessageCircle, Hash, Mail, Globe, Check, Copy } from 'lucide-react'
import Link from 'next/link'

const integrations = [
  {
    key: 'twitter',
    name: 'X / Twitter',
    icon: <Twitter className="w-5 h-5" />,
    desc: 'Auto-post updates as threads',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
  },
  {
    key: 'discord',
    name: 'Discord',
    icon: <MessageCircle className="w-5 h-5" />,
    desc: 'Post to your server via webhook',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
  },
  {
    key: 'slack',
    name: 'Slack',
    icon: <Hash className="w-5 h-5" />,
    desc: 'Notify your workspace channel',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    key: 'newsletter',
    name: 'Newsletter',
    icon: <Mail className="w-5 h-5" />,
    desc: 'Send updates via email (Resend)',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
  },
]

export default function SettingsPage() {
  const [connected, setConnected] = useState<Set<string>>(new Set())
  const [copied, setCopied] = useState(false)
  const [domain, setDomain] = useState('')

  const toggleConnection = (key: string) => {
    setConnected(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const copyEmbedCode = () => {
    const code = `<iframe src="https://oversea-starups.github.io/indie-updates-hub/changelog" width="100%" height="600" frameborder="0"></iframe>`
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-neutral-950">
      <nav className="border-b border-neutral-800">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" /> IndieUpdates
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
        <p className="text-neutral-400 mb-10">Manage integrations, domain, and embed options.</p>

        {/* Integrations */}
        <section className="mb-12">
          <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">Integrations</h2>
          <div className="space-y-3">
            {integrations.map((integration) => (
              <div key={integration.key} className="flex items-center justify-between p-4 rounded-xl border border-neutral-800 bg-neutral-900/50">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${integration.bg} flex items-center justify-center ${integration.color}`}>
                    {integration.icon}
                  </div>
                  <div>
                    <p className="font-medium text-white">{integration.name}</p>
                    <p className="text-xs text-neutral-500">{integration.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleConnection(integration.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    connected.has(integration.key)
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  {connected.has(integration.key) ? 'Connected' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Custom Domain */}
        <section className="mb-12">
          <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">Custom Domain</h2>
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50">
            <label className="block text-sm text-neutral-400 mb-2">Your changelog domain</label>
            <div className="flex gap-2">
              <div className="flex items-center px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-500 text-sm">
                <Globe className="w-4 h-4 mr-2" /> https://
              </div>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="updates.yourapp.com"
                className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-sky-500/50 text-sm"
              />
            </div>
            <p className="text-xs text-neutral-600 mt-2">Available on Creator and Team plans.</p>
          </div>
        </section>

        {/* Embed */}
        <section className="mb-12">
          <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">Embed Code</h2>
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50">
            <p className="text-sm text-neutral-400 mb-3">Add this to your site to embed your changelog:</p>
            <div className="relative">
              <pre className="p-4 bg-neutral-950 rounded-lg text-xs text-neutral-400 overflow-x-auto font-mono border border-neutral-800">
                {`<iframe src="https://oversea-starups.github.io/indie-updates-hub/changelog" width="100%" height="600" frameborder="0"></iframe>`}
              </pre>
              <button
                onClick={copyEmbedCode}
                className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 transition flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
