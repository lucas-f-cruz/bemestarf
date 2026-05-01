import { useState, useEffect, useCallback } from 'react'
import { BANNERS } from '@/data'
import styles from './BannerCarousel.module.css'

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0)

  const goTo = useCallback((i) => {
    setCurrent((i + BANNERS.length) % BANNERS.length)
  }, [])

  useEffect(() => {
    const t = setInterval(() => goTo(current + 1), 5000)
    return () => clearInterval(t)
  }, [current, goTo])

  const banner = BANNERS[current]

  return (
    <section className={styles.wrapper}>
      <div className={styles.carousel} style={{ background: banner.cor }}>
        {/* decorative circles */}
        <div className={styles.circle1} />
        <div className={styles.circle2} />

        <div className={styles.content}>
          <div className={styles.left}>
            <span className={styles.tag}>{banner.tag}</span>
            <h2 className={styles.title}>
              {banner.titulo.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h2>
            <p className={styles.sub}>{banner.subtitulo}</p>
            <button className={styles.btn}>{banner.btnText}</button>
          </div>

          <div className={styles.badges}>
            {banner.badges.map((b, i) => (
              <div key={i} className={styles.badge}>
                <span className={styles.num}>{b.num}</span>
                <span className={styles.lbl}>{b.lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* arrows */}
        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => goTo(current - 1)}>‹</button>
        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => goTo(current + 1)}>›</button>
      </div>

      {/* dots */}
      <div className={styles.dots}>
        {BANNERS.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
