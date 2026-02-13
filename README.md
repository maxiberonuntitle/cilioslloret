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

Los mensajes se envían por email a **vanessagoncalves8384@gmail.com** mediante Web3Forms.

**Configuración:**
1. Ve a [web3forms.com](https://web3forms.com)
2. Introduce el email `vanessagoncalves8384@gmail.com` y obtén tu Access Key
3. Crea un archivo `.env` en la raíz con:
   ```
   VITE_WEB3FORMS_ACCESS_KEY=tu_access_key
   ```
4. Reinicia el servidor de desarrollo

## 📸 Galería

Sustituir los placeholders en `src/sections/Gallery.tsx` por imágenes reales antes/después.

---

© Cílios Lloret · Lloret de Mar, Costa Brava
