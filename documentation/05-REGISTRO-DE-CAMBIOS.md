# Registro de cambios sobre fuentes externas

Qué se trajo de cada fuente y qué se modificó al portarlo. Sirve para armar la PR de
desarrollo sin tener que reconstruir el razonamiento.

## Desde `Envio internacional CLAUDE` (sólo lectura)

| Origen | Destino | Cambio |
|---|---|---|
| `src/styles/tokens.css` | `src/styles/tokens.css` | Copiado sin modificar. |
| `src/styles/globals.css` | `src/styles/globals.css` | Copiado sin modificar. |
| `src/assets/fonts/*.ttf` | `src/assets/fonts/` | Copiado sin modificar. |
| Convención de estructura | `src/` | Se conservan `app/`, `modules/<m>/components`, CSS Modules y alias `@/`. No se copiaron `core/`, `shared/`, `demo/` ni `devtools/`. |

**Nada del proyecto de origen fue modificado.**

## Desde `html reference` (sólo lectura)

| Origen | Destino | Cambio |
|---|---|---|
| `landing mi correo..html` | `reference/landing-original.html` | Se renombraron las rutas de assets a `./landing-original_files`. Queda fuera del build: es material de consulta, no se sirve. |
| `landing mi correo._files/` | — | No se copió. Los assets que usa la réplica se extrajeron uno por uno a `src/assets/`; el resto queda en el original de sólo lectura. |
| Banners y títulos (`banner-*.webp`) | `src/assets/img/` | Sin cambios. |
| Imágenes de tarjetas (`horizontal-card-image-*.svg`) | `src/assets/img/` | Sin cambios. |
| Logos de servicio | `src/assets/logos/` | Sin cambios. |
| Íconos de accesos, "por qué elegirnos", redes y chatbot | `src/assets/icons/` | Sin cambios. |

## Decisiones al portar de MUI a CSS Modules

| Original | Réplica | Motivo |
|---|---|---|
| MUI + emotion (CSS en runtime) | CSS Modules + tokens | El proyecto no incorpora MUI; los estilos quedan legibles y versionables. |
| Clases `css-*` generadas por hash | Clases con nombre por componente | Legibilidad y trazabilidad. |
| Valores literales en `sx` | Tokens en `landing.tokens.css` | Ningún hex ni medida tipográfica suelta en los `.module.css`. |
| Peso tipográfico 450 | 500 | No existe un `.ttf` de Gilroy en 450; el matching de CSS resuelve al 500. |
| Grilla de MUI (`Grid`, `Paper`, `Card`) | Flexbox propio | Se replicaron las medidas computadas, no la implementación. |
| Input outlined con `fieldset`/`legend` | Input con label flotante en CSS | Mismo comportamiento visible, sin el andamiaje de MUI. |
| Cuarta diapositiva clon del banner | Tres diapositivas con vuelta al inicio | Mismo resultado visible. |
| Menú de usuario logueado (oculto en el DOM) | No portado | Está en `display:none` en la landing sin sesión. |
| Scripts de GTM, Meta Pixel y chat de terceros | No portados | No aportan al prototipo de UX. |

## Utilidades de desarrollo agregadas

| Qué | Dónde | Para qué |
|---|---|---|
| Configuración `formulario-ff` | `.claude/launch.json` | Levanta el proyecto en el puerto 4320. |

Durante la reconstrucción hubo un middleware de Vite que servía el HTML guardado en
`/landing` para compararlo contra la réplica. Se retiró: el archivo no conserva los estilos,
así que abrirlo no aportaba nada, y su copia de assets pesaba 14 MB dentro de `public/`.

## Versión 2 de la landing (11/09/2026)

La v2 no toca fuentes externas: se arma sobre la v1. Estos son los cambios que hizo falta
hacer en código existente para que las dos versiones compartan contenido sin duplicarlo. En
ningún caso cambia lo que se ve en la v1.

| Qué | Dónde | Cambio |
|---|---|---|
| Contenido de "Gestionar Devolución" | `v1/components/ReturnsForm.tsx` (nuevo) | Textos, campo y botón salen de `ReturnsSection` a un componente propio, con sus estilos movidos tal cual. La sección de la v1 y el modal de la v2 lo usan. La v1 mantiene el `<p>` del título original; el modal lo usa como `<h2>` del diálogo. |
| Contenedor de la sección | `v1/components/ReturnsSection.*` | Queda sólo con la sección, el contenedor y el panel. |
| Datos de servicios | `v1/data/landing.content.ts` | Cada servicio suma un `id` estable, para que la v2 tome los enlaces de ahí sin copiarlos. |
| Reset de scroll | `app/ScrollToTop.tsx` | Reacciona sólo al cambio de ruta, ya no al del hash: en la v2 el hash abre y cierra el modal, y cerrarlo mandaba la página arriba. |
| Rutas | `app/router.tsx` | Se suman `/prototipo/v2` y `/prototipo/v2/fulfillment`. La segunda monta la misma página de Fulfillment. |

Lo nuevo de la v2 vive en `src/modules/prototype/v2/`. El detalle funcional está en
[08-PROPUESTA-V2.md](08-PROPUESTA-V2.md).

## Rediseño del bloque central de la v2 (11/09/2026)

A partir de una imagen de diseño provista por el usuario (captura de su Figma; la cuenta con
la que se trabaja hoy no tiene acceso a ese archivo). Otra vez, ningún cambio altera lo que
se ve en la v1: los componentes compartidos recibieron props **opcionales** cuyo valor por
defecto es el comportamiento de la landing original, y la piel de la v2 se aplica con un
`data-variant` en la sección, fuera del alcance de la v1.

| Qué | Dónde | Cambio |
|---|---|---|
| Título de sección | `v1/components/SectionHeading.tsx` | Prop `rules` (por defecto `true`). En `false` se omiten las reglas laterales; en mobile el título vuelve a centrarse, porque el `space-between` del layout con reglas lo dejaba contra el borde. |
| Accesos directos | `v1/components/ShortcutsSection.tsx` | Props `title`, `items`, `variant` y `headingRules`, todas con el valor de la v1 por defecto. La variante `v2` (tarjeta blanca con sombra, ícono centrado, CTA con subrayado amarillo) vive bajo `[data-variant='v2']`. |
| ¿Por qué elegirnos? | `v1/components/WhyUsSection.tsx` | Prop `headingRules`. |
| Carrusel | `v2/components/QuickAccessCarousel.*` | Pasa a panel navy redondeado con el título en blanco a la izquierda; la tarjeta lleva el ícono en una columna propia y la etiqueta "¡Nuevo!" en flujo bajo el título. Las flechas van en la calle que el panel reserva, sin apoyarse sobre las tarjetas. |
| Flechas del carrusel | `v2/components/QuickAccessCarousel.tsx` | **Corrección:** los extremos se calculaban una sola vez, en el primer render, cuando el track todavía medía 0 — la flecha de avance nacía deshabilitada y las últimas tres tarjetas quedaban inalcanzables en escritorio. Ahora un `ResizeObserver` recalcula cuando el track o las tarjetas cambian de tamaño. |
| Orden de accesos rápidos | `v2/data/quickAccess.content.ts` | `shortcutsV2` deriva el orden (Sucursales primero) de los datos de la v1 por título, sin copiarlos. |
| Títulos | `v2/data/quickAccess.content.ts` | El carrusel conserva "Conocé nuestros servicios"; "Accesos rápidos" pasa a nombrar la sección de Sucursales y Seguimiento. |

## Versión 3 de la landing (14/09/2026)

La v3 es la landing de la v1 sin ningún cambio visual: sólo cambia el destino del CTA de
Fulfillment, que abre el flyer del cliente en un visor. Un único cambio en código existente,
otra vez con una prop opcional que por defecto no altera la v1.

| Qué | Dónde | Cambio |
|---|---|---|
| CTA de servicios | `v1/components/ServicesSection.tsx` | Prop opcional `actions`: un mapa de servicio → función. El servicio que figura ahí muestra su CTA como botón (`aria-haspopup="dialog"`) en vez de enlace. Sin la prop —la v1— todos los CTA navegan igual que antes. |
| Rutas | `app/router.tsx` | Se suma `/prototipo/v3`. **No** hay `/prototipo/v3/fulfillment`: en esta propuesta Fulfillment no tiene pantalla propia. |
| Asset | `src/assets/img/Fulfillment.jpeg` | Flyer provisto por el cliente (1010 × 1600, 285 KB). Se usa tal cual, sin retocar. |

Lo nuevo de la v3 vive en `src/modules/prototype/v3/`. El visor no suma ninguna dependencia:
el zoom, el arrastre y el pinch se resuelven con eventos de puntero.

## Reformulación de la v3 (14/09/2026)

La propuesta del visor con el flyer quedó descartada el mismo día. La v3 pasa a tener una
**pantalla propia de Fulfillment** con un front distinto del de la landing, según el diseño de
Figma `13284:7345`. El detalle funcional está en [09-PROPUESTA-V3.md](09-PROPUESTA-V3.md).

| Qué | Dónde | Cambio |
|---|---|---|
| Visor de imagen | `v3/components/ImageDialog.*` | **Eliminado**, junto con el deep link `#fulfillment`. |
| Lógica del formulario | `v1/fulfillment/useContactForm.ts` (nuevo) | Los campos, las validaciones y el momento de validación salen de `ContactForm` a un hook propio. Lo usan la pantalla de la v1/v2 y la de la v3, que tienen el mismo formulario con distinto layout. `ContactForm` queda sólo con su marcado. |
| CTA de servicios | `v1/components/ServicesSection.tsx` | La prop `actions` (que convertía el CTA en botón para abrir el visor) se reemplaza por `hrefs`, que sólo cambia el destino. El CTA vuelve a ser siempre un enlace, que es lo que corresponde ahora que navega a una pantalla. |
| Rutas | `app/router.tsx` | Se suma `/prototipo/v3/fulfillment`. |
| Tipografía | `index.html` | Se carga **Poppins** desde Google Fonts: la pide el diseño de la v3. El resto del proyecto sigue usando sólo Gilroy, embebida desde `src/assets/fonts`. |
| Asset | `src/assets/img/banner ff formulario.png` | Imagen del hero, provista por el cliente. Se usa tal cual. |

Lo nuevo de la v3 vive en `src/modules/prototype/v3/fulfillment/`, con su propia capa de
tokens: esa pantalla no usa el lenguaje visual de la landing.

## Ajuste de ancho de la v3 (14/09/2026)

El contenido de la pantalla de Fulfillment de la v3 estaba limitado a 1010px —el ancho del
diseño de Figma— y en pantallas grandes se veía angosto, con mucho aire a los costados
(feedback del usuario). Se amplió a 1320px, el mismo ancho máximo que usa la landing
(`--landing-container-max`), en `v3/fulfillment/fulfillment.tokens.css`. Las columnas de
servicios y de inputs son grillas fijas a 2, así que el cambio sólo ensancha las columnas: no
altera el layout.

## Corrección de "Número de cliente" en la v3 (14/09/2026)

El campo se agregaba al grid de dos columnas de inputs, arriba de la pregunta "¿Ya sos
cliente de MiCorreo?" que lo habilita — quedaba desalineado del control que lo muestra
(feedback del usuario, con captura). En
[`v3/fulfillment/FulfillmentForm.tsx`](../src/modules/prototype/v3/fulfillment/FulfillmentForm.tsx)
el campo se movió fuera de `.fields`, a después del `<fieldset>` de la pregunta: ahora aparece
justo debajo de "Sí" / "No", acotado al ancho de una columna (`.numeroCliente`, media
columna en escritorio; ancho completo en mobile, como el resto de los campos).

## Tamaño de los encabezados de columna en la v3 (14/09/2026)

"¿Qué incluye nuestro fulfillment?" y "Distribución rápida y confiable" usaban
`--landing-font-size-body` (16px) por error de copiado: no hay un paso de 20 en la escala de
la landing, que es lo que pedía el diseño (feedback del usuario). Se agregó el token propio
`--ffv3-group-heading-size: 20px` en
[`fulfillment.tokens.css`](../src/modules/prototype/v3/fulfillment/fulfillment.tokens.css) y
`.groupHeading` en `FulfillmentPage.module.css` pasó a usarlo.
