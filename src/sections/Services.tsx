/**
 * Servicios - Cards con descripción y CTA
 * Extensiones, Volumen, Clásicas
 */

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Eye, Layers, Sparkles } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/constants'
import { fadeInUp, viewportConfig } from '@/lib/animations'
import { LashPatternSides } from '@/components/LashPatternSides'

const services = [
  { key: 'extensions', icon: Eye },
  { key: 'volume', icon: Layers },
  { key: 'classic', icon: Sparkles },
] as const

export function Services() {
  const { t } = useTranslation()

  return (
    <section id="servicios" className="section-spacing relative">
      <LashPatternSides opacity={0.055} />
      <div className="section-container relative mx-auto flex flex-col items-center">
        <div className="section-title-spacing">
          <motion.div
            className="max-w-2xl text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <h2 className="font-display text-3xl font-bold text-[#c9a962] sm:text-4xl">
              {t('services.title')}
            </h2>
            <p className="mt-6 text-[#c9a962]/85">{t('services.subtitle')}</p>
          </motion.div>
        </div>

        <div className="grid w-full max-w-4xl grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-12">
          {services.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              className="group relative flex aspect-square min-h-[180px] max-w-[240px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-[#1a1a1a] to-[#141414] p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a962]/40 hover:shadow-[0_0_50px_-10px_rgba(201,169,98,0.25)] sm:min-h-[200px] sm:max-w-[260px] sm:p-8"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              custom={i}
            >
              {/* Línea decorativa superior */}
              <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9a962]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="mb-5 inline-flex w-fit rounded-xl bg-[#c9a962]/10 p-4 ring-1 ring-[#c9a962]/10 transition-all duration-300 group-hover:bg-[#c9a962]/20 group-hover:ring-[#c9a962]/30 group-hover:scale-110 sm:mb-6 sm:p-5">
                <Icon className="h-8 w-8 text-[#c9a962] transition-colors duration-300 group-hover:text-[#e5d4a1] sm:h-9 sm:w-9" strokeWidth={1.5} />
              </div>

              <h3 className="font-display text-lg font-semibold text-[#f5f0e6]">
                {t(`services.${key}`)}
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-[#a3a3a3] sm:mt-4">
                {t(`services.${key}Desc`)}
              </p>

              <a
                href={getWhatsAppUrl(`Hola, me interesa el servicio de ${t(`services.${key}`)} en Cílios Lloret`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#c9a962]/10 px-5 py-3 text-xs font-semibold text-[#c9a962] ring-1 ring-[#c9a962]/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#c9a962] hover:text-black hover:ring-[#c9a962] hover:shadow-[0_0_20px_-5px_rgba(201,169,98,0.4)] sm:mt-7 sm:px-6 sm:py-3.5"
              >
                {t('services.cta')}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
