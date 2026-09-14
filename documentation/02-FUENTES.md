# Fuentes del proyecto

Ninguna de estas fuentes se modifica. Todo lo que se usa se copió a este proyecto y se
registra acá con su procedencia.

## 1. Proyecto de referencia — maqueta de Paquetería Internacional

- **Ruta (sólo lectura):** `C:\MLOF 01\VORTEX\CORREO ARGENTINO\Envios internacionales\Envio internacional CLAUDE`
- **Qué es:** maqueta React + TypeScript + Vite de MiCorreo (flujo de envío internacional),
  con un sistema de tokens en tres capas ya documentado.
- **Qué se tomó:**
  - `src/styles/tokens.css` y `src/styles/globals.css` → copiados sin cambios a
    `src/styles/`.
  - Las seis variantes de Gilroy (`.ttf`) → `src/assets/fonts/`.
  - La convención de estructura: `src/app`, `src/modules/<módulo>/components`,
    CSS Modules por componente, alias `@/`.
- **Qué NO se tomó:** componentes de `shared/ui`, lógica de escenarios, feature flags,
  router ni módulos de negocio. La landing no los necesita.

## 2. HTML de referencia de la landing

- **Ruta (sólo lectura):** `C:\MLOF 01\VORTEX\CORREO ARGENTINO\Formulario FF\html reference`
- **Qué es:** la landing de MiCorreo guardada desde el navegador ("Página web completa").
- **Copia local:** `reference/landing-original.html`, fuera del build. Sólo el HTML, para
  verificar la jerarquía del DOM, los textos y los enlaces. Los assets que usa la réplica ya
  viven en `src/assets/`; el resto queda en el original de sólo lectura.
- **Qué se tomó:** todos los assets (banners, logos, íconos de accesos directos, íconos
  sociales, botón del chatbot) → `src/assets/`. La estructura del DOM, como guía
  de jerarquía y textos.
- **Limitación importante:** el HTML guardado **no conserva los estilos**. La landing usa
  MUI + emotion, que inyecta el CSS por JavaScript en tiempo de ejecución; los `<style>`
  del archivo guardado quedaron vacíos y el chunk `landing-template-*.js` no se guardó.
  Por eso los estilos no salieron de este archivo.

## 3. Landing en producción

- **URL:** `https://micorreo.correoargentino.com.ar/landing`
- **Fecha de captura:** 2026-09-10, viewport 1440×900.
- **Qué se tomó:** los estilos computados reales de cada elemento (medidas, colores,
  tipografía, radios, sombras, orden de apilado). Es la fuente de verdad de la réplica.
- Es una consulta de sólo lectura sobre una página pública. No se modificó nada.

## 4. Documento del cliente

- **`Solicitud Inicial_Formulario FF_10092026.docx`** (v1.0, un nivel por encima de la
  carpeta de trabajo; también como Google Doc, sólo lectura). Es el requerimiento formal del
  área de Marketing Digital. **Ya fue leído**: de ahí salieron los campos del formulario, sus
  formatos, la obligatoriedad y las validaciones — ver
  [07-FORMULARIO-FULFILLMENT.md](07-FORMULARIO-FULFILLMENT.md). Incluye además un flyer y un
  wireframe de tres pantallas, usados como referencia de contenido.
- `contexto_inicial_formulario_fulfillment.md` — resumen informal previo, ya incorporado
  en [01-CONTEXTO.md](01-CONTEXTO.md).

## 5. Figma — "Mi Correo 2.0"

- **Archivo:** `wN6vAlF1TgGc2AJdJJvsAU`, página "GDD-2735 - Formulario FF (Fulfillment)".
- **Qué se tomó:**
  - **Nodo `13284:7345`** — la pantalla de Fulfillment vigente, un front propio dibujado a
    1010px de ancho. De ahí salen su estructura, sus colores, su tipografía y el nombre de
    cada ícono. Ver [08-PROPUESTA-V3.md](08-PROPUESTA-V3.md).
  - **Nodo `13217:34295`** — la página de Fulfillment de las versiones 1 y 2, retiradas el
    14-09-2026. De ahí salieron los textos de la tarjeta del formulario y el tratamiento de
    los controles, que siguen vigentes; su layout en una columna ya no se usa.
- Los íconos son del set Lucide de la librería "Design System" del mismo archivo: el diseño
  nombra cada capa con el nombre del ícono de Lucide, así que la correspondencia es directa.

## 6. Imagen de referencia de la versión 2 — retirada

- Captura del Figma del usuario, enviada por chat el 11/09/2026.
- Alimentó el rediseño del bloque central de la v2 (panel navy, carrusel de servicios). Esa
  versión se retiró del proyecto el 14-09-2026, así que **esta fuente ya no tiene consumidor**.
  Queda anotada para no volver a buscarla si la propuesta se retoma.
- **Limitación registrada entonces:** la cuenta con la que se trabaja no tiene acceso a ese
  archivo de Figma, así que las medidas se derivaron de la imagen y de los tokens existentes.

## 7. Imágenes de Fulfillment

Las dos las entregó el usuario el 14/09/2026 y viven en `src/assets/img/`.

- **`banner ff formulario.png`** — es la imagen del hero de la pantalla de Fulfillment. Se usa
  tal cual; **conviene optimizarla** antes de cualquier publicación real, porque para una web
  es muy pesada. El archivo cambió en disco el 14-09-2026 (de 4,7 MB a 5,4 MB) fuera de la
  sesión de trabajo; el usuario confirmó que el reemplazo es intencional y esa versión ya está
  commiteada.
- **`Fulfillment.jpeg`** — 1010 × 1600 px, 285 KB. El flyer completo del servicio, con la
  marca "Próximamente". Lo usaba la primera propuesta de la v3, que quedó descartada, así que
  hoy **ningún front lo referencia**. Se conserva por si se necesita más adelante. Dice
  "Gestión depedidos" donde debería decir "Gestión de pedidos".
