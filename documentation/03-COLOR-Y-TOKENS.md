# Color y tokens

Cómo se organiza el color en el prototipo, de dónde sale cada valor y qué puede usar un
componente.

## Arquitectura en tres capas

```txt
PRIMITIVE            SEMANTIC              COMPONENT / MÓDULO
--correo-yellow  →   --surface-brand   →   --landing-radius-control
--grey-700       →   --text-muted
--grey-050       →   --surface-page
```

**Un componente consume SEMANTIC o COMPONENT. Nunca PRIMITIVE.**
Ningún `.module.css` debe tener un hex, un `px` de tipografía ni un radio literal. Si falta
un token, se agrega; no se hardcodea.

Archivos:

| Archivo | Capa | Alcance |
|---|---|---|
| [`src/styles/tokens.css`](../src/styles/tokens.css) | primitive + semantic + component del portal | Compartido |
| [`src/styles/globals.css`](../src/styles/globals.css) | reset, `@font-face` de Gilroy, estilos base | Compartido |
| [`src/modules/prototype/prototype.tokens.css`](../src/modules/prototype/prototype.tokens.css) | tokens propios de la landing | Sólo el módulo Landing |

`landing.tokens.css` se engancha a `[data-module='prototype']`, no a una clase de CSS Module,
para que el selector no dependa del hash del build. Vive dentro del módulo porque la landing
pública usa una escala distinta a la del portal logueado y no hay decisión de unificarlas.

## Primitivas de marca

Declaradas en el `:root` del CSS original de MiCorreo y ya tokenizadas en `tokens.css`.

| Rol | Primitive | Semantic | Valor |
|---|---|---|---|
| Amarillo de marca | `--correo-yellow` | `--color-brand`, `--surface-brand` | `#ffce00` |
| Azul institucional | `--correo-blue` | `--color-accent`, `--text-link`, `--text-on-brand` | `#152663` |
| Gris de texto | `--correo-grey-700` | `--text-muted` | `#49454f` |
| Fondo de página | `--correo-off-white` | `--surface-page` | `#fafafa` |
| Texto principal | `--correo-near-black` | `--text-primary` | `#191919` |

## Superficies de la landing

| Uso | Valor | Token |
|---|---|---|
| Fondo de página y sección de devoluciones | `#fafafa` | `--landing-surface-page` |
| Servicios y "¿Por qué elegirnos?" | `#f4efef` | `--landing-surface-muted` |
| Accesos directos | `#ffffff` | `--landing-surface-plain` |
| Header y footer | `#ffce00` | `--surface-brand` |
| Velo de la tarjeta de login | `rgba(33,37,41,0.6)` | `--landing-login-scrim` |

## Texto

| Uso | Valor | Token |
|---|---|---|
| Texto por defecto del theme | `#1a1a1a` | `--landing-text-default` |
| Copy de tarjetas de servicio | `#191919` | `--landing-text-body` |
| Títulos, CTA y copy de accesos | `#152663` | `--color-accent` |
| Footer | `#212529` | `--landing-footer-text` |
| Sobre amarillo (navbar, botones) | `#152663` | `--text-on-brand` |
| Sobre el velo del login | `#ffffff` | `--text-inverse` |

## Grises de apoyo

| Uso | Valor | Token |
|---|---|---|
| Borde de input outlined | `rgba(0,0,0,0.23)` | `--landing-field-border` |
| Label de input en reposo | `#9e9e9e` | `--landing-field-label` |
| Ícono de mostrar contraseña | `#6c757d` | `--landing-icon-muted` |
| Separador dentro del login | `#84868c` | `--landing-login-divider` |
| Punto inactivo del carrusel | `#e0e0e0` | `--landing-dot-idle` |

## Tipografía

Familia única **Gilroy** con pesos numéricos, declarada por `@font-face` en `globals.css`
a partir de los `.ttf`. El sitio original declara `Gilroy, Roboto, Helvetica, Arial` sin
`@font-face`: depende de que la fuente esté instalada en la máquina del usuario. El
prototipo la embebe, así que renderiza Gilroy siempre.

| Rol | Tamaño | Token |
|---|---|---|
| Título de sección (`h2`) | 34px / 40.8 | `--landing-font-size-display` |
| Título del login | 28px / 42 | `--landing-font-size-login-title` |
| Título de acceso directo (`h3`) | 24px / 28 | `--landing-font-size-title` |
| Copy destacado | 20px | `--landing-font-size-lead` |
| CTA de tarjeta | 18px / 27 | `--landing-font-size-cta` |
| Cuerpo | 16px / 24 | `--landing-font-size-body` |
| Footer y notas | 14px / 21 | `--landing-font-size-meta` |

Pesos: 400 cuerpo, 500 títulos y navegación, 600 CTA y títulos de accesos.
La landing original pide en algunos lugares peso **450**; no existe un `.ttf` de Gilroy en
450, y el algoritmo de matching de CSS lo resuelve al 500. Por eso se tokeniza como 500.

## Formas y elevación

| Uso | Valor | Token |
|---|---|---|
| Botones de navbar, inputs | 8px | `--landing-radius-control` |
| CTA "Ingresar" / "Continuar" | 24px | `--landing-radius-pill` |
| Imagen de tarjeta de servicio | 20px | `--landing-radius-media` |
| Tarjeta de login | 18px | `--landing-radius-login` |
| Tarjeta de acceso directo | 30px | `--landing-radius-shortcut` |
| Sombra del header | elevation 4 de MUI | `--landing-shadow-appbar` |

## Capas

| Elemento | z-index | Token |
|---|---|---|
| Header sticky | 1100 | `--landing-z-header` |
| Botón del chatbot | 4500 | `--landing-z-chat` |

## Íconos

Dos orígenes, y no se mezclan:

- **Íconos ilustrados del cliente** (`landing-icon-*.svg`, logos de producto, botón del
  chat): son assets entregados, se usan tal cual.
- **Íconos de interfaz**: [Lucide](https://lucide.dev), vía `lucide-react`. Se pintan con
  `color` heredado —normalmente `--color-accent`— y trazo 1.75. No se dibujan íconos a mano.

## Qué NO inventar

La landing no usa trazos de color ni pastillas de fondo para titular secciones. Cuando una
pantalla nueva necesita jerarquía:

- **Título de bloque:** texto en `--text-primary`, semibold, sin contenedor.
- **Agrupar contenido:** tarjeta `--landing-surface-muted` con `--landing-radius-shortcut`,
  como en "Accesos directos". Sin borde.
- **Separar ítems de una lista:** línea de `--border-subtle`.
- **Acción principal:** el componente `Button` — pastilla amarilla con texto azul.
- **Campo de formulario:** `OutlinedField` / `OutlinedSelect`.
