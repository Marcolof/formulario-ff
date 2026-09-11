# Formulario de contacto Fulfillment

Especificación funcional del formulario de captación de potenciales clientes de Fulfillment.
Es el núcleo del proyecto: todo lo demás de la página existe para llevar hasta acá.

**Ruta:** `/prototipo/v1/fulfillment` · **Implementación:**
[`ContactForm.tsx`](../src/modules/prototype/v1/fulfillment/ContactForm.tsx) · **Diseño:**
Figma "Mi Correo 2.0", nodo `13217:34295`, frame "Formulario".

Los controles no son propios de esta pantalla: el campo de texto y el desplegable son
[`OutlinedField` / `OutlinedSelect`](../src/modules/prototype/v1/components/OutlinedField.tsx)
y el botón es [`Button`](../src/modules/prototype/v1/components/Button.tsx), los mismos que
usa la landing. El formulario los usa en su variante del diseño de Figma:

- campos con `variant="form"`: borde `#d9d9d9`, radio 4, label gris oscuro `#474747`, y el
  desplegable con el chevron de Lucide;
- botón con `size="pill"`: el `rounded` M del Design System, 44px de alto, a ancho completo.

La tarjeta que los contiene es blanca, con radio 24 y una sombra suave
(`0 12px 32px rgba(21, 42, 105, 0.09)`).

Cada dato está marcado como **confirmado** (viene del documento formal de requerimiento),
**hipótesis** (decisión de diseño a validar) o **pendiente** (falta definición del área
solicitante). La sección [Fuentes](#fuentes) al final detalla de dónde sale cada versión del
requerimiento.

## Campos

| # | Campo (label en pantalla) | Obligatorio | Formato |
|---|---|---|---|
| 1 | Nombre de la empresa / Razón social | **No** | Máx. 40 caracteres, alfanumérico + `. - / & ´` |
| 2 | Nombre y apellido | Sí | Máx. 60 caracteres, sólo letras |
| 3 | Correo electrónico | Sí | Mismo formato que MiCorreo |
| 4 | Cod. área + Celular | Sí | Dos campos: código de área (2 a 4 dígitos) + celular (6 a 8 dígitos); la suma debe dar 10 dígitos |
| 5 | Rubro de la empresa | Sí | Desplegable (lista **pendiente** de relevar) + "Otros" con texto libre, máx. 30 caracteres |
| 6 | ¿Ya sos cliente de MiCorreo? | Sí | Sí / No |
| 7 | Número de cliente | **No** | Hasta 10 dígitos numéricos. Aparece sólo si responde "Sí" a la pregunta 6 |

Todos confirmados por el documento formal de requerimiento (`Solicitud Inicial_Formulario
FF`, v1.0). Antes de esa lectura, el prototipo tenía tres datos distintos: pedía "Nombre de
la empresa" como obligatorio, "Celular" como un solo campo libre, y "Número de cliente" como
obligatorio al responder "Sí" — los tres corregidos para reflejar el documento.

El label del código de área es "Cod. área" y no "Código de área": en un campo de 108px el
texto completo se partía en dos renglones. La abreviatura viene del diseño de Figma.

### Dependencia del campo 7

> ¿Ya sos cliente de MiCorreo?

- **No** → el campo *Número de cliente* no se muestra.
- **Sí** → el campo aparece, pero sigue sin ser obligatorio.

La visibilidad condicional está confirmada por el documento ("En caso de que seleccione 'Sí'
debe abrir un input..."). Que no sea obligatorio también está confirmado, por la lista
explícita de excepciones a la obligatoriedad general.

### Rubro "Otros"

Al elegir "Otros" se abre un campo de texto libre (máx. 30 caracteres, sólo letras) para que
la persona indique su rubro. El desplegable en sí debería ser "el mismo que en MiCorreo al
crear una nueva cuenta" — **pendiente**: no se relevó ese desplegable real, así que se
mantiene una lista de referencia con 9 rubros más "Otros".

### Fuera del alcance inicial

CUIT, plataforma de eCommerce y volumen estimado de envíos se mencionan en el documento como
datos que podrían evaluarse más adelante, pero **no forman parte de este requerimiento** y no
se incorporaron.

## Validaciones

| Campo | Regla | Mensaje |
|---|---|---|
| Nombre de la empresa | Si se completa: patrón válido | "Máximo 40 caracteres. Se admiten letras, números y . - / & ´" |
| Nombre y apellido | No vacío, patrón válido | "Ingresá tu nombre y apellido." / "Máximo 60 caracteres, sólo letras." |
| Correo electrónico | No vacío, formato `algo@dominio.ext` | "Ingresá tu mail." / "Revisá el formato del mail." |
| Cod. área | No vacío, 2 a 4 dígitos | "Ingresá el código de área." / "2 a 4 dígitos." |
| Celular | No vacío, 6 a 8 dígitos, suma con el código de área = 10 | "Ingresá tu celular." / "6 a 8 dígitos." / "Código de área + celular deben sumar 10 dígitos." |
| Rubro | Opción elegida | "Elegí el rubro de la empresa." |
| Rubro "Otros" | No vacío, patrón válido, sólo si se eligió "Otros" | "Ingresá el rubro." / "Máximo 30 caracteres, sólo letras." |
| ¿Ya sos cliente? | Opción elegida | "Indicá si ya sos cliente de MiCorreo." |
| Número de cliente | Si se completa: hasta 10 dígitos numéricos | "Hasta 10 dígitos numéricos." |

**Momento de validación.** No se valida mientras la persona completa por primera vez: recién
al apretar *Enviar* se muestran todos los errores juntos. A partir de ahí, cada campo se
revalida al editarlo, para que el error desaparezca apenas se corrige. Código de área,
celular y número de cliente filtran cualquier caracter que no sea dígito a medida que se
escribe.

## Estados

| Estado | Qué se ve |
|---|---|
| Inicial | Campos vacíos, sin errores. *Número de cliente* y *rubro "Otros"* ocultos. |
| Error de campo | Borde rojo, `aria-invalid`, mensaje debajo asociado por `aria-describedby`. |
| Enviado con éxito | La tarjeta se reemplaza por el mensaje de agradecimiento y un botón para cargar otra consulta. |

**Pendientes:** estado de *envío en progreso* (botón deshabilitado y feedback de carga) y
*error de servidor o conectividad*. No se implementaron porque el prototipo no tiene backend
y el comportamiento ante fallo todavía no está definido.

## Textos

En el orden en que aparecen en la tarjeta:

| Elemento | Texto |
|---|---|
| Título | Quiero empezar |
| Bajada | Completá tus datos y te ayudamos a encontrar la mejor opción. |
| Botón | Enviar |
| Aclaración (debajo del botón) | Tus datos están protegidos. |
| Confirmación (título) | ¡Gracias por contactarnos! |
| Confirmación (cuerpo) | Recibimos tus datos. Un asesor comercial de Correo Argentino se va a comunicar con vos a la brevedad. |

Título, bajada, botón y aclaración vienen del diseño de Figma.

**Pendiente confirmado por el documento formal:** "El texto definitivo deberá ser
definido/validado por el área solicitante" — el mensaje de confirmación sigue siendo una
propuesta de trabajo, no un texto aprobado. El diseño de Figma no incluye esa pantalla.

## Rubros

Lista de referencia, no la definitiva:

Indumentaria y calzado · Electrónica y tecnología · Hogar y muebles · Salud y belleza ·
Alimentos y bebidas · Deportes y aire libre · Juguetería y bebés · Librería y papelería ·
Automotor y repuestos · Otros

Vive en [`fulfillment.content.ts`](../src/modules/prototype/v1/data/fulfillment.content.ts).
Reemplazarla cuando se releve el desplegable real de rubros de MiCorreo.

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
- reporte semanal (frecuencia y destinatario son parametrizables, según el documento);
- eventos de Google Analytics — a definir con el área de Analytics/Marketing.

## Fuentes

- `contexto_inicial_formulario_fulfillment.md`: resumen informal, usado para el primer punto
  de partida del proyecto.
- **`Solicitud Inicial_Formulario FF_10092026.docx`** (Google Doc, v1.0, 10/09/2026): el
  documento formal del área de Marketing Digital. Es la fuente que definió los campos,
  validaciones y obligatoriedad de esta versión. De ahí salió también el flyer y un wireframe
  de tres pantallas, usados como referencia de contenido.
- **Figma "Mi Correo 2.0", nodo `13217:34295`**: el diseño visual de la página y del
  formulario. Es la fuente de los textos de la tarjeta, del orden de los elementos y del
  tratamiento visual de los controles.

El documento formal también fija un criterio de aceptación (URL pública propia para la página
de Fulfillment, preparada para UTM) y sugiere evaluar un acceso posterior a MiCorreo después
del envío. Son definiciones de arquitectura de entrega, no de este formulario, y quedan fuera
del alcance de este documento.
