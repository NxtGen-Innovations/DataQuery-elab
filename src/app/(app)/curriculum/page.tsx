'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Brain, Code2, HelpCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { CURRICULUM, getChallengeByLessonId, getQuizByLessonId } from '@/lib/curriculum-data'

export default function CurriculumIndexPage() {
  return (
    <div className="min-h-screen px-5 py-6 md:px-8 xl:px-10">
      <div className="mx-auto max-w-[1600px] space-y-8">
        <section className="ds-panel p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8b949e]">
                <Brain className="size-3.5 text-[#58a6ff]" />
                Curriculum
              </div>
              <h1 className="text-3xl font-semibold text-[#e6edf3]">Structured learning path</h1>
              <p className="mt-3 max-w-3xl text-[14px] leading-7 text-[#8b949e]">
                Move through notes, quizzes, and coding labs in a clear sequence designed for applied data-science learning.
              </p>
            </div>
            <Link href="/curriculum/ds-mod2-02" className="text-[13px] font-medium text-[#58a6ff] hover:text-[#79c0ff]">
              Jump to practice <ArrowRight className="ml-1 inline size-4" />
            </Link>
          </div>
        </section>

        <section className="space-y-6">
          {CURRICULUM[0].topics.map((topic) => (
            <div key={topic.topic} className="ds-panel p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8b949e]">Module</div>
                  <h2 className="mt-2 text-xl font-semibold text-[#e6edf3]">{topic.topic}</h2>
                </div>
                <Badge variant="outline" className="rounded-md border-[#30363d] bg-[#0d1117] px-2 py-1 text-[11px] text-[#c9d1d9]">
                  {topic.lessons.length} lessons
                </Badge>
              </div>

              <div className="grid gap-3 lg:grid-cols-2">
                {topic.lessons.map((lesson) => {
                  const hasQuiz = Boolean(getQuizByLessonId(lesson.id))
                  const hasLab = Boolean(getChallengeByLessonId(lesson.id))

                  return (
                    <Link key={lesson.id} href={`/curriculum/${lesson.id}`} className="group border border-[#30363d] bg-[#161b22] p-4 hover:bg-[#0d1117]">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8b949e]">{lesson.domain}</div>
                          <h3 className="truncate text-base font-semibold text-[#e6edf3]">{lesson.title}</h3>
                          <div className="mt-3 flex flex-wrap gap-2 text-[12px] text-[#8b949e]">
                            <span className="inline-flex items-center gap-1"><BookOpen className="size-3.5" /> Notes</span>
                            {hasQuiz ? <span className="inline-flex items-center gap-1"><HelpCircle className="size-3.5" /> Quiz</span> : null}
                            {hasLab ? <span className="inline-flex items-center gap-1 text-[#3fb950]"><Code2 className="size-3.5" /> Practice</span> : null}
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="rounded-md border-[#30363d] bg-[#0d1117] px-2 py-1 text-[11px] text-[#c9d1d9]"
                        >
                          {lesson.difficulty}
                        </Badge>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
