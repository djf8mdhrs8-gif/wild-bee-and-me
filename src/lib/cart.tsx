"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { findVariant } from "@/lib/products";

export type CartLine = {
  variantId: string;
  quantity: number;
};

/** A cart line joined with catalogue data for rendering. */
export type ResolvedLine = CartLine & {
  productSlug: string;
  productName: string;
  variantName: string;
  art: "honey" | "salve" | "balm";
  image?: string;
  unitPrice: number;
  lineTotal: number;
};

const STORAGE_KEY = "wildbee.cart.v1";
const MAX_QTY = 20;

/* ---------------------------------------------------------------------------
 * The cart lives in a tiny external store rather than component state.
 *
 * localStorage is an external system, so `useSyncExternalStore` is the correct
 * React primitive here: the server renders an empty cart, the client swaps in
 * the stored one on subscribe, and changes in another tab propagate for free.
 * ------------------------------------------------------------------------- */

type StoreState = { lines: CartLine[]; hydrated: boolean };

/** Stable snapshot for SSR — must be referentially constant. */
const SERVER_STATE: StoreState = { lines: [], hydrated: false };

let state: StoreState = SERVER_STATE;
const listeners = new Set<() => void>();

const emit = () => {
  for (const listener of listeners) listener();
};

const parseStoredCart = (raw: string | null): CartLine[] => {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((entry): CartLine[] => {
      if (typeof entry !== "object" || entry === null) return [];
      const { variantId, quantity } = entry as Record<string, unknown>;
      if (typeof variantId !== "string" || typeof quantity !== "number") return [];
      // Drop lines whose variant no longer exists in the catalogue.
      if (!findVariant(variantId)) return [];
      return [
        {
          variantId,
          quantity: Math.min(MAX_QTY, Math.max(1, Math.round(quantity))),
        },
      ];
    });
  } catch {
    return [];
  }
};

const readStorage = (): CartLine[] => {
  try {
    return parseStoredCart(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
};

const writeStorage = (lines: CartLine[]) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // Private browsing or a full quota — the cart still works for this session.
  }
};

/** Replace the cart, persist it, and notify subscribers. */
const setLines = (updater: (current: CartLine[]) => CartLine[]) => {
  const next = updater(state.lines);
  state = { lines: next, hydrated: true };
  writeStorage(next);
  emit();
};

const onStorageEvent = (event: StorageEvent) => {
  if (event.key !== STORAGE_KEY) return;
  state = { lines: parseStoredCart(event.newValue), hydrated: true };
  emit();
};

const subscribe = (listener: () => void) => {
  // First subscriber pulls the persisted cart in and starts cross-tab sync.
  if (listeners.size === 0) {
    state = { lines: readStorage(), hydrated: true };
    window.addEventListener("storage", onStorageEvent);
  }
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("storage", onStorageEvent);
    }
  };
};

const getSnapshot = () => state;
const getServerSnapshot = () => SERVER_STATE;

/* ------------------------------------------------------------------------- */

type CartContextValue = {
  lines: CartLine[];
  resolved: ResolvedLine[];
  itemCount: number;
  /**
   * Goods total. There is no shipping or tax line: the farm arranges local
   * pickup or delivery directly, so the cart total is what the goods cost.
   */
  subtotal: number;
  /** False until the stored cart has been read, so the UI can avoid a flash. */
  hydrated: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (variantId: string, quantity?: number) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  remove: (variantId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { lines, hydrated } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const add = useCallback((variantId: string, quantity = 1) => {
    if (!findVariant(variantId)) return;

    setLines((current) => {
      const existing = current.find((line) => line.variantId === variantId);
      if (!existing) {
        return [...current, { variantId, quantity: Math.min(MAX_QTY, quantity) }];
      }
      return current.map((line) =>
        line.variantId === variantId
          ? { ...line, quantity: Math.min(MAX_QTY, line.quantity + quantity) }
          : line,
      );
    });

    setIsOpen(true);
  }, []);

  const setQuantity = useCallback((variantId: string, quantity: number) => {
    setLines((current) =>
      quantity <= 0
        ? current.filter((line) => line.variantId !== variantId)
        : current.map((line) =>
            line.variantId === variantId
              ? { ...line, quantity: Math.min(MAX_QTY, quantity) }
              : line,
          ),
    );
  }, []);

  const remove = useCallback((variantId: string) => {
    setLines((current) => current.filter((line) => line.variantId !== variantId));
  }, []);

  const clear = useCallback(() => setLines(() => []), []);

  const value = useMemo<CartContextValue>(() => {
    const resolved = lines.flatMap((line): ResolvedLine[] => {
      const match = findVariant(line.variantId);
      if (!match) return [];
      const { product, variant } = match;
      return [
        {
          ...line,
          productSlug: product.slug,
          productName: product.name,
          variantName: variant.name,
          art: product.art,
          image: variant.image ?? product.image,
          unitPrice: variant.price,
          lineTotal: variant.price * line.quantity,
        },
      ];
    });

    const subtotal = resolved.reduce((sum, line) => sum + line.lineTotal, 0);

    return {
      lines,
      resolved,
      itemCount: resolved.reduce((sum, line) => sum + line.quantity, 0),
      subtotal,
      hydrated,
      isOpen,
      openCart,
      closeCart,
      add,
      setQuantity,
      remove,
      clear,
    };
  }, [lines, hydrated, isOpen, openCart, closeCart, add, setQuantity, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a <CartProvider>");
  }
  return context;
}
