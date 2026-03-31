import React, { useState } from 'react'
import { LayoutDashboard, LogIn, Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated } = useAuth()

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Contact', path: '/contact' },
  ]

  const authAction = isAuthenticated
    ? { label: 'Admin', path: '/admin', icon: LayoutDashboard }
    : { label: 'Login', path: '/login', icon: LogIn }

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3 md:px-6">
        <Link to="/" className="text-xl font-black text-emerald-500 md:text-2xl">
          NaN Coda
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-emerald-500' : 'text-gray-400 hover:text-white'}`}
            >
              {item.label}
            </NavLink>
          ))}

          <NavLink
            to={authAction.path}
            className={({ isActive }) => `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              isActive
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                : 'border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white'
            }`}
          >
            <authAction.icon size={16} />
            {authAction.label}
          </NavLink>
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
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `block border-b border-gray-800 px-5 py-3.5 ${isActive ? 'text-emerald-500' : 'text-gray-300'}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}

          <NavLink
            to={authAction.path}
            className={({ isActive }) => `flex items-center gap-2 px-5 py-3.5 ${isActive ? 'text-emerald-500' : 'text-gray-300'}`}
            onClick={() => setIsOpen(false)}
          >
            <authAction.icon size={18} />
            {authAction.label}
          </NavLink>
        </div>
      )}
    </nav>
  )
}
