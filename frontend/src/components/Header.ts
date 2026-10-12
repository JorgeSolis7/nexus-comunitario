import { ctaLink, navLinks, SITE_NAME } from '../content/site'
import { logoMark } from './icons'

export const Brand = () => `
<a class="brand" href="/" aria-label="${SITE_NAME}, ir al inicio">
  ${logoMark()}<span class="brand__name">${SITE_NAME}</span>
</a>`

// El header se renderiza una sola vez; el router actualiza aria-current.
export function Header(): string {
  const links = navLinks
    .map((l) => `<li><a class="nav__link" href="${l.href}" data-nav="${l.href}">${l.label}</a></li>`)
    .join('')

  return `
<a class="skip-link" href="#contenido">Saltar al contenido</a>
<header class="site-header" data-header>
  <div class="site-header__bar container">
    ${Brand()}
    <nav class="nav" aria-label="Principal">
      <ul class="nav__list">${links}</ul>
    </nav>
    <a class="btn btn--small site-header__cta" href="${ctaLink.href}">${ctaLink.label}</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" data-menu-toggle>
      <span data-menu-label>Menú</span>
    </button>
  </div>
</header>

<div class="mobile-nav" id="mobile-nav" data-mobile-nav hidden>
  <nav aria-label="Menú móvil">
    <ul class="mobile-nav__list">${links.replaceAll('nav__link', 'mobile-nav__link')}</ul>
  </nav>
  <a class="btn mobile-nav__cta" href="${ctaLink.href}">${ctaLink.label}</a>
</div>`
}
