import { Closing, ProjectRow, Section } from '../components/blocks'
import { findProject, projects, type Project } from '../content/projects'
import type { View } from '../router'

function detailView(p: Project): View {
  const related = projects
    .filter((x) => x.slug !== p.slug && x.area === p.area)
    .concat(projects.filter((x) => x.area !== p.area))
    .slice(0, 3)

  return {
    title: p.title,
    render: () => `
<header class="page-hero">
  <div class="container grid">
    <a class="page-hero__crumb link" href="/proyectos" data-reveal>Todos los proyectos</a>
    <h1 class="page-hero__title" data-reveal>${p.title}</h1>
    <p class="page-hero__lead" data-reveal>${p.summary}</p>
    <dl class="facts" data-reveal>
      <div><dt>Área</dt><dd>${p.areaLabel}</dd></div>
      <div><dt>Lugar</dt><dd>${p.place}</dd></div>
      <div><dt>Año</dt><dd>${p.year}</dd></div>
      <div><dt>Estado</dt><dd>${p.status}</dd></div>
    </dl>
  </div>
</header>

<section class="section section--flush">
  <div class="container">
    <dl class="figures">
      ${p.metrics.map((m) => `<div class="figure" data-reveal><dt class="figure__value">${m.value}</dt><dd>${m.label}</dd></div>`).join('')}
    </dl>
  </div>
</section>

${Section({ title: 'El reto', body: `<div class="prose" data-reveal><p>${p.challenge}</p></div>` })}

${Section({
  title: 'Cómo lo hicimos',
  body: `<ol class="approach">${p.approach.map((a) => `<li data-reveal>${a}</li>`).join('')}</ol>`,
})}

${Section({
  title: 'Resultado',
  body: `
  <div class="prose" data-reveal>
    <p class="prose__lead">${p.outcome}</p>
    <p class="muted">Con ${p.partners.join(', ').replace(/, ([^,]*)$/, ' y $1')}.</p>
  </div>`,
})}

${Section({
  title: 'Otros proyectos',
  body: `<ul class="index" data-reveal>${related.map((r) => ProjectRow(r)).join('')}</ul>`,
})}

${Closing({
  title: '¿Lo imaginas en tu comunidad?',
  text: 'Nuestros métodos son abiertos. Podemos acompañarte a adaptarlo.',
  primary: { label: 'Escribirnos', href: '/contacto?interes=proyecto' },
})}
`,
  }
}

export const resolveDetail = (slug: string): View | null => {
  const p = findProject(slug)
  return p ? detailView(p) : null
}
