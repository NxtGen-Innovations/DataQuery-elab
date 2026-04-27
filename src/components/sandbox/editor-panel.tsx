'use client'

import dynamic from 'next/dynamic'
import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#0d1117] font-mono text-[13px] text-[#8b949e]">
      Loading editor...
    </div>
  ),
})

interface Props {
  code: string
  onChange: (value: string) => void
  onReset: () => void
}

export function EditorPanel({ code, onChange, onReset }: Props) {
  return (
    <section className="flex h-full min-h-0 flex-col bg-[#0d1117]">
      <div className="sticky top-0 z-10 flex h-10 shrink-0 items-center justify-between border-b border-[#30363d] bg-[#161b22] px-4">
        <span className="text-[13px] font-medium text-[#c9d1d9]">Python 3.11</span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onReset}
          className="h-7 w-7 rounded-md border border-transparent text-[#8b949e] hover:border-[#30363d] hover:bg-[#0d1117] hover:text-[#e6edf3]"
          aria-label="Reset code"
        >
          <RotateCcw className="size-3.5" />
        </Button>
      </div>

      <div className="min-h-0 flex-1">
        <MonacoEditor
          height="100%"
          language="python"
          theme="vs-dark"
          value={code}
          onChange={(value) => onChange(value ?? '')}
          options={{
            automaticLayout: true,
            fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace',
            fontLigatures: false,
            fontSize: 13,
            lineNumbersMinChars: 3,
            minimap: { enabled: false },
            padding: { top: 12, bottom: 12 },
            renderLineHighlight: 'line',
            scrollBeyondLastLine: false,
            smoothScrolling: true,
          }}
        />
      </div>
    </section>
  )
}
