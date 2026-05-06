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
      <nav className="sticky top-0 z-50 border-b border-[#30363d] bg-[#0d1117]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <div className="group flex items-center gap-3">
              <img src="/srm-logo.png" alt="SRM Logo" className="size-10 object-contain transition-transform group-hover:scale-105" />
              <div className="hidden lg:block">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b949e]">SRM Institute of</div>
                <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#f0f6fc]">Science & Technology</div>
              </div>
            </div>
            
            <div className="h-6 w-px bg-[#30363d]" />

            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center border border-[#30363d] bg-[#161b22] ring-1 ring-[#58a6ff]/20">
                <Brain className="size-4 text-[#58a6ff]" />
              </div>
              <div>
                <div className="text-sm font-semibold tracking-tight text-[#e6edf3]">DataQuest eLab</div>
                <div className="text-[10px] uppercase tracking-wider text-[#8b949e]">Learning Environment</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="h-9 rounded-md text-[#c9d1d9] hover:bg-[#161b22] hover:text-[#e6edf3]">
                Sign in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="h-9 rounded-md border border-[#58a6ff]/40 bg-[#58a6ff] px-4 text-[#0d1117] hover:bg-[#79c0ff]">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(88,166,255,0.1)_0%,transparent_100%)]" />

        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div>
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#30363d] bg-[#161b22]/50 p-1 pr-4 text-[11px] font-medium backdrop-blur-sm">
              <div className="flex items-center gap-2 rounded-full bg-[#58a6ff]/10 px-2 py-1 text-[#58a6ff]">
                <img src="/srm-logo.png" alt="" className="size-4 object-contain" />
                <span className="font-bold">SRMIST</span>
              </div>
              <span className="text-[#8b949e]">Official Data Science Learning Platform</span>
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.1] tracking-tight text-[#e6edf3] md:text-6xl">
              Master data science in a <span className="text-[#58a6ff]">professional</span> workspace.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#8b949e]">
              A specialized environment for SRM students to study concepts, validate understanding with real-time quizzes, and move directly into an IDE-style workspace.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/signup">
                <Button className="h-12 rounded-md border border-[#58a6ff]/40 bg-[#58a6ff] px-8 text-[15px] font-semibold text-[#0d1117] hover:bg-[#79c0ff]">
                  Start learning now
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="h-12 rounded-md border-[#30363d] bg-[#161b22] px-8 text-[15px] text-[#e6edf3] hover:bg-[#21262d]">
                  Open workspace
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-[#58a6ff]/5 blur-3xl" />
            <div className="ds-panel-elevated relative overflow-hidden p-1">
              <div className="border border-[#30363d] bg-[#0d1117] p-4">
                <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8b949e]">Practice preview</div>
                    <div className="mt-1 text-sm font-semibold text-[#e6edf3]">Feature Engineering</div>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-[#3fb950]/10 px-2 py-0.5 text-[10px] font-bold text-[#3fb950]">
                    <span className="size-1.5 rounded-full bg-[#3fb950]" />
                    Ready
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="border border-[#30363d] bg-[#161b22] p-3 text-[13px] text-[#c9d1d9]">
                    Create an <code className="border border-[#30363d] bg-[#0d1117] px-1 py-0.5 text-[12px]">AgeAtSignup</code> feature and verify it with test cases.
                  </div>
                  <div className="border border-[#30363d] bg-[#0d1117] p-3 font-mono text-[12px] text-[#58a6ff]">
                    <div>customers[&quot;AgeAtSignup&quot;] = ...</div>
                    <div>avg_age = ...</div>
                  </div>
                  <div className="grid grid-cols-3 gap-px border border-[#30363d] bg-[#30363d] text-center text-[11px] font-bold uppercase tracking-wider">
                    <div className="bg-[#1c2128] py-2 text-[#e6edf3]">Problem</div>
                    <div className="bg-[#161b22] py-2 text-[#8b949e]">Editor</div>
                    <div className="bg-[#161b22] py-2 text-[#8b949e]">Tests</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="mb-12">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#58a6ff]">Core Features</div>
            <h2 className="mt-3 text-3xl font-semibold text-[#e6edf3]">Built for SRM students</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="ds-panel group p-8 hover:bg-[#1c2128]/50">
                <div className="flex size-12 items-center justify-center border border-[#30363d] bg-[#161b22] ring-1 ring-[#58a6ff]/10 group-hover:ring-[#58a6ff]/30">
                  <feature.icon className="size-6 text-[#58a6ff]" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[#e6edf3]">{feature.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#8b949e]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[#30363d] bg-[#0d1117] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto]">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img src="/srm-logo.png" alt="SRM Logo" className="size-16 object-contain" />
                <div>
                  <div className="text-sm font-bold uppercase tracking-[0.2em] text-[#e6edf3]">SRM Institute of</div>
                  <div className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#e6edf3]">Science & Technology</div>
                  <div className="mt-1 text-xs text-[#8b949e]">Deemed to be University u/s 3 of UGC Act, 1956</div>
                </div>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[#8b949e]">
                Empowering the next generation of data scientists with state-of-the-art tools and a comprehensive curriculum.
              </p>
            </div>
            
            <div className="flex flex-col justify-end gap-2 text-right">
              <div className="text-sm font-semibold text-[#e6edf3]">DataQuest eLab</div>
              <div className="text-xs text-[#8b949e]">
                &copy; {new Date().getFullYear()} SRMIST. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
