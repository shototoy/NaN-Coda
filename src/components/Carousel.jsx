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
    <div className="relative h-64 overflow-hidden rounded-xl border border-emerald-500/20 bg-black/50 md:h-72">
      <div className="relative flex h-full items-center px-6 md:px-8">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-6 transition-opacity duration-500 md:inset-8 ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {slide.render ? slide.render() : (
              <>
                <h3 className="mb-3 text-3xl font-bold text-emerald-500 md:text-4xl">{slide.title}</h3>
                <p className="text-sm text-gray-300 md:text-base">{slide.content}</p>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
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
        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg border border-emerald-500/30 bg-black/80 hover:bg-black/90 md:left-4 md:h-10 md:w-10"
      >
        <ChevronLeft className="text-emerald-500" size={24} />
      </button>

      <button
        onClick={next}
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg border border-emerald-500/30 bg-black/80 hover:bg-black/90 md:right-4 md:h-10 md:w-10"
      >
        <ChevronRight className="text-emerald-500" size={24} />
      </button>
    </div>
  )
}
