# DataQuest eLab

An Integrated Learning & Execution Environment for Undergraduate Data Science.

## Features

- **Curriculum Engine** — Structured lessons with Markdown and LaTeX math rendering (KaTeX) across Statistics and Machine Learning domains
- **Smart Quizzes** — MCQ and fill-in-the-blank questions with instant feedback and detailed explanations
- **Python Sandbox** — Monaco editor with Pyodide runtime; run NumPy, Matplotlib, and Scikit-Learn in the browser
- **Automated Grader** — Variable-state checks that verify solution correctness beyond simple string matching

## Tech Stack

- Next.js 16 (Turbopack) + TypeScript
- Tailwind CSS + shadcn/ui components
- KaTeX / rehype-katex for LaTeX math rendering
- Pyodide (WebAssembly Python) for in-browser code execution
- Monaco Editor for the Python code editor
- TanStack React Query
- Supabase (client setup, ready for auth integration)

## Getting Started

```bash
npm install
cp .env.local.example .env.local  # Fill in your Supabase credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Project Structure

```
src/
  app/
    page.tsx                    # Landing page
    curriculum/page.tsx         # Curriculum index
    curriculum/[lessonId]/      # Individual lesson pages
  components/
    lesson-view.tsx             # Tabbed lesson view (Notes / Quiz / Sandbox)
    markdown-renderer.tsx       # Markdown + LaTeX renderer
    quiz-panel.tsx              # Interactive quiz with MCQ/fill-blank
    sandbox-panel.tsx           # Monaco editor + Pyodide sandbox
    ui/                         # shadcn/ui components
  lib/
    curriculum-data.ts          # Lessons, quizzes, and challenges data
    supabase.ts                 # Supabase browser client
    utils.ts                    # Utility functions (cn)
```

## Content

- **Statistics**: Normal Distribution, Binomial Distribution, Hypothesis Testing
- **Machine Learning**: Linear Regression, Logistic Regression, Classification Metrics

Each lesson includes theory notes with LaTeX math, interactive quizzes, and coding challenges with automated grading.
