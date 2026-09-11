import { ChatButton } from './components/ChatButton'
import { HeroSection } from './components/HeroSection'
import { Navbar } from './components/Navbar'
import { ReturnsSection } from './components/ReturnsSection'
import { ServicesSection } from './components/ServicesSection'
import { ShortcutsSection } from './components/ShortcutsSection'
import { SiteFooter } from './components/SiteFooter'
import { WhyUsSection } from './components/WhyUsSection'
import '../prototype.tokens.css'
import styles from './LandingPage.module.css'

export function LandingPage() {
  return (
    <div className={styles.landing} data-module="prototype">
      <Navbar />
      <main className={styles.main} id="scroll-container">
        <HeroSection />
        <ReturnsSection />
        <ServicesSection />
        <ShortcutsSection />
        <WhyUsSection />
        <SiteFooter />
        <ChatButton />
      </main>
    </div>
  )
}
