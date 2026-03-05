/**
 * Footer - Brand, copyright
 */

import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] py-24 sm:py-28">
      <div className="section-container mx-auto flex max-w-4xl flex-col items-center gap-14 sm:gap-16">
        <div className="text-center">
          <h3 className="font-logo text-2xl italic font-semibold text-[#c9a962] transition-colors duration-300 hover:text-[#e5d4a1] sm:text-3xl">
            {t('footer.brand')}
          </h3>
          <p className="mt-4 text-sm text-[#a3a3a3] sm:mt-5">{t('footer.tagline')}</p>
        </div>

        <div className="border-t border-white/5 pt-12 text-center text-sm text-[#737373] sm:pt-14">
          © {new Date().getFullYear()} Cílios Lloret · Lloret de Mar, Costa Brava
        </div>
      </div>
    </footer>
  )
}
