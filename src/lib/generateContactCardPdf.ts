/**
 * Genera una tarjeta de contacto en PDF - diseño negro y dorado
 */

import { jsPDF } from 'jspdf'

type ContactCardData = {
  name: string
  whatsapp: string
  location: string
  brand: string
  tagline: string
}

function buildPdfDoc(data: ContactCardData) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [85, 55], // Tarjeta de visita estándar
  })

  // Fondo negro
  doc.setFillColor(10, 10, 10)
  doc.rect(0, 0, 85, 55, 'F')

  // Borde dorado sutil
  doc.setDrawColor(201, 169, 98)
  doc.setLineWidth(0.3)
  doc.rect(2, 2, 81, 51)

  // Línea decorativa superior
  doc.setDrawColor(201, 169, 98)
  doc.setLineWidth(0.5)
  doc.line(10, 8, 75, 8)

  // Marca - Cílios Lloret (dorado, cursiva simulada)
  doc.setTextColor(201, 169, 98)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'italic')
  doc.text(data.brand, 42.5, 18, { align: 'center' })

  // Tagline
  doc.setTextColor(163, 163, 163)
  doc.setFontSize(6)
  doc.setFont('helvetica', 'normal')
  doc.text(data.tagline, 42.5, 23, { align: 'center' })

  // Línea separadora
  doc.setDrawColor(201, 169, 98)
  doc.setLineWidth(0.2)
  doc.line(15, 26, 70, 26)

  // Nombre
  doc.setTextColor(201, 169, 98)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text(data.name, 42.5, 32, { align: 'center' })

  // WhatsApp
  doc.setTextColor(37, 211, 102) // Verde WhatsApp
  doc.setFontSize(10)
  doc.text(data.whatsapp, 42.5, 38, { align: 'center' })

  // Ubicación
  doc.setTextColor(245, 240, 230)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text(data.location, 42.5, 44, { align: 'center' })

  // Línea inferior decorativa
  doc.setDrawColor(201, 169, 98)
  doc.setLineWidth(0.3)
  doc.line(15, 50, 70, 50)

  return doc
}

export function getContactCardPdfBlob(data: ContactCardData): Blob {
  const doc = buildPdfDoc(data)
  return doc.output('blob')
}

export function generateContactCardPdf(data: ContactCardData) {
  const doc = buildPdfDoc(data)
  doc.save('Cilios-Lloret-tarjeta.pdf')
}
