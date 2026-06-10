'use client'

import { getScoreLabel } from '@/lib/demo/score'

type Props = {
  score: number
  size?: number
  /** Affiche le label (Excellent/Fiable/Vigilance) sous le score. */
  showLabel?: boolean
}

/**
 * Jauge circulaire SVG du score de confiance.
 * Couleurs charte : Excellent #1a3a2a / Fiable #e87722 / Vigilance #cc2200.
 */
export default function ScoreGauge({ score, size = 160, showLabel = true }: Props) {
  const clamped = Math.max(0, Math.min(100, score))
  const { label, color } = getScoreLabel(clamped)

  const stroke = size * 0.09
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - clamped / 100)

  return (
    <div className="inline-flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#eef2ef"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.35s ease, stroke 0.35s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-bold leading-none" style={{ fontSize: size * 0.3, color }}>
            {clamped}
          </span>
          <span className="text-gray-400 text-xs mt-1">/ 100</span>
        </div>
      </div>
      {showLabel && (
        <span
          className="mt-3 inline-block px-3 py-1 rounded-full text-sm font-semibold"
          style={{ color, backgroundColor: `${color}14` }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
