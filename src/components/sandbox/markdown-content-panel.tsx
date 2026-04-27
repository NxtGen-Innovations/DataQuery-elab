'use client'

import ReactMarkdown from 'react-markdown'
import { Components } from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

interface Props {
  title?: string
  content: string
}

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mb-4 border-b border-[#30363d] pb-2 text-lg font-semibold text-[#e6edf3]">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-3 mt-6 text-base font-semibold text-[#e6edf3]">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-4 text-[13px] font-semibold uppercase tracking-wide text-[#e6edf3]">{children}</h3>
  ),
  p: ({ children }) => <p className="mb-4 text-[13px] leading-6 text-[#c9d1d9]">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-[#e6edf3]">{children}</strong>,
  ul: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-5 text-[13px] text-[#c9d1d9]">{children}</ul>,
  ol: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-5 text-[13px] text-[#c9d1d9]">{children}</ol>,
  li: ({ children }) => <li className="leading-6">{children}</li>,
  pre: ({ children }) => <pre className="mb-4 overflow-x-auto bg-[#161b22] p-3">{children}</pre>,
  code: ({ children, className }) => {
    const isBlock = className?.startsWith('language-')
    if (isBlock) {
      return (
        <code className="block whitespace-pre font-mono text-[13px] text-[#e6edf3]">
          {children}
        </code>
      )
    }

    return (
      <code className="border border-[#30363d] bg-[#161b22] px-1 py-0.5 font-mono text-[12px] text-[#e6edf3]">
        {children}
      </code>
    )
  },
  table: ({ children }) => (
    <div className="mb-4 overflow-x-auto border border-[#30363d]">
      <table className="w-full border-collapse text-[13px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[#161b22]">{children}</thead>,
  th: ({ children }) => (
    <th className="border-r border-[#30363d] px-3 py-2 text-left font-medium text-[#e6edf3] last:border-r-0">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-r border-t border-[#30363d] px-3 py-2 text-[#c9d1d9] last:border-r-0">
      {children}
    </td>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-4 border-l-2 border-[#30363d] pl-4 text-[13px] text-[#8b949e]">
      {children}
    </blockquote>
  ),
}

export function MarkdownContentPanel({ title, content }: Props) {
  return (
    <div className="h-full overflow-y-auto bg-[#0d1117] px-5 py-4">
      <div className="max-w-none">
        {title ? <h1 className="mb-4 border-b border-[#30363d] pb-2 text-lg font-semibold text-[#e6edf3]">{title}</h1> : null}
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={markdownComponents}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
