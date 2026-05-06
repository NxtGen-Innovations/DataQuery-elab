'use client'

import Image from 'next/image'
import { BarChart3, CheckCircle2, TerminalSquare, Table, AlertCircle } from 'lucide-react'
import { Challenge } from '@/lib/curriculum-data'
import { DataFrameRenderer } from './dataframe-renderer'
import { IdeTabs, TabsContent } from './ide-tabs'
import { ExecutionResult, OutputTabValue } from './types'

interface Props {
  activeTab: OutputTabValue
  onTabChange: (value: OutputTabValue) => void
  challenge: Challenge
  output: ExecutionResult | null
  isRunning: boolean
}

export function OutputPanelTabs({
  activeTab,
  onTabChange,
  challenge,
  output,
  isRunning,
}: Props) {
  return (
    <IdeTabs
      value={activeTab}
      onValueChange={onTabChange}
      items={[
        {
          value: 'testcases',
          label: 'Testcases',
          icon: <CheckCircle2 className="size-3.5" />,
        },
        {
          value: 'console',
          label: 'Console',
          icon: <TerminalSquare className="size-3.5" />,
        },
        {
          value: 'dataframes',
          label: 'DataFrames',
          icon: <Table className="size-3.5" />,
          badge: output?.tables.length ? (
            <span className="ml-1 border border-[#30363d] px-1.5 py-0.5 text-[11px] text-[#8b949e]">
              {output.tables.length}
            </span>
          ) : undefined,
        },
        {
          value: 'plots',
          label: 'Plots',
          icon: <BarChart3 className="size-3.5" />,
          badge: output?.plots.length ? (
            <span className="ml-1 border border-[#30363d] px-1.5 py-0.5 text-[11px] text-[#8b949e]">
              {output.plots.length}
            </span>
          ) : undefined,
        },
        {
          value: 'errors',
          label: 'Errors',
          icon: <AlertCircle className="size-3.5" />,
          badge: output?.stderr ? (
            <span className="ml-1 border border-[#f85149]/30 bg-[#f85149]/10 px-1.5 py-0.5 text-[11px] text-[#f85149]">
              !
            </span>
          ) : undefined,
        },
      ]}
      contentClassName="bg-[#0d1117]"
    >
      <TabsContent value="console" className="h-full overflow-y-auto px-4 py-3">
        {!output && !isRunning ? (
          <p className="font-mono text-[13px] text-[#8b949e]">Run code to see output.</p>
        ) : null}
        {isRunning ? (
          <p className="font-mono text-[13px] text-[#8b949e]">Executing...</p>
        ) : null}
        {output ? (
          <div className="space-y-4">
            {output.stdout ? (
              <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[13px] leading-6 text-[#c9d1d9]">
                {output.stdout}
              </pre>
            ) : (
              <p className="font-mono text-[13px] text-[#8b949e]">No standard output.</p>
            )}
          </div>
        ) : null}
      </TabsContent>

      <TabsContent value="dataframes" className="h-full overflow-y-auto px-4 py-3">
        {!output?.tables.length ? (
          <p className="text-[13px] text-[#8b949e]">No DataFrames detected. Print a DataFrame or Series to see it here.</p>
        ) : (
          <div className="space-y-6">
            {output.tables.map((table, index) => (
              <div key={index} className="space-y-2">
                {table.title && <h4 className="text-[12px] font-medium text-[#8b949e] uppercase tracking-wider">{table.title}</h4>}
                <DataFrameRenderer table={table} />
              </div>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="errors" className="h-full overflow-y-auto px-4 py-3">
        {!output?.stderr ? (
          <p className="text-[13px] text-[#8b949e]">No errors or warnings.</p>
        ) : (
          <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[13px] leading-6 text-[#ff7b72]">
            {output.stderr}
          </pre>
        )}
      </TabsContent>

      <TabsContent value="testcases" className="h-full overflow-y-auto px-4 py-3">
        {!output?.graderResults ? (
          <div className="space-y-2">
            {challenge.grader_checks.length ? challenge.grader_checks.map((check, index) => (
              <div key={index} className="border border-[#30363d] bg-[#161b22] px-3 py-2.5 text-[13px] text-[#c9d1d9]">
                {check.message}
              </div>
            )) : (
              <p className="text-[13px] text-[#8b949e]">No formal testcases for this exercise yet.</p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {output.graderResults.map((result, index) => (
              <div
                key={index}
                className={`border px-4 py-3 text-[13px] ${
                  result.passed ? 'border-[#2ea043]/40 bg-[#2ea043]/5' : 'border-[#f85149]/40 bg-[#f85149]/5'
                }`}
              >
                <div className={`font-medium ${result.passed ? 'text-[#e6edf3]' : 'text-[#f85149]'}`}>
                  {result.check.message}
                </div>
                {result.actual !== undefined ? (
                  <pre className="mt-2 overflow-x-auto whitespace-pre-wrap border border-[#30363d] bg-[#0d1117] px-3 py-2 font-mono text-[12px] text-[#8b949e]">
                    Actual: {result.actual}
                  </pre>
                ) : null}
                {result.error ? (
                  <pre className="mt-2 overflow-x-auto whitespace-pre-wrap font-mono text-[12px] text-[#ff7b72]">
                    {result.error}
                  </pre>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="plots" className="h-full overflow-y-auto px-4 py-3">
        {!output?.plots.length ? (
          <p className="text-[13px] text-[#8b949e]">No plots generated. Call `plt.show()` to capture a figure.</p>
        ) : (
          <div className="space-y-4">
            {output.plots.map((plot, index) => (
              <div key={index} className="border border-[#30363d] bg-[#f6f8fa] p-4">
                <Image
                  src={plot}
                  alt={`Generated plot ${index + 1}`}
                  width={1200}
                  height={800}
                  unoptimized
                  className="mx-auto h-auto max-w-full"
                />
              </div>
            ))}
          </div>
        )}
      </TabsContent>
    </IdeTabs>
  )
}
