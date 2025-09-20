import { create } from "zustand";

export interface Product {
  id: number;
  title: string;
  image: string;
  selling: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  incrementQty: (id: number) => void;
  decrementQty: (id: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (product, quantity = 1) =>
    set((state) => {
      const exist = state.items.find((i) => i.id === product.id);
      if (exist) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
          ),
        };
      }
      return { items: [...state.items, { ...product, quantity }] };
    }),
  removeFromCart: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  incrementQty: (id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    })),
  decrementQty: (id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
      ),
    })),
}));
