/**
 * Contacto - Datos claros + Formulario con validación
 * CTA final: "Para respuesta inmediata, escríbenos por WhatsApp"
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MessageCircle, MapPin, Send, Share2 } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/constants'
import { getContactCardPdfBlob } from '@/lib/generateContactCardPdf'
import { openContactMailto } from '@/lib/contactMailto'
import { fadeInUp, slideInLeft, slideInRight, viewportConfig } from '@/lib/animations'
import { LashPattern } from '@/components/LashPattern'

interface ContactFields {
  name: string
  email: string
  message: string
  'bot-field'?: string
}

const inputBase =
  'w-full rounded-xl border-0 bg-[#0c0c0c]/90 px-5 py-[1.05rem] text-[15px] leading-relaxed text-[#f5f0e6] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-200 placeholder:text-[#737373] placeholder:leading-relaxed selection:bg-[#c9a962]/25 selection:text-[#f5f0e6] sm:px-6 sm:py-[1.15rem] sm:text-base'

const labelClass =
  'block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c9a962]/90'

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
          title: t('contact.shareTitle'),
          text: `${cardData.brand} · ${cardData.whatsapp}`,
          files: [file],
        })
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } catch {
        // Usuario canceló o error al compartir - no hacer nada
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-transparent px-6 py-4 text-sm font-semibold text-[#c9a962] transition-all duration-300 hover:scale-[1.02] hover:border-white/25 hover:bg-transparent hover:text-[#e5d4a1] sm:gap-3.5 sm:px-8 sm:py-4 sm:text-base"
    >
      <Share2 className="h-5 w-5 sm:h-6 sm:w-6" />
      {shared ? t('contact.shareSuccess') : t('contact.shareCard')}
    </button>
  )
}

const inputFocus =
  'focus:outline-none focus:ring-2 focus:ring-[#c9a962]/25 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]'
const inputError =
  'ring-2 ring-red-500/40 focus:ring-2 focus:ring-red-500/20 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]'

export function Contact() {
  const { t } = useTranslation()
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFields>({ mode: 'onBlur', defaultValues: { 'bot-field': '' } })

  const onSubmit = (data: ContactFields) => {
    if (!openContactMailto(data)) return
    setSubmitted(true)
    reset()
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

        <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-14 sm:gap-20 lg:grid-cols-2 lg:items-start lg:gap-24">
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
              className="group overflow-hidden rounded-2xl bg-transparent shadow-none transition-all duration-300 hover:shadow-[0_0_40px_-15px_rgba(255,255,255,0.06)]"
            >
              {/* Línea dorada superior */}
              <div className="h-[2px] bg-gradient-to-r from-transparent via-[#c9a962]/60 to-transparent" />

              <div className="space-y-12 p-16 sm:space-y-14 sm:p-20 lg:p-24">
                {/* Marca destacada */}
                <div className="text-center">
                  <p className="font-logo text-xl italic font-semibold text-[#c9a962] sm:text-2xl">
                    {t('footer.brand')}
                  </p>
                  <p className="mt-2 text-sm text-[#737373]">{t('footer.tagline')}</p>
                </div>

                <div className="space-y-8">
                  <div className="group/row flex items-center gap-6 transition-colors duration-300 hover:text-[#f5f0e6]">
                    <div className="flex shrink-0 rounded-xl bg-transparent p-4 transition-all duration-300 group-hover/row:scale-105 sm:p-5">
                      <MessageCircle className="h-6 w-6 text-[#25d366] transition-colors duration-300 group-hover/row:text-[#34e077] sm:h-7 sm:w-7" />
                    </div>
                    <div>
                      <p className="text-sm text-[#a3a3a3]">{t('contact.fieldWhatsApp')}</p>
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#25d366] text-lg transition-colors duration-200 hover:text-[#34e077] hover:underline"
                      >
                        {t('contact.whatsapp')}
                      </a>
                    </div>
                  </div>
                  <div className="group/row flex items-center gap-6 transition-colors duration-300 hover:text-[#f5f0e6]">
                    <div className="flex shrink-0 rounded-xl bg-transparent p-4 transition-all duration-300 group-hover/row:scale-105 sm:p-5">
                      <MapPin className="h-6 w-6 text-[#c9a962] transition-colors duration-300 group-hover/row:text-[#e5d4a1] sm:h-7 sm:w-7" />
                    </div>
                    <div>
                      <p className="text-sm text-[#a3a3a3]">{t('contact.fieldLocation')}</p>
                      <p className="font-semibold text-[#f5f0e6] text-lg">{t('contact.location')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pie con botón compartir */}
              <div className="border-t border-white/5 px-16 py-12 sm:px-20 sm:py-14 lg:px-24 lg:py-16">
                <ShareContactButton t={t} />
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
            <h3 className="font-display text-xl font-semibold text-[#c9a962] sm:text-2xl">
              {t('contact.formTitle')}
            </h3>
            {submitted ? (
              <div className="mt-8 overflow-visible sm:mt-10">
                <div className="flex flex-col gap-4 py-7 text-[15px] leading-relaxed sm:gap-5 sm:py-8">
                  <p className="font-display text-lg text-[#f5f0e6]">{t('contact.thanksMessage')}</p>
                  <p className="text-[#a3a3a3]">{t('contact.mailtoHint')}</p>
                  <p className="text-[#a3a3a3]">{t('contact.afterSubmit')}</p>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-2 text-[#25d366] transition-all duration-200 hover:text-[#34e077] hover:underline"
                  >
                    <MessageCircle className="h-5 w-5 shrink-0" />
                    WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 overflow-visible sm:mt-10"
                name="contact"
              >
                <div className="flex flex-col gap-6 py-7 sm:gap-7 sm:py-8">
                  <p className="hidden" aria-hidden="true">
                    <label htmlFor="contact-bot-field">
                      No rellenar
                      <input
                        id="contact-bot-field"
                        {...register('bot-field')}
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </label>
                  </p>

                  <div className="flex flex-col gap-2.5">
                    <label htmlFor="contact-name" className={labelClass}>
                      {t('contact.nameLabel')}
                    </label>
                    <input
                      id="contact-name"
                      autoComplete="name"
                      {...register('name', {
                        required: t('contact.errors.required'),
                        minLength: {
                          value: 2,
                          message: t('contact.errors.nameMin'),
                        },
                      })}
                      placeholder={t('contact.namePlaceholder')}
                      aria-invalid={!!errors.name}
                      className={`${inputBase} ${inputFocus} min-h-[3.25rem] ${errors.name ? inputError : ''}`}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-400/95" role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label htmlFor="contact-email" className={labelClass}>
                      {t('contact.emailLabel')}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      {...register('email', {
                        required: t('contact.errors.required'),
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: t('contact.errors.emailInvalid'),
                        },
                      })}
                      placeholder={t('contact.emailPlaceholder')}
                      aria-invalid={!!errors.email}
                      className={`${inputBase} ${inputFocus} min-h-[3.25rem] ${errors.email ? inputError : ''}`}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-400/95" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label htmlFor="contact-message" className={labelClass}>
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
                      className={`${inputBase} ${inputFocus} min-h-[148px] resize-y py-4 ${errors.message ? inputError : ''}`}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-400/95" role="alert">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="font-display mt-1 flex w-full items-center justify-center gap-3 rounded-xl bg-[#c9a962] px-8 py-4 text-base font-semibold tracking-wide text-black transition-all duration-300 hover:scale-[1.01] hover:bg-[#e5d4a1] hover:shadow-[0_0_28px_-6px_rgba(201,169,98,0.45)] active:scale-[0.99] sm:gap-3.5 sm:px-10 sm:py-[1.125rem] sm:text-[1.05rem]"
                  >
                    <Send className="h-5 w-5 shrink-0" strokeWidth={2} />
                    {t('contact.submit')}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
