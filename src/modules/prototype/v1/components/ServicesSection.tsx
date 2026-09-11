import { Link } from 'react-router-dom'

import { services } from '../data/landing.content'
import { SectionHeading } from './SectionHeading'
import styles from './ServicesSection.module.css'

export function ServicesSection() {
  return (
    <section className={styles.section}>
      <SectionHeading>Conocé nuestros servicios</SectionHeading>

      <div className={styles.container}>
        <div className={styles.list}>
          {services.map((service, index) => (
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
                {service.internal ? (
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
          ))}
        </div>
      </div>
    </section>
  )
}
