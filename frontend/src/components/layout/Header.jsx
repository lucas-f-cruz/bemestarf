import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi'
import { useCartStore } from '@/hooks/useStore'
import styles from './Header.module.css'

export default function Header() {
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const count = useCartStore(s => s.count)

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) navigate(`/busca?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header className={styles.header}>
      {/* TOPBAR */}
      <div className={styles.topbar}>
        <span>Bem-vindo à Bem Estar Farma Drogarias — Saúde e cuidado para você!</span>
        <span>Seg–Sáb: 7h às 22h &nbsp;|&nbsp; Dom: 8h às 20h &nbsp;|&nbsp; (84) 98602-4913</span>
      </div>

      {/* MAIN HEADER */}
      <div className={styles.main}>
        <Link to="/" className={styles.logo}>
          <img src="/logo.jpg" alt="Bem Estar Farma Drogarias" />
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
          aria-label="Menu"
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
    </header>
  )
}
