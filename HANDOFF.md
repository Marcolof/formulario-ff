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

- **Local:** verificado (`npm run typecheck` y `npm run build` limpios; navegación, formulario
  y responsive probados en el navegador).
- **Git:** al día con `main`. Se subió la reformulación completa de la v3 (pantalla propia de
  Fulfillment) más tres ajustes de esa misma sesión: el ancho del contenido, la posición del
  campo "Número de cliente" y el tamaño de los encabezados de columna. No hacer commit ni push
  sin que el usuario lo pida explícitamente ("subir a github" es la frase que usa).
- **Remoto:** `https://github.com/Marcolof/formulario-ff`, rama `main`. Deploy automático
  en Vercel (`formulario-ff.vercel.app`, proyecto `marcos-projects-c934fa75/formulario-ff`)
  en cada push a `main`.
- **Figma:** el conector funciona. El archivo es "Mi Correo 2.0"
  (fileKey `wN6vAlF1TgGc2AJdJJvsAU`), página "GDD-2735 - Formulario FF (Fulfillment)". Dos
  nodos importan: **`13217:34295`** (pantalla de Fulfillment de la v1 y la v2) y
  **`13284:7345`** (pantalla de la v3, dibujada a 1010px de ancho).
  **Ojo:** el rediseño del bloque central de la v2 no salió de Figma sino de una **imagen** que
  el usuario pasó por chat, porque en ese momento la cuenta no tenía acceso al archivo. Esas
  medidas conviene contrastarlas contra Figma.

## Arquitectura (resumen — el detalle vivo está en el código y en la documentación)

Monorepo, un solo build, una sola URL, puerto local **4320**.

```
/                          → Hub (portada)
/prototipo                 → landing del módulo prototipo (lista de versiones)
/prototipo/v1              → versión 1: réplica fiel de la landing original
/prototipo/v1/fulfillment  → pantalla de Fulfillment con formulario (la usan v1 y v2)
/prototipo/v2              → versión 2: carrusel de servicios en panel navy
/prototipo/v2/fulfillment  → la MISMA pantalla de Fulfillment, montada bajo la v2
/prototipo/v3              → versión 3: la landing de la v1 con el acceso redirigido
/prototipo/v3/fulfillment  → pantalla de Fulfillment con front propio (OTRA pantalla)
/documentacion             → índice de documentos .md
/documentacion/:docId      → un documento
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
- **v2** (`src/modules/prototype/v2/`): propuesta de alto impacto sobre la landing, pedida el
  11/09/2026 y rediseñada el mismo día. Sólo cambia el bloque central:
  - El hero se mantiene igual.
  - "Gestionar Devolución" y "Conocé nuestros servicios" se reemplazan por un **carrusel** que
    conserva el título "Conocé nuestros servicios", dentro de un **panel navy redondeado**, con
    7 tarjetas. **Sólo Fulfillment va destacado** ("¡Nuevo!" + "Solicitar"): la imagen de
    referencia marcaba también "Mis Comunicaciones Digitales", pero el requerimiento formal
    sólo presenta Fulfillment como novedad.
  - "Gestionar Devolución" pasa a un **modal**, deep-linkeable con
    `/prototipo/v2#gestion-devolucion`.
  - "Accesos directos" se renombra **"Accesos rápidos"**, con Sucursales primero.
  - Documentación: [documentation/08-PROPUESTA-V2.md](documentation/08-PROPUESTA-V2.md).
- **v3** (`src/modules/prototype/v3/`): **pantalla propia de Fulfillment**, reformulada el
  14/09/2026 (antes era un visor con un flyer estático; ese enfoque quedó descartado).
  - La landing es **exactamente la de la v1**; lo único que cambia es el destino del acceso a
    Fulfillment.
  - Esa pantalla es **un front distinto del sistema visual de la landing**: navy `#14245d` y
    `#192b69`, tipografía **Poppins**, íconos de Lucide en círculos, hero con imagen propia,
    servicios en dos columnas, formulario a dos columnas, caja de beneficios y cierre.
    Conserva la barra superior y el footer de la landing.
  - Está calcada del diseño de Figma `13284:7345`, dibujado a 1010px, pero el **ancho máximo
    del contenido es 1320px** (el mismo que la landing): a 1010px se veía angosto en pantallas
    grandes (feedback del usuario). Las columnas de servicios e inputs son grillas fijas a 2,
    así que ensanchar el máximo sólo ensancha las columnas, no las multiplica.
  - La imagen del hero **se oculta en pantallas de hasta 900px** (queda sólo el texto), y en
    escritorio va al 146% de su caja, anclada a la izquierda, como en el diseño.
  - "Número de cliente" aparece **justo debajo** de "¿Ya sos cliente de MiCorreo?" cuando se
    responde "Sí" (no arriba, mezclado con el resto de los inputs — corregido por feedback del
    usuario). Va acotado a media columna en escritorio.
  - Al enviar el formulario, la tarjeta **conserva su altura** y muestra un mensaje de éxito con
    ícono.
  - Documentación: [documentation/09-PROPUESTA-V3.md](documentation/09-PROPUESTA-V3.md).

**Lo que comparten y no hay que romper:**

- **Hay dos pantallas de Fulfillment, no tres.** La de la v1 y la v2 es el mismo componente
  montado en dos rutas; la de la v3 es otra.
- **Las reglas del formulario existen una sola vez**, en
  `v1/fulfillment/useContactForm.ts`: campos, validaciones y momento de validación. Las usan la
  pantalla de la v1/v2 y la de la v3, que tienen el mismo formulario con distinto layout. Si
  cambia una regla, cambia para todas.
- El contenido de "Gestionar Devolución" vive una vez en `v1/components/ReturnsForm.tsx`.
- **Cómo las propuestas reusan la v1 sin romperla** (importante): `SectionHeading`,
  `ShortcutsSection`, `WhyUsSection` y `ServicesSection` tienen props **opcionales**
  (`rules`, `title`, `items`, `variant`, `headingRules`, `hrefs`) cuyo valor por defecto es
  exactamente el comportamiento de la landing original. La v1 no pasa nada y queda igual. La
  piel de la v2 se aísla con `[data-variant='v2']` y la pantalla de la v3 con
  `[data-page='fulfillment-v3']`. **No dupliques estos componentes** para hacer otra variante:
  sumá una prop con default.
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
- Tokens por capas, no mezclar: `src/styles/tokens.css` (`:root`, primitivas de marca),
  `src/app/shell.tokens.css` (`[data-shell]`, chrome del Hub),
  `src/modules/prototype/prototype.tokens.css` (`[data-module='prototype']`, lenguaje visual de
  la landing) y `v3/fulfillment/fulfillment.tokens.css` (`[data-page='fulfillment-v3']`, el
  front propio de esa pantalla).
- Componentes compartidos de la v1 (`OutlinedField`/`OutlinedSelect` con
  `variant="landing"|"form"`, `Button` con `size="md"|"lg"|"pill"`) — reusarlos, no crear
  variantes nuevas de inputs o botones. La pantalla de la v3 los reutiliza aunque su diseño
  sea distinto, porque el diseño usa esos mismos controles.
- Íconos: **Lucide** (`lucide-react`), nunca dibujar SVGs propios ni "regenerar" íconos. El
  Figma nombra cada capa con el nombre del ícono de Lucide, así que la correspondencia sale de
  ahí.
- Fuente: **Gilroy** en todo el proyecto. La excepción es la pantalla de Fulfillment de la v3,
  que usa **Poppins** por diseño (se carga desde Google Fonts en `index.html`). Ubuntu es de
  otro proyecto (MLOF Color) — no confundir.
- No sumar dependencias para resolver algo que el navegador ya hace (`<dialog>` nativo,
  eventos de puntero, CSS Grid).
- Antes de cambiar código existente, correr `npm run typecheck` y, si el cambio es visible,
  verificarlo en el navegador (Browser pane / `preview_start` con la config `formulario-ff`,
  puerto 4320) — no asumir que compila.

## Dónde seguir (recomendado, no obligatorio)

1. Elegir con el área cuál de las tres versiones se adopta.
2. Confirmar si Poppins es definitiva o un borrador del diseño de la v3.
3. Optimizar `banner ff formulario.png`: pesa 4,7 MB.
4. Releer `.project/project.yaml` → `knowledge.open_questions` antes de tomar decisiones de
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
| `documentation/09-PROPUESTA-V3.md` | Spec funcional de la versión 3 (pantalla propia de Fulfillment) |
| `.project/project.yaml` | Estado estructurado: fuentes, decisiones, módulos, pendientes |
