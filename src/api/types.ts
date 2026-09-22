export interface ProductImage {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: ProductImage;
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
  couponCode?: string;
  subtotal: number;
  discounts: number;
  total: number;
}

export interface ApiErrorBody {
  code: number;
  type: string;
  message: string;
}
