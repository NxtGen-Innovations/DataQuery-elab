'use client'

import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import { Components } from 'react-markdown'

interface Props {
  content: string
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="mb-5 border-b border-[#30363d] pb-3 text-2xl font-semibold text-[#e6edf3] first:mt-0">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-3 mt-8 text-xl font-semibold text-[#e6edf3]">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-6 text-base font-semibold text-[#e6edf3]">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-[14px] leading-7 text-[#c9d1d9]">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[#e6edf3]">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-[#8b949e]">{children}</em>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.startsWith('language-')
    if (isBlock) {
      return (
        <code className="block overflow-x-auto border border-[#30363d] bg-[#161b22] p-4 text-sm font-mono text-[#e6edf3] whitespace-pre">
          {children}
        </code>
      )
    }
    return (
      <code className="border border-[#30363d] bg-[#161b22] px-1.5 py-0.5 text-sm font-mono text-[#e6edf3]">{children}</code>
    )
  },
  pre: ({ children }) => (
    <pre className="mb-4 overflow-x-auto">{children}</pre>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-disc space-y-1 pl-5 text-[#c9d1d9]">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal space-y-1 pl-5 text-[#c9d1d9]">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  table: ({ children }) => (
    <div className="mb-4 overflow-x-auto border border-[#30363d]">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-[#30363d] bg-[#161b22]">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 text-left font-semibold text-[#e6edf3]">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border-b border-[#21262d] px-4 py-2 text-[#c9d1d9]">{children}</td>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-2 border-[#30363d] pl-4 py-1 text-[#8b949e] italic">{children}</blockquote>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-[#58a6ff] underline transition-colors hover:text-[#79c0ff]">{children}</a>
  ),
}

export function MarkdownRenderer({ content }: Props) {
  return (
    <div className="border border-[#30363d] bg-[#0d1117] p-6 md:p-8">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
