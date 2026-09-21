// Mirrors the OpenAPI spec's Product/Order schemas exactly — see
// api/openapi.yaml in the backend repo (oolio-kart-challenge).

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

// Matches the backend's ApiResponse error envelope (internal/httpapi/errors.go).
export interface ApiErrorBody {
  code: number;
  type: string;
  message: string;
}
