/**
 * Hero - Sección de ventas principal
 * Headline emocional + CTA WhatsApp + Trust cues
 * Iconos de confianza (User, MapPin)
 */

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { User, MapPin } from 'lucide-react'
import { LashDecorations } from '@/components/LashDecorations'
import heroImage from '@/assets/cilios1.jpeg'

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
        <div className="group/img h-72 w-72 overflow-hidden rounded-full border border-white/15 transition-all duration-300 hover:border-white/28 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.08)]">
          <img
            src={heroImage}
            alt={t('hero.imageAlt')}
            className="h-full w-full object-cover opacity-[0.32] transition-all duration-500 group-hover/img:scale-105 group-hover/img:opacity-[0.44]"
          />
        </div>
      </div>

      <div className="section-container relative mx-auto flex min-h-screen w-full min-w-0 flex-col items-center justify-center gap-8 py-28 sm:gap-10 sm:py-40 lg:gap-12 lg:py-48">
        <motion.h1
          className="font-display mx-auto w-full min-w-0 max-w-[min(100%,42rem)] text-balance text-center text-[clamp(1.75rem,5.2vw+0.65rem,3.75rem)] font-bold leading-[1.12] tracking-tight text-[#f5f0e6] sm:max-w-4xl sm:leading-[1.1] md:text-6xl md:leading-[1.08] lg:max-w-5xl lg:text-7xl lg:leading-[1.06]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('hero.headlineBefore')}
          <span className="text-[#c9a962]">{t('hero.headlineHighlight')}</span>
        </motion.h1>

        <motion.p
          className="w-full max-w-2xl text-pretty text-center text-base leading-relaxed text-[#f5f0e6]/95 sm:text-lg sm:leading-relaxed md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('hero.subheadline')}
        </motion.p>

        <motion.div
          className="flex max-w-full cursor-default flex-wrap items-center justify-center gap-x-2 gap-y-1 px-1 text-center text-[#c9a962] transition-colors duration-300 hover:text-[#e5d4a1] sm:gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <MapPin className="h-5 w-5 shrink-0 sm:h-5 sm:w-5" />
          <span className="text-sm font-medium sm:text-base">{t('hero.location')}</span>
        </motion.div>

        {/* Trust cues - Atención personalizada, Trabajo a domicilio */}
        <motion.div
          className="mt-12 flex w-full max-w-2xl flex-wrap justify-center gap-8 sm:mt-16 sm:max-w-none sm:gap-14 lg:gap-20"
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
              className="group relative w-full min-w-0 max-w-[20rem] rounded-2xl bg-transparent transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.06)] sm:w-auto sm:max-w-none"
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
              <div className="flex flex-col items-center gap-4 px-8 py-10 sm:gap-5 sm:px-12 sm:py-12 lg:px-14 lg:py-14">
                <div className="inline-flex rounded-xl bg-transparent p-4 transition-all duration-300 group-hover:scale-105 sm:p-5">
                  <Icon className="h-8 w-8 text-[#c9a962] transition-all duration-300 group-hover:text-[#e5d4a1] sm:h-9 sm:w-9" />
                </div>
                <span className="text-balance px-1 text-center text-sm font-medium leading-snug text-[#f5f0e6]/90 sm:px-0 sm:text-base">
                  {t(`hero.${key}`)}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Imagen circular - mobile/tablet: debajo de las cards */}
        <div className="mt-12 flex justify-center lg:hidden">
          <div className="group/img-mob h-48 w-48 overflow-hidden rounded-full border border-white/15 transition-all duration-300 hover:border-white/28 sm:h-56 sm:w-56">
            <img
              src={heroImage}
              alt={t('hero.imageAlt')}
              className="h-full w-full object-cover opacity-[0.32] transition-all duration-500 group-hover/img-mob:scale-105 group-hover/img-mob:opacity-[0.44]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
