// ARQUIVO: src/store/cartStore.ts (Atualizado)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CartItem = {
  variantId: number
  productId: number
  title: string
  handle: string
  imageSrc: string
  price: number
  quantity: number
}

// 1. ADICIONA OS NOVOS ESTADOS AQUI
type CartState = {
  items: CartItem[]
  isCartOpen: boolean // <--- NOVO: O painel está aberto?
  addItem: (item: CartItem) => void
  removeItem: (variantId: number) => void
  updateQuantity: (variantId: number, newQuantity: number) => void
  clearCart: () => void
  toggleCart: () => void // <--- NOVO: Ação para abrir/fechar
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false, // <--- NOVO: Estado inicial é "fechado"

      // --- AÇÃO: ABRIR/FECHAR O CARRINHO ---
      toggleCart: () => {
        set((state) => ({ isCartOpen: !state.isCartOpen }))
      },

      // --- AÇÕES DO CARRINHO (continuam as mesmas) ---
      addItem: (itemToAdd) => {
        const items = get().items
        const existingItem = items.find(
          (item) => item.variantId === itemToAdd.variantId
        )

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.variantId === itemToAdd.variantId
                ? { ...item, quantity: item.quantity + itemToAdd.quantity }
                : item
            ),
          })
        } else {
          set({ items: [...items, itemToAdd] })
        }
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter((item) => item.variantId !== variantId),
        })
      },

      updateQuantity: (variantId, newQuantity) => {
        if (newQuantity <= 0) {
          get().removeItem(variantId)
        } else {
          set({
            items: get().items.map((item) =>
              item.variantId === variantId
                ? { ...item, quantity: newQuantity }
                : item
            ),
          })
        }
      },

      clearCart: () => {
        set({ items: [] })
      },
    }),
    {
      name: 'cajuia-cart-storage',
      // 2. DIZ AO PERSIST PARA SALVAR APENAS OS ITENS
      // (Não queremos que o carrinho fique aberto se o cliente der F5)
      partialize: (state) => ({ items: state.items }),
    }
  )
)