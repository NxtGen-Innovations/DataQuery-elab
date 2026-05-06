'use client'

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'
import { useCachedState } from '@/hooks/use-cached-state'

export type UserRole = 'student' | 'admin'

export interface AuthUser {
  name: string
  email: string
  role: UserRole
}

interface AuthContextType {
  user: AuthUser | null
  isLoggedIn: boolean
  isAdmin: boolean
  login: (email: string, password: string) => boolean
  signup: (name: string, email: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hardcoded admin credentials
const ADMIN_EMAIL = 'admin@dataquest.com'
const ADMIN_PASSWORD = 'admin123'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useCachedState<AuthUser | null>('auth-user', null)

  const login = useCallback((email: string, password: string): boolean => {
    const isAdmin = email === ADMIN_EMAIL && password === ADMIN_PASSWORD
    const role: UserRole = isAdmin ? 'admin' : 'student'
    const name = isAdmin ? 'Admin' : email.split('@')[0]

    const newUser: AuthUser = { name, email, role }
    setUser(newUser)
    return true
  }, [setUser])

  const signup = useCallback((name: string, email: string, _password: string) => {
    void _password
    const newUser: AuthUser = { name, email, role: 'student' }
    setUser(newUser)
  }, [setUser])

  const logout = useCallback(() => {
    setUser(null)
  }, [setUser])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAdmin: user?.role === 'admin',
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
