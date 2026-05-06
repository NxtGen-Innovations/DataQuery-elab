'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Brain, Code2, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: BookOpen,
    title: 'Structured lessons',
    desc: 'Clear notes, formulas, and guided concepts with less noise and better focus.',
  },
  {
    icon: Brain,
    title: 'Assessment loops',
    desc: 'Short quizzes with fast feedback so students can confirm understanding early.',
  },
  {
    icon: Code2,
    title: 'Practice workspace',
    desc: 'Run Python, inspect dataframes, view plots, and work through test cases in one IDE-style flow.',
  },
  {
    icon: Trophy,
    title: 'Mastery signals',
    desc: 'Track progress from lesson to lesson and connect study time to visible outcomes.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3]">
      <nav className="border-b border-[#30363d] bg-[#0d1117]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 border-r border-[#30363d] pr-6">
              <img src="/srm-logo.png" alt="SRM Logo" className="size-9 object-contain" />
              <div className="hidden md:block">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#8b949e]">SRM Institute of</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#8b949e]">Science & Technology</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center border border-[#30363d] bg-[#161b22]">
                <Brain className="size-4 text-[#58a6ff]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#e6edf3]">DataQuest eLab</div>
                <div className="text-[11px] text-[#8b949e]">Learning Workspace</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button className="h-9 rounded-md border border-[#58a6ff]/40 bg-[#58a6ff] px-4 text-[#0d1117] hover:bg-[#79c0ff]">
                Access Workspace
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div>
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#30363d] bg-[#161b22]/50 p-1 pr-4 text-[11px] font-medium backdrop-blur-sm">
              <div className="flex items-center gap-2 rounded-full bg-[#58a6ff]/10 px-2 py-1 text-[#58a6ff]">
                <img src="/srm-logo.png" alt="" className="size-4 object-contain" />
                <span className="font-bold">SRMIST</span>
              </div>
              <span className="text-[#8b949e]">Official Data Science Learning Platform</span>
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-[#e6edf3]">
              Learn data science in a workspace built for reading, solving, and iterating.
            </h1>
            <p className="mt-5 max-w-2xl text-[16px] leading-8 text-[#8b949e]">
              Study concepts, validate understanding with quizzes, and move directly into an IDE-style coding environment with runnable Python, test cases, dataframe output, and plots.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/login">
                <Button className="h-11 rounded-md border border-[#58a6ff]/40 bg-[#58a6ff] px-6 text-[#0d1117] hover:bg-[#79c0ff]">
                  Access Workspace
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="ds-panel-elevated p-5">
            <div className="border border-[#30363d] bg-[#0d1117] p-4">
              <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8b949e]">Practice preview</div>
                  <div className="mt-1 text-sm font-semibold text-[#e6edf3]">Feature Engineering</div>
                </div>
                <div className="text-[12px] text-[#3fb950]">Ready</div>
              </div>
              <div className="mt-4 space-y-3">
                <div className="border border-[#30363d] bg-[#161b22] p-3 text-[13px] text-[#c9d1d9]">
                  Create an <code className="border border-[#30363d] bg-[#0d1117] px-1 py-0.5 text-[12px]">AgeAtSignup</code> feature and verify it with test cases.
                </div>
                <div className="border border-[#30363d] bg-[#0d1117] p-3 font-mono text-[12px] text-[#c9d1d9]">
                  <div>customers[&quot;AgeAtSignup&quot;] = ...</div>
                  <div>avg_age = ...</div>
                  <div>senior_count = ...</div>
                </div>
                <div className="grid grid-cols-3 gap-px border border-[#30363d] bg-[#30363d] text-center text-[12px]">
                  <div className="bg-[#161b22] px-2 py-3 text-[#e6edf3]">Problem</div>
                  <div className="bg-[#161b22] px-2 py-3 text-[#c9d1d9]">Editor</div>
                  <div className="bg-[#161b22] px-2 py-3 text-[#8b949e]">Testcases</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="mb-8">
            <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#8b949e]">Why it works</div>
            <h2 className="mt-2 text-3xl font-semibold text-[#e6edf3]">Built for applied learning</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="ds-panel p-6">
                <div className="flex size-10 items-center justify-center border border-[#30363d] bg-[#161b22]">
                  <feature.icon className="size-5 text-[#58a6ff]" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#e6edf3]">{feature.title}</h3>
                <p className="mt-2 text-[14px] leading-7 text-[#8b949e]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[#30363d] bg-[#0d1117] py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-4">
              <img src="/srm-logo.png" alt="SRM Logo" className="size-12 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#8b949e]">SRM Institute of</div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#8b949e]">Science & Technology</div>
              </div>
            </div>
            <div className="text-[12px] text-[#8b949e]">
              &copy; {new Date().getFullYear()} DataQuest eLab. Built for academic excellence.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
