import { Link } from 'react-router-dom'

import logoMiCorreo from '@/assets/logos/logo-mi-correo.svg'
import '@/app/shell.tokens.css'

import { modules } from './hub.modules'
import styles from './HubPage.module.css'

export function HubPage() {
  return (
    <div className={styles.page} data-shell="formulario-ff">
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <img className={styles.logo} src={logoMiCorreo} alt="Correo Argentino MiCorreo" />
          <p className={styles.eyebrow}>Correo Argentino · MiCorreo</p>
          <h1 className={styles.title}>Formulario FF</h1>
          <p className={styles.subtitle}>
            Página de Fulfillment con formulario de contacto dentro del ecosistema MiCorreo.
            Desde acá se entra a cada módulo del proyecto.
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <ul className={styles.grid}>
          {modules.map((module) => (
            <li key={module.route}>
              <Link className={styles.card} to={module.route}>
                <div className={styles.cardHead}>
                  <span className={styles.index}>{module.index}</span>
                  <span className={styles[module.state]}>{module.stateLabel}</span>
                </div>
                <h2 className={styles.cardTitle}>{module.title}</h2>
                <p className={styles.cardSummary}>{module.summary}</p>
                <p className={styles.cardMeta}>{module.meta}</p>
                <span className={styles.cardAction}>Abrir módulo →</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className={styles.footer}>
        <p>Prototipo interno de UX. Sin datos reales ni backend.</p>
      </footer>
    </div>
  )
}
