'use client'

import { useState } from 'react'
import { Mail, Check, ArrowRight, Loader2 } from 'lucide-react'

interface WaitlistFormProps {
  cta?: string
  placeholder?: string
  formspreeId?: string
  buttonText?: string
}

export function WaitlistForm({
  cta = 'Get early access',
  placeholder = 'you@example.com',
  formspreeId = 'YOUR_FORMSPREE_ID',
  buttonText = 'Join waitlist',
}: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) return

    if (formspreeId === 'YOUR_FORMSPREE_ID') {
      // Demo mode: simulate success
      setStatus('submitting')
      await new Promise((r) => setTimeout(r, 800))
      setStatus('success')
      setTimeout(() => {
        setStatus('idle')
        setEmail('')
      }, 3000)
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product: 'indie-updates-hub', source: window.location.pathname }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <div className="w-full max-w-md">
      <p className="text-sm text-neutral-500 mb-3">{cta}</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            disabled={status === 'submitting'}
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:border-sky-500/50 text-sm disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 disabled:bg-sky-500/50 text-white rounded-lg text-sm font-medium transition flex items-center gap-2 shrink-0"
        >
          {status === 'submitting' && <Loader2 className="w-4 h-4 animate-spin" />}
          {status === 'success' && <Check className="w-4 h-4" />}
          {status === 'idle' && <ArrowRight className="w-4 h-4" />}
          {status === 'error' && 'Retry'}
          {status === 'submitting' ? '...' : status === 'success' ? 'Joined!' : status === 'error' ? 'Retry' : buttonText}
        </button>
      </form>
      {status === 'success' && (
        <p className="text-xs text-emerald-400 mt-2">You&apos;re on the list! We&apos;ll be in touch soon.</p>
      )}
      {status === 'error' && (
        <p className="text-xs text-red-400 mt-2">Something went wrong. Please try again.</p>
      )}
      <p className="text-xs text-neutral-700 mt-2">
        Join 200+ indie makers getting early access. No spam, ever.
      </p>
    </div>
  )
}
