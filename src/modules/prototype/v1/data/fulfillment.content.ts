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
  chip: 'FULFILLMENT',
  title: 'Vos vendés. Nosotros hacemos que llegue.',
  subtitle: 'Una experiencia simple y humana para conectar tu marca con clientes de todo el país.',
  proof: 'Más de 3.000 negocios ya confían',
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
      body: 'Entrega en el día al precio del PAQ.AR Clásico Zona 1.',
    },
    {
      icon: ClipboardList,
      title: 'Resto de AMBA',
      body: 'Entrega al día siguiente.',
    },
    {
      icon: Truck,
      title: 'Resto del país',
      body: 'PAQ.AR Clásico o PAQ.AR Prioritario para Zonas 2, 3 y 4.',
    },
  ],
}

export const benefits = {
  title: 'Beneficios para tu negocio',
  items: [
    { icon: BadgeDollarSign, text: 'Reducí costos operativos y logísticos' },
    { icon: Timer, text: 'Ganá tiempo y enfocate en vender más' },
    { icon: ThumbsUp, text: 'Mejorá la experiencia de tus clientes con entregas rápidas y confiables' },
    { icon: PackageCheck, text: 'Escalá tu negocio sin preocuparte por la logística' },
  ],
}

export const form = {
  title: 'Quiero empezar',
  subtitle: 'Completá tus datos y te ayudamos a encontrar la mejor opción.',
  disclaimer: 'Tus datos están protegidos.',
  submit: 'Enviar',
  success: {
    title: '¡Gracias por contactarnos!',
    body: 'Recibimos tus datos. Un asesor comercial de Correo Argentino se va a comunicar con vos a la brevedad.',
  },
}

/**
 * Listado provisorio: el documento formal pide que sea "el mismo desplegable
 * que en MiCorreo al crear una nueva cuenta", que todavía no se relevó. Se
 * mantiene este listado de referencia y la opción "Otros" con texto libre,
 * que sí está definida. Reemplazar cuando se releve el desplegable real.
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
  'Otros',
]

export const RUBRO_OTROS = 'Otros'
