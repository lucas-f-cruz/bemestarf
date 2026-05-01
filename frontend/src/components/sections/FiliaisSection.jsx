import { useState } from 'react'
import { FiMapPin, FiPhone, FiInstagram, FiExternalLink, FiClock } from 'react-icons/fi'
import { FILIAIS } from '@/data'
import styles from './FiliaisSection.module.css'

export default function FiliaisSection() {
  const [active, setActive] = useState(0)
  const filial = FILIAIS[active]

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <span className={styles.titleBar} />
          Nossas Filiais
        </h2>
        <span className={styles.count}>{FILIAIS.length} unidades</span>
      </div>

      <div className={styles.box}>
        {/* TABS */}
        <div className={styles.tabs}>
          {FILIAIS.map((f, i) => (
            <button
              key={f.id}
              className={`${styles.tab} ${i === active ? styles.tabActive : ''}`}
              onClick={() => setActive(i)}
            >
              <span className={`${styles.dot} ${f.aberto ? styles.dotOpen : styles.dotClosed}`} />
              <span>Filial {f.id < 10 ? `0${f.id}` : f.id}</span>
              <span className={styles.tabName}>{f.nome}</span>
            </button>
          ))}
        </div>

        {/* DETAIL PANEL */}
        <div className={styles.panel} key={filial.id}>
          <div className={styles.detail}>
            <div className={styles.detailBlock}>
              <span className={styles.label}>Filial</span>
              <p className={styles.value}>
                <strong>Filial {filial.id < 10 ? `0${filial.id}` : filial.id} — {filial.nome}</strong>
              </p>
              <p className={styles.value}>{filial.bairro}</p>
            </div>

            <div className={styles.detailBlock}>
              <span className={styles.label}>Contato</span>
              <a href={filial.whatsappLink} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                <FiPhone size={13} /> {filial.whatsapp}
              </a>
              <a href={filial.instagramLink} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                <FiInstagram size={13} /> {filial.instagram}
              </a>
            </div>

            <div className={styles.detailBlock}>
              <span className={styles.label}>Horário</span>
              <div className={styles.horario}>
                <span><FiClock size={12} /> Seg–Sex</span>
                <strong>{filial.horario.semana}</strong>
              </div>
              <div className={styles.horario}>
                <span><FiClock size={12} /> Sábado</span>
                <strong>{filial.horario.sabado}</strong>
              </div>
              <div className={styles.horario}>
                <span><FiClock size={12} /> Domingo</span>
                <strong>{filial.horario.domingo}</strong>
              </div>
            </div>

            <div className={styles.detailBlock}>
              <span className={styles.label}>Status</span>
              <span className={filial.aberto ? styles.statusOpen : styles.statusClosed}>
                ● {filial.aberto ? 'Aberto agora' : 'Fechado'}
              </span>
              <div className={styles.actions}>
                <a href={filial.whatsappLink} target="_blank" rel="noopener noreferrer" className={styles.btnWpp}>
                  WhatsApp
                </a>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(filial.bairro)}`} target="_blank" rel="noopener noreferrer" className={styles.btnMap}>
                  <FiMapPin size={13} /> Rota
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
