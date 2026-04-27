'use client'

import { useState } from 'react'
import { Quiz } from '@/lib/curriculum-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, ChevronRight, RotateCcw, Trophy, XCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

interface Props {
  quiz: Quiz
}

export function QuizPanel({ quiz }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({})
  const [fillInput, setFillInput] = useState('')
  const [quizComplete, setQuizComplete] = useState(false)

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
    const answer = question.type === 'fill_blank' ? fillInput.trim().toLowerCase() : answers[question.id]
    if (!answer) return
    setAnswers((prev) => ({ ...prev, [question.id]: answer }))
    setSubmitted((prev) => ({ ...prev, [question.id]: true }))
  }

  function handleNext() {
    if (isLastQuestion) {
      setQuizComplete(true)
    } else {
      setCurrentIndex((index) => index + 1)
      setFillInput('')
    }
  }

  function handleReset() {
    setCurrentIndex(0)
    setAnswers({})
    setSubmitted({})
    setFillInput('')
    setQuizComplete(false)
  }

  const isCorrect = submitted[question.id] && answers[question.id] === question.correct_answer
  const completionPct = Math.round(((currentIndex + (hasAnswered ? 1 : 0)) / quiz.questions.length) * 100)

  if (quizComplete) {
    const percentage = Math.round((correctCount / quiz.questions.length) * 100)
    return (
      <div className="mx-auto max-w-3xl">
        <div className="ds-panel p-8 text-center">
          <div className="mx-auto flex size-16 items-center justify-center border border-[#30363d] bg-[#161b22]">
            <Trophy className="size-8 text-[#d29922]" />
          </div>
          <h2 className="mt-5 text-2xl font-semibold text-[#e6edf3]">Quiz complete</h2>
          <p className="mt-2 text-[14px] text-[#8b949e]">
            You answered <span className="font-semibold text-[#e6edf3]">{correctCount}</span> of{' '}
            <span className="font-semibold text-[#e6edf3]">{quiz.questions.length}</span> correctly.
          </p>
          <div className="mt-6 text-5xl font-semibold text={percentage >= 70 ? '#3fb950' : '#f85149'}">{percentage}%</div>
          <div className="mt-5 flex justify-center">
            <Button
              onClick={handleReset}
              variant="outline"
              className="h-10 rounded-md border-[#30363d] bg-[#161b22] px-5 text-[#e6edf3] hover:bg-[#21262d]"
            >
              <RotateCcw className="mr-2 size-4" />
              Retry quiz
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="ds-panel p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8b949e]">Progress</div>
            <div className="mt-1 text-[14px] text-[#c9d1d9]">
              Question {currentIndex + 1} of {quiz.questions.length}
            </div>
          </div>
          <div className="min-w-[220px]">
            <div className="mb-2 flex justify-between text-[12px] text-[#8b949e]">
              <span>Completion</span>
              <span>{completionPct}%</span>
            </div>
            <div className="h-2 overflow-hidden bg-[#0d1117]">
              <div className="progress-bar-fill h-full bg-[#58a6ff]" style={{ width: `${completionPct}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="ds-panel p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <Badge variant="outline" className="rounded-md border-[#30363d] bg-[#161b22] px-2 py-1 text-[11px] uppercase text-[#c9d1d9]">
            {question.type === 'fill_blank' ? 'Fill in the blank' : 'Multiple choice'}
          </Badge>
          <div className="flex gap-1.5">
            {quiz.questions.map((q, index) => (
              <div
                key={q.id}
                className={`h-1.5 w-6 ${
                  index < currentIndex
                    ? submitted[q.id]
                      ? answers[q.id] === q.correct_answer
                        ? 'bg-[#3fb950]'
                        : 'bg-[#f85149]'
                      : 'bg-[#30363d]'
                    : index === currentIndex
                      ? 'bg-[#58a6ff]'
                      : 'bg-[#21262d]'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-lg leading-8 text-[#e6edf3]">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{ p: ({ children }) => <span>{children}</span> }}
          >
            {question.question}
          </ReactMarkdown>
        </div>

        <div className="mt-6 space-y-3">
          {question.type === 'mcq' && question.options ? (
            question.options.map((option) => {
              const isSelected = answers[question.id] === option
              const isActuallyCorrect = option === question.correct_answer

              let optionClass = 'border-[#30363d] bg-[#161b22] text-[#c9d1d9] hover:bg-[#21262d] hover:text-[#e6edf3]'
              if (hasAnswered) {
                if (isActuallyCorrect) optionClass = 'border-[#2ea043]/40 bg-[#2ea043]/8 text-[#e6edf3]'
                else if (isSelected) optionClass = 'border-[#f85149]/40 bg-[#f85149]/8 text-[#e6edf3]'
                else optionClass = 'border-[#30363d] bg-[#0d1117] text-[#8b949e]'
              } else if (isSelected) {
                optionClass = 'border-[#58a6ff]/40 bg-[#58a6ff]/10 text-[#e6edf3]'
              }

              return (
                <button
                  key={option}
                  onClick={() => handleSelectOption(option)}
                  disabled={hasAnswered}
                  className={`flex w-full items-center justify-between border px-4 py-3 text-left text-[14px] ${optionClass}`}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{ p: ({ children }) => <span>{children}</span> }}
                  >
                    {option}
                  </ReactMarkdown>
                  {hasAnswered && isActuallyCorrect ? <CheckCircle2 className="ml-4 size-4 text-[#3fb950]" /> : null}
                  {hasAnswered && isSelected && !isActuallyCorrect ? <XCircle className="ml-4 size-4 text-[#f85149]" /> : null}
                </button>
              )
            })
          ) : (
            <input
              type="text"
              value={fillInput}
              onChange={(event) => setFillInput(event.target.value)}
              disabled={hasAnswered}
              placeholder="Type your answer"
              className="ds-focus-ring w-full border border-[#30363d] bg-[#161b22] px-4 py-3 text-[14px] text-[#e6edf3] placeholder:text-[#8b949e]"
            />
          )}
        </div>

        {hasAnswered ? (
          <div className={`mt-5 border p-4 text-[13px] ${isCorrect ? 'border-[#2ea043]/40 bg-[#2ea043]/8' : 'border-[#f85149]/40 bg-[#f85149]/8'}`}>
            <div className="mb-2 flex items-center gap-2 font-medium text-[#e6edf3]">
              {isCorrect ? <CheckCircle2 className="size-4 text-[#3fb950]" /> : <XCircle className="size-4 text-[#f85149]" />}
              {isCorrect ? 'Correct answer' : `Incorrect. Correct answer: ${question.correct_answer}`}
            </div>
            <div className="leading-6 text-[#c9d1d9]">
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{ p: ({ children }) => <span>{children}</span> }}
              >
                {question.explanation}
              </ReactMarkdown>
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex justify-end gap-3">
          {!hasAnswered ? (
            <Button
              onClick={handleSubmit}
              disabled={question.type === 'fill_blank' ? !fillInput.trim() : !answers[question.id]}
              className="h-10 rounded-md border border-[#58a6ff]/40 bg-[#58a6ff] px-5 text-[#0d1117] hover:bg-[#79c0ff]"
            >
              Check answer
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="h-10 rounded-md border border-[#30363d] bg-[#161b22] px-5 text-[#e6edf3] hover:bg-[#21262d]"
            >
              {isLastQuestion ? 'Finish quiz' : 'Next question'}
              <ChevronRight className="ml-2 size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
