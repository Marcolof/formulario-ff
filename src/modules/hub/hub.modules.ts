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
      'Las versiones navegables de la landing. La versión 1 replica el layout original y es la referencia contra la que se comparan las propuestas.',
    meta: 'Versión 1 vigente · versión 2 pendiente',
    route: '/prototipo',
    state: 'review',
    stateLabel: 'En revisión',
  },
  {
    index: '02',
    title: 'Documentación',
    summary:
      'Contexto del requerimiento, procedencia de las fuentes, sistema de color y tokens, registro de cambios y arquitectura del proyecto.',
    meta: '7 documentos',
    route: '/documentacion',
    state: 'approved',
    stateLabel: 'Vigente',
  },
]
