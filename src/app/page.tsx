'use client'

import { useState } from 'react'
import { Zap, Share2, Layout, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [email, setEmail] = useState('')

  return (
    <main className="min-h-screen bg-neutral-950">
      {/* Nav */}
      <nav className="border-b border-neutral-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-400" />
            <span className="font-semibold text-white">IndieUpdates</span>
          </div>
          <Link href="/editor" className="text-sm text-neutral-400 hover:text-white transition">Editor</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium mb-6">
          <Zap className="w-3 h-3" /> Now in beta — free while building
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          Write once.<br />
          <span className="text-sky-400">Ship everywhere.</span>
        </h1>
        <p className="text-lg text-neutral-400 max-w-xl mb-8">
          The update hub for indie makers. Draft your product update once, then
          publish to your changelog, X/Twitter, Discord, and newsletter — in one click.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/editor"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-medium rounded-lg transition">
            Create your first update <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="#how"
            className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-700 hover:border-neutral-500 text-neutral-300 rounded-lg transition">
            See how it works
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="how" className="max-w-5xl mx-auto px-6 py-20 border-t border-neutral-800">
        <h2 className="text-2xl font-bold text-white mb-12 text-center">From draft to everywhere</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Layout className="w-6 h-6" />}
            title="Write in Markdown"
            desc="Draft your update with images, GIFs, and rich formatting. No clunky CMS."
          />
          <FeatureCard
            icon={<Share2 className="w-6 h-6" />}
            title="One-click publish"
            desc="Automatically format for X threads, Discord, newsletters, and your changelog."
          />
          <FeatureCard
            icon={<Sparkles className="w-6 h-6" />}
            title="Embeddable changelog"
            desc="A beautiful changelog page you can embed on your site — with zero code."
          />
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-neutral-800">
        <h2 className="text-2xl font-bold text-white mb-12 text-center">Simple pricing</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/50">
            <h3 className="text-lg font-semibold text-white mb-2">Free</h3>
            <p className="text-3xl font-bold text-white mb-4">$0</p>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>3 updates / month</li>
              <li>Changelog page</li>
              <li>X/Twitter generation</li>
              <li>Basic templates</li>
            </ul>
          </div>
          <div className="p-6 rounded-xl border border-sky-500/30 bg-sky-500/5">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-white">Creator</h3>
              <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 text-xs">Popular</span>
            </div>
            <p className="text-3xl font-bold text-white mb-4">$15<span className="text-base font-normal text-neutral-400">/mo</span></p>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>Unlimited updates</li>
              <li>Discord + Newsletter</li>
              <li>Custom domain</li>
              <li>Remove branding</li>
              <li>AI thread writer</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-neutral-800 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Stop copy-pasting updates.</h2>
        <p className="text-neutral-400 mb-8">Join indie makers shipping faster.</p>
        <Link href="/editor"
          className="inline-flex items-center gap-2 px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-lg transition">
          Start for free <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-8 text-center text-sm text-neutral-500">
        Built in public by an indie maker.
      </footer>
    </main>
  )
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/30">
      <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-neutral-400">{desc}</p>
    </div>
  )
}
