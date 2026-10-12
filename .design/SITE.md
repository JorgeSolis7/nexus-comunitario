# Project Vision

> **AGENT INSTRUCTION:** Leer este archivo antes de cada iteración. Es la memoria de largo plazo del proyecto.

## 1. Core Identity

| Campo | Valor |
|-------|-------|
| **Proyecto** | Nexus Comunitario (ficticio, pieza de portafolio) |
| **Misión** | Laboratorio de innovación cívica que une comunidades, diseño y tecnología para crear proyectos públicos medibles. |
| **Audiencia** | Gobiernos locales, organizaciones comunitarias, aliados y voluntariado. |
| **Voz y tono** | Clara, optimista, concreta. Datos antes que adjetivos. Tuteo. |
| **Región** | Costa Rica — teléfonos `+506 0000 0000`, fechas `12 nov 2026`. |

## 2. Visual Language

Ver `DESIGN.md`. Editorial y sobrio: papel mineral, tinta y cobalto; estructura por retícula y tipografía, sin tarjetas.

## 3. Technical Setup

- SPA Vite + TypeScript sin framework. Cada "página" del loop es una vista en `frontend/src/pages/*.ts`.
- Router: `frontend/src/router.ts` (History API + View Transitions).
- Layout compartido: `components/Header.ts`, `components/Footer.ts` (se renderizan una vez).
- Contenido: `frontend/src/content/*.ts`. Estilos: `frontend/src/styles/*.css`.
- Animación: CSS con una sola curva (`--ease`); `animations/motion.ts` solo marca la entrada en pantalla.
- Servidor: `npm run dev` → http://localhost:5180

## 4. Live Sitemap

- [x] `/` — Inicio: hero, cifras, áreas, proyectos recientes, proceso, voces, cierre
- [x] `/nosotros` — Historia, misión/visión, principios, trayectoria, equipo
- [x] `/proyectos` — Portafolio con filtros por área
- [x] `/proyectos/:slug` — Caso de estudio
- [x] `/contacto` — Formulario con validación simulada, datos, preguntas frecuentes
- [x] `*` — 404

## 5. Roadmap (Backlog)

- [ ] `/blog` — Notas de campo.

## 6. Ideas
- [ ] Mapa interactivo de proyectos.

## 7. Rules of Engagement

1. No recrear vistas marcadas `[x]`.
2. Actualizar `.design/next-prompt.md` al terminar cada iteración.
3. Header y footer solo viven en sus componentes.
4. Toda animación usa `--ease` y `--dur-1` / `--dur-2` de `tokens.css`. Sin contenedores decorativos.
