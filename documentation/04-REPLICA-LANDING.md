# Versión 1 — la landing de MiCorreo con Fulfillment

La v1 tiene dos capas, y conviene no confundirlas:

1. **La réplica**, medida contra la landing en producción y verificada sección por sección.
   Es la referencia contra la que se compara cualquier propuesta posterior.
2. **Lo que agrega el requerimiento**, resuelto con el lenguaje visual existente y sin tocar
   el layout de lo replicado:
   - una sexta tarjeta de producto, **Fulfillment**, en "Conocé nuestros servicios";
   - la **página de Fulfillment** con el formulario de contacto, en `/prototipo/v1/fulfillment`.

Todo lo que se agrega usa el diseño actual de MiCorreo. La propuesta de un front distinto es
la v2 y todavía no existe.

## Por qué hay versiones

El módulo Prototipo navegable guarda más de una versión de la misma página:

| Versión | Qué es | Estado |
|---|---|---|
| **v1 — layout original** | La landing de producción replicada, más el acceso y la página de Fulfillment resueltos con el diseño actual. | Vigente |
| **v2 — propuesta** | Otro front sobre el mismo lenguaje visual: consume los tokens, globales y componentes del módulo, con la jerarquía que se defina para el Formulario FF. | Todavía no existe |

La v1 no se modifica para probar ideas. Toda propuesta va a una versión nueva, así que
siempre queda un original contra el que medir el cambio.

## Cómo se obtuvieron los estilos

El HTML guardado de la landing no sirve como fuente de estilos: la página usa MUI + emotion,
que inyecta el CSS por JavaScript, y el archivo guardado conserva los `<style>` vacíos y sin
el chunk `landing-template-*.js`. Se confirmó levantándolo en local: el DOM aparece, los
estilos no.

Los valores salieron de abrir la landing en producción y leer los **estilos computados** de
cada elemento: medidas, colores, tipografía, radios, sombras y orden de apilado.

Capturas: 2026-09-10, sesión sin loguear, en dos viewports — 1440×900 y 375×812.

## Estructura

```txt
src/modules/prototype/
├── prototype.tokens.css         # tokens de MiCorreo, compartidos por todas las versiones
├── PrototypeHome.tsx            # landing del módulo: lista de versiones
├── components/
│   └── PrototypeChrome.tsx      # el "Volver al Hub", por fuera de la página replicada
└── v1/
    ├── LandingPage.tsx          # arma la página
    ├── LandingPage.module.css
    ├── data/
    │   ├── landing.content.ts   # textos, enlaces y assets de la landing
    │   └── fulfillment.content.ts
    ├── fulfillment/             # la página de Fulfillment y su formulario
    │   ├── FulfillmentPage.tsx
    │   └── ContactForm.tsx
    └── components/
        ├── Navbar.tsx           # header sticky amarillo
        ├── HeroSection.tsx      # carrusel + slot de la tarjeta de login
        ├── LoginCard.tsx        # "Ingresá a tu cuenta"
        ├── ReturnsSection.tsx   # "Gestionar Devolución"
        ├── ServicesSection.tsx  # "Conocé nuestros servicios"
        ├── ShortcutsSection.tsx # "Accesos directos"
        ├── WhyUsSection.tsx     # "¿Por qué elegirnos?"
        ├── SiteFooter.tsx
        ├── ChatButton.tsx
        └── SectionHeading.tsx   # título con reglas laterales
```

`prototype.tokens.css` vive al nivel del módulo, no dentro de `v1/`: es el lenguaje visual
de MiCorreo y la v2 lo va a consumir igual. Los componentes, en cambio, son del layout de la
v1 y la v2 va a proponer los suyos.

Todo el contenido editable de la landing vive en `data/landing.content.ts`. Los componentes
no tienen textos embebidos.

## Lo que agrega el requerimiento

### Tarjeta de Fulfillment en "Conocé nuestros servicios"

Sexta tarjeta, con el mismo componente y la misma alternancia izquierda/derecha que las otras
cinco. Es la única que enlaza dentro del prototipo en vez de salir a un sitio externo.

### Página de Fulfillment

Sigue el flyer entregado por el cliente como referencia de contenido, y el wireframe como
referencia de estructura: el flyer es vertical y de lectura corrida, y la pantalla lo
reorganiza en dos columnas para que el formulario quede visible desde el principio, sin
obligar a recorrer todo el contenido antes de poder completarlo.

| Bloque | Contenido |
|---|---|
| Hero | Fondo azul, título en amarillo, bajada y cinta "Próximamente" en diagonal |
| ¿Qué incluye nuestro fulfillment? | Almacenamiento, pedidos y distribución |
| Distribución rápida y confiable | CABA y Corredor Norte AMBA, Resto de AMBA, Resto del país |
| Formulario | Columna derecha, pegajosa en escritorio — ver [07-FORMULARIO-FULFILLMENT.md](07-FORMULARIO-FULFILLMENT.md) |
| Beneficios para tu negocio | Cuatro beneficios, dentro de una tarjeta del mismo ancho que el cuerpo |
| Cierre | "Nos ocupamos de todo, vos enfocate en hacer crecer tu negocio." |

En mobile las dos columnas se apilan: primero el contenido, después el formulario.

### Qué se reutiliza del sistema

El flyer del cliente es una pieza gráfica, no una pantalla: tiene pastillas de color, trazos
amarillos y círculos de fondo que no existen en MiCorreo. La pantalla toma su contenido pero
lo resuelve con lo que el sistema ya tiene:

| En el flyer | En la pantalla |
|---|---|
| Títulos dentro de pastillas azules y amarillas | Título en el negro del sistema (`--text-primary`), sin contenedor |
| Caja de beneficios con borde amarillo | Tarjeta gris `--landing-surface-muted` con radio 30, la misma de "Accesos directos" |
| Banda azul de cierre | Frase centrada sobre el fondo de página: el footer amarillo viene enseguida |
| Íconos ilustrados en círculos de color | Íconos [Lucide](https://lucide.dev) en azul institucional, sin círculo |

El único bloque que conserva el fondo azul es el hero, porque es el encabezado que entregó el
cliente.

Además, el formulario no inventa controles: usa los mismos que la landing.

| Componente | Dónde vive | Quién lo usa |
|---|---|---|
| `OutlinedField` / `OutlinedSelect` | `v1/components/` | "Gestionar Devolución" y el formulario de Fulfillment |
| `Button` | `v1/components/` | "Continuar", "Ingresar" y "Enviar" |

Ambos se extrajeron de la landing replicada, midiendo su render: el input outlined con label
flotante y la pastilla amarilla con texto azul. Al extraerlos se verificó que la réplica
siguiera dando las mismas alturas por sección y que los botones conservaran sus medidas
(120×40 y 175×49).

**Assets provisorios.** Fulfillment todavía no tiene identidad propia entregada. Hasta que
llegue del cliente:

- los íconos de las listas y de los beneficios son de **Lucide**, no del set ilustrado del
  cliente. Se eligieron por consistencia y para no dibujar íconos a mano;
- el logo de la tarjeta es un lockup tipográfico, no un archivo de marca. Reproduce el
  tratamiento de los logos existentes —pastilla azul `#152663` con el nombre en itálica
  blanca— midiendo el asset de Oficios Judiciales: caja de 50px de alto, radio de 10px,
  24px de aire lateral y versal de 17px, es decir unos 24px de cuerpo. Se mantiene
  "Fulfillment" en caja alta y baja, como lo escribe el cliente en el flyer, aunque los dos
  logos con este tratamiento estén en mayúsculas;
- la ilustración de la caja se dibujó con la paleta de MiCorreo, reemplazando la fotografía
  del flyer.

Se corrigió además un error de tipeo del flyer: "Gestión depedidos" → "Gestión de pedidos".

## Medidas clave capturadas

| Elemento | Medida |
|---|---|
| Header | sticky, alto 60px, fondo `#ffce00`, z-index 1100 |
| Contenido del header | máximo 1200px centrado, padding lateral 16px |
| Botones del header | alto 40px, radio 8px, padding 6px 16px |
| Banner | alto 600px, imagen `object-fit: cover` |
| Contenedor del banner | máximo 1320px centrado, padding lateral 20px |
| Tarjeta de login | 350×420px, anclada a la derecha y centrada verticalmente sobre el banner |
| Título de sección | bloque de 1440px centrado, regla inferior de 4.67px en `#152663`, margen 52px |
| Tarjeta de servicio | texto 56.97% / imagen 43.03%, separación interna 128px, filas alternadas |
| Separación entre servicios | 104px |
| Tarjeta de acceso directo | 2 columnas, separación 96px, radio 30px, padding 26px |
| "¿Por qué elegirnos?" | 4 columnas, separación 16px, íconos de tamaño propio por tarjeta |
| Footer | columnas de 282px, padding lateral 48px |
| Botón del chatbot | fijo, 50×50px, a 50px del borde inferior derecho |

## Comportamiento en mobile

Debajo de 900px la landing original no se limita a apilar: cambia de layout. La v1 replica
esos cambios.

| Qué | Escritorio | Mobile |
|---|---|---|
| Header | logo + tres botones, 60px de alto | hamburguesa sola, sin logo, 54px; los accesos se despliegan en un panel amarillo bajo el header |
| Banner | 600px de alto, contenido alineado a la izquierda | 800px, contenido centrado y bajado 96px |
| Tarjeta de login | 350px anclada a la derecha del banner | 302px centrada, apoyada en la mitad vertical y desbordando hacia la sección siguiente |
| Título de sección | reglas elásticas a los lados, 34px | dos trazos de 30px, 19px |
| Tarjeta de servicio | texto e imagen lado a lado, alternando | apilada y centrada, con la imagen **entre** el logo y el texto |
| Accesos directos | 2 columnas | 1 columna, ícono y tipografía más chicos |
| ¿Por qué elegirnos? | 4 columnas | 1 columna |
| Footer | 3 columnas en fila | 1 columna centrada, con separadores azules de 56px entre bloques |

El alto de la tarjeta de "¿Por qué elegirnos?" es fijo en el original (212.365px, idéntico en
ambos viewports pese a tener contenidos de distinta altura); la v1 lo reproduce con un
`min-height`, porque sin él la sección queda 30px corta en escritorio y 287px en mobile.

## Verificación

Altura de cada sección, v1 contra producción:

| Sección | Producción 1440 | v1 1440 | Producción 375 | v1 375 |
|---|---|---|---|---|
| Banner | 600 | 600 | 800 | 800 |
| Gestionar Devolución | 417 | 417 | 470 | 461 |
| Conocé nuestros servicios | 1902 | 1902 | 1874 | 1838 |
| Accesos directos | 552 | 540 | 591 | 561 |
| ¿Por qué elegirnos? | 477 | 477 | 1042 | 1042 |
| Footer | 281 | 281 | 645 | 621 |

Sin scroll horizontal en ninguno de los dos viewports.

## Diferencias conocidas

1. **Tipografía.** La landing en producción declara Gilroy sin `@font-face`: si la fuente no
   está instalada, cae a Roboto/Helvetica. La v1 embebe Gilroy, así que siempre renderiza la
   familia correcta. Las diferencias de decenas de píxeles en algunas secciones vienen de esa
   diferencia de métricas, más el redondeo de sub-píxel de un `devicePixelRatio` de 1.5. Por
   debajo del 2% no son diferencias significativas.
2. **Un solo punto de corte.** La v1 cambia de layout en 900px, el `md` de MUI. El original
   tiene además un escalón intermedio en 600px que la v1 no replica: entre 600 y 900 usa el
   layout mobile.
3. **Carrusel.** Rota cada 5 segundos y los puntos son clicleables, como en el original. La
   landing real incluye una cuarta diapositiva que es un clon de la primera para el efecto
   de bucle; la v1 usa tres y vuelve al inicio.
4. **Sin backend.** Los formularios de login y de devolución no envían nada. El ojo de la
   contraseña sí alterna la visibilidad.
5. **Estado sin loguear.** Se replicó la landing tal como se ve sin sesión iniciada. El menú
   de usuario logueado ("Nuevo envío", avatar, "Hola, Usuario") existe en el DOM original
   pero está oculto; no se portó.
6. **Títulos de sección.** El original cambia la etiqueta del título de `h2` en escritorio a
   `h5` en mobile. La v1 mantiene `h2` en ambos y sólo cambia el estilo: el nivel de
   encabezado no debería depender del ancho de pantalla.

## Cómo levantarlo

```bash
npm run dev
```

- `http://localhost:4320/` — el Hub.
- `http://localhost:4320/prototipo` — las versiones del prototipo.
- `http://localhost:4320/prototipo/v1` — la landing.
- `http://localhost:4320/prototipo/v1/fulfillment` — la página de Fulfillment.

El botón "Volver al Hub" que aparece sobre la v1 no es parte de la landing replicada: lo
agrega `PrototypeChrome`, que envuelve la página sin tocar su marcado.
