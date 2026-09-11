import clientsIcon from '@/assets/icons/clients.svg'
import centroLogistico from '@/assets/img/centro-logistico.png'
import mapaCobertura from '@/assets/img/map.png'

import { ChatButton } from '../components/ChatButton'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { benefits, distribution, hero, includes } from '../data/fulfillment.content'
import '../../prototype.tokens.css'
import { ContactForm } from './ContactForm'
import styles from './FulfillmentPage.module.css'

export function FulfillmentPage() {
  return (
    <div className={styles.page} data-module="prototype">
      <Navbar />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.chip}>{hero.chip}</p>
              <h1 className={styles.heroTitle}>{hero.title}</h1>
              <p className={styles.heroSubtitle}>{hero.subtitle}</p>
              <div className={styles.proof}>
                <img src={clientsIcon} alt="" width={59} height={35} />
                <p>{hero.proof}</p>
              </div>
            </div>
            <div className={styles.heroMedia}>
              <img src={centroLogistico} alt="Equipo trabajando en un centro logístico de Correo Argentino" />
            </div>
          </div>
        </section>

        <section className={styles.body}>
          <div className={styles.bodyInner}>
            <div className={styles.includes}>
              <h2 className={styles.blockTitle}>{includes.title}</h2>
              <ul className={styles.features}>
                {includes.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <li className={styles.feature} key={item.title}>
                      <span className={styles.featureIcon}>
                        <Icon size={24} aria-hidden />
                      </span>
                      <div className={styles.featureText}>
                        <h3 className={styles.featureTitle}>{item.title}</h3>
                        <p className={styles.featureBody}>{item.body}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className={styles.formColumn} id="formulario">
              <ContactForm />
            </div>
          </div>
        </section>

        <section className={styles.benefits}>
          <div className={styles.benefitsInner}>
            <h2 className={styles.benefitsTitle}>{benefits.title}</h2>
            <ul className={styles.benefitList}>
              {benefits.items.map((item) => {
                const Icon = item.icon
                return (
                  <li className={styles.benefit} key={item.text}>
                    <Icon size={40} aria-hidden />
                    <p>{item.text}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        <section className={styles.distribution}>
          <div className={styles.distributionInner}>
            <div className={styles.distributionCopy}>
              <h2 className={styles.distributionTitle}>{distribution.title}</h2>
              <ul className={styles.distributionList}>
                {distribution.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <li className={styles.distributionItem} key={item.title}>
                      <span className={styles.distributionIcon}>
                        <Icon size={24} aria-hidden />
                      </span>
                      <div className={styles.distributionText}>
                        <h3 className={styles.distributionItemTitle}>{item.title}</h3>
                        <p className={styles.distributionItemBody}>{item.body}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className={styles.mapContainer}>
              <img
                className={styles.map}
                src={mapaCobertura}
                alt="Mapa de la red de distribución de Correo Argentino en todo el país"
              />
            </div>
          </div>
        </section>

        <SiteFooter />
        <ChatButton />
      </main>
    </div>
  )
}
