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

**Hipótesis a validar:** el campo *Número de cliente* aparece y pasa a ser obligatorio sólo
si la respuesta a "¿Ya sos cliente?" es Sí.

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

Se completó el **punto de partida**: una réplica de la landing actual, sin aplicar ningún
requerimiento. Ver [04-REPLICA-LANDING.md](04-REPLICA-LANDING.md).

## Próximos pasos sugeridos

1. Leer `Solicitud Inicial_Formulario FF_10092026.docx` para cerrar detalles del requerimiento.
2. Cerrar el pase responsive de la réplica (mobile difiere bastante del escritorio).
3. Definir arquitectura de información y jerarquía de la página Fulfillment **antes** de
   pasar a diseño visual.
4. Definir dónde y con qué formato entra el acceso a Fulfillment en la landing.
5. Armar el Hub que reúna prototipo, documentación y presentación bajo una sola URL.

## Pendientes de definición

Ubicación y formato del acceso Fulfillment; CTA principal; arquitectura de la página;
balance entre contenido y formulario; listado de rubros; validaciones por campo; copy final;
mensaje de confirmación; comportamiento ante errores; diseño responsive; eventos de
Analytics; alcance exacto de las mejoras de la landing; lineamientos visuales del cliente.
