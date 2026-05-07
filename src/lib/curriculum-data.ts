export interface Lesson {
  id: string
  title: string
  domain: string
  topic: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  content_md: string
}

export interface Quiz {
  id: string
  lesson_id: string
  title: string
  questions: QuizQuestion[]
}

export interface QuizQuestion {
  id: string
  type: 'mcq' | 'fill_blank' | 'visual' | 'true_false'
  question: string
  options?: string[]
  correct_answer: string
  explanation: string
  image_url?: string
}

export interface Challenge {
  id: string
  lesson_id: string
  title: string
  prompt: string
  starter_code: string
  grader_checks: GraderCheck[]
  dataset_snippet?: string
}

export interface GraderCheck {
  variable: string
  condition: 'gt' | 'lt' | 'gte' | 'lte' | 'eq' | 'type_check' | 'shape_check'
  value: number | string
  message: string
}

import data from './data.json';

export const CURRICULUM: { domain: string; topics: { topic: string; lessons: Lesson[] }[] }[] = data.CURRICULUM as unknown as { domain: string; topics: { topic: string; lessons: Lesson[] }[] }[];
export const QUIZZES: Quiz[] = data.QUIZZES as unknown as Quiz[];
export const CHALLENGES: Challenge[] = data.CHALLENGES as unknown as Challenge[];
export const DAILY_PRACTICE_QUESTIONS: QuizQuestion[] = data.DAILY_PRACTICE_QUESTIONS as unknown as QuizQuestion[];

export function getAllLessons(): Lesson[] {
  return CURRICULUM.flatMap(domain => domain.topics.flatMap(t => t.lessons))
}

export function getLessonById(id: string): Lesson | undefined {
  return getAllLessons().find(l => l.id === id)
}

export function getQuizByLessonId(lessonId: string): Quiz | undefined {
  return QUIZZES.find(q => q.lesson_id === lessonId)
}

export function getChallengeByLessonId(lessonId: string): Challenge | undefined {
  return CHALLENGES.find(c => c.lesson_id === lessonId)
}

export function getDailyQuestion(): QuizQuestion {
  // Use the day of year as index so it changes daily
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  const dayOfYear = Math.floor(diff / oneDay)
  return DAILY_PRACTICE_QUESTIONS[dayOfYear % DAILY_PRACTICE_QUESTIONS.length]
}
