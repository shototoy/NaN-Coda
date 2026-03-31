import React, { useId } from 'react'

export default function HeroLogo({
  className = '',
  sizeClassName = 'h-56 w-56 md:h-64 md:w-64 lg:h-72 lg:w-72',
}) {
  const baseId = useId().replace(/:/g, '')
  const strokeGradientId = `${baseId}-stroke`
  const nodeGradientId = `${baseId}-node`
  const panelGradientId = `${baseId}-panel`
  const glowFilterId = `${baseId}-glow`
  const softGlowFilterId = `${baseId}-soft-glow`

  return (
    <div className={`relative flex items-center justify-center ${sizeClassName} ${className}`.trim()}>
      <div className="absolute inset-10 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute inset-16 rounded-full border border-emerald-500/10" />

      <svg
        viewBox="0 0 400 400"
        className="relative h-full w-full"
        role="img"
        aria-label="NaN Coda logo"
      >
        <defs>
          <linearGradient id={strokeGradientId} x1="72" y1="76" x2="328" y2="324" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7CF5CB" />
            <stop offset="50%" stopColor="#22D3A6" />
            <stop offset="100%" stopColor="#139E78" />
          </linearGradient>
          <linearGradient id={nodeGradientId} x1="120" y1="112" x2="280" y2="288" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D9FFF3" />
            <stop offset="40%" stopColor="#56F0C0" />
            <stop offset="100%" stopColor="#14B885" />
          </linearGradient>
          <linearGradient id={panelGradientId} x1="134" y1="128" x2="266" y2="274" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(61, 248, 191, 0.26)" />
            <stop offset="100%" stopColor="rgba(5, 34, 27, 0.12)" />
          </linearGradient>
          <filter id={glowFilterId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={softGlowFilterId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0.85  0 0 1 0 0.7  0 0 0 0.25 0"
            />
          </filter>
        </defs>

        <g opacity="0.18" stroke="#22D3A6" strokeWidth="1">
          <path d="M108 62V338" />
          <path d="M200 46V354" />
          <path d="M292 62V338" />
          <path d="M62 108H338" />
          <path d="M46 200H354" />
          <path d="M62 292H338" />
        </g>

        <g filter={`url(#${softGlowFilterId})`} opacity="0.7">
          <circle cx="200" cy="200" r="110" fill="#16C995" />
        </g>

        <g opacity="0.95">
          <circle cx="200" cy="200" r="132" fill="none" stroke="#16362D" strokeWidth="2" />
          <circle cx="200" cy="200" r="142" fill="none" stroke="#0C1C18" strokeWidth="2" strokeDasharray="3 12" />
        </g>

        <g filter={`url(#${glowFilterId})`}>
          <path
            d="M200 76L324 200L200 324L76 200Z"
            fill={`url(#${panelGradientId})`}
            stroke={`url(#${strokeGradientId})`}
            strokeWidth="12"
            strokeLinejoin="round"
          />
          <path
            d="M200 114L286 200L200 286L114 200Z"
            fill="rgba(2, 18, 14, 0.8)"
            stroke="#1DE1A9"
            strokeOpacity="0.35"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          <path
            d="M156 250V152L244 248V150"
            fill="none"
            stroke={`url(#${strokeGradientId})`}
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M126 158L94 198L126 238"
            fill="none"
            stroke="#6EF0C5"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          <path
            d="M274 158L306 198L274 238"
            fill="none"
            stroke="#6EF0C5"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        </g>

        {[
          { cx: 200, cy: 76 },
          { cx: 324, cy: 200 },
          { cx: 200, cy: 324 },
          { cx: 76, cy: 200 },
        ].map((node) => (
          <g key={`${node.cx}-${node.cy}`}>
            <circle cx={node.cx} cy={node.cy} r="22" fill="#02100D" opacity="0.92" />
            <circle cx={node.cx} cy={node.cy} r="16" fill={`url(#${nodeGradientId})`} />
            <circle cx={node.cx - 5} cy={node.cy - 5} r="4" fill="#F4FFF9" opacity="0.85" />
          </g>
        ))}
      </svg>
    </div>
  )
}
