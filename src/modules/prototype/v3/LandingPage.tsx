import { useLocation, useNavigate } from 'react-router-dom'

import { ChatButton } from '../v1/components/ChatButton'
import { HeroSection } from '../v1/components/HeroSection'
import { Navbar } from '../v1/components/Navbar'
import { ReturnsSection } from '../v1/components/ReturnsSection'
import { ServicesSection } from '../v1/components/ServicesSection'
import { ShortcutsSection } from '../v1/components/ShortcutsSection'
import { SiteFooter } from '../v1/components/SiteFooter'
import { WhyUsSection } from '../v1/components/WhyUsSection'
import styles from '../v1/LandingPage.module.css'
import '../prototype.tokens.css'
import { ImageDialog } from './components/ImageDialog'
import { FULFILLMENT_HASH, fulfillmentImage } from './data/v3.content'

/**
 * Versión 3 — la landing es exactamente la de la v1: los mismos componentes, en
 * el mismo orden, sin variantes de estilo. Lo único que cambia es el destino del
 * CTA de Fulfillment: en vez de abrir la página con el formulario, muestra el
 * flyer del cliente en un visor a pantalla completa.
 *
 * El visor vive en la URL (`#fulfillment`), así que se puede enlazar y recargar
 * con la imagen abierta.
 */
export function LandingPage() {
  const { hash } = useLocation()
  const navigate = useNavigate()

  return (
    <div className={styles.landing} data-module="prototype">
      <Navbar />
      <main className={styles.main} id="scroll-container">
        <HeroSection />
        <ReturnsSection />
        <ServicesSection
          actions={{ fulfillment: () => navigate({ hash: FULFILLMENT_HASH }, { replace: true }) }}
        />
        <ShortcutsSection />
        <WhyUsSection />
        <SiteFooter />
        <ChatButton />
      </main>
      <ImageDialog
        open={hash === FULFILLMENT_HASH}
        src={fulfillmentImage.src}
        alt={fulfillmentImage.alt}
        label="Fulfillment de Correo Argentino"
        onClose={() => navigate({ hash: '' }, { replace: true })}
      />
    </div>
  )
}
