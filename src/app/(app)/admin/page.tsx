'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, BookOpen, Brain, Trophy, LayoutDashboard, Search, Filter, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CURRICULUM, getAllLessons } from '@/lib/curriculum-data'
import { useAuth } from '@/lib/auth-context'

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}

export default function AdminDashboard() {
  const { isAdmin, isLoggedIn } = useAuth()
  const lessons = getAllLessons()
  const [search, setSearch] = useState('')

  // Access guard
  if (!isLoggedIn || !isAdmin) {
    return (
      <div className="p-6 lg:p-8 max-w-5xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-black text-white">Access Denied</h2>
          <p className="text-sm text-white/40 max-w-sm">
            You need admin privileges to access this page. Please sign in with an admin account.
          </p>
          <Link href="/dashboard">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold mt-2">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const filteredLessons = lessons.filter(l =>
    l.title.toLowerCase().includes(search.toLowerCase()) ||
    l.domain.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-[11px] font-semibold text-[#8b949e] uppercase tracking-widest mb-1">Management</p>
          <h1 className="text-xl font-semibold text-[#e6edf3] mb-1">Admin Dashboard</h1>
          <p className="text-[13px] text-[#8b949e]">Manage your curriculum, quizzes, and coding challenges.</p>
        </div>
        <Link href="/admin/add">
          <Button className="h-8 bg-[#238636] hover:bg-[#2ea043] text-white flex items-center gap-1.5 font-medium text-[13px] shadow-sm rounded-md border border-[rgba(240,246,252,0.1)] transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Content
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Total Lessons', value: lessons.length, icon: BookOpen },
          { label: 'Domains', value: CURRICULUM.length, icon: LayoutDashboard },
          { label: 'Quizzes', value: '2', icon: Brain },
          { label: 'Challenges', value: '3', icon: Trophy },
        ].map((stat) => (
          <Card key={stat.label} className="bg-[#0d1117] border-[#30363d] shadow-sm rounded-md">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-[#161b22] border border-[#30363d] flex items-center justify-center shrink-0">
                <stat.icon className="w-4 h-4 text-[#58a6ff]" />
              </div>
              <div>
                <p className="text-[11px] text-[#8b949e] uppercase font-semibold tracking-widest">{stat.label}</p>
                <p className="text-lg font-semibold text-[#e6edf3]">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Inventory Table */}
      <Card className="bg-[#0d1117] border-[#30363d] overflow-hidden rounded-md shadow-sm">
        <CardHeader className="border-b border-[#30363d] bg-[#161b22] py-3 px-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-[14px] font-semibold text-[#e6edf3]">Content Inventory</CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8b949e]" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-[#0d1117] border border-[#30363d] rounded-md py-1.5 pl-8 pr-3 text-[13px] text-[#e6edf3] placeholder:text-[#8b949e]/50 focus:outline-none focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff] w-48 transition-all"
                />
              </div>
              <Button variant="outline" className="bg-[#21262d] hover:bg-[#30363d] border-[#30363d] text-[#e6edf3] font-medium text-[12px] h-8 gap-1.5 rounded-md px-3 transition-colors">
                <Filter className="w-3.5 h-3.5 text-[#8b949e]" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#161b22]">
              <tr className="border-b border-[#30363d] text-[11px] text-[#8b949e] font-semibold">
                <th className="px-5 py-2.5">Title</th>
                <th className="px-5 py-2.5">Domain / Topic</th>
                <th className="px-5 py-2.5">Difficulty</th>
                <th className="px-5 py-2.5">Status</th>
                <th className="px-5 py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363d]">
              {filteredLessons.map((lesson) => (
                <tr key={lesson.id} className="hover:bg-[#161b22] transition-colors group">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-[#e6edf3] group-hover:text-[#58a6ff] transition-colors">{lesson.title}</p>
                    <p className="text-[11px] text-[#8b949e] font-mono mt-0.5">{lesson.id}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-[#e6edf3]">{lesson.domain}</p>
                    <p className="text-[11px] text-[#8b949e] mt-0.5">{lesson.topic}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={cn(
                      'text-[11px] font-semibold px-2 py-0.5 rounded-md border',
                      lesson.difficulty === 'beginner' ? 'bg-[#3fb950]/10 text-[#3fb950] border-[#3fb950]/20' :
                      lesson.difficulty === 'intermediate' ? 'bg-[#d29922]/10 text-[#d29922] border-[#d29922]/20' :
                      'bg-[#f85149]/10 text-[#f85149] border-[#f85149]/20'
                    )}>
                      {lesson.difficulty}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#3fb950] inline-block shadow-[0_0_8px_rgba(63,185,80,0.4)]" />
                      <span className="text-[11px] text-[#8b949e] font-semibold">Published</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" className="text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#30363d] h-7 px-2.5 text-[12px] rounded-md transition-colors">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-[#f85149] hover:text-white hover:bg-[#f85149] h-7 px-2.5 text-[12px] rounded-md transition-colors">Del</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
