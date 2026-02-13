/**
 * Contacto - Datos claros + Formulario con validación
 * CTA final: "Para respuesta inmediata, escríbenos por WhatsApp"
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Download, MessageCircle, MapPin, Send, Share2, User } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/constants'
import { generateContactCardPdf, getContactCardPdfBlob } from '@/lib/generateContactCardPdf'
import { sendContactEmail } from '@/lib/emailService'
import { fadeInUp, slideInLeft, slideInRight, viewportConfig } from '@/lib/animations'
import { LashPattern } from '@/components/LashPattern'

interface FormData {
  name: string
  email: string
  message: string
}

const inputBase =
  'w-full rounded-xl border bg-[#141414] px-4 py-3.5 text-[#f5f0e6] placeholder-[#737373] transition-all duration-200 resize-none'

function ShareContactButton({ t }: { t: (key: string) => string }) {
  const [shared, setShared] = useState(false)

  const getCardData = () => ({
    name: t('contact.name'),
    whatsapp: t('contact.whatsapp'),
    location: t('contact.location'),
    brand: t('footer.brand'),
    tagline: t('footer.tagline'),
  })

  const handleShare = async () => {
    const cardData = getCardData()
    const blob = getContactCardPdfBlob(cardData)
    const file = new File([blob], 'Cilios-Lloret-tarjeta.pdf', { type: 'application/pdf' })

    if (navigator.share && (navigator.canShare?.({ files: [file] }) ?? true)) {
      try {
        await navigator.share({
          title: 'Cílios Lloret - Tarjeta de contacto',
          text: `${cardData.brand} · ${cardData.whatsapp}`,
          files: [file],
        })
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } catch {
        generateContactCardPdf(cardData)
      }
    } else {
      generateContactCardPdf(cardData)
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-[#a3a3a3] transition-all hover:border-[#c9a962]/30 hover:text-[#c9a962]"
    >
      <Share2 className="h-4 w-4" />
      {shared ? t('contact.shareSuccess') : t('contact.shareCard')}
    </button>
  )
}

function DownloadContactButton({ t }: { t: (key: string) => string }) {
  const handleDownload = () => {
    generateContactCardPdf({
      name: t('contact.name'),
      whatsapp: t('contact.whatsapp'),
      location: t('contact.location'),
      brand: t('footer.brand'),
      tagline: t('footer.tagline'),
    })
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="inline-flex items-center gap-2 rounded-lg border border-[#c9a962]/40 px-4 py-2 text-sm font-medium text-[#c9a962] transition-all hover:bg-[#c9a962]/10 hover:border-[#c9a962]/60"
    >
      <Download className="h-4 w-4" />
      {t('contact.downloadCard')}
    </button>
  )
}

const inputFocus =
  'focus:border-[#c9a962]/60 focus:outline-none focus:ring-2 focus:ring-[#c9a962]/20'
const inputError = 'border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20'

export function Contact() {
  const { t } = useTranslation()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' })

  const onSubmit = async (data: FormData) => {
    setError(null)
    setLoading(true)
    const result = await sendContactEmail(data)
    setLoading(false)

    if (result.success) {
      setSubmitted(true)
      reset()
    } else {
      setError(result.message)
    }
  }

  return (
    <section id="contacto" className="section-spacing relative">
      <LashPattern opacity={0.05} />
      <div className="section-container relative mx-auto flex flex-col items-center">
        <div className="section-title-spacing">
          <motion.h2
            className="font-display text-center text-3xl font-bold text-[#c9a962] sm:text-4xl"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {t('contact.title')}
          </motion.h2>
        </div>

        <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:items-start lg:gap-24">
          {/* Tarjeta de contacto - compartible */}
          <motion.div
            className="w-full max-w-md"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            custom={0}
          >
            <div
              id="contact-card"
              className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1a1a1a] to-[#141414] shadow-xl"
            >
              <div className="space-y-8 p-10 sm:p-12 lg:p-14">
                <div className="flex items-center gap-5">
                  <div className="rounded-xl bg-[#c9a962]/10 p-3">
                    <User className="h-6 w-6 text-[#c9a962]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#a3a3a3]">Nombre</p>
                    <p className="font-semibold text-[#f5f0e6]">{t('contact.name')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="rounded-xl bg-[#25d366]/10 p-3">
                    <MessageCircle className="h-6 w-6 text-[#25d366]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#a3a3a3]">WhatsApp</p>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#25d366] hover:underline"
                    >
                      {t('contact.whatsapp')}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="rounded-xl bg-[#c9a962]/10 p-3">
                    <MapPin className="h-6 w-6 text-[#c9a962]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#a3a3a3]">Ubicación</p>
                    <p className="font-semibold text-[#f5f0e6]">{t('contact.location')}</p>
                  </div>
                </div>
              </div>

              {/* Pie de tarjeta con marca - estilo footer */}
              <div className="flex flex-col items-center gap-5 border-t border-white/5 px-10 py-8 sm:px-12 lg:px-14">
                <div className="text-center">
                  <p className="font-logo text-sm italic font-semibold text-[#c9a962]">
                    {t('footer.brand')}
                  </p>
                  <p className="mt-1 text-xs text-[#737373]">{t('footer.tagline')}</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <ShareContactButton t={t} />
                  <DownloadContactButton t={t} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.div
            className="w-full max-w-md"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            custom={1}
          >
            <h3 className="font-display text-xl font-semibold text-[#c9a962]">
              {t('contact.formTitle')}
            </h3>
            {submitted ? (
              <div className="mt-6 rounded-2xl border border-[#c9a962]/30 bg-[#c9a962]/5 p-6">
                <p className="text-[#f5f0e6]">{t('contact.thanksMessage')}</p>
                <p className="mt-2 text-[#a3a3a3]">{t('contact.afterSubmit')}</p>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[#25d366] hover:underline"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
                {error && (
                  <div
                    className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3"
                    role="alert"
                  >
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="contact-name" className="block text-sm font-medium text-[#a3a3a3]">
                    {t('contact.nameLabel')}
                  </label>
                  <input
                    id="contact-name"
                    {...register('name', {
                      required: t('contact.errors.required'),
                      minLength: {
                        value: 2,
                        message: t('contact.errors.nameMin'),
                      },
                    })}
                    placeholder={t('contact.namePlaceholder')}
                    aria-invalid={!!errors.name}
                    className={`${inputBase} ${inputFocus} border-white/10 ${errors.name ? inputError : ''}`}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-400" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-email" className="block text-sm font-medium text-[#a3a3a3]">
                    {t('contact.emailLabel')}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    {...register('email', {
                      required: t('contact.errors.required'),
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: t('contact.errors.emailInvalid'),
                      },
                    })}
                    placeholder={t('contact.emailPlaceholder')}
                    aria-invalid={!!errors.email}
                    className={`${inputBase} ${inputFocus} border-white/10 ${errors.email ? inputError : ''}`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="block text-sm font-medium text-[#a3a3a3]">
                    {t('contact.messageLabel')}
                  </label>
                  <textarea
                    id="contact-message"
                    {...register('message', {
                      required: t('contact.errors.required'),
                      minLength: {
                        value: 10,
                        message: t('contact.errors.messageMin'),
                      },
                    })}
                    rows={5}
                    placeholder={t('contact.messagePlaceholder')}
                    aria-invalid={!!errors.message}
                    className={`${inputBase} ${inputFocus} border-white/10 ${errors.message ? inputError : ''}`}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-400" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#c9a962] px-6 py-3.5 font-semibold text-black transition-all hover:bg-[#e5d4a1] hover:scale-[1.01] active:scale-[0.99] disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      {t('contact.submit')}
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
