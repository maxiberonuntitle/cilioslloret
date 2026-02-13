/**
 * Footer - Brand, copyright
 */

import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] py-20">
      <div className="section-container mx-auto flex max-w-4xl flex-col items-center gap-12">
        <div className="text-center">
          <h3 className="font-logo text-2xl italic font-semibold text-[#c9a962]">
            {t('footer.brand')}
          </h3>
          <p className="mt-3 text-sm text-[#a3a3a3]">{t('footer.tagline')}</p>
        </div>

        <div className="border-t border-white/5 pt-10 text-center text-sm text-[#737373]">
          © {new Date().getFullYear()} Cílios Lloret · Lloret de Mar, Costa Brava
        </div>
      </div>
    </footer>
  )
}
