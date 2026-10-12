// Acordeón accesible: un panel abierto a la vez. La altura se anima en CSS con grid-template-rows.

export function initAccordion(root: HTMLElement): () => void {
  const acc = root.querySelector<HTMLElement>('[data-accordion]')
  if (!acc) return () => {}

  const onClick = (e: Event) => {
    const btn = (e.target as Element).closest<HTMLButtonElement>('.accordion__trigger')
    if (!btn) return
    const willOpen = btn.getAttribute('aria-expanded') !== 'true'
    acc.querySelectorAll<HTMLButtonElement>('.accordion__trigger').forEach((b) => {
      const open = b === btn && willOpen
      b.setAttribute('aria-expanded', String(open))
      b.closest('.accordion__item')!.classList.toggle('is-open', open)
    })
  }
  acc.addEventListener('click', onClick)
  return () => acc.removeEventListener('click', onClick)
}
