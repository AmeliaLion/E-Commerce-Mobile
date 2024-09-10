import { create } from 'zustand'

export const useImageStore = create((set) => ({
  images: [],
  setImages: (list) => set(() => ({ images: list })),
  cart: [],
  setCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  incrementCartItemQuantity: (itemId) => set((state) => ({
    cart: state.cart.map((item) =>
      item.imdbID === itemId ? { ...item, Quantity: item.Quantity + 1 } : item
    ),
  })),
  decrementCartItemQuantity: (itemId) => set((state) => ({
    cart: state.cart.map((item) =>
      item.imdbID === itemId && item.Quantity > 0
        ? { ...item, Quantity: item.Quantity - 1 }
        : item
    ).filter((item) => item.Quantity > 0),
  })),
  removeCartItem: (itemId) => set((state) => ({
    cart: state.cart.filter((item) => item.imdbID !== itemId),
  })),
}))