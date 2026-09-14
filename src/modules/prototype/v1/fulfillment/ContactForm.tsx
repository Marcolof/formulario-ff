import { Button } from '../components/Button'
import { OutlinedField, OutlinedSelect } from '../components/OutlinedField'
import { form, RUBRO_OTROS, rubros } from '../data/fulfillment.content'
import styles from './ContactForm.module.css'
import { useContactForm } from './useContactForm'

/**
 * Formulario de contacto de la página de Fulfillment de las versiones 1 y 2: una
 * sola columna, según el diseño de Figma 13217:34295. Los campos, las reglas y
 * el momento de validación viven en `useContactForm`, compartido con la v3.
 */
export function ContactForm() {
  const { values, errors, sent, set, setDigits, setRubro, handleSubmit, reset } = useContactForm()

  if (sent) {
    return (
      <aside className={styles.card}>
        <h2 className={styles.title}>{form.success.title}</h2>
        <p className={styles.successText}>{form.success.body}</p>
        <Button type="button" size="pill" className={styles.submit} onClick={reset}>
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
              onChange={setDigits('codigoArea')}
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
              onChange={setDigits('celular')}
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
          onChange={setRubro}
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
            onChange={setDigits('numeroCliente')}
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
