/**
 * Los documentos viven en `documentation/` en la raíz del proyecto y se importan
 * como texto crudo: hay una única fuente editable, no una copia dentro de `src`.
 */
import arquitectura from '../../../documentation/06-ARQUITECTURA-Y-RUTAS.md?raw'
import formulario from '../../../documentation/07-FORMULARIO-FULFILLMENT.md?raw'
import propuestaV2 from '../../../documentation/08-PROPUESTA-V2.md?raw'
import propuestaV3 from '../../../documentation/09-PROPUESTA-V3.md?raw'
import cambios from '../../../documentation/05-REGISTRO-DE-CAMBIOS.md?raw'
import color from '../../../documentation/03-COLOR-Y-TOKENS.md?raw'
import contexto from '../../../documentation/01-CONTEXTO.md?raw'
import fuentes from '../../../documentation/02-FUENTES.md?raw'
import replica from '../../../documentation/04-REPLICA-LANDING.md?raw'

export type Doc = {
  id: string
  index: string
  title: string
  summary: string
  fileName: string
  content: string
}

export const documents: Doc[] = [
  {
    id: 'contexto',
    index: '01',
    title: 'Contexto',
    summary:
      'Requerimiento inicial, objetivo principal y secundario, campos del formulario, hipótesis a validar y pendientes de definición.',
    fileName: '01-CONTEXTO.md',
    content: contexto,
  },
  {
    id: 'fuentes',
    index: '02',
    title: 'Fuentes',
    summary:
      'De dónde salió cada insumo: el proyecto de Envío Internacional, el HTML guardado de la landing y la landing en producción.',
    fileName: '02-FUENTES.md',
    content: fuentes,
  },
  {
    id: 'color-y-tokens',
    index: '03',
    title: 'Color y tokens',
    summary:
      'Las tres capas de tokens, las primitivas de marca, las superficies y la tipografía, con la regla de qué puede consumir un componente.',
    fileName: '03-COLOR-Y-TOKENS.md',
    content: color,
  },
  {
    id: 'replica-landing',
    index: '04',
    title: 'Réplica de la landing',
    summary:
      'Cómo se reconstruyó la landing, las medidas capturadas, la verificación contra producción y las diferencias conocidas.',
    fileName: '04-REPLICA-LANDING.md',
    content: replica,
  },
  {
    id: 'registro-de-cambios',
    index: '05',
    title: 'Registro de cambios',
    summary:
      'Qué se tomó de cada fuente externa y qué se modificó al portarlo, para armar la PR de desarrollo sin rehacer el razonamiento.',
    fileName: '05-REGISTRO-DE-CAMBIOS.md',
    content: cambios,
  },
  {
    id: 'arquitectura-y-rutas',
    index: '06',
    title: 'Arquitectura y rutas',
    summary:
      'Cómo está armado el monorepo, el mapa de rutas del Hub, la regla de una sola fuente editable y el aislamiento de estilos entre módulos.',
    fileName: '06-ARQUITECTURA-Y-RUTAS.md',
    content: arquitectura,
  },
  {
    id: 'formulario-fulfillment',
    index: '07',
    title: 'Formulario Fulfillment',
    summary:
      'Especificación funcional del formulario: campos, validaciones, estados, textos, dependencia del número de cliente y qué falta definir.',
    fileName: '07-FORMULARIO-FULFILLMENT.md',
    content: formulario,
  },
  {
    id: 'propuesta-v2',
    index: '08',
    title: 'Versión 2 — Carrusel de servicios',
    summary:
      'Qué cambia en la landing de la v2: el carrusel de servicios en panel navy, el modal de devolución, los accesos rápidos, qué se mantiene y qué queda por validar.',
    fileName: '08-PROPUESTA-V2.md',
    content: propuestaV2,
  },
  {
    id: 'propuesta-v3',
    index: '09',
    title: 'Versión 3 — Pantalla propia de Fulfillment',
    summary:
      'La landing de la v1 con el acceso llevando a una pantalla de front propio: hero con banner, servicios en dos columnas, formulario a dos columnas y beneficios.',
    fileName: '09-PROPUESTA-V3.md',
    content: propuestaV3,
  },
]

export function findDocument(id: string | undefined): Doc | undefined {
  return documents.find((doc) => doc.id === id)
}
