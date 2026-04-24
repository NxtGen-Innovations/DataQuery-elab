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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">Management</p>
          <h1 className="text-2xl font-black text-white mb-1">Admin Dashboard</h1>
          <p className="text-sm text-white/30">Manage your curriculum, quizzes, and coding challenges.</p>
        </div>
        <Link href="/admin/add">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 font-bold shadow-lg shadow-purple-500/20">
            <Plus className="w-4 h-4" /> Add Content
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Total Lessons', value: lessons.length, icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Domains', value: CURRICULUM.length, icon: LayoutDashboard, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Quizzes', value: '2', icon: Brain, color: 'text-pink-400', bg: 'bg-pink-500/10' },
          { label: 'Challenges', value: '3', icon: Trophy, color: 'text-orange-400', bg: 'bg-orange-500/10' },
        ].map((stat) => (
          <Card key={stat.label} className="bg-[#111111] border-white/5">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', stat.bg)}>
                <stat.icon className={cn('w-5 h-5', stat.color)} />
              </div>
              <div>
                <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">{stat.label}</p>
                <p className="text-xl font-bold text-white">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Inventory Table */}
      <Card className="bg-[#111111] border-white/5 overflow-hidden">
        <CardHeader className="border-b border-white/5 py-4 px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-base font-bold text-white">Content Inventory</CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg py-1.5 pl-8 pr-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-purple-500/40 w-44"
                />
              </div>
              <Button variant="outline" size="sm" className="bg-white/5 border-white/5 text-[11px] text-white/40 h-8 gap-1.5">
                <Filter className="w-3 h-3" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[9px] text-white/25 uppercase font-black tracking-widest">
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Domain / Topic</th>
                <th className="px-6 py-3">Difficulty</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredLessons.map((lesson) => (
                <tr key={lesson.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">{lesson.title}</p>
                    <p className="text-[10px] text-white/20 font-mono mt-0.5">{lesson.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-white/50">{lesson.domain}</p>
                    <p className="text-[10px] text-white/25 mt-0.5">{lesson.topic}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      'text-[9px] font-black uppercase px-2 py-0.5 rounded',
                      lesson.difficulty === 'beginner' ? 'bg-green-500/10 text-green-400' :
                      lesson.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-red-500/10 text-red-400'
                    )}>
                      {lesson.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                      <span className="text-[10px] text-white/40 uppercase font-bold">Published</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="text-white/30 hover:text-white h-7 px-3 text-[11px]">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-red-400/30 hover:text-red-400 h-7 px-3 text-[11px]">Del</Button>
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
