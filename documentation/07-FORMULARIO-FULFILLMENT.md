# Formulario de contacto Fulfillment

Especificación funcional del formulario de captación de potenciales clientes de Fulfillment.
Es el núcleo del proyecto: todo lo demás de la página existe para llevar hasta acá.

**Ruta:** `/prototipo/v1/fulfillment` · **Implementación:**
[`ContactForm.tsx`](../src/modules/prototype/v1/fulfillment/ContactForm.tsx)

Los controles no son propios de esta pantalla: el campo de texto y el desplegable son
[`OutlinedField` / `OutlinedSelect`](../src/modules/prototype/v1/components/OutlinedField.tsx)
y el botón es [`Button`](../src/modules/prototype/v1/components/Button.tsx), los mismos que
usa la landing. La tarjeta que los contiene usa la superficie y el radio de las tarjetas de
"Accesos directos".

Cada dato está marcado como **confirmado** (viene del requerimiento), **hipótesis** (decisión
de diseño a validar) o **pendiente** (falta definición del área solicitante).

## Campos

| # | Campo | Tipo | Obligatorio | Origen |
|---|---|---|---|---|
| 1 | Nombre de la empresa | Texto | Sí | Confirmado |
| 2 | Nombre y apellido | Texto | Sí | Confirmado |
| 3 | Mail | Email | Sí | Confirmado |
| 4 | Celular | Teléfono | Sí | Confirmado |
| 5 | Rubro de la empresa | Selección | Sí | Confirmado (lista **pendiente**) |
| 6 | ¿Ya sos cliente de MiCorreo? | Sí / No | Sí | Confirmado |
| 7 | Número de cliente | Texto | Condicional | Confirmado, con dependencia **hipótesis** |

El wireframe marca cada campo con asterisco, pero al ser todos obligatorios el asterisco no
distingue nada. La pantalla usa el campo outlined del sistema, que lleva el nombre del campo
como label flotante y no admite el asterisco sin romper ese patrón. **Pendiente de
definición:** si hace falta indicar la obligatoriedad de forma explícita, lo natural sería
una aclaración única arriba del formulario.

### Dependencia del campo 7

> ¿Ya sos cliente de MiCorreo?

- **No** → el campo *Número de cliente* no se muestra ni se pide.
- **Sí** → el campo aparece y pasa a ser obligatorio.

**Hipótesis.** El wireframe entregado muestra el campo siempre visible; el documento de
requerimiento describe la dependencia. Se implementó la dependencia porque reduce fricción
para quien todavía no es cliente, que es justamente el público que el formulario busca
captar. **Falta confirmarlo con el área solicitante.**

### Fuera del alcance inicial

CUIT, plataforma de eCommerce y volumen estimado de envíos se mencionan en el documento del
cliente como posibles, pero **no forman parte del requerimiento** y no se incorporaron.

## Validaciones

| Campo | Regla | Mensaje |
|---|---|---|
| Nombre de la empresa | No vacío | "Ingresá el nombre de la empresa." |
| Nombre y apellido | No vacío | "Ingresá tu nombre y apellido." |
| Mail | No vacío | "Ingresá tu mail." |
| Mail | Formato `algo@dominio.ext` | "Revisá el formato del mail." |
| Celular | No vacío | "Ingresá tu celular." |
| Celular | 8 a 20 caracteres, dígitos y `+ - ( )` | "Ingresá un celular válido." |
| Rubro | Opción elegida | "Elegí el rubro de la empresa." |
| ¿Ya sos cliente? | Opción elegida | "Indicá si ya sos cliente de MiCorreo." |
| Número de cliente | No vacío **si** respondió Sí | "Ingresá tu número de cliente." |

**Momento de validación.** No se valida mientras la persona completa por primera vez: recién
al apretar *Enviar* se muestran todos los errores juntos. A partir de ahí, cada campo se
revalida al editarlo, para que el error desaparezca apenas se corrige.

**Pendiente:** reglas de formato definitivas de celular (¿se pide característica?, ¿se acepta
el 15?) y si el número de cliente tiene un largo o formato fijo.

## Estados

| Estado | Qué se ve |
|---|---|
| Inicial | Campos vacíos, sin errores. *Número de cliente* oculto. |
| Error de campo | Borde rojo, `aria-invalid`, mensaje debajo asociado por `aria-describedby`. |
| Enviado con éxito | La tarjeta se reemplaza por el mensaje de agradecimiento y un botón para cargar otra consulta. |

**Pendientes:** estado de *envío en progreso* (botón deshabilitado y feedback de carga) y
*error de servidor o conectividad*. No se implementaron porque el prototipo no tiene backend
y el comportamiento ante fallo todavía no está definido.

## Textos

| Elemento | Texto |
|---|---|
| Título | Completá el formulario |
| Aclaración | Tus datos están seguros |
| Botón | Enviar |
| Confirmación (título) | ¡Gracias por contactarnos! |
| Confirmación (cuerpo) | Recibimos tus datos. Un asesor comercial de Correo Argentino se va a comunicar con vos a la brevedad. |

**Pendiente:** el copy final, incluido el mensaje de confirmación, no está aprobado. El texto
de confirmación es una propuesta: dice qué pasó y qué va a pasar después, sin prometer plazos
que nadie confirmó.

## Rubros

Lista **provisoria**, definida para poder probar el campo:

Indumentaria y calzado · Electrónica y tecnología · Hogar y muebles · Salud y belleza ·
Alimentos y bebidas · Deportes y aire libre · Juguetería y bebés · Librería y papelería ·
Automotor y repuestos · Otro

Vive en [`fulfillment.content.ts`](../src/modules/prototype/v1/data/fulfillment.content.ts).
Reemplazarla cuando el área solicitante entregue la definitiva.

## Accesibilidad

- Cada campo tiene `<label>` asociado por `for`/`id`, que flota al borde superior al escribir
  en vez de desaparecer: el nombre del campo sigue visible con el campo completo.
- Los errores se anuncian con `aria-invalid` y se vinculan con `aria-describedby`.
- El par Sí/No va dentro de un `<fieldset>` con `<legend>`, para que se lea como una sola
  pregunta.
- El error no depende sólo del color: siempre hay texto.

**Pendiente de prueba:** recorrido completo con lector de pantalla y foco visible en cada
control.

## Qué falta del lado del negocio

Del requerimiento, todavía sin resolver en el prototipo porque no hay backend:

- almacenamiento de los datos en base;
- reporte semanal;
- eventos de Google Analytics — falta definir cuáles y en qué momento del recorrido.
