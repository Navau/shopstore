export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface IOrderSummaryResponse {
  orderId: string;
  orderDate: string;
  shippingAddress: string;
  status: OrderStatus;
  total: number;
}

export interface IOrderDetailResponse {
  orderId: string;
  orderDate: string;
  shippingAddress: string;
  status: OrderStatus;
  total: number;
  items: IOrderItemResponse[];
}

export interface IOrderItemResponse {
  productId: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  availableQuantity: number;
  quantity: number;
  unitPrice: number;
}

export interface IOrderCreateResponse {
  orderId: string;
  status: OrderStatus;
  total: number;
}

export interface IOrderUpdateRequest {
  shippingAddress?: string;
  status?: OrderStatus;
  total?: number;
}
