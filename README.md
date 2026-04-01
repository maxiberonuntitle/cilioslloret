# Cílios Lloret

Sitio web premium para **Cílios Lloret** - Extensiones de pestañas en Lloret de Mar, Costa Brava.

## 🎯 Objetivo

Generar **contactos y reservas directas por WhatsApp** mediante un diseño luxury beauty optimizado para conversión.

## 🛠 Stack

- **React 18** + Vite
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (microinteracciones)
- **React Router DOM**
- **react-i18next** (ES, CA, PT)
- **React Hook Form**
- **React Helmet Async** (SEO)
- **Lucide React** (iconos)

## 🚀 Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 📁 Estructura

```
src/
├── components/     # Navbar, Footer, WhatsAppButton, SEO, LanguageSelector
├── sections/      # Hero, Trust, Services, Gallery, ConversionBlock, Contact
├── pages/         # HomePage
├── i18n/          # Traducciones (es, ca, pt)
└── lib/           # Constantes (WhatsApp, brand)
```

## 📱 WhatsApp

- **Número:** +34 601 877 214
- **Enlace:** [wa.me/34601877214](https://wa.me/34601877214?text=Hola%20quiero%20reservar%20una%20cita%20en%20C%C3%ADlios%20Lloret)

## 🎨 Branding

- **Colores:** Negro profundo, dorado (#c9a962), champagne
- **Tipografía:** Playfair Display (display), DM Sans (body)

## 📧 Formulario de contacto

Al enviar, se abre el **correo del visitante** con un mensaje ya redactado para **vanessagoncalves8384@gmail.com** (definido en `src/lib/contactMailto.ts`). No hace falta API key ni configuración en Netlify.

El visitante debe pulsar **Enviar** en su aplicación de correo; es el enfoque habitual en webs estáticas sin servidor.

## 📸 Galería

Sustituir los placeholders en `src/sections/Gallery.tsx` por imágenes reales antes/después.

---

© Cílios Lloret · Lloret de Mar, Costa Brava
