import React, { useEffect } from 'react'
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react'

export default function Toast({ message, type = 'info', visible, onHide, duration = 3000 }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => onHide(), duration)
      return () => clearTimeout(timer)
    }
  }, [visible, duration, onHide])

  if (!visible) return null

  const icons = {
    success: CheckCircle,
    error: X,
    warning: AlertCircle,
    info: Info
  }

  const colors = {
    success: 'border-emerald-500 text-emerald-500',
    error: 'border-red-500 text-red-500',
    warning: 'border-yellow-500 text-yellow-500',
    info: 'border-blue-500 text-blue-500'
  }

  const Icon = icons[type]

  return (
    <div className={`fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-80 border-l-4 ${colors[type]} bg-gray-900 rounded-lg p-4 flex gap-3 z-50 animate-in fade-in slide-in-from-top-4`}>
      {Icon && <Icon size={24} className="flex-shrink-0" />}
      <p className="text-sm flex-1">{message}</p>
    </div>
  )
}