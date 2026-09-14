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
      'Las versiones navegables de la landing. La versión 1 replica el layout original; la versión 2 propone un carrusel de servicios con Fulfillment destacado; la versión 3 lleva a una pantalla de Fulfillment con front propio.',
    meta: 'Versión 1 en revisión · versiones 2 y 3 en borrador',
    route: '/prototipo',
    state: 'review',
    stateLabel: 'En revisión',
  },
  {
    index: '02',
    title: 'Documentación',
    summary:
      'Contexto del requerimiento, procedencia de las fuentes, sistema de color y tokens, registro de cambios y arquitectura del proyecto.',
    meta: '9 documentos',
    route: '/documentacion',
    state: 'approved',
    stateLabel: 'Vigente',
  },
]
