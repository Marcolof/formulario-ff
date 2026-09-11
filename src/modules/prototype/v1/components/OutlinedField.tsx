import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

import styles from './OutlinedField.module.css'

/**
 * Campo outlined con label flotante: el control de formulario de MiCorreo.
 * Se extrajo de "Gestionar Devolución" de la landing para que las pantallas
 * nuevas no inventen otro input.
 *
 * `variant="form"` es el tratamiento del formulario de Fulfillment (borde
 * #d9d9d9, radio 4, label gris oscuro), según el diseño de Figma. La variante
 * por defecto es la de la landing replicada y no debe cambiar.
 */

type Variant = 'landing' | 'form'

type BaseProps = {
  id: string
  label: string
  error?: string
  variant?: Variant
  onChange: (value: string) => void
}

type FieldProps = BaseProps & {
  value: string
  type?: string
  maxLength?: number
  inputMode?: 'text' | 'numeric' | 'tel' | 'email'
}

export function OutlinedField({
  id,
  label,
  value,
  error,
  variant = 'landing',
  type = 'text',
  maxLength,
  inputMode,
  onChange,
}: FieldProps) {
  return (
    <Wrapper id={id} error={error} variant={variant}>
      <input
        id={id}
        type={type}
        className={error ? styles.controlError : styles.control}
        value={value}
        placeholder=" "
        maxLength={maxLength}
        inputMode={inputMode}
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

export function OutlinedSelect({
  id,
  label,
  value,
  error,
  variant = 'landing',
  options,
  onChange,
}: SelectProps) {
  return (
    <Wrapper id={id} error={error} variant={variant}>
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
      <ChevronDown className={styles.chevron} size={16} aria-hidden />
    </Wrapper>
  )
}

function Wrapper({
  id,
  error,
  variant,
  children,
}: {
  id: string
  error?: string
  variant: Variant
  children: ReactNode
}) {
  return (
    <div className={variant === 'form' ? `${styles.wrapper} ${styles.formVariant}` : styles.wrapper}>
      <div className={styles.field}>{children}</div>
      {error ? (
        <p className={styles.error} id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  )
}
