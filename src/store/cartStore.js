import { create } from 'zustand'

export const useCartStore = create((set, get) => ({
  items: [],
  isOpen: false,

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  addItem: (product, size) =>
    set((state) => {
      const existing = state.items.find(
        (item) => item.id === product.id && item.size === size
      )
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }
      return {
        items: [
          ...state.items,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            size,
            quantity: 1,
          },
        ],
      }
    }),

  removeItem: (id, size) =>
    set((state) => ({
      items: state.items.filter(
        (item) => !(item.id === id && item.size === size)
      ),
    })),

  updateQuantity: (id, size, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter(
            (item) => !(item.id === id && item.size === size)
          ),
        }
      }
      return {
        items: state.items.map((item) =>
          item.id === id && item.size === size ? { ...item, quantity } : item
        ),
      }
    }),

  getTotal: () => {
    const { items } = get()
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },

  getCount: () => {
    const { items } = get()
    return items.reduce((sum, item) => sum + item.quantity, 0)
  },

  clearCart: () => set({ items: [] }),
}))
