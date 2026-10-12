import { contact, footerGroups, SITE_NAME, socials } from '../content/site'
import { Brand } from './Header'
import { icon } from './icons'

export function Footer(): string {
  const groups = footerGroups
    .map(
      (g) => `
    <div class="footer__group">
      <h2 class="footer__title">${g.title}</h2>
      <ul>${g.links.map((l) => `<li><a class="link" href="${l.href}">${l.label}</a></li>`).join('')}</ul>
    </div>`,
    )
    .join('')

  return `
<footer class="site-footer">
  <div class="container grid footer__grid">
    <div class="footer__intro">
      ${Brand()}
      <p>Laboratorio de innovación cívica en Costa Rica.</p>
      <form class="newsletter" data-newsletter novalidate>
        <label class="newsletter__label" for="newsletter-email">Notas de campo, una vez al mes</label>
        <div class="newsletter__row">
          <input class="newsletter__input" id="newsletter-email" name="email" type="email" autocomplete="email"
            placeholder="tu@correo.com" aria-describedby="newsletter-msg" />
          <button class="link newsletter__submit" type="submit">Suscribirme</button>
        </div>
        <p class="newsletter__msg" id="newsletter-msg" role="status" data-newsletter-msg></p>
      </form>
    </div>

    ${groups}

    <div class="footer__group">
      <h2 class="footer__title">Contacto</h2>
      <ul>
        <li><a class="link" href="mailto:${contact.email}">${contact.email}</a></li>
        <li><a class="link" href="tel:${contact.phone.replace(/\s/g, '')}">${contact.phone}</a></li>
        <li class="muted">${contact.address}</li>
      </ul>
    </div>
  </div>

  <div class="container footer__bottom">
    <p>© ${new Date().getFullYear()} ${SITE_NAME}. Organización ficticia, proyecto de portafolio.</p>
    <ul class="footer__socials">
      ${socials.map((s) => `<li><a class="link" href="${s.href}" target="_blank" rel="noopener">${s.label}${icon('external', 13)}<span class="sr-only"> (se abre en otra pestaña)</span></a></li>`).join('')}
    </ul>
  </div>
</footer>`
}
