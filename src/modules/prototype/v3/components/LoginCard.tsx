import { useState } from 'react'

import { Button } from './Button'
import styles from './LoginCard.module.css'

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7M2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2m4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3z"
      />
    </svg>
  )
}

export function LoginCard() {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className={styles.card}>
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <p className={styles.title}>Ingresá a tu cuenta</p>
        </div>

        <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
          <div className={styles.fields}>
            <div className={styles.field}>
              <input name="email" type="text" placeholder="Correo electrónico" />
            </div>

            <div className={styles.field}>
              <input
                name="password"
                type={revealed ? 'text' : 'password'}
                placeholder="Contraseña"
              />
              <button
                type="button"
                className={styles.adornment}
                aria-label="Mostrar contraseña"
                onClick={() => setRevealed((value) => !value)}
              >
                <EyeOffIcon />
              </button>
            </div>

            <div className={styles.forgotRow}>
              <p className={styles.forgot}>¿Olvidaste tu contraseña?</p>
            </div>

            <div className={styles.submitRow}>
              <Button type="submit" size="lg" className={styles.submit}>
                Ingresar
              </Button>
            </div>
          </div>
        </form>

        <div className={styles.registerRow}>
          <div className={styles.divider} />
          <span className={styles.registerLabel}>¿Aún no tenés cuenta?</span>
          <span className={styles.registerAction}>Registrarme</span>
        </div>
      </div>
    </div>
  )
}
