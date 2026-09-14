# Formulario FF — Documentación

Proyecto: **Formulario de contacto Fulfillment (Formulario FF)**
Producto: **MiCorreo — Correo Argentino**
Estado: una sola propuesta navegable, la **v3** — la landing replicada del original, con el
acceso a Fulfillment llevando a una pantalla de front propio que termina en el formulario de
contacto. Las versiones v1 (layout original con el formulario en una columna) y v2 (carrusel
de servicios) se retiraron del proyecto el 14-09-2026; su historia está en
[05-REGISTRO-DE-CAMBIOS.md](05-REGISTRO-DE-CAMBIOS.md).

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
| [08-PROPUESTA-V3.md](08-PROPUESTA-V3.md) | Versión 3, la propuesta vigente: la pantalla de Fulfillment con front propio, su hero, el formulario a dos columnas y los beneficios. |

## Módulos del proyecto

| Módulo | Ruta en la app | Código | Estado |
|---|---|---|---|
| Hub | `/` | `src/modules/hub/` | Vigente |
| Prototipo navegable | `/prototipo` | `src/modules/prototype/` | v3, única vigente · en revisión |
| Documentación | `/documentacion` | `src/modules/documentation/` + `documentation/` | Vigente |
| Presentación | — | `presentation/` | Vacío, sin tarjeta en el Hub |

Todo se sirve desde una sola URL. Ver [06-ARQUITECTURA-Y-RUTAS.md](06-ARQUITECTURA-Y-RUTAS.md).
