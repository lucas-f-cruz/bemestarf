import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiMenu, FiGrid, FiHeart, FiSmile, FiPackage,
  FiUsers, FiSun, FiTrendingUp, FiBook
} from 'react-icons/fi'
import { DEPARTAMENTOS } from '@/data'
import styles from './Navbar.module.css'
// import styles from './Navbar.module.css'

const NAV_ITEMS = [
  { label: 'Medicamentos', icon: FiGrid,       to: '/categoria/medicamentos' },
  { label: 'Saúde',        icon: FiHeart,      to: '/categoria/saude' },
  { label: 'Beleza',       icon: FiSmile,      to: '/categoria/beleza' },
  { label: 'Higiene',      icon: FiPackage,    to: '/categoria/higiene' },
  { label: 'Infantil',     icon: FiUsers,      to: '/categoria/infantil' },
  { label: 'Serviços',     icon: FiSun,        to: '/servicos' },
  { label: 'Ofertas',      icon: FiTrendingUp, to: '/ofertas' },
  { label: 'Blog',         icon: FiBook,       to: '/blog' },
]

export default function Navbar() {
  const [deptOpen, setDeptOpen] = useState(false)

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        {/* DEPARTAMENTOS */}
        <div
          className={styles.deptWrap}
          onMouseEnter={() => setDeptOpen(true)}
          onMouseLeave={() => setDeptOpen(false)}
        >
          <button className={`${styles.navItem} ${styles.dept}`}>
            <FiMenu size={14} />
            Departamentos
            <span className={styles.chevron}>▾</span>
          </button>

          {deptOpen && (
            <div className={styles.dropdown}>
              <div className={styles.sidebar}>
                {DEPARTAMENTOS.map(d => (
                  <Link key={d.id} to={`/categoria/${d.id}`} className={styles.sidebarItem}>
                    {d.label} <span>›</span>
                  </Link>
                ))}
              </div>
              <div className={styles.dropContent}>
                <p className={styles.dropTitle}>Todos os departamentos</p>
                <div className={styles.dropCols}>
                  {DEPARTAMENTOS.slice(0, 4).map(dept => (
                    <div key={dept.id} className={styles.dropCol}>
                      <h4>{dept.label}</h4>
                      <ul>
                        {dept.subcategorias[0]?.itens.slice(0, 5).map(item => (
                          <li key={item}>
                            <Link to={`/busca?q=${item}`}>{item}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* NAV ITEMS */}
        {NAV_ITEMS.map(({ label, icon: Icon, to }) => (
          <Link key={label} to={to} className={styles.navItem}>
            <Icon size={14} />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
