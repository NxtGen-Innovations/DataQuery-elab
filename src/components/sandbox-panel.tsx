'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Challenge, GraderCheck } from '@/lib/curriculum-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, RotateCcw, CheckCircle2, XCircle, Loader2, Terminal, FileText, AlertTriangle } from 'lucide-react'
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#1e1e1e] flex items-center justify-center text-white/30 text-xs">
      Loading editor...
    </div>
  ),
})

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
  const [loadingStatus, setLoadingStatus] = useState('Initializing Python...')
  const [loadError, setLoadError] = useState(false)
  const [activeOutputTab, setActiveOutputTab] = useState<'output' | 'grader'>('output')
  const pyodideRef = useRef<Window['pyodide'] | null>(null)

  // Load Pyodide
  useEffect(() => {
    let mounted = true
    let retryCount = 0
    const maxRetries = 3

    async function initPyodide() {
      try {
        // Wait for script to be available (it's async in layout.tsx)
        let waitTime = 0
        while (!window.loadPyodide && waitTime < 10000) {
          await new Promise(resolve => setTimeout(resolve, 200))
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
        await pyodide.runPythonAsync(`
import micropip
await micropip.install(['numpy', 'matplotlib', 'scikit-learn'])
        `)

        if (mounted) {
          pyodideRef.current = pyodide
          setPyodideReady(true)
          setLoadingStatus('Ready')
        }
      } catch (err) {
        console.error('Pyodide init error:', err)
        if (mounted) {
          if (retryCount < maxRetries) {
            retryCount++
            setLoadingStatus(`Retrying (${retryCount}/${maxRetries})...`)
            setTimeout(initPyodide, 2000)
          } else {
            setLoadError(true)
            setLoadingStatus('Failed to load Python')
          }
        }
      }
    }

    initPyodide()
    return () => { mounted = false }
  }, [])

  const runCode = useCallback(async () => {
    if (!pyodideRef.current || !pyodideReady) return
    setIsLoading(true)
    setActiveOutputTab('output')

    const pyodide = pyodideRef.current

    try {
      // Setup environment
      await pyodide.runPythonAsync(`
import sys
import io
import base64
import json

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

      // Get output
      const stdout = await pyodide.runPythonAsync(`_stdout_capture.getvalue()`) as string
      const stderr = await pyodide.runPythonAsync(`_stderr_capture.getvalue()`) as string
      const plotsJson = await pyodide.runPythonAsync(`json.dumps(_plots)`) as string
      const plots = JSON.parse(plotsJson) as string[]

      // Grader checks
      let graderResults: GraderResult[] = []
      let allPassed = false

      if (challenge.grader_checks.length > 0) {
        await pyodide.runPythonAsync(GRADER_CODE_TEMPLATE)
        const checksJson = JSON.stringify(challenge.grader_checks)
        const resultsJson = await pyodide.runPythonAsync(`_run_grader_checks(${JSON.stringify(checksJson)})`) as string
        const rawResults = JSON.parse(resultsJson) as any[]
        
        graderResults = challenge.grader_checks.map((check, i) => ({
          check,
          passed: rawResults[i]?.passed ?? false,
          actual: rawResults[i]?.actual ?? undefined,
          error: rawResults[i]?.error ?? undefined,
        }))
        allPassed = graderResults.every(r => r.passed)
        if (graderResults.length > 0) setActiveOutputTab('grader')
      }

      setOutput({ stdout, stderr, plots, graderResults, allPassed })
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err)
      setOutput({
        stdout: '',
        stderr: errMsg,
        plots: [],
        graderResults: [],
        allPassed: false,
      })
    } finally {
      setIsLoading(false)
    }
  }, [code, challenge.grader_checks, pyodideReady])

  return (
    <div className="sandbox-layout flex flex-col lg:flex-row gap-0 border border-white/[0.06] rounded-2xl overflow-hidden bg-[#0a0a0a]" style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}>

      {/* ─── LEFT: Description ─── */}
      <div className="lg:w-[40%] w-full border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col overflow-hidden">
        <div className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-2 bg-white/[0.02] shrink-0">
          <FileText className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold text-white/70">{challenge.title}</span>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="prose prose-invert max-w-none text-sm">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                p: ({ children }) => <p className="text-white/70 mb-3 leading-relaxed text-[13px]">{children}</p>,
                h2: ({ children }) => <h2 className="text-white text-base font-bold mb-3 mt-4 first:mt-0">{children}</h2>,
                h3: ({ children }) => <h3 className="text-white/90 text-sm font-bold mb-2 mt-3">{children}</h3>,
                li: ({ children }) => <li className="text-white/70 text-[13px] leading-relaxed">{children}</li>,
                ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-3">{children}</ul>,
                code: ({ children }) => <code className="bg-white/10 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>,
              }}
            >
              {challenge.prompt}
            </ReactMarkdown>
          </div>
          
          {challenge.grader_checks.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/[0.06]">
              <p className="text-[10px] font-black text-white/25 uppercase tracking-widest mb-2">Grader Checks</p>
              <div className="space-y-1.5">
                {challenge.grader_checks.map((check, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] text-white/30">
                    <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                    <span>{check.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── RIGHT: Editor + Output ─── */}
      <div className="lg:w-[60%] w-full flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="px-4 py-2 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.02] shrink-0">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${pyodideReady ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'} inline-block`} />
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                {pyodideReady ? 'Python 3.11' : loadingStatus}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCode(challenge.starter_code)}
                className="text-white/40 hover:text-white text-[10px] h-7 px-2.5 gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </Button>
              <Button
                size="sm"
                onClick={runCode}
                disabled={!pyodideReady || isLoading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-white/10 disabled:text-white/30 text-white text-[10px] h-7 px-3 gap-1.5 font-bold shadow-lg shadow-green-500/10"
              >
                {isLoading ? (
                  <><Loader2 className="w-3 h-3 animate-spin" />Running...</>
                ) : (
                  <><Play className="w-3 h-3" />Run Code</>
                )}
              </Button>
            </div>
          </div>

          <div className="flex-1 min-h-0">
            <MonacoEditor
              height="100%"
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
                padding: { top: 12, bottom: 12 },
              }}
            />
          </div>
        </div>

        <div className="h-[35%] min-h-[180px] border-t border-white/[0.06] flex flex-col bg-[#080808]">
          <div className="px-4 py-1.5 border-b border-white/[0.06] flex items-center gap-1 bg-white/[0.02] shrink-0">
            <button
              onClick={() => setActiveOutputTab('output')}
              className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                activeOutputTab === 'output' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'
              }`}
            >
              <Terminal className="w-3 h-3 inline mr-1" />
              Task Output
            </button>
            {output?.graderResults && output.graderResults.length > 0 && (
              <button
                onClick={() => setActiveOutputTab('grader')}
                className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all flex items-center gap-1 ${
                  activeOutputTab === 'grader' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'
                }`}
              >
                {output.allPassed ? <CheckCircle2 className="w-3 h-3 text-green-400" /> : <XCircle className="w-3 h-3 text-red-400" />}
                Tests
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs">
            {activeOutputTab === 'output' && (
              <div className="space-y-2">
                {!output && !isLoading && <p className="text-white/20 italic">Click &quot;Run Code&quot; to execute...</p>}
                {isLoading && <p className="text-white/40 animate-pulse">Running code in browser...</p>}
                {output && (
                  <>
                    {output.stdout && <pre className="text-green-300/90 whitespace-pre-wrap">{output.stdout}</pre>}
                    {output.stderr && <pre className="text-red-400 whitespace-pre-wrap">{output.stderr}</pre>}
                    {output.plots.map((plot, i) => (
                      <img key={i} src={plot} alt="Plot" className="max-w-full rounded-lg border border-white/10 mt-2" />
                    ))}
                  </>
                )}
              </div>
            )}

            {activeOutputTab === 'grader' && output?.graderResults && (
              <div className="space-y-2">
                {output.graderResults.map((result, i) => (
                  <div key={i} className={`p-2.5 rounded-lg border text-[11px] flex gap-2 ${result.passed ? 'bg-green-500/5 border-green-500/15' : 'bg-red-500/5 border-red-500/15'}`}>
                    {result.passed ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5" /> : <XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5" />}
                    <div>
                      <div className={result.passed ? 'text-green-300' : 'text-red-300'}>{result.check.message}</div>
                      {result.actual && <div className="text-white/30 text-[10px] mt-0.5">actual: {result.actual}</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
