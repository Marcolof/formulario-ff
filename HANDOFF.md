# HANDOFF — Formulario FF

Este archivo es para que otra sesión/cuenta de IA (o una persona) pueda seguir el trabajo sin
releer todo el historial de chat. Se actualiza cada vez que hay un traspaso relevante — no es
un changelog de cada commit (eso vive en `documentation/05-REGISTRO-DE-CAMBIOS.md`).

**Última actualización:** 2026-09-14.

## Qué es este proyecto

Página de captación de **Fulfillment** dentro de **MiCorreo** (Correo Argentino): una landing
con acceso a Fulfillment y una página con formulario de contacto. Cliente: Correo Argentino.

## Carpetas y permisos (importante, no te lo saltees)

- **Única carpeta con permiso de lectura y escritura:**
  `C:\MLOF 01\VORTEX\CORREO ARGENTINO\Formulario FF\Formulario FF claude` (raíz de este repo).
- **Fuentes de sólo lectura — no modificar nunca:**
  - `C:\MLOF 01\VORTEX\CORREO ARGENTINO\Envios internacionales\Envio internacional CLAUDE`
    (de ahí salen `tokens.css`, `globals.css` y las fuentes Gilroy).
  - `C:\MLOF 01\VORTEX\CORREO ARGENTINO\Formulario FF\html reference` (HTML guardado de la
    landing, sin estilos utilizables — ver por qué en
    [documentation/02-FUENTES.md](documentation/02-FUENTES.md)).
  - Google Doc `docs.google.com/document/d/1OXfjHoUCptr2RVdWdQEgJBFAMqr7vVx2` — el
    documento formal de requerimiento ("Solicitud Inicial_Formulario FF"). Solo lectura.
- Cualquier cambio a algo "de origen" se hace como copia local trazable dentro de esta
  carpeta, nunca editando el original.

## Estado actual (2026-09-14)

- **Local:** verificado, todo funciona (`npm run typecheck` limpio, navegación y gestos
  probados en el navegador en escritorio y mobile).
- **Git:** al día. El 14/09/2026 se subió todo lo pendiente (rubros reales, versión 2 con su
  rediseño y versión 3 completa) en un solo commit. **No hacer commit ni push sin que el
  usuario lo pida explícitamente** ("subir a github" es la frase que usa).
- **Remoto:** `https://github.com/Marcolof/formulario-ff`, rama `main`. Deploy automático
  en Vercel (`formulario-ff.vercel.app`, proyecto `marcos-projects-c934fa75/formulario-ff`)
  en cada push a `main`, así que la URL pública refleja lo que hay en `main`.
- **Figma:** el conector MCP de Figma requiere reautenticación (no se puede usar hasta que
  el usuario lo autorice desde la config de conectores de claude.ai o `/mcp`). El diseño
  visual de referencia de la página Fulfillment vive en "Mi Correo 2.0"
  (fileKey `wN6vAlF1TgGc2AJdJJvsAU`), página "GDD-2735 - Formulario FF (Fulfillment)",
  nodo `13217:34295` — hecho por el propio usuario, es fuente de verdad visual.
  **Ojo:** el rediseño de la v2 salió de una **imagen** que el usuario pasó por chat
  (captura de su Figma); la cuenta con la que se trabaja hoy **no tiene acceso a ese
  archivo**, así que las medidas se derivaron de la imagen y de los tokens existentes.
  Al recuperar el acceso, contrastar espaciados y tamaños.

## Arquitectura (resumen — el detalle vivo está en el código y en la documentación)

Monorepo, un solo build, una sola URL, puerto local **4320**.

```
/                        → Hub (portada)
/prototipo               → landing del módulo prototipo (lista de versiones)
/prototipo/v1             → versión 1: réplica fiel de la landing original + Fulfillment
/prototipo/v1/fulfillment → página de Fulfillment con el formulario (ÚNICA — ver nota abajo)
/prototipo/v2             → versión 2: carrusel de servicios en panel navy + accesos rápidos
/prototipo/v2/fulfillment → la MISMA página de Fulfillment, montada bajo la v2
/prototipo/v3             → versión 3: la landing de la v1; #fulfillment abre el flyer en un visor
/documentacion            → índice de documentos .md
/documentacion/:docId     → un documento
```

Documento canónico de arquitectura: [documentation/06-ARQUITECTURA-Y-RUTAS.md](documentation/06-ARQUITECTURA-Y-RUTAS.md).
Estado estructurado (fuentes, decisiones, pendientes): [.project/project.yaml](.project/project.yaml)
— leerlo siempre antes de tocar algo, tiene más detalle que este archivo.

**Regla de una sola fuente editable:** los `.md` de `documentation/` son la única fuente de
la documentación humana (se importan con `?raw`, no hay copia dentro de `src/`); los datos
que consume el front viven en `src/modules/prototype/**/data/*.content.ts`.

## Las tres versiones de la landing — por qué existen

- **v1** (`src/modules/prototype/v1/`): réplica fiel de la landing de producción de MiCorreo,
  con la tarjeta de Fulfillment agregada en "Conocé nuestros servicios". Es la referencia
  contra la que se comparan las propuestas nuevas. **No se modifica para probar cosas.**
- **v2** (`src/modules/prototype/v2/`): propuesta de alto impacto, pedida el 11/09/2026 y
  **rediseñada el mismo día** a partir de una imagen de referencia del usuario. Sólo cambia el
  bloque central de la landing:
  - El hero se mantiene igual.
  - "Gestionar Devolución" y "Conocé nuestros servicios" (6 tarjetas) se reemplazan por un
    **carrusel que conserva el título "Conocé nuestros servicios"**, dentro de un **panel
    navy redondeado**, con 7 tarjetas (ícono a la izquierda + título + descripción + CTA):
    devolución, Paq.ar, **Fulfillment** (destacado con "¡Nuevo!" y botón "Solicitar"), Mis
    Comunicaciones Digitales, Punto Correo, Rotulador, Oficios Judiciales. **Sólo
    Fulfillment va destacado** — la imagen de referencia también marcaba "Mis Comunicaciones
    Digitales", pero se decidió no replicarlo porque el requerimiento formal presenta sólo a
    Fulfillment como novedad.
  - "Gestionar Devolución" pasa a abrirse en un **modal** (`<dialog>` nativo) con
    exactamente el mismo contenido que tenía la sección de la v1. Deep-linkeable con
    `/prototipo/v2#gestion-devolucion`.
  - La sección "Accesos directos" (Seguimiento y Sucursales) se renombra **"Accesos
    rápidos"**, con **Sucursales primero**, tarjeta blanca con sombra y CTA con subrayado
    amarillo. Los títulos de sección de la v2 van **sin las reglas laterales** de la v1.
  - Documentación funcional: [documentation/08-PROPUESTA-V2.md](documentation/08-PROPUESTA-V2.md).
- **v3** (`src/modules/prototype/v3/`): propuesta de **mínimo cambio**, pedida el 14/09/2026.
  - La landing es **exactamente la de la v1**: los mismos componentes, mismo orden, sin
    variantes de estilo.
  - Lo único que cambia es el destino del CTA de Fulfillment: abre el flyer del cliente
    (`src/assets/img/Fulfillment.jpeg`) en un **visor a pantalla completa** — cerrar flotante
    arriba a la derecha, zoom con rueda, pinch de trackpad, pinch y doble toque en táctil,
    arrastre para desplazar, botones de zoom y atajos de teclado. Deep link:
    `/prototipo/v3#fulfillment`.
  - **No tiene pantalla propia de Fulfillment ni formulario**, así que por sí sola no cumple
    el objetivo del requerimiento formal (captar contactos). Está anotado como pregunta
    abierta.
  - El visor **no usa ninguna librería**: todo con eventos de puntero. Si vas a tocarlo, leé
    los comentarios de `v3/components/ImageDialog.tsx` antes (la rueda se escucha a mano por
    el listener pasivo de React; la superficie declara `touch-action: none`).
  - Documentación funcional: [documentation/09-PROPUESTA-V3.md](documentation/09-PROPUESTA-V3.md).

**Lo que comparten y no hay que romper:**

- **La página de Fulfillment es una sola** — no hay una copia por versión. El mismo
  componente (`v1/fulfillment/FulfillmentPage.tsx`) se monta en `/prototipo/v1/fulfillment` y
  `/prototipo/v2/fulfillment` sólo para que una demo no salte de versión en la URL. La v3 no
  la usa.
- El texto/campo/botón de "Gestionar Devolución" vive una sola vez en
  `v1/components/ReturnsForm.tsx` y lo usan la sección de la v1 y el modal de la v2. Los
  enlaces de los servicios de la v2 se toman de `v1/data/landing.content.ts` por `id`.
- **Cómo las propuestas reusan la v1 sin romperla** (importante): `SectionHeading`,
  `ShortcutsSection`, `WhyUsSection` y `ServicesSection` ganaron props **opcionales**
  (`rules`, `title`, `items`, `variant`, `headingRules`, `actions`) cuyo valor por defecto es
  exactamente el comportamiento de la landing original. La v1 no pasa nada y queda igual. La
  piel de la v2 se aísla con `[data-variant='v2']`. **No dupliques estos componentes** para
  hacer otra variante: sumá una prop con default.
- **Todavía no se decidió cuál de las tres se presenta/adopta.** Es una pregunta abierta en
  `project.yaml`.

## Formulario de Fulfillment — lo más importante para no romper

- Campos, validaciones y obligatoriedad salen del documento formal ("Solicitud Inicial
  Formulario FF" v1.0) — no inventar reglas nuevas sin confirmarlas ahí.
- **El listado de rubros es el desplegable REAL de MiCorreo, provisto por Correo
  Argentino.** No es una lista que este proyecto pueda inventar, agregar o editar por
  cuenta propia. Vive en `v1/data/fulfillment.content.ts` (`export const rubros`). Si hace
  falta cambiarlo, el pedido tiene que salir del área solicitante de Correo Argentino — no
  completarlo a criterio propio. Está documentado con esta misma advertencia en
  [documentation/07-FORMULARIO-FULFILLMENT.md#rubros](documentation/07-FORMULARIO-FULFILLMENT.md).
- El mensaje de confirmación de envío es un texto de trabajo, no aprobado por el área — está
  marcado como pendiente en la documentación.
- No hay backend: el formulario no envía nada de verdad. Estados de "enviando" y "error de
  servidor" no están implementados a propósito (dependen de que exista backend).

## Convenciones que hay que respetar

- **Push y commit sólo si el usuario lo pide explícitamente** ("subir a github" / "subir a
  git hub"). Nunca crear un repo remoto ni un proyecto de Vercel nuevo — el usuario ya tiene
  ambos conectados; sólo se hace push al existente cuando lo autoriza.
- Tokens en tres capas, no mezclar: `src/styles/tokens.css` (`:root`, primitivas de marca de
  MiCorreo), `src/app/shell.tokens.css` (`[data-shell]`, chrome del Hub), y
  `src/modules/prototype/prototype.tokens.css` (`[data-module='prototype']`, lenguaje visual
  de la landing/Fulfillment — usado por todas las versiones por igual).
- Componentes compartidos de la v1 (`OutlinedField`/`OutlinedSelect` con
  `variant="landing"|"form"`, `Button` con `size="md"|"lg"|"pill"`) — reusarlos, no crear
  variantes nuevas de inputs o botones.
- Íconos: **Lucide** (`lucide-react`), nunca dibujar SVGs propios ni "regenerar" íconos.
- Fuente: **Gilroy** en todo el módulo prototype (landing/Fulfillment). Ubuntu es de otro
  proyecto (MLOF Color) — no confundir.
- No sumar dependencias para resolver algo que el navegador ya hace (el visor de la v3 y los
  modales son ejemplos: `<dialog>` nativo y eventos de puntero).
- Antes de cambiar código existente, correr `npm run typecheck` y, si el cambio es visible,
  verificarlo en el navegador (Browser pane / `preview_start` con la config `formulario-ff`,
  puerto 4320) — no asumir que compila.

## Dónde seguir (recomendado, no obligatorio)

1. Decidir con el usuario si se hace commit de lo pendiente (rubros + v2 + v3) antes de seguir
   agregando cambios, para no acumular un diff gigante.
2. Elegir con el área cuál de las tres versiones se adopta. Ojo con la v3: no capta contactos.
3. Validar con el área solicitante los textos breves, el orden y el destacado de las
   tarjetas del carrusel de la v2 (están marcados como hipótesis en el doc 08).
4. Si se quiere llevar la v2 o la v3 a Figma, primero hay que resolver la reautenticación del
   conector.
5. Releer `.project/project.yaml` → `knowledge.open_questions` antes de tomar decisiones de
   producto nuevas: ahí está la lista viva de lo que falta definir.

## Índice rápido de documentación

| Archivo | Contenido |
|---|---|
| `documentation/00-INDICE.md` | Portada de la documentación |
| `documentation/01-CONTEXTO.md` | Requerimiento, alcance, hipótesis, pendientes |
| `documentation/02-FUENTES.md` | De dónde sale cada insumo |
| `documentation/03-COLOR-Y-TOKENS.md` | Sistema de color y tokens |
| `documentation/04-REPLICA-LANDING.md` | Cómo se reconstruyó la landing v1 |
| `documentation/05-REGISTRO-DE-CAMBIOS.md` | Qué se tomó/modificó de cada fuente externa |
| `documentation/06-ARQUITECTURA-Y-RUTAS.md` | Monorepo, rutas, aislamiento de estilos |
| `documentation/07-FORMULARIO-FULFILLMENT.md` | Spec funcional del formulario (campos, rubros, validaciones) |
| `documentation/08-PROPUESTA-V2.md` | Spec funcional de la versión 2 (carrusel + modal) |
| `documentation/09-PROPUESTA-V3.md` | Spec funcional de la versión 3 (flyer en visor) |
| `.project/project.yaml` | Estado estructurado: fuentes, decisiones, módulos, pendientes |
