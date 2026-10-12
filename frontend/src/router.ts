// Router del lado del cliente basado en History API.
// - Intercepta enlaces internos: navegación sin recargar la página.
// - Usa View Transitions cuando el navegador lo permite.
// - Gestiona título, foco, scroll, enlace activo y limpieza de animaciones.

import { initMotion } from './animations/motion'
import { SITE_NAME } from './content/site'

export interface RouteContext {
  params: Record<string, string>
  query: URLSearchParams
  hash: string
}

export interface View {
  title: string
  render: (ctx: RouteContext) => string
  /** Se ejecuta con la vista ya en el DOM. Puede devolver una función de limpieza. */
  mount?: (root: HTMLElement, ctx: RouteContext) => void | (() => void)
}

export interface Route {
  path: string
  resolve: (ctx: RouteContext) => View | null
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function createRouter(routes: Route[], notFound: View) {
  const main = document.querySelector<HTMLElement>('main')!
  const announcer = document.querySelector<HTMLElement>('[data-route-announcer]')!
  let cleanups: (() => void)[] = []
  let currentKey = ''
  let firstRender = true

  const match = (pathname: string) => {
    const parts = pathname.replace(/\/+$/, '').split('/').filter(Boolean)
    for (const route of routes) {
      const pattern = route.path.split('/').filter(Boolean)
      if (pattern.length !== parts.length) continue
      const params: Record<string, string> = {}
      const ok = pattern.every((seg, i) => {
        if (seg.startsWith(':')) {
          params[seg.slice(1)] = decodeURIComponent(parts[i])
          return true
        }
        return seg === parts[i]
      })
      if (ok) return { route, params }
    }
    return null
  }

  const updateActiveNav = (pathname: string) => {
    document.querySelectorAll<HTMLAnchorElement>('[data-nav]').forEach((a) => {
      const target = new URL(a.href).pathname
      const active = target === '/' ? pathname === '/' : pathname === target || pathname.startsWith(`${target}/`)
      if (active) a.setAttribute('aria-current', 'page')
      else a.removeAttribute('aria-current')
    })
  }

  const scrollToHash = (hash: string, smooth = true) => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (!target) return false
    target.scrollIntoView({ behavior: smooth && !reducedMotion() ? 'smooth' : 'instant', block: 'start' })
    if (target.tabIndex < 0 && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(target.tagName)) {
      target.setAttribute('tabindex', '-1')
    }
    target.focus({ preventScroll: true })
    return true
  }

  async function render(url: URL) {
    const found = match(url.pathname)
    const ctx: RouteContext = { params: found?.params ?? {}, query: url.searchParams, hash: url.hash }
    const view = found?.route.resolve(ctx) ?? notFound
    currentKey = url.pathname + url.search

    const swap = () => {
      cleanups.forEach((fn) => fn())
      cleanups = []
      main.innerHTML = view.render(ctx)
      document.title = view.title === SITE_NAME ? SITE_NAME : `${view.title} | ${SITE_NAME}`
      updateActiveNav(url.pathname)
      if (!url.hash) window.scrollTo({ top: 0, behavior: 'instant' })
      window.dispatchEvent(new CustomEvent('route:change'))
    }

    const isFirst = firstRender
    firstRender = false

    if (!isFirst && document.startViewTransition && !reducedMotion()) {
      await document.startViewTransition(swap).updateCallbackDone
    } else {
      swap()
    }

    const viewCleanup = view.mount?.(main, ctx)
    if (viewCleanup) cleanups.push(viewCleanup)
    cleanups.push(initMotion(main))

    if (url.hash) requestAnimationFrame(() => scrollToHash(url.hash, false))
    else if (!isFirst) main.focus({ preventScroll: true })

    if (!isFirst) announcer.textContent = `Página: ${view.title}`
  }

  const navigate = (to: string | URL, replace = false) => {
    const url = new URL(to, location.href)
    if (replace) history.replaceState(null, '', url)
    else history.pushState(null, '', url)
    void render(url)
  }

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href]')
    if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return

    const url = new URL(a.href, location.href)
    if (url.origin !== location.origin || url.pathname.startsWith('/assets/')) return

    e.preventDefault()
    const samePage = url.pathname + url.search === currentKey
    if (samePage) {
      if (url.hash) {
        history.pushState(null, '', url)
        scrollToHash(url.hash)
      } else {
        window.scrollTo({ top: 0, behavior: reducedMotion() ? 'instant' : 'smooth' })
      }
      return
    }
    navigate(url)
  })

  window.addEventListener('popstate', () => {
    const url = new URL(location.href)
    if (url.pathname + url.search === currentKey) scrollToHash(url.hash)
    else void render(url)
  })

  return {
    start: () => render(new URL(location.href)),
    navigate,
  }
}
