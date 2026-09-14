import { useState } from 'react'

import { RUBRO_OTROS } from '../data/fulfillment.content'

/**
 * Estado y reglas del formulario de contacto de Fulfillment. Vive acá —y no
 * dentro del componente— para que las reglas y el momento en que se muestran
 * los errores queden separados del layout: una sola fuente de verdad, revisable
 * sin leer el JSX.
 *
 * Los límites de longitud salen del documento formal, salvo tres que el usuario
 * pidió cambiar el 2026-09-14 y que lo contradicen a propósito: razón social,
 * nombre y apellido y mail pasan a 64 caracteres (el documento dice 40 y 60), y
 * el número de cliente pasa a ser exactamente 10 dígitos.
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

/** El mismo tope para los tres campos de texto largo. */
export const TEXTO_MAX = 64
export const RUBRO_OTRO_MAX = 30
export const NUMERO_CLIENTE_LARGO = 10

const MAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Nombre de la empresa: alfanumérico + los símbolos que pide el documento.
const EMPRESA_PATTERN = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.\-/&´]{1,64}$/
const NOMBRE_PATTERN = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,64}$/
const CODIGO_AREA_PATTERN = /^\d{2,4}$/
const CELULAR_PATTERN = /^\d{6,8}$/
const RUBRO_OTRO_PATTERN = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,30}$/
const NUMERO_CLIENTE_PATTERN = /^\d{10}$/

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}

  // Nombre de la empresa / Razón social: no es obligatorio, según excepción
  // explícita del documento formal.
  if (values.empresa.trim() && !EMPRESA_PATTERN.test(values.empresa.trim())) {
    errors.empresa = 'Máximo 64 caracteres. Se admiten letras, números y . - / & ´'
  }

  if (!values.nombre.trim()) errors.nombre = 'Ingresá tu nombre y apellido.'
  else if (!NOMBRE_PATTERN.test(values.nombre.trim()))
    errors.nombre = 'Máximo 64 caracteres, sólo letras.'

  if (!values.mail.trim()) errors.mail = 'Ingresá tu mail.'
  else if (values.mail.trim().length > TEXTO_MAX) errors.mail = 'Máximo 64 caracteres.'
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
  // explícitamente de los campos obligatorios. Sólo se valida el formato si se
  // completa — y desde el 2026-09-14 son 10 dígitos exactos, ni más ni menos.
  if (
    values.esCliente === 'si' &&
    values.numeroCliente.trim() &&
    !NUMERO_CLIENTE_PATTERN.test(values.numeroCliente.trim())
  ) {
    errors.numeroCliente = 'Son 10 dígitos numéricos.'
  }

  return errors
}

/** Mensaje general del caso de uso "error de formulario" del panel de tweaks. */
export const SIMULATED_ERROR =
  'No pudimos procesar tu solicitud. Revisá los datos e intentá nuevamente.'

/**
 * `forceError` viene del panel de casos de uso del prototipo: con él activo el
 * envío nunca prospera, así que el estado de error se puede revisar sin tener
 * que romper los datos a mano. No cambia ninguna regla de validación: sólo
 * bloquea el envío y agrega el mensaje general.
 */
export function useContactForm({ forceError = false }: { forceError?: boolean } = {}) {
  const [values, setValues] = useState<ContactValues>(EMPTY_CONTACT)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [sent, setSent] = useState(false)
  const [formError, setFormError] = useState('')

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
    if (forceError) {
      setFormError(SIMULATED_ERROR)
      return
    }
    setFormError('')
    if (Object.keys(found).length === 0) setSent(true)
  }

  const reset = () => {
    setValues(EMPTY_CONTACT)
    setErrors({})
    setSubmitted(false)
    setSent(false)
    setFormError('')
  }

  return { values, errors, formError, sent, set, setDigits, setRubro, handleSubmit, reset }
}
