'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, Brain, Search, ChevronRight, Plus, Flame, Zap, Trophy, Sparkles, CheckCircle2, XCircle, ArrowRight, GraduationCap, Target, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import { CURRICULUM, getDailyQuestion, getAllLessons, type QuizQuestion } from '@/lib/curriculum-data'

export default function HomePage() {
  const { user, isAdmin } = useAuth()
  const userName = user?.name || 'Explorer'
  const totalLessons = getAllLessons().length
  const domain = CURRICULUM[0] // Data Science

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">

      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">Welcome Back</p>
          <h1 className="text-2xl lg:text-3xl font-black text-white">{userName} 👋</h1>
          <p className="text-white/40 text-sm mt-1">Keep up the momentum — you&apos;re on a <span className="text-orange-400 font-bold">3-day streak!</span></p>
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

      {/* Daily Practice Question */}
      <DailyPracticeCard />

      {/* Learning Progress */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-400" />
            Learning Progress
          </h2>
          <Link href="/curriculum" className="text-[11px] font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 uppercase tracking-widest transition-colors">
            View All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {domain.topics.map((topic, i) => {
            const progressValues = [33, 15, 0]
            const colors = ['from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-emerald-500 to-green-500']
            const pct = progressValues[i] || 0
            return (
              <div key={topic.topic} className="group relative">
                <Card className="relative bg-[#0A0A0A] border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden rounded-2xl">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-bold text-white">{topic.topic}</p>
                      <span className="text-[10px] font-bold text-white/30">{topic.lessons.length} lessons</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
                      <div
                        className={`h-full bg-gradient-to-r ${colors[i]} rounded-full transition-all duration-1000 ease-out progress-bar-fill`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-white/30 font-medium">{pct}% complete</p>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </section>

      {/* Data Science Category */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-white">Explore</h2>
          <Link href="/curriculum" className="text-[11px] font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 uppercase tracking-widest transition-colors">
            Browse <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <Link href="/curriculum">
            <Card className="bg-gradient-to-br from-purple-500/10 to-indigo-900/5 border-white/5 hover:border-purple-500/20 hover:scale-[1.02] transition-all duration-200 cursor-pointer group overflow-hidden">
              <CardContent className="p-5">
                <div className="mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Brain className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <p className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">Data Science</p>
                <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mt-1">{totalLessons} Lessons</p>
                <div className="mt-3 flex items-center gap-1.5">
                  {['Foundations', 'Modeling', 'Evaluation'].map((t, i) => (
                    <span key={t} className="text-[8px] bg-white/5 text-white/30 px-1.5 py-0.5 rounded font-bold">{t}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Coming Soon - Data Visualization */}
          <Card className="bg-gradient-to-br from-emerald-500/5 to-emerald-900/5 border-white/5 border-dashed opacity-60 cursor-not-allowed">
            <CardContent className="p-5">
              <div className="mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-emerald-400/50" />
                </div>
              </div>
              <p className="text-sm font-bold text-white/40 leading-snug">Data Visualization</p>
              <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest mt-1">Coming Soon</p>
            </CardContent>
          </Card>

          {/* Add New - Admin Only */}
          {isAdmin && (
            <Link href="/admin/add">
              <Card className="border-dashed border-white/10 bg-transparent hover:border-purple-500/30 hover:bg-purple-500/5 transition-all cursor-pointer group h-full min-h-[140px] flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:text-purple-400 group-hover:border-purple-500/30 transition-all">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-white/30 group-hover:text-purple-300 uppercase tracking-widest transition-colors">Add New</span>
              </Card>
            </Link>
          )}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Day Streak', value: '3', icon: Flame, color: 'text-orange-500', sub: 'Keep going!', bg: 'from-orange-500/10' },
          { label: 'Lessons Done', value: '2', icon: BookOpen, color: 'text-blue-500', sub: `of ${totalLessons} total`, bg: 'from-blue-500/10' },
          { label: 'Quizzes Passed', value: '1', icon: Trophy, color: 'text-yellow-500', sub: 'out of 5', bg: 'from-yellow-500/10' },
          { label: 'Code Runs', value: '0', icon: Zap, color: 'text-purple-500', sub: 'Try the sandbox!', bg: 'from-purple-500/10' },
        ].map((stat) => (
          <div key={stat.label} className="group relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl`} />
            <Card className="relative bg-[#0A0A0A] border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden rounded-2xl h-full">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-black text-white tracking-tight">{stat.value}</p>
                  <p className="text-[10px] font-extrabold text-white/40 uppercase tracking-[0.15em]">{stat.label}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/[0.03]">
                   <p className="text-[10px] text-white/20 font-medium group-hover:text-white/40 transition-colors">{stat.sub}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </section>

      {/* Continue Learning CTA */}
      <section>
        <Card className="bg-gradient-to-br from-purple-500/10 to-indigo-500/5 border-purple-500/15 overflow-hidden">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Continue where you left off</h3>
                <p className="text-sm text-white/40">Linear Regression — Modeling</p>
              </div>
            </div>
            <Link href="/curriculum/ds-model-01">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 shadow-lg shadow-purple-500/20 group">
                Resume <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

// ─── Daily Practice Card ────────────────────────────────────────────────────────

function DailyPracticeCard() {
  const question = getDailyQuestion()
  const [selected, setSelected] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    setAnimateIn(true)
  }, [])

  const isCorrect = selected === question.correct_answer

  function handleAnswer(option: string) {
    if (answered) return
    setSelected(option)
    setAnswered(true)
  }

  return (
    <section className={`transition-all duration-700 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/10">
          <Sparkles className="w-4 h-4 text-yellow-400" />
        </div>
        <h2 className="text-base font-bold text-white">Daily Practice</h2>
        <span className="text-[9px] font-black text-yellow-400/60 uppercase tracking-widest bg-yellow-500/10 px-2 py-0.5 rounded-full ml-1">Question of the Day</span>
      </div>

      <Card className="daily-practice-card relative overflow-hidden border-white/5 bg-[#0c0c0c]">
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-yellow-500/5 to-transparent rounded-full blur-[40px] pointer-events-none" />

        <CardContent className="relative p-6">
          {/* Question */}
          <p className="text-sm text-white/90 font-medium leading-relaxed mb-5">{question.question}</p>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {question.options?.map((option) => {
              const isThis = selected === option
              const isAnswer = option === question.correct_answer

              let optionClass = 'bg-white/[0.03] border-white/[0.06] hover:border-white/15 hover:bg-white/[0.05] text-white/70 hover:text-white'

              if (answered) {
                if (isAnswer) {
                  optionClass = 'bg-green-500/10 border-green-500/30 text-green-400'
                } else if (isThis && !isCorrect) {
                  optionClass = 'bg-red-500/10 border-red-500/30 text-red-400'
                } else {
                  optionClass = 'bg-white/[0.02] border-white/[0.04] text-white/30'
                }
              }

              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={answered}
                  className={`text-left p-3.5 rounded-xl border transition-all duration-200 text-sm font-medium ${optionClass} ${!answered ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div className="flex items-center gap-3">
                    {answered && isAnswer && <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />}
                    {answered && isThis && !isCorrect && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                    <span>{option}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Feedback */}
          {answered && (
            <div className={`mt-5 p-4 rounded-xl border transition-all duration-500 ${
              isCorrect
                ? 'bg-green-500/5 border-green-500/15'
                : 'bg-orange-500/5 border-orange-500/15'
            }`}>
              <div className="flex items-start gap-2">
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className={`text-sm font-bold mb-1 ${isCorrect ? 'text-green-400' : 'text-orange-400'}`}>
                    {isCorrect ? 'Correct! 🎉' : 'Not quite — keep learning!'}
                  </p>
                  <p className="text-xs text-white/40 leading-relaxed">{question.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
