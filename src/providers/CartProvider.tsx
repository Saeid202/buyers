'use client';

import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
  ReactNode,
} from "react";

const CART_STORAGE_KEY = "bazaarno-cart-v1";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export type CartAction =
  | { type: "ADD_ITEM"; payload: { item: Omit<CartItem, "quantity">; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR" };

const CartContext = createContext<CartContextValue | undefined>(undefined);

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { item, quantity } = action.payload;
      const existingItem = state.items.find((current) => current.id === item.id);

      if (existingItem) {
        return {
          items: state.items.map((current) =>
            current.id === item.id
              ? { ...current, quantity: current.quantity + quantity }
              : current,
          ),
        };
      }

      return {
        items: [...state.items, { ...item, quantity }],
      };
    }
    case "REMOVE_ITEM": {
      return {
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }
    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        return {
          items: state.items.filter((item) => item.id !== id),
        };
      }

      return {
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item,
        ),
      };
    }
    case "CLEAR": {
      return { items: [] };
    }
    default: {
      return state;
    }
  }
}

function loadInitialState(): CartState {
  if (typeof window === "undefined") {
    return { items: [] };
  }

  try {
    const storedValue = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!storedValue) {
      return { items: [] };
    }

    const parsed = JSON.parse(storedValue) as CartState;
    if (!Array.isArray(parsed.items)) {
      return { items: [] };
    }

    return {
      items: parsed.items
        .filter((item) => item && typeof item.id === "string")
        .map((item) => ({
          ...item,
          currency: item.currency || "IRR", // برای سازگاری با داده‌های قدیمی
          quantity: Number.isFinite(item.quantity) ? Math.max(1, Number(item.quantity)) : 1,
        })),
    };
  } catch (error) {
    return { items: [] };
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    const totalItems = state.items.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    return {
      items: state.items,
      subtotal,
      totalItems,
      addItem: (item, quantity = 1) => {
        if (quantity <= 0) {
          return;
        }
        dispatch({ type: "ADD_ITEM", payload: { item, quantity } });
      },
      removeItem: (id) => {
        dispatch({ type: "REMOVE_ITEM", payload: { id } });
      },
      updateQuantity: (id, quantity) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
      },
      clearCart: () => dispatch({ type: "CLEAR" }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within CartProvider");
  }

  return context;
}

export { cartReducer };
