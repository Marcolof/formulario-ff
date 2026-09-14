import { createContext, useContext } from 'react'

/**
 * Casos de uso que el prototipo puede simular desde el panel de tweaks.
 *
 * - `happy`: comportamiento real del formulario. Si los datos son válidos, se
 *   envía y aparece el estado de éxito.
 * - `error`: el envío nunca prospera. Al pulsar "Enviar" se muestran los errores
 *   —los reales de cada campo, si los hay— más un mensaje general del
 *   formulario, para poder revisar ese estado sin tener que romper los datos a
 *   mano.
 */
export type UseCase = 'happy' | 'error'

export const USE_CASES: { id: UseCase; label: string; hint: string }[] = [
  {
    id: 'happy',
    label: 'Happy path',
    hint: 'El formulario se envía y aparece el estado de éxito.',
  },
  {
    id: 'error',
    label: 'Error de formulario',
    hint: 'Al pulsar "Enviar" se muestra el estado de error.',
  },
]

/**
 * Sólo lectura para quien consume: el único que cambia el caso es el panel de
 * `PrototypeChrome`. El valor por defecto es el comportamiento real, así que una
 * pantalla montada fuera del chrome (tests, Storybook) funciona sin envolver.
 */
export const SimulationContext = createContext<{ useCase: UseCase }>({ useCase: 'happy' })

export function useSimulation() {
  return useContext(SimulationContext)
}
