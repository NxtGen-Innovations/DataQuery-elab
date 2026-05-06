'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BookOpen, Brain, ChevronLeft, LayoutDashboard, LogOut, Settings, Sparkles, FileText, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'
import { CURRICULUM } from '@/lib/curriculum-data'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', adminOnly: false },
  { icon: BookOpen, label: 'Curriculum', href: '/curriculum', adminOnly: false },
  { icon: Sparkles, label: 'Practice', href: '/curriculum/ds-mod2-02', adminOnly: false },
  { icon: Brain, label: 'Admin', href: '/admin', adminOnly: true },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAdmin, logout } = useAuth()

  const isCurriculumView = pathname.startsWith('/curriculum/') && pathname !== '/curriculum'
  const visibleNavItems = navItems.filter((item) => !item.adminOnly || isAdmin)
  const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'U'

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-[88px] flex-col border-r border-[#30363d] bg-[#0d1117] xl:w-[248px]">
      <div className="border-b border-[#30363d] px-4 py-4 xl:px-5">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center border border-[#30363d] bg-[#161b22]">
            <Brain className="size-5 text-[#58a6ff]" />
          </div>
          <div className="hidden xl:block">
            <div className="text-sm font-semibold text-[#e6edf3]">DataQuest eLab</div>
            <div className="text-[11px] text-[#8b949e]">Student workspace</div>
          </div>
        </Link>
      </div>

      <div className="px-3 py-4 xl:px-4">
        <button
          onClick={() => router.push('/curriculum')}
          className="flex w-full items-center justify-center gap-3 border border-[#30363d] bg-[#161b22] px-3 py-2 text-[13px] text-[#c9d1d9] hover:bg-[#21262d] xl:justify-start"
          title="Back to curriculum"
        >
          <ChevronLeft className="size-4" />
          <span className="hidden xl:inline">Curriculum Home</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 xl:px-4 custom-scrollbar">
        {!isCurriculumView ? (
          <nav className="space-y-1">
            {visibleNavItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(`${item.href}/`))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-center gap-3 border px-3 py-3 text-[13px] font-medium xl:justify-start',
                    isActive
                      ? 'border-[#58a6ff]/40 bg-[#161b22] text-[#e6edf3]'
                      : 'border-transparent text-[#8b949e] hover:border-[#30363d] hover:bg-[#161b22] hover:text-[#c9d1d9]'
                  )}
                  title={item.label}
                >
                  <item.icon className={cn('size-4', isActive ? 'text-[#58a6ff]' : 'text-current')} />
                  <span className="hidden xl:inline">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        ) : (
          <div className="space-y-6">
            {CURRICULUM[0].topics.map((unit, idx) => (
              <div key={unit.topic} className="space-y-2">
                <div className="hidden px-2 text-[10px] font-bold uppercase tracking-widest text-[#8b949e] xl:block">
                  Unit {idx + 1}
                </div>
                <div className="space-y-1">
                  {unit.lessons.map((lesson) => {
                    const isLessonActive = pathname === `/curriculum/${lesson.id}`
                    return (
                      <Link
                        key={lesson.id}
                        href={`/curriculum/${lesson.id}`}
                        className={cn(
                          'flex items-center justify-center gap-3 border px-3 py-2.5 text-[12px] xl:justify-start',
                          isLessonActive
                            ? 'border-[#58a6ff]/30 bg-[#161b22] text-[#58a6ff] font-semibold'
                            : 'border-transparent text-[#8b949e] hover:bg-[#161b22] hover:text-[#c9d1d9]'
                        )}
                      >
                        <FileText className={cn('size-3.5', isLessonActive ? 'text-[#58a6ff]' : 'text-current')} />
                        <span className="hidden truncate xl:inline" title={lesson.title}>{lesson.title}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto border-t border-[#30363d] px-3 py-4 xl:px-4">
        <div className="mb-4 hidden border border-[#30363d] bg-[#161b22] p-3 xl:block">
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8b949e]">Current Focus</div>
          <div className="mt-2 text-sm font-medium text-[#e6edf3]">Data Science Path</div>
          <div className="mt-1 text-[12px] leading-5 text-[#8b949e]">Move from notes to practice and pass your test cases.</div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-3 xl:justify-start">
            <div className="flex size-9 shrink-0 items-center justify-center border border-[#30363d] bg-[#161b22] text-sm font-semibold text-[#e6edf3]">
              {userInitial}
            </div>
            <div className="hidden min-w-0 flex-1 xl:block">
              <div className="truncate text-sm font-medium text-[#e6edf3]">{user?.name || 'Student'}</div>
              <div className="truncate text-[11px] text-[#8b949e]">{user?.email || 'Guest mode'}</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 xl:justify-start">
            <button
              onClick={() => router.push('/admin')}
              title="Settings"
              className="flex h-9 flex-1 items-center justify-center gap-2 border border-[#30363d] bg-[#161b22] px-3 text-[#8b949e] hover:bg-[#21262d] hover:text-[#c9d1d9]"
            >
              <Settings className="size-4" />
              <span className="hidden text-[12px] xl:inline">Settings</span>
            </button>
            <button
              onClick={() => {
                logout()
                router.push('/login')
              }}
              title="Sign out"
              className="flex h-9 flex-1 items-center justify-center gap-2 border border-[#30363d] bg-[#161b22] px-3 text-[#8b949e] hover:border-[#f85149]/40 hover:bg-[#21262d] hover:text-[#f85149]"
            >
              <LogOut className="size-4" />
              <span className="hidden text-[12px] xl:inline">Sign out</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
