# Formulario FF — Documentación

Proyecto: **Formulario de contacto Fulfillment (Formulario FF)**
Producto: **MiCorreo — Correo Argentino**
Estado: tres versiones navegables de la landing — la v1 replica el layout original con el
acceso a Fulfillment incorporado; la v2 propone un carrusel de servicios; la v3 abre el flyer
del cliente en un visor. Las v1 y v2 llevan a la misma página con el formulario; la v3 no
tiene formulario.

## Documentos

| Documento | Qué contiene |
|---|---|
| [01-CONTEXTO.md](01-CONTEXTO.md) | Requerimiento inicial, alcance, hipótesis y pendientes. |
| [02-FUENTES.md](02-FUENTES.md) | Procedencia de cada insumo: proyecto de referencia, HTML de la landing, landing en producción. |
| [03-COLOR-Y-TOKENS.md](03-COLOR-Y-TOKENS.md) | Primitivas de color, capas de tokens y reglas de uso. |
| [04-REPLICA-LANDING.md](04-REPLICA-LANDING.md) | Cómo se reconstruyó la landing, medidas capturadas y diferencias conocidas. |
| [05-REGISTRO-DE-CAMBIOS.md](05-REGISTRO-DE-CAMBIOS.md) | Qué se tomó de cada fuente externa y qué se modificó al portarlo. |
| [06-ARQUITECTURA-Y-RUTAS.md](06-ARQUITECTURA-Y-RUTAS.md) | Cómo está armado el monorepo, el Hub y el mapa de rutas. |
| [07-FORMULARIO-FULFILLMENT.md](07-FORMULARIO-FULFILLMENT.md) | Campos, validaciones, estados y textos del formulario de contacto. |
| [08-PROPUESTA-V2.md](08-PROPUESTA-V2.md) | Versión 2: carrusel de servicios, modal de devolución y qué queda por validar. |
| [09-PROPUESTA-V3.md](09-PROPUESTA-V3.md) | Versión 3: el flyer del cliente en un visor a pantalla completa, con zoom y gestos. |

## Módulos del proyecto

| Módulo | Ruta en la app | Código | Estado |
|---|---|---|---|
| Hub | `/` | `src/modules/hub/` | Vigente |
| Prototipo navegable | `/prototipo` | `src/modules/prototype/` | v1 en revisión · v2 y v3 en borrador |
| Documentación | `/documentacion` | `src/modules/documentation/` + `documentation/` | Vigente |
| Presentación | — | `presentation/` | Vacío, sin tarjeta en el Hub |

Todo se sirve desde una sola URL. Ver [06-ARQUITECTURA-Y-RUTAS.md](06-ARQUITECTURA-Y-RUTAS.md).
