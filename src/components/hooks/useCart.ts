import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantityToAdd?: number) => void;
  removeItem: (productId: number) => void;
  clearItem: (productId: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product, quantityToAdd = 1) => {
    if (!product || !product.id || quantityToAdd <= 0) {
      return;
    }

    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }

      return [
        ...prevItems,
        { ...product, quantity: quantityToAdd, price: product.price ?? 0 },
      ];
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearItem = useCallback((productId: number) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totals = useMemo(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    return { totalItems, totalPrice };
  }, [items]);

  const { totalItems, totalPrice } = totals;

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      clearItem,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [items, addItem, removeItem, clearItem, clearCart, totalItems, totalPrice]
  );

  return React.createElement(CartContext.Provider, { value }, children);
}

export default function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
