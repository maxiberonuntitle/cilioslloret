/**
 * Configuración i18n - Cilios Lloret
 * Idiomas: Español (default), Catalán, Portugués
 * Optimizado para SEO multiidioma
 */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from './locales/es.json'
import ca from './locales/ca.json'
import pt from './locales/pt.json'

const resources = {
  es: { translation: es },
  ca: { translation: ca },
  pt: { translation: pt },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false, // React ya escapa
  },
})

export default i18n
