import { Link } from 'react-router-dom'

import { ModuleLayout } from '@/app/ModuleLayout'

import styles from './PrototypeHome.module.css'

export function PrototypeHome() {
  return (
    <ModuleLayout
      title="Prototipo navegable"
      summary="Las versiones navegables de la landing de MiCorreo. La versión 1 conserva el layout original y es la referencia contra la que se van a comparar las propuestas del Formulario FF."
    >
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={styles.head}>
            <h2 className={styles.title}>Versión 1 — layout original + Fulfillment</h2>
            <span className={styles.review}>Vigente · en revisión</span>
          </div>
          <p className={styles.summary}>
            La landing de producción replicada a partir de sus estilos computados, más lo que
            pide el requerimiento resuelto con el diseño actual: la tarjeta de Fulfillment en
            "Conocé nuestros servicios" y la página con el formulario de contacto.
          </p>
          <dl className={styles.facts}>
            <div>
              <dt>Fidelidad</dt>
              <dd>Alta, verificada contra producción</dd>
            </div>
            <div>
              <dt>Responsive</dt>
              <dd>Escritorio y mobile replicados</dd>
            </div>
            <div>
              <dt>Backend</dt>
              <dd>Ninguno: los formularios no envían</dd>
            </div>
          </dl>
          <div className={styles.actions}>
            <Link className={styles.primary} to="/prototipo/v1">
              Abrir versión 1
            </Link>
            <Link className={styles.secondary} to="/prototipo/v1/fulfillment">
              Ir directo a Fulfillment
            </Link>
          </div>
        </li>

        <li className={styles.planned}>
          <div className={styles.head}>
            <h2 className={styles.title}>Versión 2 — propuesta</h2>
            <span className={styles.draft}>Todavía no existe</span>
          </div>
          <p className={styles.summary}>
            Un front distinto sobre el mismo lenguaje visual: va a consumir los tokens,
            globales y componentes de este módulo, pero con la propuesta de layout y
            jerarquía que se defina para el Formulario FF.
          </p>
        </li>
      </ul>

      <section className={styles.note}>
        <h2 className={styles.noteTitle}>Qué falta en este módulo</h2>
        <ul>
          <li>Assets de marca de Fulfillment: hoy el logo es un lockup tipográfico y la ilustración está dibujada con la paleta de MiCorreo.</li>
          <li>Listado definitivo de rubros y reglas de formato del celular y del número de cliente.</li>
          <li>Estados de envío en progreso y de error de servidor, que dependen de que haya backend.</li>
        </ul>
      </section>
    </ModuleLayout>
  )
}
