import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import logoMiCorreo from '@/assets/logos/logo-mi-correo.svg'

import './shell.tokens.css'
import styles from './ModuleLayout.module.css'

type Props = {
  title: string
  summary: string
  breadcrumb?: { label: string; to: string }
  children: ReactNode
}

export function ModuleLayout({ title, summary, breadcrumb, children }: Props) {
  return (
    <div className={styles.page} data-shell="formulario-ff">
      <header className={styles.header}>
        <Link className={styles.brand} to="/">
          <img src={logoMiCorreo} alt="" />
          <span>Formulario FF</span>
        </Link>
        <nav className={styles.breadcrumb}>
          <Link to="/">Hub</Link>
          {breadcrumb ? (
            <>
              <span aria-hidden="true">/</span>
              <Link to={breadcrumb.to}>{breadcrumb.label}</Link>
            </>
          ) : null}
          <span aria-hidden="true">/</span>
          <span className={styles.current}>{title}</span>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.intro}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.summary}>{summary}</p>
        </div>
        {children}
      </main>
    </div>
  )
}
