import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '@/shared/types'

// ─── Types ────────────────────────────────────────────────────────────────────

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1) => {
        const existing = get().items.find((item) => item.product.id === product.id)

        if (existing) {
          // Product already in cart — increment quantity
          set((state) => ({
            items: state.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          }))
        } else {
          set((state) => ({
            items: [...state.items, { product, quantity }],
          }))
        }
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),

      updateQuantity: (productId, quantity) => {
        // Treat quantity <= 0 as a remove
        if (quantity <= 0) {
          set((state) => ({
            items: state.items.filter((item) => item.product.id !== productId),
          }))
          return
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: 'smartshop-cart', // localStorage key
      // Only persist cart items — isOpen (drawer state) resets on refresh
      partialize: (state) => ({ items: state.items }),
    }
  )
)

// ─── Selectors ────────────────────────────────────────────────────────────────
// Use these with useCartStore(selector) to subscribe to derived values only.
// Keeping derived state out of the store prevents stale sync bugs.

export const selectTotalItems = (state: CartState): number =>
  state.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectTotalPrice = (state: CartState): number =>
  state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
