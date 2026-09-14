# Versión 3 — Pantalla propia de Fulfillment

La landing es la de la versión 1, sin ningún cambio visual, pero el acceso a Fulfillment lleva
a una **pantalla con front propio**, distinto del sistema visual de la landing. Conserva la
barra de navegación superior y el footer.

**Rutas:** `/prototipo/v3` (landing) y `/prototipo/v3/fulfillment` (la pantalla) ·
**Implementación:** [`v3/fulfillment/`](../src/modules/prototype/v3/fulfillment/) ·
**Diseño:** Figma "Mi Correo 2.0", nodo `13284:7345`, dibujado a 1010px de ancho.

Cada definición está marcada como **confirmada** (la pide el diseño o el usuario del
proyecto), **hipótesis** (decisión de implementación a validar) o **pendiente**.

> Esta versión reemplaza por completo a la propuesta anterior de la v3, que mostraba un flyer
> estático en un visor con zoom. Ese enfoque quedó descartado el 14/09/2026.

## Qué cambia respecto de la versión 1

| Bloque | Versión 1 | Versión 3 | Estado |
|---|---|---|---|
| Toda la landing | — | **Idéntica**, los mismos componentes sin variantes | Confirmado |
| Destino del acceso a Fulfillment | `/prototipo/v1/fulfillment` | `/prototipo/v3/fulfillment`, una pantalla propia | Confirmado |
| Pantalla de Fulfillment | Sobre el sistema visual de la landing | Front propio: navy, Poppins, íconos en círculo | Confirmado |
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
   sobre el borde superior; adentro, cuatro beneficios con ícono en círculo amarillo.
5. **Cierre** — franja navy con "Nos ocupamos de todo, vos enfocate en hacer crecer tu
   negocio."

### El hero y su imagen

La imagen es `src/assets/img/banner ff formulario.png`, provista por el usuario.

En el diseño no entra completa: mide 736px dentro de una caja de 505 —el **146%**— pegada a
la izquierda y centrada en vertical, de modo que se recorta arriba, abajo y a la derecha. Se
reprodujo esa misma proporción, que es lo que hace que la caja y la cinta "Próximamente" se
vean del tamaño de la referencia en vez de quedar chicas.

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

**Los campos, las reglas de validación y el momento en que se muestran los errores son los
mismos de las otras versiones.** No están duplicados: viven en
[`useContactForm`](../src/modules/prototype/v1/fulfillment/useContactForm.ts), que comparten
la pantalla de la v1/v2 y esta. Si una regla cambia, cambia para todas. El detalle está en
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

## Decisiones de implementación

| Decisión | Por qué | Estado |
|---|---|---|
| **Ancho máximo de 1320px** para el contenido | El diseño está dibujado a 1010px, pero a ese ancho en pantallas grandes el contenido quedaba angosto con mucho aire a los costados (feedback del usuario, 2026-09-14). Las columnas de servicios e inputs son grillas fijas a 2 —no se reacomodan solas—, así que ensanchar el máximo sólo ensancha las columnas, no rompe el layout. Se igualó al ancho de la landing (`--landing-container-max`) para que las pantallas del producto se sientan consistentes | Confirmado (ajustado por feedback) |
| **Poppins** en hero, encabezados de columna y beneficios | Es lo que pide el diseño. Se carga desde Google Fonts y cae en Gilroy si no está disponible. El resto del producto usa sólo Gilroy | Hipótesis: conviene confirmar que no sea una tipografía de borrador |
| **Servicios agrupados** por columna en los datos | En el diseño son seis elementos que se acomodan en dos columnas. Modelados así, en mobile cada encabezado queda con sus tres servicios en vez de mezclarse | Hipótesis |
| Navy `#14245d` y `#192b69` literales | Son los del diseño y no coinciden con los de la marca en `tokens.css`. Se dejan explícitos en la capa de tokens de la pantalla en vez de forzarlos contra tokens que no les corresponden | Hipótesis |
| El CTA de la landing es un enlace, no un botón | Ahora navega a una pantalla: tiene que poder abrirse en otra pestaña y copiarse | Confirmado |

### Cómo la v3 reusa la v1 sin romperla

`ServicesSection` recibe una prop **opcional** `hrefs`, que reemplaza el destino de un servicio.
La v3 la usa para mandar Fulfillment a su propia pantalla; la v1 no pasa nada y navega como
siempre. Es el mismo criterio del resto del proyecto: **no se duplican componentes de la v1
para hacer una variante**, se les suma una prop cuyo valor por defecto es el comportamiento
original.

La pantalla nueva sí tiene su propia capa de estilos
([`fulfillment.tokens.css`](../src/modules/prototype/v3/fulfillment/fulfillment.tokens.css)),
enganchada a un atributo que sólo lleva ella. Como la barra superior y el footer sí son los de
la landing, la página declara los dos ámbitos: `data-module="prototype"` y
`data-page="fulfillment-v3"`.

## Qué queda por validar

- La tipografía Poppins, que no forma parte del sistema actual.
- Qué hacer con la imagen del hero en mobile: hoy simplemente no se muestra.
- El texto del mensaje de confirmación.
- Cuál de las tres versiones se adopta.

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
