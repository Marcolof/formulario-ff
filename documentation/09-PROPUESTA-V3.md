# Versión 3 — Flyer en visor

La propuesta de **mínimo cambio**: la landing es exactamente la de la versión 1 y el acceso a
Fulfillment abre el flyer del cliente en un visor a pantalla completa. No hay pantalla propia
de Fulfillment ni formulario de contacto en esta versión.

**Ruta:** `/prototipo/v3` · **Implementación:**
[`v3/LandingPage.tsx`](../src/modules/prototype/v3/LandingPage.tsx) · **Contenido:** flyer
`Fulfillment.jpeg` provisto por el cliente (14/09/2026).

Cada definición está marcada como **confirmada** (la pidió el usuario del proyecto),
**hipótesis** (decisión de diseño a validar) o **pendiente**.

## Qué cambia respecto de la versión 1

| Bloque | Versión 1 | Versión 3 | Estado |
|---|---|---|---|
| Hero, Gestionar Devolución, Conocé nuestros servicios, Accesos directos, ¿Por qué elegirnos?, footer | — | **Idénticos**, los mismos componentes sin variantes | Confirmado |
| CTA "Conocer más" de Fulfillment | Navega a `/prototipo/v1/fulfillment` | Abre el flyer en un visor a pantalla completa | Confirmado |
| Página de Fulfillment con formulario | Existe | **No se usa** en esta versión | Confirmado |

No cambia ni un estilo de la landing: la v3 monta los mismos componentes de la v1, en el
mismo orden, y sólo reemplaza el destino de un CTA.

## El visor

**Confirmado por el pedido:** imagen estática, a alto de pantalla, con botón de cerrar
flotante arriba a la derecha, zoom con la rueda, pinch en trackpad y gestos típicos de
imagen también en responsive.

### Gestos y controles

| Acción | Cómo |
|---|---|
| Acercar / alejar | Rueda del mouse, pinch del trackpad, pinch de dos dedos en pantalla táctil, botones + y −, teclas `+` y `−` |
| Alternar acercamiento | Doble clic o doble toque (alterna entre imagen completa y 250%) |
| Desplazar | Arrastrar con el mouse o con el dedo |
| Ver la imagen completa | Botón de reinicio, o tecla `0` |
| Cerrar | Botón flotante arriba a la derecha, `Esc`, o clic en el fondo |

El acercamiento sigue al cursor o al punto medio de los dedos: lo que se está mirando queda
en su lugar en vez de saltar al centro. El desplazamiento está acotado para que la imagen no
se pueda arrastrar fuera de la vista, y el mínimo es la imagen completa (100%), así que nunca
queda más chica que la pantalla. El máximo es 600%.

### Dónde van los controles

El botón de cerrar va flotando arriba a la derecha, separado del borde. El control de zoom
cambia de lugar según el espacio libre, para no taparle nada a la imagen:

| | Control de zoom | Por qué |
|---|---|---|
| Escritorio | Flotando abajo a la derecha, al mismo margen que el cerrar | El flyer es vertical y deja libres los costados. Va por encima del botón de chat de la landing, que ocupa esa esquina |
| Hasta 900px | Centrado, **debajo** de la imagen | La imagen entra por ancho y sobra alto. El control es parte del layout, no flota: la imagen dispone sólo del alto restante, así que no se pisan ni con la imagen ampliada |

**Hipótesis a validar:** los valores concretos — 250% para el doble toque, 600% de máximo, el
paso de los botones — salen de lo que se siente natural en un visor, no de una definición del
área.

### Decisiones de implementación

- **Sin librerías nuevas.** Todo se resuelve con eventos de puntero, así que el mismo código
  atiende mouse, trackpad y touch sin ramas por dispositivo, y el proyecto no suma una
  dependencia para una propuesta que todavía se está evaluando.
- **`<dialog>` nativo**, como el modal de devolución de la v2: el navegador ya resuelve foco
  atrapado, cierre con `Esc`, fondo inerte y devolución del foco al CTA que lo abrió.
- **La rueda se escucha a mano** (`passive: false`) porque React registra `onWheel` como
  pasivo y ahí no se puede impedir que el navegador haga su propio scroll o zoom.
- **La superficie declara `touch-action: none`** para que los gestos los maneje el visor y no
  el navegador.

### Deep link

`/prototipo/v3#fulfillment` abre la landing con el flyer ya abierto; se puede enlazar y
recargar. Es el mismo patrón que usa el modal de devolución de la v2.

### Accesibilidad

- El diálogo tiene nombre accesible ("Fulfillment de Correo Argentino") y el CTA declara
  `aria-haspopup="dialog"`.
- **El `alt` de la imagen transcribe el contenido del flyer.** Es texto dentro de una imagen:
  sin esa descripción, para un lector de pantalla la propuesta directamente no existe. Vive
  en [`v3/data/v3.content.ts`](../src/modules/prototype/v3/data/v3.content.ts) y hay que
  actualizarlo si cambia el flyer.
- Los botones de zoom cubren a quien no tenga rueda ni trackpad, y hay atajos de teclado.

**Pendiente:** una imagen no es contenido accesible ni indexable por más que tenga `alt`. Si
esta versión avanza, conviene decidir si el texto del flyer se publica también como HTML.

## El asset

`src/assets/img/Fulfillment.jpeg` — 1010 × 1600 px, 285 KB. Es una pieza vertical con el
título "Fulfillment", la marca "Próximamente", qué incluye el servicio, la distribución por
zona, los beneficios y un cierre.

Observaciones sobre el archivo, para el área que lo produjo:

- Dice **"Gestión depedidos"** donde debería decir "Gestión de pedidos".
- Al ser una imagen, su texto no se puede copiar, traducir, buscar ni ajustar de tamaño.

## Qué queda por validar

- Si Fulfillment se presenta sólo como pieza informativa ("Próximamente") o si en algún
  momento tiene que captar contactos. **Esta versión no tiene formulario**, así que no cumple
  el objetivo del requerimiento formal, que es juntar potenciales clientes.
- Si el flyer es definitivo o provisorio.
- Cuál de las tres versiones se adopta.

## Implementación

```txt
src/modules/prototype/v3/
├── LandingPage.tsx                 # la landing de la v1 + el visor
├── data/v3.content.ts              # el flyer, su descripción y el hash del deep link
└── components/
    ├── ImageDialog.tsx             # visor: gestos, zoom, controles
    └── ImageDialog.module.css
```

### Cómo la v3 reusa la v1 sin romperla

`ServicesSection` ganó una prop **opcional** `actions`: un mapa de servicio → función. El
servicio que aparece ahí muestra su CTA como botón y ejecuta esa acción; el resto navega como
siempre. La v1 no pasa la prop y queda exactamente igual, verificado en el navegador.

Es el mismo criterio que se usó para la v2: **no se duplican componentes de la v1 para hacer
una variante**, se les suma una prop cuyo valor por defecto es el comportamiento original.

## Fuentes

- **Pedido del usuario del proyecto (14/09/2026):** alcance de la v3 — landing igual a la v1,
  flyer en modal a alto de pantalla, botón de cerrar flotante, zoom con rueda, pinch en
  trackpad y gestos típicos también en responsive.
- **`Fulfillment.jpeg`**, provisto por el usuario y ubicado en `src/assets/img/`.
