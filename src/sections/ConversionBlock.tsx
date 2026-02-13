/**
 * Bloque de conversión intermedio
 * CTA WhatsApp grande, fondo diferenciado
 */

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/constants'
import { fadeInUp, viewportConfig } from '@/lib/animations'
import { LashPattern } from '@/components/LashPattern'

export function ConversionBlock() {
  const { t } = useTranslation()

  return (
    <section className="section-spacing relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#c9a962]/5 to-transparent" />
      <LashPattern opacity={0.02} />
      <div className="section-container relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center lg:px-12">
        <motion.h2
          className="font-display text-3xl font-bold text-[#f5f0e6] sm:text-4xl"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {t('conversion.title')}
        </motion.h2>
        <motion.p
          className="mx-auto mt-10 max-w-xl text-lg text-[#a3a3a3]"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          custom={1}
        >
          {t('conversion.subtitle')}
        </motion.p>
        <motion.a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center justify-center gap-3 rounded-xl bg-[#25d366] px-10 py-4 text-xl font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#20bd5a] hover:shadow-xl"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          custom={2}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MessageCircle className="h-7 w-7" />
          {t('conversion.cta')}
        </motion.a>
      </div>
    </section>
  )
}
