import Link from 'next/link'
import { BookOpen, Code2, Brain, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">DataQuest eLab</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/curriculum">
              <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                Curriculum
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 text-purple-300 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            MVP — Undergraduate Data Science Platform
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Learn Data Science
            <span className="block bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              by Doing It
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
            Read theory with LaTeX math, test your knowledge with quizzes, then write and execute real Python code — all in one unified environment.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/curriculum">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8">
                Start Learning
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: BookOpen,
              title: 'Curriculum Engine',
              desc: 'Structured lessons with Markdown and LaTeX math rendering across Statistics and ML domains.',
              color: 'from-blue-500 to-cyan-500',
            },
            {
              icon: Brain,
              title: 'Smart Quizzes',
              desc: 'MCQ and fill-in-the-blank questions with instant feedback and detailed explanations.',
              color: 'from-purple-500 to-pink-500',
            },
            {
              icon: Code2,
              title: 'DS Sandbox',
              desc: 'Monaco editor with Pyodide — run Python with NumPy, Pandas, and Scikit-Learn in the browser.',
              color: 'from-green-500 to-emerald-500',
            },
            {
              icon: Trophy,
              title: 'Automated Grader',
              desc: 'Variable-state checks that verify your solution correctness beyond simple string matching.',
              color: 'from-orange-500 to-yellow-500',
            },
          ].map(({ icon: Icon, title, desc, color }) => (
            <Card key={title} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <CardHeader className="pb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-white text-lg">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/60 text-sm leading-relaxed">{desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '2', label: 'Domains' },
            { value: '7', label: 'Lessons' },
            { value: '3', label: 'Coding Challenges' },
            { value: '< 2s', label: 'Execution Latency' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-3xl font-bold text-white mb-1">{value}</div>
              <div className="text-white/50 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
