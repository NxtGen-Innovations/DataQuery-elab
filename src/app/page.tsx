'use client'

import Link from 'next/link'
import { Brain, BookOpen, Code2, Trophy, ArrowRight, BarChart2, Zap, Users, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: BookOpen,
    title: 'Curriculum Engine',
    desc: 'Structured lessons with LaTeX math, Markdown content, and progress tracking.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Brain,
    title: 'Smart Quizzes',
    desc: 'MCQ and fill-in-the-blank questions with instant feedback and explanations.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Code2,
    title: 'Python Sandbox',
    desc: 'Monaco editor powered by Pyodide. Run NumPy, Pandas, Scikit-Learn in-browser.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Trophy,
    title: 'Automated Grader',
    desc: 'Variable-state checks that verify correctness beyond simple string matching.',
    color: 'from-orange-500 to-yellow-500',
  },
]

const stats = [
  { value: '10k+', label: 'Students', icon: Users },
  { value: '4.9★', label: 'Rating', icon: Star },
  { value: '2', label: 'Domains', icon: BarChart2 },
  { value: '<2s', label: 'Execution', icon: Zap },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#080808]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-white tracking-tight">DataQuest <span className="text-purple-400">eLab</span></span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-white/60 hover:text-white text-sm font-semibold">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold px-5 shadow-lg shadow-purple-500/20">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Background glow orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-indigo-600/6 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-purple-400 inline-block animate-pulse" />
            <span className="text-purple-300 text-xs font-bold uppercase tracking-widest">Undergraduate Data Science Platform</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 tracking-tight">
            Learn Data Science<br />
            <span className="gradient-text">by Doing It</span>
          </h1>

          <p className="text-white/50 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Read theory with LaTeX math, test knowledge with quizzes, then write and execute real Python code — all in one unified environment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 h-12 text-base shadow-2xl shadow-purple-500/30 group">
                Start Learning Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-semibold h-12 px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/5 bg-white/[0.02] py-8">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-black text-white mb-1">{s.value}</p>
              <p className="text-[11px] text-white/30 uppercase font-bold tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-black text-purple-400 uppercase tracking-widest mb-3">What's Inside</p>
            <h2 className="text-3xl lg:text-4xl font-black text-white">Everything you need to master Data Science</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-[#111111] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all group">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-transparent p-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 pointer-events-none rounded-3xl" />
            <h2 className="text-3xl font-black text-white mb-4">Ready to start your journey?</h2>
            <p className="text-white/40 mb-8 max-w-md mx-auto">Join thousands of students learning Data Science the right way — hands-on and practical.</p>
            <Link href="/signup">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-10 h-12 shadow-2xl shadow-purple-500/30">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/20">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="font-bold text-white/40">DataQuest eLab</span>
          </div>
          <p>© 2025 DataQuest eLab. Built for learners.</p>
        </div>
      </footer>
    </div>
  )
}
