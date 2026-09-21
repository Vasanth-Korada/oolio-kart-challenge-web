import type { ApiErrorBody, Order, PlaceOrderRequest, Product } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";
const API_KEY = import.meta.env.VITE_API_KEY ?? "apitest";

export class ApiRequestError extends Error {
  readonly status: number;
  readonly body: ApiErrorBody | null;

  constructor(status: number, body: ApiErrorBody | null) {
    super(body?.message ?? `Request failed with status ${status}`);
    this.name = "ApiRequestError";
    this.status = status;
    this.body = body;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    let body: ApiErrorBody | null = null;
    try {
      body = (await res.json()) as ApiErrorBody;
    } catch {
      // ignore: no JSON body
    }
    throw new ApiRequestError(res.status, body);
  }

  if (res.status === 204) {
    return undefined as T;
  }
  return (await res.json()) as T;
}

export function listProducts(): Promise<Product[]> {
  return request<Product[]>("/product");
}

export function getProduct(id: string): Promise<Product> {
  return request<Product>(`/product/${id}`);
}

export function placeOrder(body: PlaceOrderRequest): Promise<Order> {
  return request<Order>("/order", {
    method: "POST",
    headers: { api_key: API_KEY },
    body: JSON.stringify(body),
  });
}
