# Formulario FF — Documentación

Proyecto: **Formulario de contacto Fulfillment (Formulario FF)**
Producto: **MiCorreo — Correo Argentino**
Estado: réplica de la landing terminada, con el acceso a Fulfillment y la página del
formulario incorporados sobre el diseño actual.

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

## Módulos del proyecto

| Módulo | Ruta en la app | Código | Estado |
|---|---|---|---|
| Hub | `/` | `src/modules/hub/` | Vigente |
| Prototipo navegable | `/prototipo` | `src/modules/prototype/` | Réplica de la landing, en revisión |
| Documentación | `/documentacion` | `src/modules/documentation/` + `documentation/` | Vigente |
| Presentación | — | `presentation/` | Vacío, sin tarjeta en el Hub |

Todo se sirve desde una sola URL. Ver [06-ARQUITECTURA-Y-RUTAS.md](06-ARQUITECTURA-Y-RUTAS.md).
