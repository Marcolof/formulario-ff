# La réplica de la landing de MiCorreo

La landing del prototipo (`/prototipo/v3`) tiene dos capas, y conviene no confundirlas:

1. **La réplica**, medida contra la landing en producción y verificada sección por sección.
   Es la referencia contra la que se compara cualquier propuesta posterior.
2. **Lo que agrega el requerimiento**, resuelto con el lenguaje visual existente y sin tocar
   el layout de lo replicado:
   - una sexta tarjeta de producto, **Fulfillment**, en "Conocé nuestros servicios";
   - el acceso desde esa tarjeta a la **pantalla de Fulfillment**, en
     `/prototipo/v3/fulfillment`, que sí tiene front propio — ver
     [08-PROPUESTA-V3.md](08-PROPUESTA-V3.md).

> **Nota de historia (14-09-2026).** Este documento describía la "versión 1". Las versiones 1
> y 2 se retiraron del proyecto y quedó una sola propuesta, la v3, que usa esta misma landing
> replicada. El contenido de acá sigue vigente salvo por las rutas y las rutas de archivo, que
> se actualizaron; lo que era exclusivo de la v1 —su página de Fulfillment en una columna— ya
> no existe.

## Por qué la réplica no se toca

La landing replicada no se modifica para probar ideas: es el original contra el que se mide
cualquier cambio. Toda propuesta se resuelve sumando pantallas o props opcionales, nunca
editando la réplica ni duplicando sus componentes.

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
├── prototype.tokens.css         # tokens de MiCorreo, a nivel de módulo
├── PrototypeHome.tsx            # landing del módulo
├── components/
│   ├── PrototypeChrome.tsx      # menú flotante y panel de casos de uso, por fuera
│   │                            # de la página replicada
│   └── simulation.ts            # el caso de uso activo, por contexto
└── v3/
    ├── LandingPage.tsx          # arma la página
    ├── LandingPage.module.css
    ├── data/
    │   ├── landing.content.ts   # textos, enlaces y assets de la landing
    │   └── fulfillment.content.ts
    ├── fulfillment/             # la pantalla de Fulfillment, con front propio
    │   ├── FulfillmentPage.tsx
    │   ├── FulfillmentForm.tsx
    │   └── useContactForm.ts    # campos, validaciones y momento de validación
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

`prototype.tokens.css` vive al nivel del módulo, no dentro de `v3/`: es el lenguaje visual de
MiCorreo, y cualquier propuesta futura lo consume igual. Los componentes, en cambio, son del
layout de esta landing, y una propuesta nueva podría traer los suyos.

Todo el contenido editable de la landing vive en `data/landing.content.ts`. Los componentes
no tienen textos embebidos.

## Lo que agrega el requerimiento

### Tarjeta de Fulfillment en "Conocé nuestros servicios"

Sexta tarjeta, con el mismo componente y la misma alternancia izquierda/derecha que las otras
cinco. Es la única que enlaza dentro del prototipo en vez de salir a un sitio externo.

### Página de Fulfillment en una columna — retirada (14-09-2026)

Existió una página de Fulfillment con el lenguaje visual de la landing, siguiendo el nodo de
Figma `13217:34295` ("Fulfillment/Formulario default"): portada gris, "¿Qué incluye nuestro
fulfillment?", el formulario en la columna derecha, beneficios y mapa de cobertura. Estaba
verificada contra Figma al pixel en viewport 1366.

Se retiró junto con las versiones 1 y 2. La pantalla vigente es la de la v3, con front propio
—ver [08-PROPUESTA-V3.md](08-PROPUESTA-V3.md)—, y el formulario que vive en ella está
documentado en [07-FORMULARIO-FULFILLMENT.md](07-FORMULARIO-FULFILLMENT.md).

Lo que sobrevive de aquella pantalla:

- los **textos** de la tarjeta del formulario y el tratamiento visual de los controles, que la
  v3 conserva;
- tres assets que **ya no referencia ningún componente** y quedan en `src/assets/img/` por si
  se retoma: `centro-logistico.png`, `map.png` y `clients.svg`;
- la cifra "Más de 3.000 negocios ya confían", que era del diseño y quedó sin usar. Si vuelve
  a aparecer, hay que confirmarla con el área solicitante antes de publicar.

### Tokens y componentes

De los valores que se habían agregado a `prototype.tokens.css` con prefijo `--ff-` quedan
sólo los que siguen teniendo consumidor: `--ff-field-border`, `--ff-field-radius`,
`--ff-text-secondary` y `--ff-card-shadow`. Los de la página retirada (superficies de portada,
íconos, beneficios y sus radios) se borraron el 14-09-2026.

El formulario no inventa controles: usa los mismos que la landing, en una variante propia
del diseño.

| Componente | Dónde vive | Quién lo usa |
|---|---|---|
| `OutlinedField` / `OutlinedSelect` | `v3/components/` | "Gestionar Devolución" (variante por defecto) y el formulario de Fulfillment (`variant="form"`) |
| `Button` | `v3/components/` | "Continuar" y "Ingresar" (`md`, `lg`), "Enviar" (`pill`) y los CTA de texto (`tertiary`) |

Ambos se extrajeron de la landing replicada, midiendo su render. Las variantes del formulario
se agregaron sin tocar la variante por defecto, así que la réplica conserva sus medidas.

Los íconos son de [Lucide](https://lucide.dev), vía `lucide-react`: el diseño usa los íconos
de la librería "Design System", que es el set Lucide.

**Assets.**

- `centro-logistico.png` (foto de la portada), `map.png` (mapa de cobertura) y `clients.svg`
  (prueba social) se entregaron junto con el diseño.
- El logo de la tarjeta de Fulfillment en la landing sigue siendo un lockup tipográfico, no
  un archivo de marca. Reproduce el tratamiento de los logos existentes —pastilla azul
  `#152663` con el nombre en itálica blanca— midiendo el asset de Oficios Judiciales: caja
  de 50px de alto, radio de 10px, 24px de aire lateral y versal de 17px, es decir unos 24px
  de cuerpo. Se mantiene "Fulfillment" en caja alta y baja, como lo escribe el cliente en el
  flyer, aunque los dos logos con este tratamiento estén en mayúsculas.

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

Debajo de 900px la landing original no se limita a apilar: cambia de layout. La réplica sigue
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
ambos viewports pese a tener contenidos de distinta altura); la réplica lo reproduce con un
`min-height`, porque sin él la sección queda 30px corta en escritorio y 287px en mobile.

## Verificación

Altura de cada sección, la réplica contra producción:

| Sección | Producción 1440 | Réplica 1440 | Producción 375 | Réplica 375 |
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
   está instalada, cae a Roboto/Helvetica. La réplica embebe Gilroy, así que siempre renderiza la
   familia correcta. Las diferencias de decenas de píxeles en algunas secciones vienen de esa
   diferencia de métricas, más el redondeo de sub-píxel de un `devicePixelRatio` de 1.5. Por
   debajo del 2% no son diferencias significativas.
2. **Un solo punto de corte.** La réplica cambia de layout en 900px, el `md` de MUI. El original
   tiene además un escalón intermedio en 600px que la réplica no hace: entre 600 y 900 usa el
   layout mobile.
3. **Carrusel.** Rota cada 5 segundos y los puntos son clicleables, como en el original. La
   landing real incluye una cuarta diapositiva que es un clon de la primera para el efecto
   de bucle; la réplica usa tres y vuelve al inicio.
4. **Sin backend.** Los formularios de login y de devolución no envían nada. El ojo de la
   contraseña sí alterna la visibilidad.
5. **Estado sin loguear.** Se replicó la landing tal como se ve sin sesión iniciada. El menú
   de usuario logueado ("Nuevo envío", avatar, "Hola, Usuario") existe en el DOM original
   pero está oculto; no se portó.
6. **Títulos de sección.** El original cambia la etiqueta del título de `h2` en escritorio a
   `h5` en mobile. La réplica mantiene `h2` en ambos y sólo cambia el estilo: el nivel de
   encabezado no debería depender del ancho de pantalla.
7. **CTA con subrayado (14/09/2026).** Los enlaces "Conocer más" / "Ingresá" de "Conocé
   nuestros servicios" y "Accesos directos" pasaron a llevar el subrayado amarillo del botón
   terciario del sistema (`--button-tertiary-*` en `tokens.css`). El sitio real no tiene ese
   subrayado. A diferencia de las diferencias 1-6, que son limitaciones de la réplica, ésta es
   una decisión de diseño explícita del usuario para unificar el estilo de CTA en todo el
   producto — ver [05-REGISTRO-DE-CAMBIOS.md](05-REGISTRO-DE-CAMBIOS.md#botón-terciario-reutilizable-para-los-cta-de-texto-14-09-2026).

## Cómo levantarlo

```bash
npm run dev
```

- `http://localhost:4320/` — el Hub.
- `http://localhost:4320/prototipo` — las versiones del prototipo.
- `http://localhost:4320/prototipo/v3` — la landing.
- `http://localhost:4320/prototipo/v3/fulfillment` — la pantalla de Fulfillment.

El botón flotante que aparece sobre la landing —con "Volver al hub" y el panel de casos de
uso— no es parte de la réplica: lo agrega `PrototypeChrome`, que envuelve la página sin tocar
su marcado.
