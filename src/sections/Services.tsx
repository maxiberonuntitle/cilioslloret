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

        <div className="grid w-full max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-12">
          {services.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              className="group relative w-[min(100%,20rem)] justify-self-center overflow-hidden rounded-2xl bg-transparent transition-all duration-300 ease-out hover:-translate-y-1 group-hover:bg-[#f5f0e6] group-hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)] sm:w-full sm:max-w-none sm:justify-self-stretch"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              custom={i}
            >
              <div className="flex flex-col items-center px-7 pb-12 pt-10 text-center sm:px-8 sm:pb-14 sm:pt-11 lg:px-9 lg:pb-16 lg:pt-12">
                <div className="mb-4 inline-flex w-fit shrink-0 rounded-xl p-4 transition-all duration-300 group-hover:scale-110 sm:mb-5 sm:p-5">
                  <Icon
                    className="h-8 w-8 text-[#c9a962] transition-colors duration-300 group-hover:text-[#0a0a0a] sm:h-9 sm:w-9"
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="font-display text-lg font-semibold leading-snug text-[#f5f0e6] transition-colors duration-300 group-hover:text-[#0a0a0a]">
                  {t(`services.${key}`)}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-[#a3a3a3] transition-colors duration-300 group-hover:text-[#525252] sm:mt-4 sm:text-sm">
                  {t(`services.${key}Desc`)}
                </p>

                <a
                  href={getWhatsAppUrl(`Hola, me interesa el servicio de ${t(`services.${key}`)} en Cílios Lloret`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full max-w-[16rem] items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-xs font-semibold text-[#c9a962] transition-all duration-300 group-hover:bg-[#0a0a0a] group-hover:text-[#f5f0e6] hover:scale-[1.02] group-hover:hover:bg-[#c9a962] group-hover:hover:text-black group-hover:hover:shadow-[0_0_20px_-5px_rgba(201,169,98,0.45)] sm:mt-7 sm:max-w-none sm:px-6 sm:py-3.5"
                >
                  {t('services.cta')}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
