type ModuleCard = {
  index: string
  title: string
  summary: string
  meta: string
  route: string
  state: 'draft' | 'review' | 'approved'
  stateLabel: string
}

/**
 * Sólo módulos con una landing real y navegable.
 */
export const modules: ModuleCard[] = [
  {
    index: '01',
    title: 'Prototipo navegable',
    summary:
      'La landing navegable de MiCorreo, replicada del original, con el acceso a una pantalla de Fulfillment de front propio y su formulario de contacto.',
    meta: 'Versión 3, única vigente · en revisión',
    route: '/prototipo',
    state: 'review',
    stateLabel: 'En revisión',
  },
  {
    index: '02',
    title: 'Documentación',
    summary:
      'Contexto del requerimiento, procedencia de las fuentes, sistema de color y tokens, registro de cambios y arquitectura del proyecto.',
    meta: '8 documentos',
    route: '/documentacion',
    state: 'approved',
    stateLabel: 'Vigente',
  },
  {
    index: '03',
    title: 'Presentación',
    summary:
      'El deck para mostrarle la propuesta al cliente y al equipo: qué pidió el requerimiento y cómo se ve la solución, con capturas reales de las pantallas.',
    meta: '13 slides · en revisión',
    route: '/presentacion',
    state: 'review',
    stateLabel: 'En revisión',
  },
]
