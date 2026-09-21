import { useEffect, useState } from "react";
import { listProducts } from "../api/client";
import type { Product } from "../api/types";
import { ProductCard } from "./ProductCard";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; products: Product[] };

export function ProductList() {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    listProducts()
      .then((products) => {
        if (!cancelled) setState({ status: "ready", products });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            status: "error",
            message: err instanceof Error ? err.message : "Failed to load products",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") {
    return <p className="status-message">Loading menu…</p>;
  }
  if (state.status === "error") {
    return <p className="status-message status-message--error">{state.message}</p>;
  }

  return (
    <div className="product-grid">
      {state.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
