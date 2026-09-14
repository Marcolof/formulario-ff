import { useEffect, useRef, useState, type CSSProperties } from 'react'

/**
 * Micro interacción de scroll de la pantalla de Fulfillment (v3): cada elemento
 * que la usa aparece de abajo hacia arriba, de opacidad 0 a 100, la primera vez
 * que entra en pantalla. No depende de ninguna librería: `IntersectionObserver`
 * ya resuelve "¿está entrando en pantalla?" sin escuchar el evento `scroll` a
 * mano.
 *
 * El hero queda afuera a propósito — el pedido fue que se vea desde el
 * arranque, así que ningún elemento del hero usa este hook.
 *
 * `delayMs` sirve para escalonar elementos que entran juntos (las dos columnas
 * de servicios, las tarjetas de beneficios): cada uno dispara su propio
 * observer, pero el retraso hace que no aparezcan todos en el mismo instante.
 */
export function useReveal(delayMs = 0) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Sin soporte de IntersectionObserver, o con "reducir movimiento"
    // activado: se muestra directo, sin animar.
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        // Una sola vez: no hace falta seguir observando después de aparecer.
        observer.disconnect()
      },
      // Dispara un poco antes de que el elemento toque el borde inferior, para
      // que la animación no se sienta atrasada respecto del scroll.
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
  }

  return { ref, style } as const
}
