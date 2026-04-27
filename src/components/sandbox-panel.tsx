'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Challenge, GraderCheck, Lesson, Quiz } from '@/lib/curriculum-data'
import { BookOpen, FileText, HelpCircle } from 'lucide-react'
import { Group, Panel, Separator } from 'react-resizable-panels'
import { QuizPanel } from './quiz-panel'
import { ActionBar } from './sandbox/action-bar'
import { EditorPanel } from './sandbox/editor-panel'
import { IdeTabs, TabsContent } from './sandbox/ide-tabs'
import { MarkdownContentPanel } from './sandbox/markdown-content-panel'
import { OutputPanelTabs } from './sandbox/output-panel-tabs'
import { ExecutionResult, GraderResult, LeftTabValue, OutputTabValue } from './sandbox/types'

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
        expected = check['value']
        try:
            actual = eval(str(var_expr))
            if condition == 'gt':
                passed = float(actual) > float(expected)
            elif condition == 'lt':
                passed = float(actual) < float(expected)
            elif condition == 'gte':
                passed = float(actual) >= float(expected)
            elif condition == 'lte':
                passed = float(actual) <= float(expected)
            elif condition == 'eq':
                passed = str(actual) == str(expected) or float(actual) == float(expected)
            elif condition == 'type_check':
                passed = type(actual).__name__ == str(expected)
            elif condition == 'shape_check':
                passed = str(actual.shape) == str(expected)
            else:
                passed = False
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

_original_print = builtins.print

def _patched_print(*args, **kwargs):
    rendered_args = []
    for arg in args:
        if not _capture_table(arg):
            rendered_args.append(arg)
    kwargs = dict(kwargs)
    kwargs['file'] = _stdout_capture
    if rendered_args:
        _original_print(*rendered_args, **kwargs)
    elif not args:
        _original_print(file=_stdout_capture)

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
    <Separator className="relative w-px cursor-col-resize bg-[#30363d] hover:bg-[#2f81f7]" />
  ) : (
    <Separator className="relative h-px cursor-row-resize bg-[#30363d] hover:bg-[#2f81f7]" />
  )
}

export function SandboxPanel({ challenge, lesson, quiz }: Props) {
  const [code, setCode] = useState(challenge.starter_code)
  const [output, setOutput] = useState<ExecutionResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [pyodideReady, setPyodideReady] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState('Initializing Python...')
  const [leftTab, setLeftTab] = useState<LeftTabValue>('problem')
  const [outputTab, setOutputTab] = useState<OutputTabValue>('testcases')
  const pyodideRef = useRef<Window['pyodide'] | null>(null)

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

        if (mounted) setLoadingStatus('Loading runtime...')
        const pyodide = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/',
        })

        if (mounted) setLoadingStatus('Loading packages...')
        await pyodide.loadPackage('micropip')

        if (mounted) setLoadingStatus('Installing numpy, pandas, matplotlib...')
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
          setLoadingStatus('Failed to load Python')
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
        setOutputTab('console')
      } else if (graderResults.length > 0) {
        setOutputTab('testcases')
      } else if (plots.length > 0) {
        setOutputTab('plots')
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
    <section className="relative h-[calc(100vh-120px)] min-h-[640px] overflow-hidden border border-[#30363d] bg-[#0d1117] font-[system-ui] text-[13px] text-[#c9d1d9]">
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex h-9 shrink-0 items-center justify-between border-b border-[#30363d] bg-[#161b22] px-4">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 ${pyodideReady ? 'bg-[#3fb950]' : 'bg-[#d29922]'}`} />
            <span className="text-[12px] text-[#8b949e]">{pyodideReady ? 'Runtime ready' : loadingStatus}</span>
          </div>
          <span className="font-mono text-[12px] text-[#8b949e]">{challenge.id}</span>
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
              <TabsContent value="problem" className="h-full">
                <MarkdownContentPanel title={challenge.title} content={challenge.prompt} />
              </TabsContent>

              {lesson ? (
                <TabsContent value="notes" className="h-full">
                  <MarkdownContentPanel content={lesson.content_md} />
                </TabsContent>
              ) : null}

              {quiz ? (
                <TabsContent value="quiz" className="h-full overflow-y-auto bg-[#0d1117] px-5 py-4">
                  <div className="mx-auto max-w-3xl">
                    <h2 className="mb-4 text-lg font-semibold text-[#e6edf3]">{quiz.title}</h2>
                    <QuizPanel quiz={quiz} />
                  </div>
                </TabsContent>
              ) : null}
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
