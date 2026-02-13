/**
 * Cilios Lloret - App principal
 * React Router + i18n + SEO
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { SEO } from '@/components/SEO'
import { HomePage } from '@/pages/HomePage'

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <SEO />
        <Navbar />
        <main className="overflow-x-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton variant="floating" />
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
