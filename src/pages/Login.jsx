import React, { useState } from 'react'
import { LockKeyhole, LogIn } from 'lucide-react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import Toast from '../components/Toast'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, isChecking, login } = useAuth()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' })

  const redirectTo = location.state?.from?.pathname || '/admin'

  if (!isChecking && isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!credentials.username || !credentials.password) {
      setToast({
        visible: true,
        message: 'Enter both your username and password.',
        type: 'error',
      })
      return
    }

    setLoading(true)

    try {
      await login(credentials)
      navigate(redirectTo, { replace: true })
    } catch (error) {
      setToast({
        visible: true,
        message: error.message || 'Login failed.',
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-black">
      <div className="mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-5xl items-center justify-center px-6 py-10">
        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-black p-6 shadow-[0_0_0_1px_rgba(16,185,129,0.06)] md:p-7">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
            <LockKeyhole className="text-emerald-500" size={22} />
          </div>

          <h1 className="mb-2 text-3xl font-bold text-white">Admin Login</h1>
          <p className="mb-6 text-sm leading-relaxed text-gray-400">
            Sign in to view protected contact messages from the admin dashboard.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-300">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(event) => setCredentials({ ...credentials, username: event.target.value })}
                placeholder="Admin username"
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-300">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                placeholder="Admin password"
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 font-bold text-black hover:bg-emerald-600 disabled:bg-gray-700"
            >
              {loading ? 'Signing in...' : 'Login'}
              <LogIn size={18} />
            </button>
          </form>
        </div>
      </div>

      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={() => setToast({ ...toast, visible: false })}
      />
    </main>
  )
}
