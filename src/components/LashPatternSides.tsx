/**
 * Patrón de pestañas en los lados - franjas verticales con curvas horizontales
 * Para secciones que requieren un diseño diferenciado
 */

import { useId } from 'react'
import { motion } from 'framer-motion'
import { useScrollLash } from '@/hooks/useScrollLash'

const GOLD = '#e0c989'

interface LashPatternSidesProps {
  opacity?: number
  className?: string
}

export function LashPatternSides({ opacity = 0.06, className = '' }: LashPatternSidesProps) {
  const scrollLash = useScrollLash()
  const id = useId().replace(/:/g, '-')
  const svgOpacity = opacity * 2.5

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {/* Franja izquierda - curvas horizontales hacia la derecha */}
      <motion.svg
        className="absolute left-0 top-0 h-full w-28 sm:w-36"
        style={{ opacity: svgOpacity, y: scrollLash?.y ?? 0 }}
        viewBox="0 0 100 800"
        preserveAspectRatio="xMinYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id={`lash-left-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={GOLD} stopOpacity="1" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(45)].map((_, i) => (
          <path
            key={`left-${i}`}
            d={`M 0 ${6 + i * 18} C 30 ${10 + i * 18} 60 ${6 + i * 18} 100 ${4 + i * 18}`}
            stroke={`url(#lash-left-${id})`}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
        ))}
      </motion.svg>

      {/* Franja derecha - curvas horizontales hacia la izquierda */}
      <motion.svg
        className="absolute right-0 top-0 h-full w-28 sm:w-36"
        style={{ opacity: svgOpacity, y: scrollLash?.y ?? 0 }}
        viewBox="0 0 100 800"
        preserveAspectRatio="xMaxYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id={`lash-right-${id}`} x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={GOLD} stopOpacity="1" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(45)].map((_, i) => (
          <path
            key={`right-${i}`}
            d={`M 100 ${6 + i * 18} C 70 ${10 + i * 18} 40 ${6 + i * 18} 0 ${4 + i * 18}`}
            stroke={`url(#lash-right-${id})`}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
        ))}
      </motion.svg>
    </div>
  )
}
