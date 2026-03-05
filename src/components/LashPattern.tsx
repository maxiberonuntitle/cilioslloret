/**
 * Patrón de pestañas para fondos de sección
 * SVG repetible - curvas que simulan pestañas
 * Movimiento ligado al scroll: las líneas se desplazan según la dirección
 */

import { useId } from 'react'
import { motion } from 'framer-motion'
import { useScrollLash } from '@/hooks/useScrollLash'

const GOLD = '#e0c989'

interface LashPatternProps {
  className?: string
  opacity?: number
}

export function LashPattern({ className = '', opacity = 0.06 }: LashPatternProps) {
  const scrollLash = useScrollLash()
  const patternId = `lash-pattern-${useId().replace(/:/g, '-')}`

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <motion.svg
        className="h-full w-full"
        style={{ opacity, y: scrollLash?.y ?? 0 }}
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id={patternId} x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            {[...Array(12)].map((_, i) => (
              <path
                key={i}
                d={`M ${5 + i * 8} 0 C ${10 + i * 8} 25 ${15 + i * 8} 50 ${5 + i * 8} 100`}
                stroke={GOLD}
                strokeWidth="0.6"
                fill="none"
                strokeLinecap="round"
              />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </motion.svg>
    </div>
  )
}
