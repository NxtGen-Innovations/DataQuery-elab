'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BookOpen, Brain, ChevronLeft, LayoutDashboard, LogOut, Settings, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'

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
          onClick={() => router.back()}
          className="flex w-full items-center justify-center gap-3 border border-[#30363d] bg-[#161b22] px-3 py-2 text-[13px] text-[#c9d1d9] hover:bg-[#21262d] xl:justify-start"
          title="Go back"
        >
          <ChevronLeft className="size-4" />
          <span className="hidden xl:inline">Back</span>
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 xl:px-4">
        {visibleNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
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

      <div className="mt-auto border-t border-[#30363d] px-3 py-4 xl:px-4">
        <div className="mb-4 hidden border border-[#30363d] bg-[#161b22] p-3 xl:block">
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8b949e]">Current Focus</div>
          <div className="mt-2 text-sm font-medium text-[#e6edf3]">Data Science Path</div>
          <div className="mt-1 text-[12px] leading-5 text-[#8b949e]">Move from notes to practice and pass your test cases.</div>
        </div>

        <div className="flex items-center justify-center gap-2 xl:justify-between">
          <div className="hidden items-center gap-3 xl:flex">
            <div className="flex size-9 items-center justify-center border border-[#30363d] bg-[#161b22] text-sm font-semibold text-[#e6edf3]">
              {userInitial}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-[#e6edf3]">{user?.name || 'Student'}</div>
              <div className="truncate text-[12px] text-[#8b949e]">{user?.email || 'Guest mode'}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              title="Settings"
              className="flex size-9 items-center justify-center border border-[#30363d] bg-[#161b22] text-[#8b949e] hover:bg-[#21262d] hover:text-[#c9d1d9]"
            >
              <Settings className="size-4" />
            </button>
            <button
              onClick={() => {
                logout()
                window.location.href = '/login'
              }}
              title="Sign out"
              className="flex size-9 items-center justify-center border border-[#30363d] bg-[#161b22] text-[#8b949e] hover:border-[#f85149]/40 hover:bg-[#21262d] hover:text-[#f85149]"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
