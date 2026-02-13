/**
 * Navbar - Transparente al inicio, cambia al scroll
 * CTA destacado: Reservar por WhatsApp
 * Mobile: menú hamburguesa premium
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LanguageSelector } from './LanguageSelector'

const navLinks = [
  { key: 'services', href: '#servicios' },
  { key: 'gallery', href: '#galeria' },
  { key: 'contact', href: '#contacto' },
] as const

const languages = [
  { code: 'pt', label: 'Português' },
  { code: 'es', label: 'Español' },
  { code: 'ca', label: 'Català' },
] as const

export function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
          scrolled ? 'glass border-b border-white/5 py-5 sm:py-6' : 'bg-transparent py-12 sm:py-14'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-container mx-auto w-full">
          <nav className="flex items-center justify-between gap-8">
            <div className="shrink-0 pl-4 sm:pl-6 lg:pl-8">
              <Link
                to="/"
                className={`font-logo block italic font-semibold text-[#c9a962] transition-all duration-300 ${
                  scrolled ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'
                }`}
              >
                {t('nav.logo')}
              </Link>
            </div>

          {/* Desktop */}
            <div className="hidden items-center gap-8 md:flex">
            {navLinks.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="text-base font-medium text-[#f5f0e6]/90 transition-colors duration-300 hover:text-[#c9a962]"
              >
                {t(`nav.${key}`)}
              </a>
            ))}
            <LanguageSelector />
          </div>

          {/* Mobile: selector idioma + menú hamburguesa */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex gap-1 rounded-lg border border-[#c9a962]/40 bg-[#c9a962]/5 p-1.5">
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => i18n.changeLanguage(code)}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-medium uppercase transition-all ${
                    i18n.language === code
                      ? 'bg-[#c9a962] text-black'
                      : 'text-[#c9a962]/70 hover:text-[#c9a962]'
                  }`}
                  title={label}
                >
                  {code}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-3 text-[#c9a962] hover:bg-[#c9a962]/10"
              aria-label={t('nav.openMenu')}
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              className="flex h-full flex-col items-center justify-center gap-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute right-4 top-4 flex items-center gap-4">
                <LanguageSelector />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-2 text-[#f5f0e6] hover:bg-white/5"
                  aria-label={t('nav.closeMenu')}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {navLinks.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-2xl text-[#f5f0e6] transition-colors duration-300 hover:text-[#c9a962]"
                >
                  {t(`nav.${key}`)}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
