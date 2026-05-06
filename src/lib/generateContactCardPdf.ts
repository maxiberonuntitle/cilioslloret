/**
 * Tarjeta de contacto en PDF — miniatura circular (misma imagen que el hero),
 * marco dorado y detalle de pestañas solo sobre la marca.
 */

import { jsPDF } from 'jspdf'
import heroImageSrc from '@/assets/cilios1.jpeg'

type ContactCardData = {
  name: string
  whatsapp: string
  location: string
  brand: string
  tagline: string
}

const GOLD: [number, number, number] = [201, 169, 98]
const BG: [number, number, number] = [10, 10, 10]

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('No se pudo cargar la imagen de la tarjeta'))
    img.src = src
  })
}

/** Foto en círculo, recorte cover. Fondo previo al clip = mismo negro que la tarjeta (JPEG sin alpha). */
function createHeroCircularThumbDataUrl(img: HTMLImageElement, diameterMm: number): string {
  const pxPerMm = 10
  const w = Math.round(diameterMm * pxPerMm)
  const r = w / 2
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = w
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = `rgb(${BG.join(',')})`
  ctx.fillRect(0, 0, w, w)

  ctx.beginPath()
  ctx.arc(r, r, r - 0.25, 0, Math.PI * 2)
  ctx.clip()

  const iw = img.naturalWidth
  const ih = img.naturalHeight
  const scale = Math.max(w / iw, w / ih)
  const dw = iw * scale
  const dh = ih * scale
  const ox = (w - dw) / 2
  const oy = (w - dh) / 2
  ctx.drawImage(img, ox, oy, dw, dh)

  return canvas.toDataURL('image/jpeg', 0.9)
}

/** Abanico de curvas sobre la línea de la “cuenca”, inspirado en el patrón SVG del sitio. */
function drawLashAccent(doc: jsPDF, centerX: number, baseY: number, spreadMm: number) {
  const ctx = doc.context2d
  ctx.save()
  ctx.strokeStyle = `rgb(${GOLD.join(',')})`
  ctx.globalAlpha = 0.5
  ctx.lineWidth = 0.16
  ctx.lineCap = 'round'
  const count = 9
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1)
    const x0 = centerX - spreadMm / 2 + t * spreadMm
    const curl = (t - 0.5) * 1.3
    ctx.beginPath()
    ctx.moveTo(x0, baseY)
    ctx.quadraticCurveTo(x0 + curl * 0.9, baseY - 3.4, x0 + curl * 1.35, baseY - 7.8)
    ctx.stroke()
  }
  ctx.restore()
}

async function buildPdfDoc(data: ContactCardData) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [85, 55],
  })

  const m = 3.8
  /** Mitad del ancho de la foto anterior (~27,5 mm); forma circular. */
  const photoD = 27.5 / 2
  const photoX = m
  const photoY = (55 - photoD) / 2
  const gutter = 4
  const contentLeft = photoX + photoD + gutter
  const contentRight = 85 - m
  const contentCenterX = (contentLeft + contentRight) / 2
  const textMaxW = contentRight - contentLeft - 1.5

  doc.setFillColor(BG[0], BG[1], BG[2])
  doc.rect(0, 0, 85, 55, 'F')

  const img = await loadImage(heroImageSrc)
  const thumb = createHeroCircularThumbDataUrl(img, photoD)
  doc.addImage(thumb, 'JPEG', photoX, photoY, photoD, photoD)

  const photoCx = photoX + photoD / 2
  const photoCy = photoY + photoD / 2
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2])
  doc.setLineWidth(0.3)
  doc.circle(photoCx, photoCy, photoD / 2, 'S')

  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2])
  doc.setLineWidth(0.22)
  doc.roundedRect(m * 0.7, m * 0.7, 85 - m * 1.4, 55 - m * 1.4, 1.6, 1.6, 'S')

  const lashBaseY = m + 9.2
  drawLashAccent(doc, contentCenterX, lashBaseY, 17)

  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2])
  doc.setFontSize(12)
  doc.setFont('helvetica', 'italic')
  doc.text(data.brand, contentCenterX, m + 15.2, { align: 'center' })

  doc.setTextColor(163, 163, 163)
  doc.setFontSize(5.4)
  doc.setFont('helvetica', 'normal')
  const taglineLines = doc.splitTextToSize(data.tagline, textMaxW)
  let tagY = m + 19.6
  const lineGap = 3.1
  for (const line of taglineLines) {
    doc.text(line, contentCenterX, tagY, { align: 'center' })
    tagY += lineGap
  }

  const ruleY = Math.max(tagY + 1.2, m + 23)
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2])
  doc.setLineWidth(0.14)
  doc.line(contentLeft + 1.5, ruleY, contentRight - 1.5, ruleY)

  const blockStart = ruleY + 5.5
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2])
  doc.setFontSize(7.6)
  doc.setFont('helvetica', 'bold')
  doc.text(data.name, contentCenterX, blockStart, { align: 'center' })

  doc.setTextColor(37, 211, 102)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text(data.whatsapp, contentCenterX, blockStart + 6.8, { align: 'center' })

  doc.setTextColor(245, 240, 230)
  doc.setFontSize(6.9)
  const locLines = doc.splitTextToSize(data.location, textMaxW)
  let locY = blockStart + 12.5
  for (const line of locLines) {
    doc.text(line, contentCenterX, locY, { align: 'center' })
    locY += 3.3
  }

  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2])
  doc.setLineWidth(0.24)
  doc.line(contentLeft + 2, 55 - m - 4.2, contentRight - 2, 55 - m - 4.2)

  return doc
}

export async function getContactCardPdfBlob(data: ContactCardData): Promise<Blob> {
  const pdf = await buildPdfDoc(data)
  return pdf.output('blob')
}

export async function generateContactCardPdf(data: ContactCardData): Promise<void> {
  const pdf = await buildPdfDoc(data)
  pdf.save('Cilios-Lloret-tarjeta.pdf')
}
