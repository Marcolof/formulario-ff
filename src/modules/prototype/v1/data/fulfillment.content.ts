import {
  BadgeDollarSign,
  Clock,
  ClipboardList,
  Map,
  PackageCheck,
  ThumbsUp,
  Timer,
  Truck,
  Warehouse,
  Zap,
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
      // Entrega en el día: se distingue de "Resto de AMBA" con un ícono de
      // rapidez en vez de repetir el de almacenamiento de la lista de arriba.
      icon: Zap,
      title: 'CABA y Corredor Norte AMBA',
      body: 'Entrega en el día al precio del PAQ.AR Clásico Zona 1.',
    },
    {
      icon: Clock,
      title: 'Resto de AMBA',
      body: 'Entrega al día siguiente.',
    },
    {
      icon: Map,
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
    body: 'Recibimos tus datos. Un asesor comercial se va a comunicar con vos a la brevedad.',
  },
}

/**
 * Listado real de rubros, provisto por Correo Argentino (el mismo desplegable
 * que usa MiCorreo al crear una nueva cuenta). No es una lista inventada por
 * este proyecto: si hace falta modificarla, el cambio tiene que salir de
 * Correo Argentino, no del equipo de UX/desarrollo.
 */
export const rubros = [
  'Alimentos y Bebidas',
  'Arte y Música',
  'Bazar y Cocina',
  'Bebes',
  'Belleza y Perfumería',
  'Botánica',
  'Centros Comerciales y Supermercados',
  'Deco y Hogar',
  'Deportes',
  'Electrodomésticos',
  'Ferretería y Construcción',
  'Indumentaria, Calzado y Accesorios',
  'Industrias y Oficinas',
  'Juguetería y Librería',
  'Limpieza',
  'Mascotas',
  'Salud',
  'SexShop',
  'Tabaquería',
  'Tecnología e Informática',
  'Textil',
  'Vehículos y Accesorios',
  'Otros',
]

export const RUBRO_OTROS = 'Otros'
