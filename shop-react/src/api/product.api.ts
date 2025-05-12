import { API_ROUTES } from "@/constants";
import type { ApiResponse } from "@/interfaces/api/api-response";
import type { PagedResponse } from "@/interfaces/api/paged-response.interface";
import type { IProductResponse } from "@/interfaces/api/product.interface";
import http from "./http";

export const getCatalogApi = async (
  page: number,
  size: number,
  search?: string
): Promise<PagedResponse<IProductResponse>> => {
  const res = await http.get<ApiResponse<PagedResponse<IProductResponse>>>(
    API_ROUTES.catalog.catalog,
    {
      params: { page: page - 1, size, search },
    }
  );
  return res.data.data;
};
