/**
 * Tarjeta de contacto en PDF — diseño tipo alta papelería:
 * marco doble continuo, panel de texto, foto circular con doble aro y acento de pestañas sobre la marca.
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
/** Dorado más claro para líneas secundarias del marco y anillo interior. */
const GOLD_LIGHT: [number, number, number] = [220, 195, 135]
const BG: [number, number, number] = [10, 10, 10]
const PANEL_BG: [number, number, number] = [15, 14, 13]
const TEXT_MUTED: [number, number, number] = [150, 145, 135]
const TEXT_WARM: [number, number, number] = [248, 244, 236]

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('No se pudo cargar la imagen de la tarjeta'))
    img.src = src
  })
}

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

/** Marco exterior doble (líneas cerradas, sin segmentos sueltos). */
function drawDoublePortraitFrame(
  doc: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  outerR: number,
  innerR: number,
  insetMm: number,
) {
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2])
  doc.setLineWidth(0.38)
  doc.roundedRect(x, y, w, h, outerR, outerR, 'S')

  doc.setDrawColor(GOLD_LIGHT[0], GOLD_LIGHT[1], GOLD_LIGHT[2])
  doc.setLineWidth(0.11)
  doc.roundedRect(
    x + insetMm,
    y + insetMm,
    w - insetMm * 2,
    h - insetMm * 2,
    innerR,
    innerR,
    'S',
  )
}

/** Aro doble alrededor de la fotografía. */
function drawPhotoHalo(doc: jsPDF, cx: number, cy: number, radiusMm: number) {
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2])
  doc.setLineWidth(0.32)
  doc.circle(cx, cy, radiusMm + 0.28, 'S')

  doc.setDrawColor(GOLD_LIGHT[0], GOLD_LIGHT[1], GOLD_LIGHT[2])
  doc.setLineWidth(0.13)
  doc.circle(cx, cy, radiusMm - 0.22, 'S')
}

function drawLashAccent(doc: jsPDF, centerX: number, baseY: number, spreadMm: number) {
  const ctx = doc.context2d
  ctx.save()
  ctx.strokeStyle = `rgb(${GOLD.join(',')})`
  ctx.globalAlpha = 0.42
  ctx.lineWidth = 0.15
  ctx.lineCap = 'round'
  const count = 9
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1)
    const x0 = centerX - spreadMm / 2 + t * spreadMm
    const curl = (t - 0.5) * 1.25
    ctx.beginPath()
    ctx.moveTo(x0, baseY)
    ctx.quadraticCurveTo(x0 + curl * 0.85, baseY - 3.2, x0 + curl * 1.28, baseY - 7.4)
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

  const innerPad = 4
  const photoD = 27.5 / 2
  const photoR = photoD / 2
  const photoX = innerPad + 1.2
  const photoY = (55 - photoD) / 2
  const photoCx = photoX + photoR
  const photoCy = photoY + photoR

  const gutter = 5
  const contentLeft = photoX + photoD + gutter
  const contentRight = 85 - innerPad - 1.2
  const textMaxW = contentRight - contentLeft - 3
  const contentCenterX = (contentLeft + contentRight) / 2

  const frameX = 1.4
  const frameY = 1.4
  const frameW = 85 - 2.8
  const frameH = 55 - 2.8
  const frameInset = 1.05

  const panelPadLeft = 2.2
  const panelPadRight = 2.2
  const panelX = contentLeft - panelPadLeft
  const panelY = innerPad + 0.5
  const panelW = contentRight - panelX + panelPadRight
  const panelH = 55 - panelY - innerPad - 0.5
  const panelR = 2.8

  doc.setFillColor(BG[0], BG[1], BG[2])
  doc.rect(0, 0, 85, 55, 'F')

  doc.setFillColor(PANEL_BG[0], PANEL_BG[1], PANEL_BG[2])
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2])
  doc.setLineWidth(0.14)
  doc.roundedRect(panelX, panelY, panelW, panelH, panelR, panelR, 'FD')

  const img = await loadImage(heroImageSrc)
  const thumb = createHeroCircularThumbDataUrl(img, photoD)
  doc.addImage(thumb, 'JPEG', photoX, photoY, photoD, photoD)

  drawPhotoHalo(doc, photoCx, photoCy, photoR)

  const padTop = panelY + 3.4
  const lashBaseY = padTop + 5
  drawLashAccent(doc, contentCenterX, lashBaseY, 16)

  let y = padTop + 12.5
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2])
  doc.setFontSize(11.8)
  doc.setFont('helvetica', 'italic')
  doc.text(data.brand, contentCenterX, y, { align: 'center' })

  y += 5.2
  doc.setTextColor(TEXT_MUTED[0], TEXT_MUTED[1], TEXT_MUTED[2])
  doc.setFontSize(5.2)
  doc.setFont('helvetica', 'normal')
  const taglineLines = doc.splitTextToSize(data.tagline, textMaxW)
  const tagLineGap = 2.9
  for (const line of taglineLines) {
    doc.text(line, contentCenterX, y, { align: 'center' })
    y += tagLineGap
  }

  y += 4.8
  doc.setTextColor(TEXT_WARM[0], TEXT_WARM[1], TEXT_WARM[2])
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text(data.name, contentCenterX, y, { align: 'center' })

  y += 6.2
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2])
  doc.setFontSize(8.4)
  doc.setFont('helvetica', 'normal')
  doc.setCharSpace(0.35)
  doc.text(data.whatsapp, contentCenterX, y, { align: 'center' })
  doc.setCharSpace(0)

  y += 6
  doc.setTextColor(TEXT_MUTED[0], TEXT_MUTED[1], TEXT_MUTED[2])
  doc.setFontSize(6.4)
  doc.setFont('helvetica', 'normal')
  const locLines = doc.splitTextToSize(data.location, textMaxW)
  for (const line of locLines) {
    doc.text(line, contentCenterX, y, { align: 'center' })
    y += 3.05
  }

  drawDoublePortraitFrame(doc, frameX, frameY, frameW, frameH, 3.2, 2.4, frameInset)

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
