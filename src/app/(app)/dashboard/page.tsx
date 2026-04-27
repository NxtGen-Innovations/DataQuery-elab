'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Brain, CheckCircle2, Code2, Flame, LineChart, PlayCircle, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CURRICULUM, getAllLessons, getChallengeByLessonId, getDailyQuestion, getQuizByLessonId } from '@/lib/curriculum-data'
import { useAuth } from '@/lib/auth-context'

export default function Dashboard() {
  const { user } = useAuth()
  const lessons = getAllLessons()
  const userName = user?.name || 'Explorer'
  const currentLesson = lessons[0]
  const recommendedPracticeLesson = lessons.find((lesson) => getChallengeByLessonId(lesson.id)) ?? lessons[0]
  const practiceChallenge = recommendedPracticeLesson ? getChallengeByLessonId(recommendedPracticeLesson.id) : undefined
  const dailyQuestion = getDailyQuestion()

  const moduleSummaries = CURRICULUM[0].topics.map((topic, index) => {
    const lessonCount = topic.lessons.length
    const availableLabs = topic.lessons.filter((lesson) => getChallengeByLessonId(lesson.id)).length
    const availableQuizzes = topic.lessons.filter((lesson) => getQuizByLessonId(lesson.id)).length
    const progress = index === 0 ? 42 : index === 1 ? 18 : 0

    return {
      topic: topic.topic,
      lessonCount,
      availableLabs,
      availableQuizzes,
      progress,
    }
  })

  return (
    <div className="min-h-screen px-5 py-6 md:px-8 xl:px-10">
      <div className="mx-auto max-w-[1600px] space-y-8">
        <section className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
          <div className="panel-fade ds-panel p-6">
            <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8b949e]">
              <Brain className="size-3.5 text-[#58a6ff]" />
              Student Dashboard
            </div>
            <h1 className="text-3xl font-semibold text-[#e6edf3] md:text-4xl">Welcome back, {userName}.</h1>
            <p className="mt-3 max-w-3xl text-[14px] leading-7 text-[#8b949e]">
              Keep learning in a focused workspace: review the concept, validate understanding with a quiz, and solve a data-science practice problem with runnable Python and test cases.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href={recommendedPracticeLesson ? `/curriculum/${recommendedPracticeLesson.id}` : '/curriculum'}>
                <Button className="h-10 rounded-md border border-[#2ea043]/50 bg-[#238636] px-5 text-white hover:bg-[#2ea043]">
                  Continue Practice
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link href="/curriculum">
                <Button variant="outline" className="h-10 rounded-md border-[#30363d] bg-[#161b22] px-5 text-[#e6edf3] hover:bg-[#21262d]">
                  Browse Curriculum
                </Button>
              </Link>
            </div>
          </div>

          <div className="panel-fade ds-panel-elevated p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8b949e]">Recommended Practice</div>
                <h2 className="mt-2 text-lg font-semibold text-[#e6edf3]">{practiceChallenge?.title || 'Practice track'}</h2>
              </div>
              <PlayCircle className="size-5 text-[#58a6ff]" />
            </div>
            <p className="mt-3 text-[13px] leading-6 text-[#8b949e]">
              {practiceChallenge?.prompt.split('\n')[0].replace('## ', '') || 'Hands-on coding exercises will appear here.'}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="border border-[#30363d] bg-[#0d1117] p-3">
                <div className="text-lg font-semibold text-[#e6edf3]">{practiceChallenge?.grader_checks.length ?? 0}</div>
                <div className="mt-1 text-[11px] text-[#8b949e]">Checks</div>
              </div>
              <div className="border border-[#30363d] bg-[#0d1117] p-3">
                <div className="text-lg font-semibold text-[#e6edf3]">Python</div>
                <div className="mt-1 text-[11px] text-[#8b949e]">Runtime</div>
              </div>
              <div className="border border-[#30363d] bg-[#0d1117] p-3">
                <div className="text-lg font-semibold text-[#e6edf3]">IDE</div>
                <div className="mt-1 text-[11px] text-[#8b949e]">Workspace</div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Lessons', value: lessons.length, hint: 'Concept modules', icon: BookOpen },
            { label: 'Labs', value: lessons.filter((lesson) => getChallengeByLessonId(lesson.id)).length, hint: 'Hands-on tasks', icon: Code2 },
            { label: 'Quizzes', value: lessons.filter((lesson) => getQuizByLessonId(lesson.id)).length, hint: 'Knowledge checks', icon: CheckCircle2 },
            { label: 'Momentum', value: '5d', hint: 'Current streak', icon: Flame, isStreak: true },
          ].map((item) => (
            <div key={item.label} className="panel-fade ds-panel p-5 flex flex-col justify-between h-full">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8b949e]">{item.label}</div>
                  <div className="mt-3 text-3xl font-semibold text-[#e6edf3]">{item.value}</div>
                  <div className="mt-1 text-[12px] text-[#8b949e]">{item.hint}</div>
                </div>
                <item.icon className="size-5 text-[#58a6ff]" />
              </div>
              {item.isStreak && (
                <div className="mt-4 pt-3 border-t border-[#30363d] flex items-center justify-between">
                  {/* 1-week streak chart: 7 squares */}
                  {/* T, W, T, F, S, S, M (Example) */}
                  <div className="flex items-center gap-1.5">
                    {[
                      { active: true, day: 'T' },
                      { active: true, day: 'W' },
                      { active: false, day: 'T' },
                      { active: true, day: 'F' },
                      { active: true, day: 'S' },
                      { active: true, day: 'S' },
                      { active: true, day: 'M' },
                    ].map((d, i) => (
                      <div key={i} className="flex flex-col items-center gap-1.5">
                        <div
                          className={`w-4 h-4 rounded-[2px] ${
                            d.active ? 'bg-[#3fb950] shadow-[0_0_8px_rgba(63,185,80,0.4)]' : 'bg-[#161b22] border border-[#30363d]'
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
          <div className="ds-panel p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8b949e]">Learning Path</div>
                <h2 className="mt-2 text-xl font-semibold text-[#e6edf3]">Your modules</h2>
              </div>
              <Link href="/curriculum" className="text-[13px] font-medium text-[#58a6ff] hover:text-[#79c0ff]">
                View all
              </Link>
            </div>

            <div className="space-y-4">
              {moduleSummaries.map((module) => (
                <div key={module.topic} className="border border-[#30363d] bg-[#161b22] p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8b949e]">Module</div>
                      <h3 className="mt-1 text-base font-semibold text-[#e6edf3]">{module.topic}</h3>
                      <div className="mt-2 flex flex-wrap gap-2 text-[12px] text-[#8b949e]">
                        <span>{module.lessonCount} lessons</span>
                        <span>{module.availableQuizzes} quizzes</span>
                        <span>{module.availableLabs} labs</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="rounded-md border-[#30363d] bg-[#0d1117] px-2 py-1 text-[11px] text-[#c9d1d9]">
                      {module.progress}% complete
                    </Badge>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden bg-[#0d1117]">
                    <div className="progress-bar-fill h-full bg-[#58a6ff]" style={{ width: `${module.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="ds-panel p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8b949e]">Daily Check</div>
                  <h2 className="mt-2 text-lg font-semibold text-[#e6edf3]">Quick question</h2>
                </div>
                <LineChart className="size-5 text-[#58a6ff]" />
              </div>
              <p className="mt-3 text-[13px] leading-6 text-[#c9d1d9]">{dailyQuestion.question}</p>
              <div className="mt-4">
                <Link href="/curriculum/ds-mod2-01">
                  <Button variant="outline" className="h-9 rounded-md border-[#30363d] bg-[#161b22] text-[#e6edf3] hover:bg-[#21262d]">
                    Practice with quiz
                  </Button>
                </Link>
              </div>
            </div>

            <div className="ds-panel-elevated p-5">
              <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8b949e]">Resume Path</div>
              <h2 className="mt-2 text-lg font-semibold text-[#e6edf3]">{currentLesson.title}</h2>
              <p className="mt-2 text-[13px] leading-6 text-[#8b949e]">
                Return to structured learning, then move into guided practice with runnable code.
              </p>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[12px] text-[#8b949e]">
                  <Trophy className="size-4 text-[#d29922]" />
                  Mastery path
                </div>
                <Link href={`/curriculum/${currentLesson.id}`}>
                  <Button className="h-9 rounded-none border border-[#30363d] bg-[#0d1117] px-4 text-[#e6edf3] hover:bg-[#21262d]">
                    Open lesson
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
