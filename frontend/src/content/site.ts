// Contenido general del sitio. Nexus Comunitario es una organización ficticia (pieza de portafolio).

export interface NavLink {
  label: string
  href: string
}

export const SITE_NAME = 'Nexus Comunitario'

export const navLinks: NavLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Contacto', href: '/contacto' },
]

export const ctaLink: NavLink = { label: 'Colaborar', href: '/contacto?interes=institucional' }

export const partners = [
  'Red Cantonal de Juventudes',
  'Laboratorio Pacífico',
  'Fundación Aurora Verde',
  'Cooperativa Brisa',
  'Taller Faro',
  'Colectivo Sendero',
  'Instituto Mareas',
  'Huerta Abierta',
]

export const stats = [
  { value: 48, suffix: '', label: 'proyectos entregados', note: 'en 9 cantones' },
  { value: 12, suffix: 'k', label: 'personas beneficiadas', note: 'medición 2025' },
  { value: 320, suffix: '', label: 'voluntarios activos', note: 'red permanente' },
  { value: 94, suffix: '%', label: 'proyectos sostenidos', note: 'a 2 años de su entrega' },
]

export const areas = [
  {
    key: 'espacio',
    title: 'Espacio público',
    text: 'Parques, aceras y plazas co-diseñados con quienes los usan todos los días.',
  },
  {
    key: 'digital',
    title: 'Inclusión digital',
    text: 'Conectividad, alfabetización y herramientas abiertas para comunidades rurales.',
  },
  {
    key: 'ambiente',
    title: 'Clima y ambiente',
    text: 'Sensores de agua, huertas urbanas y planes de adaptación con datos locales.',
  },
  {
    key: 'economia',
    title: 'Economía local',
    text: 'Mercados, cooperativas y capacitación para que el valor se quede en el barrio.',
  },
] as const

export const process = [
  {
    step: '01',
    title: 'Escuchar',
    text: 'Recorridos, mapeos y talleres abiertos. Antes de proponer, entendemos cómo vive el problema la comunidad.',
  },
  {
    step: '02',
    title: 'Co-diseñar',
    text: 'Prototipos rápidos con vecinas, vecinos y especialistas. Probamos en pequeño antes de invertir en grande.',
  },
  {
    step: '03',
    title: 'Construir',
    text: 'Ejecutamos con mano de obra local y presupuestos públicos y transparentes, publicados cada mes.',
  },
  {
    step: '04',
    title: 'Medir y transferir',
    text: 'Indicadores abiertos y una comunidad capacitada para sostener el proyecto sin depender de nosotros.',
  },
]

export const testimonials = [
  {
    quote:
      'Por primera vez nos preguntaron qué necesitábamos antes de traer los planos. El parque se siente nuestro porque lo dibujamos nosotros.',
    name: 'Marta Solano',
    role: 'Asociación de Desarrollo, Barrio El Carmen',
  },
  {
    quote:
      'Los sensores del río nos avisaron de dos crecidas este invierno. Ahora la escuela tiene un protocolo y los chicos saben leer los datos.',
    name: 'Esteban Quirós',
    role: 'Director, Escuela Río Claro',
  },
  {
    quote:
      'Pasamos de vender en la orilla de la carretera a tener tienda en línea y pedidos semanales. Lo aprendimos en seis sesiones.',
    name: 'Lucía Fernández',
    role: 'Cooperativa de Mujeres Cafetaleras',
  },
]

export const contact = {
  phone: '+506 0000 0000',
  email: 'hola@nexuscomunitario.org',
  address: 'Barrio Escalante, San José, Costa Rica',
  hours: 'Lunes a viernes, de 8:30 a. m. a 5:30 p. m.',
}

export const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'GitHub', href: 'https://github.com' },
]

export const footerGroups = [
  {
    title: 'Explorar',
    links: [
      { label: 'Inicio', href: '/' },
      { label: 'Nosotros', href: '/nosotros' },
      { label: 'Equipo', href: '/nosotros#equipo' },
      { label: 'Proyectos', href: '/proyectos' },
    ],
  },
  {
    title: 'Participar',
    links: [
      { label: 'Proponer un proyecto', href: '/contacto?interes=proyecto' },
      { label: 'Ser voluntario', href: '/contacto?interes=voluntariado' },
      { label: 'Colaboración institucional', href: '/contacto?interes=institucional' },
      { label: 'Preguntas frecuentes', href: '/contacto#faq' },
    ],
  },
]
