import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3 md:px-6">
        <h1 className="text-xl font-black text-emerald-500 md:text-2xl">NaN Coda</h1>

        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname === item.path ? 'text-emerald-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center text-white md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 border-t border-gray-800">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`block border-b border-gray-800 px-5 py-3.5 ${
                location.pathname === item.path ? 'text-emerald-500' : 'text-gray-300'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
