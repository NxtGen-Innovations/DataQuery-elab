'use client'

import Link from 'next/link'
import { CURRICULUM } from '@/lib/curriculum-data'
import { BookOpen, Brain, ChevronRight, Circle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

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

export default function CurriculumPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest mb-3">
          <Link href="/dashboard" className="hover:text-purple-400 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/40">Curriculum</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-black text-white mb-2">Curriculum Sheet</h1>
        <p className="text-white/40 text-sm max-w-xl leading-relaxed">
          Master Data Science from scratch — theory, quizzes, and hands-on code in one place.
        </p>
      </div>

      <div className="space-y-16">
        {CURRICULUM.map((domain) => {
          const cfg = domainConfig[domain.domain]
          const DomainIcon = cfg?.icon ?? BookOpen
          const totalLessons = domain.topics.reduce((a, t) => a + t.lessons.length, 0)

          return (
            <section key={domain.domain}>
              {/* Domain Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-8">
                <div className="flex items-center gap-3">
                  <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', cfg?.bg ?? 'bg-white/5')}>
                    <DomainIcon className={cn('w-5 h-5', cfg?.color ?? 'text-white/40')} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">{domain.domain}</h2>
                    <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">Domain Path</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-6 text-right">
                  <div>
                    <p className="text-lg font-bold text-white">0%</p>
                    <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">Completed</p>
                  </div>
                  <div className="w-px h-8 bg-white/5" />
                  <div>
                    <p className="text-lg font-bold text-white">{totalLessons}</p>
                    <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">Lessons</p>
                  </div>
                </div>
              </div>

              {/* Topics + Lessons */}
              <div className="space-y-10">
                {domain.topics.map((topicGroup) => (
                  <div key={topicGroup.topic}>
                    <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.25em] flex items-center gap-3 mb-4">
                      <span className="w-6 h-px bg-white/10" />
                      {topicGroup.topic}
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {topicGroup.lessons.map((lesson) => (
                        <Link key={lesson.id} href={`/curriculum/${lesson.id}`}>
                          <Card
                            className="bg-[#111111] border-white/5 hover:border-purple-500/25 transition-all duration-200 group relative overflow-hidden cursor-pointer"
                          >
                            {/* Hover glow */}
                            <div className="absolute top-0 right-0 w-28 h-28 bg-purple-500/5 blur-[40px] -mr-14 -mt-14 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <CardContent className="p-4 flex items-center gap-4">
                              {/* Completion toggle */}
                              <div className="w-9 h-9 rounded-full border border-white/8 bg-white/3 flex items-center justify-center text-white/15 group-hover:border-purple-500/30 group-hover:text-purple-400/60 transition-all shrink-0">
                                <Circle className="w-4 h-4" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                                  {lesson.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1.5">
                                  <span className={cn(
                                    'text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded',
                                    lesson.difficulty === 'beginner' ? 'bg-green-500/10 text-green-400' :
                                    lesson.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                                    'bg-red-500/10 text-red-400'
                                  )}>
                                    {lesson.difficulty}
                                  </span>
                                  <span className="text-[9px] text-white/20 font-bold uppercase tracking-widest">5–10 min</span>
                                </div>
                              </div>

                              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400/50 group-hover:text-purple-400 group-hover:bg-purple-500/20 transition-all shrink-0">
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
    </div>
  )
}
