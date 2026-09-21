import type { ApiErrorBody, Order, PlaceOrderRequest, Product } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";
const API_KEY = import.meta.env.VITE_API_KEY ?? "apitest";

// ApiRequestError carries the backend's structured error body (when
// present) so the UI can show the actual validation message from
// internal/httpapi/errors.go, not a generic "request failed".
export class ApiRequestError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: ApiErrorBody | null,
  ) {
    super(body?.message ?? `Request failed with status ${status}`);
    this.name = "ApiRequestError";
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
      // Response had no JSON body — body stays null and the generic
      // status-based message in ApiRequestError is used instead.
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
