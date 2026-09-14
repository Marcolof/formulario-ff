import { Fragment } from 'react'

import logoMiCorreo from '@/assets/logos/logo-mi-correo.svg'

import { footerColumns, socialLinks } from '../data/landing.content'
import styles from './SiteFooter.module.css'

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.columns}>
          {footerColumns.map((column) => (
            <Fragment key={column.title}>
              <div className={styles.column}>
                <p className={styles.columnTitle}>{column.title}</p>
                <div className={styles.links}>
                  {column.links.map((link) => (
                    <a className={styles.link} href={link.href} key={link.label}>
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
              <hr className={styles.separator} />
            </Fragment>
          ))}

          <div className={styles.socialColumn}>
            <p className={styles.columnTitle}>REDES SOCIALES</p>
            <div className={styles.social}>
              {socialLinks.map((social) => (
                <a href={social.href} key={social.label}>
                  <img src={social.icon} alt={social.label} />
                </a>
              ))}
            </div>
          </div>

          <hr className={styles.separator} />

          <div className={styles.bottom}>
            <div className={styles.bottomInner}>
              <img
                className={styles.bottomLogo}
                src={logoMiCorreo}
                alt="Correo Argentino MiCorreo"
              />
              <span className={styles.legal}>
                Correo Oficial de la<span> República Argentina</span>
                {/* El original cambia el remate según el ancho: en una línea con
                    guion en escritorio, partido en dos líneas en mobile. */}
                <span className={styles.legalStacked}>
                  <span>Todos los derechos</span>
                  <span>reservados</span>
                </span>
                <span className={styles.legalInline}> - Todos los derechos reservados</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
