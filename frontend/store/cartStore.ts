import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface CartItem {
  menuItemId: number
  name: string
  price: number
  quantity: number
  restaurantId: number
}

interface CartState {
  items: CartItem[]
  restaurantId: number | null
  addItem: (item: CartItem) => void
  removeItem: (menuItemId: number) => void
  updateQuantity: (menuItemId: number, quantity: number) => void
  clearCart: () => void
  getSubtotal: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.menuItemId === item.menuItemId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.menuItemId === item.menuItemId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }
          return {
            items: [...state.items, item],
            restaurantId: item.restaurantId,
          }
        })
      },

      removeItem: (menuItemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.menuItemId !== menuItemId),
        }))
      },

      updateQuantity: (menuItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(menuItemId)
        } else {
          set((state) => ({
            items: state.items.map((i) =>
              i.menuItemId === menuItemId ? { ...i, quantity } : i
            ),
          }))
        }
      },

      clearCart: () => {
        set({ items: [], restaurantId: null })
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },
    }),
    {
      name: 'dream-cart-storage',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return window.localStorage
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        }
      }),
    }
  )
)
