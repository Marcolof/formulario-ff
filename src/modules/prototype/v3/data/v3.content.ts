import fulfillmentFlyer from '@/assets/img/Fulfillment.jpeg'

/**
 * Deep link del visor: `/prototipo/v3#fulfillment` abre la landing con el flyer
 * ya abierto.
 */
export const FULFILLMENT_HASH = '#fulfillment'

/**
 * Flyer de Fulfillment provisto por el cliente (14/09/2026). Es una imagen
 * estática: en esta propuesta el acceso a Fulfillment no lleva a una pantalla
 * propia, sólo muestra esta pieza.
 *
 * El `alt` resume lo que dice el flyer porque su contenido es texto dentro de
 * una imagen: sin esto, para un lector de pantalla la propuesta no existe.
 */
export const fulfillmentImage = {
  src: fulfillmentFlyer,
  alt:
    'Flyer de Fulfillment de Correo Argentino, próximamente disponible. Solución integral de ' +
    'almacenamiento y distribución para tu eCommerce. Incluye gestión de almacenamiento, ' +
    'gestión de pedidos y distribución a todo el país. Distribución rápida y confiable: ' +
    'entrega en el día en CABA y Corredor Norte AMBA al precio del PAQ.AR Clásico Zona 1, ' +
    'entrega al día siguiente en el resto de AMBA, y PAQ.AR Clásico o Prioritario para las ' +
    'zonas 2, 3 y 4 del resto del país. Beneficios: reducí costos operativos y logísticos, ' +
    'ganá tiempo, mejorá la experiencia de tus clientes y escalá tu negocio sin preocuparte ' +
    'por la logística.',
}
