/**
 * Selector de idioma - Español, Português (Brasil), Català
 * Desktop: icono globo (blanco); móvil: pestañas con etiquetas
 */

import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

const languages = [
  { code: 'pt', label: 'Português' },
  { code: 'es', label: 'Español' },
  { code: 'ca', label: 'Català' },
] as const

function isActiveLang(current: string, code: string) {
  return current === code || current.startsWith(`${code}-`)
}

type LanguageSelectorProps = {
  /** `icon`: solo globo + menú desplegable (navbar desktop) */
  variant?: 'default' | 'icon'
}

export function LanguageSelector({ variant = 'default' }: LanguageSelectorProps) {
  const { i18n, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handlePointerDown)
      document.addEventListener('touchstart', handlePointerDown)
    }
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [open])

  if (variant === 'icon') {
    return (
      <div className="relative" ref={containerRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={t('nav.language')}
          className="rounded-lg p-2 text-white transition-all duration-200 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
        >
          <Globe className="h-6 w-6" strokeWidth={1.75} aria-hidden />
        </button>
        {open && (
          <ul
            role="listbox"
            className="absolute right-0 top-full z-[60] mt-2 min-w-[11rem] rounded-lg border border-white/10 bg-[#141414]/95 py-1 shadow-xl backdrop-blur-md"
          >
            {languages.map(({ code, label }) => (
              <li key={code} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isActiveLang(i18n.language, code)}
                  onClick={() => {
                    void i18n.changeLanguage(code)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center px-4 py-2.5 text-left text-sm transition-all duration-200 ${
                    isActiveLang(i18n.language, code)
                      ? 'bg-[#c9a962]/20 font-medium text-[#c9a962]'
                      : 'text-[#a3a3a3] hover:bg-white/10 hover:text-[#f5f0e6]'
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  return (
    <div className="flex gap-1.5 rounded-lg border border-white/10 bg-white/5 p-1.5 sm:gap-2 sm:p-2">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => i18n.changeLanguage(code)}
          className={`rounded-md px-3 py-2 text-xs font-medium transition-all duration-300 sm:px-4 sm:py-2.5 sm:text-sm ${
            isActiveLang(i18n.language, code)
              ? 'bg-[#c9a962]/30 text-[#c9a962]'
              : 'text-[#a3a3a3] hover:scale-105 hover:bg-white/10 hover:text-[#f5f0e6]'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
