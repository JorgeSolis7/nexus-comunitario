import '@fontsource-variable/schibsted-grotesk'
import './styles/main.css'

import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { aboutView } from './pages/about'
import { contactView } from './pages/contact'
import { homeView } from './pages/home'
import { notFoundView } from './pages/notFound'
import { resolveDetail } from './pages/projectDetail'
import { projectsView } from './pages/projects'
import { createRouter } from './router'
import { initNewsletter } from './utils/contactForm'
import { initHeader } from './utils/header'

// Layout persistente: el header y el footer no se vuelven a renderizar al navegar.
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  ${Header()}
  <main id="contenido" tabindex="-1"></main>
  ${Footer()}
  <p class="sr-only" aria-live="polite" data-route-announcer></p>
`

initHeader()
initNewsletter()

const router = createRouter(
  [
    { path: '/', resolve: () => homeView },
    { path: '/nosotros', resolve: () => aboutView },
    { path: '/proyectos', resolve: () => projectsView },
    { path: '/proyectos/:slug', resolve: ({ params }) => resolveDetail(params.slug) },
    { path: '/contacto', resolve: () => contactView },
  ],
  notFoundView,
)

void router.start()
