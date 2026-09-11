import { reasons } from '../data/landing.content'
import { SectionHeading } from './SectionHeading'
import styles from './WhyUsSection.module.css'

export function WhyUsSection() {
  return (
    <section className={styles.section}>
      <SectionHeading>¿Por qué elegirnos?</SectionHeading>

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
