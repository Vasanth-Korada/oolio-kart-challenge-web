import type { Product } from "../api/types";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="product-card">
      <img className="product-card__image" src={product.image.thumbnail} alt={product.name} loading="lazy" />
      <div className="product-card__category">{product.category}</div>
      <h3 className="product-card__name">{product.name}</h3>
      <div className="product-card__footer">
        <span className="product-card__price">{formatCurrency(product.price)}</span>
        <button type="button" onClick={() => addItem(product)}>
          Add to cart
        </button>
      </div>
    </div>
  );
}
