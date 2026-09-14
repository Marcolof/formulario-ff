import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import '../../prototype.tokens.css'
import { benefits, closing, hero, serviceGroups } from '../data/v3.content'
import './fulfillment.tokens.css'
import { FulfillmentForm } from './FulfillmentForm'
import styles from './FulfillmentPage.module.css'
import { useReveal } from './useReveal'

/**
 * Pantalla de Fulfillment de la v3: un front propio, distinto del sistema visual
 * de la landing, según el diseño de Figma "Mi Correo 2.0" (nodo 13284:7345).
 *
 * Lo único que comparte con la landing es la barra superior y el footer, así que
 * la página declara los dos ámbitos de estilo: `data-module="prototype"` para
 * esos dos componentes y `data-page="fulfillment-v3"` para lo suyo.
 *
 * Todo lo que no es el hero aparece con `useReveal` a medida que entra en
 * pantalla (pedido del usuario, 2026-09-14): el hero se ve completo desde el
 * arranque, sin animación.
 *
 * `serviceGroups` y `benefits.items` son constantes importadas de tamaño fijo
 * (2 y 4 elementos respectivamente): llamar un hook por cada una, en vez de
 * dentro de los `.map()` de abajo, es seguro porque esa cantidad de llamadas
 * nunca cambia entre renders — no depende de props ni de estado.
 */
export function FulfillmentPage() {
  const groupReveals = [useReveal(), useReveal(120)]
  const formReveal = useReveal()
  const benefitReveals = [useReveal(), useReveal(90), useReveal(180), useReveal(270)]
  const closingReveal = useReveal()

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
          {serviceGroups.map((group, index) => (
            <div
              className={styles.group}
              key={group.id}
              ref={groupReveals[index].ref as React.Ref<HTMLDivElement>}
              style={groupReveals[index].style}
            >
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

        <section
          className={styles.formSection}
          id="formulario"
          ref={formReveal.ref as React.Ref<HTMLElement>}
          style={formReveal.style}
        >
          <FulfillmentForm />
        </section>

        <section className={styles.benefits}>
          <div className={styles.benefitsBox}>
            <h2 className={styles.benefitsLabel}>{benefits.label}</h2>
            <ul className={styles.benefitList}>
              {benefits.items.map((item, index) => {
                const Icon = item.icon
                return (
                  <li
                    className={styles.benefit}
                    key={item.title}
                    ref={benefitReveals[index].ref as React.Ref<HTMLLIElement>}
                    style={benefitReveals[index].style}
                  >
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

        <section
          className={styles.closing}
          ref={closingReveal.ref as React.Ref<HTMLElement>}
          style={closingReveal.style}
        >
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
