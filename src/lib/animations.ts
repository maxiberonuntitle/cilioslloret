/**
 * Variantes de animación para scroll
 * Transiciones visibles y fluidas al hacer scroll
 */

export const fadeInUp = {
  hidden: { opacity: 0, y: 60, scale: 0.98 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export const fadeIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -60, scale: 0.97 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export const slideInRight = {
  hidden: { opacity: 0, x: 60, scale: 0.97 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
}

export const viewportConfig = {
  once: true,
  margin: '-60px 0px -60px 0px',
  amount: 0.15,
}
