'use client'

import { useState } from 'react'
import { Zap, Share2, Layout, ArrowRight, Sparkles, Check, Mail, Twitter, Star, Quote } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setTimeout(() => {
        setSubscribed(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950">
      {/* Nav */}
      <nav className="border-b border-neutral-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-400" />
            <span className="font-semibold text-white">IndieUpdates</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/editor" className="text-sm text-neutral-400 hover:text-white transition">Editor</Link>
            <Link href="/changelog" className="text-sm text-neutral-400 hover:text-white transition">Changelog</Link>
            <Link href="/editor"
              className="text-sm px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-lg transition">
              Get started
            </Link>
          </div>
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

        {/* Social Proof */}
        <div className="mt-12 flex items-center gap-4 text-sm text-neutral-500">
          <div className="flex -space-x-2">
            {['bg-sky-400', 'bg-emerald-400', 'bg-amber-400', 'bg-rose-400'].map((c, i) => (
              <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-neutral-950 flex items-center justify-center text-xs font-bold text-neutral-950`}>
                {['JD', 'MK', 'AL', 'SR'][i]}
              </div>
            ))}
          </div>
          <p>Trusted by <span className="text-neutral-300 font-medium">127+</span> indie makers</p>
        </div>
      </section>

      {/* Features */}
      <section id="how" className="max-w-5xl mx-auto px-6 py-20 border-t border-neutral-800">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">From draft to everywhere</h2>
        <p className="text-neutral-500 text-center mb-12 max-w-lg mx-auto">No more copy-pasting between platforms. Write once, let us handle the formatting.</p>
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

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-neutral-800">
        <h2 className="text-2xl font-bold text-white mb-12 text-center">Loved by indie makers</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Testimonial
            quote="I used to spend 20 minutes formatting the same update for 4 platforms. Now it takes 2."
            author="Marcus K."
            role="Solo founder, SaaS Toolkit"
          />
          <Testimonial
            quote="The changelog widget alone is worth it. My users actually read our updates now."
            author="Alicia L."
            role="Indie maker, Notion tools"
          />
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-neutral-800">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Simple pricing</h2>
        <p className="text-neutral-500 text-center mb-12">Start free. Upgrade when you need more.</p>
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/50">
            <h3 className="text-lg font-semibold text-white mb-2">Free</h3>
            <p className="text-3xl font-bold text-white mb-4">$0</p>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 3 updates / month</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Changelog page</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> X/Twitter generation</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Basic templates</li>
            </ul>
          </div>
          <div className="p-6 rounded-xl border border-sky-500/30 bg-sky-500/5 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 rounded-full bg-sky-500 text-white text-xs font-medium">Popular</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Creator</h3>
            <p className="text-3xl font-bold text-white mb-4">$15<span className="text-base font-normal text-neutral-400">/mo</span></p>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Unlimited updates</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Discord + Newsletter</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Custom domain</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Remove branding</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> AI thread writer</li>
            </ul>
          </div>
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/50">
            <h3 className="text-lg font-semibold text-white mb-2">Team</h3>
            <p className="text-3xl font-bold text-white mb-4">$49<span className="text-base font-normal text-neutral-400">/mo</span></p>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Everything in Creator</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 5 team members</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Priority support</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> API access</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> White-label</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 py-20 border-t border-neutral-800">
        <h2 className="text-2xl font-bold text-white mb-12 text-center">Frequently asked</h2>
        <div className="space-y-6">
          <FaqItem
            q="Do I need to connect my social accounts?"
            a="Not to get started. We generate formatted content you can copy-paste anywhere. One-click publishing requires connecting your accounts."
          />
          <FaqItem
            q="Can I use my own domain for the changelog?"
            a="Yes — the Creator plan includes custom domain support. Just point your CNAME and we'll handle the SSL."
          />
          <FaqItem
            q="Is there a limit on how many updates I can publish?"
            a="Free plan includes 3 updates per month. Creator and Team plans are unlimited."
          />
          <FaqItem
            q="What happens to my data?"
            a="Your data belongs to you. We store updates securely and never share them with third parties. You can export or delete everything at any time."
          />
        </div>
      </section>

      {/* CTA + Newsletter */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-neutral-800 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Stop copy-pasting updates.</h2>
        <p className="text-neutral-400 mb-8">Join indie makers shipping faster.</p>
        <Link href="/editor"
          className="inline-flex items-center gap-2 px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-lg transition mb-8">
          Start for free <ArrowRight className="w-4 h-4" />
        </Link>

        <div className="max-w-md mx-auto">
          <p className="text-sm text-neutral-500 mb-3">Get indie maker tips + product updates. No spam.</p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="flex-1 px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-sky-500/50 text-sm"
            />
            <button type="submit"
              className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-2">
              {subscribed ? <><Check className="w-4 h-4 text-emerald-400" /> Subscribed</> : <><Mail className="w-4 h-4" /> Subscribe</>}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-sky-400" />
                <span className="font-semibold text-white">IndieUpdates</span>
              </div>
              <p className="text-sm text-neutral-500">Write once. Ship everywhere.</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-neutral-500">
                <li><Link href="/editor" className="hover:text-neutral-300 transition">Editor</Link></li>
                <li><Link href="/changelog" className="hover:text-neutral-300 transition">Changelog</Link></li>
                <li><a href="#" className="hover:text-neutral-300 transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-neutral-500">
                <li><a href="#" className="hover:text-neutral-300 transition">Documentation</a></li>
                <li><a href="#" className="hover:text-neutral-300 transition">Changelog</a></li>
                <li><a href="#" className="hover:text-neutral-300 transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-3">Connect</h4>
              <div className="flex gap-3">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://github.com/oversea-starups/indie-updates-hub" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition">
                  <Star className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
            <p>Built in public by an indie maker.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-neutral-400 transition">Privacy</a>
              <a href="#" className="hover:text-neutral-400 transition">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/30 hover:bg-neutral-900/50 transition">
      <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-neutral-400">{desc}</p>
    </div>
  )
}

function Testimonial({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/30">
      <Quote className="w-6 h-6 text-sky-500/40 mb-3" />
      <p className="text-neutral-300 mb-4 leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <div>
        <p className="text-sm font-medium text-white">{author}</p>
        <p className="text-xs text-neutral-500">{role}</p>
      </div>
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <h3 className="font-medium text-white mb-2">{q}</h3>
      <p className="text-sm text-neutral-400 leading-relaxed">{a}</p>
    </div>
  )
}
