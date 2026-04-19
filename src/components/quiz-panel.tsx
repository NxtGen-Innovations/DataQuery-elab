'use client'

import { useState } from 'react'
import { Quiz } from '@/lib/curriculum-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Trophy } from 'lucide-react'
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
    ([id]) => answers[id] === quiz.questions.find(q => q.id === id)?.correct_answer
  ).length

  function handleSelectOption(option: string) {
    if (hasAnswered) return
    setAnswers(prev => ({ ...prev, [question.id]: option }))
  }

  function handleSubmit() {
    const answer = question.type === 'fill_blank' ? fillInput.trim().toLowerCase() : answers[question.id]
    if (!answer) return
    setAnswers(prev => ({ ...prev, [question.id]: answer }))
    setSubmitted(prev => ({ ...prev, [question.id]: true }))
  }

  function handleNext() {
    if (isLastQuestion) {
      setQuizComplete(true)
    } else {
      setCurrentIndex(i => i + 1)
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

  if (quizComplete) {
    const percentage = Math.round((correctCount / quiz.questions.length) * 100)
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="pt-10 pb-10 text-center">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-500/50 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h2>
            <p className="text-white/60 mb-6">
              You got <span className="text-white font-semibold">{correctCount}</span> out of{' '}
              <span className="text-white font-semibold">{quiz.questions.length}</span> correct.
            </p>
            <div className="text-5xl font-bold mb-2">
              <span className={percentage >= 70 ? 'text-green-400' : 'text-red-400'}>{percentage}%</span>
            </div>
            <p className="text-white/40 mb-8 text-sm">
              {percentage >= 90 ? 'Excellent! 🎉' : percentage >= 70 ? 'Good job! 👍' : 'Keep studying and try again! 📚'}
            </p>
            <Button onClick={handleReset} variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <RotateCcw className="w-4 h-4 mr-2" />
              Retry Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-white/50 text-sm">
          Question {currentIndex + 1} of {quiz.questions.length}
        </span>
        <div className="flex gap-1.5">
          {quiz.questions.map((q, i) => (
            <div
              key={q.id}
              className={`w-6 h-1.5 rounded-full transition-colors ${
                i < currentIndex
                  ? submitted[q.id]
                    ? answers[q.id] === q.correct_answer
                      ? 'bg-green-500'
                      : 'bg-red-500'
                    : 'bg-white/30'
                  : i === currentIndex
                  ? 'bg-purple-500'
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <Badge variant="outline" className="w-fit mb-2 text-purple-400 border-purple-500/30 bg-purple-500/10 capitalize">
            {question.type === 'fill_blank' ? 'Fill in the blank' : question.type.toUpperCase()}
          </Badge>
          <CardTitle className="text-white text-lg font-normal leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{ p: ({ children }) => <span>{children}</span> }}
            >
              {question.question}
            </ReactMarkdown>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {question.type === 'mcq' && question.options && (
            <div className="space-y-2">
              {question.options.map((option) => {
                const isSelected = answers[question.id] === option
                const isActuallyCorrect = option === question.correct_answer
                let optionClass = 'border-white/10 text-white/70 hover:border-purple-500/50 hover:bg-purple-500/5'
                if (hasAnswered) {
                  if (isActuallyCorrect) optionClass = 'border-green-500 bg-green-500/10 text-green-300'
                  else if (isSelected) optionClass = 'border-red-500 bg-red-500/10 text-red-300'
                  else optionClass = 'border-white/5 text-white/30'
                } else if (isSelected) {
                  optionClass = 'border-purple-500 bg-purple-500/10 text-purple-300'
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleSelectOption(option)}
                    disabled={hasAnswered}
                    className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${optionClass} disabled:cursor-default`}
                  >
                    <div className="flex items-center justify-between">
                      <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{ p: ({ children }) => <span>{children}</span> }}
                      >
                        {option}
                      </ReactMarkdown>
                      {hasAnswered && isActuallyCorrect && <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />}
                      {hasAnswered && isSelected && !isActuallyCorrect && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {question.type === 'fill_blank' && (
            <input
              type="text"
              value={fillInput}
              onChange={(e) => setFillInput(e.target.value)}
              disabled={hasAnswered}
              placeholder="Type your answer..."
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 disabled:opacity-50"
            />
          )}

          {/* Feedback */}
          {hasAnswered && (
            <div className={`p-4 rounded-lg border text-sm ${isCorrect ? 'bg-green-500/10 border-green-500/30 text-green-300' : 'bg-red-500/10 border-red-500/30 text-red-300'}`}>
              <div className="flex items-center gap-2 mb-2 font-semibold">
                {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {isCorrect ? 'Correct!' : `Incorrect. Answer: ${question.correct_answer}`}
              </div>
              <div className="text-white/70">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{ p: ({ children }) => <span>{children}</span> }}
                >
                  {question.explanation}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            {!hasAnswered ? (
              <Button
                onClick={handleSubmit}
                disabled={question.type === 'fill_blank' ? !fillInput.trim() : !answers[question.id]}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700 text-white">
                {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
