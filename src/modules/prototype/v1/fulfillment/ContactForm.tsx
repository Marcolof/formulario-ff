import { useState } from 'react'

import { Button } from '../components/Button'
import { OutlinedField, OutlinedSelect } from '../components/OutlinedField'
import { form, RUBRO_OTROS, rubros } from '../data/fulfillment.content'
import styles from './ContactForm.module.css'

type Values = {
  empresa: string
  nombre: string
  mail: string
  codigoArea: string
  celular: string
  rubro: string
  rubroOtro: string
  esCliente: 'si' | 'no' | ''
  numeroCliente: string
}

const EMPTY: Values = {
  empresa: '',
  nombre: '',
  mail: '',
  codigoArea: '',
  celular: '',
  rubro: '',
  rubroOtro: '',
  esCliente: '',
  numeroCliente: '',
}

const MAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Nombre de la empresa: alfanumérico + los símbolos que pide el documento.
const EMPRESA_PATTERN = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.\-/&´]{1,40}$/
const NOMBRE_PATTERN = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,60}$/
const CODIGO_AREA_PATTERN = /^\d{2,4}$/
const CELULAR_PATTERN = /^\d{6,8}$/
const RUBRO_OTRO_PATTERN = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,30}$/
const NUMERO_CLIENTE_PATTERN = /^\d{1,10}$/

function validate(values: Values): Partial<Record<keyof Values, string>> {
  const errors: Partial<Record<keyof Values, string>> = {}

  // Nombre de la empresa / Razón social: no es obligatorio, según excepción
  // explícita del documento formal.
  if (values.empresa.trim() && !EMPRESA_PATTERN.test(values.empresa.trim())) {
    errors.empresa = 'Máximo 40 caracteres. Se admiten letras, números y . - / & ´'
  }

  if (!values.nombre.trim()) errors.nombre = 'Ingresá tu nombre y apellido.'
  else if (!NOMBRE_PATTERN.test(values.nombre.trim()))
    errors.nombre = 'Máximo 60 caracteres, sólo letras.'

  if (!values.mail.trim()) errors.mail = 'Ingresá tu mail.'
  else if (!MAIL_PATTERN.test(values.mail.trim())) errors.mail = 'Revisá el formato del mail.'

  if (!values.codigoArea.trim()) errors.codigoArea = 'Ingresá el código de área.'
  else if (!CODIGO_AREA_PATTERN.test(values.codigoArea.trim()))
    errors.codigoArea = '2 a 4 dígitos.'

  if (!values.celular.trim()) errors.celular = 'Ingresá tu celular.'
  else if (!CELULAR_PATTERN.test(values.celular.trim())) errors.celular = '6 a 8 dígitos.'
  else if (values.codigoArea.trim().length + values.celular.trim().length !== 10)
    errors.celular = 'Código de área + celular deben sumar 10 dígitos.'

  if (!values.rubro) errors.rubro = 'Elegí el rubro de la empresa.'
  if (values.rubro === RUBRO_OTROS) {
    if (!values.rubroOtro.trim()) errors.rubroOtro = 'Ingresá el rubro.'
    else if (!RUBRO_OTRO_PATTERN.test(values.rubroOtro.trim()))
      errors.rubroOtro = 'Máximo 30 caracteres, sólo letras.'
  }

  if (!values.esCliente) errors.esCliente = 'Indicá si ya sos cliente de MiCorreo.'

  // Número de cliente: aparece si responde "Sí", pero el documento lo excluye
  // explícitamente de los campos obligatorios. Sólo se valida el formato si
  // se completa.
  if (
    values.esCliente === 'si' &&
    values.numeroCliente.trim() &&
    !NUMERO_CLIENTE_PATTERN.test(values.numeroCliente.trim())
  ) {
    errors.numeroCliente = 'Hasta 10 dígitos numéricos.'
  }

  return errors
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [sent, setSent] = useState(false)

  // Actualización funcional: evita que dos cambios de campo en el mismo
  // evento (ver "Otros" de rubro, abajo) se pisen por leer el mismo `values`
  // ya obsoleto del closure del render.
  const applyChange = (patch: (prev: Values) => Values) => {
    setValues((prev) => {
      const next = patch(prev)
      if (submitted) setErrors(validate(next))
      return next
    })
  }

  const set = (field: keyof Values) => (value: string) => {
    applyChange((prev) => ({ ...prev, [field]: value }))
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
          size="pill"
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
      <p className={styles.subtitle}>{form.subtitle}</p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <OutlinedField
          id="ff-empresa"
          variant="form"
          label="Nombre de la empresa / Razón social"
          value={values.empresa}
          error={errors.empresa}
          maxLength={40}
          onChange={set('empresa')}
        />
        <OutlinedField
          id="ff-nombre"
          variant="form"
          label="Nombre y apellido"
          value={values.nombre}
          error={errors.nombre}
          maxLength={60}
          onChange={set('nombre')}
        />
        <OutlinedField
          id="ff-mail"
          variant="form"
          label="Correo electrónico"
          type="email"
          value={values.mail}
          error={errors.mail}
          onChange={set('mail')}
        />

        <div className={styles.phoneRow}>
          <div className={styles.phoneArea}>
            <OutlinedField
              id="ff-codigo-area"
              variant="form"
              label="Cod. área"
              type="tel"
              inputMode="numeric"
              value={values.codigoArea}
              error={errors.codigoArea}
              maxLength={4}
              onChange={(value) => set('codigoArea')(value.replace(/\D/g, ''))}
            />
          </div>
          <div className={styles.phoneNumber}>
            <OutlinedField
              id="ff-celular"
              variant="form"
              label="Celular"
              type="tel"
              inputMode="numeric"
              value={values.celular}
              error={errors.celular}
              maxLength={8}
              onChange={(value) => set('celular')(value.replace(/\D/g, ''))}
            />
          </div>
        </div>

        <OutlinedSelect
          id="ff-rubro"
          variant="form"
          label="Rubro de la empresa"
          value={values.rubro}
          error={errors.rubro}
          options={rubros}
          onChange={(value) =>
            applyChange((prev) => ({
              ...prev,
              rubro: value,
              rubroOtro: value === RUBRO_OTROS ? prev.rubroOtro : '',
            }))
          }
        />

        {values.rubro === RUBRO_OTROS ? (
          <OutlinedField
            id="ff-rubro-otro"
            variant="form"
            label="Contanos el rubro"
            value={values.rubroOtro}
            error={errors.rubroOtro}
            maxLength={30}
            onChange={set('rubroOtro')}
          />
        ) : null}

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
            variant="form"
            label="Número de cliente"
            type="tel"
            inputMode="numeric"
            value={values.numeroCliente}
            error={errors.numeroCliente}
            maxLength={10}
            onChange={(value) => set('numeroCliente')(value.replace(/\D/g, ''))}
          />
        ) : null}

        <Button type="submit" size="pill" className={styles.submit}>
          {form.submit}
        </Button>
        <p className={styles.disclaimer}>{form.disclaimer}</p>
      </form>
    </aside>
  )
}
