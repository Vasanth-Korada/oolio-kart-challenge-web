import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "../api/types";

export interface CartLine {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [linesByProductId, setLinesByProductId] = useState<Record<string, CartLine>>({});

  const addItem = (product: Product) => {
    setLinesByProductId((prev) => {
      const existing = prev[product.id];
      const quantity = (existing?.quantity ?? 0) + 1;
      return { ...prev, [product.id]: { product, quantity } };
    });
  };

  const removeItem = (productId: string) => {
    setLinesByProductId((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

  const setQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setLinesByProductId((prev) => {
      const existing = prev[productId];
      if (!existing) return prev;
      return { ...prev, [productId]: { ...existing, quantity } };
    });
  };

  const clear = () => setLinesByProductId({});

  const lines = useMemo(() => Object.values(linesByProductId), [linesByProductId]);
  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0),
    [lines],
  );

  const value: CartContextValue = {
    lines,
    addItem,
    removeItem,
    setQuantity,
    clear,
    itemCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
