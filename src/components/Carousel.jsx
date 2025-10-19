import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Carousel({ slides, autoPlay = true, interval = 4000 }) {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((current + 1) % slides.length)
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length)

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [current, autoPlay, interval])

  return (
    <div className="relative h-80 bg-black/50 border border-emerald-500/20 rounded-2xl overflow-hidden">
      <div className="relative h-full flex items-center px-8">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-8 transition-opacity duration-500 ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {slide.render ? slide.render() : (
              <>
                <h3 className="text-4xl font-bold text-emerald-500 mb-4">{slide.title}</h3>
                <p className="text-gray-300">{slide.content}</p>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all ${
              i === current ? 'w-8 bg-emerald-500' : 'w-2 bg-gray-600'
            }`}
            style={{ height: '8px' }}
          />
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 border border-emerald-500/30 rounded-lg flex items-center justify-center hover:bg-black/90"
      >
        <ChevronLeft className="text-emerald-500" size={24} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 border border-emerald-500/30 rounded-lg flex items-center justify-center hover:bg-black/90"
      >
        <ChevronRight className="text-emerald-500" size={24} />
      </button>
    </div>
  )
}