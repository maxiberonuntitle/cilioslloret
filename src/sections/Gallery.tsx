/**
 * Galería — entradas antes/después y fotos sueltas
 * Lightbox premium, optimizada para mobile
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { fadeInUp, viewportConfig } from '@/lib/animations'
import { LashDecorations } from '@/components/LashDecorations'
import cilios1 from '@/assets/cilios1.jpeg'
import cilios2 from '@/assets/cilios2.jpeg'
import cilios3 from '@/assets/cilios3.jpeg'
import cilios4 from '@/assets/cilios4.jpeg'
import ciliosantes1 from '@/assets/ciliosantes1.jpeg'
import ciliosantes2 from '@/assets/ciliosantes2.jpeg'

type GalleryBeforeAfter = {
  id: number
  kind: 'beforeAfter'
  before: string
  after: string
}

type GallerySingle = {
  id: number
  kind: 'single'
  image: string
}

type GalleryItem = GalleryBeforeAfter | GallerySingle

const galleryItems: GalleryItem[] = [
  { id: 1, kind: 'beforeAfter', before: ciliosantes1, after: cilios1 },
  { id: 2, kind: 'beforeAfter', before: ciliosantes2, after: cilios2 },
  { id: 3, kind: 'single', image: cilios3 },
  { id: 4, kind: 'single', image: cilios4 },
]

function thumbSrc(item: GalleryItem): string {
  return item.kind === 'beforeAfter' ? item.after : item.image
}

export function Gallery() {
  const { t } = useTranslation()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const lightboxItem = lightboxIndex !== null ? galleryItems[lightboxIndex] : null

  const closeLightbox = () => setLightboxIndex(null)

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightboxIndex])

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

        <div className="grid w-full max-w-5xl grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 sm:justify-items-stretch sm:gap-10 lg:grid-cols-4 lg:gap-14">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              className="group w-full max-w-xs cursor-pointer overflow-hidden rounded-2xl border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.06)] sm:max-w-none"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              custom={i}
              onClick={() => setLightboxIndex(i)}
            >
              <div className="relative aspect-[4/3] bg-[#1a1a1a]">
                <img
                  src={thumbSrc(item)}
                  alt={t('gallery.resultAlt', { id: item.id })}
                  className="h-full w-full object-cover opacity-[0.62] transition-all duration-500 group-hover:scale-105 group-hover:opacity-[0.9]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-black/32 transition-colors duration-500 group-hover:bg-black/10"
                  aria-hidden
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span className="rounded-lg bg-[#c9a962]/90 px-5 py-2.5 text-sm font-medium text-black transition-transform duration-300 group-hover:scale-105">
                    {item.kind === 'beforeAfter'
                      ? t('gallery.viewBeforeAfter')
                      : t('gallery.viewImage')}
                  </span>
                </div>
              </div>
              <div className="flex items-center border-t border-white/5 bg-transparent px-5 py-4 transition-colors duration-300 sm:px-6 sm:py-5">
                {item.kind === 'beforeAfter' ? (
                  <>
                    <span className="text-xs text-[#737373] transition-colors duration-300 group-hover:text-[#a3a3a3]">
                      {t('gallery.before')}
                    </span>
                    <span className="mx-2 text-[#737373] transition-colors duration-300 group-hover:text-[#a3a3a3]">
                      →
                    </span>
                    <span className="text-xs text-[#c9a962] transition-colors duration-300 group-hover:text-[#e5d4a1]">
                      {t('gallery.after')}
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-[#c9a962]/90">{t('gallery.resultAlt', { id: item.id })}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={t('gallery.title')}
          >
            {/* Capa oscura: los toques aquí cierran (también en móvil). El contenido va encima con pointer-events-auto. */}
            <div
              className="fixed inset-0 z-0 bg-black/95"
              onClick={closeLightbox}
              aria-hidden
            />
            <div className="relative z-10 flex min-h-[100dvh] w-full flex-col items-center justify-center px-4 pb-10 pt-16 pointer-events-none sm:px-6 sm:py-10">
              <button
                type="button"
                onClick={closeLightbox}
                className="pointer-events-auto fixed right-3 top-3 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-white/25 active:bg-white/30 sm:right-4 sm:top-4"
                aria-label={t('gallery.close')}
              >
                <X className="h-7 w-7" strokeWidth={2.25} />
              </button>
              <motion.div
                className={
                  lightboxItem.kind === 'beforeAfter'
                    ? 'pointer-events-auto relative w-full max-w-4xl'
                    : 'pointer-events-auto relative w-full max-w-3xl'
                }
                initial={{ scale: 0.96 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                {lightboxItem.kind === 'beforeAfter' ? (
                  <div className="grid max-h-none gap-4 sm:grid-cols-2">
                    <div className="group/img-lb min-w-0">
                      <p className="mb-2 text-sm text-[#a3a3a3]">{t('gallery.before')}</p>
                      <img
                        src={lightboxItem.before}
                        alt={t('gallery.before')}
                        className="max-h-[min(42vh,420px)] w-full rounded-xl object-contain sm:max-h-[min(75vh,720px)]"
                      />
                    </div>
                    <div className="group/img-lb min-w-0">
                      <p className="mb-2 text-sm text-[#c9a962]">{t('gallery.after')}</p>
                      <img
                        src={lightboxItem.after}
                        alt={t('gallery.after')}
                        className="max-h-[min(42vh,420px)] w-full rounded-xl object-contain sm:max-h-[min(75vh,720px)]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="group/img-lb">
                    <img
                      src={lightboxItem.image}
                      alt={t('gallery.resultAlt', { id: lightboxItem.id })}
                      className="max-h-[min(85dvh,900px)] w-full rounded-xl object-contain transition-transform duration-300 group-hover/img-lb:scale-[1.02]"
                    />
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
