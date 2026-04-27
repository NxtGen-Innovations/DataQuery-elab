'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Lesson, Quiz, Challenge, getAllLessons } from '@/lib/curriculum-data'
import { MarkdownRenderer } from './markdown-renderer'
import { QuizPanel } from './quiz-panel'
import { SandboxPanel } from './sandbox-panel'
import { Badge } from '@/components/ui/badge'
import { BookOpen, HelpCircle, Code2, ChevronLeft, ChevronRight, Clock, ArrowRight, CheckCircle2, LucideIcon, FlaskConical, PanelLeftClose } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

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
  const [activeSection, setActiveSection] = useState<ActiveSection>(challenge ? 'lab' : 'notes')
  const diff = difficultyConfig[lesson.difficulty]

  // Find adjacent lessons for navigation
  const allLessons = getAllLessons()
  const currentIndex = allLessons.findIndex(l => l.id === lesson.id)
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  const sections: { key: ActiveSection; label: string; icon: LucideIcon; available: boolean; count?: number }[] = [
    { key: 'notes', label: 'Notes', icon: BookOpen, available: true },
    { key: 'quiz', label: 'Quiz', icon: HelpCircle, available: !!quiz, count: quiz?.questions.length },
    { key: 'lab', label: 'Practice', icon: Code2, available: !!challenge },
  ]

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      <div className="sticky top-0 z-30 border-b border-[#30363d] bg-[#0d1117]">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/curriculum" className="p-2 text-[#8b949e] transition-colors hover:bg-[#161b22] hover:text-[#e6edf3]">
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b949e]">
                <span>{lesson.domain}</span>
                <ChevronRight className="w-3 h-3" />
                <span>{lesson.topic}</span>
              </div>
              <h1 className="mt-1 truncate text-base font-semibold text-[#e6edf3]">{lesson.title}</h1>
            </div>
          </div>

          <div className="hidden items-center gap-1 border border-[#30363d] bg-[#161b22] p-1 md:flex">
            {sections.map((s) => {
              if (!s.available) return null
              const isActive = activeSection === s.key
              return (
                <button
                  key={s.key}
                  onClick={() => setActiveSection(s.key)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors',
                    isActive
                      ? 'bg-[#0d1117] text-[#e6edf3]'
                      : 'text-[#8b949e] hover:bg-[#0d1117] hover:text-[#c9d1d9]'
                  )}
                >
                  <s.icon className="w-3.5 h-3.5" />
                  <span>{s.label}</span>
                  {s.count && (
                    <span className={`border px-1.5 py-0.5 text-[10px] ${isActive ? 'border-[#30363d]' : 'border-transparent'}`}>
                      {s.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {challenge ? (
              <button
                onClick={() => setActiveSection('lab')}
                className="flex items-center gap-2 border border-[#30363d] bg-[#161b22] px-3 py-1.5 text-[12px] font-medium text-[#e6edf3] transition-colors hover:bg-[#0d1117]"
              >
                <FlaskConical className="size-3.5 text-[#3fb950]" />
                Open Practice
              </button>
            ) : null}
            <Badge variant="outline" className={`capitalize border-[#30363d] text-[10px] ${diff.color}`}>
              {diff.label}
            </Badge>
            <div className="flex items-center gap-1 text-[10px] text-[#8b949e]">
              <Clock className="w-3 h-3" />
              <span>5–10 min</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 py-6">
        <div className="mb-6 grid gap-4 border border-[#30363d] bg-[#161b22] p-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8b949e]">
              <PanelLeftClose className="size-3.5" />
              <span>{challenge ? 'Lesson + Practice' : 'Lesson'}</span>
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-[#e6edf3]">{lesson.title}</h2>
            <p className="max-w-3xl text-[14px] leading-6 text-[#8b949e]">
              Learn the concept, then move straight into a data-science coding exercise with editable Python, runnable test cases, and output tabs.
            </p>
          </div>
          <div className="border border-[#30363d] bg-[#0d1117] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[12px] font-medium text-[#e6edf3]">Practice Status</span>
              <span className="text-[12px] text-[#8b949e]">{challenge ? 'Available' : 'Coming soon'}</span>
            </div>
            <div className="space-y-2 text-[13px] text-[#8b949e]">
              <p>{challenge ? challenge.title : 'This lesson does not have a coding lab yet.'}</p>
              {challenge ? (
                <Button
                  onClick={() => setActiveSection('lab')}
                  className="mt-2 h-9 w-full rounded-md border border-[#2ea043]/50 bg-[#238636] text-white hover:bg-[#2ea043]"
                >
                  Start Practice
                </Button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-2 border border-[#30363d] bg-[#161b22] p-1 md:hidden">
          {sections.map((s) => {
            if (!s.available) return null
            const isActive = activeSection === s.key
            return (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={cn(
                  'flex flex-1 items-center justify-center gap-2 px-3 py-2 text-xs font-medium',
                  isActive ? 'bg-[#0d1117] text-[#e6edf3]' : 'text-[#8b949e]'
                )}
              >
                <s.icon className="size-3.5" />
                {s.label}
              </button>
            )
          })}
        </div>

        {activeSection === 'notes' && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <MarkdownRenderer content={lesson.content_md} />

            <aside className="space-y-4">
              <div className="border border-[#30363d] bg-[#161b22] p-4">
                <div className="mb-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#8b949e]">Next Step</div>
                <p className="mb-4 text-[13px] leading-6 text-[#c9d1d9]">
                  {challenge
                    ? 'Jump into the coding workspace to apply this concept on a structured data problem.'
                    : 'Read the notes, then move to the next lesson for a hands-on practice task.'}
                </p>
                {challenge ? (
                  <Button
                    onClick={() => setActiveSection('lab')}
                    className="h-9 w-full rounded-md border border-[#30363d] bg-[#0d1117] text-[#e6edf3] hover:bg-[#21262d]"
                  >
                    Open Practice <ArrowRight className="ml-2 size-4" />
                  </Button>
                ) : null}
              </div>

              <div className="border border-[#30363d] bg-[#161b22] p-4">
                <div className="mb-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#8b949e]">Lesson Info</div>
                <div className="space-y-2 text-[13px] text-[#c9d1d9]">
                  <div className="flex items-center justify-between">
                    <span>Difficulty</span>
                    <span>{diff.label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Quiz</span>
                    <span>{quiz ? `${quiz.questions.length} question${quiz.questions.length > 1 ? 's' : ''}` : 'None'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Practice</span>
                    <span>{challenge ? 'Available' : 'Unavailable'}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}

        {activeSection === 'quiz' && quiz && (
          <div className="space-y-6">
            <div className="border border-[#30363d] bg-[#161b22] p-4">
              <h2 className="text-lg font-semibold text-[#e6edf3]">{quiz.title}</h2>
              <p className="mt-1 text-[13px] text-[#8b949e]">{quiz.questions.length} questions with instant feedback</p>
            </div>
            <QuizPanel quiz={quiz} />
            {quiz && (
              <div className="flex flex-col items-start justify-between gap-4 border border-[#30363d] bg-[#161b22] p-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center border border-[#30363d] bg-[#0d1117]">
                    <Code2 className="w-5 h-5 text-[#3fb950]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#e6edf3]">Ready for the coding side?</h3>
                    <p className="text-xs text-[#8b949e]">Open the practice workspace and run code against test cases.</p>
                  </div>
                </div>
                {challenge ? (
                  <Button
                    onClick={() => setActiveSection('lab')}
                    className="h-9 shrink-0 rounded-md border border-[#2ea043]/50 bg-[#238636] px-5 text-white hover:bg-[#2ea043]"
                  >
                    Open Practice <Code2 className="ml-2 size-4" />
                  </Button>
                ) : null}
              </div>
            )}
          </div>
        )}

        {activeSection === 'lab' && challenge && (
          <div className="-mx-6 -mb-6 border-y border-[#30363d] bg-[#0d1117] px-6 py-4">
            <SandboxPanel key={challenge.id} challenge={challenge} lesson={lesson} quiz={quiz} />
          </div>
        )}

        {activeSection !== 'lab' && (
        <div className="mt-12 border-t border-[#30363d] pt-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8b949e]">Learning Path</p>
            <div className="flex items-center gap-1.5">
              {allLessons.map((l, i) => (
                <div
                  key={l.id}
                  className={`w-6 h-1 rounded-full transition-colors ${
                    i < currentIndex ? 'bg-[#238636]'
                    : i === currentIndex ? 'bg-[#58a6ff]'
                    : 'bg-[#30363d]'
                  }`}
                  title={l.title}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {prevLesson ? (
              <Link href={`/curriculum/${prevLesson.id}`}>
                <div className="group cursor-pointer border border-[#30363d] bg-[#161b22] p-4 transition-colors hover:bg-[#0d1117]">
                  <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8b949e]">← Previous</p>
                  <p className="truncate text-sm font-semibold text-[#c9d1d9] group-hover:text-[#e6edf3]">{prevLesson.title}</p>
                </div>
              </Link>
            ) : <div />}

            {nextLesson ? (
              <Link href={`/curriculum/${nextLesson.id}`}>
                <div className="group cursor-pointer border border-[#30363d] bg-[#161b22] p-4 text-right transition-colors hover:bg-[#0d1117]">
                  <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#58a6ff]">Next →</p>
                  <p className="truncate text-sm font-semibold text-[#c9d1d9] group-hover:text-[#e6edf3]">{nextLesson.title}</p>
                </div>
              </Link>
            ) : (
              <div className="border border-[#238636]/40 bg-[#238636]/10 p-4 text-right">
                <div className="mb-1 flex items-center justify-end gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3fb950]" />
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#3fb950]">Complete!</p>
                </div>
                <p className="text-sm font-semibold text-[#3fb950]">You&apos;ve covered all lessons</p>
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  )
}
