import React, { useEffect, useState } from 'react'
import {
  CalendarDays,
  Inbox,
  LogOut,
  Mail,
  MessageSquareText,
  RefreshCw,
  Trash2,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { apiRequest } from '../lib/api'

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value))
  } catch (error) {
    return value
  }
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { username, logout } = useAuth()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [storageLabel, setStorageLabel] = useState('Protected JSON')
  const [storageDescription, setStorageDescription] = useState('Saved on the server and hidden behind admin auth.')
  const [deletingId, setDeletingId] = useState('')

  const loadMessages = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await apiRequest('/api/admin/messages')
      setMessages(data?.messages || [])
      setStorageLabel(data?.storageLabel || 'Protected JSON')
      setStorageDescription(data?.storageDescription || 'Saved on the server and hidden behind admin auth.')
    } catch (requestError) {
      if (requestError.message === 'Unauthorized') {
        await logout()
        navigate('/login', { replace: true })
        return
      }

      setError(requestError.message || 'Failed to load messages.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMessages()
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  const handleDelete = async (messageId, senderName) => {
    const confirmed = window.confirm(`Delete the message from ${senderName}?`)

    if (!confirmed) {
      return
    }

    setDeletingId(messageId)
    setError('')

    try {
      await apiRequest(`/api/admin/messages/${messageId}`, { method: 'DELETE' })
      setMessages((current) => current.filter((item) => item.id !== messageId))
    } catch (requestError) {
      if (requestError.message === 'Unauthorized') {
        await logout()
        navigate('/login', { replace: true })
        return
      }

      setError(requestError.message || 'Failed to delete message.')
    } finally {
      setDeletingId('')
    }
  }

  return (
    <main className="bg-black">
      <div className="mx-auto max-w-7xl px-6 py-8 md:py-10">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
              <p className="text-xs font-semibold text-emerald-500">Protected Admin Area</p>
            </div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">Message Dashboard</h1>
            <p className="mt-2 text-sm text-gray-400 md:text-base">
              Signed in as <span className="font-semibold text-emerald-500">{username}</span>
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={loadMessages}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-700 px-4 py-2.5 text-sm font-semibold text-white hover:border-gray-500"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-emerald-600"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-800 bg-black p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Total Messages</p>
            <p className="mt-3 text-4xl font-black text-emerald-500">{messages.length}</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-black p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Storage</p>
            <p className="mt-3 text-lg font-bold text-white">{storageLabel}</p>
            <p className="mt-1 text-sm text-gray-400">{storageDescription}</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-black p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Status</p>
            <p className="mt-3 text-lg font-bold text-white">{loading ? 'Syncing messages...' : 'Ready'}</p>
            <p className="mt-1 text-sm text-gray-400">Use refresh to pull the latest submissions.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-black p-5 md:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
              <Inbox className="text-emerald-500" size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Messages</h2>
              <p className="text-sm text-gray-400">Newest submissions appear first.</p>
            </div>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {loading ? (
            <div className="rounded-lg border border-gray-800 bg-gray-950/60 px-4 py-8 text-center text-sm text-gray-400">
              Loading protected messages...
            </div>
          ) : messages.length === 0 ? (
            <div className="rounded-lg border border-gray-800 bg-gray-950/60 px-4 py-8 text-center">
              <MessageSquareText className="mx-auto mb-3 text-emerald-500" size={24} />
              <p className="text-sm font-semibold text-white">No messages yet</p>
              <p className="mt-1 text-sm text-gray-400">New contact form submissions will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((item) => (
                <article key={item.id} className="rounded-xl border border-gray-800 bg-gray-950/60 p-4 md:p-5">
                  <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">{item.name}</h3>
                      <div className="mt-2 flex flex-col gap-2 text-sm text-gray-400 md:flex-row md:flex-wrap md:gap-4">
                        <span className="flex items-center gap-2">
                          <Mail size={15} className="text-emerald-500" />
                          {item.email}
                        </span>
                        <span className="flex items-center gap-2">
                          <CalendarDays size={15} className="text-emerald-500" />
                          {formatDate(item.submittedAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex rounded-full border border-emerald-500/15 bg-emerald-500/5 px-3 py-1 text-xs font-semibold text-emerald-400">
                        {item.company || 'No company listed'}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.name)}
                        disabled={deletingId === item.id}
                        className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300 transition hover:border-red-500/40 hover:bg-red-500/15 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Trash2 size={14} />
                        {deletingId === item.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>

                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300">{item.message}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
