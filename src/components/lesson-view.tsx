'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Lesson, Quiz, Challenge, getAllLessons, QuizQuestion, GraderCheck } from '@/lib/curriculum-data'
import { MarkdownRenderer } from './markdown-renderer'
import { QuizPanel } from './quiz-panel'
import { SandboxPanel } from './sandbox-panel'
import { Badge } from '@/components/ui/badge'
import { BookOpen, HelpCircle, Code2, ChevronLeft, ChevronRight, Clock, ArrowRight, CheckCircle2, LucideIcon, FlaskConical, PanelLeftClose, Edit3, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'
import { saveLessonData } from '@/app/actions'

interface Props {
  lesson: Lesson
  quiz?: Quiz
  challenge?: Challenge
}

const difficultyConfig: Record<string, { color: string; label: string }> = {
  beginner: { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Beginner' },
  intermediate: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', label: 'Intermediate' },
  advanced: { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'Advanced' },
}

type ActiveSection = 'notes' | 'quiz' | 'lab'

export function LessonView({ lesson, quiz, challenge }: Props) {
  const { isAdmin } = useAuth()
  const [activeSection, setActiveSection] = useState<ActiveSection>(challenge ? 'lab' : 'notes')
  const diff = difficultyConfig[lesson.difficulty]

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  const [editData, setEditData] = useState({
    title: lesson.title,
    content: lesson.content_md,
    challengeTitle: challenge?.title || '',
    challengePrompt: challenge?.prompt || '',
    challengeCode: challenge?.starter_code || ''
  })
  
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(quiz?.questions || [])
  const [graderChecks, setGraderChecks] = useState<GraderCheck[]>(challenge?.grader_checks || [])

  // Sync state if props change (like when navigating between lessons)
  useEffect(() => {
    setEditData({
      title: lesson.title,
      content: lesson.content_md,
      challengeTitle: challenge?.title || '',
      challengePrompt: challenge?.prompt || '',
      challengeCode: challenge?.starter_code || ''
    })
    setQuizQuestions(quiz?.questions || [])
    setGraderChecks(challenge?.grader_checks || [])
    setActiveSection(challenge ? 'lab' : 'notes')
  }, [lesson, challenge, quiz])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await saveLessonData(
        lesson.id,
        editData.content,
        editData.title,
        challenge ? editData.challengeTitle : undefined,
        challenge ? editData.challengePrompt : undefined,
        challenge ? editData.challengeCode : undefined,
        quiz ? quizQuestions : undefined,
        challenge ? graderChecks : undefined
      )
      setIsEditing(false)
    } catch (e) {
      console.error(e)
      alert("Failed to save")
    } finally {
      setIsSaving(false)
    }
  }

  // Find adjacent lessons for navigation
  const allLessons = getAllLessons()
  const currentIndex = allLessons.findIndex(l => l.id === lesson.id)
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  const sections: { key: ActiveSection; label: string; icon: LucideIcon; available: boolean; count?: number }[] = [
    { key: 'notes', label: 'Notes', icon: BookOpen, available: true },
    { key: 'quiz', label: 'Quiz', icon: HelpCircle, available: !!quiz, count: quiz?.questions.length },
    { key: 'lab', label: 'Practice', icon: Code2, available: !!challenge },
  ]

  // Update the challenge and quiz objects passed to child panels with edited data
  const activeChallenge = challenge ? {
    ...challenge,
    title: editData.challengeTitle,
    prompt: editData.challengePrompt,
    starter_code: editData.challengeCode,
    grader_checks: graderChecks
  } : undefined
  
  const activeQuiz = quiz ? {
    ...quiz,
    questions: quizQuestions
  } : undefined

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      <div className="sticky top-0 z-30 border-b border-[#30363d] bg-[#0d1117]">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/curriculum" className="p-2 text-[#8b949e] transition-colors hover:bg-[#161b22] hover:text-[#e6edf3]">
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b949e]">
                <span>{lesson.domain}</span>
                <ChevronRight className="w-3 h-3" />
                <span>{lesson.topic}</span>
              </div>
              {isEditing ? (
                <input 
                  value={editData.title}
                  onChange={e => setEditData(d => ({ ...d, title: e.target.value }))}
                  className="mt-1 bg-[#161b22] border border-[#30363d] text-base font-semibold text-[#e6edf3] px-2 py-0.5 outline-none focus:border-[#58a6ff]"
                />
              ) : (
                <h1 className="mt-1 truncate text-base font-semibold text-[#e6edf3]">{editData.title}</h1>
              )}
            </div>
          </div>

          <div className="hidden items-center gap-1 border border-[#30363d] bg-[#161b22] p-1 md:flex">
            {sections.map((s) => {
              if (!s.available) return null
              const isActive = activeSection === s.key
              return (
                <button
                  key={s.key}
                  onClick={() => setActiveSection(s.key)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors',
                    isActive
                      ? 'bg-[#0d1117] text-[#e6edf3]'
                      : 'text-[#8b949e] hover:bg-[#0d1117] hover:text-[#c9d1d9]'
                  )}
                >
                  <s.icon className="w-3.5 h-3.5" />
                  <span>{s.label}</span>
                  {s.count && (
                    <span className={`border px-1.5 py-0.5 text-[10px] ${isActive ? 'border-[#30363d]' : 'border-transparent'}`}>
                      {s.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {isAdmin && (
              <Button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                disabled={isSaving}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium transition-colors h-8",
                  isEditing 
                    ? "bg-[#238636] text-white hover:bg-[#2ea043] border border-[#2ea043]/50" 
                    : "bg-[#161b22] text-[#e6edf3] border border-[#30363d] hover:bg-[#21262d]"
                )}
              >
                {isSaving ? (
                  'Saving...'
                ) : isEditing ? (
                  <><Save className="size-3.5" /> Save Changes</>
                ) : (
                  <><Edit3 className="size-3.5" /> Edit Mode</>
                )}
              </Button>
            )}
            {challenge ? (
              <button
                onClick={() => setActiveSection('lab')}
                className="flex items-center gap-2 border border-[#30363d] bg-[#161b22] px-3 py-1.5 text-[12px] font-medium text-[#e6edf3] transition-colors hover:bg-[#0d1117]"
              >
                <FlaskConical className="size-3.5 text-[#3fb950]" />
                Open Practice
              </button>
            ) : null}
            <Badge variant="outline" className={`capitalize border-[#30363d] text-[10px] ${diff.color}`}>
              {diff.label}
            </Badge>
            <div className="flex items-center gap-1 text-[10px] text-[#8b949e]">
              <Clock className="w-3 h-3" />
              <span>5–10 min</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 py-6">
        <div className="mb-6 grid gap-4 border border-[#30363d] bg-[#161b22] p-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8b949e]">
              <PanelLeftClose className="size-3.5" />
              <span>{challenge ? 'Lesson + Practice' : 'Lesson'}</span>
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-[#e6edf3]">{editData.title}</h2>
            <p className="max-w-3xl text-[14px] leading-6 text-[#8b949e]">
              Learn the concept, then move straight into a data-science coding exercise with editable Python, runnable test cases, and output tabs.
            </p>
          </div>
          <div className="border border-[#30363d] bg-[#0d1117] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[12px] font-medium text-[#e6edf3]">Practice Status</span>
              <span className="text-[12px] text-[#8b949e]">{challenge ? 'Available' : 'Coming soon'}</span>
            </div>
            <div className="space-y-2 text-[13px] text-[#8b949e]">
              <p>{challenge ? editData.challengeTitle : 'This lesson does not have a coding lab yet.'}</p>
              {challenge ? (
                <Button
                  onClick={() => setActiveSection('lab')}
                  className="mt-2 h-9 w-full rounded-md border border-[#2ea043]/50 bg-[#238636] text-white hover:bg-[#2ea043]"
                >
                  Start Practice
                </Button>
              ) : null}
            </div>
          </div>
        </div>

        {activeSection === 'notes' && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            {isEditing ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#8b949e]">Lesson Content (Markdown)</label>
                  <textarea 
                    value={editData.content}
                    onChange={e => setEditData(d => ({ ...d, content: e.target.value }))}
                    className="w-full min-h-[500px] bg-[#161b22] border border-[#30363d] p-4 font-mono text-[13px] text-[#e6edf3] outline-none focus:border-[#58a6ff] resize-y"
                  />
                </div>

                {quiz && (
                  <div className="space-y-4 border-t border-[#30363d] pt-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-[#e6edf3]">Edit Quiz Questions</h3>
                      <Button 
                        onClick={() => setQuizQuestions([...quizQuestions, { id: 'q' + Date.now(), type: 'mcq', question: 'New Question', options: ['Option 1', 'Option 2'], correct_answer: 'Option 1', explanation: 'Explanation' }])}
                        className="h-8 bg-[#238636] text-white hover:bg-[#2ea043]"
                      >
                        Add Question
                      </Button>
                    </div>
                    {quizQuestions.map((q, idx) => (
                      <div key={q.id} className="border border-[#30363d] p-4 space-y-3 bg-[#0d1117]">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-[#8b949e]">Question {idx + 1}</span>
                          <button onClick={() => setQuizQuestions(quizQuestions.filter((_, i) => i !== idx))} className="text-red-400 text-xs">Remove</button>
                        </div>
                        <input 
                          value={q.question}
                          onChange={e => { const newQ = [...quizQuestions]; newQ[idx].question = e.target.value; setQuizQuestions(newQ) }}
                          placeholder="Question text..."
                          className="w-full bg-[#161b22] border border-[#30363d] p-2 text-sm text-[#e6edf3] outline-none focus:border-[#58a6ff]"
                        />
                        <div className="text-[12px] text-[#8b949e]">Options (comma separated):</div>
                        <input 
                          value={q.options?.join(', ') || ''}
                          onChange={e => { const newQ = [...quizQuestions]; newQ[idx].options = e.target.value.split(',').map(s=>s.trim()); setQuizQuestions(newQ) }}
                          placeholder="Option 1, Option 2, Option 3..."
                          className="w-full bg-[#161b22] border border-[#30363d] p-2 text-sm text-[#e6edf3] outline-none focus:border-[#58a6ff]"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-[12px] text-[#8b949e]">Correct Answer:</div>
                            <input 
                              value={q.correct_answer}
                              onChange={e => { const newQ = [...quizQuestions]; newQ[idx].correct_answer = e.target.value; setQuizQuestions(newQ) }}
                              className="w-full bg-[#161b22] border border-[#30363d] p-2 text-sm text-[#e6edf3] outline-none focus:border-[#58a6ff]"
                            />
                          </div>
                          <div>
                            <div className="text-[12px] text-[#8b949e]">Explanation:</div>
                            <input 
                              value={q.explanation}
                              onChange={e => { const newQ = [...quizQuestions]; newQ[idx].explanation = e.target.value; setQuizQuestions(newQ) }}
                              className="w-full bg-[#161b22] border border-[#30363d] p-2 text-sm text-[#e6edf3] outline-none focus:border-[#58a6ff]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {challenge && (
                  <div className="space-y-4 border-t border-[#30363d] pt-6">
                    <h3 className="text-lg font-semibold text-[#e6edf3]">Edit Task (Challenge)</h3>
                    
                    <div className="space-y-2">
                      <label className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#8b949e]">Task Title</label>
                      <input 
                        value={editData.challengeTitle}
                        onChange={e => setEditData(d => ({ ...d, challengeTitle: e.target.value }))}
                        className="w-full bg-[#161b22] border border-[#30363d] p-2 text-sm text-[#e6edf3] outline-none focus:border-[#58a6ff]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#8b949e]">Task Prompt (Markdown)</label>
                      <textarea 
                        value={editData.challengePrompt}
                        onChange={e => setEditData(d => ({ ...d, challengePrompt: e.target.value }))}
                        className="w-full h-[200px] bg-[#161b22] border border-[#30363d] p-3 font-mono text-[13px] text-[#e6edf3] outline-none focus:border-[#58a6ff] resize-y"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#8b949e]">Starter Code (Python)</label>
                      <textarea 
                        value={editData.challengeCode}
                        onChange={e => setEditData(d => ({ ...d, challengeCode: e.target.value }))}
                        className="w-full h-[300px] bg-[#161b22] border border-[#30363d] p-3 font-mono text-[13px] text-[#e6edf3] outline-none focus:border-[#58a6ff] resize-y"
                        spellCheck={false}
                      />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-[#30363d] mt-4">
                      <div className="flex items-center justify-between">
                        <label className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#8b949e]">Grader Checks (Test Cases)</label>
                        <Button 
                          onClick={() => setGraderChecks([...graderChecks, { variable: 'var_name', condition: 'eq', value: 0, message: 'Should equal 0' }])}
                          variant="outline"
                          className="h-7 text-xs border-[#30363d] text-[#e6edf3]"
                        >
                          Add Check
                        </Button>
                      </div>
                      {graderChecks.map((check, idx) => (
                        <div key={idx} className="grid grid-cols-[1fr_80px_1fr_2fr_auto] gap-2 items-center bg-[#0d1117] p-2 border border-[#30363d]">
                          <input 
                            value={check.variable}
                            onChange={e => { const newC = [...graderChecks]; newC[idx].variable = e.target.value; setGraderChecks(newC) }}
                            placeholder="Variable"
                            className="bg-[#161b22] border border-[#30363d] p-1.5 text-xs text-[#e6edf3] outline-none focus:border-[#58a6ff]"
                          />
                          <select 
                            value={check.condition}
                            onChange={e => { const newC = [...graderChecks]; newC[idx].condition = e.target.value as any; setGraderChecks(newC) }}
                            className="bg-[#161b22] border border-[#30363d] p-1.5 text-xs text-[#e6edf3] outline-none focus:border-[#58a6ff]"
                          >
                            <option value="eq">==</option>
                            <option value="gt">&gt;</option>
                            <option value="lt">&lt;</option>
                            <option value="gte">&gt;=</option>
                            <option value="lte">&lt;=</option>
                            <option value="type_check">type</option>
                            <option value="shape_check">shape</option>
                          </select>
                          <input 
                            value={check.value}
                            onChange={e => { const newC = [...graderChecks]; newC[idx].value = isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value); setGraderChecks(newC) }}
                            placeholder="Value"
                            className="bg-[#161b22] border border-[#30363d] p-1.5 text-xs text-[#e6edf3] outline-none focus:border-[#58a6ff]"
                          />
                          <input 
                            value={check.message}
                            onChange={e => { const newC = [...graderChecks]; newC[idx].message = e.target.value; setGraderChecks(newC) }}
                            placeholder="Error message"
                            className="bg-[#161b22] border border-[#30363d] p-1.5 text-xs text-[#e6edf3] outline-none focus:border-[#58a6ff]"
                          />
                          <button onClick={() => setGraderChecks(graderChecks.filter((_, i) => i !== idx))} className="text-red-400 text-xs px-2">X</button>
                        </div>
                      ))}
                    </div>

                  </div>
                )}
              </div>
            ) : (
              <MarkdownRenderer content={editData.content} />
            )}

            <aside className="space-y-4">
              <div className="border border-[#30363d] bg-[#161b22] p-4">
                <div className="mb-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#8b949e]">Next Step</div>
                <p className="mb-4 text-[13px] leading-6 text-[#c9d1d9]">
                  {challenge
                    ? 'Jump into the coding workspace to apply this concept on a structured data problem.'
                    : 'Read the notes, then move to the next lesson for a hands-on practice task.'}
                </p>
                {challenge ? (
                  <Button
                    onClick={() => setActiveSection('lab')}
                    className="h-9 w-full rounded-md border border-[#30363d] bg-[#0d1117] text-[#e6edf3] hover:bg-[#21262d]"
                  >
                    Open Practice <ArrowRight className="ml-2 size-4" />
                  </Button>
                ) : null}
              </div>

              <div className="border border-[#30363d] bg-[#161b22] p-4">
                <div className="mb-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#8b949e]">Lesson Info</div>
                <div className="space-y-2 text-[13px] text-[#c9d1d9]">
                  <div className="flex items-center justify-between">
                    <span>Difficulty</span>
                    <span>{diff.label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Quiz</span>
                    <span>{quiz ? `${quiz.questions.length} question${quiz.questions.length > 1 ? 's' : ''}` : 'None'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Practice</span>
                    <span>{challenge ? 'Available' : 'Unavailable'}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}

        {activeSection === 'quiz' && activeQuiz && (
          <div className="space-y-6">
            <div className="border border-[#30363d] bg-[#161b22] p-4">
              <h2 className="text-lg font-semibold text-[#e6edf3]">{activeQuiz.title}</h2>
              <p className="mt-1 text-[13px] text-[#8b949e]">{activeQuiz.questions.length} questions with instant feedback</p>
            </div>
            <QuizPanel quiz={activeQuiz} />
            {activeQuiz && (
              <div className="flex flex-col items-start justify-between gap-4 border border-[#30363d] bg-[#161b22] p-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center border border-[#30363d] bg-[#0d1117]">
                    <Code2 className="w-5 h-5 text-[#3fb950]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#e6edf3]">Ready for the coding side?</h3>
                    <p className="text-xs text-[#8b949e]">Open the practice workspace and run code against test cases.</p>
                  </div>
                </div>
                {challenge ? (
                  <Button
                    onClick={() => setActiveSection('lab')}
                    className="h-9 shrink-0 rounded-md border border-[#2ea043]/50 bg-[#238636] px-5 text-white hover:bg-[#2ea043]"
                  >
                    Open Practice <Code2 className="ml-2 size-4" />
                  </Button>
                ) : null}
              </div>
            )}
          </div>
        )}

        {activeSection === 'lab' && activeChallenge && (
          <div className="-mx-6 -mb-6 border-y border-[#30363d] bg-[#0d1117] px-6 py-4">
            <SandboxPanel key={activeChallenge.id} challenge={activeChallenge} lesson={{...lesson, title: editData.title, content_md: editData.content}} quiz={activeQuiz} />
          </div>
        )}

        {activeSection !== 'lab' && (
        <div className="mt-12 border-t border-[#30363d] pt-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8b949e]">Learning Path</p>
            <div className="flex items-center gap-1.5">
              {allLessons.map((l, i) => (
                <div
                  key={l.id}
                  className={`w-6 h-1 rounded-full transition-colors ${
                    i < currentIndex ? 'bg-[#238636]'
                    : i === currentIndex ? 'bg-[#58a6ff]'
                    : 'bg-[#30363d]'
                  }`}
                  title={l.title}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {prevLesson ? (
              <Link href={`/curriculum/${prevLesson.id}`}>
                <div className="group cursor-pointer border border-[#30363d] bg-[#161b22] p-4 transition-colors hover:bg-[#0d1117]">
                  <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8b949e]">← Previous</p>
                  <p className="truncate text-sm font-semibold text-[#c9d1d9] group-hover:text-[#e6edf3]">{prevLesson.title}</p>
                </div>
              </Link>
            ) : <div />}

            {nextLesson ? (
              <Link href={`/curriculum/${nextLesson.id}`}>
                <div className="group cursor-pointer border border-[#30363d] bg-[#161b22] p-4 text-right transition-colors hover:bg-[#0d1117]">
                  <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#58a6ff]">Next →</p>
                  <p className="truncate text-sm font-semibold text-[#c9d1d9] group-hover:text-[#e6edf3]">{nextLesson.title}</p>
                </div>
              </Link>
            ) : (
              <div className="border border-[#238636]/40 bg-[#238636]/10 p-4 text-right">
                <div className="mb-1 flex items-center justify-end gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3fb950]" />
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#3fb950]">Complete!</p>
                </div>
                <p className="text-sm font-semibold text-[#3fb950]">You've covered all lessons</p>
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  )
}
