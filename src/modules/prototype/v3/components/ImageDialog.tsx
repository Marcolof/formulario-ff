import { Minus, Plus, RotateCcw, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import styles from './ImageDialog.module.css'

/**
 * Visor de imagen a pantalla completa. Se comporta como un visor de fotos:
 * rueda del mouse o pinch del trackpad para acercar, arrastre para desplazar,
 * pinch de dos dedos y doble toque en pantallas táctiles, y teclado (+, -, 0).
 *
 * No se sumó ninguna librería: todo se resuelve con eventos de puntero, así que
 * el mismo código atiende mouse, trackpad y touch sin ramas por dispositivo.
 * El contenedor es un `<dialog>` nativo, como el modal de devolución de la v2:
 * el navegador ya resuelve foco atrapado, Esc, fondo inerte y devolución del foco.
 */

const MIN_SCALE = 1
const MAX_SCALE = 6
/** Acercamiento del doble clic / doble toque, y paso de los botones. */
const TOGGLE_SCALE = 2.5
const BUTTON_STEP = 1.4
/** Un arrastre de más de estos píxeles ya no cuenta como clic en el fondo. */
const DRAG_SLOP = 6
const DOUBLE_TAP_MS = 300

type View = { scale: number; x: number; y: number }

const INITIAL: View = { scale: 1, x: 0, y: 0 }

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

/**
 * Acerca manteniendo fijo el punto (px, py) —medido desde el centro de la
 * superficie—, que es lo que hace que el zoom siga al cursor o a los dedos.
 */
function zoomAt(view: View, nextScale: number, px: number, py: number): View {
  const scale = clamp(nextScale, MIN_SCALE, MAX_SCALE)
  const ratio = scale / view.scale
  return { scale, x: px - ratio * (px - view.x), y: py - ratio * (py - view.y) }
}

type Props = {
  open: boolean
  src: string
  alt: string
  /** Nombre accesible del diálogo; el detalle largo va en el `alt` de la imagen. */
  label: string
  onClose: () => void
}

export function ImageDialog({ open, src, alt, label, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const surfaceRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const [view, setView] = useState<View>(INITIAL)
  const [dragging, setDragging] = useState(false)
  const [animated, setAnimated] = useState(false)

  /** Punteros activos: uno es arrastre, dos son pinch. */
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const pinch = useRef<{ distance: number; x: number; y: number } | null>(null)
  const moved = useRef(false)
  const lastTap = useRef({ time: 0, x: 0, y: 0 })
  const animationTimer = useRef<number | undefined>(undefined)

  /** Evita que la imagen se pueda arrastrar fuera de la vista. */
  const clampView = useCallback((next: View): View => {
    const image = imageRef.current
    const surface = surfaceRef.current
    if (!image || !surface) return next
    const maxX = Math.max(0, (image.offsetWidth * next.scale - surface.clientWidth) / 2)
    const maxY = Math.max(0, (image.offsetHeight * next.scale - surface.clientHeight) / 2)
    return { scale: next.scale, x: clamp(next.x, -maxX, maxX), y: clamp(next.y, -maxY, maxY) }
  }, [])

  /** Los cambios por botón, doble clic o teclado se animan; el gesto continuo no. */
  const animate = useCallback(() => {
    setAnimated(true)
    window.clearTimeout(animationTimer.current)
    animationTimer.current = window.setTimeout(() => setAnimated(false), 200)
  }, [])

  useEffect(() => () => window.clearTimeout(animationTimer.current), [])

  const toCenter = (clientX: number, clientY: number) => {
    const surface = surfaceRef.current
    if (!surface) return { x: 0, y: 0 }
    const rect = surface.getBoundingClientRect()
    return { x: clientX - (rect.left + rect.width / 2), y: clientY - (rect.top + rect.height / 2) }
  }

  const zoomBy = useCallback(
    (factor: number, px = 0, py = 0) => {
      animate()
      setView((prev) => clampView(zoomAt(prev, prev.scale * factor, px, py)))
    },
    [animate, clampView],
  )

  const reset = useCallback(() => {
    animate()
    setView(INITIAL)
  }, [animate])

  const toggleZoom = useCallback(
    (px: number, py: number) => {
      animate()
      setView((prev) => (prev.scale > 1.01 ? INITIAL : clampView(zoomAt(prev, TOGGLE_SCALE, px, py))))
    },
    [animate, clampView],
  )

  // Al abrir, la imagen siempre arranca entera y centrada.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      setView(INITIAL)
      dialog.showModal()
    }
    if (!open && dialog.open) dialog.close()
  }, [open])

  // La rueda se escucha a mano porque React la registra como pasiva y ahí
  // `preventDefault()` no puede frenar el scroll ni el zoom del navegador.
  useEffect(() => {
    const surface = surfaceRef.current
    if (!surface) return

    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      // El pinch del trackpad llega como rueda con ctrlKey y con pasos finos.
      const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY
      const intensity = event.ctrlKey ? 0.01 : 0.0015
      const point = toCenter(event.clientX, event.clientY)
      setView((prev) => clampView(zoomAt(prev, prev.scale * Math.exp(-delta * intensity), point.x, point.y)))
    }

    surface.addEventListener('wheel', onWheel, { passive: false })
    return () => surface.removeEventListener('wheel', onWheel)
  }, [clampView])

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    // Capturar el puntero mantiene el arrastre aunque el cursor salga de la
    // superficie. Falla si el puntero ya no está activo, y eso no debe cortar el gesto.
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      /* el arrastre sigue funcionando sin captura */
    }
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    moved.current = false
    setDragging(true)
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const previous = pointers.current.get(event.pointerId)
    if (!previous) return
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    const points = [...pointers.current.values()]

    if (points.length >= 2) {
      const [a, b] = points
      const distance = Math.hypot(a.x - b.x, a.y - b.y)
      const middle = toCenter((a.x + b.x) / 2, (a.y + b.y) / 2)
      const last = pinch.current
      pinch.current = { distance, x: middle.x, y: middle.y }
      moved.current = true
      if (!last || last.distance === 0) return
      setView((prev) => {
        const zoomed = zoomAt(prev, prev.scale * (distance / last.distance), middle.x, middle.y)
        // Además del acercamiento, el visor sigue el desplazamiento de los dedos.
        return clampView({ ...zoomed, x: zoomed.x + (middle.x - last.x), y: zoomed.y + (middle.y - last.y) })
      })
      return
    }

    const dx = event.clientX - previous.x
    const dy = event.clientY - previous.y
    if (Math.abs(dx) > DRAG_SLOP || Math.abs(dy) > DRAG_SLOP) moved.current = true
    setView((prev) => clampView({ ...prev, x: prev.x + dx, y: prev.y + dy }))
  }

  const endPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(event.pointerId)
    if (pointers.current.size < 2) pinch.current = null
    if (pointers.current.size === 0) setDragging(false)

    // Doble toque: el evento `dblclick` no es confiable en pantallas táctiles.
    if (event.pointerType !== 'touch' || moved.current) return
    const now = Date.now()
    const near =
      Math.abs(event.clientX - lastTap.current.x) < 24 && Math.abs(event.clientY - lastTap.current.y) < 24
    if (now - lastTap.current.time < DOUBLE_TAP_MS && near) {
      const point = toCenter(event.clientX, event.clientY)
      toggleZoom(point.x, point.y)
      lastTap.current = { time: 0, x: 0, y: 0 }
      return
    }
    lastTap.current = { time: now, x: event.clientX, y: event.clientY }
  }

  const zoomLabel = `${Math.round(view.scale * 100)}%`

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label={label}
      onClose={() => {
        if (open) onClose()
      }}
      // El cierre nativo con Esc exige que el evento traiga su código de tecla;
      // atenderlo acá hace que Esc cierre siempre. Los atajos de zoom son para
      // quien no tenga rueda ni trackpad.
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          onClose()
        } else if (event.key === '+' || event.key === '=') {
          event.preventDefault()
          zoomBy(BUTTON_STEP)
        } else if (event.key === '-' || event.key === '_') {
          event.preventDefault()
          zoomBy(1 / BUTTON_STEP)
        } else if (event.key === '0') {
          event.preventDefault()
          reset()
        }
      }}
    >
      <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar">
        <X size={24} aria-hidden />
      </button>

      <div
        ref={surfaceRef}
        className={dragging ? `${styles.surface} ${styles.grabbing}` : styles.surface}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onDoubleClick={(event) => {
          const point = toCenter(event.clientX, event.clientY)
          toggleZoom(point.x, point.y)
        }}
        // Clic en el fondo para cerrar, pero sólo si fue un clic y no el final
        // de un arrastre.
        onClick={(event) => {
          if (event.target === event.currentTarget && !moved.current) onClose()
        }}
      >
        <img
          ref={imageRef}
          className={animated ? `${styles.image} ${styles.animated}` : styles.image}
          src={src}
          alt={alt}
          draggable={false}
          style={
            {
              '--view-x': `${view.x}px`,
              '--view-y': `${view.y}px`,
              '--view-scale': view.scale,
            } as React.CSSProperties
          }
        />
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.control}
          onClick={() => zoomBy(1 / BUTTON_STEP)}
          disabled={view.scale <= MIN_SCALE}
          aria-label="Alejar"
        >
          <Minus size={20} aria-hidden />
        </button>
        <p className={styles.zoomLevel} aria-live="off">
          {zoomLabel}
        </p>
        <button
          type="button"
          className={styles.control}
          onClick={() => zoomBy(BUTTON_STEP)}
          disabled={view.scale >= MAX_SCALE}
          aria-label="Acercar"
        >
          <Plus size={20} aria-hidden />
        </button>
        <button
          type="button"
          className={styles.control}
          onClick={reset}
          disabled={view.scale === 1 && view.x === 0 && view.y === 0}
          aria-label="Ver la imagen completa"
        >
          <RotateCcw size={18} aria-hidden />
        </button>
      </div>
    </dialog>
  )
}
