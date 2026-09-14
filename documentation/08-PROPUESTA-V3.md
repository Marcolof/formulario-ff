# Versión 3 — Pantalla propia de Fulfillment

La **única propuesta vigente** desde el 14-09-2026. La landing es la réplica de producción,
sin ningún cambio visual, pero el acceso a Fulfillment lleva a una **pantalla con front
propio**, distinto del sistema visual de la landing. Conserva la barra de navegación superior
y el footer.

**Rutas:** `/prototipo/v3` (landing) y `/prototipo/v3/fulfillment` (la pantalla) ·
**Implementación:** [`v3/fulfillment/`](../src/modules/prototype/v3/fulfillment/) ·
**Diseño:** Figma "Mi Correo 2.0", nodo `13284:7345`, dibujado a 1010px de ancho.

Cada definición está marcada como **confirmada** (la pide el diseño o el usuario del
proyecto), **hipótesis** (decisión de implementación a validar) o **pendiente**.

> Esta versión reemplaza por completo a la propuesta anterior de la v3, que mostraba un flyer
> estático en un visor con zoom. Ese enfoque quedó descartado el 14/09/2026.

## Qué cambia respecto de la landing replicada

| Bloque | Landing replicada | Versión 3 | Estado |
|---|---|---|---|
| Toda la landing | — | **Idéntica**, los mismos componentes sin variantes | Confirmado |
| Destino del acceso a Fulfillment | La página en una columna, hoy retirada | `/prototipo/v3/fulfillment`, una pantalla propia | Confirmado |
| Pantalla de Fulfillment | Sobre el sistema visual de la landing | Front propio: navy e íconos en círculo, con la tipografía del sistema | Confirmado |
| Barra superior y footer | — | **Se mantienen** los de la landing | Confirmado |

## La pantalla

De arriba hacia abajo, como en el diseño:

1. **Hero** — franja navy (`#14245d`) partida en dos: a la izquierda "Fulfillment" en amarillo
   sobre "Solución integral de almacenamiento y distribución para tu eCommerce"; a la derecha
   la imagen del banner, que llega hasta el borde de la pantalla.
2. **Detalle del servicio** — dos columnas, cada una con su encabezado: "¿Qué incluye nuestro
   fulfillment?" (navy) y "Distribución rápida y confiable" (amarillo), con tres servicios
   cada una. Cada servicio lleva su ícono en un círculo navy de 78px.
3. **Formulario** — tarjeta blanca con los campos en dos columnas.
4. **Beneficios** — caja con borde amarillo y la etiqueta "Beneficios para tu negocio" montada
   sobre el borde superior; adentro, cuatro beneficios con ícono en círculo amarillo, título
   en 16px bold y detalle en 14px medium. El diseño dibuja ese detalle en 13px regular: se
   subió por legibilidad, a pedido del usuario (14-09-2026).
5. **Cierre** — franja navy con "Nos ocupamos de todo, vos enfocate en hacer crecer tu
   negocio."

### El hero y su imagen

La imagen es `src/assets/img/banner ff formulario.png`, provista por el usuario.

En el diseño no entra completa: mide 736px dentro de una caja de 505, pegada a la izquierda y
centrada en vertical, de modo que se recorta arriba, abajo y a la derecha.

Al pedido del usuario de achicar el recorte (14/09/2026, en dos rondas), el primer intento
fue bajar un `width` en porcentaje fijo (146% → 124%). La segunda ronda —otro 15% menos,
a 105%— reveló el techo de esa técnica: por la proporción real de la imagen (2765×2248)
contra esta caja, por debajo de ~114% la imagen deja de cubrir el alto y aparecen franjas del
fondo navy arriba y abajo. Además, como la caja tiene `flex: 1 1 0`, su ancho cambia con el
viewport — un porcentaje fijo sólo estaba probado para un ancho de pantalla puntual y podía
fallar en otros.

Se resolvió con **`object-fit: cover`**: el navegador calcula el recorte mínimo que sigue
cubriendo la caja completa, para cualquier ancho de viewport, sin porcentajes calculados a
mano. Es, a la vez, el recorte más chico posible sin dejar huecos — más cerca de lo que pedía
el usuario que cualquier número fijo. Verificado sin huecos en varios anchos de escritorio.

**En pantallas de hasta 900px la imagen no se muestra**: queda sólo el mensaje. Es lo que pidió
el requerimiento, y está planteado como algo provisorio ("por ahora").

### Iconografía

Todos los íconos son de **Lucide**. El diseño ya nombra sus capas con los nombres de Lucide,
así que la correspondencia es directa:

| Bloque | Íconos |
|---|---|
| Servicios | `Boxes`, `Package`, `Map` (columna izquierda) · `Warehouse`, `MapPin`, `Truck` (derecha) |
| Beneficios | `ChartColumnDecreasing`, `Clock`, `ThumbsUp`, `ChartLine` |
| Formulario | `CircleCheckBig` en el mensaje de éxito |

## El formulario

**Los campos, las reglas de validación y el momento en que se muestran los errores** viven en
[`useContactForm`](../src/modules/prototype/v3/fulfillment/useContactForm.ts), separados del
marcado: el componente sólo pone el layout y toma de ahí hasta los `maxLength`. El detalle
—incluidos los tres límites que contradicen al documento formal a pedido del usuario— está en
[07-FORMULARIO-FULFILLMENT.md](07-FORMULARIO-FULFILLMENT.md).

Lo propio de esta versión es la disposición:

- **Dos columnas** en escritorio: empresa y nombre, mail y rubro, celular y —cuando
  corresponde— los campos condicionales. En pantallas de hasta 900px **se apila todo en una
  sola columna**.
- La pregunta "¿Ya sos cliente de MiCorreo?" va en una línea con sus dos opciones al lado; en
  mobile se apila.
- El botón "Enviar" va centrado, con un ancho máximo de 400px.

Los controles no son nuevos: el diseño usa los mismos campos y el mismo botón que el resto del
producto, así que se reutilizan `OutlinedField`, `OutlinedSelect` y `Button`.

"Número de cliente" no forma parte del grid de dos columnas: aparece **justo debajo** de la
pregunta "¿Ya sos cliente de MiCorreo?" cuando se responde "Sí", acotado a media columna en
escritorio (ancho completo en mobile). Así queda claro que ese campo depende de esa respuesta
y no es uno más de la lista de arriba (corrección por feedback del usuario, 2026-09-14).

### Mensaje de éxito

Al enviar, la tarjeta se reemplaza por un ícono de confirmación, el título y el mensaje, más un
botón para cargar otra consulta.

**La tarjeta conserva la altura que tenía el formulario**, que es lo que se pidió: la altura se
mide justo antes de reemplazar el contenido y se aplica como mínimo, así la página no pega un
salto al enviar ni se reacomoda lo que está alrededor. Verificado: 413px antes y después.

**Pendiente:** el texto del mensaje sigue siendo el mismo de las otras versiones y sigue sin
estar aprobado por el área solicitante.

### Transición y micro interacciones (14/09/2026)

El cambio entre los campos y el estado de éxito no es un reemplazo directo: es una transición
en dos pasos, con la altura de la tarjeta fija durante todo el proceso para que la página no
salte.

1. **Salida.** Al enviar, los campos se desvanecen hacia arriba (`opacity` 1→0,
   `translateY` 0→-14px, 220ms). Mientras salen, `inert` los deja sin poder editarse ni
   recibir foco.
2. **Entrada del éxito.** Recién terminada la salida entra el bloque de éxito: el conjunto
   sube y aparece (420ms), el ícono lo sigue con un pequeño *pop* de escala, y el botón
   "Cargar otra consulta" llega último, de abajo hacia arriba (460ms) — el detalle puntual
   que pidió el usuario.
3. **Vuelta ("Cargar otra consulta").** La transición es simétrica: el bloque de éxito se
   desvanece (220ms, mismo tiempo que la salida de los campos) y, recién terminado, vuelven a
   aparecer los campos —ya vacíos— con la misma entrada de abajo hacia arriba que usa el
   bloque de éxito. Los valores del formulario se limpian justo en ese momento, no antes: si
   se limpiaran al tocar el botón, se verían en blanco durante la salida animada del bloque de
   éxito.

Toda la lógica de la transición —en los dos sentidos— vive en `phase`
(`'form' | 'leaving' | 'success' | 'returning'`), un estado propio del componente. La mitad de
ida la dispara `sent` (de `useContactForm`); la vuelta la maneja el propio botón, porque tiene
que retrasar el `reset()` del hook hasta que termine la animación de salida.

### Micro interacciones de scroll (14/09/2026)

Cada sección de la pantalla que no es el hero aparece de abajo hacia arriba —opacidad 0 a
100— la primera vez que entra en pantalla: las dos columnas de servicios (una detrás de la
otra), la tarjeta del formulario, cada beneficio (escalonados) y el cierre. El hero se ve
completo desde el arranque, sin animar — así lo pidió el usuario.

Se resuelve con [`useReveal`](../src/modules/prototype/v3/fulfillment/useReveal.ts), un hook
propio basado en `IntersectionObserver`: no hace falta escuchar el evento `scroll` a mano ni
sumar ninguna librería. Respeta "reducir movimiento" (se muestra todo directo, sin animar) y
cada elemento sólo anima una vez, la primera vez que aparece.

## Decisiones de implementación

| Decisión | Por qué | Estado |
|---|---|---|
| **Ancho máximo de 1320px** para el contenido | El diseño está dibujado a 1010px, pero a ese ancho en pantallas grandes el contenido quedaba angosto con mucho aire a los costados (feedback del usuario, 2026-09-14). Las columnas de servicios e inputs son grillas fijas a 2 —no se reacomodan solas—, así que ensanchar el máximo sólo ensancha las columnas, no rompe el layout. Se igualó al ancho de la landing (`--landing-container-max`) para que las pantallas del producto se sientan consistentes | Confirmado (ajustado por feedback) |
| **Gilroy** en toda la pantalla, también en hero, encabezados de columna y beneficios | El diseño de Figma los dibuja con **Poppins**, pero el usuario confirmó (14-09-2026) que la tipografía definitiva es la del sistema. Se descartó Poppins y con ella la carga de Google Fonts: el proyecto ya no depende de ningún recurso externo. Los pesos que usa la pantalla (400, 500 y 700) existen en la Gilroy embebida, así que no hay simulación sintética | **Confirmado** (14-09-2026) |
| **Servicios agrupados** por columna en los datos | En el diseño son seis elementos que se acomodan en dos columnas. Modelados así, en mobile cada encabezado queda con sus tres servicios en vez de mezclarse | Hipótesis |
| Navy `#14245d` y `#192b69` literales | Son los del diseño y no coinciden con los de la marca en `tokens.css`. Se dejan explícitos en la capa de tokens de la pantalla en vez de forzarlos contra tokens que no les corresponden | Hipótesis |
| El CTA de la landing es un enlace, no un botón | Ahora navega a una pantalla: tiene que poder abrirse en otra pestaña y copiarse | Confirmado |

### Cómo se conecta con la landing sin tocarla

El destino del acceso a Fulfillment sale de los datos de la landing
(`v3/data/landing.content.ts`), por el `id` del servicio: los componentes no llevan el enlace
escrito a mano. `ServicesSection` sigue aceptando una prop **opcional** `hrefs` para
reemplazar el destino de un servicio sin tocar los datos — el punto de extensión que dejó el
criterio del proyecto: **no se duplican componentes para hacer una variante**, se les suma una
prop cuyo valor por defecto es el comportamiento original.

La pantalla nueva sí tiene su propia capa de estilos
([`fulfillment.tokens.css`](../src/modules/prototype/v3/fulfillment/fulfillment.tokens.css)),
enganchada a un atributo que sólo lleva ella. Como la barra superior y el footer sí son los de
la landing, la página declara los dos ámbitos: `data-module="prototype"` y
`data-page="fulfillment-v3"`.

### Casos de uso simulables (14-09-2026)

El botón flotante del prototipo abre un panel de tweaks con un chip por caso: *Happy path*
(comportamiento real) y *Error de formulario* (el envío nunca prospera y, **después** de
pulsar "Enviar", aparece el mensaje general de error sobre el botón). Sirve para mostrar el
estado de error en una demo sin tener que romper los datos a mano.

El caso viaja por contexto desde `PrototypeChrome`; el formulario sólo recibe un `forceError`.
No cambia ninguna regla de validación. Ver
[06-ARQUITECTURA-Y-RUTAS.md](06-ARQUITECTURA-Y-RUTAS.md#chrome-del-prototipo).

## Qué queda por validar

- Qué hacer con la imagen del hero en mobile: hoy simplemente no se muestra.
- El texto del mensaje de confirmación.
- Los tres límites de longitud que contradicen al documento formal (64 caracteres y número de
  cliente de 10 dígitos exactos).

## Observaciones sobre los insumos

- La imagen del banner pesa **4,7 MB** (2765 × 2248 px). Funciona, pero conviene una versión
  optimizada antes de cualquier publicación real.
- En el diseño, el beneficio dice "Ganà tiempo", con acento grave. En el prototipo se escribió
  **"Ganá tiempo"**.
- El flyer `Fulfillment.jpeg`, que usaba la propuesta anterior de la v3, quedó sin uso. Se
  conserva en `src/assets/img/` por si se necesita más adelante.

## Fuentes

- **Pedido del usuario del proyecto (14/09/2026):** reformular la v3 como un front integrado,
  con barra superior y footer, hero con imagen propia oculta en responsive, íconos de Lucide,
  formulario a dos columnas y mensaje de éxito que mantenga la altura.
- **Figma "Mi Correo 2.0", nodo `13284:7345`:** el diseño completo de la pantalla.
- **`banner ff formulario.png`**, provisto por el usuario en `src/assets/img/`.
