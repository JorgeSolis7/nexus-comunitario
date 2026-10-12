import { Closing, PageHero, Section } from '../components/blocks'
import { mission, principles, team, timeline } from '../content/about'
import type { View } from '../router'

export const aboutView: View = {
  title: 'Nosotros',
  render: () => `
${PageHero({
  title: 'Empezamos midiendo aceras.',
  lead: 'Somos diseñadoras, ingenieros, sociólogas y vecinos. Trabajamos con gobiernos locales y organizaciones comunitarias en nueve cantones.',
})}

${Section({
  title: 'Historia',
  body: `
  <div class="prose" data-reveal>
    <p>En 2019, cinco personas recorrieron Barrio Luján con una cinta métrica y un formulario en papel. Encontraron 312 obstáculos en cuatro kilómetros de acera y llevaron el informe al concejo municipal. Seis meses después, la mitad estaban corregidos.</p>
    <p>Esa primera experiencia nos enseñó algo que repetimos en cada proyecto: cuando una comunidad tiene datos propios y un método claro, las instituciones escuchan. Nexus nació para multiplicar ese resultado.</p>
  </div>`,
})}

${Section({
  title: 'Misión y visión',
  body: `
  <div class="statements">
    <div data-reveal><h3 class="statement__label">Misión</h3><p class="statement">${mission.mission}</p></div>
    <div data-reveal><h3 class="statement__label">Visión</h3><p class="statement">${mission.vision}</p></div>
  </div>`,
})}

${Section({
  title: 'Principios',
  body: `
  <div class="areas">
    ${principles.map((p) => `<article class="area" data-reveal><h3 class="area__title">${p.title}</h3><p>${p.text}</p></article>`).join('')}
  </div>`,
})}

${Section({
  title: 'Trayectoria',
  body: `
  <ol class="timeline">
    ${timeline
      .map(
        (t) => `
      <li class="timeline__row" data-reveal>
        <span class="timeline__year">${t.year}</span>
        <div><h3 class="timeline__title">${t.title}</h3><p>${t.text}</p></div>
      </li>`,
      )
      .join('')}
  </ol>`,
})}

${Section({
  title: 'Equipo',
  id: 'equipo',
  intro: 'Un equipo base de seis personas y una red de más de 300 voluntarios.',
  body: `
  <ul class="team">
    ${team.map((m) => `<li class="member" data-reveal><span class="member__name">${m.name}</span><span class="member__role">${m.role}</span></li>`).join('')}
  </ul>`,
})}

${Closing({
  title: 'Súmate a la red de voluntarios.',
  text: 'Cuatro horas al mes bastan. Hay tareas de campo, diseño, datos, comunicación y logística.',
  primary: { label: 'Quiero ser voluntario', href: '/contacto?interes=voluntariado' },
  secondary: { label: 'Ver proyectos', href: '/proyectos' },
})}
`,
}
