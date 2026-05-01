import BannerCarousel from '@/components/sections/BannerCarousel'
import FiliaisSection from '@/components/sections/FiliaisSection'
import ProductCard from '@/components/ui/ProductCard'
import ContatoSection from '@/components/sections/ContatoSection'
import {
  FiTrendingUp, FiGrid, FiHeart, FiSmile, FiSun,
  FiPackage, FiUsers, FiShoppingBag, FiInfo, FiTag,
  FiTruck, FiStar, FiActivity, FiAward
} from 'react-icons/fi'
import { PRODUTOS_DESTAQUE } from '@/data'
import styles from './Home.module.css'

const SHORTCUTS = [
  { label: 'Ofertas',    Icon: FiTrendingUp,  bg: '#fff0f0', stroke: '#e8001c' },
  { label: 'Remédio',   Icon: FiGrid,        bg: '#e6f1fb', stroke: '#003087' },
  { label: 'Saúde',     Icon: FiHeart,       bg: '#e1f5ee', stroke: '#0f6e56' },
  { label: 'Beleza',    Icon: FiSmile,       bg: '#fbeaf0', stroke: '#d4537e' },
  { label: 'Dermo',     Icon: FiSun,         bg: '#eeedfe', stroke: '#534ab7' },
  { label: 'Higiene',   Icon: FiPackage,     bg: '#faeeda', stroke: '#ba7517' },
  { label: 'Infantil',  Icon: FiUsers,       bg: '#eaf3de', stroke: '#3b6d11' },
  { label: 'Mercearia', Icon: FiShoppingBag, bg: '#f0f0f0', stroke: '#5f5e5a' },
  { label: 'Vitaminas', Icon: FiInfo,        bg: '#e6f1fb', stroke: '#003087' },
  { label: 'Cupons',    Icon: FiTag,         bg: '#fff0f0', stroke: '#e8001c' },
]

const SERVICOS = [
  { Icon: FiTruck,    titulo: 'Entrega Rápida',    sub: 'Grátis acima de R$ 89' },
  { Icon: FiGrid,     titulo: 'Farmácia Popular',  sub: 'Medicamentos com desconto' },
  { Icon: FiActivity, titulo: 'Manipulação',       sub: 'Fórmulas personalizadas' },
  { Icon: FiAward,    titulo: 'Fidelidade',        sub: 'Ganhe pontos nas compras' },
]

export default function Home() {
  return (
    <main>
      {/* SHORTCUTS */}
      <div className={styles.shortcuts}>
        <div className={styles.shortcutsInner}>
          {SHORTCUTS.map(({ label, Icon, bg, stroke }) => (
            <button key={label} className={styles.shortcut}>
              <div className={styles.shortcutIcon} style={{ background: bg }}>
                <Icon size={22} color={stroke} />
              </div>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* BANNER CAROUSEL */}
      <BannerCarousel />

      {/* MAIS VENDIDOS */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.bar} />
              Mais Vendidos
            </h2>
            <button className={styles.seeAll}>Ver todos ›</button>
          </div>
          <div className={styles.productsGrid}>
            {PRODUTOS_DESTAQUE.map(p => (
              <ProductCard key={p.id} produto={p} />
            ))}
          </div>
        </div>
      </section>

      {/* FILIAIS */}
      <FiliaisSection />

      {/* SERVIÇOS */}
      <div className={styles.servicosWrap}>
        <div className={styles.servicos}>
          <div className={styles.servicosInner}>
            {SERVICOS.map(({ Icon, titulo, sub }) => (
              <div key={titulo} className={styles.servico}>
                <div className={styles.servicoIcon}><Icon size={20} color="#003087" /></div>
                <div>
                  <p className={styles.servicoT}>{titulo}</p>
                  <p className={styles.servicoS}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTATO */}
      <ContatoSection />
    </main>
  )
}
