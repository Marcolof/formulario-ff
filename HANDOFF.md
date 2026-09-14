# HANDOFF — Formulario FF

Este archivo es para que otra sesión/cuenta de IA (o una persona) pueda seguir el trabajo sin
releer todo el historial de chat. Se actualiza cada vez que hay un traspaso relevante — no es
un changelog de cada commit (eso vive en `documentation/05-REGISTRO-DE-CAMBIOS.md`).

**Última actualización:** 2026-09-14.

**Cambios recientes sin commitear:**

- **Limpieza grande (14-09-2026): se borraron las versiones v1 y v2; queda sólo la v3.** El
  usuario lo pidió y ya tenía copia de seguridad. Lo que la v3 usaba se movió con `git mv` a
  `v3/` (`components/`, `data/`, `useContactForm.ts`, `LandingPage.module.css`) para conservar
  el historial; se eliminaron `src/modules/prototype/v1/` y `/v2/`, sus rutas, el documento
  `08-PROPUESTA-V2.md` y los tokens `--ff-` que quedaron sin consumidor. Las URLs viejas
  vuelven al Hub por el catch-all del router. **Toda la documentación se reescribió** para
  reflejarlo.
- **El "Volver al Hub" pasó a ser un menú** (`PrototypeChrome`): "Volver al hub" y "Simular
  casos de uso", que abre un panel de tweaks con chips. Casos: *happy path* y *error de
  formulario* (el envío nunca prospera y el mensaje general aparece **después** de pulsar
  "Enviar"). El caso viaja por contexto desde `components/simulation.ts`; el formulario sólo
  recibe `forceError`. No cambia ninguna regla de validación.
- **Nuevos límites de longitud del formulario**, pedidos por el usuario: razón social, nombre
  y mail a **64** caracteres, número de cliente de **10 dígitos exactos** (sólo números),
  rubro "Otros" en 30. **Ojo:** los tres primeros y el "exactamente 10" **contradicen al
  documento formal** (40, 60, y "hasta" 10). Está registrado como divergencia deliberada en
  `documentation/07-FORMULARIO-FULFILLMENT.md` y hay que confirmarlo con el área solicitante.
  Los valores se exportan desde `useContactForm` (`TEXTO_MAX`, `RUBRO_OTRO_MAX`,
  `NUMERO_CLIENTE_LARGO`) y el JSX los usa como `maxLength`: no los dupliques a mano.
- Se activó el **botón terciario del sistema** (`--button-tertiary-*` en `tokens.css`, ya
  definido pero sin usar) para los CTA de texto tipo "Conocer más"/"Ingresá": subrayado
  amarillo, agregado como `.tertiary` en `Button.module.css` y aplicado con `composes` desde
  `ServicesSection` y `ShortcutsSection`. **Esto también afecta a la landing replicada**: sus
  CTA no tenían subrayado y coincidían con la landing real; ahora dejan de coincidir en ese
  detalle, por decisión explícita del usuario.
- La imagen del hero de la v3 pasó de un `width` en porcentaje fijo (146% → 124%, dos
  rondas de "achicala 15%") a **`object-fit: cover`**: un tercer pedido de bajarla otro 15%
  (a 105%) reveló que por debajo de ~114% la imagen deja de cubrir el alto de la caja y
  aparecen huecos, y que el porcentaje fijo sólo era seguro para el ancho de viewport que se
  había probado. `object-fit: cover` no tiene ese techo ni ese riesgo por viewport.
- **El orden de los campos del formulario cambió**: "Rubro de la
  empresa" pasa a ir donde estaba el teléfono, y el teléfono baja a donde estaba el rubro.
  Sólo cambió el orden en el JSX (`FulfillmentForm.tsx`); las reglas siguen en
  `useContactForm`, sin tocar.
- **El color de foco de todos los inputs y selects** (`OutlinedField`/`OutlinedSelect`, las
  dos variantes) pasó de `--color-accent` a `--border-focus` (`#2196f3`) — el token de foco
  del sistema, que ya existía en `tokens.css` sin usarse en ningún lado. Alcanza a todos los
  campos del producto. **Ojo si tocás este componente:** `element.focus()` por script no dispara el
  `:focus` visual en el navegador de pruebas de este entorno; hay que verificar con un clic
  real (`computer` → `left_click`), no con `getComputedStyle` después de un `.focus()` por JS.
- **El texto debajo de "Enviar"** (`form.disclaimer`, dato compartido) cambió de "Tus datos
  están protegidos." a "La información ingresada será almacenada únicamente para gestionar tu
  solicitud y poder contactarte."

- El texto de confirmación del formulario ya no menciona "de Correo Argentino" (dato
  compartido en `fulfillment.content.ts`).
- **Micro interacciones en la pantalla de Fulfillment de la v3**: la transición entre los
  campos y el estado de éxito ahora es en dos pasos **en cada sentido** —salida animada,
  entrada animada— en vez de un reemplazo directo: al enviar (campos salen, éxito entra con
  el botón subiendo de abajo hacia arriba) y al tocar "Cargar otra consulta" (éxito sale,
  campos vuelven a entrar). Además, cada sección menos el hero aparece con un fundido hacia
  arriba al entrar en pantalla (`useReveal.ts`, nuevo, `IntersectionObserver`, sin
  librerías).

**Pendiente de confirmar con el usuario, no incluido en el commit:** el asset
`src/assets/img/banner ff formulario.png` cambió en disco (4,7 MB → 5,4 MB) fuera de esta
sesión — no lo edité yo. No sé si es un reemplazo intencional del usuario o un efecto de otra
herramienta. Quedó sin commitear a propósito hasta que se confirme.

Ver
[documentation/04-REPLICA-LANDING.md#diferencias-conocidas](documentation/04-REPLICA-LANDING.md)
y [documentation/05-REGISTRO-DE-CAMBIOS.md](documentation/05-REGISTRO-DE-CAMBIOS.md).

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
- **Git:** el último commit subido es `17ae77a`. **Hay bastantes cambios sin commitear** (ver
  la lista de arriba: limpieza de v1/v2, menú del prototipo, límites del formulario y los
  ajustes previos). No hacer commit ni push sin que el usuario lo pida explícitamente ("subir
  a github" es la frase que usa).
- **Remoto:** `https://github.com/Marcolof/formulario-ff`, rama `main`. Deploy automático
  en Vercel (`formulario-ff.vercel.app`, proyecto `marcos-projects-c934fa75/formulario-ff`)
  en cada push a `main`.
- **Figma:** el conector funciona. El archivo es "Mi Correo 2.0"
  (fileKey `wN6vAlF1TgGc2AJdJJvsAU`), página "GDD-2735 - Formulario FF (Fulfillment)". El nodo
  vigente es **`13284:7345`** (la pantalla de Fulfillment, dibujada a 1010px de ancho); el
  **`13217:34295`** es el de la página en una columna, retirada, del que siguen viniendo los
  textos de la tarjeta del formulario y el tratamiento de los controles.

## Arquitectura (resumen — el detalle vivo está en el código y en la documentación)

Monorepo, un solo build, una sola URL, puerto local **4320**.

```
/                          → Hub (portada)
/prototipo                 → landing del módulo prototipo
/prototipo/v3              → la landing replicada, con el acceso a Fulfillment
/prototipo/v3/fulfillment  → pantalla de Fulfillment con front propio
/documentacion             → índice de documentos .md
/documentacion/:docId      → un documento
*                          → cualquier otra ruta (las viejas /v1 y /v2) vuelve al Hub
```

La numeración "v3" se conserva a propósito aunque sea la única: no rompe enlaces ya
compartidos y es como el usuario nombra la propuesta.

Documento canónico de arquitectura: [documentation/06-ARQUITECTURA-Y-RUTAS.md](documentation/06-ARQUITECTURA-Y-RUTAS.md).
Estado estructurado (fuentes, decisiones, pendientes): [.project/project.yaml](.project/project.yaml)
— leerlo siempre antes de tocar algo, tiene más detalle que este archivo.

**Regla de una sola fuente editable:** los `.md` de `documentation/` son la única fuente de
la documentación humana (se importan con `?raw`, no hay copia dentro de `src/`); los datos
que consume el front viven en `src/modules/prototype/**/data/*.content.ts`.

## La propuesta vigente (y qué había antes)

Hubo tres versiones. El 14-09-2026 el usuario pidió borrar la v1 y la v2; **queda sólo la v3**.
Para entender una entrada vieja del registro de cambios: lo que decía `v1/components/` o
`v1/data/` hoy vive en `v3/`.

- **v1** (borrada): la réplica de la landing con la página de Fulfillment en una columna,
  según Figma `13217:34295`. La réplica de la landing **sobrevive** y es la que usa la v3; la
  página en una columna no.
- **v2** (borrada): carrusel de servicios en panel navy y devolución en modal, pedida el
  11-09-2026. Su documento se eliminó; el razonamiento quedó en
  `documentation/05-REGISTRO-DE-CAMBIOS.md`.
- **v3** (`src/modules/prototype/v3/`): **pantalla propia de Fulfillment**, reformulada el
  14/09/2026 (antes era un visor con un flyer estático; ese enfoque quedó descartado).
  - La landing es la réplica de producción, sin cambios visuales; lo único que cambia es el
    destino del acceso a Fulfillment.
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
  - Documentación: [documentation/08-PROPUESTA-V3.md](documentation/08-PROPUESTA-V3.md).

**Lo que no hay que romper:**

- **Las reglas del formulario existen una sola vez**, en `v3/fulfillment/useContactForm.ts`:
  campos, validaciones, límites de longitud y momento de validación. El componente sólo pone
  el marcado y toma de ahí hasta los `maxLength`.
- **No dupliques componentes para hacer una variante**: sumá una prop **opcional** cuyo default
  sea el comportamiento original, y aislá la piel con un atributo (`data-variant`,
  `data-page`). Quedan de esa regla props sin consumidor hoy (`rules`, `headingRules`,
  `title`, `items`, `variant`, `hrefs`): son el punto de extensión, no código muerto a limpiar
  sin decidirlo. También quedaron sin referencia los assets `centro-logistico.png`, `map.png`
  y `clients.svg`, de la página retirada.
- La réplica de la landing **no se modifica para probar ideas**: es el original contra el que
  se mide cualquier cambio.

## Formulario de Fulfillment — lo más importante para no romper

- Campos, validaciones y obligatoriedad salen del documento formal ("Solicitud Inicial
  Formulario FF" v1.0) — no inventar reglas nuevas sin confirmarlas ahí. **Excepción vigente:**
  los cuatro límites de longitud que el usuario pidió el 14-09-2026 (64 caracteres y número de
  cliente de 10 dígitos exactos) contradicen al documento y están pendientes de confirmación.
- **El listado de rubros es el desplegable REAL de MiCorreo, provisto por Correo
  Argentino.** No es una lista que este proyecto pueda inventar, agregar o editar por
  cuenta propia. Vive en `v3/data/fulfillment.content.ts` (`export const rubros`). Si hace
  falta cambiarlo, el pedido tiene que salir del área solicitante de Correo Argentino — no
  completarlo a criterio propio. Está documentado con esta misma advertencia en
  [documentation/07-FORMULARIO-FULFILLMENT.md#rubros](documentation/07-FORMULARIO-FULFILLMENT.md).
- El mensaje de confirmación de envío es un texto de trabajo, no aprobado por el área — está
  marcado como pendiente en la documentación.
- No hay backend: el formulario no envía nada de verdad. Los estados de "enviando" y "error de
  servidor" real no están implementados a propósito (dependen de que exista backend); el panel
  de casos de uso simula la **forma** del error de formulario, no su causa.

## Convenciones que hay que respetar

- **Push y commit sólo si el usuario lo pide explícitamente** ("subir a github" / "subir a
  git hub"). Nunca crear un repo remoto ni un proyecto de Vercel nuevo — el usuario ya tiene
  ambos conectados; sólo se hace push al existente cuando lo autoriza.
- Tokens por capas, no mezclar: `src/styles/tokens.css` (`:root`, primitivas de marca),
  `src/app/shell.tokens.css` (`[data-shell]`, chrome del Hub),
  `src/modules/prototype/prototype.tokens.css` (`[data-module='prototype']`, lenguaje visual de
  la landing) y `v3/fulfillment/fulfillment.tokens.css` (`[data-page='fulfillment-v3']`, el
  front propio de esa pantalla).
- Componentes compartidos en `v3/components/` (`OutlinedField`/`OutlinedSelect` con
  `variant="landing"|"form"`, `Button` con `size="md"|"lg"|"pill"` y la clase `.tertiary`) —
  reusarlos, no crear variantes nuevas de inputs o botones. La pantalla de Fulfillment los
  reutiliza aunque su diseño sea distinto, porque el diseño usa esos mismos controles.
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

1. Confirmar con el área los cuatro límites de longitud que contradicen al documento formal.
2. Confirmar si Poppins es definitiva o un borrador del diseño de la v3.
3. Optimizar `banner ff formulario.png`: pesa 4,7 MB. Y resolver la versión de 5,4 MB que
   apareció en disco.
4. Releer `.project/project.yaml` → `knowledge.open_questions` antes de tomar decisiones de
   producto nuevas: ahí está la lista viva de lo que falta definir.

## Índice rápido de documentación

| Archivo | Contenido |
|---|---|
| `documentation/00-INDICE.md` | Portada de la documentación |
| `documentation/01-CONTEXTO.md` | Requerimiento, alcance, hipótesis, pendientes |
| `documentation/02-FUENTES.md` | De dónde sale cada insumo |
| `documentation/03-COLOR-Y-TOKENS.md` | Sistema de color y tokens |
| `documentation/04-REPLICA-LANDING.md` | Cómo se reconstruyó la landing replicada |
| `documentation/05-REGISTRO-DE-CAMBIOS.md` | Qué se tomó/modificó de cada fuente externa |
| `documentation/06-ARQUITECTURA-Y-RUTAS.md` | Monorepo, rutas, aislamiento de estilos |
| `documentation/07-FORMULARIO-FULFILLMENT.md` | Spec funcional del formulario (campos, rubros, validaciones) |
| `documentation/08-PROPUESTA-V3.md` | Spec funcional de la propuesta vigente (pantalla propia de Fulfillment) |
| `.project/project.yaml` | Estado estructurado: fuentes, decisiones, módulos, pendientes |
