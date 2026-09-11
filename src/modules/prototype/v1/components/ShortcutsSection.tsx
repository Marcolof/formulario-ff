import { shortcuts } from '../data/landing.content'
import { SectionHeading } from './SectionHeading'
import styles from './ShortcutsSection.module.css'

export function ShortcutsSection() {
  return (
    <section className={styles.section}>
      <SectionHeading>Accesos directos</SectionHeading>

      <div className={styles.container}>
        <div className={styles.list}>
          {shortcuts.map((shortcut) => (
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
