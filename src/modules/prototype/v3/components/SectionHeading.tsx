import styles from './SectionHeading.module.css'

type Props = {
  children: string
  /**
   * Las reglas laterales son parte de la landing original, así que la v1 las
   * mantiene. La v2 las apaga: su referencia visual usa el título solo.
   */
  rules?: boolean
}

export function SectionHeading({ children, rules = true }: Props) {
  return (
    <div className={styles.heading} data-rules={rules}>
      {rules ? <hr className={styles.rule} /> : null}
      <h2 className={styles.title}>{children}</h2>
      {rules ? <hr className={styles.rule} /> : null}
    </div>
  )
}
