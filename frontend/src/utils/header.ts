// Header sticky con borde inferior al hacer scroll y menú móvil accesible a pantalla completa.

const DESKTOP_QUERY = '(min-width: 900px)'

export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]')
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]')
  const panel = document.querySelector<HTMLElement>('[data-mobile-nav]')
  const label = document.querySelector<HTMLElement>('[data-menu-label]')
  if (!header || !toggle || !panel || !label) return

  // --- Estado según scroll ---
  let ticking = false
  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8)
    ticking = false
  }
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    },
    { passive: true },
  )
  update()

  // --- Menú móvil ---
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true'
  let hideTimer = 0

  const open = () => {
    window.clearTimeout(hideTimer)
    panel.hidden = false
    void panel.offsetHeight // reflow para que corra la transición de entrada
    panel.classList.add('is-open')
    toggle.setAttribute('aria-expanded', 'true')
    label.textContent = 'Cerrar'
    document.body.classList.add('menu-open')
  }

  const close = (returnFocus = true) => {
    panel.classList.remove('is-open')
    toggle.setAttribute('aria-expanded', 'false')
    label.textContent = 'Menú'
    document.body.classList.remove('menu-open')
    // El estado final no depende de transitionend.
    hideTimer = window.setTimeout(() => {
      if (!isOpen()) panel.hidden = true
    }, 400)
    if (returnFocus) toggle.focus()
  }

  toggle.addEventListener('click', () => (isOpen() ? close() : open()))
  panel.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) close(false)
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) close()
  })
  window.matchMedia(DESKTOP_QUERY).addEventListener('change', (e) => {
    if (e.matches && isOpen()) close(false)
  })
}
