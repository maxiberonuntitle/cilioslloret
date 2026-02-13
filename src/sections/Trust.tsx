/**
 * Prueba social / Confianza
 * Atención personalizada y Trabajo a domicilio
 */

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { User, MapPin } from 'lucide-react'
import { fadeInUp, viewportConfig } from '@/lib/animations'
import { LashPattern } from '@/components/LashPattern'

const benefits = [
  { key: 'benefit1', icon: User },
  { key: 'benefit3', icon: MapPin },
] as const

export function Trust() {
  const { t } = useTranslation()

  return (
    <section className="section-spacing relative">
      <LashPattern opacity={0.055} />
      <div className="section-container relative mx-auto flex flex-col items-center">
        <div className="section-title-spacing">
          <motion.h2
            className="font-display max-w-2xl text-center text-3xl font-bold text-[#c9a962] sm:text-4xl"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {t('trust.title')}
          </motion.h2>
        </div>

        <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-10 sm:flex-row sm:gap-14 lg:gap-20">
          {benefits.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              className="glass w-full max-w-md rounded-2xl border border-white/5 p-8 text-center transition-all duration-300 hover:border-[#c9a962]/30 sm:p-10"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              custom={i}
            >
              <div className="mx-auto mb-6 inline-flex rounded-xl bg-[#c9a962]/10 p-4">
                <Icon className="h-10 w-10 text-[#c9a962]" />
              </div>
              <h3 className="font-display text-xl font-semibold text-[#f5f0e6] sm:text-2xl">
                {t(`trust.${key}.title`)}
              </h3>
              <p className="mt-4 text-[#a3a3a3] leading-relaxed">{t(`trust.${key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
