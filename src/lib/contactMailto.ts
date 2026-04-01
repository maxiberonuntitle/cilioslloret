/**
 * Abre el cliente de correo del usuario con destinatario y cuerpo rellenados.
 * Sin servidor ni configuración: el email de destino va en el código.
 *
 * Nota: el envío lo completa el usuario en su app de correo (Gmail, Outlook, etc.).
 */

export const CONTACT_EMAIL = 'vanessagoncalves8384@gmail.com' as const

/** Límite conservador para evitar URLs mailto demasiado largas en algunos navegadores */
const MAX_MAILTO_LENGTH = 1900

export interface ContactMailtoData {
  name: string
  email: string
  message: string
  /** Honeypot anti-spam; debe estar vacío */
  'bot-field'?: string
}

function buildHref(data: ContactMailtoData, messageBody: string): string {
  const subject = `Cílios Lloret · ${data.name}`
  const body = `Nombre: ${data.name}\nEmail: ${data.email}\n\nMensaje:\n${messageBody}`
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/**
 * Abre mailto:. Devuelve false si el honeypot está relleno (probable bot).
 */
export function openContactMailto(data: ContactMailtoData): boolean {
  if ((data['bot-field'] ?? '').trim() !== '') {
    return false
  }

  let body = data.message
  let href = buildHref(data, body)
  let guard = 0

  while (href.length > MAX_MAILTO_LENGTH && body.length > 20 && guard < 80) {
    guard += 1
    body = `${body.slice(0, -40).trimEnd()}\n\n[…]`
    href = buildHref(data, body)
  }

  if (href.length > MAX_MAILTO_LENGTH) {
    href = buildHref(data, '[…]')
  }

  window.location.href = href
  return true
}
