import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * React Router no resetea el scroll entre navegaciones: al ir de una página
 * larga (la landing) a otra, el navegador conserva la posición y la pantalla
 * nueva arranca a mitad de camino. Se fuerza el tope en cada cambio de ruta,
 * salvo que la navegación apunte a un ancla (`#formulario`, por ejemplo).
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
