import { useState } from 'react'

import { Button } from '../components/Button'
import { OutlinedField, OutlinedSelect } from '../components/OutlinedField'
import { form, rubros } from '../data/fulfillment.content'
import styles from './ContactForm.module.css'

type Values = {
  empresa: string
  nombre: string
  mail: string
  celular: string
  rubro: string
  esCliente: 'si' | 'no' | ''
  numeroCliente: string
}

const EMPTY: Values = {
  empresa: '',
  nombre: '',
  mail: '',
  celular: '',
  rubro: '',
  esCliente: '',
  numeroCliente: '',
}

const MAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const CELULAR_PATTERN = /^[\d\s()+-]{8,20}$/

function validate(values: Values): Partial<Record<keyof Values, string>> {
  const errors: Partial<Record<keyof Values, string>> = {}

  if (!values.empresa.trim()) errors.empresa = 'Ingresá el nombre de la empresa.'
  if (!values.nombre.trim()) errors.nombre = 'Ingresá tu nombre y apellido.'

  if (!values.mail.trim()) errors.mail = 'Ingresá tu mail.'
  else if (!MAIL_PATTERN.test(values.mail.trim())) errors.mail = 'Revisá el formato del mail.'

  if (!values.celular.trim()) errors.celular = 'Ingresá tu celular.'
  else if (!CELULAR_PATTERN.test(values.celular.trim()))
    errors.celular = 'Ingresá un celular válido.'

  if (!values.rubro) errors.rubro = 'Elegí el rubro de la empresa.'
  if (!values.esCliente) errors.esCliente = 'Indicá si ya sos cliente de MiCorreo.'

  // El número de cliente sólo se pide a quien ya es cliente. Hipótesis de
  // trabajo registrada en la documentación funcional, pendiente de validar.
  if (values.esCliente === 'si' && !values.numeroCliente.trim())
    errors.numeroCliente = 'Ingresá tu número de cliente.'

  return errors
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [sent, setSent] = useState(false)

  const set = (field: keyof Values) => (value: string) => {
    const next = { ...values, [field]: value }
    setValues(next)
    if (submitted) setErrors(validate(next))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length === 0) setSent(true)
  }

  if (sent) {
    return (
      <aside className={styles.card}>
        <h2 className={styles.title}>{form.success.title}</h2>
        <p className={styles.successText}>{form.success.body}</p>
        <Button
          type="button"
          className={styles.submit}
          onClick={() => {
            setValues(EMPTY)
            setErrors({})
            setSubmitted(false)
            setSent(false)
          }}
        >
          Cargar otra consulta
        </Button>
      </aside>
    )
  }

  return (
    <aside className={styles.card}>
      <h2 className={styles.title}>{form.title}</h2>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <OutlinedField
          id="ff-empresa"
          label="Nombre de la empresa"
          value={values.empresa}
          error={errors.empresa}
          onChange={set('empresa')}
        />
        <OutlinedField
          id="ff-nombre"
          label="Nombre y apellido"
          value={values.nombre}
          error={errors.nombre}
          onChange={set('nombre')}
        />
        <OutlinedField
          id="ff-mail"
          label="Mail"
          type="email"
          value={values.mail}
          error={errors.mail}
          onChange={set('mail')}
        />
        <OutlinedField
          id="ff-celular"
          label="Celular"
          type="tel"
          value={values.celular}
          error={errors.celular}
          onChange={set('celular')}
        />
        <OutlinedSelect
          id="ff-rubro"
          label="Rubro de la empresa"
          value={values.rubro}
          error={errors.rubro}
          options={rubros}
          onChange={set('rubro')}
        />

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>¿Ya sos cliente de MiCorreo?</legend>
          <div className={styles.radios}>
            {(
              [
                ['si', 'Sí'],
                ['no', 'No'],
              ] as const
            ).map(([value, label]) => (
              <label className={styles.radio} key={value}>
                <input
                  type="radio"
                  name="esCliente"
                  value={value}
                  checked={values.esCliente === value}
                  onChange={() => set('esCliente')(value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
          {errors.esCliente ? <p className={styles.error}>{errors.esCliente}</p> : null}
        </fieldset>

        {values.esCliente === 'si' ? (
          <OutlinedField
            id="ff-numero-cliente"
            label="Número de cliente"
            value={values.numeroCliente}
            error={errors.numeroCliente}
            onChange={set('numeroCliente')}
          />
        ) : null}

        <p className={styles.disclaimer}>{form.disclaimer}</p>
        <Button type="submit" className={styles.submit}>
          {form.submit}
        </Button>
      </form>
    </aside>
  )
}
