import { reasons } from '../data/landing.content'
import { SectionHeading } from './SectionHeading'
import styles from './WhyUsSection.module.css'

type Props = {
  /** Ver `SectionHeading`: la v2 muestra el título sin reglas laterales. */
  headingRules?: boolean
}

export function WhyUsSection({ headingRules = true }: Props = {}) {
  return (
    <section className={styles.section}>
      <SectionHeading rules={headingRules}>¿Por qué elegirnos?</SectionHeading>

      <div className={styles.container}>
        <div className={styles.list}>
          {reasons.map((reason) => (
            <article className={styles.card} key={reason.body}>
              <p className={styles.body}>{reason.body}</p>
              <img
                className={styles.icon}
                src={reason.icon}
                alt=""
                style={{ width: reason.width, height: reason.height, maxWidth: reason.width }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
