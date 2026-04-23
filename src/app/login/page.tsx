'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Brain, Eye, EyeOff, ArrowRight, GitBranch } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      window.location.href = '/dashboard'
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#080808] flex">
      {/* Left: Branding Panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] relative overflow-hidden p-12 bg-gradient-to-br from-purple-900/30 to-[#080808] border-r border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        <Link href="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-white text-lg tracking-tight">DataQuest <span className="text-purple-400">eLab</span></span>
        </Link>

        <div className="relative z-10">
          <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-4">Student Testimonial</p>
          <blockquote className="text-2xl font-bold text-white leading-snug mb-6">
            "The only platform where I actually write code while learning theory. It just clicks."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-sm">A</div>
            <div>
              <p className="text-sm font-bold text-white">Arjun Singh</p>
              <p className="text-xs text-white/40">2nd Year, B.Tech Data Science</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-white/20 relative z-10">© 2025 DataQuest eLab</p>
      </div>

      {/* Right: Form Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px]">
          {/* Mobile Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-white">DataQuest eLab</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-black text-white mb-1.5">Welcome back</h1>
            <p className="text-sm text-white/40">Sign in to continue your learning journey.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Password</label>
                <button type="button" className="text-[11px] text-purple-400 hover:text-purple-300 font-bold transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
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
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
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
            Don't have an account?{' '}
            <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-bold transition-colors">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
