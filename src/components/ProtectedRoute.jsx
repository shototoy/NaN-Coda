import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const location = useLocation()
  const { isAuthenticated, isChecking } = useAuth()

  if (isChecking) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-7xl items-center justify-center px-6 py-12">
        <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
          Checking session...
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
