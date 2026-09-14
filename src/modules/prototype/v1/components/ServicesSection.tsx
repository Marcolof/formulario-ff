import { Link } from 'react-router-dom'

import { services, type ServiceId } from '../data/landing.content'
import { SectionHeading } from './SectionHeading'
import styles from './ServicesSection.module.css'

type Props = {
  /**
   * CTAs que no navegan. El servicio indicado pasa a ser un botón que ejecuta
   * esta acción en vez de un enlace; se anuncia como que abre un diálogo, que
   * es para lo único que se usa hoy.
   *
   * Sin la prop —como en la v1— todos los CTA navegan igual que en la landing
   * original. La v3 la usa para abrir el flyer de Fulfillment en un modal.
   */
  actions?: Partial<Record<ServiceId, () => void>>
}

export function ServicesSection({ actions }: Props) {
  return (
    <section className={styles.section}>
      <SectionHeading>Conocé nuestros servicios</SectionHeading>

      <div className={styles.container}>
        <div className={styles.list}>
          {services.map((service, index) => {
            const action = actions?.[service.id]

            return (
            <article
              key={service.href}
              className={index % 2 === 1 ? styles.cardReversed : styles.card}
            >
              <div className={styles.content}>
                {service.logo ? (
                  <div
                    className={styles.logo}
                    style={
                      { '--service-logo-width': `${service.logoWidth}px` } as React.CSSProperties
                    }
                  >
                    <img src={service.logo} alt="" />
                  </div>
                ) : (
                  <div className={styles.logoLockup}>{service.logoText}</div>
                )}
                <p className={styles.body}>{service.body}</p>
                {action ? (
                  <button type="button" className={styles.cta} onClick={action} aria-haspopup="dialog">
                    <p>{service.cta}</p>
                  </button>
                ) : service.internal ? (
                  <Link className={styles.cta} to={service.href}>
                    <p>{service.cta}</p>
                  </Link>
                ) : (
                  <a className={styles.cta} href={service.href}>
                    <p>{service.cta}</p>
                  </a>
                )}
              </div>
              <div className={styles.media}>
                <img src={service.image} alt="" />
              </div>
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
