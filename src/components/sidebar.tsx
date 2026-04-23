'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, LayoutDashboard, Settings, Brain, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: BookOpen, label: 'Curriculum', href: '/curriculum' },
  { icon: LayoutDashboard, label: 'Admin', href: '/admin' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-[72px] flex flex-col items-center py-6 bg-[#0c0c0c] border-r border-white/[0.06] z-50">
      {/* Logo */}
      <Link href="/dashboard" className="mb-10 group">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
          <Brain className="w-5 h-5 text-white" />
        </div>
      </Link>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col gap-1.5 w-full px-3">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                'group relative flex items-center justify-center p-2.5 rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-purple-500/15 text-purple-400'
                  : 'text-white/30 hover:text-white/80 hover:bg-white/[0.06]'
              )}
            >
              <item.icon className="w-5 h-5" />

              {/* Tooltip */}
              <span className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#1a1a1a] border border-white/10 text-white text-[11px] font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-xl z-50">
                {item.label}
              </span>

              {/* Active bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-purple-500 rounded-r-full shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="flex flex-col gap-1.5 w-full px-3 mb-2">
        <button
          title="Settings"
          className="flex items-center justify-center p-2.5 rounded-xl text-white/20 hover:text-white/60 hover:bg-white/[0.06] transition-all"
        >
          <Settings className="w-5 h-5" />
        </button>
        <Link
          href="/login"
          title="Sign Out"
          className="flex items-center justify-center p-2.5 rounded-xl text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
        </Link>
        <div className="mt-2 mx-auto w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-[11px] shadow-md">
          U
        </div>
      </div>
    </aside>
  )
}
