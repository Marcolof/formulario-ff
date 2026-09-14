import { useState } from 'react'

import menuIcon from '@/assets/icons/menu.svg'
import logoMiCorreo from '@/assets/logos/logo-mi-correo.svg'

import { navLinks } from '../data/landing.content'
import styles from './Navbar.module.css'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.header} id="navbar">
      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.burger}
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <img src={menuIcon} alt="" />
        </button>

        <a className={styles.brand} href="/landing">
          <img src={logoMiCorreo} alt="Correo Argentino MiCorreo" width={197} height={28} />
        </a>

        <nav className={styles.menu}>
          {navLinks.map((link) => (
            <a key={link.label} className={styles.menuLink} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className={open ? styles.drawerOpen : styles.drawer}>
        <div className={styles.drawerInner}>
          {navLinks.map((link) => (
            <a key={link.label} className={styles.drawerLink} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
