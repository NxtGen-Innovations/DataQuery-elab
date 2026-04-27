'use client'

import { DataFrameTable } from './types'

interface Props {
  table: DataFrameTable
}

export function DataFrameRenderer({ table }: Props) {
  return (
    <section className="overflow-hidden border border-[#30363d] bg-[#0d1117]">
      {table.title ? (
        <div className="border-b border-[#30363d] bg-[#161b22] px-3 py-2 text-[12px] font-medium uppercase tracking-wide text-[#8b949e]">
          {table.title}
        </div>
      ) : null}
      <div className="overflow-auto">
        <table className="min-w-full border-collapse font-mono text-[12px] text-[#c9d1d9]">
          <thead className="bg-[#161b22] text-[#e6edf3]">
            <tr>
              {table.columns.map((column) => (
                <th key={column} className="border-r border-[#30363d] px-3 py-2 text-left font-medium last:border-r-0">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={`${rowIndex}-${row.join('|')}`} className="odd:bg-[#0f141b]">
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`} className="border-r border-t border-[#30363d] px-3 py-2 align-top last:border-r-0">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
