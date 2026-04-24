'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Brain, Eye, EyeOff, ArrowRight, GitBranch, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'

const perks = [
  'Structured Data Science curriculum',
  'Interactive quizzes & coding sandbox',
  'Track progress & earn badges',
]

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()

  function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      signup(form.name, form.email, form.password)
      setLoading(false)
      window.location.href = '/dashboard'
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-[#080808] flex">
      {/* Left: Form Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-white">DataQuest <span className="text-purple-400">eLab</span></span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-black text-white mb-1.5">Create your account</h1>
            <p className="text-sm text-white/40">Join 10,000+ students learning Data Science.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Minimum 8 characters"
                  required
                  minLength={8}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-lg shadow-purple-500/20 group mt-2 disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create Free Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>

            <p className="text-[10px] text-white/20 text-center leading-relaxed">
              By signing up, you agree to our{' '}
              <span className="text-white/40 hover:text-white cursor-pointer">Terms of Service</span> and{' '}
              <span className="text-white/40 hover:text-white cursor-pointer">Privacy Policy</span>.
            </p>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-[11px] text-white/20 font-bold uppercase">or</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          <Button variant="outline" className="w-full h-12 border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-semibold text-sm">
            <GitBranch className="w-4 h-4 mr-2" /> Continue with GitHub
          </Button>

          <p className="text-center text-sm text-white/30 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-purple-400 hover:text-purple-300 font-bold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Perks Panel */}
      <div className="hidden lg:flex flex-col justify-center w-[45%] relative overflow-hidden p-12 bg-gradient-to-bl from-purple-900/20 to-[#080808] border-l border-white/5">
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/8 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-6">What you get</p>
          <h2 className="text-3xl font-black text-white mb-8 leading-tight">
            Everything to master<br />
            <span className="gradient-text">Data Science</span>
          </h2>

          <div className="space-y-5 mb-10">
            {perks.map((perk) => (
              <div key={perk} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <p className="text-sm text-white/70 leading-relaxed">{perk}</p>
              </div>
            ))}
          </div>

          {/* Floating badge cards */}
          <div className="space-y-3">
            {[
              { emoji: '🎓', title: 'First Lesson', color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/20' },
              { emoji: '🔥', title: '3-Day Streak', color: 'from-orange-500/20 to-red-500/10 border-orange-500/20' },
              { emoji: '🏆', title: 'Quiz Ace', color: 'from-yellow-500/20 to-amber-500/10 border-yellow-500/20' },
            ].map((b, i) => (
              <div
                key={b.title}
                className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${b.color} border float`}
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <span className="text-xl">{b.emoji}</span>
                <div>
                  <p className="text-xs font-bold text-white">{b.title}</p>
                  <p className="text-[10px] text-white/30">Achievement unlocked</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
