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
 * Sólo módulos con una landing real y navegable. `presentation` existe como
 * carpeta pero todavía no tiene artefactos, así que no aparece acá.
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
]
