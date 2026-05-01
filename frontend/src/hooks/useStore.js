import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (produto) => {
        const items = get().items
        const exists = items.find(i => i.id === produto.id)
        if (exists) {
          set({ items: items.map(i => i.id === produto.id ? { ...i, qty: i.qty + 1 } : i) })
        } else {
          set({ items: [...items, { ...produto, qty: 1 }] })
        }
      },

      removeItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),

      updateQty: (id, qty) => {
        if (qty <= 0) { get().removeItem(id); return }
        set({ items: get().items.map(i => i.id === id ? { ...i, qty } : i) })
      },

      clearCart: () => set({ items: [] }),

      get total() {
        return get().items.reduce((acc, i) => acc + i.preco * i.qty, 0)
      },

      get count() {
        return get().items.reduce((acc, i) => acc + i.qty, 0)
      },
    }),
    { name: 'bemestarf-cart' }
  )
)

export const useContactStore = create((set) => ({
  loading: false,
  sent: false,
  error: null,

  sendMessage: async (data) => {
    set({ loading: true, error: null })
    try {
      // TODO: substituir pela chamada real da API
      await new Promise(r => setTimeout(r, 1200))
      set({ loading: false, sent: true })
    } catch {
      set({ loading: false, error: 'Erro ao enviar. Tente novamente.' })
    }
  },

  reset: () => set({ sent: false, error: null }),
}))
