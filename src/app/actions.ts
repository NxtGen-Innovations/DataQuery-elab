'use server'

import fs from 'fs'
import path from 'path'
import { revalidatePath } from 'next/cache'
import data from '@/lib/data.json'
import { QuizQuestion, GraderCheck } from '@/lib/curriculum-data'

export async function saveLessonData(
  lessonId: string,
  newContent: string,
  newTitle: string,
  newChallengeTitle?: string,
  newChallengePrompt?: string,
  newChallengeCode?: string,
  newQuizQuestions?: QuizQuestion[],
  newGraderChecks?: GraderCheck[]
) {
  const filePath = path.join(process.cwd(), 'src', 'lib', 'data.json')
  
  // Clone the data to avoid mutating module cache directly
  const currentData = JSON.parse(JSON.stringify(data))

  // Update CURRICULUM
  for (const domain of currentData.CURRICULUM) {
    for (const topic of domain.topics) {
      const lesson = topic.lessons.find((l: any) => l.id === lessonId)
      if (lesson) {
        lesson.content_md = newContent
        lesson.title = newTitle
      }
    }
  }

  // Update QUIZZES
  if (newQuizQuestions !== undefined) {
    const quiz = currentData.QUIZZES.find((q: any) => q.lesson_id === lessonId)
    if (quiz) {
      quiz.questions = newQuizQuestions
    }
  }

  // Update CHALLENGES
  if (newChallengeTitle !== undefined || newChallengePrompt !== undefined || newChallengeCode !== undefined || newGraderChecks !== undefined) {
    const challenge = currentData.CHALLENGES.find((c: any) => c.lesson_id === lessonId)
    if (challenge) {
      if (newChallengeTitle !== undefined) challenge.title = newChallengeTitle
      if (newChallengePrompt !== undefined) challenge.prompt = newChallengePrompt
      if (newChallengeCode !== undefined) challenge.starter_code = newChallengeCode
      if (newGraderChecks !== undefined) challenge.grader_checks = newGraderChecks
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2))
  
  // Revalidate routes
  revalidatePath(`/curriculum/${lessonId}`)
  revalidatePath('/curriculum')
  revalidatePath('/dashboard')
  
  return { success: true }
}
