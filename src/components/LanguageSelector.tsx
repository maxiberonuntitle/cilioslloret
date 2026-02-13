/**
 * Selector de idioma - ES, CA, PT
 * Cambio instantáneo, visible en footer
 */

import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'pt', label: 'Português' },
  { code: 'es', label: 'Español' },
  { code: 'ca', label: 'Català' },
] as const

export function LanguageSelector() {
  const { i18n } = useTranslation()

  return (
    <div className="flex gap-1 rounded-lg border border-white/10 bg-white/5 p-1">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => i18n.changeLanguage(code)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-300 sm:px-3 sm:py-1.5 sm:text-sm ${
            i18n.language === code
              ? 'bg-[#c9a962]/30 text-[#c9a962]'
              : 'text-[#a3a3a3] hover:bg-white/5 hover:text-[#f5f0e6]'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
