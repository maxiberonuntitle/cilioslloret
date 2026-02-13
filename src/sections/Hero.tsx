/**
 * Hero - Sección de ventas principal
 * Headline emocional + CTA WhatsApp + Trust cues
 * Iconos alineados con sección Trust (User, Award, MapPin)
 */

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { User, MapPin } from 'lucide-react'
import { LashDecorations } from '@/components/LashDecorations'

const trustIcons = [
  { key: 'trust2', icon: User },
  { key: 'trust3', icon: MapPin },
] as const

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Fondo elegante con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#141414] to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,169,98,0.08)_0%,_transparent_50%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a962]/30 to-transparent" />
      <LashDecorations />

      {/* Imagen decorativa - desktop: derecha */}
      <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="h-72 w-72 overflow-hidden rounded-full border border-[#c9a962]/20">
          <img
            src="https://images.unsplash.com/photo-1716973004922-1f7d57fe265c?w=600&q=80"
            alt={t('hero.imageAlt')}
            className="h-full w-full object-cover opacity-25"
          />
        </div>
      </div>

      <div className="section-container relative mx-auto flex min-h-screen flex-col items-center justify-center gap-8 py-32 sm:gap-10 sm:py-40 lg:gap-12 lg:py-48">
        <motion.h1
          className="font-display max-w-4xl text-4xl font-bold leading-tight text-[#f5f0e6] sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('hero.headlineBefore')}
          <span className="text-[#c9a962]">{t('hero.headlineHighlight')}</span>
        </motion.h1>

        <motion.p
          className="max-w-2xl text-lg text-[#f5f0e6] sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('hero.subheadline')}
        </motion.p>

        <motion.div
          className="flex items-center gap-2 text-[#c9a962]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="text-sm font-medium sm:text-base">{t('hero.location')}</span>
        </motion.div>

        {/* Trust cues - Atención personalizada, Trabajo a domicilio */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-10 sm:mt-16 sm:gap-14 lg:gap-20"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15, delayChildren: 0.4 },
            },
          }}
        >
          {trustIcons.map(({ key, icon: Icon }) => (
            <motion.div
              key={key}
              className="flex flex-col items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-10 py-8 transition-colors duration-300 hover:border-[#c9a962]/20 sm:px-12 sm:py-10"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                },
              }}
            >
              <div className="inline-flex rounded-xl bg-[#c9a962]/10 p-3">
                <Icon className="h-8 w-8 text-[#c9a962]" />
              </div>
              <span className="text-sm font-medium text-[#f5f0e6]/90 sm:text-base">
                {t(`hero.${key}`)}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Imagen circular - mobile/tablet: debajo de las cards */}
        <div className="mt-12 flex justify-center lg:hidden">
          <div className="h-48 w-48 overflow-hidden rounded-full border border-[#c9a962]/20 sm:h-56 sm:w-56">
            <img
              src="https://images.unsplash.com/photo-1716973004922-1f7d57fe265c?w=600&q=80"
              alt={t('hero.imageAlt')}
              className="h-full w-full object-cover opacity-25"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
