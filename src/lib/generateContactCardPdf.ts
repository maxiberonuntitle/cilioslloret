/**
 * Tarjeta de contacto en PDF — diseño tipo alta papelería:
 * marco doble, panel de texto y foto rectangular con marco dorado; la foto va con opacidad
 * para no competir con el texto.
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
const GOLD_LIGHT: [number, number, number] = [220, 195, 135]
const BG: [number, number, number] = [10, 10, 10]
const PANEL_BG: [number, number, number] = [15, 14, 13]
const TEXT_MUTED: [number, number, number] = [150, 145, 135]
const TEXT_WARM: [number, number, number] = [248, 244, 236]

/** Opacidad de la imagen sobre el fondo (más bajo = más sutil, menos protagonismo). */
const PHOTO_IMAGE_ALPHA = 0.5
/** Velo oscuro uniforme encima de la foto para fundirla con la tarjeta. */
const PHOTO_VEIL_ALPHA = 0.16

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('No se pudo cargar la imagen de la tarjeta'))
    img.src = src
  })
}

/** Miniatura rectangular, cover, esquinas redondeadas (misma base que el hero). */
function createHeroRoundedThumbDataUrl(
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
  ctx.fillStyle = `rgb(${BG.join(',')})`
  ctx.fillRect(0, 0, w, h)

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
  ctx.globalAlpha = PHOTO_IMAGE_ALPHA
  ctx.drawImage(img, ox, oy, dw, dh)
  ctx.globalAlpha = 1

  ctx.fillStyle = `rgba(${BG[0]}, ${BG[1]}, ${BG[2]}, ${PHOTO_VEIL_ALPHA})`
  ctx.fillRect(0, 0, w, h)

  return canvas.toDataURL('image/jpeg', 0.9)
}

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

/** Marco doble redondeado alrededor de la fotografía (coherente con la tarjeta). */
function drawPhotoDoubleFrame(
  doc: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  outerR: number,
  innerR: number,
) {
  const padOut = 0.4
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2])
  doc.setLineWidth(0.3)
  doc.roundedRect(x - padOut, y - padOut, w + padOut * 2, h + padOut * 2, outerR, outerR, 'S')

  const inset = 0.75
  doc.setDrawColor(GOLD_LIGHT[0], GOLD_LIGHT[1], GOLD_LIGHT[2])
  doc.setLineWidth(0.12)
  doc.roundedRect(x + inset, y + inset, w - inset * 2, h - inset * 2, innerR, innerR, 'S')
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
  /** Retrato proporcionado para tarjeta horizontal. */
  const photoW = 23
  const photoH = 45.5
  const photoR = 2.6
  const photoX = innerPad + 1.2
  const photoY = (55 - photoH) / 2

  const gutter = 4.5
  const contentLeft = photoX + photoW + gutter
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
  const thumb = createHeroRoundedThumbDataUrl(img, photoW, photoH, photoR)
  doc.addImage(thumb, 'JPEG', photoX, photoY, photoW, photoH)

  drawPhotoDoubleFrame(doc, photoX, photoY, photoW, photoH, photoR + 0.35, photoR - 0.35)

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
  doc.setCharSpace(0)
  doc.text(data.name, contentCenterX, y, { align: 'center' })

  y += 6.2
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2])
  doc.setFontSize(8.4)
  doc.setFont('helvetica', 'normal')
  doc.setCharSpace(0)
  const phoneW = doc.getTextWidth(data.whatsapp)
  doc.text(data.whatsapp, contentCenterX - phoneW / 2, y)

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
