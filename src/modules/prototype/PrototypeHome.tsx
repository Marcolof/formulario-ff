import { Link } from 'react-router-dom'

import { ModuleLayout } from '@/app/ModuleLayout'

import styles from './PrototypeHome.module.css'

export function PrototypeHome() {
  return (
    <ModuleLayout
      title="Prototipo navegable"
      summary="La versión navegable de la landing de MiCorreo con el acceso a Fulfillment. La landing replica la de producción; el acceso a Fulfillment lleva a una pantalla con front propio, según el diseño de Figma."
    >
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={styles.head}>
            <h2 className={styles.title}>Versión 3 — pantalla propia de Fulfillment</h2>
            <span className={styles.review}>Vigente · en revisión</span>
          </div>
          <p className={styles.summary}>
            La landing replica la de producción a partir de sus estilos computados. El acceso a
            Fulfillment lleva a una pantalla con front propio, distinto del sistema visual de la
            landing: hero navy con el banner, servicios en dos columnas, formulario a dos
            columnas y beneficios. Conserva la barra superior y el footer.
          </p>
          <dl className={styles.facts}>
            <div>
              <dt>Fidelidad</dt>
              <dd>Landing verificada contra producción</dd>
            </div>
            <div>
              <dt>Diseño</dt>
              <dd>Figma "Mi Correo 2.0", nodo 13284:7345</dd>
            </div>
            <div>
              <dt>Backend</dt>
              <dd>Ninguno: el formulario no envía</dd>
            </div>
          </dl>
          <div className={styles.actions}>
            <Link className={styles.primary} to="/prototipo/v3">
              Abrir la landing
            </Link>
            <Link className={styles.secondary} to="/prototipo/v3/fulfillment">
              Ir directo a Fulfillment
            </Link>
          </div>
        </li>
      </ul>

      <section className={styles.note}>
        <h2 className={styles.noteTitle}>Qué falta en este módulo</h2>
        <ul>
          <li>Assets de marca de Fulfillment: hoy el logo es un lockup tipográfico y la ilustración está dibujada con la paleta de MiCorreo.</li>
          <li>Estados de envío en progreso y de error de servidor, que dependen de que haya backend. El panel de casos de uso simula el error de validación, no el del servidor.</li>
        </ul>
      </section>
    </ModuleLayout>
  )
}
