'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Save, Plus, Trash2, BookOpen, Brain, Trophy, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/30 transition-all"

export default function AddContentPage() {
  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <Link href="/admin" className="inline-flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-widest hover:text-purple-400 transition-colors mb-8">
        <ChevronLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-10">
        <div>
          <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">Content Creation</p>
          <h1 className="text-2xl font-black text-white mb-1">Create New Content</h1>
          <p className="text-sm text-white/30">Use predefined templates to quickly build your curriculum.</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 font-bold shadow-lg shadow-purple-500/20 shrink-0">
          <Save className="w-4 h-4" /> Save Content
        </Button>
      </div>

      <Tabs defaultValue="lesson" className="space-y-6">
        <TabsList className="bg-[#111111] border border-white/[0.06] p-1 h-auto rounded-xl">
          {[
            { value: 'lesson', icon: BookOpen, label: 'Lesson' },
            { value: 'quiz', icon: Brain, label: 'Quiz' },
            { value: 'challenge', icon: Trophy, label: 'Challenge' },
          ].map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-white/40 text-sm font-bold rounded-lg px-4 py-2 transition-all">
              <tab.icon className="w-4 h-4" /> {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="lesson">
          <LessonTemplate />
        </TabsContent>
        <TabsContent value="quiz">
          <QuizTemplate />
        </TabsContent>
        <TabsContent value="challenge">
          <ChallengeTemplate />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function LessonTemplate() {
  return (
    <Card className="bg-[#111111] border-white/5">
      <CardHeader className="border-b border-white/5">
        <CardTitle className="text-base text-white">Lesson Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">Title</label>
            <input type="text" placeholder="e.g. Introduction to CNNs" className={inputCls} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">Domain</label>
            <select className={inputCls + " appearance-none"}>
              <option>Statistics</option>
              <option>Machine Learning</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">Topic</label>
            <input type="text" placeholder="e.g. Distributions" className={inputCls} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">Difficulty</label>
            <select className={inputCls + " appearance-none"}>
              <option>beginner</option>
              <option>intermediate</option>
              <option>advanced</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">Content — Markdown + LaTeX supported</label>
          <textarea rows={12} placeholder="# Your Lesson Title&#10;&#10;Content goes here... use $math$ for inline and $$math$$ for display." className={inputCls + " font-mono resize-y"} />
        </div>
      </CardContent>
    </Card>
  )
}

function QuizTemplate() {
  const [questions, setQuestions] = useState([{ id: 1 }])
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-white">{questions.length} Question{questions.length !== 1 ? 's' : ''}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setQuestions([...questions, { id: Date.now() }])}
          className="bg-white/5 border-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Add Question
        </Button>
      </div>

      {questions.map((q, idx) => (
        <Card key={q.id} className="bg-[#111111] border-white/5 relative">
          <button
            onClick={() => setQuestions(questions.filter((_, i) => i !== idx))}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-white/15 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <CardHeader className="border-b border-white/5 py-3 px-6">
            <CardTitle className="text-xs text-white/30 font-black uppercase tracking-widest">Question #{idx + 1}</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">Question Prompt</label>
              <input type="text" placeholder="What is the mean of a standard normal distribution?" className={inputCls} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((opt) => (
                <div key={opt} className="space-y-1.5">
                  <label className="text-[9px] font-black text-orange-400/50 uppercase tracking-widest">Option {opt}</label>
                  <input type="text" placeholder={`Option ${opt}`} className={inputCls + " py-2.5"} />
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black text-green-400/60 uppercase tracking-widest">Correct Answer (exact match)</label>
              <input type="text" placeholder="Paste the exact text of the correct option" className={inputCls + " border-green-500/20 focus:ring-green-500/30"} />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black text-white/25 uppercase tracking-widest">Explanation</label>
              <textarea rows={2} placeholder="Why is this the correct answer?" className={inputCls + " resize-none"} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ChallengeTemplate() {
  return (
    <Card className="bg-[#111111] border-white/5">
      <CardHeader className="border-b border-white/5">
        <CardTitle className="text-base text-white">Coding Challenge</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">Challenge Title</label>
          <input type="text" placeholder="e.g. Plot a Normal Distribution PDF" className={inputCls} />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">Task Prompt (Markdown)</label>
          <textarea rows={5} placeholder="## Task&#10;&#10;Describe what the student must do..." className={inputCls + " font-mono resize-y"} />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-white/30 uppercase tracking-widest flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5 text-purple-400" /> Starter Code (Python)
          </label>
          <div className="rounded-xl overflow-hidden border border-white/10">
            <div className="px-4 py-2 bg-white/[0.03] border-b border-white/5 text-[10px] font-bold text-white/20 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400/60 inline-block" />
              Python
            </div>
            <textarea rows={8} className="w-full bg-[#0a0a0a] p-4 text-sm font-mono text-green-400/80 focus:outline-none resize-y" defaultValue={`import numpy as np\nimport matplotlib.pyplot as plt\n\n# Your starter code here\n`} />
          </div>
        </div>
        <div className="pt-4 border-t border-white/5 space-y-3">
          <h4 className="text-xs font-black text-white/40 uppercase tracking-widest">Grader Checks</h4>
          {[1].map((_, i) => (
            <div key={i} className="grid grid-cols-3 gap-3">
              <input type="text" placeholder="Variable name" className={inputCls + " py-2.5 text-xs"} />
              <select className={inputCls + " py-2.5 text-xs appearance-none"}>
                <option>Equal to (eq)</option>
                <option>Greater than (gt)</option>
                <option>Less than (lt)</option>
                <option>Type check</option>
                <option>Shape check</option>
              </select>
              <input type="text" placeholder="Expected value" className={inputCls + " py-2.5 text-xs"} />
            </div>
          ))}
          <Button variant="ghost" size="sm" className="text-white/30 hover:text-white/60 text-xs gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Add Check
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
