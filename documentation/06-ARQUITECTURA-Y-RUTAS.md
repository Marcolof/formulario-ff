# Arquitectura y rutas

El proyecto es un monorepo con **un solo build y una sola URL**. El Hub es la home; cada
módulo es una entidad madre con su propia landing, y sus artefactos cuelgan de ella.

## Estructura

```txt
Formulario FF claude/
├── .project/project.yaml        # estado del proyecto
├── index.html · vite.config.ts · package.json   # build único en la raíz
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
        │   └── v1/              # versión 1: réplica del layout original
        └── documentation/       # lector de los .md de documentation/
```

## Mapa de rutas

| Ruta | Qué es | Módulo |
|---|---|---|
| `/` | Hub — portada con las tarjetas de módulo | hub |
| `/prototipo` | Landing del módulo: las versiones y cuál está vigente | prototype |
| `/prototipo/v1` | Versión 1 — réplica del layout original | prototype |
| `/documentacion` | Índice de documentos | documentation |
| `/documentacion/:docId` | Un documento, con opción de descargar el `.md` | documentation |

Las versiones del prototipo se numeran y cada una tiene su propia ruta. Cuando exista la
versión 2 será `/prototipo/v2`: la v1 no se modifica para probar propuestas.

Todas las rutas son deep links: se pueden abrir directamente y recargar. Desde cualquier
punto hay regreso al Hub — en las landings de módulo por el breadcrumb, y sobre la réplica
por un botón flotante que `PrototypeChrome` agrega **por fuera** del marcado replicado.

## Una sola fuente editable por información

- Los documentos para leer o descargar viven en `documentation/` como Markdown. El módulo
  de documentación los importa como texto crudo (`?raw`), así que no hay una segunda copia
  dentro de `src/`: editar el `.md` actualiza la app.
- Los datos que consume el front (textos y enlaces de la landing) viven dentro del módulo
  del prototipo, en `v1/data/landing.content.ts`.

## Aislamiento de estilos

Tres ámbitos que no se mezclan:

| Ámbito | Archivo | Enganche |
|---|---|---|
| Compartido de MiCorreo | `src/styles/tokens.css` | `:root` |
| Chrome del producto (Hub y landings de módulo) | `src/app/shell.tokens.css` | `[data-shell='formulario-ff']` |
| Módulo Prototipo | `src/modules/prototype/prototype.tokens.css` | `[data-module='prototype']` |

Los tokens de módulo se enganchan a un atributo y no a una clase de CSS Module para que el
selector no dependa del hash del build. Nada del chrome se filtra a la réplica ni al revés.

`prototype.tokens.css` está al nivel del módulo y no dentro de `v1/` a propósito: es el
lenguaje visual de MiCorreo, y toda versión nueva del prototipo lo consume igual. Lo que sí
es propio de cada versión son sus componentes y su layout.

## Levantarlo

```bash
npm run dev
```

Puerto 4320. `npm run build` genera `dist/` y `npm run typecheck` valida los tipos.

## Estado de entrega

Todo el build es estático y todas las rutas funcionan al recargarlas, así que el proyecto se
puede publicar tal cual. Todavía no hay repositorio remoto ni URL pública: el usuario decide
cuándo y dónde, y el repositorio se conecta con su URL.
