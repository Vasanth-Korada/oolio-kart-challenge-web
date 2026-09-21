export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface OrderItemRequest {
  productId: string;
  quantity: number;
}

export interface PlaceOrderRequest {
  items: OrderItemRequest[];
  couponCode?: string;
}

export interface OrderItemResponse {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItemResponse[];
  products: Product[];
}

export interface ApiErrorBody {
  code: number;
  type: string;
  message: string;
}
