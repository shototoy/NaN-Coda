import { useState, useEffect } from 'react'

export default function Carousel({ slides, interval = 4000 }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, interval)
    return () => clearInterval(timer)
  }, [slides.length, interval])

  const change = (direction) => {
    setCurrent((prev) => (prev + direction + slides.length) % slides.length)
  }

  return (
    <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-8">
      <button 
        onClick={() => change(-1)} 
        className="text-4xl text-brand-orange hover:bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center transition-all"
      >
        ❮
      </button>
      <div className="flex-1 text-center px-8">
        <h3 className="text-xl font-semibold text-brand-orange mb-4">{slides[current].title}</h3>
        <p className="text-text-muted">{slides[current].content}</p>
      </div>
      <button 
        onClick={() => change(1)} 
        className="text-4xl text-brand-orange hover:bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center transition-all"
      >
        ❯
      </button>
    </div>
  )
}