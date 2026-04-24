'use client'

import Link from 'next/link'
import { Lock, Trophy, Calendar, Zap, TrendingUp, Lightbulb } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

const tips = [
  'Start with Foundations before jumping into Modeling.',
  'Practice daily — even 10 minutes counts!',
  'Run your code in the sandbox to truly learn.',
  'Revisit quizzes to reinforce concepts.',
  'Understand the math — it makes the code click.',
]

const lockedItems = [
  { icon: Trophy, label: 'Progress', desc: 'Track your completion' },
  { icon: Calendar, label: 'Daily Planner', desc: 'Plan your sessions' },
  { icon: Zap, label: 'Streak Board', desc: 'See your streaks' },
]

export function RightSidebar() {
  const { isLoggedIn } = useAuth()

  // Rotate tips by day of year
  const now = new Date()
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
  const tip = tips[dayOfYear % tips.length]

  return (
    <aside className="fixed right-0 top-0 h-screen w-[280px] hidden xl:flex flex-col py-6 px-4 bg-[#0c0c0c] border-l border-white/[0.06] z-40 overflow-y-auto">

      {/* Login prompt — only for unauthenticated */}
      {!isLoggedIn && (
        <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/5 border border-purple-500/15 rounded-2xl p-5 mb-5">
          <p className="text-xs text-white/70 leading-relaxed mb-4">
            You&apos;re just a step away —{' '}
            <Link href="/login" className="text-purple-400 font-bold hover:text-purple-300 transition-colors">Login</Link>
            {' '}or{' '}
            <Link href="/signup" className="text-purple-400 font-bold hover:text-purple-300 transition-colors">Sign Up</Link>
            {' '}to unlock all features!
          </p>
          <Link href="/signup">
            <button className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors shadow-lg shadow-purple-500/20">
              Get Started Free
            </button>
          </Link>
        </div>
      )}

      {/* Quick Tip */}
      <div className="bg-gradient-to-br from-yellow-500/5 to-orange-500/5 border border-yellow-500/10 rounded-2xl p-4 mb-5">
        <div className="flex items-center gap-2 mb-2.5">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <span className="text-[10px] font-black text-yellow-400/70 uppercase tracking-widest">Quick Tip</span>
        </div>
        <p className="text-xs text-white/50 leading-relaxed">{tip}</p>
      </div>

      {/* Locked features */}
      <div className="space-y-2 mb-6">
        {lockedItems.map((item) => (
          <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] group hover:bg-white/[0.05] transition-all">
            <div className="flex items-center gap-3">
              <item.icon className="w-4 h-4 text-white/20 group-hover:text-purple-400/60 transition-colors" />
              <div>
                <p className="text-[12px] font-bold text-white/40">{item.label}</p>
                <p className="text-[10px] text-white/20">{item.desc}</p>
              </div>
            </div>
            <Lock className="w-3.5 h-3.5 text-white/15 group-hover:text-purple-400/40 transition-colors" />
          </div>
        ))}
      </div>

      {/* Motivational card */}
      <div className="relative rounded-2xl overflow-hidden aspect-[4/5] mb-5 group cursor-pointer">
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop"
          alt="Motivation"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 p-5 flex flex-col justify-end">
          <span className="text-4xl text-white/20 font-serif leading-none">&ldquo;</span>
          <p className="text-sm font-bold text-white leading-snug mt-[-8px]">
            Life has no remote. Get Up and change it yourself.
          </p>
          <p className="text-[10px] text-white/30 mt-3 uppercase font-bold tracking-widest">Daily Motivation</p>
        </div>
      </div>

      {/* Progress Hint */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-purple-400" />
          <span className="text-[11px] font-black text-white/60 uppercase tracking-widest">This Week</span>
        </div>
        {[
          { label: 'Foundations', pct: 33 },
          { label: 'Modeling', pct: 15 },
          { label: 'Evaluation', pct: 0 },
        ].map((d) => (
          <div key={d.label} className="mb-3 last:mb-0">
            <div className="flex justify-between text-[10px] font-bold mb-1.5">
              <span className="text-white/40">{d.label}</span>
              <span className="text-white/60">{d.pct}%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: `${d.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
