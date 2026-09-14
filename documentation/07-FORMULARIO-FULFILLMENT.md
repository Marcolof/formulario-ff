# Formulario de contacto Fulfillment

Especificación funcional del formulario de captación de potenciales clientes de Fulfillment.
Es el núcleo del proyecto: todo lo demás de la página existe para llevar hasta acá.

**Ruta:** `/prototipo/v3/fulfillment` · **Marcado:**
[`FulfillmentForm.tsx`](../src/modules/prototype/v3/fulfillment/FulfillmentForm.tsx) ·
**Reglas:** [`useContactForm.ts`](../src/modules/prototype/v3/fulfillment/useContactForm.ts) ·
**Diseño:** Figma "Mi Correo 2.0", nodo `13284:7345` (el formulario a dos columnas); el nodo
`13217:34295` fue el diseño de la versión en una columna, retirada el 14-09-2026.

Los controles no son propios de esta pantalla: el campo de texto y el desplegable son
[`OutlinedField` / `OutlinedSelect`](../src/modules/prototype/v3/components/OutlinedField.tsx)
y el botón es [`Button`](../src/modules/prototype/v3/components/Button.tsx), los mismos que
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
| 1 | Nombre de la empresa / Razón social | **No** | Máx. 64 caracteres, alfanumérico + `. - / & ´` |
| 2 | Nombre y apellido | Sí | Máx. 64 caracteres, sólo letras |
| 3 | Correo electrónico | Sí | Máx. 64 caracteres, mismo formato que MiCorreo |
| 4 | Rubro de la empresa | Sí | Desplegable (22 rubros + "Otros" con texto libre, máx. 30 caracteres) |
| 5 | Cod. área + Celular | Sí | Dos campos: código de área (2 a 4 dígitos) + celular (6 a 8 dígitos); la suma debe dar 10 dígitos |
| 6 | ¿Ya sos cliente de MiCorreo? | Sí | Sí / No |
| 7 | Número de cliente | **No** | Exactamente 10 dígitos numéricos. Aparece sólo si responde "Sí" a la pregunta 6 |

Los campos y su obligatoriedad están confirmados por el documento formal de requerimiento
(`Solicitud Inicial_Formulario FF`, v1.0). Antes de esa lectura, el prototipo tenía tres datos
distintos: pedía "Nombre de la empresa" como obligatorio, "Celular" como un solo campo libre,
y "Número de cliente" como obligatorio al responder "Sí" — los tres corregidos para reflejar
el documento.

### Los límites de longitud, resueltos (14-09-2026)

Durante unas horas los topes estuvieron en 64/64/64 y el número de cliente en 10 dígitos
exactos, por un pedido del usuario. Al verificar contra la fuente se confirmó que **esos
valores contradecían al documento**, y el usuario resolvió **dejarlos como dice el
documento**. Hoy no hay ninguna divergencia abierta en este punto.

| Campo | Documento | Estuvo en | **Vigente** |
|---|---|---|---|
| Razón social | hasta 40 | 64 | **40** |
| Nombre y apellido | hasta 60 | 64 | **60** |
| Correo electrónico | sin tope, sólo formato | 64 | **sin tope** |
| Número de cliente | "hasta" 10 dígitos | exactamente 10 | **hasta 10** |

El mail es el único campo sin tope de largo: el documento sólo pide validar el formato, con
"el mismo comportamiento que MiCorreo". Si MiCorreo impone un máximo, hay que traerlo de ahí
en vez de inventar uno.

**La fuente, textualmente:**

> Nombre de la empresa / Razón social: **hasta 40 caracteres** alfanumérico, debe permitir
> símbolos: ".", "-", "/", "&", "´"
> Nombre y apellido: **hasta 60 caracteres** alfabéticos
> Mail: debe validar que el formato sea correcto. Mismo comportamiento que MiCorreo
> […] número de cliente usuario (ID), **hasta 10 dígitos numéricos como máximo**
> Todos los campos deben ser obligatorios, **a excepción de Razón Social y n° de cliente**

**El resto de las reglas también coincide** con el documento: los símbolos permitidos en razón
social, "sólo letras" en nombre, el código de área de 2 a 4 dígitos y el celular de 6 a 8 que
deben sumar 10, el rubro tomado del desplegable real de MiCorreo, el tope de 30 caracteres de
"Otros", y que Razón Social y Número de cliente sean los dos únicos campos no obligatorios.
**Hoy el formulario no se aparta del documento en ningún punto.**

El label del código de área es "Cod. área" y no "Código de área": en un campo de 108px el
texto completo se partía en dos renglones. La abreviatura viene del diseño de Figma.

**Orden de los campos (14/09/2026):** el rubro pasó a ir donde estaba el teléfono. Es un
cambio de orden en pantalla, no de reglas: la obligatoriedad y las validaciones de cada campo
son las mismas de siempre. *Número de cliente* aparece debajo de la pregunta que lo habilita,
no arriba entre el resto de los campos.

### Dependencia del campo 7

> ¿Ya sos cliente de MiCorreo?

- **No** → el campo *Número de cliente* no se muestra.
- **Sí** → el campo aparece, pero sigue sin ser obligatorio.

La visibilidad condicional está confirmada por el documento ("En caso de que seleccione 'Sí'
debe abrir un input..."). Que no sea obligatorio también está confirmado, por la lista
explícita de excepciones a la obligatoriedad general.

### Rubro "Otros"

Al elegir "Otros" se abre un campo de texto libre (máx. 30 caracteres, sólo letras) para que
la persona indique su rubro. El resto del desplegable es el listado que se detalla en
[Rubros](#rubros) más abajo.

### Fuera del alcance inicial

CUIT, plataforma de eCommerce y volumen estimado de envíos se mencionan en el documento como
datos que podrían evaluarse más adelante, pero **no forman parte de este requerimiento** y no
se incorporaron.

## Validaciones

| Campo | Regla | Mensaje |
|---|---|---|
| Nombre de la empresa | Si se completa: patrón válido | "Máximo 64 caracteres. Se admiten letras, números y . - / & ´" |
| Nombre y apellido | No vacío, patrón válido | "Ingresá tu nombre y apellido." / "Máximo 64 caracteres, sólo letras." |
| Correo electrónico | No vacío, máx. 64, formato `algo@dominio.ext` | "Ingresá tu mail." / "Máximo 64 caracteres." / "Revisá el formato del mail." |
| Cod. área | No vacío, 2 a 4 dígitos | "Ingresá el código de área." / "2 a 4 dígitos." |
| Celular | No vacío, 6 a 8 dígitos, suma con el código de área = 10 | "Ingresá tu celular." / "6 a 8 dígitos." / "Código de área + celular deben sumar 10 dígitos." |
| Rubro | Opción elegida | "Elegí el rubro de la empresa." |
| Rubro "Otros" | No vacío, patrón válido, sólo si se eligió "Otros" | "Ingresá el rubro." / "Máximo 30 caracteres, sólo letras." |
| ¿Ya sos cliente? | Opción elegida | "Indicá si ya sos cliente de MiCorreo." |
| Número de cliente | Si se completa: exactamente 10 dígitos numéricos | "Son 10 dígitos numéricos." |

**Momento de validación.** No se valida mientras la persona completa por primera vez: recién
al apretar *Enviar* se muestran todos los errores juntos. A partir de ahí, cada campo se
revalida al editarlo, para que el error desaparezca apenas se corrige. Código de área,
celular y número de cliente filtran cualquier caracter que no sea dígito a medida que se
escribe.

**Límite duro además del mensaje.** Los topes de longitud también van como `maxLength` en el
campo, así que no se puede escribir de más: el mensaje de error queda como red de seguridad
(pegar texto, autocompletado). Los valores salen de `useContactForm.ts` —`TEXTO_MAX`,
`RUBRO_OTRO_MAX`, `NUMERO_CLIENTE_LARGO`—, no escritos a mano en el marcado.

## Estados

| Estado | Qué se ve |
|---|---|
| Inicial | Campos vacíos, sin errores. *Número de cliente* y *rubro "Otros"* ocultos. |
| Error de campo | Borde rojo, `aria-invalid`, mensaje debajo asociado por `aria-describedby`. |
| Enviado con éxito | La tarjeta se reemplaza por el mensaje de agradecimiento y un botón para cargar otra consulta. |
| Error de formulario (simulado) | Además de los errores de campo, un mensaje general sobre el botón: "No pudimos procesar tu solicitud. Revisá los datos e intentá nuevamente." |

**Casos de uso simulables.** El botón flotante del prototipo abre un panel de tweaks con un
chip por caso: *Happy path* (comportamiento real) y *Error de formulario* (el envío nunca
prospera, y el error aparece **después** de pulsar *Enviar*, no antes). Sirve para mostrar el
estado de error sin tener que romper los datos a mano. El caso no cambia ninguna regla de
validación: sólo bloquea el envío y agrega el mensaje general. Ver
[06-ARQUITECTURA-Y-RUTAS.md](06-ARQUITECTURA-Y-RUTAS.md#chrome-del-prototipo).

**Pendientes:** estado de *envío en progreso* (botón deshabilitado y feedback de carga) y
*error de servidor o conectividad* real. No se implementaron porque el prototipo no tiene
backend; el caso simulado de arriba muestra la forma del error, no su causa.

## Textos

En el orden en que aparecen en la tarjeta:

| Elemento | Texto |
|---|---|
| Título | Quiero empezar |
| Bajada | Completá tus datos y te ayudamos a encontrar la mejor opción. |
| Botón | Enviar |
| Aclaración (debajo del botón) | La información ingresada será almacenada únicamente para gestionar tu solicitud y poder contactarte. |
| Confirmación (título) | ¡Gracias por contactarnos! |
| Confirmación (cuerpo) | Recibimos tus datos. Un asesor comercial se va a comunicar con vos a la brevedad. |

Título, bajada y botón vienen del diseño de Figma. La aclaración se reemplazó el 14/09/2026
(pedido del usuario): el texto de Figma ("Tus datos están protegidos.") era genérico y pasó a
uno que explica para qué se usan los datos.

**Pendiente confirmado por el documento formal:** "El texto definitivo deberá ser
definido/validado por el área solicitante" — el mensaje de confirmación sigue siendo una
propuesta de trabajo, no un texto aprobado. El diseño de Figma no incluye esa pantalla.

## Rubros

Alimentos y Bebidas · Arte y Música · Bazar y Cocina · Bebes · Belleza y Perfumería ·
Botánica · Centros Comerciales y Supermercados · Deco y Hogar · Deportes ·
Electrodomésticos · Ferretería y Construcción · Indumentaria, Calzado y Accesorios ·
Industrias y Oficinas · Juguetería y Librería · Limpieza · Mascotas · Salud · SexShop ·
Tabaquería · Tecnología e Informática · Textil · Vehículos y Accesorios · Otros
(espacio a completar por el usuario)

Vive en [`fulfillment.content.ts`](../src/modules/prototype/v3/data/fulfillment.content.ts).

**Importante — origen del listado.** Éste es el desplegable real que usa MiCorreo al crear
una nueva cuenta, provisto por Correo Argentino. **No es un listado que este proyecto pueda
inventar ni editar por su cuenta:** cualquier alta, baja o cambio de nombre de un rubro tiene
que salir de Correo Argentino. Si en algún momento hace falta modificar esta lista, hay que
pedir la actualización al área solicitante — no completarla a criterio propio.

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
- **`Propuesta Inicial_Formulario FF_10092026.docx`** (v1.2, 14/09/2026, Marcela Demichelis y
  Marco Loforte): **la fuente real de los campos, formatos, longitudes y obligatoriedad.**
  Su punto "3. Datos a solicitar en el formulario" es el que fija cada regla, y su capítulo
  "Flujo Funcional" describe el recorrido pantalla por pantalla. Incluye además el flyer y el
  wireframe de baja fidelidad.
- `Solicitud Inicial_Formulario FF_10092026.docx` (v1.0, 10/09/2026, Agustina Gualco): la
  solicitud original del área. **No contiene longitudes ni formatos** — sólo la lista de
  campos y el comportamiento esperado. Durante un tiempo esta documentación le atribuyó a
  este archivo las reglas de detalle; el 14-09-2026 se verificó que vienen del documento de
  *Propuesta*, y se corrigió la cita.
- **Figma "Mi Correo 2.0", nodo `13217:34295`**: el diseño visual de la página y del
  formulario. Es la fuente de los textos de la tarjeta, del orden de los elementos y del
  tratamiento visual de los controles.
- **Listado de rubros**: provisto directamente por el usuario del proyecto como el
  desplegable real de MiCorreo, en reemplazo del listado de referencia que se usaba antes.
  Ver la nota de origen en [Rubros](#rubros).

El documento formal también fija un criterio de aceptación (URL pública propia para la página
de Fulfillment, preparada para UTM) y sugiere evaluar un acceso posterior a MiCorreo después
del envío. Son definiciones de arquitectura de entrega, no de este formulario, y quedan fuera
del alcance de este documento.
