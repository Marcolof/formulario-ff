import styles from './SectionHeading.module.css'

export function SectionHeading({ children }: { children: string }) {
  return (
    <div className={styles.heading}>
      <hr className={styles.rule} />
      <h2 className={styles.title}>{children}</h2>
      <hr className={styles.rule} />
    </div>
  )
}
