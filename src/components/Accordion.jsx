import { useState } from 'react'

export default function Accordion({ items }) {
  const [active, setActive] = useState(null)

  const toggle = (index) => {
    setActive(active === index ? null : index)
  }

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
          <div 
            onClick={() => toggle(i)} 
            className="flex justify-between items-center cursor-pointer font-semibold text-brand-orange"
          >
            <span className="text-sm">{item.icon} {item.title}</span>
            <button className={`text-lg transition-transform ${active === i ? 'rotate-180' : ''}`}>
              ▼
            </button>
          </div>
          <div className={`overflow-hidden transition-all duration-300 ${active === i ? 'max-h-96 mt-2 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-text-muted text-xs leading-relaxed">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}