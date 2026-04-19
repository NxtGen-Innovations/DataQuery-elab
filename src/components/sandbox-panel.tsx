'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Challenge, GraderCheck } from '@/lib/curriculum-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, RotateCcw, CheckCircle2, XCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

interface Props {
  challenge: Challenge
}

interface GraderResult {
  check: GraderCheck
  passed: boolean
  actual?: string
  error?: string
}

interface ExecutionResult {
  stdout: string
  stderr: string
  plots: string[]
  graderResults?: GraderResult[]
  allPassed?: boolean
}

declare global {
  interface Window {
    pyodide: {
      runPythonAsync: (code: string) => Promise<unknown>
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

export function SandboxPanel({ challenge }: Props) {
  const [code, setCode] = useState(challenge.starter_code)
  const [output, setOutput] = useState<ExecutionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [pyodideReady, setPyodideReady] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState('Loading Python runtime...')
  const [showPrompt, setShowPrompt] = useState(true)
  const pyodideRef = useRef<Window['pyodide'] | null>(null)

  // Load Pyodide
  useEffect(() => {
    let mounted = true

    async function initPyodide() {
      try {
        if (!window.loadPyodide) {
          setLoadingStatus('Loading Pyodide...')
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script')
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js'
            script.onload = () => resolve()
            script.onerror = () => reject(new Error('Failed to load Pyodide'))
            document.head.appendChild(script)
          })
        }

        setLoadingStatus('Initializing Python environment...')
        const pyodide = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/',
        })

        setLoadingStatus('Installing packages (numpy, matplotlib, scikit-learn)...')
        await pyodide.runPythonAsync(`
import micropip
await micropip.install(['numpy', 'matplotlib', 'scikit-learn'])
print("Packages installed successfully")
        `)

        if (mounted) {
          pyodideRef.current = pyodide
          setPyodideReady(true)
          setLoadingStatus('Ready')
        }
      } catch (err) {
        console.error('Pyodide init error:', err)
        if (mounted) {
          setLoadingStatus('Failed to load Python runtime. Please refresh.')
        }
      }
    }

    initPyodide()
    return () => { mounted = false }
  }, [])

  const runCode = useCallback(async () => {
    if (!pyodideRef.current || !pyodideReady) return
    setIsLoading(true)

    const pyodide = pyodideRef.current

    try {
      // Setup matplotlib to use Agg backend and capture plots as base64
      await pyodide.runPythonAsync(`
import sys
import io
import base64
import json

# Capture stdout/stderr
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
sys.stdout = _stdout_capture
sys.stderr = _stderr_capture

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

_plots = []

def _patched_show(*args, **kwargs):
    buf = io.BytesIO()
    plt.savefig(buf, format='png', dpi=100, bbox_inches='tight', facecolor='#0f172a')
    buf.seek(0)
    img_b64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    _plots.append('data:image/png;base64,' + img_b64)
    plt.close()

plt.show = _patched_show
      `)

      // Run user code
      await pyodide.runPythonAsync(code)

      // Get stdout/stderr
      const stdout = await pyodide.runPythonAsync(`_stdout_capture.getvalue()`) as string
      const stderr = await pyodide.runPythonAsync(`_stderr_capture.getvalue()`) as string

      // Get plots
      const plotsJson = await pyodide.runPythonAsync(`json.dumps(_plots)`) as string
      const plots = JSON.parse(plotsJson) as string[]

      // Run grader checks
      let graderResults: GraderResult[] = []
      let allPassed = false

      if (challenge.grader_checks.length > 0) {
        await pyodide.runPythonAsync(GRADER_CODE_TEMPLATE)
        const checksJson = JSON.stringify(challenge.grader_checks)
        const resultsJson = await pyodide.runPythonAsync(
          `_run_grader_checks(${JSON.stringify(checksJson)})`
        ) as string
        const rawResults = JSON.parse(resultsJson) as { passed: boolean; actual: string | null; error: string | null }[]
        graderResults = challenge.grader_checks.map((check, i) => ({
          check,
          passed: rawResults[i].passed,
          actual: rawResults[i].actual ?? undefined,
          error: rawResults[i].error ?? undefined,
        }))
        allPassed = graderResults.every(r => r.passed)
      }

      setOutput({ stdout, stderr, plots, graderResults, allPassed })
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err)
      // Try to get captured stderr too
      let stderr = ''
      try {
        stderr = await pyodide.runPythonAsync(`_stderr_capture.getvalue()`) as string
      } catch {
        // ignore
      }
      setOutput({
        stdout: '',
        stderr: (stderr ? stderr + '\n' : '') + errMsg,
        plots: [],
        graderResults: [],
        allPassed: false,
      })
    } finally {
      // Restore stdout/stderr
      try {
        await pyodide.runPythonAsync(`sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__`)
      } catch {
        // ignore
      }
      setIsLoading(false)
    }
  }, [code, challenge.grader_checks, pyodideReady])

  return (
    <div className="flex flex-col gap-4">
      {/* Challenge Prompt */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowPrompt(p => !p)}
          className="w-full flex items-center justify-between px-5 py-3 text-white/80 hover:bg-white/5 transition-colors"
        >
          <span className="font-semibold text-sm">{challenge.title}</span>
          {showPrompt ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {showPrompt && (
          <div className="px-6 pb-5 border-t border-white/10">
            <div className="prose prose-invert max-w-none pt-4 text-sm">
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  p: ({ children }) => <p className="text-white/70 mb-3 leading-relaxed">{children}</p>,
                  h2: ({ children }) => <h2 className="text-white text-lg font-semibold mb-3">{children}</h2>,
                  li: ({ children }) => <li className="text-white/70">{children}</li>,
                  ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-3">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-3">{children}</ol>,
                  code: ({ children }) => <code className="bg-white/10 text-cyan-300 px-1 py-0.5 rounded text-xs font-mono">{children}</code>,
                  strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                }}
              >
                {challenge.prompt}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {/* Editor + Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm font-medium">Editor</span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCode(challenge.starter_code)}
                className="text-white/50 hover:text-white text-xs h-7"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Reset
              </Button>
              <Button
                size="sm"
                onClick={runCode}
                disabled={!pyodideReady || isLoading}
                className="bg-green-600 hover:bg-green-700 text-white text-xs h-7 px-3"
              >
                {isLoading ? (
                  <><Loader2 className="w-3 h-3 mr-1 animate-spin" />Running...</>
                ) : (
                  <><Play className="w-3 h-3 mr-1" />Run</>
                )}
              </Button>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border border-white/10 h-[400px]">
            <MonacoEditor
              height="400px"
              language="python"
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val ?? '')}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 4,
                wordWrap: 'on',
                padding: { top: 12 },
              }}
            />
          </div>
          {/* Runtime status */}
          <div className={`text-xs flex items-center gap-1.5 ${pyodideReady ? 'text-green-400' : 'text-yellow-400'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${pyodideReady ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'}`} />
            {pyodideReady ? 'Python runtime ready' : loadingStatus}
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col gap-2">
          <span className="text-white/60 text-sm font-medium">Output</span>
          <div className="bg-black/40 border border-white/10 rounded-xl p-4 h-[400px] overflow-y-auto font-mono text-sm">
            {!output && !isLoading && (
              <p className="text-white/30 text-xs italic">Run your code to see output here...</p>
            )}
            {isLoading && (
              <div className="flex items-center gap-2 text-white/50 text-xs">
                <Loader2 className="w-3 h-3 animate-spin" />
                Executing Python code...
              </div>
            )}
            {output && (
              <div className="space-y-3">
                {output.stdout && (
                  <div>
                    <div className="text-white/30 text-xs mb-1">stdout</div>
                    <pre className="text-green-300 text-xs whitespace-pre-wrap">{output.stdout}</pre>
                  </div>
                )}
                {output.stderr && (
                  <div>
                    <div className="text-white/30 text-xs mb-1">stderr / error</div>
                    <pre className="text-red-400 text-xs whitespace-pre-wrap">{output.stderr}</pre>
                  </div>
                )}
                {output.plots.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-white/30 text-xs">plots ({output.plots.length})</div>
                    {output.plots.map((plot, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={i} src={plot} alt={`Plot ${i + 1}`} className="max-w-full rounded-lg border border-white/10" />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grader Results */}
      {output?.graderResults && output.graderResults.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-sm">Grader Results</h3>
            <Badge
              variant="outline"
              className={output.allPassed
                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                : 'bg-red-500/20 text-red-400 border-red-500/30'
              }
            >
              {output.allPassed ? '✓ All checks passed' : `${output.graderResults.filter(r => r.passed).length}/${output.graderResults.length} passed`}
            </Badge>
          </div>
          <div className="space-y-2">
            {output.graderResults.map((result, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-lg border text-sm ${
                  result.passed
                    ? 'bg-green-500/10 border-green-500/20'
                    : 'bg-red-500/10 border-red-500/20'
                }`}
              >
                {result.passed
                  ? <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  : <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                }
                <div className="flex-1 min-w-0">
                  <div className={result.passed ? 'text-green-300' : 'text-red-300'}>
                    {result.check.message}
                  </div>
                  {result.error ? (
                    <div className="text-red-400/70 text-xs mt-0.5 font-mono">{result.error}</div>
                  ) : result.actual && (
                    <div className="text-white/40 text-xs mt-0.5 font-mono">
                      actual: {result.actual}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
