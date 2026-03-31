import React from 'react'

export default function Card({ title, content, icon: Icon, stat, label, onPress, variant = 'default' }) {
  const isStatCard = variant === 'stat'

  return (
    <button
      onClick={onPress}
      className={`${
        isStatCard
          ? 'bg-black border border-gray-800 rounded-xl p-6 relative'
          : 'bg-black/60 border border-gray-800 rounded-xl p-5'
      } text-left transition-colors hover:border-emerald-500/50`}
    >
      {isStatCard && <div className="absolute top-0 left-0 right-0 h-px bg-emerald-500" />}

      {Icon && (
        <div className="mb-3">
          <Icon className="text-emerald-500" size={28} />
        </div>
      )}

      {stat && <p className="mb-2 text-4xl font-black text-emerald-500 md:text-5xl">{stat}</p>}
      {label && <p className="mb-4 text-xs uppercase tracking-wide text-gray-500">{label}</p>}
      {title && <h3 className="mb-2 text-lg font-bold text-white md:text-xl">{title}</h3>}
      {content && <p className="text-sm leading-relaxed text-gray-400">{content}</p>}
    </button>
  )
}
