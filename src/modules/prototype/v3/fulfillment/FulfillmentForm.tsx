import { CircleCheckBig } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '../components/Button'
import { OutlinedField, OutlinedSelect } from '../components/OutlinedField'
import { useSimulation } from '../../components/simulation'
import { form, RUBRO_OTROS, rubros } from '../data/fulfillment.content'
import { NUMERO_CLIENTE_LARGO, RUBRO_OTRO_MAX, TEXTO_MAX, useContactForm } from './useContactForm'
import styles from './FulfillmentForm.module.css'

/** Tiene que coincidir con la duración de salida de `.formLeaving` y
 * `.successLeaving` en el CSS: las dos direcciones de la transición usan el
 * mismo tiempo, para que se sientan simétricas. */
const LEAVE_MS = 220

/**
 * El formulario de contacto: dos columnas en escritorio, una sola en mobile.
 * Los campos, las validaciones, los límites de longitud y el momento en que se
 * muestran los errores viven en `useContactForm`; acá va sólo la disposición.
 *
 * El cambio entre los campos y el estado de éxito —y la vuelta— es una
 * transición en dos pasos en cada sentido, no un swap directo:
 *
 * - Al enviar: los campos se desvanecen hacia arriba (`leaving`) y, recién
 *   terminada esa salida, entra el bloque de éxito (`success`), con el ícono,
 *   el texto y el botón apareciendo de abajo hacia arriba.
 * - Al tocar "Cargar otra consulta": el bloque de éxito se desvanece
 *   (`returning`) y, recién terminada esa salida, vuelven a aparecer los
 *   campos vacíos (`form`), con la misma entrada de abajo hacia arriba.
 *
 * `phase` es la máquina de estados de esa transición en los dos sentidos.
 * `sent` (de `useContactForm`) sigue siendo la fuente de verdad de si el
 * envío fue exitoso, pero sólo dispara la mitad de ida: la vuelta la maneja
 * `handleReset` de acá abajo, porque tiene que retrasar el `reset()` del hook
 * —que vacía los campos— hasta que el bloque de éxito ya haya terminado de
 * desvanecerse.
 */
export function FulfillmentForm() {
  // Caso de uso elegido en el panel de tweaks del prototipo. Fuera de él, el
  // contexto devuelve 'happy': el comportamiento real.
  const { useCase } = useSimulation()
  const { values, errors, formError, sent, set, setDigits, setRubro, handleSubmit, reset } =
    useContactForm({ forceError: useCase === 'error' })

  const [phase, setPhase] = useState<'form' | 'leaving' | 'success' | 'returning'>('form')
  // En true recién después de la primera vuelta a 'form' vía "Cargar otra
  // consulta": distingue esa entrada animada de la primera vez que se monta
  // la pantalla, que no tiene que animar (ya la anima `useReveal` al hacer
  // scroll hasta la sección).
  const returnedOnceRef = useRef(false)
  const returnTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Depende sólo de `sent` —no de `phase`— a propósito: si `phase` también
  // fuera dependencia, el efecto se volvería a ejecutar en cuanto pasara a
  // 'leaving', y React limpiaría (`clearTimeout`) el timer recién programado
  // antes de que llegara a disparar el paso a 'success'.
  useEffect(() => {
    if (!sent) return
    setPhase('leaving')
    const timer = setTimeout(() => setPhase('success'), LEAVE_MS)
    return () => clearTimeout(timer)
  }, [sent])

  useEffect(() => () => clearTimeout(returnTimerRef.current), [])

  // Al enviarse, la tarjeta conserva la altura que tenía el formulario para que
  // la página no pegue un salto: se mide justo antes de arrancar la salida.
  const cardRef = useRef<HTMLDivElement>(null)
  const heightBeforeSubmit = useRef<number>(undefined)

  const onSubmit = (event: React.FormEvent) => {
    heightBeforeSubmit.current = cardRef.current?.offsetHeight
    handleSubmit(event)
  }

  const handleReset = () => {
    setPhase('returning')
    returnTimerRef.current = setTimeout(() => {
      returnedOnceRef.current = true
      // Recién acá se vacían los campos: si se limpiaran antes, se verían en
      // blanco un instante durante la salida animada del bloque de éxito.
      reset()
      setPhase('form')
    }, LEAVE_MS)
  }

  if (phase === 'success' || phase === 'returning') {
    return (
      <div
        className={styles.card}
        ref={cardRef}
        style={{ minHeight: heightBeforeSubmit.current }}
      >
        <div
          className={
            phase === 'returning' ? `${styles.success} ${styles.successLeaving}` : styles.success
          }
        >
          <span className={styles.successIcon}>
            <CircleCheckBig size={40} strokeWidth={1.5} aria-hidden />
          </span>
          <h2 className={styles.successTitle}>{form.success.title}</h2>
          <p className={styles.successBody}>{form.success.body}</p>
          <Button
            type="button"
            size="pill"
            className={`${styles.submit} ${styles.successButton}`}
            onClick={handleReset}
          >
            Cargar otra consulta
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={styles.card}
      ref={cardRef}
      style={phase === 'leaving' ? { minHeight: heightBeforeSubmit.current } : undefined}
    >
      <h2 className={styles.title}>{form.title}</h2>
      <p className={styles.subtitle}>{form.subtitle}</p>

      <form
        className={[
          styles.form,
          phase === 'leaving' ? styles.formLeaving : '',
          // Sólo en la vuelta desde el estado de éxito: el primer montaje de
          // la pantalla no anima, para no competir con el reveal de scroll.
          returnedOnceRef.current ? styles.formEnter : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onSubmit={onSubmit}
        noValidate
        // Mientras se desvanece, ningún campo debe poder seguir editándose ni
        // recibir foco — está a mitad de camino de desaparecer.
        inert={phase === 'leaving' ? true : undefined}
      >
        <div className={styles.fields}>
          <OutlinedField
            id="ffv3-empresa"
            variant="form"
            label="Nombre de la empresa / Razón social"
            value={values.empresa}
            error={errors.empresa}
            maxLength={TEXTO_MAX}
            onChange={set('empresa')}
          />
          <OutlinedField
            id="ffv3-nombre"
            variant="form"
            label="Nombre y apellido"
            value={values.nombre}
            error={errors.nombre}
            maxLength={TEXTO_MAX}
            onChange={set('nombre')}
          />
          <OutlinedField
            id="ffv3-mail"
            variant="form"
            label="Correo electrónico"
            type="email"
            value={values.mail}
            error={errors.mail}
            maxLength={TEXTO_MAX}
            onChange={set('mail')}
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

          <OutlinedSelect
            id="ffv3-rubro"
            variant="form"
            label="Rubro de la empresa"
            value={values.rubro}
            error={errors.rubro}
            options={rubros}
            onChange={setRubro}
          />

          {values.rubro === RUBRO_OTROS ? (
            <OutlinedField
              id="ffv3-rubro-otro"
              variant="form"
              label="Contanos el rubro"
              value={values.rubroOtro}
              error={errors.rubroOtro}
              maxLength={RUBRO_OTRO_MAX}
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
              maxLength={NUMERO_CLIENTE_LARGO}
              onChange={setDigits('numeroCliente')}
            />
          </div>
        ) : null}

        {/* Sólo aparece con el caso de uso "error de formulario" activo, y
            recién después de pulsar Enviar. Siempre montado —nunca
            `formError ? <p> : null`— para que la altura y la opacidad puedan
            animarse con una transición de CSS: una transición no anima un
            elemento que recién se agrega al DOM, sólo un cambio de valor en
            uno que ya estaba. */}
        <div className={styles.formErrorWrap} data-visible={Boolean(formError)}>
          <div className={styles.formErrorInner}>
            <p className={styles.formError} role="alert" aria-hidden={!formError}>
              {formError}
            </p>
          </div>
        </div>

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
