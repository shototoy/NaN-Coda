import React, { createContext, useContext, useEffect, useState } from 'react'
import { apiRequest } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    username: null,
    isChecking: true,
  })

  const refreshSession = async () => {
    try {
      const data = await apiRequest('/api/auth/session')
      setAuthState({
        isAuthenticated: Boolean(data?.authenticated),
        username: data?.username || null,
        isChecking: false,
      })
    } catch (error) {
      setAuthState({
        isAuthenticated: false,
        username: null,
        isChecking: false,
      })
    }
  }

  const login = async ({ username, password }) => {
    const data = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })

    setAuthState({
      isAuthenticated: true,
      username: data?.username || username,
      isChecking: false,
    })

    return data
  }

  const logout = async () => {
    try {
      await apiRequest('/api/auth/logout', {
        method: 'POST',
      })
    } catch (error) {
      // Clear local auth state even if the server session is already gone.
    } finally {
      setAuthState({
        isAuthenticated: false,
        username: null,
        isChecking: false,
      })
    }
  }

  useEffect(() => {
    refreshSession()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.')
  }

  return context
}
