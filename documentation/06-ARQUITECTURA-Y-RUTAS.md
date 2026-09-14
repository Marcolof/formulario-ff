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
├── presentation/                # vacío por ahora
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
        │   ├── prototype.tokens.css   # tokens compartidos por todas las versiones
        │   ├── PrototypeHome.tsx      # listado de versiones
        │   ├── components/PrototypeChrome.tsx
        │   ├── v1/              # versión 1: réplica del layout original + Fulfillment
        │   │   └── fulfillment/ # la página de Fulfillment (única, la usan v1 y v2)
        │   ├── v2/              # versión 2: carrusel de servicios en panel navy
        │   └── v3/              # versión 3: la landing de la v1 + el visor del flyer
        └── documentation/       # lector de los .md de documentation/
```

## Mapa de rutas

| Ruta | Qué es | Módulo |
|---|---|---|
| `/` | Hub — portada con las tarjetas de módulo | hub |
| `/prototipo` | Landing del módulo: las versiones y en qué estado está cada una | prototype |
| `/prototipo/v1` | Versión 1 — réplica del layout original + tarjeta de Fulfillment | prototype |
| `/prototipo/v1/fulfillment` | Página de Fulfillment con el formulario | prototype |
| `/prototipo/v2` | Versión 2 — carrusel de servicios | prototype |
| `/prototipo/v2#gestion-devolucion` | Versión 2 con el modal de devolución abierto | prototype |
| `/prototipo/v2/fulfillment` | La **misma** página de Fulfillment, montada bajo la v2 | prototype |
| `/prototipo/v3` | Versión 3 — la landing de la v1 con el flyer en un visor | prototype |
| `/prototipo/v3#fulfillment` | Versión 3 con el flyer abierto | prototype |
| `/documentacion` | Índice de documentos | documentation |
| `/documentacion/:docId` | Un documento, con opción de descargar el `.md` | documentation |

Las versiones del prototipo se numeran y cada una tiene su propia ruta: la v1 no se modifica
para probar propuestas. La v2 y la v3 componen su landing con componentes de la v1 y sólo
agregan lo suyo — ver [08-PROPUESTA-V2.md](08-PROPUESTA-V2.md) y
[09-PROPUESTA-V3.md](09-PROPUESTA-V3.md).

La página de Fulfillment es una sola. Que tenga una ruta bajo la v1 y otra bajo la v2 es sólo
para que el recorrido de una demo no cambie de versión en la URL; es el mismo componente. **La
v3 no tiene ruta de Fulfillment**: su acceso abre el flyer sobre la propia landing.

Todas las rutas son deep links: se pueden abrir directamente y recargar. Desde cualquier
punto hay regreso al Hub — en las landings de módulo por el breadcrumb, y sobre las versiones
del prototipo por un botón flotante que `PrototypeChrome` agrega **por fuera** del marcado de
la página.

Al cambiar de ruta el scroll vuelve arriba (`ScrollToTop`). Los cambios de hash no lo mueven:
en la v2 y en la v3 el hash abre y cierra un modal, y cerrarlo no tiene que mandar la página
arriba.

## Una sola fuente editable por información

- Los documentos para leer o descargar viven en `documentation/` como Markdown. El módulo
  de documentación los importa como texto crudo (`?raw`), así que no hay una segunda copia
  dentro de `src/`: editar el `.md` actualiza la app.
- Los datos que consume el front viven dentro del módulo del prototipo: `v1/data/` (landing
  y página de Fulfillment), `v2/data/` (tarjetas del carrusel) y `v3/data/` (el flyer y su
  descripción). La v2 no copia enlaces: los toma de los servicios de la v1 por su
  identificador.
- El contenido de "Gestionar Devolución" existe una vez, en `v1/components/ReturnsForm.tsx`;
  lo usan la sección de la v1 y el modal de la v2.

## Cómo las versiones nuevas reusan la v1

Ninguna versión duplica componentes de la v1 para hacer una variante. Los componentes
compartidos reciben **props opcionales cuyo valor por defecto es el comportamiento de la
landing original**, y la piel propia de cada versión se aísla con un `data-variant`. Así la v1
queda intacta y hay un solo lugar por componente.

| Componente de la v1 | Prop | La usa |
|---|---|---|
| `SectionHeading` | `rules` | v2 (títulos sin reglas laterales) |
| `ShortcutsSection` | `title`, `items`, `variant`, `headingRules` | v2 |
| `WhyUsSection` | `headingRules` | v2 |
| `ServicesSection` | `actions` | v3 (el CTA de Fulfillment abre el visor en vez de navegar) |

## Aislamiento de estilos

Tres ámbitos que no se mezclan:

| Ámbito | Archivo | Enganche |
|---|---|---|
| Compartido de MiCorreo | `src/styles/tokens.css` | `:root` |
| Chrome del producto (Hub y landings de módulo) | `src/app/shell.tokens.css` | `[data-shell='formulario-ff']` |
| Módulo Prototipo | `src/modules/prototype/prototype.tokens.css` | `[data-module='prototype']` |

Los tokens de módulo se enganchan a un atributo y no a una clase de CSS Module para que el
selector no dependa del hash del build. Nada del chrome se filtra al prototipo ni al revés.

`prototype.tokens.css` está al nivel del módulo y no dentro de `v1/` a propósito: es el
lenguaje visual de MiCorreo, y toda versión del prototipo lo consume igual. Lo que sí es
propio de cada versión son sus componentes y su layout.

## Levantarlo

```bash
npm run dev
```

Puerto 4320. `npm run build` genera `dist/` y `npm run typecheck` valida los tipos.

## Estado de entrega

Repositorio: `https://github.com/Marcolof/formulario-ff`, rama `main`. Vercel publica cada
push en `https://formulario-ff.vercel.app`. Nada se sube sin un pedido explícito: el trabajo
local puede ir por delante de la URL pública.
