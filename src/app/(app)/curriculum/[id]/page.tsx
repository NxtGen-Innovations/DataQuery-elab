import { notFound } from 'next/navigation'
import { getLessonById, getQuizByLessonId, getChallengeByLessonId } from '@/lib/curriculum-data'
import { LessonView } from '@/components/lesson-view'

interface Props {
  params: Promise<{ id: string }>
}

export default async function LessonPage({ params }: Props) {
  const { id } = await params
  const lesson = getLessonById(id)
  if (!lesson) notFound()

  const quiz = getQuizByLessonId(id)
  const challenge = getChallengeByLessonId(id)

  return <LessonView lesson={lesson} quiz={quiz} challenge={challenge} />
}
