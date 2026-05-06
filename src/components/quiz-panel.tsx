'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useCachedState } from '@/hooks/use-cached-state'
import { useProgress } from '@/lib/progress-context'
import { Quiz } from '@/lib/curriculum-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, ChevronRight, RotateCcw, Trophy, XCircle, Sparkles, Zap } from 'lucide-react'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

interface Props {
  quiz: Quiz
}

export function QuizPanel({ quiz }: Props) {
  const { markQuizComplete } = useProgress()
  const [currentIndex, setCurrentIndex] = useCachedState(`quiz-index-${quiz.id}`, 0)
  const [answers, setAnswers] = useCachedState<Record<string, string>>(`quiz-answers-${quiz.id}`, {})
  const [submitted, setSubmitted] = useCachedState<Record<string, boolean>>(`quiz-submitted-${quiz.id}`, {})
  const [quizComplete, setQuizComplete] = useCachedState(`quiz-complete-${quiz.id}`, false)

  useEffect(() => {
    if (quizComplete) {
      markQuizComplete(quiz.id)
    }
  }, [quizComplete, quiz.id, markQuizComplete])

  const question = quiz.questions[currentIndex]
  const isLastQuestion = currentIndex === quiz.questions.length - 1
  const hasAnswered = submitted[question.id]

  const correctCount = Object.entries(submitted).filter(
    ([id]) => answers[id] === quiz.questions.find((q) => q.id === id)?.correct_answer
  ).length

  function handleSelectOption(option: string) {
    if (hasAnswered) return
    setAnswers((prev) => ({ ...prev, [question.id]: option }))
  }

  function handleSubmit() {
    const answer = answers[question.id]
    if (!answer) return
    setSubmitted((prev) => ({ ...prev, [question.id]: true }))
    
    // Automatically mark quiz as complete if this was the last question
    if (isLastQuestion) {
      setQuizComplete(true)
    }
  }

  function handleNext() {
    if (isLastQuestion) {
      setQuizComplete(true)
    } else {
      setCurrentIndex((index) => index + 1)
    }
  }

  function handleReset() {
    setCurrentIndex(0)
    setAnswers({})
    setSubmitted({})
    setQuizComplete(false)
  }

  const isCorrect = submitted[question.id] && answers[question.id] === question.correct_answer
  const completionPct = Math.round(((currentIndex + (hasAnswered ? 1 : 0)) / quiz.questions.length) * 100)

  if (quizComplete) {
    const percentage = Math.round((correctCount / quiz.questions.length) * 100)
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-2xl py-12"
      >
        <div className="ds-panel glass-panel border-[#58a6ff]/20 p-12 text-center shadow-2xl">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto flex size-20 items-center justify-center rounded-2xl bg-[#d29922]/10 text-[#d29922] glow-blue"
          >
            <Trophy className="size-10" />
          </motion.div>
          <h2 className="mt-8 text-3xl font-bold text-[#e6edf3]">Knowledge Mastered</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#8b949e]">
            Exceptional work! You correctly answered <span className="text-[#e6edf3] font-bold">{correctCount}</span> of{' '}
            <span className="text-[#e6edf3] font-bold">{quiz.questions.length}</span> questions. 
            You've earned <span className="text-[#58a6ff] font-bold">+{correctCount * 50} XP</span>.
          </p>
          
          <div className="mt-10 flex flex-col items-center">
            <div className={`text-6xl font-black ${percentage >= 70 ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>
              {percentage}%
            </div>
            <div className="mt-2 text-[11px] font-bold uppercase tracking-widest text-[#8b949e]">Final Score</div>
          </div>

          <div className="mt-12 flex justify-center gap-4">
            <Button
              onClick={handleReset}
              variant="outline"
              className="h-11 rounded-xl border-[#30363d] bg-transparent px-8 text-[13px] font-bold text-[#e6edf3] hover:bg-[#161b22]"
            >
              <RotateCcw className="mr-2 size-4" />
              Retry Quiz
            </Button>
            <Button
              onClick={() => window.history.back()}
              className="h-11 rounded-xl bg-[#58a6ff] px-8 text-[13px] font-bold text-white hover:bg-[#79c0ff] glow-blue"
            >
              Next Milestone
              <ChevronRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-6">
      <div className="ds-panel bg-[#161b22]/50 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#58a6ff]/10 text-[#58a6ff]">
              <Zap className="size-5" />
            </div>
            <div>
              <span className="ds-label">Quiz Session</span>
              <div className="text-[15px] font-bold text-[#e6edf3]">
                Step {currentIndex + 1} of {quiz.questions.length}
              </div>
            </div>
          </div>
          <div className="min-w-[240px]">
            <div className="mb-2 flex justify-between text-[11px] font-bold uppercase tracking-widest">
              <span className="text-[#8b949e]">Progression</span>
              <span className="text-[#58a6ff]">{completionPct}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#0d1117] rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${completionPct}%` }}
                className="h-full bg-[#58a6ff] glow-blue" 
              />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="ds-panel p-8"
        >
          <div className="mb-8 flex items-center justify-between gap-4">
            <Badge className="rounded-lg bg-[#161b22] border-[#30363d] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8b949e]">
              Logical Inference
            </Badge>
            <div className="flex gap-2">
              {quiz.questions.map((q, index) => (
                <div
                  key={q.id}
                  className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                    index < currentIndex
                      ? submitted[q.id]
                        ? answers[q.id] === q.correct_answer
                          ? 'bg-[#3fb950]'
                          : 'bg-[#f85149]'
                        : 'bg-[#30363d]'
                      : index === currentIndex
                        ? 'bg-[#58a6ff] glow-blue'
                        : 'bg-[#21262d]'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-xl font-medium leading-relaxed text-[#e6edf3]">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{ p: ({ children }) => <span>{children}</span> }}
            >
              {question.question}
            </ReactMarkdown>
          </div>

          <div className="mt-10 space-y-3">
            {(question.type === 'mcq' || question.type === 'true_false') && question.options ? (
              question.options.map((option, idx) => {
                const isSelected = answers[question.id] === option
                const isActuallyCorrect = option === question.correct_answer

                let optionClass = 'border-[#30363d] bg-[#0d1117] text-[#c9d1d9] hover:border-[#58a6ff]/40 hover:bg-[#161b22]'
                if (hasAnswered) {
                  if (isActuallyCorrect) optionClass = 'border-[#3fb950]/40 bg-[#3fb950]/5 text-[#e6edf3] glow-green'
                  else if (isSelected) optionClass = 'border-[#f85149]/40 bg-[#f85149]/5 text-[#e6edf3]'
                  else optionClass = 'border-[#30363d] bg-[#0d1117] opacity-40'
                } else if (isSelected) {
                  optionClass = 'border-[#58a6ff]/40 bg-[#58a6ff]/5 text-[#e6edf3] glow-blue'
                }

                return (
                  <motion.button
                    key={option}
                    initial={false}
                    whileHover={!hasAnswered ? { x: 4 } : {}}
                    onClick={() => handleSelectOption(option)}
                    disabled={hasAnswered}
                    className={`group flex w-full items-center justify-between rounded-xl border px-6 py-4 text-left transition-all duration-200 ${optionClass}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[11px] font-bold text-[#484f58] uppercase">[{String.fromCharCode(65 + idx)}]</span>
                      <div className="text-[15px]">
                        <ReactMarkdown
                          remarkPlugins={[remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                          components={{ p: ({ children }) => <span>{children}</span> }}
                        >
                          {option}
                        </ReactMarkdown>
                      </div>
                    </div>
                    {hasAnswered && isActuallyCorrect ? <CheckCircle2 className="size-5 text-[#3fb950]" /> : null}
                    {hasAnswered && isSelected && !isActuallyCorrect ? <XCircle className="size-5 text-[#f85149]" /> : null}
                  </motion.button>
                )
              })
            ) : (
              <div className="rounded-xl border border-[#f85149]/20 bg-[#f85149]/5 p-4 text-center text-[13px] text-[#f85149]">
                Error: Question options missing. Please contact support.
              </div>
            )}
          </div>

          {hasAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-8 rounded-xl border p-6 ${isCorrect ? 'border-[#3fb950]/20 bg-[#3fb950]/5' : 'border-[#f85149]/20 bg-[#f85149]/5'}`}
            >
              <div className="mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest">
                {isCorrect ? (
                  <>
                    <Sparkles className="size-4 text-[#3fb950]" />
                    <span className="text-[#3fb950]">Logical Match</span>
                  </>
                ) : (
                  <>
                    <XCircle className="size-4 text-[#f85149]" />
                    <span className="text-[#f85149]">Conflict Detected</span>
                  </>
                )}
              </div>
              <div className="text-[14px] leading-relaxed text-[#c9d1d9]">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{ p: ({ children }) => <span>{children}</span> }}
                >
                  {question.explanation}
                </ReactMarkdown>
              </div>
            </motion.div>
          )}

          <div className="mt-10 flex justify-end gap-4">
            {!hasAnswered ? (
              <Button
                onClick={handleSubmit}
                disabled={question.type === 'fill_blank' ? !fillInput.trim() : !answers[question.id]}
                className="h-11 rounded-xl bg-[#58a6ff] px-8 text-[13px] font-bold text-white hover:bg-[#79c0ff] glow-blue disabled:opacity-50"
              >
                Validate Logic
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="h-11 rounded-xl border-[#30363d] bg-[#161b22] px-8 text-[13px] font-bold text-[#e6edf3] hover:bg-[#1c2128]"
              >
                {isLastQuestion ? 'Complete Evaluation' : 'Next Challenge'}
                <ChevronRight className="ml-2 size-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
