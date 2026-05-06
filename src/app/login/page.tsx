'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Brain, User, Mail, ArrowRight, GitBranch } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'

export default function LoginPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()

  function handleAccess(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      // Use signup to establish or update the local user profile
      signup(name, email, 'local-session')
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
          <p className="text-[10px] font-semibold text-[#8b949e] uppercase tracking-widest mb-4">Decentralized Workspace</p>
          <blockquote className="text-xl font-medium text-[#e6edf3] leading-snug mb-6 border-l-2 border-[#58a6ff] pl-4">
            "Your data, your machine. All progress is stored locally in your browser for maximum privacy and performance."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#30363d] flex items-center justify-center text-[#e6edf3] font-semibold text-xs border border-[#8b949e]/20">
              U
            </div>
            <div>
              <p className="text-xs font-semibold text-[#e6edf3]">Local Session</p>
              <p className="text-[11px] text-[#8b949e]">Browser Memory Persistent</p>
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
            <h1 className="text-xl font-semibold text-[#e6edf3] mb-1.5">Access Workspace</h1>
            <p className="text-[13px] text-[#8b949e]">Enter your details to synchronize your local session.</p>
          </div>

          <form onSubmit={handleAccess} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-[#e6edf3]">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Student Name"
                  required
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-9 pr-3 py-1.5 text-[13px] text-[#e6edf3] placeholder:text-[#8b949e] focus:outline-none focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff] transition-all"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8b949e]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-[#e6edf3]">Email address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-9 pr-3 py-1.5 text-[13px] text-[#e6edf3] placeholder:text-[#8b949e] focus:outline-none focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff] transition-all"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8b949e]" />
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
                  Initialising...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  Enter Workspace
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
            <GitBranch className="w-3.5 h-3.5 mr-2 text-[#8b949e]" /> Continue as Guest
          </Button>

          <p className="text-center text-[12px] text-[#8b949e] mt-6 px-4 p-4 border border-[#30363d] rounded-md bg-[#161b22]">
            All session data is stored in your <span className="text-[#58a6ff] font-medium">Browser Cache</span>. Clearing your cache will reset your progress.
          </p>
        </div>
      </div>
    </div>
  )
}
