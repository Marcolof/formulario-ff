import { useState } from 'react'

import { Button } from './Button'
import { OutlinedField } from './OutlinedField'
import styles from './ReturnsSection.module.css'

export function ReturnsSection() {
  const [code, setCode] = useState('')

  return (
    <section className={styles.section} id="gestion-devolucion">
      <div className={styles.container}>
        <div className={styles.panel}>
          <p className={styles.title}>Gestionar Devolución</p>
          <p className={styles.lead}>
            Ingresá el código de seguimiento del paquete que querés devolver.
          </p>
          <p className={styles.note}>
            Recordá que el paquete debe estar entregado para poder realizar la devolución.
          </p>

          <div className={styles.form}>
            <div className={styles.fieldColumn}>
              <OutlinedField
                id="tracking-code"
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
        </div>
      </div>
    </section>
  )
}
