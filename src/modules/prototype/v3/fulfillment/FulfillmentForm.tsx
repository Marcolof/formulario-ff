import { CircleCheckBig } from 'lucide-react'
import { useRef } from 'react'

import { Button } from '../../v1/components/Button'
import { OutlinedField, OutlinedSelect } from '../../v1/components/OutlinedField'
import { form, RUBRO_OTROS, rubros } from '../../v1/data/fulfillment.content'
import { useContactForm } from '../../v1/fulfillment/useContactForm'
import styles from './FulfillmentForm.module.css'

/**
 * El formulario de contacto con el layout de la v3: dos columnas en escritorio,
 * una sola en mobile. Los campos, las validaciones y el momento en que se
 * muestran los errores son los mismos de las otras versiones —viven en
 * `useContactForm`—; acá cambia sólo la disposición.
 */
export function FulfillmentForm() {
  const { values, errors, sent, set, setDigits, setRubro, handleSubmit, reset } = useContactForm()

  // Al enviarse, la tarjeta conserva la altura que tenía el formulario para que
  // la página no pegue un salto: se mide justo antes de reemplazar el contenido.
  const cardRef = useRef<HTMLDivElement>(null)
  const heightBeforeSubmit = useRef<number>(undefined)

  const onSubmit = (event: React.FormEvent) => {
    heightBeforeSubmit.current = cardRef.current?.offsetHeight
    handleSubmit(event)
  }

  if (sent) {
    return (
      <div
        className={styles.card}
        ref={cardRef}
        style={{ minHeight: heightBeforeSubmit.current }}
      >
        <div className={styles.success}>
          <span className={styles.successIcon}>
            <CircleCheckBig size={40} strokeWidth={1.5} aria-hidden />
          </span>
          <h2 className={styles.successTitle}>{form.success.title}</h2>
          <p className={styles.successBody}>{form.success.body}</p>
          <Button type="button" size="pill" className={styles.submit} onClick={reset}>
            Cargar otra consulta
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.card} ref={cardRef}>
      <h2 className={styles.title}>{form.title}</h2>
      <p className={styles.subtitle}>{form.subtitle}</p>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.fields}>
          <OutlinedField
            id="ffv3-empresa"
            variant="form"
            label="Nombre de la empresa / Razón social"
            value={values.empresa}
            error={errors.empresa}
            maxLength={40}
            onChange={set('empresa')}
          />
          <OutlinedField
            id="ffv3-nombre"
            variant="form"
            label="Nombre y apellido"
            value={values.nombre}
            error={errors.nombre}
            maxLength={60}
            onChange={set('nombre')}
          />
          <OutlinedField
            id="ffv3-mail"
            variant="form"
            label="Correo electrónico"
            type="email"
            value={values.mail}
            error={errors.mail}
            onChange={set('mail')}
          />
          <OutlinedSelect
            id="ffv3-rubro"
            variant="form"
            label="Rubro de la empresa"
            value={values.rubro}
            error={errors.rubro}
            options={rubros}
            onChange={setRubro}
          />

          <div className={styles.phone}>
            <div className={styles.phoneArea}>
              <OutlinedField
                id="ffv3-codigo-area"
                variant="form"
                label="Cod. área"
                type="tel"
                inputMode="numeric"
                value={values.codigoArea}
                error={errors.codigoArea}
                maxLength={4}
                onChange={setDigits('codigoArea')}
              />
            </div>
            <div className={styles.phoneNumber}>
              <OutlinedField
                id="ffv3-celular"
                variant="form"
                label="Celular"
                type="tel"
                inputMode="numeric"
                value={values.celular}
                error={errors.celular}
                maxLength={8}
                onChange={setDigits('celular')}
              />
            </div>
          </div>

          {values.rubro === RUBRO_OTROS ? (
            <OutlinedField
              id="ffv3-rubro-otro"
              variant="form"
              label="Contanos el rubro"
              value={values.rubroOtro}
              error={errors.rubroOtro}
              maxLength={30}
              onChange={set('rubroOtro')}
            />
          ) : null}
        </div>

        <fieldset className={styles.clientRow}>
          <div className={styles.clientInner}>
            <legend className={styles.legend}>¿Ya sos cliente de MiCorreo?</legend>
            <div className={styles.options}>
              {(
                [
                  ['si', 'Sí'],
                  ['no', 'No'],
                ] as const
              ).map(([value, label]) => (
                <label className={styles.radio} key={value}>
                  <input
                    type="radio"
                    name="ffv3-esCliente"
                    value={value}
                    checked={values.esCliente === value}
                    onChange={() => set('esCliente')(value)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
          {errors.esCliente ? <p className={styles.error}>{errors.esCliente}</p> : null}
        </fieldset>

        {/* Aparece justo debajo de la pregunta que la habilita, no arriba
            mezclada con el resto de los campos. */}
        {values.esCliente === 'si' ? (
          <div className={styles.numeroCliente}>
            <OutlinedField
              id="ffv3-numero-cliente"
              variant="form"
              label="Número de cliente"
              type="tel"
              inputMode="numeric"
              value={values.numeroCliente}
              error={errors.numeroCliente}
              maxLength={10}
              onChange={setDigits('numeroCliente')}
            />
          </div>
        ) : null}

        <div className={styles.action}>
          <Button type="submit" size="pill" className={styles.submit}>
            {form.submit}
          </Button>
        </div>
        <p className={styles.disclaimer}>{form.disclaimer}</p>
      </form>
    </div>
  )
}
