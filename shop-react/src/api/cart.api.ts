import { API_ROUTES } from "@/constants";
import type { ApiResponse } from "@/interfaces/api/api-response";
import type {
  ICartItemResponse,
  ICartResponse,
} from "@/interfaces/api/cart.interface";
import http from "./http";

export const getCartApi = async (): Promise<ApiResponse<ICartResponse>> => {
  const res = await http.get<ApiResponse<ICartResponse>>(API_ROUTES.cart.cart);
  return res.data;
};

export const addCartItemApi = async (
  productId: string,
  quantity: number
): Promise<ApiResponse<ICartItemResponse>> => {
  const res = await http.post<ApiResponse<ICartItemResponse>>(
    API_ROUTES.cart.items,
    { productId, quantity }
  );
  return res.data;
};

export const updateCartItemApi = async (
  productId: string,
  quantity: number
): Promise<ApiResponse<ICartItemResponse>> => {
  const res = await http.put<ApiResponse<ICartItemResponse>>(
    `${API_ROUTES.cart.items}/${productId}`,
    { quantity }
  );
  return res.data;
};

export const removeCartItemApi = async (
  productId: string
): Promise<ApiResponse<null>> => {
  const res = await http.delete<ApiResponse<null>>(
    `${API_ROUTES.cart.items}/${productId}`
  );
  return res.data;
};

export const setCartAddressApi = async (
  address: string
): Promise<ApiResponse<null>> => {
  const res = await http.put<ApiResponse<null>>(API_ROUTES.cart.address, {
    address,
  });
  return res.data;
};
