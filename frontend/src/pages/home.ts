import { Closing, ProjectRow, Section } from '../components/blocks'
import { projects } from '../content/projects'
import { areas, process, SITE_NAME, stats, testimonials } from '../content/site'
import type { View } from '../router'

const [lead, ...others] = testimonials

export const homeView: View = {
  title: SITE_NAME,
  render: () => `
<section class="hero">
  <div class="container grid">
    <h1 class="hero__title" data-reveal>Diseñamos obra pública con las personas que la van a usar.</h1>
    <div class="hero__aside" data-reveal>
      <p class="hero__lead">
        ${SITE_NAME} es un laboratorio de innovación cívica en Costa Rica. Desde 2019 hemos entregado
        48 proyectos en nueve cantones: parques, redes, sensores y mercados que siguen funcionando.
      </p>
      <div class="actions">
        <a class="btn" href="/proyectos">Ver proyectos</a>
        <a class="link link--strong" href="/nosotros">Conocer al equipo</a>
      </div>
    </div>
  </div>
</section>

${Section({
  title: 'En números',
  intro: 'Medimos cada proyecto y publicamos los datos cada mes.',
  body: `
  <dl class="ledger">
    ${stats
      .map(
        (s) => `
      <div class="ledger__row" data-reveal>
        <dt class="ledger__value">${s.value.toLocaleString('es-CR')}${s.suffix}</dt>
        <dd class="ledger__label">${s.label}<span>${s.note}</span></dd>
      </div>`,
      )
      .join('')}
  </dl>`,
})}

${Section({
  title: 'Qué hacemos',
  intro: 'Cuatro áreas de trabajo y un mismo método: escuchar, probar en pequeño y construir con la comunidad.',
  body: `
  <div class="areas">
    ${areas
      .map(
        (a) => `
      <article class="area" data-reveal>
        <h3 class="area__title">${a.title}</h3>
        <p>${a.text}</p>
        <a class="link" href="/proyectos?area=${a.key}">Proyectos de ${a.title.toLowerCase()}</a>
      </article>`,
      )
      .join('')}
  </div>`,
})}

${Section({
  title: 'Proyectos recientes',
  body: `
  <ul class="index" data-reveal>${projects.slice(0, 4).map((p) => ProjectRow(p)).join('')}</ul>
  <a class="link link--strong section__more" href="/proyectos">Ver los ${projects.length} proyectos</a>`,
})}

${Section({
  title: 'Cómo trabajamos',
  intro: 'El mismo proceso en cada proyecto, documentado para que otras organizaciones lo usen.',
  body: `
  <ol class="steps">
    ${process
      .map(
        (p, i) => `
      <li class="step" data-reveal>
        <span class="step__num">${i + 1}</span>
        <h3 class="step__title">${p.title}</h3>
        <p>${p.text}</p>
      </li>`,
      )
      .join('')}
  </ol>`,
})}

<section class="section voices">
  <div class="container grid">
    <figure class="quote quote--lead" data-reveal>
      <blockquote><p>${lead.quote}</p></blockquote>
      <figcaption>${lead.name}, ${lead.role}</figcaption>
    </figure>
    ${others
      .map(
        (t) => `
      <figure class="quote" data-reveal>
        <blockquote><p>${t.quote}</p></blockquote>
        <figcaption>${t.name}, ${t.role}</figcaption>
      </figure>`,
      )
      .join('')}
  </div>
</section>

${Closing({
  title: '¿Tienes una idea para tu barrio?',
  text: 'Cuéntanos qué quieres cambiar. Respondemos cada propuesta en menos de una semana.',
  primary: { label: 'Proponer un proyecto', href: '/contacto?interes=proyecto' },
  secondary: { label: 'Quiero ser voluntario', href: '/contacto?interes=voluntariado' },
})}
`,
}
