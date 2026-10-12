import { prefersReducedMotion } from '../animations/motion'
import { Closing, PageHero, ProjectRow } from '../components/blocks'
import { projects, type AreaKey } from '../content/projects'
import { areas } from '../content/site'
import type { View } from '../router'

type Filter = 'todo' | AreaKey

const filters: { value: Filter; label: string; count: number }[] = [
  { value: 'todo', label: 'Todos', count: projects.length },
  ...areas.map((a) => ({ value: a.key, label: a.title, count: projects.filter((p) => p.area === a.key).length })),
]

const parseFilter = (q: URLSearchParams): Filter => {
  const a = q.get('area')
  return filters.some((f) => f.value === a) ? (a as Filter) : 'todo'
}

const summary = (f: Filter) => {
  const { count, label } = filters.find((x) => x.value === f)!
  const noun = count === 1 ? 'proyecto' : 'proyectos'
  return f === 'todo' ? `${count} ${noun}` : `${count} ${noun} de ${label.toLowerCase()}`
}

export const projectsView: View = {
  title: 'Proyectos',
  render: ({ query }) => {
    const active = parseFilter(query)
    return `
${PageHero({
  title: 'Proyectos',
  lead: 'Cada caso incluye el problema, el método y los indicadores que medimos. Filtra por área de trabajo.',
})}

<section class="section section--flush">
  <div class="container">
    <div class="filters" data-reveal>
      <div class="filters__list" role="group" aria-label="Filtrar por área">
        ${filters
          .map(
            (f) => `<button type="button" class="filter" data-filter="${f.value}" aria-pressed="${f.value === active}">${f.label} <span class="filter__count">${f.count}</span></button>`,
          )
          .join('')}
      </div>
      <p class="filters__summary" role="status" data-summary>${summary(active)}</p>
    </div>

    <ul class="index index--full" data-reveal data-list>
      ${projects
        .map((p) => ProjectRow(p, true))
        .map((row, i) => (active !== 'todo' && projects[i].area !== active ? row.replace('<li ', '<li hidden ') : row))
        .join('')}
    </ul>
  </div>
</section>

${Closing({
  title: 'El próximo puede ser el de tu comunidad.',
  text: 'Trabajamos con municipalidades, asociaciones de desarrollo, escuelas y cooperativas.',
  primary: { label: 'Proponer un proyecto', href: '/contacto?interes=proyecto' },
})}
`
  },

  mount: (root) => {
    const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-filter]'))
    const list = root.querySelector<HTMLElement>('[data-list]')!
    const rows = Array.from(list.querySelectorAll<HTMLElement>('.index__row'))
    const status = root.querySelector<HTMLElement>('[data-summary]')!
    let timer = 0

    const apply = (value: Filter) => {
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === value)))
      status.textContent = summary(value)

      const url = new URL(location.href)
      if (value === 'todo') url.searchParams.delete('area')
      else url.searchParams.set('area', value)
      history.replaceState(null, '', url)

      const swap = () => rows.forEach((r) => (r.hidden = value !== 'todo' && r.dataset.area !== value))
      if (prefersReducedMotion()) return swap()

      // Fundido breve: la lista baja su opacidad, cambia y vuelve.
      window.clearTimeout(timer)
      list.classList.add('is-fading')
      timer = window.setTimeout(() => {
        swap()
        list.classList.remove('is-fading')
      }, 180)
    }

    const onClick = (e: Event) => {
      const btn = (e.target as Element).closest<HTMLButtonElement>('[data-filter]')
      if (btn && btn.getAttribute('aria-pressed') !== 'true') apply(btn.dataset.filter as Filter)
    }
    root.addEventListener('click', onClick)
    return () => {
      root.removeEventListener('click', onClick)
      window.clearTimeout(timer)
    }
  },
}
