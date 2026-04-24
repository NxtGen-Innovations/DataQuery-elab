'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

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
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem('dq-auth-user')
    return stored ? JSON.parse(stored) : null
  })

  const login = useCallback((email: string, password: string): boolean => {
    const isAdmin = email === ADMIN_EMAIL && password === ADMIN_PASSWORD
    const role: UserRole = isAdmin ? 'admin' : 'student'
    const name = isAdmin ? 'Admin' : email.split('@')[0]

    const newUser: AuthUser = { name, email, role }
    setUser(newUser)
    localStorage.setItem('dq-auth-user', JSON.stringify(newUser))
    return true
  }, [])

  const signup = useCallback((name: string, email: string, _password: string) => {
    const newUser: AuthUser = { name, email, role: 'student' }
    setUser(newUser)
    localStorage.setItem('dq-auth-user', JSON.stringify(newUser))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('dq-auth-user')
  }, [])

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
