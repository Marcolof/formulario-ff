import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import styles from './PrototypeChrome.module.css'
import { SimulationContext, USE_CASES, type UseCase } from './simulation'

/**
 * Envuelve un artefacto del prototipo sin tocar su marcado. La réplica de la
 * landing tiene que quedar idéntica al original, así que los controles del
 * prototipo viven acá afuera y no dentro de la página replicada.
 *
 * El botón flotante abre un menú con dos caminos: volver al Hub y simular casos
 * de uso. El caso elegido viaja por contexto —no por props— porque lo consume
 * el formulario, que está varios niveles abajo dentro de `children`.
 */
export function PrototypeChrome({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [useCase, setUseCase] = useState<UseCase>('happy')
  const chromeRef = useRef<HTMLDivElement>(null)

  // La identidad del valor sólo cambia cuando cambia el caso: sin esto, cada
  // apertura del menú re-renderizaría todo lo que consume el contexto.
  const simulation = useMemo(() => ({ useCase }), [useCase])

  // El menú se cierra al tocar fuera o con Escape; el panel se cierra sólo con
  // su propio botón, para poder comparar casos mientras se usa la pantalla.
  useEffect(() => {
    if (!menuOpen) return

    const onPointerDown = (event: PointerEvent) => {
      if (!chromeRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <SimulationContext.Provider value={simulation}>
      {children}

      <div className={styles.chrome} ref={chromeRef}>
        {panelOpen ? (
          <section className={styles.panel} aria-label="Casos de uso">
            <header className={styles.panelHead}>
              <h2 className={styles.panelTitle}>Casos de uso</h2>
              <button
                className={styles.panelClose}
                type="button"
                onClick={() => setPanelOpen(false)}
                aria-label="Cerrar el panel de casos de uso"
              >
                ✕
              </button>
            </header>
            <div className={styles.chips} role="radiogroup" aria-label="Caso de uso activo">
              {USE_CASES.map((item) => (
                <button
                  className={styles.chip}
                  type="button"
                  key={item.id}
                  role="radio"
                  aria-checked={useCase === item.id}
                  onClick={() => setUseCase(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className={styles.panelHint}>
              {USE_CASES.find((item) => item.id === useCase)?.hint}
            </p>
          </section>
        ) : null}

        {menuOpen ? (
          <div className={styles.menu} role="menu">
            <Link className={styles.menuItem} role="menuitem" to="/prototipo">
              Volver al hub
            </Link>
            <button
              className={styles.menuItem}
              type="button"
              role="menuitem"
              onClick={() => {
                setPanelOpen(true)
                setMenuOpen(false)
              }}
            >
              Simular casos de uso
            </button>
          </div>
        ) : null}

        <button
          className={styles.trigger}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
        >
          <span aria-hidden="true">☰</span> Prototipo
        </button>
      </div>
    </SimulationContext.Provider>
  )
}
