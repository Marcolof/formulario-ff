import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import styles from './PrototypeChrome.module.css'

/**
 * Envuelve un artefacto del prototipo sin tocar su marcado. La réplica de la
 * landing tiene que quedar idéntica al original, así que el regreso al Hub vive
 * acá afuera y no dentro de la página replicada.
 */
export function PrototypeChrome({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Link className={styles.back} to="/prototipo">
        <span aria-hidden="true">←</span> Volver al Hub
      </Link>
    </>
  )
}
