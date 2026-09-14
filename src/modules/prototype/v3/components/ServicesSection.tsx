import { Link } from 'react-router-dom'

import { services, type ServiceId } from '../data/landing.content'
import { SectionHeading } from './SectionHeading'
import styles from './ServicesSection.module.css'

type Props = {
  /**
   * Destinos que reemplazan al del dato. Sin la prop —como en la v1— cada CTA
   * navega adonde dice `landing.content.ts`. La v3 la usa para llevar
   * Fulfillment a su propia pantalla sin duplicar los datos de la landing.
   */
  hrefs?: Partial<Record<ServiceId, string>>
}

export function ServicesSection({ hrefs }: Props) {
  return (
    <section className={styles.section}>
      <SectionHeading>Conocé nuestros servicios</SectionHeading>

      <div className={styles.container}>
        <div className={styles.list}>
          {services.map((service, index) => {
            const href = hrefs?.[service.id] ?? service.href
            const internal = service.internal || href.startsWith('/')

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
                {internal ? (
                  <Link className={styles.cta} to={href}>
                    <p className={styles.ctaLabel}>{service.cta}</p>
                  </Link>
                ) : (
                  <a className={styles.cta} href={href}>
                    <p className={styles.ctaLabel}>{service.cta}</p>
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
