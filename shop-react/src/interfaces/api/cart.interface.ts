export interface ICartItemResponse {
  productId: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export interface ICartResponse {
  items: ICartItemResponse[];
  shippingAddress?: string;
}
