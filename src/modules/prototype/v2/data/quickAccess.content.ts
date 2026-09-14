import { Mail, Package, Scale, Store, Tag, Undo2, Warehouse, type LucideIcon } from 'lucide-react'

import { services, shortcuts, type ServiceId } from '../../v1/data/landing.content'

/**
 * Carrusel de servicios de la v2. Reúne en tarjetas lo que en la v1 ocupaba dos
 * secciones: "Gestionar Devolución" y "Conocé nuestros servicios".
 *
 * Los enlaces no se copian: se toman de `services` de la v1 por su `id`, así un
 * cambio de URL se hace en un solo lugar. Lo propio de la v2 son los textos
 * breves, el ícono y el orden.
 */

/** Conserva el título de la landing original: el carrusel ocupa ese lugar. */
export const servicesTitle = 'Conocé nuestros servicios'

/**
 * "Accesos rápidos" pasa a nombrar la sección de Sucursales y Seguimiento, que
 * en la v1 se llamaba "Accesos directos".
 */
export const shortcutsTitle = 'Accesos rápidos'

/** Deep link del modal: `/prototipo/v2#gestion-devolucion` abre la landing con el modal abierto. */
export const RETURNS_HASH = '#gestion-devolucion'

/**
 * La página de Fulfillment es una sola (el mismo componente que en la v1). Se
 * monta también bajo `/prototipo/v2` para que el recorrido no salte de versión.
 */
export const FULFILLMENT_ROUTE_V2 = '/prototipo/v2/fulfillment'

type Action =
  | { kind: 'returns' }
  | { kind: 'link'; href: string; internal?: boolean }

export type QuickAccess = {
  id: string
  title: string
  body: string
  cta: string
  icon: LucideIcon
  action: Action
  /** Destaca la tarjeta con una etiqueta y el CTA como botón primario. */
  badge?: string
}

function linkTo(id: ServiceId): Action {
  const service = services.find((item) => item.id === id)
  if (!service) throw new Error(`No existe el servicio "${id}" en landing.content.ts`)
  return { kind: 'link', href: service.href, internal: service.internal }
}

export const quickAccess: QuickAccess[] = [
  {
    id: 'devolucion',
    title: 'Gestionar devolución',
    body: 'Iniciá la devolución de un paquete que ya fue entregado.',
    cta: 'Gestionar',
    icon: Undo2,
    action: { kind: 'returns' },
  },
  {
    id: 'paqar',
    title: 'Paq.ar',
    body: 'La solución logística que simplifica los envíos de tu eCommerce.',
    cta: 'Ingresá',
    icon: Package,
    action: linkTo('paqar'),
  },
  {
    // Tercera posición a propósito: entra en la primera vista del carrusel en
    // escritorio (4 tarjetas) y en tablet (3). Es la novedad del requerimiento.
    id: 'fulfillment',
    title: 'Fulfillment',
    body: 'Solución integral de almacenamiento y distribución para tu eCommerce.',
    cta: 'Solicitar',
    icon: Warehouse,
    action: { kind: 'link', href: FULFILLMENT_ROUTE_V2, internal: true },
    badge: '¡Nuevo!',
  },
  {
    id: 'mis-comunicaciones-digitales',
    title: 'Mis Comunicaciones Digitales',
    body: 'Hacé, pagá y enviá online tus envíos postales.',
    cta: 'Ingresá',
    icon: Mail,
    action: linkTo('mis-comunicaciones-digitales'),
  },
  {
    id: 'punto-correo',
    title: 'Punto Correo',
    body: 'Sumate a nuestra red y mejorá tus ingresos.',
    cta: 'Conocer más',
    icon: Store,
    action: linkTo('punto-correo'),
  },
  {
    id: 'rotulador',
    title: 'Rotulador',
    body: 'Confeccioná tus etiquetas y abonalas en cualquier sucursal.',
    cta: 'Generar rótulo',
    icon: Tag,
    action: linkTo('rotulador'),
  },
  {
    id: 'oficios-judiciales',
    title: 'Oficios Judiciales',
    body: 'Pagá tus Oficios Judiciales online, de forma simple y segura.',
    cta: 'Ingresá',
    icon: Scale,
    action: linkTo('oficios-judiciales'),
  },
]

/**
 * La referencia de la v2 pone Sucursales primero. El orden se deriva de los
 * datos de la v1 por título: no hay una segunda copia de las tarjetas, así que
 * un cambio de copy o de enlace sigue haciéndose en un solo lugar.
 */
export const shortcutsV2 = ['Sucursales', 'Seguimiento de envíos'].map((title) => {
  const shortcut = shortcuts.find((item) => item.title === title)
  if (!shortcut) throw new Error(`No existe el acceso directo "${title}" en landing.content.ts`)
  return shortcut
})
