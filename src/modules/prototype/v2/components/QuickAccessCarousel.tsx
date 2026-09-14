import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import buttonStyles from '../../v1/components/Button.module.css'
import { quickAccess, servicesTitle, type QuickAccess } from '../data/quickAccess.content'
import styles from './QuickAccessCarousel.module.css'

const TRACK_ID = 'servicios-track'

type Props = {
  onOpenReturns: () => void
}

/**
 * Carrusel "Conocé nuestros servicios" de la v2. Ocupa el lugar que en la v1
 * tenían "Gestionar Devolución" y la grilla de servicios, y los reúne en un
 * panel navy con tarjetas blancas, según la referencia de diseño del usuario.
 *
 * Scroll horizontal nativo con snap por tarjeta: en touch se arrastra con el
 * dedo y en escritorio las flechas avanzan de a una página. Las flechas se
 * ocultan en los extremos para que no ofrezcan una acción que no hace nada.
 */
export function QuickAccessCarousel({ onOpenReturns }: Props) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const updateEdges = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const max = track.scrollWidth - track.clientWidth
    setEdges({ start: track.scrollLeft <= 1, end: track.scrollLeft >= max - 1 })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    updateEdges()

    // El ancho real del track llega después del primer render (hojas de estilo
    // y fuentes). Sin observarlo, los extremos quedan calculados sobre un ancho
    // de 0 y la flecha de avance nace deshabilitada. Se observan también las
    // tarjetas: si su alto o ancho cambia, cambia el scroll disponible.
    const observer = new ResizeObserver(updateEdges)
    observer.observe(track)
    for (const slide of track.children) observer.observe(slide)

    window.addEventListener('resize', updateEdges)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateEdges)
    }
  }, [updateEdges])

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: direction * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <section className={styles.section} aria-roledescription="carrusel" aria-label={servicesTitle}>
      <div className={styles.panel}>
        <h2 className={styles.heading}>{servicesTitle}</h2>

        <div className={styles.viewport}>
          <button
            type="button"
            className={styles.prev}
            onClick={() => scrollByPage(-1)}
            disabled={edges.start}
            aria-controls={TRACK_ID}
            aria-label="Ver servicios anteriores"
          >
            <ChevronLeft size={20} aria-hidden />
          </button>

          <ul className={styles.track} id={TRACK_ID} ref={trackRef} onScroll={updateEdges}>
            {quickAccess.map((item) => (
              <li className={styles.slide} key={item.id}>
                <QuickAccessCard item={item} onOpenReturns={onOpenReturns} />
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={styles.next}
            onClick={() => scrollByPage(1)}
            disabled={edges.end}
            aria-controls={TRACK_ID}
            aria-label="Ver más servicios"
          >
            <ChevronRight size={20} aria-hidden />
          </button>
        </div>
      </div>
    </section>
  )
}

function QuickAccessCard({ item, onOpenReturns }: { item: QuickAccess; onOpenReturns: () => void }) {
  const Icon = item.icon
  const featured = Boolean(item.badge)

  // Hay varios "Ingresá": el nombre accesible suma el título para que cada CTA
  // se distinga fuera de contexto. Empieza por el texto visible.
  const label = `${item.cta}: ${item.title}`
  const className = featured ? `${buttonStyles.pill} ${styles.ctaPrimary}` : styles.cta
  // El texto va en su propio span para que el subrayado de marca (botón
  // terciario) quede sólo debajo de la palabra y no de la flecha.
  const content = featured ? (
    item.cta
  ) : (
    <>
      <span className={styles.ctaText}>{item.cta}</span>
      <ChevronRight size={18} aria-hidden />
    </>
  )

  let cta
  if (item.action.kind === 'returns') {
    cta = (
      <button type="button" className={className} onClick={onOpenReturns} aria-haspopup="dialog" aria-label={label}>
        {content}
      </button>
    )
  } else if (item.action.internal) {
    cta = (
      <Link className={className} to={item.action.href} aria-label={label}>
        {content}
      </Link>
    )
  } else {
    cta = (
      <a className={className} href={item.action.href} aria-label={label}>
        {content}
      </a>
    )
  }

  return (
    <article className={styles.card}>
      <span className={styles.icon}>
        <Icon size={22} aria-hidden />
      </span>
      <div className={styles.content}>
        <h3 className={styles.title}>{item.title}</h3>
        {item.badge ? <span className={styles.badge}>{item.badge}</span> : null}
        <p className={styles.body}>{item.body}</p>
        {cta}
      </div>
    </article>
  )
}
