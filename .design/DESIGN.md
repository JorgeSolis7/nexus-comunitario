# Design System: Nexus Comunitario

## 1. Atmósfera

Sobrio, editorial y técnico, como un plano de levantamiento: papel mineral frío, tinta verde-negra
y un único azul cobalto de plano. La estructura sale de la retícula, la jerarquía tipográfica y el
espacio en blanco, no de contenedores. Sin tarjetas, sombras, degradados ni bordes decorativos;
las líneas finas solo separan filas de listas (cifras, índice, trayectoria, preguntas).

Elemento memorable: el titular del hero, enorme y asimétrico. Todo lo demás queda quieto.

## 2. Color (variante oscura automática con `prefers-color-scheme`)

| Rol | Token | Claro | Oscuro |
|-----|-------|-------|--------|
| Papel | `--paper` | `#ECEEE8` | `#121715` |
| Papel 2 | `--paper-2` | `#E2E5DE` | `#1A201D` |
| Tinta | `--ink` | `#17201C` | `#E3E7E2` |
| Pizarra (texto secundario) | `--slate` | `#55615B` (5.5:1) | `#9AA59F` |
| Trazo | `--rule` | `#C8CFC9` | `#2D3732` |
| Cobalto (enlaces, foco, activo) | `--cobalt` | `#2C44B0` (6.9:1) | `#93A3F5` |
| Error | `--danger` | `#A8281E` | `#FF8F84` |

## 3. Tipografía

Una sola familia: **Schibsted Grotesk Variable**. Titulares en peso 500 con tracking negativo;
cuerpo 400 a 17px / 1.6; cifras tabulares. Sin itálicas de acento, sin mayúsculas en rótulos,
sin etiquetas sobre los títulos, sin flechas en los botones.

| Uso | Token | Tamaño |
|-----|-------|--------|
| Hero | `--t-display` | `clamp(2.75rem, 7.6vw, 6.75rem)` / 0.98 |
| Título de página / cierre | `--t-title` | `clamp(2.5rem, 6vw, 4.75rem)` |
| Título de sección | `--t-h2` | `clamp(1.45rem, 2vw, 1.75rem)` |
| Subtítulo | `--t-h3` | 1.25rem |
| Entradilla | `--t-lead` | `clamp(1.2rem, 1.6vw, 1.4rem)` |
| Pequeño | `--t-small` | 0.875rem |

## 4. Retícula

12 columnas (`.grid`). En escritorio, cada sección pone su título en las columnas 1–3 y el
contenido en las 5–12. Hero: titular 1–10, entradilla 7–11. Cierre: título 1–7, texto 8–12.
En móvil todo ocupa el ancho completo. Dos secciones seguidas comparten un solo espacio vertical.

## 5. Movimiento (regla estricta)

- Una curva: **`--ease: cubic-bezier(0.215, 0.61, 0.355, 1)`** (easeOutCubic). Sin GSAP.
- `--dur-1` 180ms: cambios de color, botones, menú, fundido de filtros, transición de página.
- `--dur-2` 480ms: entrada al hacer scroll (opacidad + 8px) y acordeón.
- Hover: botón tinta → cobalto y −1px; títulos del índice → cobalto y −2px; enlaces → cobalto.
- Única secuencia orquestada: el encabezado de cada página entra en orden (80ms entre piezas).
- `prefers-reduced-motion`: todo visible y estático.

## 6. Componentes

- **Botón**: único, fondo tinta, radio 6px, 48px de alto.
- **Enlace**: subrayado fino en `--rule`; al hover, cobalto.
- **Índice de proyectos**: filas año / título / área y lugar / estado; toda la fila es enlace.
- **Campos**: solo línea inferior; foco con línea de 2px en tinta; error en `--danger` bajo el campo.
