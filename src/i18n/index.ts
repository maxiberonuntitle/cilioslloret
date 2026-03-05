/**
 * Configuración i18n - Cilios Lloret
 * Idiomas: Español, Português (Brasil), Català
 */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from './locales/es.json'
import pt from './locales/pt.json'
import ca from './locales/ca.json'

const resources = {
  es: { translation: es },
  pt: { translation: pt },
  ca: { translation: ca },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt',
  fallbackLng: 'pt',
  interpolation: {
    escapeValue: false, // React ya escapa
  },
})

export default i18n
