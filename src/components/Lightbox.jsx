import React from 'react'
import { X } from 'lucide-react'

export default function Lightbox({ visible, imageUri, onClose }) {
  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        className="absolute inset-0 bg-black/95"
        onClick={onClose}
      />
      <div className="relative w-11/12 h-5/6 max-w-4xl">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-400"
        >
          <X size={32} />
        </button>
        {imageUri && (
          <img
            src={imageUri}
            alt="Lightbox"
            className="w-full h-full object-contain"
          />
        )}
      </div>
    </div>
  )
}