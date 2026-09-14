import { Link } from 'react-router-dom'

import { ModuleLayout } from '@/app/ModuleLayout'

import styles from './PrototypeHome.module.css'

export function PrototypeHome() {
  return (
    <ModuleLayout
      title="Prototipo navegable"
      summary="Las versiones navegables de la landing de MiCorreo. La versión 1 conserva el layout original y es la referencia contra la que se comparan las propuestas. La versión 2 reorganiza el bloque central en un carrusel; la versión 3 deja la landing igual y muestra el flyer de Fulfillment en un visor."
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

        <li className={styles.item}>
          <div className={styles.head}>
            <h2 className={styles.title}>Versión 2 — carrusel de servicios</h2>
            <span className={styles.draft}>Propuesta · borrador</span>
          </div>
          <p className={styles.summary}>
            Propuesta de alto impacto sobre la landing. El hero se mantiene; "Gestionar
            Devolución" y los servicios pasan a un carrusel en panel navy, con Fulfillment
            destacado y la devolución en un modal. "Accesos directos" se renombra "Accesos
            rápidos". La página de Fulfillment es la misma de la versión 1.
          </p>
          <dl className={styles.facts}>
            <div>
              <dt>Cambia</dt>
              <dd>Sólo el bloque central de la landing</dd>
            </div>
            <div>
              <dt>Se mantiene</dt>
              <dd>Hero, Sucursales y Seguimiento, por qué elegirnos, footer y Fulfillment</dd>
            </div>
            <div>
              <dt>Referencia</dt>
              <dd>Imagen de diseño del usuario y wireframe del requerimiento</dd>
            </div>
          </dl>
          <div className={styles.actions}>
            <Link className={styles.primary} to="/prototipo/v2">
              Abrir versión 2
            </Link>
            <Link className={styles.secondary} to="/prototipo/v2#gestion-devolucion">
              Abrir con el modal de devolución
            </Link>
          </div>
        </li>

        <li className={styles.item}>
          <div className={styles.head}>
            <h2 className={styles.title}>Versión 3 — pantalla propia de Fulfillment</h2>
            <span className={styles.draft}>Propuesta · borrador</span>
          </div>
          <p className={styles.summary}>
            La landing es la de la versión 1, pero el acceso a Fulfillment lleva a una
            pantalla con front propio, distinto del sistema visual de la landing: hero navy
            con el banner, servicios en dos columnas, formulario a dos columnas y beneficios.
            Conserva la barra superior y el footer.
          </p>
          <dl className={styles.facts}>
            <div>
              <dt>Cambia</dt>
              <dd>Sólo el destino del acceso a Fulfillment</dd>
            </div>
            <div>
              <dt>Diseño</dt>
              <dd>Figma "Mi Correo 2.0", nodo 13284:7345</dd>
            </div>
            <div>
              <dt>Formulario</dt>
              <dd>Las mismas validaciones, en dos columnas</dd>
            </div>
          </dl>
          <div className={styles.actions}>
            <Link className={styles.primary} to="/prototipo/v3">
              Abrir versión 3
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
          <li>Validar con el área los textos breves de las tarjetas de la versión 2 y el orden del carrusel.</li>
          <li>Estados de envío en progreso y de error de servidor, que dependen de que haya backend.</li>
        </ul>
      </section>
    </ModuleLayout>
  )
}
