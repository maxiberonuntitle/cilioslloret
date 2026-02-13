/**
 * HomePage - Landing de alta conversión
 * Estructura optimizada para WhatsApp
 */

import { Hero } from '@/sections/Hero'
import { Trust } from '@/sections/Trust'
import { Services } from '@/sections/Services'
import { Gallery } from '@/sections/Gallery'
import { Contact } from '@/sections/Contact'

export function HomePage() {
  return (
    <>
      <Hero />
      <Trust />
      <Services />
      <Gallery />
      <Contact />
    </>
  )
}
