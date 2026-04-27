'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Save, Plus, Trash2, BookOpen, Brain, Trophy, Code2, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/auth-context'

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/30 transition-all"

export default function AddContentPage() {
  const { isAdmin, isLoggedIn } = useAuth()

  if (!isLoggedIn || !isAdmin) {
    return (
      <div className="p-6 lg:p-8 max-w-5xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-black text-white">Access Denied</h2>
          <p className="text-sm text-white/40">Admin privileges required.</p>
          <Link href="/dashboard">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold mt-2">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <Link href="/admin" className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#8b949e] uppercase tracking-widest hover:text-[#e6edf3] transition-colors mb-8">
        <ChevronLeft className="w-3.5 h-3.5" /> Back to Dashboard
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-[11px] font-semibold text-[#8b949e] uppercase tracking-widest mb-1">Content Creation</p>
          <h1 className="text-xl font-semibold text-[#e6edf3] mb-1">Create New Content</h1>
          <p className="text-[13px] text-[#8b949e]">Use predefined templates to quickly build your curriculum.</p>
        </div>
        <Button className="h-8 bg-[#238636] hover:bg-[#2ea043] text-white flex items-center gap-1.5 font-medium text-[13px] shadow-sm rounded-md border border-[rgba(240,246,252,0.1)] transition-colors shrink-0">
          <Save className="w-3.5 h-3.5" /> Save Content
        </Button>
      </div>

      <Tabs defaultValue="lesson" className="space-y-6">
        <TabsList className="bg-[#0d1117] border border-[#30363d] p-1 h-auto rounded-md inline-flex">
          {[
            { value: 'lesson', icon: BookOpen, label: 'Lesson' },
            { value: 'quiz', icon: Brain, label: 'Quiz' },
            { value: 'challenge', icon: Trophy, label: 'Challenge' },
          ].map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2 data-[state=active]:bg-[#21262d] data-[state=active]:text-[#e6edf3] text-[#8b949e] text-[13px] font-medium rounded px-4 py-1.5 transition-all">
              <tab.icon className="w-3.5 h-3.5" /> {tab.label}
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
  const [domain, setDomain] = useState('Data Science')
  const [newDomain, setNewDomain] = useState('')
  const [isAddingNew, setIsAddingNew] = useState(false)

  const existingDomains = ['Data Science']

  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    if (val === '__ADD_NEW__') {
      setIsAddingNew(true)
      setDomain('')
    } else {
      setDomain(val)
      setIsAddingNew(false)
    }
  }

  return (
    <Card className="bg-[#0d1117] border-[#30363d] shadow-sm rounded-md">
      <CardHeader className="border-b border-[#30363d] bg-[#161b22] py-3 px-5">
        <CardTitle className="text-[14px] font-semibold text-[#e6edf3]">Lesson Details</CardTitle>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#8b949e] uppercase tracking-widest">Title</label>
            <input type="text" placeholder="e.g. Introduction to CNNs" className={inputCls} />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#8b949e] uppercase tracking-widest">Domain</label>
            {!isAddingNew ? (
              <select 
                value={domain}
                onChange={handleDomainChange}
                className={inputCls + " appearance-none"}
              >
                {existingDomains.map(d => <option key={d} value={d}>{d}</option>)}
                <option value="__ADD_NEW__">+ Add New Domain...</option>
              </select>
            ) : (
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Type new domain name..." 
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  className={inputCls + " pr-9"} 
                  autoFocus
                />
                <button 
                  onClick={() => setIsAddingNew(false)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                  title="Cancel"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#8b949e] uppercase tracking-widest">Topic</label>
            <input type="text" placeholder="e.g. Distributions" className={inputCls} />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#8b949e] uppercase tracking-widest">Difficulty</label>
            <select className={inputCls + " appearance-none"}>
              <option>beginner</option>
              <option>intermediate</option>
              <option>advanced</option>
            </select>
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-[#8b949e] uppercase tracking-widest">Content — Markdown + LaTeX supported</label>
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
        <p className="text-[13px] font-medium text-[#e6edf3]">{questions.length} Question{questions.length !== 1 ? 's' : ''}</p>
        <Button
          variant="outline"
          onClick={() => setQuestions([...questions, { id: Date.now() }])}
          className="bg-[#21262d] hover:bg-[#30363d] border-[#30363d] text-[#e6edf3] font-medium text-[12px] h-8 gap-1.5 rounded-md px-3 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Question
        </Button>
      </div>

      {questions.map((q, idx) => (
        <Card key={q.id} className="bg-[#0d1117] border-[#30363d] relative shadow-sm rounded-md">
          <button
            onClick={() => setQuestions(questions.filter((_, i) => i !== idx))}
            className="absolute top-3 right-4 p-1.5 rounded-md text-[#8b949e] hover:text-[#f85149] hover:bg-[#f85149]/10 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <CardHeader className="border-b border-[#30363d] bg-[#161b22] py-3 px-5">
            <CardTitle className="text-[11px] text-[#8b949e] font-semibold uppercase tracking-widest">Question #{idx + 1}</CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-[#8b949e] uppercase tracking-widest">Question Prompt</label>
              <input type="text" placeholder="What is the mean of a standard normal distribution?" className={inputCls} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((opt) => (
                <div key={opt} className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-[#d29922] uppercase tracking-widest">Option {opt}</label>
                  <input type="text" placeholder={`Option ${opt}`} className={inputCls} />
                </div>
              ))}
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-[#3fb950] uppercase tracking-widest">Correct Answer (exact match)</label>
              <input type="text" placeholder="Paste the exact text of the correct option" className={inputCls + " border-[#3fb950]/30 focus:ring-[#3fb950] focus:border-[#3fb950]"} />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-[#8b949e] uppercase tracking-widest">Explanation</label>
              <textarea rows={2} placeholder="Why is this the correct answer?" className={inputCls + " resize-y"} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ChallengeTemplate() {
  return (
    <Card className="bg-[#0d1117] border-[#30363d] shadow-sm rounded-md">
      <CardHeader className="border-b border-[#30363d] bg-[#161b22] py-3 px-5">
        <CardTitle className="text-[14px] font-semibold text-[#e6edf3]">Coding Challenge</CardTitle>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-[#8b949e] uppercase tracking-widest">Challenge Title</label>
          <input type="text" placeholder="e.g. Plot a Normal Distribution PDF" className={inputCls} />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-[#8b949e] uppercase tracking-widest">Task Prompt (Markdown)</label>
          <textarea rows={5} placeholder="## Task&#10;&#10;Describe what the student must do..." className={inputCls + " font-mono resize-y"} />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-[#8b949e] uppercase tracking-widest flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-[#58a6ff]" /> Starter Code (Python)
          </label>
          <div className="rounded-md overflow-hidden border border-[#30363d]">
            <div className="px-3 py-1.5 bg-[#161b22] border-b border-[#30363d] text-[10px] font-semibold text-[#8b949e] uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] inline-block shadow-[0_0_8px_rgba(63,185,80,0.4)]" />
              Python
            </div>
            <textarea rows={8} className="w-full bg-[#0d1117] p-3 text-[13px] font-mono text-[#e6edf3] focus:outline-none resize-y" defaultValue={`import numpy as np\nimport matplotlib.pyplot as plt\n\n# Your starter code here\n`} />
          </div>
        </div>
        <div className="pt-4 border-t border-[#30363d] space-y-3">
          <h4 className="text-[11px] font-semibold text-[#8b949e] uppercase tracking-widest">Grader Checks</h4>
          {[1].map((_, i) => (
            <div key={i} className="grid grid-cols-3 gap-3">
              <input type="text" placeholder="Variable name" className={inputCls + " font-mono text-xs"} />
              <select className={inputCls + " text-xs appearance-none"}>
                <option>Equal to (eq)</option>
                <option>Greater than (gt)</option>
                <option>Less than (lt)</option>
                <option>Type check</option>
                <option>Shape check</option>
              </select>
              <input type="text" placeholder="Expected value" className={inputCls + " font-mono text-xs"} />
            </div>
          ))}
          <Button variant="ghost" size="sm" className="text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#30363d] h-7 px-2.5 text-[12px] rounded-md transition-colors gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Add Check
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
