import type { View } from '../router'

export const notFoundView: View = {
  title: 'Página no encontrada',
  render: () => `
<section class="hero hero--short">
  <div class="container grid">
    <h1 class="hero__title" data-reveal>Esta página no existe.</h1>
    <div class="hero__aside" data-reveal>
      <p class="hero__lead">Puede que el enlace haya cambiado o que la dirección tenga un error.</p>
      <div class="actions">
        <a class="btn" href="/">Ir al inicio</a>
        <a class="link link--strong" href="/proyectos">Ver proyectos</a>
      </div>
    </div>
  </div>
</section>`,
}
