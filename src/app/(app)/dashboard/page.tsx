'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, Brain, ChevronRight, Target, Circle, Search, GraduationCap, ArrowRight, HelpCircle, Code2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { CURRICULUM, getAllLessons } from '@/lib/curriculum-data'

const domainConfig: Record<string, { icon: any; color: string; bg: string }> = {
  'Data Science': {
    icon: Brain,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const { user } = useAuth()
  const userName = user?.name || 'Explorer'
  const totalLessons = getAllLessons().length
  const domain = CURRICULUM[0] // Data Science

  return (
    <div className="min-h-screen bg-[#080808] relative overflow-hidden">
      {/* Enhanced Background Blend */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/20 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/15 blur-[140px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 p-6 lg:p-10 space-y-10">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold text-purple-400 uppercase tracking-[0.2em] mb-2">Student Dashboard</p>
            <h1 className="text-3xl lg:text-4xl font-black text-white">Welcome back, {userName}! 👋</h1>
            <p className="text-white/40 text-sm mt-2">Ready to continue your journey in <span className="text-purple-400 font-bold">Data Science</span>?</p>
          </div>
          <div className="relative group shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="Search lessons..."
              className="bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/30 w-full sm:w-64 transition-all"
            />
          </div>
        </div>

        {/* Learning Progress Summary */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {domain.topics.map((topic, i) => {
            const progressValues = [33, 0, 0, 0, 0]
            const colors = ['from-purple-500 to-indigo-500', 'from-blue-500 to-cyan-500', 'from-emerald-500 to-green-500', 'from-orange-500 to-yellow-500', 'from-pink-500 to-rose-500']
            const pct = progressValues[i] || 0
            return (
              <Card key={topic.topic} className="bg-white/[0.02] border-white/5 hover:border-white/10 transition-all duration-300 rounded-2xl overflow-hidden group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Module {i + 1}</p>
                      <p className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">{topic.topic.split(': ')[1] || topic.topic}</p>
                    </div>
                    <Target className="w-4 h-4 text-purple-400/50" />
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full bg-gradient-to-r ${colors[i % colors.length]} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-tight">{pct}% Complete</p>
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-tight">{topic.lessons.length} Lessons</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>

        {/* Modules & Curriculum */}
        <div className="space-y-12">
          {CURRICULUM.map((domain) => {
            const cfg = domainConfig[domain.domain]
            const DomainIcon = cfg?.icon ?? BookOpen
            const totalLessons = domain.topics.reduce((a, t) => a + t.lessons.length, 0)

            return (
              <section key={domain.domain}>
                {/* Domain Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-8">
                  <div className="flex items-center gap-4">
                    <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg', cfg?.bg ?? 'bg-white/5')}>
                      <DomainIcon className={cn('w-6 h-6', cfg?.color ?? 'text-white/40')} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-white">{domain.domain} Mastery</h2>
                      <p className="text-[10px] text-white/30 uppercase font-black tracking-widest mt-1">Full Curriculum Path</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-8 text-right">
                    <div>
                      <p className="text-2xl font-black text-white">0%</p>
                      <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">Overall Completion</p>
                    </div>
                    <div className="w-px h-10 bg-white/5" />
                    <div>
                      <p className="text-2xl font-black text-white">{totalLessons}</p>
                      <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">Total Lessons</p>
                    </div>
                  </div>
                </div>

                {/* Topics + Lessons */}
                <div className="space-y-12">
                  {domain.topics.map((topicGroup) => (
                    <div key={topicGroup.topic}>
                      <div className="flex items-center gap-4 mb-6">
                        <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em]">
                          {topicGroup.topic}
                        </h3>
                        <div className="flex-1 h-px bg-white/5" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {topicGroup.lessons.map((lesson) => (
                          <Link key={lesson.id} href={`/curriculum/${lesson.id}`}>
                            <Card
                              className="bg-white/[0.01] border-white/5 hover:border-purple-500/30 hover:bg-purple-500/[0.02] transition-all duration-300 group relative overflow-hidden cursor-pointer h-full"
                            >
                              {/* Hover glow */}
                              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />

                              <CardContent className="p-5 flex items-center gap-5">
                                {/* Completion Indicator */}
                                <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/10 group-hover:border-purple-500/40 group-hover:text-purple-400 transition-all shrink-0">
                                  <Circle className="w-5 h-5" />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-bold text-white group-hover:text-purple-200 transition-colors line-clamp-1">
                                    {lesson.title}
                                  </h4>
                                  <div className="flex items-center gap-3 mt-2">
                                    <div className="flex items-center gap-3">
                                      <div className="flex items-center gap-1 text-[9px] text-white/40 font-bold uppercase tracking-tighter">
                                        <BookOpen className="w-2.5 h-2.5" />
                                        Notes
                                      </div>
                                      <div className="flex items-center gap-1 text-[9px] text-white/40 font-bold uppercase tracking-tighter">
                                        <HelpCircle className="w-2.5 h-2.5" />
                                        Quiz
                                      </div>
                                      <div className="flex items-center gap-1 text-[9px] text-purple-400/60 font-bold uppercase tracking-tighter">
                                        <Code2 className="w-2.5 h-2.5" />
                                        Lab
                                      </div>
                                    </div>
                                    <span className={cn(
                                      'text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ml-auto',
                                      lesson.difficulty === 'beginner' ? 'bg-green-500/5 border-green-500/20 text-green-400' :
                                      lesson.difficulty === 'intermediate' ? 'bg-yellow-500/5 border-yellow-500/20 text-yellow-400' :
                                      'bg-red-500/5 border-red-500/20 text-red-400'
                                    )}>
                                      {lesson.difficulty}
                                    </span>
                                  </div>
                                </div>

                                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-purple-400 group-hover:bg-purple-500/20 transition-all shrink-0">
                                  <ChevronRight className="w-4 h-4" />
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {/* Continue Learning CTA */}
        <section className="pt-10">
          <Card className="bg-gradient-to-r from-purple-600/20 via-indigo-600/10 to-transparent border-purple-500/20 overflow-hidden rounded-3xl">
            <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-purple-600/20 flex items-center justify-center shrink-0 shadow-xl border border-purple-500/30">
                  <GraduationCap className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Resume Your Journey</h3>
                  <p className="text-white/40 mt-1">Pick up where you left off in <span className="text-white/80 font-bold">Module 1: Pandas Basics</span></p>
                </div>
              </div>
              <Link href="/curriculum/ds-mod1-01">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-10 h-14 rounded-2xl shadow-xl shadow-purple-500/20 group transition-all hover:scale-105">
                  Continue Learning <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
