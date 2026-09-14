import { Navbar } from '../../v1/components/Navbar'
import { SiteFooter } from '../../v1/components/SiteFooter'
import '../../prototype.tokens.css'
import { benefits, closing, hero, serviceGroups } from '../data/v3.content'
import './fulfillment.tokens.css'
import { FulfillmentForm } from './FulfillmentForm'
import styles from './FulfillmentPage.module.css'

/**
 * Pantalla de Fulfillment de la v3: un front propio, distinto del sistema visual
 * de la landing, según el diseño de Figma "Mi Correo 2.0" (nodo 13284:7345).
 *
 * Lo único que comparte con la landing es la barra superior y el footer, así que
 * la página declara los dos ámbitos de estilo: `data-module="prototype"` para
 * esos dos componentes y `data-page="fulfillment-v3"` para lo suyo.
 */
export function FulfillmentPage() {
  return (
    <div className={styles.page} data-module="prototype" data-page="fulfillment-v3">
      <Navbar />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <h1 className={styles.heroTitle}>{hero.title}</h1>
              <p className={styles.heroSubtitle}>{hero.subtitle}</p>
            </div>
            <div className={styles.heroMedia}>
              <img src={hero.image} alt={hero.imageAlt} />
            </div>
          </div>
        </section>

        <section className={styles.detail}>
          {serviceGroups.map((group) => (
            <div className={styles.group} key={group.id}>
              <h2
                className={`${styles.groupHeading} ${
                  group.tone === 'navy' ? styles.groupHeadingNavy : styles.groupHeadingYellow
                }`}
              >
                {group.heading[0]}
                <br />
                {group.heading[1]}
              </h2>
              <ul className={styles.services}>
                {group.items.map((service) => {
                  const Icon = service.icon
                  return (
                    <li className={styles.service} key={service.title}>
                      <span className={styles.serviceIcon}>
                        <Icon size={42} strokeWidth={1.5} aria-hidden />
                      </span>
                      <div className={styles.serviceText}>
                        <h3 className={styles.serviceTitle}>{service.title}</h3>
                        <p className={styles.serviceBody}>{service.body}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </section>

        <section className={styles.formSection} id="formulario">
          <FulfillmentForm />
        </section>

        <section className={styles.benefits}>
          <div className={styles.benefitsBox}>
            <h2 className={styles.benefitsLabel}>{benefits.label}</h2>
            <ul className={styles.benefitList}>
              {benefits.items.map((item) => {
                const Icon = item.icon
                return (
                  <li className={styles.benefit} key={item.title}>
                    <span className={styles.benefitIcon}>
                      <Icon size={42} strokeWidth={1.5} aria-hidden />
                    </span>
                    <p className={styles.benefitTitle}>{item.title}</p>
                    <p className={styles.benefitBody}>{item.body}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        <section className={styles.closing}>
          <p className={styles.closingText}>
            {closing.lead}
            <span className={styles.closingHighlight}>{closing.highlight}</span>
            <br />
            <span className={styles.closingHighlight}>{closing.second}</span>
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
