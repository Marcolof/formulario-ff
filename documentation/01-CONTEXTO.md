# Contexto del proyecto

Fuente: `contexto_inicial_formulario_fulfillment.md` y `Solicitud Inicial — Formulario FF —
10/09/2026`. Este documento resume lo que está definido, lo que es hipótesis y lo que falta.

## Objetivo principal

Diseñar una **página de Fulfillment** dentro del ecosistema MiCorreo cuyo núcleo es un
formulario de contacto para captar potenciales clientes del servicio de Fulfillment.

La página debe: explicar el servicio de forma sintética, captar los datos, permitir el envío
y comunicar el resultado. Debe tener identidad y lógica propias, no ser sólo una extensión
visual de la landing.

## Objetivo secundario

Mejoras parciales sobre la landing actual de MiCorreo, sin rediseño integral:

- conservar el banner con panel de login;
- mejorar el acceso a Gestión de devoluciones;
- mejorar la jerarquía y descubribilidad de los accesos directos;
- incorporar un acceso hacia Fulfillment.

## Flujo esperado

```txt
Landing MiCorreo → acceso/CTA Fulfillment → página Fulfillment
→ información del servicio → formulario → envío → confirmación
```

La página debe admitir otros puntos de entrada en el futuro.

## Formulario — campos confirmados

- Nombre de la empresa
- Nombre y apellido
- Mail
- Celular
- Rubro de la empresa
- ¿Ya sos cliente de MiCorreo? (Sí / No)
- Número de cliente, cuando corresponda

**Confirmado por el documento formal:** el campo *Número de cliente* aparece sólo si la
respuesta a "¿Ya sos cliente?" es Sí, y aun así **no** es obligatorio. Los campos, formatos y
validaciones definitivos están en [07-FORMULARIO-FULFILLMENT.md](07-FORMULARIO-FULFILLMENT.md).

**Fuera del alcance inicial:** CUIT, plataforma de eCommerce, volumen estimado de envíos.
No incorporarlos sin validación del área solicitante.

## Después del envío

Confirmación en pantalla, almacenamiento en base de datos, reporte semanal y seguimiento por
Google Analytics. Desde UX hay que contemplar validaciones, errores de campo, envío en
progreso, envío exitoso y errores de servidor o conectividad.

## Ambigüedad registrada

El documento del cliente dice que no se creará una landing independiente, pero pide una
página de destino específica. **Interpretación de trabajo:** no se crea una landing
institucional paralela; sí una página de Fulfillment dentro del ecosistema MiCorreo. Queda
por confirmar.

## Estado actual

El punto de partida —la réplica de la landing, ver
[04-REPLICA-LANDING.md](04-REPLICA-LANDING.md)— ya está terminado, y sobre él hay **tres
propuestas de acceso a Fulfillment**, navegables y comparables entre sí:

| Versión | Qué propone | Documento |
|---|---|---|
| v1 | Layout original + tarjeta de Fulfillment en "Conocé nuestros servicios" y la página con el formulario | [04-REPLICA-LANDING.md](04-REPLICA-LANDING.md) · [07](07-FORMULARIO-FULFILLMENT.md) |
| v2 | El bloque central pasa a un carrusel de servicios en panel navy, con Fulfillment destacado; la devolución va a un modal | [08-PROPUESTA-V2.md](08-PROPUESTA-V2.md) |
| v3 | Landing igual a la v1; el acceso abre el flyer del cliente en un visor. **No tiene formulario** | [09-PROPUESTA-V3.md](09-PROPUESTA-V3.md) |

La página de Fulfillment con el formulario es una sola y la comparten la v1 y la v2.

## Próximos pasos sugeridos

1. **Elegir cuál de las tres versiones se adopta.** Ojo con la v3: al no tener formulario, por
   sí sola no cumple el objetivo principal de captar contactos.
2. Validar con el área los textos breves, el orden y el destacado de las tarjetas del carrusel
   de la v2, marcados como hipótesis en el documento 08.
3. Validar el texto del mensaje de confirmación del formulario, que hoy es una propuesta de
   trabajo.
4. Definir qué pasa después del envío del lado del negocio: base de datos, reporte semanal y
   eventos de Analytics.

## Pendientes de definición

Cuál de las tres propuestas se adopta; si Fulfillment se comunica sólo como pieza informativa
o tiene que captar contactos; CTA principal; copy final; mensaje de confirmación;
comportamiento ante errores de servidor; eventos de Analytics; alcance exacto de las mejoras
de la landing.

Ya están definidos: el listado de rubros —ver
[07-FORMULARIO-FULFILLMENT.md](07-FORMULARIO-FULFILLMENT.md#rubros)—, los campos y sus
validaciones, y el responsive de la réplica.
