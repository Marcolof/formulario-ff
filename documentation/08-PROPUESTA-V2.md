# Versión 2 — Carrusel de servicios

Propuesta de alto impacto sobre la landing de MiCorreo. **Sólo cambia la landing:** la página
de Fulfillment con el formulario es la misma de la versión 1 — no hay dos pantallas de
Fulfillment.

**Ruta:** `/prototipo/v2` · **Implementación:**
[`v2/LandingPage.tsx`](../src/modules/prototype/v2/LandingPage.tsx) · **Referencia visual:**
imagen de diseño provista por el usuario del proyecto (11/09/2026), más el wireframe
"Accesos rápidos" del documento de requerimiento.

Cada definición está marcada como **confirmada** (la pidió el área / el usuario del
proyecto), **hipótesis** (decisión de diseño a validar) o **pendiente**.

## Qué cambia y qué se mantiene

| # | Versión 1 (layout original) | Versión 2 | Estado |
|---|---|---|---|
| 1 | Hero con carrusel de banners y login | Igual | Confirmado |
| 2 | Gestionar Devolución (sección) | Pasa al carrusel; su contenido se abre en un modal | Confirmado |
| 3 | Conocé nuestros servicios (6 tarjetas grandes) | Pasan al carrusel, que conserva ese título | Confirmado |
| 4 | Accesos directos (Seguimiento de envíos, Sucursales) | Se renombra **Accesos rápidos**; Sucursales pasa primero | Confirmado |
| 5 | ¿Por qué elegirnos? | Igual, con el título sin reglas laterales | Confirmado |
| 6 | Footer | Igual | — |

Los bloques que se mantienen son los mismos componentes de la v1. Los que cambian de nombre,
orden o piel **no se duplicaron**: el componente de la v1 recibe props opcionales cuyos
valores por defecto son exactamente los de la landing original, así que la v1 no se ve
afectada. Ver [Implementación](#implementación).

## Carrusel "Conocé nuestros servicios"

Reúne en tarjetas los accesos que en la v1 ocupaban dos secciones, conservando el título que
la landing original le da a los servicios. Cada tarjeta tiene **ícono, título, descripción
breve y CTA** (confirmado).

| Orden | Título | Descripción breve | CTA | Ícono (Lucide) | Destino |
|---|---|---|---|---|---|
| 1 | Gestionar devolución | Iniciá la devolución de un paquete que ya fue entregado. | Gestionar | `Undo2` | Abre el modal |
| 2 | Paq.ar | La solución logística que simplifica los envíos de tu eCommerce. | Ingresá | `Package` | El mismo de la v1 |
| 3 | **Fulfillment** · ¡Nuevo! | Solución integral de almacenamiento y distribución para tu eCommerce. | **Solicitar** | `Warehouse` | `/prototipo/v2/fulfillment` |
| 4 | Mis Comunicaciones Digitales | Hacé, pagá y enviá online tus envíos postales. | Ingresá | `Mail` | El mismo de la v1 |
| 5 | Punto Correo | Sumate a nuestra red y mejorá tus ingresos. | Conocer más | `Store` | El mismo de la v1 |
| 6 | Rotulador | Confeccioná tus etiquetas y abonalas en cualquier sucursal. | Generar rótulo | `Tag` | El mismo de la v1 |
| 7 | Oficios Judiciales | Pagá tus Oficios Judiciales online, de forma simple y segura. | Ingresá | `Scale` | El mismo de la v1 |

Los enlaces no están copiados: el carrusel los toma de los datos de "Conocé nuestros
servicios" de la v1 por su identificador, así que una URL se cambia en un solo lugar.

> **Sólo Fulfillment va destacado.** La imagen de referencia muestra también "Mis
> Comunicaciones Digitales" con etiqueta "¡Nuevo!" y botón "Solicitar". Se decidió **no**
> replicarlo (11/09/2026): el requerimiento formal sólo presenta Fulfillment como novedad, y
> dos destacados le quitan peso al que importa. Si el área quiere destacar otro servicio,
> es un pedido aparte.

**Hipótesis a validar con el área:**

- **Textos breves.** Salen de acortar el copy que hoy tiene cada servicio en la landing; no
  suman afirmaciones nuevas, pero no son textos aprobados. La descripción de Fulfillment es
  la del wireframe y la de la tarjeta de la v1.
- **Orden.** Devolución primero, porque era el primer bloque después del hero. Fulfillment
  tercero, para que entre en la primera vista en escritorio (4 tarjetas) y en tablet (3).
- **Destacado de Fulfillment.** Etiqueta "¡Nuevo!" y CTA "Solicitar" como botón primario
  amarillo, tomados del wireframe y de la imagen de referencia. El resto de los CTA son
  enlaces de texto con chevron, el mismo tratamiento de "Conocé nuestros servicios".
- **Íconos.** Se eligieron del set Lucide del Design System; no hay íconos oficiales por
  producto para este formato.

### Comportamiento

- Scroll horizontal nativo con *snap* por tarjeta: en touch se arrastra con el dedo.
- En escritorio, flechas circulares en la calle que el panel reserva a los lados. Avanzan de
  a una vista y se ocultan en los extremos, para no ofrecer una acción que no hace nada.
- Tarjetas por vista: **4** en escritorio, **3** entre 900 y 1200px, y en mobile tarjetas de
  280px con la siguiente asomando por el borde, sin flechas.
- Todas las tarjetas tienen la misma altura y el CTA queda alineado al pie.

### Accesibilidad

- La sección se anuncia como carrusel (`aria-roledescription`) con su título como nombre.
- Las flechas son botones con nombre ("Ver servicios anteriores" / "Ver más servicios") y
  `aria-controls` hacia la lista.
- Como hay varios "Ingresá", cada CTA suma el título a su nombre accesible
  ("Ingresá: Paq.ar"), empezando por el texto visible.
- El CTA de devolución declara `aria-haspopup="dialog"`.

### Tratamiento visual

Según la imagen de referencia, y sin colores ni trazos nuevos — todo sale de los tokens del
módulo:

- **Panel navy redondeado** que enmarca el bloque y reemplaza al fondo gris que la v1 usaba
  para los servicios. El título va dentro, en blanco y alineado a la izquierda.
- **Tarjetas blancas** con el ícono en su caja celeste en una **columna propia a la
  izquierda**, centrado respecto del texto. El ícono repite el tratamiento de la página de
  Fulfillment.
- **Etiqueta "¡Nuevo!"** en flujo, debajo del título: no se superpone, así que no tapa un
  título de dos líneas.
- En mobile el panel pierde el radio y va de borde a borde.

## Accesos rápidos (Sucursales y Seguimiento)

La sección que la v1 titula "Accesos directos" pasa a llamarse **"Accesos rápidos"** y
**Sucursales queda primero** (confirmado por la referencia). El contenido, los enlaces y los
íconos son los mismos de la v1: sólo cambia el orden, que se deriva de los datos de la v1 por
título, sin una segunda copia.

Cambia además la piel, siguiendo la referencia: tarjeta **blanca** con sombra suave en lugar
de la gris de la v1, ícono centrado respecto del texto y CTA con **subrayado amarillo**.

Los títulos de sección de la v2 (**Accesos rápidos** y **¿Por qué elegirnos?**) van **sin las
reglas laterales** que tiene la landing original.

## Modal "Gestionar Devolución"

Al tocar **Gestionar** se abre un modal con **todo** el contenido que hoy tiene la sección de
la v1 (confirmado):

- título "Gestionar Devolución";
- "Ingresá el código de seguimiento del paquete que querés devolver.";
- "Recordá que el paquete debe estar entregado para poder realizar la devolución.";
- campo "Código de seguimiento" y botón "Continuar";
- enlace "¿Dónde encuentro mi código de seguimiento?".

Es literalmente el mismo contenido: la sección de la v1 y el modal usan el mismo componente
([`ReturnsForm`](../src/modules/prototype/v1/components/ReturnsForm.tsx)), así que el texto
existe una sola vez.

**Apertura y cierre.** Se cierra con la X, con Esc o tocando el fondo. Mientras está abierto la
página de atrás no scrollea, y al cerrarlo el foco vuelve al CTA que lo abrió y la página
queda donde estaba.

**Deep link.** El modal vive en la URL: `/prototipo/v2#gestion-devolucion` abre la landing
con el modal abierto, y se puede recargar. Es la misma ancla que tiene la sección en la v1.

**Pendientes (heredados de la v1):** "Continuar" no valida ni envía — el prototipo no tiene
backend —, y "¿Dónde encuentro mi código de seguimiento?" no abre nada, igual que en la
landing original. Qué debería mostrar queda por definir.

## Página de Fulfillment

Es una sola: el mismo componente
([`FulfillmentPage`](../src/modules/prototype/v1/fulfillment/FulfillmentPage.tsx)) montado en
dos rutas.

| Ruta | Desde dónde se llega |
|---|---|
| `/prototipo/v1/fulfillment` | Tarjeta de Fulfillment en "Conocé nuestros servicios" (v1) |
| `/prototipo/v2/fulfillment` | Tarjeta de Fulfillment en el carrusel (v2) |

La segunda ruta existe sólo para que el recorrido de la v2 no salte a una URL de la v1 durante
una demo. Cualquier cambio en la página o en el formulario se ve en las dos. La especificación
del formulario está en [07-FORMULARIO-FULFILLMENT.md](07-FORMULARIO-FULFILLMENT.md).

## Implementación

```txt
src/modules/prototype/
├── v1/components/
│   ├── ReturnsForm.tsx                   # contenido de devolución, compartido v1/v2
│   ├── SectionHeading.tsx                # prop `rules`: la v2 apaga las reglas laterales
│   ├── ShortcutsSection.tsx              # props: título, orden, variante de estilo
│   └── WhyUsSection.tsx                  # prop `headingRules`
└── v2/
    ├── LandingPage.tsx                   # compone la landing con componentes de la v1
    ├── data/quickAccess.content.ts       # tarjetas y orden de los accesos rápidos
    └── components/
        ├── QuickAccessCarousel.tsx       # carrusel
        └── ReturnsDialog.tsx             # modal (<dialog> nativo)
```

**Cómo la v2 reusa la v1 sin romperla.** Los componentes compartidos ganaron props
**opcionales** cuyo valor por defecto es el comportamiento de la landing original. La v1 los
sigue usando sin pasar nada y queda igual; la v2 pasa título, orden y variante. La variante de
estilo se aplica con un `data-variant` en la sección, así que las reglas de la v2 no pueden
alcanzar a la v1.

La v2 depende de la v1 (Navbar, hero, accesos, por qué elegirnos, footer, botón, campo y la
página de Fulfillment). Es intencional: la v2 es la v1 con otro bloque central.

## Fuentes

- **Pedido del usuario del proyecto (11/09/2026):** alcance de la v2 — hero igual,
  devolución y servicios al carrusel, devolución en modal, Seguimiento y Sucursales en su
  lugar, una sola página de Fulfillment.
- **Imagen de diseño del usuario (11/09/2026):** panel navy, tarjeta con ícono a la
  izquierda, etiqueta en flujo, una sola flecha visible, renombre de "Accesos directos" a
  "Accesos rápidos" con Sucursales primero y títulos sin reglas. Es una captura del diseño
  que el usuario hizo en Figma; **la cuenta con la que se trabaja hoy no tiene acceso a ese
  archivo**, así que las medidas se derivaron de la imagen y de los tokens existentes, no del
  Figma. Al recuperar el acceso conviene contrastar espaciados y tamaños.
- **Wireframe "Accesos rápidos"** del requerimiento: tarjetas con ícono, título, descripción
  y CTA; Fulfillment destacado con "¡Nuevo!" y "Solicitar". Se usó como referencia de
  estructura, no de estilo.
