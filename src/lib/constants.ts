/**
 * Constantes del negocio - Cílios Lloret
 * Centralizadas para fácil mantenimiento
 */

export const WHATSAPP_NUMBER = '34601877214'
export const WHATSAPP_MESSAGE = 'Hola, quiero reservar una cita en Cílios Lloret'

export const getWhatsAppUrl = (customMessage?: string) => {
  const message = encodeURIComponent(customMessage || WHATSAPP_MESSAGE)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
}

export const BRAND = {
  name: 'Cílios Lloret',
  owner: 'Vanessa Gonçalvez',
  location: 'Lloret de Mar, Costa Brava',
  phone: '+34 601 877 214',
}
