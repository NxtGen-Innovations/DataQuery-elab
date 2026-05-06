'use client'

import { createContext, useContext, useCallback, ReactNode, useMemo } from 'react'
import { useCachedState } from '@/hooks/use-cached-state'
import { CURRICULUM, getQuizByLessonId, getChallengeByLessonId } from './curriculum-data'

interface ProgressContextType {
  completedQuizzes: string[]
  completedChallenges: string[]
  activeDates: string[] // List of "YYYY-MM-DD"
  streak: number
  totalXP: number
  currentRank: string
  overallCompletion: number
  markQuizComplete: (quizId: string) => void
  markChallengeComplete: (challengeId: string) => void
  getUnitProgress: (unitTopic: string) => number
  isUnitComplete: (unitTopic: string) => boolean
  isLessonComplete: (lessonId: string) => boolean
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedQuizzes, setCompletedQuizzes] = useCachedState<string[]>('completed-quizzes', [])
  const [completedChallenges, setCompletedChallenges] = useCachedState<string[]>('completed-challenges', [])
  const [activeDates, setActiveDates] = useCachedState<string[]>('active-dates', [])

  const updateActivity = useCallback(() => {
    const today = new Date().toISOString().split('T')[0]
    setActiveDates((prev) => prev.includes(today) ? prev : [...prev, today])
  }, [setActiveDates])

  const markQuizComplete = useCallback((quizId: string) => {
    setCompletedQuizzes((prev) => prev.includes(quizId) ? prev : [...prev, quizId])
    updateActivity()
  }, [setCompletedQuizzes, updateActivity])

  const markChallengeComplete = useCallback((challengeId: string) => {
    setCompletedChallenges((prev) => prev.includes(challengeId) ? prev : [...prev, challengeId])
    updateActivity()
  }, [setCompletedChallenges, updateActivity])

  // Streak Calculation
  const streak = useMemo(() => {
    if (activeDates.length === 0) return 0
    
    const sortedDates = [...activeDates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    
    // If the most recent active date is not today or yesterday, streak is 0
    if (sortedDates[0] !== today && sortedDates[0] !== yesterday) return 0
    
    let count = 1
    for (let i = 0; i < sortedDates.length - 1; i++) {
      const current = new Date(sortedDates[i])
      const previous = new Date(sortedDates[i + 1])
      const diffDays = (current.getTime() - previous.getTime()) / (1000 * 3600 * 24)
      
      if (diffDays === 1) {
        count++
      } else {
        break
      }
    }
    return count
  }, [activeDates])

  // XP and Rank Logic
  const totalXP = useMemo(() => {
    return (completedQuizzes.length * 25) + (completedChallenges.length * 50)
  }, [completedQuizzes, completedChallenges])

  const currentRank = useMemo(() => {
    if (totalXP < 100) return 'Novice'
    if (totalXP < 500) return 'Apprentice'
    if (totalXP < 2000) return 'Scholar'
    return 'Master'
  }, [totalXP])

  const isLessonComplete = useCallback((lessonId: string) => {
    const quiz = getQuizByLessonId(lessonId)
    const challenge = getChallengeByLessonId(lessonId)
    
    const quizDone = quiz ? completedQuizzes.includes(quiz.id) : true
    const challengeDone = challenge ? completedChallenges.includes(challenge.id) : true
    
    return quizDone && challengeDone
  }, [completedQuizzes, completedChallenges])

  const getUnitProgress = useCallback((unitTopic: string) => {
    const unit = CURRICULUM[0].topics.find(t => t.topic === unitTopic)
    if (!unit) return 0

    let totalItems = 0
    let completedItems = 0

    unit.lessons.forEach(lesson => {
      const quiz = getQuizByLessonId(lesson.id)
      const challenge = getChallengeByLessonId(lesson.id)

      if (quiz) {
        totalItems++
        if (completedQuizzes.includes(quiz.id)) completedItems++
      }
      if (challenge) {
        totalItems++
        if (completedChallenges.includes(challenge.id)) completedItems++
      }
    })

    if (totalItems === 0) return 0
    return Math.round((completedItems / totalItems) * 100)
  }, [completedQuizzes, completedChallenges])

  const overallCompletion = useMemo(() => {
    let totalItems = 0
    let completedItems = 0

    CURRICULUM[0].topics.forEach(topic => {
      topic.lessons.forEach(lesson => {
        const quiz = getQuizByLessonId(lesson.id)
        const challenge = getChallengeByLessonId(lesson.id)

        if (quiz) {
          totalItems++
          if (completedQuizzes.includes(quiz.id)) completedItems++
        }
        if (challenge) {
          totalItems++
          if (completedChallenges.includes(challenge.id)) completedItems++
        }
      })
    })

    if (totalItems === 0) return 0
    return Math.round((completedItems / totalItems) * 100)
  }, [completedQuizzes, completedChallenges])

  const isUnitComplete = useCallback((unitTopic: string) => {
    return getUnitProgress(unitTopic) === 100
  }, [getUnitProgress])

  const value = useMemo(() => ({
    completedQuizzes,
    completedChallenges,
    activeDates,
    streak,
    totalXP,
    currentRank,
    overallCompletion,
    markQuizComplete,
    markChallengeComplete,
    getUnitProgress,
    isUnitComplete,
    isLessonComplete,
  }), [
    completedQuizzes,
    completedChallenges,
    activeDates,
    streak,
    totalXP,
    currentRank,
    overallCompletion,
    markQuizComplete,
    markChallengeComplete,
    getUnitProgress,
    isUnitComplete,
    isLessonComplete
  ])

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}
