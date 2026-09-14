import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { ReturnsForm } from '../../v1/components/ReturnsForm'
import styles from './ReturnsDialog.module.css'

type Props = {
  open: boolean
  onClose: () => void
}

/**
 * "Gestionar Devolución" en un modal. Usa `<dialog>` nativo con `showModal()`:
 * el navegador resuelve el foco atrapado, el cierre con Esc, el fondo inerte y
 * la devolución del foco al CTA que lo abrió.
 *
 * El contenido es el mismo `ReturnsForm` de la sección de la v1.
 */
export function ReturnsDialog({ open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby="returns-dialog-title"
      // Esc cierra el diálogo nativo sin pasar por React: se avisa al padre para
      // que el estado (el hash de la URL) acompañe.
      onClose={() => {
        if (open) onClose()
      }}
      // El cierre nativo con Esc exige que el evento traiga su código de tecla
      // (27); los teclados virtuales y la automatización a veces no lo mandan.
      // Atenderlo acá hace que Esc cierre siempre, pase por donde pase.
      onKeyDown={(event) => {
        if (event.key !== 'Escape') return
        event.preventDefault()
        onClose()
      }}
      // Un clic sobre el fondo llega con el propio <dialog> como target; los
      // clics sobre el contenido llegan con un hijo.
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className={styles.content}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar">
          <X size={24} aria-hidden />
        </button>
        <ReturnsForm fieldId="tracking-code-dialog" titleAs="h2" titleId="returns-dialog-title" />
      </div>
    </dialog>
  )
}
