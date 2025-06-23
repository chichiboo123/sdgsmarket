import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SDGGoal } from './sdgData';

interface CartState {
  items: SDGGoal[];
  addItem: (goal: SDGGoal) => void;
  removeItem: (goalId: number) => void;
  clearCart: () => void;
  isItemInCart: (goalId: number) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (goal) => {
        const items = get().items;
        if (!items.find(item => item.id === goal.id)) {
          set({ items: [...items, goal] });
        }
      },
      removeItem: (goalId) => {
        set({ items: get().items.filter(item => item.id !== goalId) });
      },
      clearCart: () => set({ items: [] }),
      isItemInCart: (goalId) => {
        return get().items.some(item => item.id === goalId);
      },
    }),
    {
      name: 'sdg-cart-storage',
    }
  )
);
