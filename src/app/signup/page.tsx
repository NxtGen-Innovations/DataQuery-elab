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
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex">
      {/* Left: Perks Panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] relative overflow-hidden p-12 border-r border-[#30363d] bg-[#161b22]">
        <Link href="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-9 h-9 rounded-md border border-[#30363d] bg-[#0d1117] flex items-center justify-center shadow-sm">
            <Brain className="w-5 h-5 text-[#58a6ff]" />
          </div>
          <span className="font-semibold text-[#e6edf3] text-lg tracking-tight">DataQuest <span className="text-[#8b949e] font-normal">eLab</span></span>
        </Link>

        <div className="relative z-10">
          <p className="text-[10px] font-semibold text-[#8b949e] uppercase tracking-widest mb-6">What you get</p>
          <h2 className="text-2xl font-semibold text-[#e6edf3] mb-8 leading-tight">
            Everything to master<br />
            <span className="text-[#58a6ff]">Data Science</span>
          </h2>

          <div className="space-y-4 mb-10">
            {perks.map((perk) => (
              <div key={perk} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#3fb950] shrink-0 mt-0.5" />
                <p className="text-[13px] text-[#e6edf3] leading-relaxed">{perk}</p>
              </div>
            ))}
          </div>

          {/* Floating badge cards */}
          <div className="space-y-3">
            {[
              { emoji: '🎓', title: 'First Lesson', bg: 'bg-[#0d1117]' },
              { emoji: '🔥', title: '3-Day Streak', bg: 'bg-[#0d1117]' },
              { emoji: '🏆', title: 'Quiz Ace', bg: 'bg-[#0d1117]' },
            ].map((b, i) => (
              <div
                key={b.title}
                className={`flex items-center gap-3 p-3 rounded-md border border-[#30363d] ${b.bg} float`}
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <span className="text-xl">{b.emoji}</span>
                <div>
                  <p className="text-xs font-semibold text-[#e6edf3]">{b.title}</p>
                  <p className="text-[10px] text-[#8b949e]">Achievement unlocked</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-[#8b949e] relative z-10">© 2025 DataQuest eLab</p>
      </div>

      {/* Right: Form Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[360px]">
          {/* Mobile Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-md border border-[#30363d] bg-[#161b22] flex items-center justify-center">
              <Brain className="w-4 h-4 text-[#58a6ff]" />
            </div>
            <span className="font-semibold text-[#e6edf3]">DataQuest <span className="text-[#8b949e] font-normal">eLab</span></span>
          </Link>

          <div className="mb-8">
            <h1 className="text-xl font-semibold text-[#e6edf3] mb-1.5">Create your account</h1>
            <p className="text-[13px] text-[#8b949e]">Join 10,000+ students learning Data Science.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-[#e6edf3]">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name"
                required
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-[13px] text-[#e6edf3] placeholder:text-[#8b949e] focus:outline-none focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff] transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-[#e6edf3]">Email address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                required
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-[13px] text-[#e6edf3] placeholder:text-[#8b949e] focus:outline-none focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff] transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-[#e6edf3]">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Minimum 8 characters"
                  required
                  minLength={8}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 pr-9 text-[13px] text-[#e6edf3] placeholder:text-[#8b949e] focus:outline-none focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-8 mt-4 bg-[#238636] hover:bg-[#2ea043] text-white font-medium text-[13px] rounded-md border border-[rgba(240,246,252,0.1)] group disabled:opacity-60 shadow-sm transition-colors"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  Create Free Account
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              )}
            </Button>

            <p className="text-[11px] text-[#8b949e] text-center mt-4">
              By signing up, you agree to our{' '}
              <span className="text-[#58a6ff] hover:underline cursor-pointer transition-colors">Terms of Service</span> and{' '}
              <span className="text-[#58a6ff] hover:underline cursor-pointer transition-colors">Privacy Policy</span>.
            </p>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#30363d]" />
            <span className="text-[11px] text-[#8b949e]">or</span>
            <div className="flex-1 h-px bg-[#30363d]" />
          </div>

          <Button variant="outline" className="w-full h-8 bg-[#21262d] hover:bg-[#30363d] border-[#30363d] text-[#e6edf3] font-medium text-[13px] rounded-md transition-colors">
            <GitBranch className="w-3.5 h-3.5 mr-2 text-[#8b949e]" /> Continue with GitHub
          </Button>

          <p className="text-center text-[12px] text-[#8b949e] mt-6 px-4 p-4 border border-[#30363d] rounded-md bg-[#161b22]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#58a6ff] hover:underline transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
