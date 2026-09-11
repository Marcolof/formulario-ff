import { useEffect, useState } from 'react'

import { heroSlides } from '../data/landing.content'
import { LoginCard } from './LoginCard'
import styles from './HeroSection.module.css'

const ROTATION_MS = 5000

export function HeroSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % heroSlides.length)
    }, ROTATION_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className={styles.hero}>
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {heroSlides.map((slide, index) => (
            <div
              className={styles.slide}
              key={index}
              style={
                {
                  '--slide-logo-max': `${slide.logoWidth}px`,
                  '--slide-logo-max-mobile': `${slide.logoWidthMobile}px`,
                  '--slide-title-max': `${slide.titleWidth}px`,
                  '--slide-title-max-mobile': `${slide.titleWidthMobile}px`,
                } as React.CSSProperties
              }
            >
              <img className={styles.background} src={slide.background} alt="background" />
              <div className={styles.slideContainer}>
                <div className={styles.slideContent}>
                  <img className={styles.slideLogo} src={slide.logo} alt="top" />
                  <img className={styles.slideTitle} src={slide.title} alt="bottom" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.dots}>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Ir al step ${index + 1}`}
              className={index === active ? styles.dotActive : styles.dot}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>

      <div className={styles.overlayContainer}>
        <div className={styles.overlayInner}>
          <div className={styles.loginSlot}>
            <LoginCard />
          </div>
        </div>
      </div>
    </div>
  )
}
