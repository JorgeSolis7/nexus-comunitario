// Casos de estudio de ejemplo (organización ficticia).

import type { areas } from './site'

export type AreaKey = (typeof areas)[number]['key']

export interface Project {
  slug: string
  title: string
  area: AreaKey
  areaLabel: string
  place: string
  year: string
  status: 'Entregado' | 'En curso' | 'Piloto'
  summary: string
  metrics: { value: string; label: string }[]
  challenge: string
  approach: string[]
  outcome: string
  partners: string[]
}

export const projects: Project[] = [
  {
    slug: 'parque-lineal-rio-torres',
    title: 'Parque Lineal Río Torres',
    area: 'espacio',
    areaLabel: 'Espacio público',
    place: 'San José',
    year: '2025',
    status: 'Entregado',
    summary: 'Un lote baldío junto al río se convirtió en 1,2 km de parque diseñado por 400 vecinos en 11 talleres.',
    metrics: [
      { value: '1,2 km', label: 'de sendero recuperado' },
      { value: '400', label: 'personas co-diseñadoras' },
      { value: '-38%', label: 'reportes de inseguridad' },
    ],
    challenge:
      'La orilla del río era un botadero informal y una zona que las familias evitaban al caer la tarde. Las propuestas anteriores llegaron con planos cerrados y nunca se construyeron.',
    approach: [
      'Recorridos nocturnos con vecinas para mapear puntos de miedo y de oportunidad.',
      'Once talleres de maqueta abierta; cada decisión de mobiliario se votó en asamblea.',
      'Construcción por etapas con cuadrillas locales y un presupuesto publicado cada mes.',
    ],
    outcome:
      'El parque abre de 5 a. m. a 9 p. m., lo gestiona un comité vecinal y se ha replicado el método en dos cantones más.',
    partners: ['Municipalidad local', 'Fundación Aurora Verde', 'Taller Faro'],
  },
  {
    slug: 'red-wifi-montana',
    title: 'Red Wifi Montaña',
    area: 'digital',
    areaLabel: 'Inclusión digital',
    place: 'Zona Norte',
    year: '2024',
    status: 'Entregado',
    summary: 'Malla de 22 nodos solares que conecta a cinco comunidades rurales sin cobertura comercial.',
    metrics: [
      { value: '22', label: 'nodos solares' },
      { value: '1.800', label: 'personas conectadas' },
      { value: '₡0', label: 'costo mensual por hogar' },
    ],
    challenge:
      'Cinco caseríos de montaña quedaban a más de 15 km de la antena más cercana. Estudiantes caminaban hasta una loma para enviar tareas.',
    approach: [
      'Diseño de una red en malla con hardware abierto y paneles solares de bajo mantenimiento.',
      'Formación de 18 jóvenes técnicos locales que instalan y reparan los nodos.',
      'Modelo de gobernanza cooperativa para sostener la red sin cuota mensual.',
    ],
    outcome: 'La red mantiene un 99,1 % de disponibilidad y los técnicos formados ya dan soporte a comunidades vecinas.',
    partners: ['Red Cantonal de Juventudes', 'Laboratorio Pacífico'],
  },
  {
    slug: 'sensores-rio-claro',
    title: 'Sensores Río Claro',
    area: 'ambiente',
    areaLabel: 'Clima y ambiente',
    place: 'Pacífico Sur',
    year: '2025',
    status: 'En curso',
    summary: 'Alerta temprana de crecidas con sensores de bajo costo y un tablero que la escuela usa en clase.',
    metrics: [
      { value: '9', label: 'estaciones de medición' },
      { value: '2', label: 'crecidas anticipadas' },
      { value: '15 min', label: 'de aviso promedio' },
    ],
    challenge:
      'Las crecidas repentinas afectaban la escuela y una docena de casas sin ningún aviso previo.',
    approach: [
      'Estaciones de nivel y lluvia construidas con estudiantes de secundaria.',
      'Tablero abierto y alertas por mensajería conectadas al comité de emergencias.',
      'Guías didácticas para que el colegio use los datos en ciencias y matemática.',
    ],
    outcome: 'Dos evacuaciones preventivas sin daños personales y un protocolo escolar adoptado por la dirección regional.',
    partners: ['Instituto Mareas', 'Escuela Río Claro'],
  },
  {
    slug: 'mercado-de-la-esquina',
    title: 'Mercado de la Esquina',
    area: 'economia',
    areaLabel: 'Economía local',
    place: 'Cartago',
    year: '2024',
    status: 'Entregado',
    summary: 'Plataforma y feria semanal para 60 productores que antes dependían de intermediarios.',
    metrics: [
      { value: '60', label: 'productores' },
      { value: '+41%', label: 'ingreso promedio' },
      { value: '3.200', label: 'pedidos al año' },
    ],
    challenge:
      'Productoras de hortalizas y café vendían a precio de intermediario y sin acceso a clientes urbanos.',
    approach: [
      'Seis sesiones de capacitación en ventas digitales, fotografía y logística.',
      'Tienda en línea compartida con pagos SINPE y rutas de entrega agrupadas.',
      'Feria física semanal diseñada como espacio público temporal.',
    ],
    outcome: 'La cooperativa administra la plataforma de forma autónoma desde el segundo año.',
    partners: ['Cooperativa Brisa', 'Huerta Abierta'],
  },
  {
    slug: 'aceras-para-todos',
    title: 'Aceras para Todas las Personas',
    area: 'espacio',
    areaLabel: 'Espacio público',
    place: 'Heredia',
    year: '2023',
    status: 'Entregado',
    summary: 'Auditoría ciudadana de 38 km de aceras y un plan priorizado que la municipalidad ya ejecuta.',
    metrics: [
      { value: '38 km', label: 'auditados' },
      { value: '1.140', label: 'puntos críticos' },
      { value: '62%', label: 'ya corregidos' },
    ],
    challenge: 'Personas mayores y usuarias de silla de ruedas no podían recorrer su propio distrito con seguridad.',
    approach: [
      'App abierta para registrar obstáculos con foto y geolocalización.',
      'Jornadas de auditoría con personas con discapacidad como guías expertas.',
      'Mapa de prioridades entregado al concejo con costos estimados.',
    ],
    outcome: 'El plan se incorporó al presupuesto municipal y se actualiza con nuevos reportes cada trimestre.',
    partners: ['Colectivo Sendero'],
  },
  {
    slug: 'huertas-escolares-vivas',
    title: 'Huertas Escolares Vivas',
    area: 'ambiente',
    areaLabel: 'Clima y ambiente',
    place: 'Guanacaste',
    year: '2026',
    status: 'Piloto',
    summary: 'Huertas con riego inteligente en 12 escuelas para enfrentar la sequía y mejorar los comedores.',
    metrics: [
      { value: '12', label: 'escuelas' },
      { value: '-55%', label: 'consumo de agua' },
      { value: '900', label: 'estudiantes' },
    ],
    challenge: 'La sequía prolongada encarecía los comedores escolares y las huertas tradicionales no sobrevivían al verano.',
    approach: [
      'Riego por goteo con sensores de humedad y cosecha de lluvia.',
      'Currículo práctico co-creado con docentes de primaria.',
      'Bancos de semillas criollas administrados por familias.',
    ],
    outcome: 'Piloto en evaluación; los primeros comedores ya reciben el 30 % de sus hortalizas de la propia huerta.',
    partners: ['Huerta Abierta', 'Fundación Aurora Verde'],
  },
]

export const findProject = (slug: string) => projects.find((p) => p.slug === slug)
