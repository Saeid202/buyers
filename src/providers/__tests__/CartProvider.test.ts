import { describe, expect, it } from "vitest";
import {
  cartReducer,
  type CartItem,
  type CartState,
} from "@/providers/CartProvider";

const baseProduct = {
  id: "item-1",
  slug: "item-1",
  name: "محصول آزمایشی",
  price: 100_000,
  image: "https://example.com/image.jpg",
};

const baseItem: CartItem = {
  ...baseProduct,
  quantity: 1,
};

describe("cartReducer", () => {
  it("should add a new item to an empty cart", () => {
    const initialState: CartState = { items: [] };

    const nextState = cartReducer(initialState, {
      type: "ADD_ITEM",
      payload: { item: baseProduct, quantity: 2 },
    });

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0]).toMatchObject({ id: baseProduct.id, quantity: 2 });
  });

  it("should increase the quantity when adding an existing item", () => {
    const initialState: CartState = { items: [{ ...baseItem, quantity: 1 }] };

    const nextState = cartReducer(initialState, {
      type: "ADD_ITEM",
      payload: { item: baseProduct, quantity: 3 },
    });

    expect(nextState.items[0].quantity).toBe(4);
  });

  it("should remove an item when quantity is updated to zero", () => {
    const initialState: CartState = { items: [{ ...baseItem, quantity: 2 }] };

    const nextState = cartReducer(initialState, {
      type: "UPDATE_QUANTITY",
      payload: { id: baseProduct.id, quantity: 0 },
    });

    expect(nextState.items).toHaveLength(0);
  });

  it("should clear the cart", () => {
    const initialState: CartState = {
      items: [
        { ...baseItem, id: "1" },
        { ...baseItem, id: "2", slug: "product-2" },
      ],
    };

    const nextState = cartReducer(initialState, { type: "CLEAR" });

    expect(nextState.items).toHaveLength(0);
  });
});
