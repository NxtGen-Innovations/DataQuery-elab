import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getLessonById, getQuizByLessonId, getChallengeByLessonId } from '@/lib/curriculum-data'
import { LessonView } from '@/components/lesson-view'
import { ChevronRight } from 'lucide-react'

interface Props {
  params: Promise<{ lessonId: string }>
}

export default async function LessonPage({ params }: Props) {
  const { lessonId } = await params
  const lesson = getLessonById(lessonId)
  if (!lesson) notFound()

  const quiz = getQuizByLessonId(lessonId)
  const challenge = getChallengeByLessonId(lessonId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-sm">
          <Link href="/" className="text-white/50 hover:text-white transition-colors">DataQuest eLab</Link>
          <ChevronRight className="w-4 h-4 text-white/30" />
          <Link href="/curriculum" className="text-white/50 hover:text-white transition-colors">Curriculum</Link>
          <ChevronRight className="w-4 h-4 text-white/30" />
          <span className="text-white/80">{lesson.domain}</span>
          <ChevronRight className="w-4 h-4 text-white/30" />
          <span className="text-white/80">{lesson.topic}</span>
          <ChevronRight className="w-4 h-4 text-white/30" />
          <span className="text-white font-medium">{lesson.title}</span>
        </div>
      </header>

      <LessonView lesson={lesson} quiz={quiz} challenge={challenge} />
    </div>
  )
}
