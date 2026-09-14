import { ReturnsForm } from './ReturnsForm'
import styles from './ReturnsSection.module.css'

export function ReturnsSection() {
  return (
    <section className={styles.section} id="gestion-devolucion">
      <div className={styles.container}>
        <div className={styles.panel}>
          <ReturnsForm fieldId="tracking-code" />
        </div>
      </div>
    </section>
  )
}
