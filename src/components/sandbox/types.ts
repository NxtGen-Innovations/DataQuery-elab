import { GraderCheck } from '@/lib/curriculum-data'

export type LeftTabValue = 'problem' | 'notes' | 'quiz'
export type OutputTabValue = 'testcases' | 'console' | 'plots'

export interface GraderResult {
  check: GraderCheck
  passed: boolean
  actual?: string
  error?: string
}

export interface DataFrameTable {
  title?: string
  columns: string[]
  rows: string[][]
}

export interface ExecutionResult {
  stdout: string
  stderr: string
  plots: string[]
  tables: DataFrameTable[]
  graderResults?: GraderResult[]
  allPassed?: boolean
}
