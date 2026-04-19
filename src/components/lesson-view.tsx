'use client'

import { Lesson, Quiz, Challenge } from '@/lib/curriculum-data'
import { MarkdownRenderer } from './markdown-renderer'
import { QuizPanel } from './quiz-panel'
import { SandboxPanel } from './sandbox-panel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { BookOpen, HelpCircle, Code2 } from 'lucide-react'

interface Props {
  lesson: Lesson
  quiz?: Quiz
  challenge?: Challenge
}

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
}

export function LessonView({ lesson, quiz, challenge }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Lesson Title */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="outline" className="text-purple-400 border-purple-500/30 bg-purple-500/10">
            {lesson.domain}
          </Badge>
          <Badge variant="outline" className="text-cyan-400 border-cyan-500/30 bg-cyan-500/10">
            {lesson.topic}
          </Badge>
          <Badge variant="outline" className={`capitalize ${difficultyColors[lesson.difficulty]}`}>
            {lesson.difficulty}
          </Badge>
        </div>
        <h1 className="text-3xl font-bold text-white">{lesson.title}</h1>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="notes" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 mb-6">
          <TabsTrigger value="notes" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-white/60 gap-2">
            <BookOpen className="w-4 h-4" />
            Notes
          </TabsTrigger>
          {quiz && (
            <TabsTrigger value="quiz" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-white/60 gap-2">
              <HelpCircle className="w-4 h-4" />
              Quiz ({quiz.questions.length})
            </TabsTrigger>
          )}
          {challenge && (
            <TabsTrigger value="sandbox" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-white/60 gap-2">
              <Code2 className="w-4 h-4" />
              Sandbox
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="notes">
          <MarkdownRenderer content={lesson.content_md} />
        </TabsContent>

        {quiz && (
          <TabsContent value="quiz">
            <QuizPanel quiz={quiz} />
          </TabsContent>
        )}

        {challenge && (
          <TabsContent value="sandbox">
            <SandboxPanel challenge={challenge} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
