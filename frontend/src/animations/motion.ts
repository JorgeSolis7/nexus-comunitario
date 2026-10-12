// Movimiento mínimo: los elementos [data-reveal] reciben .is-in al entrar en pantalla.
// La curva y la duración viven solo en CSS (--ease, --dur-*), así todo comparte el mismo ritmo.

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initMotion(root: HTMLElement): () => void {
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'))
    return () => {}
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        e.target.classList.add('is-in')
        io.unobserve(e.target)
      })
    },
    { rootMargin: '0px 0px -8% 0px' },
  )
  items.forEach((el) => io.observe(el))
  return () => io.disconnect()
}
