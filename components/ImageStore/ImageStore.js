import create from 'zustand';

export const useImageStore = create((set) => ({
  cart: [],
  addToCart: (product) => set((state) => {
    const existingProduct = state.cart.find(item => item.imdbID === product.imdbID);
    if (existingProduct) {
      return {
        cart: state.cart.map(item =>
          item.imdbID === product.imdbID
            ? { ...item, Quantity: (item.Quantity || 0) + 1 }
            : item
        )
      };
    } else {
      return { cart: [...state.cart, { ...product, Quantity: 1 }] };
    }
  }),
  incrementCartItemQuantity: (productId) => set((state) => ({
    cart: state.cart.map(item =>
      item.imdbID === productId
        ? { ...item, Quantity: (item.Quantity || 0) + 1 }
        : item
    )
  })),
  decrementCartItemQuantity: (productId) => set((state) => ({
    cart: state.cart.map(item =>
      item.imdbID === productId && item.Quantity > 0
        ? { ...item, Quantity: item.Quantity - 1 }
        : item
    ).filter(item => item.Quantity > 0)
  })),
}));