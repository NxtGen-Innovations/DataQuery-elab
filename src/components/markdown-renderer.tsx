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
    <h1 className="text-3xl font-bold text-white mb-6 mt-8 first:mt-0 pb-3 border-b border-white/10">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold text-white mb-4 mt-8">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-white/90 mb-3 mt-6">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-white/75 leading-relaxed mb-4">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="text-purple-300 italic">{children}</em>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.startsWith('language-')
    if (isBlock) {
      return (
        <code className="block bg-black/40 border border-white/10 rounded-lg p-4 text-sm font-mono text-green-300 overflow-x-auto whitespace-pre">
          {children}
        </code>
      )
    }
    return (
      <code className="bg-white/10 text-cyan-300 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
    )
  },
  pre: ({ children }) => (
    <pre className="mb-4 overflow-x-auto">{children}</pre>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside text-white/75 mb-4 space-y-1 pl-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside text-white/75 mb-4 space-y-1 pl-2">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-white/20">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="text-left text-white font-semibold px-4 py-2">{children}</th>
  ),
  td: ({ children }) => (
    <td className="text-white/70 px-4 py-2 border-b border-white/5">{children}</td>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-purple-500 pl-4 py-1 my-4 text-white/60 italic">{children}</blockquote>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-purple-400 hover:text-purple-300 underline transition-colors">{children}</a>
  ),
}

export function MarkdownRenderer({ content }: Props) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-8">
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
