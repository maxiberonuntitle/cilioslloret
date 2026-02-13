/**
 * SEO - Meta tags, Open Graph, Schema.org LocalBusiness
 * Optimizado para compartir en WhatsApp y búsqueda local
 */

import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const SITE_URL = 'https://cilioslloret.com'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

interface SEOProps {
  title?: string
  description?: string
  image?: string
  lang?: string
}

export function SEO({
  title,
  description,
  image = DEFAULT_IMAGE,
  lang,
}: SEOProps) {
  const { t, i18n } = useTranslation()
  const currentLang = lang ?? i18n.language
  const seoTitle = title ?? t('seo.title')
  const seoDescription = description ?? t('seo.description')
  const seoKeywords = t('seo.keywords')

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Cílios Lloret',
    description: seoDescription,
    url: SITE_URL,
    telephone: '+34601877214',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lloret de Mar',
      addressRegion: 'Girona',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.6999,
      longitude: 2.8456,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '20:00',
    },
  }

  return (
    <Helmet>
      <html lang={currentLang} />
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph - WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={currentLang === 'es' ? 'es_ES' : currentLang === 'ca' ? 'ca_ES' : 'pt_PT'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org */}
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
