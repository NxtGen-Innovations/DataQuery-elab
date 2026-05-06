'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/lib/auth-context'
import { ProgressProvider } from '@/lib/progress-context'
import { autoCleanup } from '@/lib/cache'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    // Perform cache cleanup on mount
    autoCleanup()
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProgressProvider>
          {children}
          <Toaster />
        </ProgressProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
