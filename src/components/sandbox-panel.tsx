'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCachedState } from '@/hooks/use-cached-state'
import { useProgress } from '@/lib/progress-context'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Challenge, GraderCheck, Lesson, Quiz } from '@/lib/curriculum-data'
import { BookOpen, FileText, HelpCircle, Activity, ShieldCheck, Zap, Download } from 'lucide-react'
import { Group, Panel, Separator } from 'react-resizable-panels'
import { QuizPanel } from './quiz-panel'
import { ActionBar } from './sandbox/action-bar'
import { EditorPanel } from './sandbox/editor-panel'
import { IdeTabs, TabsContent } from './sandbox/ide-tabs'
import { MarkdownContentPanel } from './sandbox/markdown-content-panel'
import { OutputPanelTabs } from './sandbox/output-panel-tabs'
import { ExecutionResult, GraderResult, LeftTabValue, OutputTabValue } from './sandbox/types'
import { useAuth } from '@/lib/auth-context'
import { generateModuleReport } from '@/lib/pdf-service'
import { Button } from '@/components/ui/button'

interface Props {
  challenge: Challenge
  lesson?: Lesson
  quiz?: Quiz
}

declare global {
  interface Window {
    pyodide: {
      runPythonAsync: (code: string) => Promise<unknown>
      loadPackage: (names: string | string[]) => Promise<void>
      globals: { get: (key: string) => unknown }
    }
    loadPyodide: (config: { indexURL: string }) => Promise<Window['pyodide']>
  }
}

const GRADER_CODE_TEMPLATE = `
import json

def _run_grader_checks(checks_json):
    checks = json.loads(checks_json)
    results = []
    for check in checks:
        var_expr = check['variable']
        condition = check['condition']
        expected = str(check['value'])
        try:
            actual = eval(str(var_expr))
            passed = False
            
            if condition == 'eq':
                try:
                    passed = float(actual) == float(expected)
                except:
                    passed = str(actual).strip() == expected.strip()
            elif condition == 'gt':
                passed = float(actual) > float(expected)
            elif condition == 'lt':
                passed = float(actual) < float(expected)
            elif condition == 'gte':
                passed = float(actual) >= float(expected)
            elif condition == 'lte':
                passed = float(actual) <= float(expected)
            elif condition == 'type_check':
                passed = type(actual).__name__ == expected
            elif condition == 'shape_check':
                # If actual is already a tuple/shape, use it directly, otherwise access .shape
                current_shape = actual if isinstance(actual, tuple) else getattr(actual, 'shape', None)
                passed = str(current_shape).replace(' ', '') == expected.replace(' ', '')
            
            results.append({'passed': passed, 'actual': str(actual), 'error': None})
        except Exception as e:
            results.append({'passed': False, 'actual': None, 'error': str(e)})
    return json.dumps(results)
`

const PYTHON_EXECUTION_SETUP = `
import sys
import io
import base64
import json
import builtins
import warnings

# Suppress annoying dependency and deprecation warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings("ignore", category=FutureWarning)
warnings.filterwarnings("ignore", message=".*pyarrow.*")

class _Capture:
    def __init__(self):
        self.data = []
    def write(self, s):
        self.data.append(s)
    def flush(self):
        pass
    def getvalue(self):
        return ''.join(self.data)

_stdout_capture = _Capture()
_stderr_capture = _Capture()
_captured_tables = []

sys.stdout = _stdout_capture
sys.stderr = _stderr_capture

def _stringify_cell(value):
    text = str(value)
    return text if len(text) <= 120 else text[:117] + '...'

def _capture_table(value):
    columns = None
    rows = None
    title = type(value).__name__
    try:
        import pandas as pd
        if isinstance(value, pd.DataFrame):
            preview = value.head(20).fillna('')
            columns = [str(col) for col in preview.columns.tolist()]
            rows = [[_stringify_cell(cell) for cell in row] for row in preview.astype(str).values.tolist()]
        elif isinstance(value, pd.Series):
            preview = value.head(20).fillna('')
            columns = ['index', value.name or 'value']
            rows = [[_stringify_cell(idx), _stringify_cell(cell)] for idx, cell in preview.items()]
    except Exception:
        pass

    if columns and rows is not None:
        _captured_tables.append({
            'title': title,
            'columns': columns,
            'rows': rows,
        })
        return True
    return False

if not hasattr(builtins, '_original_print'):
    builtins._original_print = builtins.print

def _patched_print(*args, **kwargs):
    rendered_args = []
    for arg in args:
        if not _capture_table(arg):
            rendered_args.append(arg)
    kwargs = dict(kwargs)
    kwargs['file'] = _stdout_capture
    if rendered_args:
        builtins._original_print(*rendered_args, **kwargs)
    elif not args:
        builtins._original_print(file=_stdout_capture)

builtins.print = _patched_print

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

_plots = []

def _patched_show(*args, **kwargs):
    buf = io.BytesIO()
    plt.savefig(buf, format='png', dpi=100, bbox_inches='tight', facecolor='white', edgecolor='none')
    buf.seek(0)
    img_b64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    _plots.append('data:image/png;base64,' + img_b64)
    plt.close()

plt.show = _patched_show
`

function ResizeHandle({ orientation }: { orientation: 'horizontal' | 'vertical' }) {
  return orientation === 'horizontal' ? (
    <Separator className="relative w-px cursor-col-resize bg-[#30363d] transition-colors hover:bg-[#58a6ff]/40" />
  ) : (
    <Separator className="relative h-px cursor-row-resize bg-[#30363d] transition-colors hover:bg-[#58a6ff]/40" />
  )
}

export function SandboxPanel({ challenge, lesson, quiz }: Props) {
  const { user } = useAuth()
  const { markChallengeComplete, completedQuizzes } = useProgress()
  const [code, setCode] = useCachedState(`sandbox-code-${challenge.id}`, challenge.starter_code)
  const [output, setOutput] = useState<ExecutionResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [pyodideReady, setPyodideReady] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState('Initializing Python...')
  const [leftTab, setLeftTab] = useState<LeftTabValue>('problem')
  const [outputTab, setOutputTab] = useState<OutputTabValue>('testcases')
  const pyodideRef = useRef<Window['pyodide'] | null>(null)

  const handleGenerateReport = useCallback(async () => {
    if (!user || !lesson) return

    await generateModuleReport({
      userName: user.name || 'Student',
      userEmail: user.email || 'guest@dq.elab',
      lessonTitle: lesson.title,
      practiceCode: code,
      practiceResult: 'All Test Cases Passed'
    })
  }, [user, lesson, code])

  useEffect(() => {
    if (output?.allPassed) {
      markChallengeComplete(challenge.id)
    }
  }, [output?.allPassed, challenge.id, markChallengeComplete])

  useEffect(() => {
    let mounted = true

    async function initPyodide() {
      try {
        let waitTime = 0
        while (!window.loadPyodide && waitTime < 10000) {
          await new Promise((resolve) => setTimeout(resolve, 200))
          waitTime += 200
        }

        if (!window.loadPyodide) {
          throw new Error('Pyodide script failed to load after 10s')
        }

        if (mounted) setLoadingStatus('Booting Kernel...')
        const pyodide = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/',
        })

        if (mounted) setLoadingStatus('Loading Packages...')
        await pyodide.loadPackage('micropip')

        if (mounted) setLoadingStatus('Injecting Dependencies...')
        await pyodide.runPythonAsync(`
import micropip
await micropip.install(['numpy', 'pandas', 'matplotlib', 'scikit-learn'])
        `)

        if (mounted) {
          pyodideRef.current = pyodide
          setPyodideReady(true)
          setLoadingStatus('Ready')
        }
      } catch (error) {
        console.error('Pyodide init error:', error)
        if (mounted) {
          setLoadingStatus('Kernel Fault')
        }
      }
    }

    initPyodide()
    return () => {
      mounted = false
    }
  }, [])

  const runCode = useCallback(async () => {
    if (!pyodideRef.current || !pyodideReady) return

    const pyodide = pyodideRef.current
    setIsRunning(true)
    setOutputTab('console')

    try {
      await pyodide.runPythonAsync(PYTHON_EXECUTION_SETUP)
      await pyodide.runPythonAsync(code)

      const stdout = await pyodide.runPythonAsync(`_stdout_capture.getvalue()`) as string
      const stderr = await pyodide.runPythonAsync(`_stderr_capture.getvalue()`) as string
      const plotsJson = await pyodide.runPythonAsync(`json.dumps(_plots)`) as string
      const tablesJson = await pyodide.runPythonAsync(`json.dumps(_captured_tables)`) as string
      const plots = JSON.parse(plotsJson) as string[]
      const tables = JSON.parse(tablesJson) as ExecutionResult['tables']

      let graderResults: GraderResult[] = []
      let allPassed = false

      if (challenge.grader_checks.length > 0) {
        await pyodide.runPythonAsync(GRADER_CODE_TEMPLATE)
        const checksJson = JSON.stringify(challenge.grader_checks)
        const resultsJson = await pyodide.runPythonAsync(`_run_grader_checks(${JSON.stringify(checksJson)})`) as string
        const rawResults = JSON.parse(resultsJson) as Array<{ passed?: boolean; actual?: string; error?: string }>

        graderResults = challenge.grader_checks.map((check: GraderCheck, index: number) => ({
          check,
          passed: rawResults[index]?.passed ?? false,
          actual: rawResults[index]?.actual ?? undefined,
          error: rawResults[index]?.error ?? undefined,
        }))
        allPassed = graderResults.every((result) => result.passed)
      }

      const nextOutput: ExecutionResult = {
        stdout,
        stderr,
        plots,
        tables,
        graderResults,
        allPassed,
      }

      if (stderr) {
        setOutputTab('errors')
      } else if (graderResults.length > 0) {
        setOutputTab('testcases')
      } else if (plots.length > 0) {
        setOutputTab('plots')
      } else if (tables.length > 0) {
        setOutputTab('dataframes')
      } else {
        setOutputTab('console')
      }

      setOutput(nextOutput)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      setOutput({
        stdout: '',
        stderr: message,
        plots: [],
        tables: [],
        graderResults: [],
        allPassed: false,
      })
      setOutputTab('console')
    } finally {
      setIsRunning(false)
    }
  }, [challenge.grader_checks, code, pyodideReady])

  return (
    <section className={cn(
      "relative h-[calc(100vh-120px)] min-h-[640px] overflow-hidden border border-[#30363d] bg-[#0d1117] transition-all duration-700",
      output?.allPassed && "border-[#3fb950]/30 shadow-[0_0_40px_-10px_rgba(63,185,80,0.1)]"
    )}>
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex h-10 shrink-0 items-center justify-between border-b border-[#30363d] bg-[#161b22] px-4">
          <div className="flex items-center gap-4">
            <div className={cn(
              "flex items-center gap-2 rounded-full border px-2.5 py-0.5 transition-all duration-300",
              pyodideReady ? "border-[#3fb950]/20 bg-[#3fb950]/5" : "border-[#d29922]/20 bg-[#d29922]/5"
            )}>
              <Activity className={cn("size-3", pyodideReady ? "text-[#3fb950]" : "text-[#d29922] animate-pulse")} />
              <span className={cn("text-[10px] font-bold uppercase tracking-wider", pyodideReady ? "text-[#3fb950]" : "text-[#d29922]")}>
                {loadingStatus}
              </span>
            </div>
            {isRunning && (
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#58a6ff]">
                <Zap className="size-3 animate-bounce" />
                <span>EXECUTING...</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
             <span className="font-mono text-[11px] text-[#484f58]">{challenge.id}</span>
             {output?.allPassed && (
               <div className="flex items-center gap-1.5 text-[#3fb950]">
                 <ShieldCheck className="size-3.5" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Verified</span>
               </div>
             )}
             {output?.allPassed && (quiz ? completedQuizzes.includes(quiz.id) : true) && (
               <Button 
                 onClick={handleGenerateReport}
                 className="h-7 rounded-md bg-[#3fb950]/10 px-3 text-[10px] font-bold text-[#3fb950] hover:bg-[#3fb950]/20 border border-[#3fb950]/20 ml-2"
               >
                 <Download className="mr-1.5 size-3" />
                 Download Report
               </Button>
             )}
          </div>
        </div>

        <Group orientation="horizontal" className="flex-1">
          <Panel defaultSize={40} minSize={30} className="min-w-0">
            <IdeTabs
              value={leftTab}
              onValueChange={setLeftTab}
              items={[
                { value: 'problem', label: 'Problem', icon: <FileText className="size-3.5" /> },
                ...(lesson ? [{ value: 'notes' as const, label: 'Notes', icon: <BookOpen className="size-3.5" /> }] : []),
                ...(quiz ? [{ value: 'quiz' as const, label: 'Quiz', icon: <HelpCircle className="size-3.5" /> }] : []),
              ]}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={leftTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="h-full"
                >
                  <TabsContent value="problem" className="h-full">
                    <MarkdownContentPanel title={challenge.title} content={challenge.prompt} />
                  </TabsContent>

                  {lesson && (
                    <TabsContent value="notes" className="h-full">
                      <MarkdownContentPanel content={lesson.content_md} />
                    </TabsContent>
                  )}

                  {quiz && (
                    <TabsContent value="quiz" className="h-full overflow-y-auto bg-[#0d1117] px-5 py-4">
                      <div className="mx-auto max-w-3xl">
                        <h2 className="mb-4 text-lg font-semibold text-[#e6edf3]">{quiz.title}</h2>
                        <QuizPanel quiz={quiz} />
                      </div>
                    </TabsContent>
                  )}
                </motion.div>
              </AnimatePresence>
            </IdeTabs>
          </Panel>

          <ResizeHandle orientation="horizontal" />

          <Panel defaultSize={60} minSize={30} className="min-w-0">
            <Group orientation="vertical">
              <Panel defaultSize={65} minSize={40} className="min-h-0">
                <EditorPanel code={code} onChange={setCode} onReset={() => setCode(challenge.starter_code)} />
              </Panel>

              <ResizeHandle orientation="vertical" />

              <Panel defaultSize={35} minSize={20} className="min-h-0 border-t border-[#30363d]">
                <OutputPanelTabs
                  activeTab={outputTab}
                  onTabChange={setOutputTab}
                  challenge={challenge}
                  output={output}
                  isRunning={isRunning}
                />
              </Panel>
            </Group>
          </Panel>
        </Group>

        <AnimatePresence>
          {output?.allPassed && (quiz ? completedQuizzes.includes(quiz.id) : true) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-x-4 bottom-20 z-50"
            >
              <div className="ds-panel glass-panel border-[#3fb950]/30 bg-[#0d1117]/90 p-6 shadow-2xl backdrop-blur-md">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-full bg-[#3fb950]/10 text-[#3fb950] glow-green">
                      <ShieldCheck className="size-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#e6edf3]">Module Mastered!</h3>
                      <p className="max-w-md text-[13px] leading-relaxed text-[#8b949e]">
                        Excellent work! You've successfully verified all test cases and completed the logic assessment. 
                        Your official report is ready.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-3">
                    <Button 
                      onClick={handleGenerateReport}
                      className="h-11 rounded-xl bg-[#3fb950] px-6 text-[13px] font-bold text-white hover:bg-[#2ea043] glow-green"
                    >
                      <Download className="mr-2 size-4" />
                      Download Completion Report
                    </Button>
                    <div className="flex items-start gap-2 max-w-[280px]">
                      <Activity className="mt-0.5 size-3 text-[#f85149]" />
                      <p className="text-[10px] italic leading-tight text-[#f85149]">
                        Disclaimer: Download immediately. This workspace uses local cache; 
                        data will be lost if browser history is cleared.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ActionBar
        disabled={!pyodideReady || isRunning}
        isRunning={isRunning}
        allPassed={output?.allPassed}
        hasResults={Boolean(output?.graderResults?.length)}
        onRun={runCode}
        onSubmit={runCode}
      />
    </section>
  )
}
