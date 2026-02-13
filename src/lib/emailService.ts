/**
 * Servicio de envío de formulario por email
 * Usa Web3Forms - https://web3forms.com
 * Obtén tu access key en: https://web3forms.com (email: vanessagoncalves8384@gmail.com)
 */

const WEB3FORMS_URL = 'https://api.web3forms.com/submit'

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

  if (!accessKey) {
    console.error('VITE_WEB3FORMS_ACCESS_KEY no está configurado. Añade la clave en .env')
    return {
      success: false,
      message: 'Error de configuración. Por favor, contacta por WhatsApp.',
    }
  }

  try {
    const response = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Nuevo mensaje de Cílios Lloret - ${data.name}`,
        from_name: data.name,
        email: data.email,
        message: `Nombre: ${data.name}\nEmail: ${data.email}\n\nMensaje:\n${data.message}`,
        botcheck: '', // Campo oculto anti-spam
      }),
    })

    const result = await response.json()

    if (result.success) {
      return { success: true, message: result.message || 'Mensaje enviado correctamente.' }
    }

    return {
      success: false,
      message: result.message || 'Error al enviar. Intenta por WhatsApp.',
    }
  } catch (error) {
    console.error('Error enviando formulario:', error)
    return {
      success: false,
      message: 'Error de conexión. Por favor, escríbenos por WhatsApp.',
    }
  }
}
