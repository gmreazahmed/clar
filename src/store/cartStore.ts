import { create } from "zustand";

export interface Product {
  id: number;
  title: string;
  image: string;
  selling: number;
}

export interface CartItem extends Product {
  quantity: number;
  price: number; // Add price explicitly for cart calculations
}

export interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeItem: (id: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (product) => {
    const existing = get().items.find((i) => i.id === product.id);
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({
        items: [...get().items, { ...product, quantity: 1, price: product.selling }],
      });
    }
  },
  removeItem: (id) => {
    set({ items: get().items.filter((i) => i.id !== id) });
  },
  increment: (id) => {
    set({
      items: get().items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    });
  },
  decrement: (id) => {
    set({
      items: get().items.map((i) =>
        i.id === id
          ? { ...i, quantity: i.quantity > 1 ? i.quantity - 1 : 1 }
          : i
      ),
    });
  },
}));
