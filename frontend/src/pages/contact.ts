import { PageHero, Section } from '../components/blocks'
import { icon } from '../components/icons'
import { contact } from '../content/site'
import type { View } from '../router'
import { initAccordion } from '../utils/accordion'
import { initContactForm } from '../utils/contactForm'

const interests = [
  { value: 'proyecto', label: 'Proponer un proyecto' },
  { value: 'institucional', label: 'Colaboración institucional' },
  { value: 'voluntariado', label: 'Voluntariado' },
  { value: 'prensa', label: 'Prensa' },
]

const faqs = [
  {
    q: '¿Cuánto cuesta trabajar con Nexus?',
    a: 'Depende del alcance. Los diagnósticos comunitarios son gratuitos; los proyectos se financian con fondos públicos, cooperación o aportes privados, y el presupuesto se publica completo desde el inicio.',
  },
  {
    q: '¿Trabajan fuera de la Gran Área Metropolitana?',
    a: 'Sí. Hoy tenemos proyectos en nueve cantones, la mayoría en zonas rurales y costeras. Priorizamos comunidades con poco acceso a servicios.',
  },
  {
    q: '¿Qué necesito para ser voluntario?',
    a: 'Unas cuatro horas al mes. Hay tareas de campo, diseño, datos, comunicación y logística. Damos una inducción de dos sesiones antes de empezar.',
  },
  {
    q: '¿Cuánto tarda un proyecto típico?',
    a: 'Entre cuatro y doce meses: uno o dos de escucha y diseño, el resto de construcción y una etapa de transferencia para que la comunidad lo sostenga.',
  },
]

const Field = (o: { name: string; label: string; type?: string; autocomplete?: string; optional?: boolean }) => `
<div class="field" data-field="${o.name}">
  <label class="field__label" for="${o.name}">${o.label}${o.optional ? ' <span class="muted">(opcional)</span>' : ''}</label>
  <div class="field__wrap">
    <input class="field__control" id="${o.name}" name="${o.name}" type="${o.type ?? 'text'}"
      ${o.autocomplete ? `autocomplete="${o.autocomplete}"` : ''} aria-describedby="${o.name}-msg" ${o.optional ? '' : 'required'} />
    <span class="field__status" aria-hidden="true">${icon('check', 16)}</span>
  </div>
  <p class="field__msg" id="${o.name}-msg"></p>
</div>`

export const contactView: View = {
  title: 'Contacto',
  render: ({ query }) => {
    const pre = query.get('interes')
    const selected = interests.some((i) => i.value === pre) ? pre : null
    return `
${PageHero({
  title: 'Escríbenos.',
  lead: 'Con tu idea, tu pregunta o tus ganas de ayudar. Respondemos en menos de cinco días hábiles.',
})}

<section class="section section--flush">
  <div class="container grid">
    <div class="contact__form" data-reveal>
      <div class="error-summary" role="alert" tabindex="-1" data-error-summary hidden>
        <p class="error-summary__title">${icon('alert', 18)}Revisa estos campos:</p>
        <ul data-error-list></ul>
      </div>

      <form class="form" data-contact-form novalidate>
        <div class="form__row">
          ${Field({ name: 'nombre', label: 'Nombre completo', autocomplete: 'name' })}
          ${Field({ name: 'correo', label: 'Correo electrónico', type: 'email', autocomplete: 'email' })}
        </div>
        ${Field({ name: 'organizacion', label: 'Organización o comunidad', autocomplete: 'organization', optional: true })}

        <fieldset class="field" data-field="interes">
          <legend class="field__label">Motivo</legend>
          <div class="choices">
            ${interests
              .map(
                (i) => `
              <label class="choice">
                <input type="radio" name="interes" value="${i.value}" ${i.value === selected ? 'checked' : ''} aria-describedby="interes-msg" />
                <span>${i.label}</span>
              </label>`,
              )
              .join('')}
          </div>
          <p class="field__msg" id="interes-msg"></p>
        </fieldset>

        <div class="field" data-field="mensaje">
          <label class="field__label" for="mensaje">Mensaje</label>
          <div class="field__wrap">
            <textarea class="field__control field__control--area" id="mensaje" name="mensaje" rows="5" maxlength="600"
              aria-describedby="mensaje-msg mensaje-count" required></textarea>
          </div>
          <div class="field__foot">
            <p class="field__msg" id="mensaje-msg">Mínimo 20 caracteres.</p>
            <p class="field__count" id="mensaje-count"><span data-counter>0</span>/600</p>
          </div>
        </div>

        <div class="field" data-field="acepto">
          <label class="check">
            <input type="checkbox" name="acepto" aria-describedby="acepto-msg" />
            <span class="check__box" aria-hidden="true">${icon('check', 13)}</span>
            <span>Acepto que Nexus use estos datos solo para responder mi mensaje.</span>
          </label>
          <p class="field__msg" id="acepto-msg"></p>
        </div>

        <button class="btn form__submit" type="submit" data-submit>
          <span class="btn__label" data-submit-label>Enviar mensaje</span>
          <span class="btn__spinner" aria-hidden="true"></span>
        </button>
      </form>

      <div class="form-success" data-form-success tabindex="-1" hidden>
        <h2 class="form-success__title">Mensaje enviado. Gracias, <span data-success-name></span>.</h2>
        <p>Te responderemos a <strong data-success-email></strong> en menos de cinco días hábiles.</p>
        <p class="muted">Este formulario es una demostración: ningún dato salió de tu navegador.</p>
        <button class="link link--strong" type="button" data-form-reset>Enviar otro mensaje</button>
      </div>
    </div>

    <dl class="contact__details" data-reveal>
      <div><dt>Correo</dt><dd><a class="link" href="mailto:${contact.email}">${contact.email}</a></dd></div>
      <div><dt>Teléfono</dt><dd><a class="link" href="tel:${contact.phone.replace(/\s/g, '')}">${contact.phone}</a></dd></div>
      <div><dt>Laboratorio</dt><dd>${contact.address}</dd></div>
      <div><dt>Horario</dt><dd>${contact.hours}</dd></div>
    </dl>
  </div>
</section>

${Section({
  title: 'Preguntas frecuentes',
  id: 'faq',
  body: `
  <div class="accordion" data-accordion data-reveal>
    ${faqs
      .map(
        (f, i) => `
      <div class="accordion__item">
        <h3 class="accordion__heading">
          <button class="accordion__trigger" type="button" aria-expanded="false" aria-controls="faq-${i}" id="faq-btn-${i}">
            <span>${f.q}</span><span class="accordion__icon">${icon('plus', 18)}</span>
          </button>
        </h3>
        <div class="accordion__panel" id="faq-${i}" role="region" aria-labelledby="faq-btn-${i}">
          <div class="accordion__inner"><p>${f.a}</p></div>
        </div>
      </div>`,
      )
      .join('')}
  </div>`,
})}
`
  },
  mount: (root) => {
    const offs = [initContactForm(root), initAccordion(root)]
    return () => offs.forEach((fn) => fn())
  },
}
