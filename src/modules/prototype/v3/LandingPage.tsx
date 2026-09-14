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
import { FULFILLMENT_ROUTE_V3 } from './data/v3.content'

/**
 * Versión 3 — la landing es exactamente la de la v1: los mismos componentes, en
 * el mismo orden, sin variantes de estilo. Lo único que cambia es el destino del
 * CTA de Fulfillment, que lleva a la pantalla propia de esta versión.
 */
export function LandingPage() {
  return (
    <div className={styles.landing} data-module="prototype">
      <Navbar />
      <main className={styles.main} id="scroll-container">
        <HeroSection />
        <ReturnsSection />
        <ServicesSection hrefs={{ fulfillment: FULFILLMENT_ROUTE_V3 }} />
        <ShortcutsSection />
        <WhyUsSection />
        <SiteFooter />
        <ChatButton />
      </main>
    </div>
  )
}
