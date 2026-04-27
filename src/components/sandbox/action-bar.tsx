'use client'

import { CheckCircle2, Loader2, Play, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  disabled: boolean
  isRunning: boolean
  allPassed?: boolean
  hasResults: boolean
  onRun: () => void
  onSubmit: () => void
}

export function ActionBar({
  disabled,
  isRunning,
  allPassed,
  hasResults,
  onRun,
  onSubmit,
}: Props) {
  return (
    <div className="pointer-events-none absolute bottom-4 right-4 z-20 flex items-center gap-3">
      {hasResults ? (
        <div className="pointer-events-auto flex h-9 items-center border border-[#30363d] bg-[#161b22] px-3 text-[13px]">
          {allPassed ? (
            <span className="flex items-center gap-2 text-[#3fb950]">
              <CheckCircle2 className="size-4" />
              Accepted
            </span>
          ) : (
            <span className="flex items-center gap-2 text-[#f85149]">
              <XCircle className="size-4" />
              Wrong Answer
            </span>
          )}
        </div>
      ) : null}

      <div className="pointer-events-auto flex items-center gap-2 border border-[#30363d] bg-[#161b22] p-2">
        <Button
          type="button"
          size="sm"
          onClick={onRun}
          disabled={disabled}
          className="h-8 rounded-md border border-[#30363d] bg-[#0d1117] px-3 text-[13px] text-[#c9d1d9] hover:bg-[#21262d] hover:text-[#e6edf3]"
        >
          {isRunning ? <Loader2 className="size-3.5 animate-spin" /> : <Play className="size-3.5 text-[#3fb950]" />}
          Run Code
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={onSubmit}
          disabled={disabled}
          className="h-8 rounded-md border border-[#2ea043]/60 bg-[#238636] px-3 text-[13px] font-semibold text-white hover:bg-[#2ea043]"
        >
          Submit
        </Button>
      </div>
    </div>
  )
}
