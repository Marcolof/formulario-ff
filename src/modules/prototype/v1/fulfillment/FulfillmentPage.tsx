import fulfillmentBox from '@/assets/img/fulfillment-box.svg'

import { ChatButton } from '../components/ChatButton'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { benefits, closing, distribution, hero, includes } from '../data/fulfillment.content'
import '../../prototype.tokens.css'
import { ContactForm } from './ContactForm'
import styles from './FulfillmentPage.module.css'

function FeatureList({ block }: { block: typeof includes }) {
  return (
    <div>
      <h2 className={styles.blockTitle}>{block.title}</h2>
      <ul className={styles.features}>
        {block.items.map((item) => {
          const Icon = item.icon
          return (
            <li className={styles.feature} key={item.title}>
              <Icon className={styles.featureIcon} size={32} strokeWidth={1.75} aria-hidden />
              <div>
                <h3 className={styles.featureTitle}>{item.title}</h3>
                <p
                  className={styles.featureBody}
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function FulfillmentPage() {
  return (
    <div className={styles.page} data-module="prototype">
      <Navbar />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <h1 className={styles.heroTitle}>{hero.title}</h1>
              <p className={styles.heroSubtitle}>{hero.subtitle}</p>
            </div>
            <div className={styles.heroMedia}>
              <img src={fulfillmentBox} alt="" />
            </div>
          </div>
          <p className={styles.ribbon}>{hero.ribbon}</p>
        </section>

        <section className={styles.body}>
          <div className={styles.bodyInner}>
            <div className={styles.blocks}>
              <FeatureList block={includes} />
              <FeatureList block={distribution} />
            </div>
            <div className={styles.formColumn} id="formulario">
              <ContactForm />
            </div>
          </div>
        </section>

        <section className={styles.benefits}>
          <div className={styles.benefitsInner}>
            <h2 className={styles.blockTitle}>{benefits.title}</h2>
            <ul className={styles.benefitList}>
              {benefits.items.map((item) => {
                const Icon = item.icon
                return (
                  <li className={styles.benefit} key={item.lead}>
                    <Icon className={styles.benefitIcon} size={40} strokeWidth={1.75} aria-hidden />
                    <p>
                      <strong>{item.lead}</strong> {item.body}
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        <section className={styles.closing}>
          <p>
            {closing.lead} <strong>{closing.highlight}</strong>
          </p>
        </section>

        <SiteFooter />
        <ChatButton />
      </main>
    </div>
  )
}
