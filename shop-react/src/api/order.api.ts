import { API_ROUTES } from "@/constants";
import type { ApiResponse } from "@/interfaces/api/api-response";
import type {
  IOrderCreateResponse,
  IOrderDetailResponse,
  IOrderSummaryResponse,
  IOrderUpdateRequest,
} from "@/interfaces/api/order.interface";
import http from "./http";

export const getOrdersApi = async (): Promise<IOrderSummaryResponse[]> => {
  const res = await http.get<ApiResponse<IOrderSummaryResponse[]>>(
    API_ROUTES.order.orders
  );
  return res.data.data;
};

export const getOrderApi = async (
  orderId: string
): Promise<ApiResponse<IOrderDetailResponse>> => {
  const res = await http.get<ApiResponse<IOrderDetailResponse>>(
    API_ROUTES.order.order.replace(":orderId", orderId)
  );
  return res.data;
};

export const createOrderApi = async (): Promise<
  ApiResponse<IOrderCreateResponse>
> => {
  const res = await http.post<ApiResponse<IOrderCreateResponse>>(
    API_ROUTES.order.orders
  );
  return res.data;
};

export const updateOrderApi = async (
  orderId: string,
  data: IOrderUpdateRequest
): Promise<ApiResponse<null>> => {
  const res = await http.patch<ApiResponse<null>>(
    API_ROUTES.order.order.replace(":orderId", orderId),
    data
  );
  return res.data;
};
