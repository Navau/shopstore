import { getCatalogApi } from "@/api/product.api";
import type { PagedResponse } from "@/interfaces/api/paged-response.interface";
import type { IProductResponse } from "@/interfaces/api/product.interface";
import { useCallback, useEffect, useState } from "react";

export function useProducts(initialPage = 1, initialSize = 8) {
  const [products, setProducts] = useState<IProductResponse[]>([]);
  const [page, setPage] = useState(initialPage);
  const [size] = useState(initialSize);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data: PagedResponse<IProductResponse> = await getCatalogApi(
        page,
        size,
        search || undefined
      );
      setProducts(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Error");
    } finally {
      setLoading(false);
    }
  }, [page, size, search]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  // Memoizamos onSearch para que no cambie en cada render
  const onSearch = useCallback((term: string) => {
    setSearch(term);
    setPage(1);
  }, []);

  return {
    products,
    loading,
    error,
    page,
    size,
    totalPages,
    totalElements,
    setPage,
    onSearch,
  };
}
