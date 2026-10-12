// Iconos SVG en línea (trazo estilo Lucide). Decorativos: aria-hidden.

const paths = {
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
  external: '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
} as const

export type IconName = keyof typeof paths

export const icon = (name: IconName, size = 24) =>
  `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]}</svg>`

/** Isotipo de Nexus: tres nodos unidos, en el color del texto. */
export const logoMark = (size = 22) => `
<svg class="logo-mark" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
  <path d="M6 18 12 6l6 12H6Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
  <circle cx="12" cy="6" r="2.6" fill="currentColor"/>
  <circle cx="6" cy="18" r="2.6" fill="currentColor"/>
  <circle cx="18" cy="18" r="2.6" fill="var(--paper)" stroke="currentColor" stroke-width="1.6"/>
</svg>`
