/**
 * Flecha flotante dorada para scroll hacia arriba
 * Aparece al hacer scroll down, ubicada sobre el botón WhatsApp
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

const SCROLL_THRESHOLD = 300

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#c9a962]/25 ring-2 ring-[#c9a962]/40 transition-all duration-200 hover:scale-110 hover:bg-[#c9a962]/35 hover:ring-[#c9a962]/60 sm:h-11 sm:w-11"
          initial={{ opacity: 0, scale: 0.8, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 4 }}
          transition={{ duration: 0.2 }}
          aria-label="Volver arriba"
        >
          <ChevronUp className="h-5 w-5 text-[#c9a962] sm:h-5 sm:w-5" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
