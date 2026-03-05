/**
 * Decoraciones doradas que simulan pestañas
 * Franjas horizontales superior e inferior
 * Movimiento ligado al scroll: las líneas se desplazan según la dirección
 */

import { motion } from 'framer-motion'
import { useScrollLash } from '@/hooks/useScrollLash'

const GOLD = '#e0c989'

export function LashDecorations() {
  const scrollLash = useScrollLash()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Franja superior - pestañas curvándose hacia abajo */}
      <motion.svg
        className="absolute left-0 right-0 top-0 h-40 w-full opacity-[0.14] sm:h-48 sm:opacity-[0.18]"
        style={{ y: scrollLash?.y ?? 0 }}
        viewBox="0 0 1200 140"
        preserveAspectRatio="none"
        fill="none"
      >
        {[...Array(70)].map((_, i) => (
          <path
            key={`top-${i}`}
            d={`M ${i * 18} 0 C ${i * 18 + 12} 35 ${i * 18 + 22} 70 ${i * 18 + 8} 120`}
            stroke={GOLD}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
        ))}
      </motion.svg>

      {/* Franja inferior - movimiento invertido para simular cierre de párpados */}
      <motion.svg
        className="absolute bottom-0 left-0 right-0 h-40 w-full opacity-[0.14] sm:h-48 sm:opacity-[0.18]"
        style={{ y: scrollLash?.yInverted ?? 0 }}
        viewBox="0 0 1200 140"
        preserveAspectRatio="none"
        fill="none"
      >
        {[...Array(70)].map((_, i) => (
          <path
            key={`bot-${i}`}
            d={`M ${i * 18} 140 C ${i * 18 + 12} 105 ${i * 18 + 22} 70 ${i * 18 + 8} 20`}
            stroke={GOLD}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
        ))}
      </motion.svg>
    </div>
  )
}
