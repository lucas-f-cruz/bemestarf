import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi'
import { useCartStore } from '@/hooks/useStore'
import styles from './Header.module.css'

const MOBILE_NAV = [
  { label: '🏪 Departamentos',  to: '/' },
  { label: '💊 Medicamentos',   to: '/categoria/medicamentos' },
  { label: '❤️ Saúde',          to: '/categoria/saude' },
  { label: '✨ Beleza',         to: '/categoria/beleza' },
  { label: '🧴 Higiene',        to: '/categoria/higiene' },
  { label: '👶 Infantil',       to: '/categoria/infantil' },
  { label: '⚙️ Serviços',       to: '/servicos' },
  { label: '📈 Ofertas',        to: '/ofertas' },
  { label: '👤 Minha Conta',    to: '/conta' },
  { label: '🛒 Carrinho',       to: '/carrinho' },
]

export default function Header() {
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const count = useCartStore(s => s.count)

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/busca?q=${encodeURIComponent(query.trim())}`)
      setMobileOpen(false)
    }
  }

  return (
    <header className={styles.header}>
      {/* TOPBAR */}
      <div className={styles.topbar}>
        <div className={styles.topbarInner}>
          <span>Bem-vindo à Bem Estar Farma Drogarias</span>
          <span>Seg–Sáb: 7h às 22h &nbsp;|&nbsp; Dom: 8h às 20h &nbsp;|&nbsp; (84) 98602-4913</span>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className={styles.main}>
        <div className={styles.mainInner}>
          <Link to="/" className={styles.logo}>
            <img src="/logo.png" alt="Bem Estar Farma Drogarias" />
          </Link>

          <form className={styles.searchBar} onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Busque por medicamentos, higiene, beleza..."
              autoComplete="off"
            />
            <button type="submit" aria-label="Buscar">
              <FiSearch size={18} />
            </button>
          </form>

          <div className={styles.actions}>
            <Link to="/conta" className={styles.actionBtn}>
              <FiUser size={22} />
              <span>Entrar</span>
            </Link>
            <Link to="/carrinho" className={styles.cartBtn}>
              <FiShoppingBag size={18} />
              Carrinho
              {count > 0 && <span className={styles.badge}>{count}</span>}
            </Link>
          </div>

          <button
            className={styles.menuToggle}
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      {mobileOpen && (
        <nav className={styles.mobileNav}>
          {MOBILE_NAV.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={styles.mobileNavItem}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
