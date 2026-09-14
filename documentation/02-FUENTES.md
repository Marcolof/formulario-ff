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
- **Qué se tomó:** el diseño de la página de Fulfillment (nodo `13217:34295`), hecho por el
  propio equipo del proyecto. Es la fuente de verdad visual de esa pantalla: de ahí salen su
  layout, sus textos y el tratamiento de los controles del formulario.
- Los íconos son del set Lucide de la librería "Design System" del mismo archivo.
- **Limitación actual:** el conector de Figma pide volver a autenticarse, así que hoy no se
  puede leer ni escribir en el archivo.

## 6. Imagen de referencia de la versión 2

- Captura del Figma del usuario, enviada por chat el 11/09/2026.
- **Qué se tomó:** el rediseño del bloque central de la v2 — panel navy, tarjeta con el ícono
  en columna propia, etiqueta en flujo, títulos sin reglas laterales, y el renombre y orden de
  los accesos rápidos.
- **Limitación:** la cuenta con la que se trabaja hoy no tiene acceso a ese archivo de Figma,
  así que las medidas se derivaron de la imagen y de los tokens existentes. Conviene
  contrastarlas al recuperar el acceso.

## 7. Flyer de Fulfillment

- **Archivo:** `src/assets/img/Fulfillment.jpeg`, provisto por el usuario el 14/09/2026.
  1010 × 1600 px, 285 KB.
- **Qué es:** la pieza gráfica de Fulfillment con la marca "Próximamente". Es todo el
  contenido de la versión 3: al tocar el acceso, es lo único que se muestra.
- Se usa tal cual, sin retocar. Dice "Gestión depedidos" donde debería decir "Gestión de
  pedidos" — está anotado en [09-PROPUESTA-V3.md](09-PROPUESTA-V3.md) para avisar al área que
  lo produjo.
