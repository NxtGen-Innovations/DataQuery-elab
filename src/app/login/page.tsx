'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Brain, Eye, EyeOff, ArrowRight, GitBranch } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      login(email, password)
      setLoading(false)
      window.location.href = '/dashboard'
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] flex">
      {/* Left: Branding Panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] relative overflow-hidden p-12 border-r border-[#30363d] bg-[#161b22]">
        <Link href="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-9 h-9 rounded-md border border-[#30363d] bg-[#0d1117] flex items-center justify-center shadow-sm">
            <Brain className="w-5 h-5 text-[#58a6ff]" />
          </div>
          <span className="font-semibold text-[#e6edf3] text-lg tracking-tight">DataQuest <span className="text-[#8b949e] font-normal">eLab</span></span>
        </Link>

        <div className="relative z-10">
          <p className="text-[10px] font-semibold text-[#8b949e] uppercase tracking-widest mb-4">Student Testimonial</p>
          <blockquote className="text-xl font-medium text-[#e6edf3] leading-snug mb-6 border-l-2 border-[#58a6ff] pl-4">
            "The only platform where I actually write code while learning theory. It just clicks."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#30363d] flex items-center justify-center text-[#e6edf3] font-semibold text-xs border border-[#8b949e]/20">
              A
            </div>
            <div>
              <p className="text-xs font-semibold text-[#e6edf3]">Arjun Singh</p>
              <p className="text-[11px] text-[#8b949e]">2nd Year, B.Tech Data Science</p>
            </div>
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
            <h1 className="text-xl font-semibold text-[#e6edf3] mb-1.5">Welcome back</h1>
            <p className="text-[13px] text-[#8b949e]">Sign in to continue your learning journey.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-[#e6edf3]">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-[13px] text-[#e6edf3] placeholder:text-[#8b949e] focus:outline-none focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff] transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-medium text-[#e6edf3]">Password</label>
                <button type="button" className="text-[11px] text-[#58a6ff] hover:underline font-medium transition-colors">
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
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  Sign in
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              )}
            </Button>
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
            New to DataQuest eLab?{' '}
            <Link href="/signup" className="text-[#58a6ff] hover:underline transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
