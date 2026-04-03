import React from 'react'
import { X } from 'lucide-react'

export default function Lightbox({ visible, imageUri, onClose }) {
  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
      <button
        className="absolute inset-0 bg-black/92 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close lightbox"
      />
      <div className="relative w-full max-w-[1400px]">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white transition hover:border-emerald-500/40 hover:text-emerald-300"
          aria-label="Close preview"
        >
          <X size={22} />
        </button>
        {imageUri && (
          <div className="overflow-hidden rounded-[28px] border border-gray-800 bg-[linear-gradient(180deg,rgba(8,18,10,0.96),rgba(3,6,4,0.98))] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.55)] sm:p-4">
            <img
              src={imageUri}
              alt="Lightbox"
              className="block max-h-[82vh] w-full rounded-2xl object-contain"
            />
          </div>
        )}
      </div>
    </div>
  )
}
