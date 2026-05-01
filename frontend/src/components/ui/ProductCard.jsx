import { FiShoppingBag } from 'react-icons/fi'
import { useCartStore } from '@/hooks/useStore'
import toast from 'react-hot-toast'
import styles from './ProductCard.module.css'

export default function ProductCard({ produto }) {
  const addItem = useCartStore(s => s.addItem)

  const handleAdd = () => {
    addItem(produto)
    toast.success(`${produto.nome} adicionado!`, { duration: 2000 })
  }

  return (
    <div className={styles.card}>
      {produto.desconto && (
        <span className={styles.badge}>-{produto.desconto}%</span>
      )}
      <div className={styles.img}>
        <span role="img" aria-label={produto.nome}>{produto.emoji}</span>
      </div>
      <p className={styles.nome}>{produto.nome}</p>
      {produto.precoOriginal && (
        <p className={styles.original}>R$ {produto.precoOriginal.toFixed(2).replace('.', ',')}</p>
      )}
      <p className={styles.preco}>
        <span>R$ </span>{produto.preco.toFixed(2).replace('.', ',')}
      </p>
      <button className={styles.addBtn} onClick={handleAdd}>
        <FiShoppingBag size={13} /> Adicionar
      </button>
    </div>
  )
}
