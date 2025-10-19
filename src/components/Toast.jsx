import { useEffect } from 'react'

export default function Toast({ message, show, onClose, duration = 3000 }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [show, duration, onClose])

  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-brand-orange text-white px-6 py-4 rounded-lg shadow-xl transition-all duration-300 z-50 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
      {message}
    </div>
  )
}