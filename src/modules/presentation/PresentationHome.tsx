import { ModuleLayout } from '@/app/ModuleLayout'

import styles from './PresentationHome.module.css'

const DECK_HREF = '/presentacion/presentacion.html'

/**
 * Landing del módulo Presentación. El deck en sí no es una pantalla de la
 * SPA: es un HTML autocontenido (CSS y JS inline, sin dependencias externas
 * salvo Gilroy local), servido como archivo estático en `public/presentacion/`
 * para quedar bajo la misma URL y el mismo build que el resto del proyecto —
 * ver `documentation/06-ARQUITECTURA-Y-RUTAS.md`. "Volver al hub" en cada
 * slide del deck vuelve acá mismo, a "/".
 */
export function PresentationHome() {
  return (
    <ModuleLayout
      title="Presentación"
      summary="El deck para mostrarle la propuesta al cliente y al equipo: qué pidió el requerimiento y cómo se ve la solución — el acceso desde la landing, la página de Fulfillment y su formulario de contacto."
    >
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={styles.head}>
            <h2 className={styles.title}>Fulfillment: del requerimiento a la pantalla</h2>
            <span className={styles.review}>Vigente · en revisión</span>
          </div>
          <p className={styles.summary}>
            10 slides. Primero el requerimiento —qué se pidió, el flujo esperado y los datos
            que pide el formulario—, después la propuesta final con capturas reales: el
            acceso, la página del servicio, el formulario y el cierre. Termina con lo que
            falta definir. Se navega con los botones del pie, las flechas del teclado o
            deslizando en mobile.
          </p>
          <dl className={styles.facts}>
            <div>
              <dt>Formato</dt>
              <dd>Un solo HTML, sin dependencias externas</dd>
            </div>
            <div>
              <dt>Fuente</dt>
              <dd>Gilroy (la misma del proyecto)</dd>
            </div>
            <div>
              <dt>Capturas</dt>
              <dd>Del prototipo real, no simuladas</dd>
            </div>
          </dl>
          <div className={styles.actions}>
            <a className={styles.primary} href={DECK_HREF} target="_blank" rel="noopener noreferrer">
              Abrir la presentación
            </a>
          </div>
        </li>
      </ul>

      <div className={styles.note}>
        <p className={styles.noteTitle}>Qué es y qué no es este módulo</p>
        <ul>
          <li>
            <strong>El deck habla del requerimiento y de la propuesta, no de esta maqueta.</strong>{' '}
            El Hub, los módulos y la documentación son el andamiaje con el que mostramos el
            trabajo — no son tema de la presentación, así que no aparecen en los slides.
          </li>
          <li>
            El deck es un archivo estático (<code>public/presentacion/presentacion.html</code>),
            no una ruta de React: se abre como página completa, en una pestaña nueva, y no
            comparte el router de la SPA.
          </li>
          <li>
            Vive bajo la misma URL y el mismo build que el Hub, el Prototipo y la
            Documentación — no es un proyecto ni un despliegue aparte.
          </li>
          <li>
            Las capturas son estáticas: no se puede interactuar con ellas dentro del deck.
            Para probar el producto de verdad, usá el módulo Prototipo.
          </li>
        </ul>
      </div>
    </ModuleLayout>
  )
}
