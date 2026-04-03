import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Carousel({ slides, autoPlay = true, interval = 4000, className = '', slideClassName = '' }) {
  const [current, setCurrent] = useState(0)
  const slideCount = slides.length

  const next = () => setCurrent((index) => (index + 1) % slideCount)
  const prev = () => setCurrent((index) => (index - 1 + slideCount) % slideCount)

  useEffect(() => {
    if (!autoPlay || slideCount <= 1) {
      return undefined
    }

    const timer = setInterval(() => {
      setCurrent((index) => (index + 1) % slideCount)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, slideCount])

  useEffect(() => {
    if (current >= slideCount) {
      setCurrent(0)
    }
  }, [current, slideCount])

  if (!slideCount) {
    return null
  }

  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] border border-emerald-500/20 bg-black/60 shadow-[0_24px_70px_rgba(0,0,0,0.28)] ${className}`.trim()}
    >
      <div className="relative h-full">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? 'opacity-100' : 'pointer-events-none opacity-0'
            } ${slideClassName}`.trim()}
          >
            {slide.render ? (
              slide.render()
            ) : (
              <div className="flex h-full items-center px-6 md:px-8">
                <div>
                  <h3 className="mb-3 text-3xl font-bold text-emerald-500 md:text-4xl">{slide.title}</h3>
                  <p className="text-sm text-gray-300 md:text-base">{slide.content}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {slideCount > 1 ? (
        <>
          <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2.5 md:bottom-5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === current ? 'w-10 bg-emerald-400' : 'w-2 bg-white/30 hover:bg-white/45'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/28 text-white/88 backdrop-blur-sm transition hover:border-emerald-400/40 hover:bg-black/38 hover:text-emerald-300 md:left-5 md:h-12 md:w-12"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/28 text-white/88 backdrop-blur-sm transition hover:border-emerald-400/40 hover:bg-black/38 hover:text-emerald-300 md:right-5 md:h-12 md:w-12"
          >
            <ChevronRight size={24} />
          </button>
        </>
      ) : null}
    </div>
  )
}
