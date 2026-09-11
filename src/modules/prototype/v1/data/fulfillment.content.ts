import {
  BadgeDollarSign,
  ClipboardList,
  PackageCheck,
  ThumbsUp,
  Timer,
  Truck,
  Warehouse,
} from 'lucide-react'

export const hero = {
  ribbon: 'Próximamente',
  title: 'Fulfillment',
  subtitle: 'Solución integral de almacenamiento y distribución para tu eCommerce',
}

export const includes = {
  title: '¿Qué incluye nuestro fulfillment?',
  items: [
    {
      icon: Warehouse,
      title: 'Gestión de almacenamiento',
      body: 'Recibimos, almacenamos y cuidamos tu stock.',
    },
    {
      icon: ClipboardList,
      title: 'Gestión de pedidos',
      body: 'Procesamos tus órdenes de compra de forma rápida y eficiente.',
    },
    {
      icon: Truck,
      title: 'Distribución a todo el país',
      body: 'Entregas confiables, en tiempo y forma.',
    },
  ],
}

export const distribution = {
  title: 'Distribución rápida y confiable',
  items: [
    {
      icon: Warehouse,
      title: 'CABA y Corredor Norte AMBA',
      body: 'Entrega <strong>en el día</strong> al precio del <em>PAQ.AR</em> Clásico Zona 1.',
    },
    {
      icon: ClipboardList,
      title: 'Resto de AMBA',
      body: 'Entrega al <strong>día siguiente</strong>.',
    },
    {
      icon: Truck,
      title: 'Resto del país',
      body: '<em>PAQ.AR</em> Clásico o <em>PAQ.AR</em> Prioritario para Zonas 2, 3 y 4.',
    },
  ],
}

export const benefits = {
  title: 'Beneficios para tu negocio',
  items: [
    { icon: BadgeDollarSign, lead: 'Reducí costos', body: 'operativos y logísticos' },
    { icon: Timer, lead: 'Ganá tiempo', body: 'y enfocate en vender más' },
    {
      icon: ThumbsUp,
      lead: 'Mejorá la experiencia',
      body: 'de tus clientes con entregas rápidas y confiables',
    },
    { icon: PackageCheck, lead: 'Escalá tu negocio', body: 'sin preocuparte por la logística' },
  ],
}

export const closing = {
  lead: 'Nos ocupamos de todo,',
  highlight: 'vos enfocate en hacer crecer tu negocio.',
}

export const form = {
  title: 'Completá el formulario',
  disclaimer: 'Tus datos están seguros',
  submit: 'Enviar',
  success: {
    title: '¡Gracias por contactarnos!',
    body: 'Recibimos tus datos. Un asesor comercial de Correo Argentino se va a comunicar con vos a la brevedad.',
  },
}

/**
 * Listado provisorio: el requerimiento pide el campo pero todavía no define los
 * rubros. Reemplazar cuando el área solicitante entregue la lista definitiva.
 */
export const rubros = [
  'Indumentaria y calzado',
  'Electrónica y tecnología',
  'Hogar y muebles',
  'Salud y belleza',
  'Alimentos y bebidas',
  'Deportes y aire libre',
  'Juguetería y bebés',
  'Librería y papelería',
  'Automotor y repuestos',
  'Otro',
]
