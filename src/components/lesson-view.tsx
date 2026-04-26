'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Lesson, Quiz, Challenge, getAllLessons } from '@/lib/curriculum-data'
import { MarkdownRenderer } from './markdown-renderer'
import { QuizPanel } from './quiz-panel'
import { SandboxPanel } from './sandbox-panel'
import { Badge } from '@/components/ui/badge'
import { BookOpen, HelpCircle, Code2, ChevronLeft, ChevronRight, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  lesson: Lesson
  quiz?: Quiz
  challenge?: Challenge
}

const difficultyConfig: Record<string, { color: string; label: string }> = {
  beginner: { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Beginner' },
  intermediate: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', label: 'Intermediate' },
  advanced: { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'Advanced' },
}

type ActiveSection = 'notes' | 'quiz' | 'lab'

export function LessonView({ lesson, quiz, challenge }: Props) {
  const [activeSection, setActiveSection] = useState<ActiveSection>('notes')
  const diff = difficultyConfig[lesson.difficulty]

  // Find adjacent lessons for navigation
  const allLessons = getAllLessons()
  const currentIndex = allLessons.findIndex(l => l.id === lesson.id)
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  const sections: { key: ActiveSection; label: string; icon: any; available: boolean; count?: number }[] = [
    { key: 'notes', label: 'Notes', icon: BookOpen, available: true },
    { key: 'quiz', label: 'Quiz', icon: HelpCircle, available: !!quiz, count: quiz?.questions.length },
    { key: 'lab', label: 'Lab Tasks', icon: Code2, available: !!challenge },
  ]

  return (
    <div className="min-h-screen bg-[#060606] relative overflow-hidden">
      {/* Enhanced Background Blend */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-purple-600/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-900/20 blur-[150px] rounded-full" />
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-[#080808]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/curriculum" className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2 text-[10px] text-white/25 uppercase tracking-widest font-bold">
                <span>{lesson.domain}</span>
                <ChevronRight className="w-3 h-3" />
                <span>{lesson.topic}</span>
              </div>
              <h1 className="text-sm font-bold text-white mt-0.5 truncate max-w-[300px]">{lesson.title}</h1>
            </div>
          </div>

          {/* Section Switcher */}
          <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.06] rounded-xl p-1">
            {sections.map((s) => {
              if (!s.available) return null
              const isActive = activeSection === s.key
              return (
                <button
                  key={s.key}
                  onClick={() => setActiveSection(s.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                      : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]'
                  }`}
                >
                  <s.icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{s.label}</span>
                  {s.count && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-white/5'}`}>
                      {s.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Quick Info */}
          <div className="hidden md:flex items-center gap-3">
            <Badge variant="outline" className={`capitalize text-[10px] ${diff.color}`}>
              {diff.label}
            </Badge>
            <div className="flex items-center gap-1 text-[10px] text-white/25">
              <Clock className="w-3 h-3" />
              <span>5–10 min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Mobile title */}
        <div className="sm:hidden mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-purple-400 border-purple-500/30 bg-purple-500/10 text-[10px]">
              {lesson.topic}
            </Badge>
            <Badge variant="outline" className={`capitalize text-[10px] ${diff.color}`}>
              {diff.label}
            </Badge>
          </div>
          <h1 className="text-xl font-black text-white">{lesson.title}</h1>
        </div>

        {/* Notes */}
        {activeSection === 'notes' && (
          <div className="space-y-8">
            <MarkdownRenderer content={lesson.content_md} />

            {/* After reading notes, prompt to take quiz */}
            {quiz && (
              <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/5 border border-purple-500/15 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Ready to test your knowledge?</h3>
                    <p className="text-xs text-white/40">Take the {quiz.questions.length}-question quiz on {lesson.title}</p>
                  </div>
                </div>
                <Button
                  onClick={() => setActiveSection('quiz')}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 shadow-lg shadow-purple-500/20 group shrink-0"
                >
                  Start Quiz <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Quiz */}
        {activeSection === 'quiz' && quiz && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{quiz.title}</h2>
                <p className="text-xs text-white/40">{quiz.questions.length} questions · Instant feedback</p>
              </div>
            </div>
            <QuizPanel quiz={quiz} />

            {/* After quiz, prompt to try code */}
            {challenge && (
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/15 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                    <Code2 className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Apply what you learned!</h3>
                    <p className="text-xs text-white/40">Write Python code to solve: {challenge.title}</p>
                  </div>
                </div>
                <Button
                  onClick={() => setActiveSection('lab')}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 shadow-lg shadow-green-500/20 group shrink-0"
                >
                  Start Lab Task <Code2 className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Lab Tasks */}
        {activeSection === 'lab' && challenge && (
          <div className="-mx-6 -mb-8">
            <SandboxPanel challenge={challenge} />
          </div>
        )}

        {/* Learning Path Progress — hidden when lab is active */}
        {activeSection !== 'lab' && (
        <div className="mt-12 pt-8 border-t border-white/[0.06]">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Learning Path</p>
            <div className="flex items-center gap-1.5">
              {allLessons.map((l, i) => (
                <div
                  key={l.id}
                  className={`w-6 h-1 rounded-full transition-colors ${
                    i < currentIndex ? 'bg-green-500/60'
                    : i === currentIndex ? 'bg-purple-500'
                    : 'bg-white/10'
                  }`}
                  title={l.title}
                />
              ))}
            </div>
          </div>

          {/* Prev / Next Navigation */}
          <div className="grid grid-cols-2 gap-4">
            {prevLesson ? (
              <Link href={`/curriculum/${prevLesson.id}`}>
                <div className="group p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all cursor-pointer">
                  <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1.5">← Previous</p>
                  <p className="text-sm font-bold text-white/70 group-hover:text-white transition-colors truncate">{prevLesson.title}</p>
                </div>
              </Link>
            ) : <div />}

            {nextLesson ? (
              <Link href={`/curriculum/${nextLesson.id}`}>
                <div className="group p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-purple-500/20 hover:bg-purple-500/5 transition-all cursor-pointer text-right">
                  <p className="text-[9px] font-black text-purple-400/50 uppercase tracking-widest mb-1.5">Next →</p>
                  <p className="text-sm font-bold text-white/70 group-hover:text-purple-300 transition-colors truncate">{nextLesson.title}</p>
                </div>
              </Link>
            ) : (
              <div className="p-4 rounded-xl border border-green-500/15 bg-green-500/5 text-right">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <p className="text-[9px] font-black text-green-400/70 uppercase tracking-widest">Complete!</p>
                </div>
                <p className="text-sm font-bold text-green-400/60">You've covered all lessons</p>
              </div>
            )}
          </div>
        </div>
        )}
        </div>
      </div>
    </div>
  )
}
