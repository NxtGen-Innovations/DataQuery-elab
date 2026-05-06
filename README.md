# DataQuest eLab 🚀

**An Elite, Professional-Grade Data Science Learning Workspace**

DataQuest eLab is an advanced browser-based Integrated Learning Environment (ILE) designed specifically for undergraduate and professional Data Science education. It bridges the gap between theoretical knowledge and applied engineering by providing a seamless, high-performance IDE experience directly in the browser.

![DataQuest eLab Banner](https://img.shields.io/badge/Status-Pro--Workspace-58a6ff?style=for-the-badge&logo=brain)
![Next.js](https://img.shields.io/badge/Next.js-16-white?style=for-the-badge&logo=next.js)
![Python](https://img.shields.io/badge/Python-WASM-3776ab?style=for-the-badge&logo=python)
![Framer Motion](https://img.shields.io/badge/UI-Elite--UX-ff0055?style=for-the-badge&logo=framer)

---

## 💎 Core Pillars

### 1. Immersive Curriculum Engine
Case-study driven curriculum spanning **3 Massive Units** and **40+ subtopics**.
- **Unit 1: Statistics Foundations** (Probability, Distributions, Hypothesis Testing)
- **Unit 2: Data Engineering & Manipulation** (Pandas, Feature Engineering, Cleaning)
- **Unit 3: Applied Machine Learning** (Modeling, Evaluation, Deployment)

### 2. High-Performance WASM Runtime
Powered by **Pyodide**, allowing full-speed Python execution in the browser.
- **Scientific Stack**: Pre-bundled with `NumPy`, `Pandas`, `Matplotlib`, and `Scikit-Learn`.
- **Zero Configuration**: No installation required. Execution happens entirely on the client side.
- **Smart Plots & DataFrames**: Interactive rendering of plots and paginated dataframe previews.

### 3. Elite "Pro-Dev" UX/UI
A premium design system inspired by **Linear**, **Raycast**, and modern AI IDEs.
- **GitHub-Grade Dark Mode**: Deep sea palette with glassmorphism and ambient glows.
- **Micro-Interactions**: Framer Motion powered transitions and success pulses.
- **Kernel Lifecycle Management**: Real-time status indicators for the Python runtime.

### 4. Automated Verification Engine
Move beyond string matching with state-based grading.
- **Variable Inspection**: The grader analyzes the internal state of Python objects.
- **Type & Shape Checks**: Ensures data structures (like DataFrames) match professional requirements.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Execution**: [Pyodide](https://pyodide.org/) (Python WASM)
- **Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) + [Lucide Icons](https://lucide.dev/)
- **Math Rendering**: [KaTeX](https://katex.org/) (LaTeX)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- NPM or PNPM

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NxtGen-Innovations/DataQuery-elab.git
   cd DataQuery-elab
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Access the workspace:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Login Credentials (Local Dev)
For local development, you can use the built-in administrative bypass:
- **Email**: `admin@dataquest.com`
- **Password**: `admin123`

---

## 📂 Project Structure

```bash
src/
├── app/                  # App Router pages (Dashboard, Curriculum, Labs)
├── components/           # UI Components (Sidebar, Sandbox, Quiz, Markdown)
│   ├── sandbox/          # Specialized coding environment components
│   └── ui/               # Reusable primitive components
├── lib/                  # Application logic
│   ├── curriculum-data.ts # The "Brain": Lessons, Quizzes, and Challenges
│   ├── auth-context.tsx  # Authentication & Session management
│   └── supabase.ts       # Backend client configuration
└── globals.css           # Global design tokens and elite UI styles
```

---

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.

Developed with ❤️ by **NxtGen Innovations**.
