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

## Ambigüedad resuelta (14/09/2026)

Durante un tiempo quedó como duda si se creaba o no una landing independiente. **El documento
de Propuesta (v1.2) lo resuelve:** sí es una página con URL propia.

> **Criterio de aceptación principal:** La página de destino […] deberá contar con una URL
> pública, absoluta y de acceso directo.
> **Objetivo de negocio:** Garantizar que esta nueva pantalla no dependa exclusivamente del
> flujo de la Landing de MiCorreo, permitiendo que funcione como una landing page
> independiente para captar leads desde múltiples orígenes.

La URL definida es **`micorreo.correoargentino.com.ar/FF`**, y debe soportar parámetros UTM
para que Analytics identifique el origen del tráfico (campañas de Google Ads y redes, banners
en el sitio institucional, Email Marketing). La solución queda además **desacoplada del
dominio de usuarios de MiCorreo**, porque son potenciales clientes que no necesariamente
tienen cuenta.

En el prototipo la pantalla vive en `/prototipo/v3/fulfillment` por la estructura de módulos
de esta maqueta; la ruta final de producción es `/FF`.

## Estado actual

El punto de partida —la réplica de la landing, ver
[04-REPLICA-LANDING.md](04-REPLICA-LANDING.md)— ya está terminado, y sobre él queda **una
sola propuesta de acceso a Fulfillment**:

| Versión | Qué propone | Documento |
|---|---|---|
| v3 | La landing replicada; el acceso lleva a una pantalla de Fulfillment con front propio, que termina en el formulario de contacto | [08-PROPUESTA-V3.md](08-PROPUESTA-V3.md) · [07](07-FORMULARIO-FULFILLMENT.md) |

El 14-09-2026 se retiraron las otras dos propuestas, por decisión del usuario y con copia de
seguridad previa: la **v1** (layout original con el formulario en una columna) y la **v2**
(carrusel de servicios en panel navy con la devolución en un modal). Lo que aportaron y por
qué se fueron está en [05-REGISTRO-DE-CAMBIOS.md](05-REGISTRO-DE-CAMBIOS.md).

## Próximos pasos sugeridos

1. Validar el texto del mensaje de confirmación del formulario, que hoy es una propuesta de
   trabajo.
2. Definir qué pasa después del envío del lado del negocio: base de datos, reporte semanal y
   eventos de Analytics.
3. Resolver los límites de longitud que hoy contradicen al documento formal — ver
   [07-FORMULARIO-FULFILLMENT.md](07-FORMULARIO-FULFILLMENT.md).

## Requisitos del documento que no son de UX

Los siguientes puntos del requerimiento **van a existir**: no están descartados ni
postergados. Simplemente no son tema de este rol, así que este proyecto no los diseña ni los
documenta.

- **Google reCAPTCHA.** El documento (v1.2) pide reutilizar "el mecanismo de Google reCAPTCHA
  actualmente utilizado en la plataforma" para proteger el formulario de accesos
  automatizados. Lo resuelve **desarrollo**. Es el mismo criterio con el que la réplica de la
  landing no porta GTM, Meta Pixel ni el chat de terceros.
- **URL `/FF`, base de datos, reporte semanal y eventos de Analytics.** Requisitos de entrega
  y de backend, no de la pantalla.

Lo que sí es de UX y ya está resuelto: el **aviso sobre el almacenamiento de datos** que pide
el mismo párrafo del documento — el texto debajo del botón "Enviar".

## Pendientes de definición

Si Fulfillment se comunica sólo como pieza informativa o tiene que captar contactos; CTA
principal; copy final; mensaje de confirmación; comportamiento ante errores de servidor;
eventos de Analytics; alcance exacto de las mejoras de la landing.

Ya están definidos: el listado de rubros —ver
[07-FORMULARIO-FULFILLMENT.md](07-FORMULARIO-FULFILLMENT.md#rubros)—, los campos y sus
validaciones, y el responsive de la réplica.
