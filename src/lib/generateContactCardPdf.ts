/**
 * Tarjeta de contacto en PDF — layout con miniatura (misma imagen que el hero),
 * marco dorado y detalles que sugieren pestañas (curvas tipo LashPattern).
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

/** Miniatura con recorte “cover”, esquinas redondeadas y velos suaves (lado texto y base). */
function createHeroThumbnailDataUrl(
  img: HTMLImageElement,
  widthMm: number,
  heightMm: number,
  radiusMm: number,
): string {
  const pxPerMm = 10
  const w = Math.round(widthMm * pxPerMm)
  const h = Math.round(heightMm * pxPerMm)
  const r = Math.max(2, Math.round(radiusMm * pxPerMm))
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.beginPath()
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(0, 0, w, h, r)
  } else {
    ctx.rect(0, 0, w, h)
  }
  ctx.clip()

  const iw = img.naturalWidth
  const ih = img.naturalHeight
  const scale = Math.max(w / iw, h / ih)
  const dw = iw * scale
  const dh = ih * scale
  const ox = (w - dw) / 2
  const oy = (h - dh) / 2
  ctx.drawImage(img, ox, oy, dw, dh)

  const vg = ctx.createLinearGradient(0, h * 0.5, 0, h)
  vg.addColorStop(0, 'rgba(0,0,0,0)')
  vg.addColorStop(1, 'rgba(8,6,5,0.42)')
  ctx.fillStyle = vg
  ctx.fillRect(0, 0, w, h)

  const hg = ctx.createLinearGradient(w * 0.5, 0, w, 0)
  hg.addColorStop(0, 'rgba(0,0,0,0)')
  hg.addColorStop(1, 'rgba(0,0,0,0.38)')
  ctx.fillStyle = hg
  ctx.fillRect(0, 0, w, h)

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

/** Textura muy suave de pestañas en la zona del texto (como el patrón de fondo de la web). */
function drawBackgroundLashTexture(doc: jsPDF) {
  const ctx = doc.context2d
  ctx.save()
  ctx.strokeStyle = `rgb(${GOLD.join(',')})`
  ctx.globalAlpha = 0.09
  ctx.lineWidth = 0.11
  ctx.lineCap = 'round'
  const baseX0 = 37
  const baseY0 = 26
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const x = baseX0 + col * 8.2 + (row % 2) * 2.5
      const y = baseY0 + row * 6.2
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.quadraticCurveTo(x + 1.8 + col * 0.08, y + 4.5, x - 0.6, y + 10.5)
      ctx.stroke()
    }
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
  const photoW = 27.5
  const photoH = 47.4
  const photoX = m
  const photoY = m
  const gutter = 4
  const contentLeft = photoX + photoW + gutter
  const contentRight = 85 - m
  const contentCenterX = (contentLeft + contentRight) / 2
  const textMaxW = contentRight - contentLeft - 1.5

  doc.setFillColor(BG[0], BG[1], BG[2])
  doc.rect(0, 0, 85, 55, 'F')

  drawBackgroundLashTexture(doc)

  const img = await loadImage(heroImageSrc)
  const thumb = createHeroThumbnailDataUrl(img, photoW, photoH, 2.4)
  doc.addImage(thumb, 'JPEG', photoX, photoY, photoW, photoH)

  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2])
  doc.setLineWidth(0.32)
  doc.roundedRect(photoX, photoY, photoW, photoH, 2.3, 2.3, 'S')

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
