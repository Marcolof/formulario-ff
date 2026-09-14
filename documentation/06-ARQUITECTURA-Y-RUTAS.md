# Arquitectura y rutas

El proyecto es un monorepo con **un solo build y una sola URL**. El Hub es la home; cada
módulo es una entidad madre con su propia landing, y sus artefactos cuelgan de ella.

## Estructura

```txt
Formulario FF claude/
├── .project/project.yaml        # estado del proyecto
├── HANDOFF.md                   # traspaso entre sesiones de trabajo
├── index.html · vite.config.ts · package.json   # build único en la raíz
├── vercel.json                  # rewrite a index.html: los deep links no dan 404
├── documentation/               # módulo de documentación: los .md editables
├── public/presentacion/         # el deck de presentación: HTML autocontenido +
│                                # capturas + fuentes, servido tal cual por Vite
├── reference/                   # material de origen, fuera del build
│   └── landing-original.html    # el HTML guardado de la landing, sólo para consulta
└── src/
    ├── main.tsx
    ├── app/
    │   ├── router.tsx           # mapa de rutas
    │   ├── ModuleLayout.tsx     # chrome de las landings de módulo
    │   └── shell.tokens.css     # tokens del chrome, separados de los de cada módulo
    ├── styles/                  # tokens y globals compartidos de MiCorreo
    ├── assets/                  # fuentes, logos, íconos e imágenes
    └── modules/
        ├── hub/                 # portada
        ├── prototype/
        │   ├── prototype.tokens.css   # lenguaje visual de MiCorreo, a nivel de módulo
        │   ├── PrototypeHome.tsx      # landing del módulo
        │   ├── components/            # chrome del prototipo: menú flotante, panel de
        │   │                          # casos de uso y el contexto que los comunica
        │   └── v3/              # la única propuesta vigente
        │       ├── components/  # los componentes de la landing replicada
        │       ├── data/        # textos y datos de la landing y del formulario
        │       ├── LandingPage.tsx
        │       └── fulfillment/ # front propio, con su capa de tokens y el hook del
        │                        # formulario
        ├── documentation/       # lector de los .md de documentation/
        └── presentation/        # landing del módulo (React); el deck en sí no vive acá
```

## Mapa de rutas

| Ruta | Qué es | Módulo |
|---|---|---|
| `/` | Hub — portada con las tarjetas de módulo | hub |
| `/prototipo` | Landing del módulo: la propuesta y su estado | prototype |
| `/prototipo/v3` | La landing replicada, con el acceso a Fulfillment | prototype |
| `/prototipo/v3/fulfillment` | Pantalla de Fulfillment con front propio | prototype |
| `/documentacion` | Índice de documentos | documentation |
| `/documentacion/:docId` | Un documento, con opción de descargar el `.md` | documentation |
| `/presentacion` | Landing del módulo: qué es el deck y un botón para abrirlo | presentation |
| `/presentacion/presentacion.html` | El deck en sí. **No es una ruta de React**: es un archivo estático (`public/presentacion/presentacion.html`), servido tal cual por Vite. Se abre en una pestaña nueva | — |

Queda **una sola propuesta, la v3** — ver [08-PROPUESTA-V3.md](08-PROPUESTA-V3.md). La v1
(layout original con el formulario en una columna) y la v2 (carrusel de servicios en panel
navy) se retiraron el 14-09-2026; sus rutas ya no existen. La numeración se conserva: la ruta
sigue siendo `/prototipo/v3` para no romper enlaces ya compartidos, y porque el equipo nombra
así la propuesta.

Las rutas viejas no dan error: el catch-all del router las manda al Hub.

**El deck de presentación es la única excepción a "todo es una ruta de React".** Vive en
`public/presentacion/presentacion.html`: un HTML autocontenido (CSS y JS inline, generado con
la skill `presentacion-proyecto`), servido como archivo estático por Vite. Queda bajo la misma
URL y el mismo build — no es un despliegue aparte — pero abrirlo hace una navegación de
página completa, no un cambio de ruta de la SPA. Cada slide tiene su propio botón "Volver al
hub" que apunta a `/`.

Todas las rutas son deep links: se pueden abrir directamente y recargar. Desde cualquier
punto hay regreso al Hub — en las landings de módulo por el breadcrumb, y sobre el prototipo
por el menú flotante que `PrototypeChrome` agrega **por fuera** del marcado de la página.

Al cambiar de ruta el scroll vuelve arriba (`ScrollToTop`). Los cambios de hash no lo mueven:
`/prototipo/v3/fulfillment#formulario` baja al formulario sin pelearse con ese reset.

## Chrome del prototipo

`PrototypeChrome` envuelve la página sin tocar su marcado —la landing replicada tiene que
quedar idéntica al original— y aporta un botón flotante abajo a la izquierda (la derecha la
ocupa el chatbot de la landing) con dos caminos:

1. **Volver al hub.**
2. **Simular casos de uso**, que abre un panel de tweaks con un chip por caso:
   - *Happy path*: comportamiento real. Si los datos son válidos, el formulario se envía y
     aparece el estado de éxito.
   - *Error de formulario*: el envío nunca prospera; al pulsar "Enviar" aparece el mensaje de
     error general del formulario, además de los errores reales de cada campo.

El caso elegido viaja por contexto (`components/simulation.ts`), no por props: lo consume el
formulario, que está varios niveles abajo. El valor por defecto del contexto es `happy`, así
que la pantalla montada fuera del chrome se comporta como en producción.

## Una sola fuente editable por información

- Los documentos para leer o descargar viven en `documentation/` como Markdown. El módulo
  de documentación los importa como texto crudo (`?raw`), así que no hay una segunda copia
  dentro de `src/`: editar el `.md` actualiza la app.
- Los datos que consume el front viven dentro del módulo del prototipo: `v3/data/
  landing.content.ts` (landing) y `v3/data/fulfillment.content.ts` (textos y rubros del
  formulario). El enlace a la pantalla de Fulfillment sale de ahí, no escrito a mano en cada
  componente.
- **Las reglas del formulario existen una vez**, en `v3/fulfillment/useContactForm.ts`:
  campos, validaciones, límites de longitud y momento de validación. El componente sólo pone
  el marcado y toma de ahí hasta los `maxLength`.
- La lista de rubros sale del desplegable real de MiCorreo (`v3/data/fulfillment.content.ts`):
  **no se inventa ni se edita** por nuestra cuenta.

## Cómo se agregan variantes

Regla vigente del proyecto: **ningún componente se duplica para hacer una variante**. Se le
agrega una prop opcional cuyo valor por defecto es el comportamiento original, y la piel
propia se aísla con un atributo (`data-variant`, `data-page`), nunca con una copia del
archivo. Así hay un solo lugar por componente.

Quedan de esa regla las props opcionales que sobrevivieron al retiro de la v2 —`rules` en
`SectionHeading`, `headingRules` en `WhyUsSection`, `title`/`items`/`variant` en
`ShortcutsSection`— hoy sin consumidor que las cambie: son el punto de extensión, no código
muerto a limpiar sin decidirlo.

## Aislamiento de estilos

Los ámbitos no se mezclan:

| Ámbito | Archivo | Enganche |
|---|---|---|
| Compartido de MiCorreo | `src/styles/tokens.css` | `:root` |
| Chrome del producto (Hub y landings de módulo) | `src/app/shell.tokens.css` | `[data-shell='formulario-ff']` |
| Módulo Prototipo | `src/modules/prototype/prototype.tokens.css` | `[data-module='prototype']` |
| Pantalla de Fulfillment de la v3 | `src/modules/prototype/v3/fulfillment/fulfillment.tokens.css` | `[data-page='fulfillment-v3']` |

Los tokens se enganchan a un atributo y no a una clase de CSS Module para que el selector no
dependa del hash del build. Nada del chrome se filtra al prototipo ni al revés.

`prototype.tokens.css` está al nivel del módulo y no dentro de `v3/` a propósito: es el
lenguaje visual de MiCorreo, y la landing de cualquier propuesta lo consume igual. La pantalla de
Fulfillment de la v3 es la excepción: tiene su propio lenguaje visual y por eso su propia capa,
que sólo alcanza a esa página. Como su barra superior y su footer sí son los de la landing, esa
página declara los dos ámbitos a la vez.

**Tipografía:** Gilroy en todo el proyecto, embebida desde `src/assets/fonts`. Hasta el
14-09-2026 la pantalla de Fulfillment era la excepción: su diseño de Figma pide **Poppins**,
que se cargaba desde Google Fonts. Ese día el usuario confirmó que la tipografía definitiva es
la del sistema, así que se descartó Poppins. **Ya no hay excepciones ni recursos externos:** el
proyecto entero se sirve con sus propios archivos.

## Levantarlo

```bash
npm run dev
```

Puerto 4320. `npm run build` genera `dist/` y `npm run typecheck` valida los tipos.

## Estado de entrega

Repositorio: `https://github.com/Marcolof/formulario-ff`, rama `main`. Vercel publica cada
push en `https://formulario-ff.vercel.app`. Nada se sube sin un pedido explícito: el trabajo
local puede ir por delante de la URL pública.
