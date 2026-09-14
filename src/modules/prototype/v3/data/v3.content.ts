import {
  Boxes,
  ChartColumnDecreasing,
  ChartLine,
  Clock,
  Map,
  MapPin,
  Package,
  ThumbsUp,
  Truck,
  Warehouse,
  type LucideIcon,
} from 'lucide-react'

import bannerFulfillment from '@/assets/img/banner ff formulario.png'

/**
 * Contenido de la pantalla de Fulfillment de la v3. Sale del diseño de Figma
 * "Mi Correo 2.0", nodo 13284:7345 — un front propio, distinto del sistema de
 * la landing.
 *
 * Los íconos son los equivalentes de Lucide a los que nombra el diseño: ahí las
 * capas ya se llaman como los íconos de Lucide (boxes, warehouse, package,
 * map-pin, map, truck, chart-column-decreasing, clock, thumbs-up, chart-line).
 */

export const FULFILLMENT_ROUTE_V3 = '/prototipo/v3/fulfillment'

export const hero = {
  image: bannerFulfillment,
  imageAlt: 'Caja de Correo Argentino con una cinta que anuncia "Próximamente"',
  title: 'Fulfillment',
  subtitle: 'Solución integral de almacenamiento y distribución para tu eCommerce',
}

type Service = {
  icon: LucideIcon
  title: string
  body: string
}

type ServiceGroup = {
  id: string
  tone: 'navy' | 'yellow'
  /** El encabezado va en dos renglones, como en el diseño. */
  heading: [string, string]
  items: Service[]
}

/**
 * Dos columnas, cada una con su encabezado: la izquierda responde qué incluye
 * el servicio y la derecha, cómo distribuye. Se modela agrupado —y no como una
 * lista de seis que se acomoda sola— para que en mobile cada encabezado quede
 * con sus propios servicios en vez de mezclarse.
 */
export const serviceGroups: ServiceGroup[] = [
  {
    id: 'incluye',
    tone: 'navy',
    heading: ['¿Qué incluye', 'nuestro fulfillment?'],
    items: [
      {
        icon: Boxes,
        title: 'Gestión de almacenamiento',
        body: 'Recibimos, almacenamos y cuidamos tu stock.',
      },
      {
        icon: Package,
        title: 'Gestión de pedidos',
        body: 'Procesamos tus órdenes de compra de forma rápida y eficiente.',
      },
      {
        icon: Map,
        title: 'Distribución a todo el país',
        body: 'Entregas confiables, en tiempo y forma.',
      },
    ],
  },
  {
    id: 'promesa',
    tone: 'yellow',
    heading: ['Distribución rápida', 'y confiable'],
    items: [
      {
        icon: Warehouse,
        title: 'CABA y Corredor Norte AMBA',
        body: 'Entrega en el día al precio del PAQ.AR Clásico Zona 1.',
      },
      {
        icon: MapPin,
        title: 'Resto de AMBA',
        body: 'Entrega al día siguiente.',
      },
      {
        icon: Truck,
        title: 'Resto del país',
        body: 'PAQ.AR Clásico o PAQ.AR Prioritario para Zonas 2, 3 y 4.',
      },
    ],
  },
]

export const benefits = {
  label: 'Beneficios para tu negocio',
  items: [
    { icon: ChartColumnDecreasing, title: 'Reducí costos', body: 'operativos y logísticos' },
    // En Figma dice "Ganà tiempo", con acento grave. Se corrige acá.
    { icon: Clock, title: 'Ganá tiempo', body: 'y enfocate en vender más' },
    {
      icon: ThumbsUp,
      title: 'Mejorá la experiencia',
      body: 'de tus clientes con entregas rápidas y confiables',
    },
    { icon: ChartLine, title: 'Escalá tu negocio', body: 'sin preocuparte por la logística' },
  ],
}

export const closing = {
  lead: 'Nos ocupamos de todo, ',
  highlight: 'vos enfocate',
  second: 'en hacer crecer tu negocio.',
}
