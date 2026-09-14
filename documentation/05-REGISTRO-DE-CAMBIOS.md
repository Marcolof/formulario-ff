# Registro de cambios sobre fuentes externas

Qué se trajo de cada fuente y qué se modificó al portarlo. Sirve para armar la PR de
desarrollo sin tener que reconstruir el razonamiento.

> **Nota de lectura (14-09-2026).** Las entradas anteriores a la limpieza de ese día nombran
> rutas `v1/...` y `v2/...`. Al retirarse esas versiones, lo que la v3 seguía usando se movió
> a `v3/` conservando el historial de Git (`components/`, `data/`, `useContactForm.ts`). Para
> leer una entrada vieja: donde dice `v1/components/` o `v1/data/`, hoy es `v3/`. La última
> entrada de este documento detalla el movimiento.

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

Lo nuevo de la v2 vivía en `src/modules/prototype/v2/`. Su documento funcional
(`08-PROPUESTA-V2.md`) se eliminó junto con la versión el 14/09/2026 — el razonamiento
sobrevive en esta misma página, más abajo.

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
Figma `13284:7345`. El detalle funcional está en [08-PROPUESTA-V3.md](08-PROPUESTA-V3.md).

| Qué | Dónde | Cambio |
|---|---|---|
| Visor de imagen | `v3/components/ImageDialog.*` | **Eliminado**, junto con el deep link `#fulfillment`. |
| Lógica del formulario | `v1/fulfillment/useContactForm.ts` (nuevo) | Los campos, las validaciones y el momento de validación salen de `ContactForm` a un hook propio. Lo usan la pantalla de la v1/v2 y la de la v3, que tienen el mismo formulario con distinto layout. `ContactForm` queda sólo con su marcado. |
| CTA de servicios | `v1/components/ServicesSection.tsx` | La prop `actions` (que convertía el CTA en botón para abrir el visor) se reemplaza por `hrefs`, que sólo cambia el destino. El CTA vuelve a ser siempre un enlace, que es lo que corresponde ahora que navega a una pantalla. |
| Rutas | `app/router.tsx` | Se suma `/prototipo/v3/fulfillment`. |
| Tipografía | `index.html` | Se cargaba **Poppins** desde Google Fonts, que es lo que pide el diseño de la v3. **Retirada el 14-09-2026**, ver más abajo: toda la pantalla usa Gilroy. |
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

## Botón terciario reutilizable para los CTA de texto (14/09/2026)

Los CTA de tipo "Conocer más" / "Ingresá" (en "Conocé nuestros servicios" y "Accesos
directos"/"Accesos rápidos") no llevaban subrayado, salvo la variante v2 de "Accesos rápidos",
que sí lo tenía con una regla propia (feedback del usuario, con imagen de referencia de la
tarjeta de Fulfillment). El sistema de tokens (`src/styles/tokens.css`) ya define un botón
**terciario** (`--button-tertiary-*`: subrayado inferior, sin fondo) que no se estaba usando
en ningún lado — es el que corresponde acá.

Se agregó `.tertiary` a
[`Button.module.css`](../src/modules/prototype/v3/components/Button.module.css), la hoja
compartida de botones del sistema, y se aplicó con `composes` (CSS Modules) desde los tres
lugares que tienen este tipo de CTA, en vez de repetir la regla:

| Dónde | Cómo se aplicó |
|---|---|
| `ServicesSection.module.css` ("Conocé nuestros servicios", v1 y v3) | `.ctaLabel` en el `<p>` del CTA, con `composes: tertiary` |
| `ShortcutsSection.module.css` ("Accesos directos"/"Accesos rápidos", v1 y v2) | Mismo `.ctaLabel`, ahora en la regla base — se quitó el bloque `[data-variant='v2']` que quedó redundante |
| `QuickAccessCarousel.module.css` (carrusel de la v2) | `.ctaText`, en un `<span>` nuevo alrededor del texto — así el subrayado no se extiende debajo del ícono de flecha |

`composes` exige que el selector sea una única clase local (no `.cta p`), así que en
`ServicesSection.tsx` y `ShortcutsSection.tsx` el `<p>` del CTA pasó a llevar la clase
`ctaLabel` directamente, en vez de heredar el estilo por selector descendiente.

**Esto también corrige el CTA de la v1** ("Conocé nuestros servicios" y "Accesos directos"),
que hasta ahora no tenía subrayado. La v1 es la réplica fiel de la landing de producción,
verificada pixel a pixel contra `micorreo.correoargentino.com.ar/landing` — ese sitio real no
tiene este subrayado. El cambio es una decisión de diseño explícita del usuario para unificar
el sistema hacia adelante, no una corrección de fidelidad: **la v1 deja de coincidir con la
producción real en este detalle.**

## Aclaración de protección de datos, en las tres versiones (14/09/2026)

`form.disclaimer` (el texto chico debajo del botón "Enviar") pasa de "Tus datos están
protegidos." —el texto genérico del diseño de Figma— a "La información ingresada será
almacenada únicamente para gestionar tu solicitud y poder contactarte.", a pedido del
usuario. Es un dato compartido en
[`fulfillment.content.ts`](../src/modules/prototype/v3/data/fulfillment.content.ts), así que
cambió solo en las tres versiones. De paso, se corrigió una mención vieja a "de Correo
Argentino" que había quedado en el texto de confirmación de
[07-FORMULARIO-FULFILLMENT.md](07-FORMULARIO-FULFILLMENT.md) (el código ya estaba
actualizado; sólo la documentación había quedado atrás). Verificado en v1 y v3, en una línea,
sin desbordar la tarjeta.

Más tarde, el mismo día, ese texto **pasó de 11px a 14px** a pedido del usuario: a 11px
quedaba demasiado chico para un aviso sobre el uso de datos personales. Es la regla
`.disclaimer` de
[`FulfillmentForm.module.css`](../src/modules/prototype/v3/fulfillment/FulfillmentForm.module.css);
sigue entrando en una línea en escritorio.

## Color de foco de inputs y selects, en todo el sistema (14/09/2026)

El foco de `OutlinedField`/`OutlinedSelect` —el componente de Input/Select real del proyecto,
usado por las dos variantes (`landing` y `form`) en las tres versiones— estaba puesto a mano
con `--color-accent` (el azul de marca), en vez del token del sistema para foco de inputs:
`--border-focus` (`--blue-focus: #2196f3`), ya definido en `tokens.css` pero sin usar en
ningún lado. Corregido en las dos reglas de foco de
[`OutlinedField.module.css`](../src/modules/prototype/v3/components/OutlinedField.module.css)
(feedback del usuario, con referencia del token del Design System: "Inputs/Stroke/input-
stroke-focus"). Alcanza a todos los inputs y selects del formulario de Fulfillment (v1, v2 y
v3) y al campo de "Gestionar Devolución" de la landing. Verificado con clic real en el
navegador — `element.focus()` por script no dispara el `:focus` visual en este entorno de
pruebas, así que la verificación fue por captura, no por `getComputedStyle`.

## Orden de los campos del formulario, en las tres versiones (14/09/2026)

"Rubro de la empresa" pasa a ir donde estaba "Cod. área + Celular", y el teléfono baja a
donde estaba el rubro — pedido del usuario, "eso cambia para todas las alternativas". Cambio
de orden en el JSX únicamente (`ContactForm.tsx` para v1/v2, `FulfillmentForm.tsx` para v3);
las reglas y validaciones no cambiaron, viven igual en `useContactForm`. Verificado en
escritorio (una y dos columnas) y mobile. Ver
[07-FORMULARIO-FULFILLMENT.md](07-FORMULARIO-FULFILLMENT.md).

## Micro interacciones de la pantalla de Fulfillment de la v3 (14/09/2026)

Tres pedidos del usuario sobre la misma pantalla:

1. **Texto de confirmación.** `form.success.body`, en
   [`fulfillment.content.ts`](../src/modules/prototype/v3/data/fulfillment.content.ts), pasa
   de "...un asesor comercial **de Correo Argentino** se va a comunicar..." a "...un asesor
   comercial se va a comunicar...". Es un dato compartido por las tres versiones, así que el
   cambio se propaga solo.
2. **Transición del formulario al estado de éxito, en los dos sentidos.** Antes era un
   reemplazo directo (una condición, dos JSX distintos). Ahora, al enviar: salida animada de
   los campos seguida de entrada animada del bloque de éxito, con el botón "Cargar otra
   consulta" llegando de abajo hacia arriba. Al tocar ese botón: la misma transición al revés
   —el bloque de éxito se desvanece y, recién entonces, vuelven a aparecer los campos vacíos
   (pedido de seguimiento del usuario, mismo día). Detalle completo en
   [08-PROPUESTA-V3.md](08-PROPUESTA-V3.md#transición-y-micro-interacciones-14-09-2026).
   - **Bug encontrado y corregido en el camino:** el primer intento tenía un `useEffect` con
     `[sent, phase]` como dependencias. Al cambiar `phase` a `'leaving'`, React volvía a
     ejecutar el efecto y limpiaba (`clearTimeout`) el timer que acababa de programar, antes
     de que llegara a disparar el paso a `'success'` — la transición se quedaba trabada a
     mitad de camino. Se corrigió dejando la dependencia sólo en `sent`; la vuelta usa su
     propio timer, en el handler del botón, en vez de reaccionar a `sent`.
3. **Aparición con el scroll.** Cada sección de la pantalla (menos el hero) se desvanece hacia
   arriba la primera vez que entra en pantalla, con
   [`useReveal.ts`](../src/modules/prototype/v3/fulfillment/useReveal.ts) (nuevo,
   `IntersectionObserver`, sin librerías). Detalle en
   [08-PROPUESTA-V3.md](08-PROPUESTA-V3.md#micro-interacciones-de-scroll-14-09-2026).

## Escala de la imagen del hero de la v3 (14/09/2026, dos rondas)

La imagen del hero estaba al 146% de su caja, la proporción exacta del diseño de Figma, pero
recortaba bastante arriba y abajo. Primera ronda: se bajó un 15% —a **124%**— a pedido del
usuario. Segunda ronda: se pidió otro 15% —a 105%—, pero ese valor **deja huecos**: por la
proporción real de la imagen contra esta caja, por debajo de ~114% de ancho la imagen ya no
cubre el alto completo y aparecen franjas del fondo navy arriba y abajo. Además, un porcentaje
fijo de ancho sólo es seguro para el ancho de viewport contra el que se probó — la caja tiene
`flex: 1 1 0`, así que su proporción cambia con la pantalla.

Se resolvió cambiando de técnica: `.heroMedia img` pasa de un `width` en porcentaje fijo +
`height: auto` a **`width: 100%; height: 100%; object-fit: cover; object-position: left
center`**. El navegador calcula el recorte mínimo que cubre la caja para cualquier ancho de
viewport — sin huecos nunca, y es a la vez el recorte más chico posible, más cerca del pedido
del usuario que cualquier porcentaje fijo. Verificado sin huecos en 1440px y 1024px de ancho.
Ajuste en
[`FulfillmentPage.module.css`](../src/modules/prototype/v3/fulfillment/FulfillmentPage.module.css).

## Tamaño de los encabezados de columna en la v3 (14/09/2026)

"¿Qué incluye nuestro fulfillment?" y "Distribución rápida y confiable" usaban
`--landing-font-size-body` (16px) por error de copiado: no hay un paso de 20 en la escala de
la landing, que es lo que pedía el diseño (feedback del usuario). Se agregó el token propio
`--ffv3-group-heading-size: 20px` en
[`fulfillment.tokens.css`](../src/modules/prototype/v3/fulfillment/fulfillment.tokens.css) y
`.groupHeading` en `FulfillmentPage.module.css` pasó a usarlo.

## Limpieza: se retiran las versiones 1 y 2 (14/09/2026)

Pedido del usuario, con copia de seguridad hecha por él de antemano: **queda sólo la v3**.

**Qué se movió** (con `git mv`, para no perder el historial de cada archivo):

| De | A | Por qué |
|---|---|---|
| `v1/components/` | `v3/components/` | La landing de la v3 es la réplica: usa estos componentes. |
| `v1/data/landing.content.ts` · `v1/data/fulfillment.content.ts` | `v3/data/` | Textos, enlaces y la lista de rubros. |
| `v1/fulfillment/useContactForm.ts` | `v3/fulfillment/` | Las reglas del formulario; ya no hay dos pantallas que las compartan. |
| `v1/LandingPage.module.css` | `v3/` | Acompaña a `v3/LandingPage.tsx`. |

**Qué se borró:** `src/modules/prototype/v1/` y `/v2/` completos —incluidos `ContactForm.tsx`
(el formulario en una columna), la página de Fulfillment de la v1, el carrusel
`QuickAccessCarousel`, el modal de devolución y `v2/data/`—, el documento `08-PROPUESTA-V2.md`
y las rutas `/prototipo/v1`, `/prototipo/v1/fulfillment`, `/prototipo/v2`,
`/prototipo/v2/fulfillment`. Las URLs viejas no dan error: el catch-all del router las manda
al Hub. También se borraron los tokens `--ff-` que quedaron sin consumidor
(`--ff-content-max`, `--ff-hero-surface`, `--ff-icon-surface`, `--ff-benefit-surface`,
`--ff-text-hint`, `--ff-radius-card`, `--ff-radius-icon`).

**Qué se conservó a propósito:** las props opcionales `rules`, `headingRules`, `title`,
`items` y `variant` de los componentes compartidos, que hoy no tienen quién las cambie. Son el
punto de extensión de la regla "no se duplican componentes para hacer una variante", no código
muerto a limpiar sin decidirlo. Lo mismo con los assets `centro-logistico.png`, `map.png` y
`clients.svg`, que quedaron sin referencia.

**Renumeración de documentos:** `09-PROPUESTA-V3.md` pasa a `08-PROPUESTA-V3.md` para no dejar
un hueco en la serie. El `id` de la ruta del lector sigue siendo `propuesta-v3`.

## Menú del prototipo y panel de casos de uso (14/09/2026)

El botón "Volver al Hub" pasa a ser un **menú** con dos caminos: "Volver al hub" y "Simular
casos de uso", que abre un panel de tweaks con un chip por caso.

| Qué | Dónde | Detalle |
|---|---|---|
| Menú, panel y chips | `components/PrototypeChrome.tsx` + `.module.css` | Una sola columna fija abajo a la izquierda (la derecha la ocupa el chatbot de la landing). El menú se cierra al tocar fuera o con Escape; el panel, sólo con su botón, para poder comparar casos mientras se usa la pantalla. |
| Caso activo | `components/simulation.ts` (nuevo) | Contexto de React: el formulario está varios niveles abajo dentro de `children`. Por defecto `happy`, así que una pantalla montada fuera del chrome se comporta como en producción. |
| Caso "error de formulario" | `v3/fulfillment/useContactForm.ts` | Opción `forceError`: el envío nunca prospera y se agrega el mensaje general `SIMULATED_ERROR`. **No cambia ninguna regla de validación**, y el error aparece recién después de pulsar "Enviar". |

## Límites de longitud del formulario (14/09/2026)

Pedido del usuario. Tres de los cuatro **contradicen al documento formal de requerimiento**, y
quedan registrados como divergencia deliberada en
[07-FORMULARIO-FULFILLMENT.md](07-FORMULARIO-FULFILLMENT.md): hay que confirmarlos con el área
solicitante antes de desarrollo.

| Campo | Antes | Ahora |
|---|---|---|
| Razón social | 40 | **64** |
| Nombre y apellido | 60 | **64** |
| Correo electrónico | sin tope | **64** |
| Número de cliente | hasta 10 dígitos | **exactamente 10**, sólo números |
| Rubro "Otros" | 30 | 30 (sin cambio, verificado) |

Los valores dejan de estar escritos a mano en el JSX: `useContactForm` exporta `TEXTO_MAX`,
`RUBRO_OTRO_MAX` y `NUMERO_CLIENTE_LARGO`, y `FulfillmentForm` los usa como `maxLength`. Así
el patrón de validación y el tope del campo no pueden quedar desalineados.

## Módulo Presentación (14/09/2026)

Primer pedido de una nueva sesión de trabajo (traspaso de cuenta). Se invocó la skill
`presentacion-proyecto` y se agregó un módulo "Presentación" al Hub.

| Qué | Dónde | Cambio |
|---|---|---|
| Deck | `public/presentacion/presentacion.html` | Nuevo. HTML autocontenido (CSS y JS inline), capturas reales del prototipo y fuentes Gilroy locales. No es una ruta de React: se sirve como archivo estático de Vite bajo la misma URL. |
| Capturas | `public/presentacion/assets/screens/*.png` | Nuevas. Tomadas con Chrome headless contra el prototipo real en `localhost:4320`, no simuladas. |
| Landing del módulo | `src/modules/presentation/PresentationHome.tsx` | Nuevo, mismo patrón que `PrototypeHome`/`DocumentationHome` (`ModuleLayout`). |
| Rutas | `src/app/router.tsx` | Se suma `/presentacion`. |
| Hub | `src/modules/hub/hub.modules.ts` | Se suma la tarjeta del módulo. |
| Carpeta vacía `presentation/` en la raíz | — | Eliminada: había quedado de un placeholder anterior y ya no correspondía a dónde vive el módulo real (`public/presentacion/` + `src/modules/presentation/`). No estaba trackeada por git. |

**Dos bugs encontrados y corregidos en el camino:**

- **En el deck:** el script sólo leía `location.hash` una vez, al cargar. Un cambio de hash
  sin recarga completa de página (pegar otra URL con `#N` en la barra, o cualquier script que
  haga `location.hash = ...`) no movía el slide. Se agregó un listener de `hashchange`. Es un
  bug heredado de `deck-template.html`, la plantilla de la skill.
- **En el Hub** (`HubPage.tsx`, no relacionado con la skill): había un bloque de texto fijo
  ("Todavía sin contenido — Presentación. La carpeta existe pero no hay un deck todavía...")
  que no salía de `hub.modules.ts`, sino hardcodeado en el JSX. Al agregar el módulo real, ese
  texto pasó a ser falso. Se retiró junto con sus estilos (`.pending`/`.pendingTitle` en
  `HubPage.module.css`).

**Cómo se armaron las tres capturas de la pantalla de Fulfillment sin recortar imágenes a
mano:** en vez de tres archivos PNG recortados, se tomó una sola captura de página completa
(1440×2200, con la duración de `--virtual-time-budget` de Chrome headless ajustada para que
el fundido por scroll de `useReveal` termine antes de la captura) y se la reutiliza tres veces
con `object-position: top / center 54% / bottom` en el `<img>` de cada slide. Cada posición
recorta, por matemática de `object-fit: cover`, una "ventana" de 900px reales dentro de la
imagen de 2200px — sin necesitar un editor de imágenes.

### Alcance del deck, acotado el mismo día

El primer armado tenía 16 slides y recorría **el proyecto entero**: el Hub, la landing del
módulo Prototipo, la propuesta, el módulo de Documentación y un documento de ejemplo.

El usuario corrigió el enfoque: **el Hub y los módulos son la maqueta con la que se muestra el
trabajo al cliente y al equipo, no el tema de la presentación.** El deck tiene que hablar
únicamente del **requerimiento** y de **cómo se ven las propuestas finales**.

Quedó en **10 slides**:

| # | Slide | Bloque |
|---|---|---|
| 1 | Portada | — |
| 2 | Qué se pidió: una página de Fulfillment dentro de MiCorreo | Requerimiento |
| 3 | El flujo esperado, en cuatro momentos | Requerimiento |
| 4 | Los siete campos del formulario, y qué queda fuera del alcance | Requerimiento |
| 5 | Divider: "La propuesta final" | — |
| 6 | El acceso desde la landing | Propuesta |
| 7 | La página: hero y servicios | Propuesta |
| 8 | El formulario | Propuesta |
| 9 | Beneficios y cierre de la página | Propuesta |
| 10 | Lo que falta definir | — |

**Qué se eliminó:** los seis slides de andamiaje (divider del Hub, captura del Hub, divider
del Prototipo, captura de la landing del módulo, divider de Documentación, captura del índice
de documentos y captura de un documento), más las cinco capturas que sólo ellos usaban
(`01-hub.png`, `02-prototipo.png`, `03-v3-landing.png`, `05-documentacion.png`,
`06-documento-v3.png`).

**Qué se agregó:** tres slides de requerimiento, tomados de
[01-CONTEXTO.md](01-CONTEXTO.md) y [07-FORMULARIO-FULFILLMENT.md](07-FORMULARIO-FULFILLMENT.md)
—objetivo, flujo esperado y campos—, y una captura nueva del **acceso** a Fulfillment en la
landing (`landing-acceso.png`). La captura anterior de la landing mostraba el hero, no la
tarjeta de Fulfillment, que es justamente lo que el slide tiene que mostrar.

Las capturas pasaron de 2,3 MB a **888 KB**, en dos archivos.

**Cómo se recortó `landing-acceso.png`:** la landing mide 4522px de alto y la tarjeta de
Fulfillment está cerca de los 2900px. En vez de capturar la página entera (varios MB) y
recortarla con CSS, se creó un HTML temporal en `public/` que embebe la ruta en un `<iframe>`
de alto completo desplazado con `top` negativo, dentro de una caja de 1440×900 con
`overflow: hidden`; se captura ese archivo con Chrome headless y se lo borra. Sirve para
recortar cualquier franja de una página larga sin editor de imágenes.

## La tipografía pasa a ser la del sistema (14/09/2026)

El diseño de Figma de la pantalla de Fulfillment usa **Poppins** en el hero, los encabezados
de columna y los beneficios. Se implementó así, pero quedó registrado como **hipótesis**: era
la única tipografía fuera del sistema y la única dependencia externa del proyecto.

El usuario lo confirmó: **la tipografía es Gilroy**, la del sistema. Poppins queda descartada.

| Qué | Dónde | Cambio |
|---|---|---|
| Familia de display | `v3/fulfillment/fulfillment.tokens.css` | `--ffv3-font-display` pasa de `'Poppins', 'Gilroy', system-ui` a `'Gilroy', system-ui`. Un solo lugar: el token lo consumen los seis bloques de display de la pantalla. |
| Carga de la fuente | `index.html` | Se retiran el `<link>` a Google Fonts y sus dos `preconnect`. |

**El token se conserva** en vez de borrarlo y escribir la familia a mano en los seis lugares
que lo usan: sigue marcando cuáles son las piezas de "display" de esta pantalla, por si más
adelante se decide otra fuente.

**Sin fallback sintético:** los pesos que usa la pantalla —400, 500 y 700— existen los tres en
la Gilroy embebida (`globals.css` declara de 300 a 800), así que el navegador no tiene que
simular ningún peso.

**Dos efectos secundarios, los dos buenos:**

- El proyecto **ya no depende de ningún recurso externo**: no hay pedidos a `fonts.googleapis.com`
  ni a `fonts.gstatic.com`. Antes, sin conexión, la pantalla caía a Gilroy igual — pero recién
  después de esperar a que fallara el pedido.
- La pantalla queda **consistente con el resto del producto**, que ya usaba sólo Gilroy.

El alto de la página no cambió (sigue en 2200px a 1440 de ancho), así que las tres tomas que
el deck de presentación recorta de la captura con `object-position` siguen sirviendo sin
recalcular. La captura sí se rehízo, para que muestre la tipografía real.

## Tipografía del panel de beneficios (14/09/2026)

Pedido del usuario: el detalle de cada beneficio quedaba **demasiado chico** para leerse
cómodo.

| Elemento | Antes | Ahora |
|---|---|---|
| Título del beneficio ("Reducí costos") | 16px bold | **Sin cambio** — ya cumplía |
| Detalle ("operativos y logísticos") | 13px regular | **14px medium** |

El diseño de Figma dibuja el detalle en 13px regular; esta es una divergencia deliberada por
legibilidad, no un error de implementación. El título ya estaba en 16px bold
(`--landing-font-size-body` + `--font-weight-bold`), así que no hizo falta tocarlo.

El 13px estaba escrito a mano; ahora usa `--landing-font-size-meta`, que ya valía 14px. Un
valor suelto menos.

**Efecto sobre el deck de presentación:** el texto más grande hace que el detalle más largo
("de tus clientes con entregas rápidas y confiables") pase a tres líneas, y con él crece el
alto del panel. La página pasó de **2200 a 2323px**, así que hubo que rehacer la captura
`fulfillment-full.png` y recalcular el recorte del slide del formulario: `object-position`
pasó de `center 54%` a `center 52%`. Los otros dos recortes (`top` y `bottom`) siguen
sirviendo sin cambios.

Conviene recordar la cuenta, porque se repite cada vez que cambia el alto de esa pantalla:
con una ventana de 900px sobre una imagen de alto `H`, el porcentaje que centra una franja
que empieza en `y` es `(y - 450 + alto_franja / 2) / (H - 900)`.

## Los límites de longitud vuelven al documento (14/09/2026)

Al verificar contra la fuente real —el documento de **Propuesta**, no el de *Solicitud*— se
confirmó que los topes implementados la contradecían. El usuario resolvió **dejar lo que dice
el documento**, así que se revirtieron.

| Campo | Estuvo en | Vigente | Fuente |
|---|---|---|---|
| Razón social | 64 | **40** | "hasta 40 caracteres alfanumérico" |
| Nombre y apellido | 64 | **60** | "hasta 60 caracteres alfabéticos" |
| Correo electrónico | 64 | **sin tope** | "debe validar que el formato sea correcto. Mismo comportamiento que MiCorreo" |
| Número de cliente | exactamente 10 | **hasta 10** | "hasta 10 dígitos numéricos como máximo" |

**Qué cambió en el código** (`v3/fulfillment/`):

- `useContactForm.ts`: `TEXTO_MAX = 64` —un único tope para tres campos— se separó en
  `EMPRESA_MAX = 40` y `NOMBRE_MAX = 60`. El mail se quedó sin constante: no tiene tope.
  `NUMERO_CLIENTE_LARGO` pasó a llamarse `NUMERO_CLIENTE_MAX`, porque es un máximo y no un
  largo fijo, y su patrón pasó de `\d{10}` a `\d{1,10}`.
- Los mensajes de error acompañan: "Máximo 40 caracteres…", "Máximo 60 caracteres, sólo
  letras.", "Hasta 10 dígitos numéricos.". Se eliminó la validación de largo del mail.
- `FulfillmentForm.tsx`: cada campo usa ahora su propio `maxLength`, y el del mail se quitó.

**El mail es el único sin tope.** El documento sólo le pide formato válido, delegando en "el
mismo comportamiento que MiCorreo". Inventar un número acá sería agregar una regla que la
fuente no tiene; si MiCorreo impone un máximo, hay que traerlo de ahí.

Con esto **el formulario ya no se aparta del documento en ningún punto.**

### El deck suma las validaciones (14/09/2026)

Pedido del usuario junto con la reversión de los límites: que la presentación cubra **todo lo
referido a las validaciones de los inputs**. El deck pasó de 10 a **13 slides**.

| # | Slide nuevo | Qué muestra |
|---|---|---|
| 5 | Las reglas de cada campo | Tabla con la regla de los 7 campos y los dos marcados como opcionales |
| 10 | Validación · Obligatorios | Captura del formulario con los 6 errores de obligatoriedad |
| 11 | Validación · Formato | Captura con errores de formato en mail y celular, y los campos válidos sin marcar |

El slide 4 ("Los datos que se piden") suma además los topes a cada campo de la lista.

**Cómo se capturaron los estados de error.** Chrome headless no puede interactuar con la
página, así que se extendió el HTML temporal de recorte: además de posicionar el `<iframe>`,
ahora puede ejecutar acciones dentro de él antes de la captura —completar campos con valores
inválidos y pulsar "Enviar"—, aprovechando que es *same-origin*. Como siempre, el archivo se
borró después de usarlo.

De paso se rehicieron las dos capturas que ya existían, para que todas correspondan al mismo
estado del prototipo.
