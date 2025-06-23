import { useCartStore } from '@/lib/cartStore';

export const useCart = () => {
  const { items, addItem, removeItem, clearCart, isItemInCart } = useCartStore();

  return {
    items,
    count: items.length,
    addItem,
    removeItem,
    clearCart,
    isItemInCart,
    isEmpty: items.length === 0,
  };
};
