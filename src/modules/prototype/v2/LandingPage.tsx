import { useLocation, useNavigate } from 'react-router-dom'

import { ChatButton } from '../v1/components/ChatButton'
import { HeroSection } from '../v1/components/HeroSection'
import { Navbar } from '../v1/components/Navbar'
import { ShortcutsSection } from '../v1/components/ShortcutsSection'
import { SiteFooter } from '../v1/components/SiteFooter'
import { WhyUsSection } from '../v1/components/WhyUsSection'
import styles from '../v1/LandingPage.module.css'
import '../prototype.tokens.css'
import { QuickAccessCarousel } from './components/QuickAccessCarousel'
import { ReturnsDialog } from './components/ReturnsDialog'
import { RETURNS_HASH, shortcutsTitle, shortcutsV2 } from './data/quickAccess.content'

/**
 * Versión 2 — propuesta de alto impacto sobre la landing. Parte de la v1 y sólo
 * cambia el bloque central: "Gestionar Devolución" y la grilla de servicios se
 * reemplazan por el carrusel "Conocé nuestros servicios". Hero, "¿Por qué
 * elegirnos?" y footer son los componentes de la v1.
 *
 * Los accesos directos se reusan con props: cambian título, orden y piel, pero
 * no hay un segundo componente ni una segunda copia de los datos.
 *
 * El modal de devolución se abre desde la URL (`#gestion-devolucion`), así se
 * puede enlazar directo y recargar con el modal abierto.
 */
export function LandingPage() {
  const { hash } = useLocation()
  const navigate = useNavigate()
  const returnsOpen = hash === RETURNS_HASH

  return (
    <div className={styles.landing} data-module="prototype">
      <Navbar />
      <main className={styles.main} id="scroll-container">
        <HeroSection />
        <QuickAccessCarousel onOpenReturns={() => navigate({ hash: RETURNS_HASH }, { replace: true })} />
        <ShortcutsSection
          title={shortcutsTitle}
          items={shortcutsV2}
          variant="v2"
          headingRules={false}
        />
        <WhyUsSection headingRules={false} />
        <SiteFooter />
        <ChatButton />
      </main>
      <ReturnsDialog open={returnsOpen} onClose={() => navigate({ hash: '' }, { replace: true })} />
    </div>
  )
}
