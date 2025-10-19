import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Accordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const Icon = item.icon
        const isActive = activeIndex === i

        return (
          <div
            key={i}
            className={`border rounded-xl overflow-hidden transition-colors ${
              isActive
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-gray-900/40 border-gray-700/50'
            }`}
          >
            <button
              onClick={() => setActiveIndex(isActive ? null : i)}
              className="w-full flex items-center gap-4 p-5 text-left"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isActive ? 'bg-emerald-500/20' : 'bg-gray-700/50'
                }`}
              >
                <Icon className="text-emerald-500" size={20} />
              </div>

              <h3 className={`flex-1 text-lg font-semibold ${isActive ? 'text-emerald-500' : 'text-gray-300'}`}>
                {item.title}
              </h3>

              <ChevronDown
                className={`text-emerald-500 transition-transform ${isActive ? 'rotate-180' : ''}`}
                size={20}
              />
            </button>

            {isActive && (
              <div className="px-5 pb-5">
                <p className="text-sm text-gray-400">{item.content}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}