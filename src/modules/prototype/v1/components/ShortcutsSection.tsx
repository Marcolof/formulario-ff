import { shortcuts as defaultShortcuts } from '../data/landing.content'
import { SectionHeading } from './SectionHeading'
import styles from './ShortcutsSection.module.css'

type Shortcut = (typeof defaultShortcuts)[number]

type Props = {
  /** La landing original la titula "Accesos directos"; la v2 la renombra. */
  title?: string
  /** Permite reordenar las tarjetas sin duplicar los datos de la v1. */
  items?: readonly Shortcut[]
  /** 'v2' aplica el tratamiento de la propuesta: tarjeta blanca y CTA subrayado. */
  variant?: 'v1' | 'v2'
  /** Ver `SectionHeading`: la v2 muestra el título sin reglas laterales. */
  headingRules?: boolean
}

export function ShortcutsSection({
  title = 'Accesos directos',
  items = defaultShortcuts,
  variant = 'v1',
  headingRules = true,
}: Props = {}) {
  return (
    <section className={styles.section} data-variant={variant}>
      <SectionHeading rules={headingRules}>{title}</SectionHeading>

      <div className={styles.container}>
        <div className={styles.list}>
          {items.map((shortcut) => (
            <article className={styles.card} key={shortcut.title}>
              <h3 className={styles.title}>{shortcut.title}</h3>
              <div className={styles.row}>
                <div className={styles.iconBox}>
                  <img src={shortcut.icon} alt={shortcut.title} />
                </div>
                <div className={styles.text}>
                  <p className={styles.body}>{shortcut.body}</p>
                  <a
                    className={styles.cta}
                    href={shortcut.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p>{shortcut.cta}</p>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
