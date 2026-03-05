/**
 * Galería - Antes/Después
 * Lightbox premium, optimizada para mobile
 * Placeholder para imágenes reales
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { fadeInUp, viewportConfig } from '@/lib/animations'
import { LashDecorations } from '@/components/LashDecorations'

// Imágenes antes/después - ojos con extensiones de pestañas (Unsplash, licencia libre)
// Antes: ojos naturales / Después: ojos con pestañas extendidas
const galleryItems = [
  {
    id: 1,
    before: 'https://images.unsplash.com/photo-1534627425233-f7d6335ca734?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1716973004922-1f7d57fe265c?w=600&q=80',
  },
  {
    id: 2,
    before: 'https://images.unsplash.com/photo-1633692389064-34103a2b037c?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1637552481486-cb993bdde88f?w=600&q=80',
  },
  {
    id: 3,
    before: 'https://images.unsplash.com/photo-1483519173755-be893fab1f46?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1674049406467-824ea37c7184?w=600&q=80',
  },
  {
    id: 4,
    before: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
  },
]

export function Gallery() {
  const { t } = useTranslation()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <section id="galeria" className="section-spacing relative overflow-hidden">
      <LashDecorations />
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
              {t('gallery.title')}
            </h2>
            <p className="mt-6 text-[#c9a962]/85">{t('gallery.subtitle')}</p>
          </motion.div>
        </div>

        <div className="grid w-full max-w-5xl grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-14">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              className="group w-full max-w-xs cursor-pointer overflow-hidden rounded-2xl border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a962]/30 hover:shadow-[0_0_30px_-10px_rgba(201,169,98,0.2)] sm:max-w-sm"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              custom={i}
              onClick={() => setLightboxIndex(i)}
            >
              <div className="relative aspect-[4/3] bg-[#1a1a1a]">
                <img
                  src={item.after}
                  alt={t('gallery.resultAlt', { id: item.id })}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span className="rounded-lg bg-[#c9a962]/90 px-5 py-2.5 text-sm font-medium text-black transition-transform duration-300 group-hover:scale-105">
                    {t('gallery.viewBeforeAfter')}
                  </span>
                </div>
              </div>
              <div className="flex border-t border-white/5 p-4 transition-colors duration-300 group-hover:bg-white/[0.02] sm:p-5">
                <span className="text-xs text-[#737373] transition-colors duration-300 group-hover:text-[#a3a3a3]">{t('gallery.before')}</span>
                <span className="mx-2 text-[#737373] transition-colors duration-300 group-hover:text-[#a3a3a3]">→</span>
                <span className="text-xs text-[#c9a962] transition-colors duration-300 group-hover:text-[#e5d4a1]">{t('gallery.after')}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              className="relative max-w-4xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-12 right-0 rounded-lg p-2 text-white transition-all duration-200 hover:scale-110 hover:bg-white/10"
                aria-label={t('gallery.close')}
              >
                <X className="h-8 w-8" />
              </button>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="group/img-lb">
                  <p className="mb-2 text-sm text-[#a3a3a3]">{t('gallery.before')}</p>
                  <img
                    src={galleryItems[lightboxIndex].before}
                    alt={t('gallery.before')}
                    className="rounded-xl transition-transform duration-300 group-hover/img-lb:scale-[1.02]"
                  />
                </div>
                <div className="group/img-lb">
                  <p className="mb-2 text-sm text-[#c9a962]">{t('gallery.after')}</p>
                  <img
                    src={galleryItems[lightboxIndex].after}
                    alt={t('gallery.after')}
                    className="rounded-xl transition-transform duration-300 group-hover/img-lb:scale-[1.02]"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
