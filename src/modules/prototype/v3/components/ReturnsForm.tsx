import { useState } from 'react'

import { Button } from './Button'
import { OutlinedField } from './OutlinedField'
import styles from './ReturnsForm.module.css'

/**
 * Contenido de "Gestionar Devolución": textos, campo y botón. Es la única fuente
 * de ese copy — la v1 lo muestra como sección de la landing (`ReturnsSection`) y
 * la v2 lo abre dentro de un modal.
 *
 * Devuelve un fragmento para que el contenedor decida el layout: en la v1 los
 * elementos siguen siendo hijos directos del panel original y la réplica no cambia.
 */
type Props = {
  fieldId: string
  /** La v1 replica el `<p>` del original; en el modal el título es el encabezado del diálogo. */
  titleAs?: 'p' | 'h2'
  titleId?: string
}

export function ReturnsForm({ fieldId, titleAs: Title = 'p', titleId }: Props) {
  const [code, setCode] = useState('')

  return (
    <>
      <Title className={styles.title} id={titleId}>
        Gestionar Devolución
      </Title>
      <p className={styles.lead}>
        Ingresá el código de seguimiento del paquete que querés devolver.
      </p>
      <p className={styles.note}>
        Recordá que el paquete debe estar entregado para poder realizar la devolución.
      </p>

      <div className={styles.form}>
        <div className={styles.fieldColumn}>
          <OutlinedField
            id={fieldId}
            label="Código de seguimiento"
            value={code}
            onChange={setCode}
          />
          <button type="button" className={styles.helpLink}>
            ¿Dónde encuentro mi código de seguimiento?
          </button>
        </div>
        <Button type="button" className={styles.submit}>
          Continuar
        </Button>
      </div>
    </>
  )
}
