/**
 * Botón flotante WhatsApp - Siempre visible
 * Estrategia de conversión: CTA principal en toda la web
 */

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getWhatsAppUrl } from '@/lib/constants'
import { ScrollToTop } from './ScrollToTop'

interface WhatsAppButtonProps {
  variant?: 'floating' | 'inline' | 'large'
  className?: string
  showLabel?: boolean
}

export function WhatsAppButton({
  variant = 'floating',
  className = '',
  showLabel = true,
}: WhatsAppButtonProps) {
  const { t } = useTranslation()
  const href = getWhatsAppUrl()

  if (variant === 'floating') {
    return (
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
        <ScrollToTop />
        <div className="relative">
          {/* Anillos de pulso */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#25d366]"
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.4, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            style={{ top: -4, left: -4, right: -4, bottom: -4 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#25d366]"
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.4, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, delay: 1 }}
            style={{ top: -4, left: -4, right: -4, bottom: -4 }}
          />

          <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-white shadow-xl shadow-[#25d366]/50 ring-4 ring-[#25d366]/20 ${className}`}
          initial={{ scale: 0, opacity: 0, y: 30 }}
          animate={{
            scale: [0, 1.05, 1],
            opacity: 1,
            y: 0,
            boxShadow: [
              '0 20px 40px -15px rgba(37, 211, 102, 0.5)',
              '0 25px 50px -10px rgba(37, 211, 102, 0.6)',
              '0 20px 40px -15px rgba(37, 211, 102, 0.5)',
            ],
          }}
          transition={{
            scale: { delay: 0.6, duration: 0.6, times: [0, 0.6, 1] },
            opacity: { delay: 0.6, duration: 0.4 },
            y: { delay: 0.6, type: 'spring', stiffness: 200, damping: 18 },
            boxShadow: { duration: 2.5, repeat: Infinity, repeatDelay: 0.5 },
          }}
          whileHover={{
            scale: 1.1,
            y: -4,
            boxShadow: '0 25px 60px -10px rgba(37, 211, 102, 0.7)',
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95, y: 0 }}
          aria-label="Contactar por WhatsApp"
        >
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.8 }}
          >
            <MessageCircle className="h-6 w-6" />
          </motion.span>
          {showLabel && (
            <span className="hidden font-medium sm:inline">{t('nav.cta')}</span>
          )}
        </motion.a>
        </div>
      </div>
    )
  }

  if (variant === 'large') {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-3 rounded-xl bg-[#25d366] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#20bd5a] hover:shadow-xl ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <MessageCircle className="h-7 w-7" />
        {t('hero.cta')}
      </motion.a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-lg bg-[#25d366] px-4 py-2 font-medium text-white transition-all hover:bg-[#20bd5a] ${className}`}
    >
      <MessageCircle className="h-5 w-5" />
      {t('nav.cta')}
    </a>
  )
}
