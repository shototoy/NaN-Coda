import React from 'react'

export default function Card({ title, content, icon: Icon, stat, label, onPress, variant = 'default' }) {
  const isStatCard = variant === 'stat'

  return (
    <button
      onClick={onPress}
      className={`${
        isStatCard
          ? 'bg-black border border-gray-800 rounded-2xl p-8 relative'
          : 'bg-black/60 border border-gray-800 rounded-xl p-6'
      } text-left transition-colors hover:border-emerald-500/50`}
    >
      {isStatCard && <div className="absolute top-0 left-0 right-0 h-px bg-emerald-500" />}

      {Icon && (
        <div className="mb-4">
          <Icon className="text-emerald-500" size={32} />
        </div>
      )}

      {stat && <p className="text-5xl font-black text-emerald-500 mb-2">{stat}</p>}
      {label && <p className="text-xs text-gray-500 uppercase tracking-wide mb-6">{label}</p>}
      {title && <h3 className="text-xl font-bold text-white mb-3">{title}</h3>}
      {content && <p className="text-sm text-gray-400">{content}</p>}
    </button>
  )
}