import type { ReactNode } from 'react'

import styles from './OutlinedField.module.css'

/**
 * Campo outlined con label flotante: el control de formulario de MiCorreo.
 * Se extrajo de "Gestionar Devolución" de la landing para que las pantallas
 * nuevas no inventen otro input.
 */

type BaseProps = {
  id: string
  label: string
  error?: string
  onChange: (value: string) => void
}

type FieldProps = BaseProps & {
  value: string
  type?: string
}

export function OutlinedField({ id, label, value, error, type = 'text', onChange }: FieldProps) {
  return (
    <Wrapper id={id} error={error}>
      <input
        id={id}
        type={type}
        className={error ? styles.controlError : styles.control}
        value={value}
        placeholder=" "
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      <label htmlFor={id}>{label}</label>
    </Wrapper>
  )
}

type SelectProps = BaseProps & {
  value: string
  options: string[]
}

export function OutlinedSelect({ id, label, value, error, options, onChange }: SelectProps) {
  return (
    <Wrapper id={id} error={error}>
      <select
        id={id}
        className={error ? styles.selectError : styles.select}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="" disabled hidden />
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <label className={value ? styles.labelFloated : undefined} htmlFor={id}>
        {label}
      </label>
    </Wrapper>
  )
}

function Wrapper({ id, error, children }: { id: string; error?: string; children: ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.field}>{children}</div>
      {error ? (
        <p className={styles.error} id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  )
}
