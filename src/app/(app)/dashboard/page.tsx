'use client'

import Link from 'next/link'
import { BookOpen, Brain, BarChart2, TrendingUp, Search, ChevronRight, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const categories = [
  {
    id: 'stats',
    label: 'Statistics',
    icon: BarChart2,
    iconColor: 'text-orange-400',
    bg: 'bg-gradient-to-br from-orange-500/10 to-orange-900/5',
    count: '3 Sheets',
    href: '/curriculum',
  },
  {
    id: 'ml',
    label: 'Machine Learning',
    icon: Brain,
    iconColor: 'text-purple-400',
    bg: 'bg-gradient-to-br from-purple-500/10 to-purple-900/5',
    count: '4 Sheets',
    href: '/curriculum',
  },
  {
    id: 'viz',
    label: 'Data Viz',
    icon: TrendingUp,
    iconColor: 'text-emerald-400',
    bg: 'bg-gradient-to-br from-emerald-500/10 to-emerald-900/5',
    count: 'Coming Soon',
    href: '#',
  },
]

const badges = [
  {
    id: 'first-lesson',
    emoji: '🎓',
    title: 'First Lesson',
    desc: 'Completed your first lesson',
    color: 'from-blue-500/20 to-cyan-500/10',
    border: 'border-blue-500/20',
    earned: true,
  },
  {
    id: 'streak-3',
    emoji: '🔥',
    title: '3-Day Streak',
    desc: 'Studied 3 days in a row',
    color: 'from-orange-500/20 to-red-500/10',
    border: 'border-orange-500/20',
    earned: true,
  },
  {
    id: 'quiz-ace',
    emoji: '🏆',
    title: 'Quiz Ace',
    desc: 'Scored 100% on a quiz',
    color: 'from-yellow-500/20 to-amber-500/10',
    border: 'border-yellow-500/20',
    earned: false,
  },
  {
    id: 'coder',
    emoji: '⚡',
    title: 'First Code Run',
    desc: 'Executed Python in the sandbox',
    color: 'from-purple-500/20 to-indigo-500/10',
    border: 'border-purple-500/20',
    earned: false,
  },
  {
    id: 'week-streak',
    emoji: '📅',
    title: '7-Day Streak',
    desc: 'Studied an entire week',
    color: 'from-pink-500/20 to-rose-500/10',
    border: 'border-pink-500/20',
    earned: false,
  },
  {
    id: 'domain-master',
    emoji: '🧠',
    title: 'Domain Master',
    desc: 'Completed a full domain',
    color: 'from-emerald-500/20 to-green-500/10',
    border: 'border-emerald-500/20',
    earned: false,
  },
]

export default function HomePage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">Welcome Back</p>
          <h1 className="text-2xl lg:text-3xl font-black text-white">Explorer 👋</h1>
          <p className="text-white/40 text-sm mt-1">Keep up the momentum — you're on a <span className="text-orange-400 font-bold">3-day streak!</span></p>
        </div>
        <div className="relative group shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-purple-400 transition-colors" />
          <input
            type="text"
            placeholder="Search topics..."
            className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-purple-500/50 w-56 transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-white">Categories</h2>
          <Link href="/curriculum" className="text-[11px] font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 uppercase tracking-widest transition-colors">
            All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <Link key={cat.id} href={cat.href}>
              <Card className={`${cat.bg} border-white/5 hover:border-white/10 hover:scale-[1.02] transition-all duration-200 cursor-pointer group overflow-hidden`}>
                <CardContent className="p-4">
                  <div className="mb-3">
                    <cat.icon className={`w-7 h-7 ${cat.iconColor}`} />
                  </div>
                  <p className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">{cat.label}</p>
                  <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mt-1">{cat.count}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
          <Link href="/admin/add">
            <Card className="border-dashed border-white/10 bg-transparent hover:border-purple-500/30 hover:bg-purple-500/5 transition-all cursor-pointer group h-full min-h-[90px] flex flex-col items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:text-purple-400 group-hover:border-purple-500/30 transition-all">
                <Plus className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-white/30 group-hover:text-purple-300 uppercase tracking-widest transition-colors">Add New</span>
            </Card>
          </Link>
        </div>
      </section>

      {/* Achievements / Badges */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-white">Your Achievements</h2>
            <p className="text-[11px] text-white/30 mt-0.5">2 of 6 badges earned</p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-white/30">
            <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
            Earned
            <span className="w-2 h-2 rounded-full bg-white/10 inline-block ml-2" />
            Locked
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`relative rounded-xl border p-4 flex flex-col gap-2 transition-all duration-300 ${
                badge.earned
                  ? `bg-gradient-to-br ${badge.color} ${badge.border} hover:scale-[1.02] cursor-default`
                  : 'bg-white/[0.02] border-white/5 opacity-50 cursor-not-allowed'
              }`}
            >
              {/* Shimmer for earned badges */}
              {badge.earned && (
                <div className="absolute inset-0 rounded-xl badge-shimmer pointer-events-none" />
              )}

              <div className="flex items-center justify-between">
                <span className="text-2xl">{badge.emoji}</span>
                {badge.earned ? (
                  <span className="text-[9px] font-black text-green-400 uppercase tracking-widest bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
                    Earned
                  </span>
                ) : (
                  <span className="text-[9px] font-black text-white/20 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-full">
                    Locked
                  </span>
                )}
              </div>
              <div>
                <p className={`text-sm font-bold ${badge.earned ? 'text-white' : 'text-white/40'}`}>{badge.title}</p>
                <p className="text-[10px] text-white/30 mt-0.5 leading-relaxed">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Streak / Quick Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Day Streak', value: '3', emoji: '🔥', sub: 'Keep going!' },
          { label: 'Lessons Done', value: '2', emoji: '📚', sub: 'of 7 total' },
          { label: 'Quizzes Passed', value: '1', emoji: '✅', sub: 'out of 5' },
          { label: 'Code Runs', value: '0', emoji: '⚡', sub: 'Try the sandbox!' },
        ].map((stat) => (
          <Card key={stat.label} className="bg-[#111111] border-white/5 p-4">
            <p className="text-xl mb-2">{stat.emoji}</p>
            <p className="text-2xl font-black text-white">{stat.value}</p>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-0.5">{stat.label}</p>
            <p className="text-[10px] text-white/20 mt-0.5">{stat.sub}</p>
          </Card>
        ))}
      </section>

    </div>
  )
}
