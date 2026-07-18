import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api, tokens } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchMe = useCallback(async () => {
    try {
      const me = await api('/api/members/me/')
      setUser(me)
      return me
    } catch {
      tokens.clear()
      setUser(null)
      return null
    }
  }, [])

  useEffect(() => {
    if (tokens.access) {
      fetchMe().finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [fetchMe])

  async function login(username, password) {
    const data = await api('/api/auth/login/', {
      method: 'POST',
      auth: false,
      body: { username, password },
    })
    tokens.set(data.access, data.refresh)
    await fetchMe()
    return data
  }

  async function logout() {
    try {
      if (tokens.refresh) {
        await api('/api/auth/logout/', { method: 'POST', body: { refresh: tokens.refresh } })
      }
    } catch { /* ignore */ }
    tokens.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser: fetchMe }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
