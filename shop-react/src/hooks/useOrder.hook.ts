import {
  createOrderApi,
  getOrderApi,
  getOrdersApi,
  updateOrderApi,
} from "@/api/order.api";
import type {
  IOrderDetailResponse,
  IOrderSummaryResponse,
  IOrderUpdateRequest,
} from "@/interfaces/api/order.interface";
import { useCallback, useEffect, useState } from "react";

export function useOrder() {
  const [orders, setOrders] = useState<IOrderSummaryResponse[]>([]);
  const [orderDetail, setOrderDetail] = useState<IOrderDetailResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await getOrdersApi();
      const sortedList = list.sort(
        (a, b) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
      setOrders(sortedList);
    } catch (err: any) {
      setError(err.response.data.message || "Error al cargar órdenes");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOrder = useCallback(async (orderId: string) => {
    setLoading(true);
    setError(null);
    try {
      const detail = await getOrderApi(orderId);
      setOrderDetail(detail.data);
    } catch (err: any) {
      setError(err.response.data.message || "Error al cargar detalle de orden");
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrder = useCallback(async (): Promise<string> => {
    setLoading(true);
    setError(null);
    try {
      const res = await createOrderApi();
      return res.data.orderId;
    } catch (err: any) {
      setError(err.response.data.message || "Error al crear orden");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOrder = useCallback(
    async (orderId: string, data: IOrderUpdateRequest) => {
      setLoading(true);
      setError(null);
      try {
        await updateOrderApi(orderId, data);
        // recarga el detalle actualizado
        await fetchOrder(orderId);
        // opcional: recarga el listado
        await fetchOrders();
      } catch (err: any) {
        setError(err.response?.data?.message || "Error al actualizar orden");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchOrder, fetchOrders]
  );

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    orderDetail,
    loading,
    error,
    fetchOrders,
    fetchOrder,
    createOrder,
    updateOrder,
  };
}
