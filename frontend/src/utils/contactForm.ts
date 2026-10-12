// Validación del formulario de contacto (simulada, sin backend).
// - Valida al salir de cada campo y, una vez tocado, mientras se escribe.
// - Al enviar con errores: resumen enfocable con enlaces a cada campo.
// - Envío correcto: estado de carga y mensaje de éxito simulado.

type Values = Record<string, string>
type Rule = (v: Values) => string | null

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const rules: Record<string, Rule> = {
  nombre: ({ nombre }) =>
    !nombre ? 'Escribe tu nombre completo.' : nombre.length < 3 ? 'El nombre necesita al menos 3 letras.' : null,
  correo: ({ correo }) =>
    !correo ? 'Escribe tu correo electrónico.' : !EMAIL.test(correo) ? 'Revisa el formato, por ejemplo: nombre@correo.com' : null,
  interes: ({ interes }) => (!interes ? 'Elige una opción.' : null),
  mensaje: ({ mensaje }) =>
    !mensaje ? 'Cuéntanos tu idea o pregunta.' : mensaje.length < 20 ? `Faltan ${20 - mensaje.length} caracteres.` : null,
  acepto: ({ acepto }) => (!acepto ? 'Necesitamos tu autorización para responderte.' : null),
}

const labels: Record<string, string> = {
  nombre: 'Nombre',
  correo: 'Correo',
  interes: 'Motivo',
  mensaje: 'Mensaje',
  acepto: 'Autorización',
}

const hints: Record<string, string> = { mensaje: 'Mínimo 20 caracteres.' }

export function initContactForm(root: HTMLElement): () => void {
  const form = root.querySelector<HTMLFormElement>('[data-contact-form]')
  if (!form) return () => {}

  const summary = root.querySelector<HTMLElement>('[data-error-summary]')!
  const summaryList = root.querySelector<HTMLElement>('[data-error-list]')!
  const success = root.querySelector<HTMLElement>('[data-form-success]')!
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!
  const submitLabel = submit.querySelector<HTMLElement>('[data-submit-label]')!
  const counter = root.querySelector<HTMLElement>('[data-counter]')!
  const message = form.querySelector<HTMLTextAreaElement>('#mensaje')!
  const touched = new Set<string>()
  let timer = 0

  const values = (): Values => {
    const data = new FormData(form)
    return Object.fromEntries(Object.keys(rules).map((k) => [k, String(data.get(k) ?? '').trim()]))
  }

  const setState = (name: string, msg: string | null) => {
    const wrap = form.querySelector<HTMLElement>(`[data-field="${name}"]`)!
    const out = wrap.querySelector<HTMLElement>('.field__msg')!
    const hasValue = values()[name] !== ''
    wrap.classList.toggle('is-invalid', !!msg)
    wrap.classList.toggle('is-valid', !msg && hasValue)
    wrap.querySelectorAll('input, textarea').forEach((c) => c.setAttribute('aria-invalid', String(!!msg)))
    out.textContent = msg ?? hints[name] ?? ''
  }

  const validate = (name: string) => {
    const msg = rules[name](values())
    setState(name, msg)
    return msg
  }

  const updateCounter = () => {
    counter.textContent = String(message.value.length)
  }

  const nameOf = (el: EventTarget | null) => (el as HTMLInputElement | null)?.name
  const onBlur = (e: FocusEvent) => {
    const name = nameOf(e.target)
    if (!name || !rules[name]) return
    if (values()[name] !== '' || touched.has(name)) {
      touched.add(name)
      validate(name)
    }
  }
  const onInput = (e: Event) => {
    const name = nameOf(e.target)
    if (name === 'mensaje') updateCounter()
    if (name && rules[name] && touched.has(name)) validate(name)
  }
  const onChange = (e: Event) => {
    const name = nameOf(e.target)
    if (name === 'interes' || name === 'acepto') {
      touched.add(name)
      validate(name)
    }
  }
  form.addEventListener('focusout', onBlur)
  form.addEventListener('input', onInput)
  form.addEventListener('change', onChange)

  // Enlaces del resumen: enfocan el campo.
  summaryList.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[data-target]')
    if (!a) return
    e.preventDefault()
    const control = form.querySelector<HTMLElement>(`[name="${a.dataset.target}"]`)!
    control.focus({ preventScroll: true })
    control.scrollIntoView({ block: 'center', behavior: 'smooth' })
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const errors = Object.keys(rules)
      .map((name) => {
        touched.add(name)
        return { name, msg: validate(name) }
      })
      .filter((x): x is { name: string; msg: string } => x.msg !== null)

    if (errors.length) {
      summaryList.innerHTML = errors
        .map((x) => `<li><a href="#${x.name}" data-target="${x.name}">${labels[x.name]}: ${x.msg}</a></li>`)
        .join('')
      summary.hidden = false
      summary.focus()
      return
    }

    summary.hidden = true
    submit.disabled = true
    submit.setAttribute('aria-busy', 'true')
    submit.classList.add('is-loading')
    submitLabel.textContent = 'Enviando…'

    // Envío simulado.
    timer = window.setTimeout(() => {
      const v = values()
      root.querySelector<HTMLElement>('[data-success-name]')!.textContent = v.nombre.split(' ')[0]
      root.querySelector<HTMLElement>('[data-success-email]')!.textContent = v.correo
      form.hidden = true
      success.hidden = false
      success.focus()
    }, 1600)
  })

  root.querySelector('[data-form-reset]')!.addEventListener('click', () => {
    form.reset()
    touched.clear()
    Object.keys(rules).forEach((name) => {
      const wrap = form.querySelector<HTMLElement>(`[data-field="${name}"]`)!
      wrap.classList.remove('is-invalid', 'is-valid')
      wrap.querySelectorAll('input, textarea').forEach((c) => c.removeAttribute('aria-invalid'))
      wrap.querySelector<HTMLElement>('.field__msg')!.textContent = hints[name] ?? ''
    })
    submit.disabled = false
    submit.removeAttribute('aria-busy')
    submit.classList.remove('is-loading')
    submitLabel.textContent = 'Enviar mensaje'
    updateCounter()
    success.hidden = true
    form.hidden = false
    form.querySelector<HTMLInputElement>('#nombre')!.focus()
  })

  return () => window.clearTimeout(timer)
}

/** Boletín del footer: validación mínima con mensaje en vivo. */
export function initNewsletter(): void {
  const form = document.querySelector<HTMLFormElement>('[data-newsletter]')
  if (!form) return
  const input = form.querySelector<HTMLInputElement>('input')!
  const msg = form.querySelector<HTMLElement>('[data-newsletter-msg]')!

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const ok = EMAIL.test(input.value.trim())
    form.classList.toggle('is-invalid', !ok)
    form.classList.toggle('is-valid', ok)
    input.setAttribute('aria-invalid', String(!ok))
    msg.textContent = ok ? '¡Listo! Te escribiremos el primer lunes de cada mes.' : 'Escribe un correo válido, por ejemplo: tu@correo.com'
    if (ok) input.value = ''
  })
}
