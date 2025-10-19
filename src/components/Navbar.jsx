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
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-black text-emerald-500">NaN Coda</h1>

        <div className="hidden md:flex gap-8">
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
          className="md:hidden text-white"
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
              className={`block px-6 py-4 border-b border-gray-800 ${
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