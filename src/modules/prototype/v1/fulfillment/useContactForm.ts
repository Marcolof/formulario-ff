import { useState } from 'react'

import { RUBRO_OTROS } from '../data/fulfillment.content'

/**
 * Estado y reglas del formulario de contacto de Fulfillment. Vive acá —y no
 * dentro de un componente— porque hay dos pantallas con el mismo formulario y
 * distinto layout: la de la v1/v2 (una columna) y la de la v3 (dos columnas).
 * Las validaciones salen del documento formal y tienen que ser una sola fuente:
 * si cambian, cambian para las dos.
 */

export type ContactValues = {
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

export type ContactErrors = Partial<Record<keyof ContactValues, string>>

export const EMPTY_CONTACT: ContactValues = {
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

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}

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

export function useContactForm() {
  const [values, setValues] = useState<ContactValues>(EMPTY_CONTACT)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [sent, setSent] = useState(false)

  // Actualización funcional: evita que dos cambios de campo en el mismo evento
  // (ver "Otros" de rubro) se pisen por leer el mismo `values` ya obsoleto del
  // closure del render.
  const applyChange = (patch: (prev: ContactValues) => ContactValues) => {
    setValues((prev) => {
      const next = patch(prev)
      if (submitted) setErrors(validateContact(next))
      return next
    })
  }

  const set = (field: keyof ContactValues) => (value: string) => {
    applyChange((prev) => ({ ...prev, [field]: value }))
  }

  /** Para los campos numéricos: filtra a medida que se escribe. */
  const setDigits = (field: keyof ContactValues) => (value: string) => {
    set(field)(value.replace(/\D/g, ''))
  }

  /** El rubro limpia el campo libre cuando deja de ser "Otros". */
  const setRubro = (value: string) => {
    applyChange((prev) => ({
      ...prev,
      rubro: value,
      rubroOtro: value === RUBRO_OTROS ? prev.rubroOtro : '',
    }))
  }

  /**
   * No se valida mientras se completa por primera vez: recién al enviar se
   * muestran todos los errores juntos. Desde ahí, cada campo se revalida al
   * editarlo.
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
    const found = validateContact(values)
    setErrors(found)
    if (Object.keys(found).length === 0) setSent(true)
  }

  const reset = () => {
    setValues(EMPTY_CONTACT)
    setErrors({})
    setSubmitted(false)
    setSent(false)
  }

  return { values, errors, sent, set, setDigits, setRubro, handleSubmit, reset }
}
