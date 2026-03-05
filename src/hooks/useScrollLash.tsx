/**
 * Hook para movimiento de patrones de pestañas ligado al scroll
 * Las líneas se desplazan en la dirección del scroll (arriba/abajo)
 * Usa velocity-based animation para respuesta fluida y eficiente
 */

import { createContext, useContext, type ReactNode } from 'react'
import { useScroll, useVelocity, useTransform, useSpring, type MotionValue } from 'framer-motion'

type ScrollLashContextValue = {
  /** Desplazamiento para franja superior / patrones: scroll down → líneas bajan */
  y: MotionValue<number>
  /** Desplazamiento invertido para franja inferior: scroll down → líneas suben (efecto pestañeo) */
  yInverted: MotionValue<number>
}

const ScrollLashContext = createContext<ScrollLashContextValue | null>(null)

export function ScrollLashProvider({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const velocityFactor = useTransform(scrollVelocity, [-800, 0, 800], [-12, 0, 12])
  const y = useSpring(velocityFactor, { stiffness: 400, damping: 30 })
  const yInverted = useTransform(y, (v) => -v)

  return (
    <ScrollLashContext.Provider value={{ y, yInverted }}>
      {children}
    </ScrollLashContext.Provider>
  )
}

export function useScrollLash() {
  const ctx = useContext(ScrollLashContext)
  if (!ctx) return null
  return ctx
}
