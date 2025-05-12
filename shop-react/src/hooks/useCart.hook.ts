import {
  addCartItemApi,
  getCartApi,
  removeCartItemApi,
  setCartAddressApi,
  updateCartItemApi,
} from "@/api/cart.api";
import type { ICartResponse } from "@/interfaces/api/cart.interface";
import { useCallback, useEffect, useState } from "react";

export function useCart() {
  const [cart, setCart] = useState<ICartResponse>({ items: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCartApi();
      setCart(res.data);
    } catch (err: any) {
      setError(err.response.data.message || "Error al cargar el carrito");
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = useCallback(
    async (productId: string, quantity = 1) => {
      setLoading(true);
      try {
        await addCartItemApi(productId, quantity);
        await fetchCart();
      } catch (err: any) {
        setError(err.response.data.message || "Error al agregar al carrito");
      } finally {
        setLoading(false);
      }
    },
    [fetchCart]
  );

  const updateItem = useCallback(
    async (productId: string, quantity: number) => {
      setLoading(true);
      try {
        await updateCartItemApi(productId, quantity);
        await fetchCart();
      } catch (err: any) {
        setError(err.response.data.message || "Error al actualizar carrito");
      } finally {
        setLoading(false);
      }
    },
    [fetchCart]
  );

  const removeItem = useCallback(
    async (productId: string) => {
      setLoading(true);
      try {
        await removeCartItemApi(productId);
        await fetchCart();
      } catch (err: any) {
        setError(err.response.data.message || "Error al eliminar del carrito");
      } finally {
        setLoading(false);
      }
    },
    [fetchCart]
  );

  const setAddress = useCallback(async (shippingAddress: string) => {
    setLoading(true);
    try {
      await setCartAddressApi(shippingAddress);
      setCart((c) => ({ ...c, shippingAddress }));
    } catch (err: any) {
      setError(err.response.data.message || "Error al guardar la dirección");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return {
    cart,
    loading,
    error,
    fetchCart,
    addItem,
    updateItem,
    removeItem,
    setAddress,
  };
}
