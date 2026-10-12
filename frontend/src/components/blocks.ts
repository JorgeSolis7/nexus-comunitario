// Bloques reutilizables entre vistas. La estructura sale de la retícula y la tipografía, no de contenedores.

import type { Project } from '../content/projects'

/** Sección con el título en la columna izquierda y el contenido desplazado a la derecha. */
export const Section = (o: { title: string; id?: string; body: string; intro?: string }) => `
<section class="section"${o.id ? ` id="${o.id}"` : ''}>
  <div class="container grid">
    <div class="section__aside">
      <h2 class="section__title" data-reveal>${o.title}</h2>
      ${o.intro ? `<p class="section__intro" data-reveal>${o.intro}</p>` : ''}
    </div>
    <div class="section__body">${o.body}</div>
  </div>
</section>`

export function PageHero(o: { title: string; lead: string; crumb?: { label: string; href: string } }) {
  return `
<header class="page-hero">
  <div class="container grid">
    ${o.crumb ? `<a class="page-hero__crumb link" href="${o.crumb.href}" data-reveal>${o.crumb.label}</a>` : ''}
    <h1 class="page-hero__title" data-reveal>${o.title}</h1>
    <p class="page-hero__lead" data-reveal>${o.lead}</p>
  </div>
</header>`
}

/** Fila del índice de proyectos: año, título, área y lugar. Toda la fila es un enlace. */
export const ProjectRow = (p: Project, withSummary = false) => `
<li class="index__row" data-area="${p.area}">
  <a class="index__link" href="/proyectos/${p.slug}">
    <span class="index__year">${p.year}</span>
    <span class="index__title">${p.title}</span>
    <span class="index__meta">${p.areaLabel}<br />${p.place}</span>
    <span class="index__status">${p.status}</span>
    ${withSummary ? `<span class="index__summary">${p.summary}</span>` : ''}
  </a>
</li>`

export function Closing(o: { title: string; text: string; primary: { label: string; href: string }; secondary?: { label: string; href: string } }) {
  return `
<section class="section closing">
  <div class="container grid">
    <h2 class="closing__title" data-reveal>${o.title}</h2>
    <div class="closing__body" data-reveal>
      <p>${o.text}</p>
      <div class="actions">
        <a class="btn" href="${o.primary.href}">${o.primary.label}</a>
        ${o.secondary ? `<a class="link link--strong" href="${o.secondary.href}">${o.secondary.label}</a>` : ''}
      </div>
    </div>
  </div>
</section>`
}
